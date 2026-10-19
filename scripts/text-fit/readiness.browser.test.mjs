// Real HTTP + Chromium + exact canonical driver and unchanged detector. No app build.
// F1235_DRIVER may point to the preserved d433 driver to record the expected RED.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import http from "node:http";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "../..");
const driver = process.env.F1235_DRIVER || path.join(here, "run-text-fit.mjs");
let caseSequence = 0;
const healthy = `<main><h1>Walk the job. Leave with the estimate.</h1><section id="product">Product details</section><section id="demo">Walk demonstration</section></main>`;
const page = (body, script = "") => `<!doctype html><html><head><meta charset="utf-8"><title>Fixture</title><style>body{margin:16px;font:16px/1.5 sans-serif}h1{font:20px/1.5 sans-serif;margin:0 0 24px}section{margin:0 0 24px}*{box-sizing:border-box}</style></head><body>${body}<script>${script}</script></body></html>`;

async function audit(t, { body = healthy, script = "", status = 200, route = "/", redirect = null } = {}) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "f1235-driver-"));
  t.after(() => fs.rm(dir, { recursive: true, force: true }));
  await fs.mkdir(path.join(dir, "scripts/text-fit"), { recursive: true });
  await fs.mkdir(path.join(dir, "src/app"), { recursive: true });
  await fs.writeFile(path.join(dir, "src/app/page.tsx"), "// Synthetic route inventory, not application content.\n");
  for (const name of ["text-fit-detector.js", "route-readiness.mjs"]) await fs.copyFile(path.join(here, name), path.join(dir, "scripts/text-fit", name));
  // Baseline/new DRIVER bytes are copied unchanged, never reimplemented as assertions.
  await fs.copyFile(driver, path.join(dir, "scripts/text-fit/run-text-fit.mjs"));
  await fs.symlink(path.join(repo, "node_modules"), path.join(dir, "node_modules"), "dir");
  const server = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") { res.writeHead(204); res.end(); return; }
    if (redirect && req.url === route) { res.writeHead(302, { Location: redirect }); res.end(); return; }
    res.writeHead(status, { "Content-Type": "text/html" }); res.end(page(body, script));
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const out = path.join(dir, "report.json");
  const base = `http://127.0.0.1:${server.address().port}`;
  const started = process.hrtime.bigint();
  const child = spawn(process.execPath, [path.join(dir, "scripts/text-fit/run-text-fit.mjs"), base], {
    env: { ...process.env, TEXT_FIT_ROUTES: route, TEXT_FIT_WIDTHS: "375", TEXT_FIT_OUT: out },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let stdout = "", stderr = "";
  child.stdout.on("data", (v) => { stdout += v; }); child.stderr.on("data", (v) => { stderr += v; });
  const result = await new Promise((resolve, reject) => { child.on("error", reject); child.on("exit", (code, signal) => resolve({ code, signal })); });
  const elapsedMs = Number(process.hrtime.bigint() - started) / 1e6;
  const reportBytes = await fs.readFile(out);
  // Persist original child evidence BEFORE any regression assertion can fail.
  if (process.env.F1235_EVIDENCE_DIR) {
    const evidenceDir = path.resolve(process.env.F1235_EVIDENCE_DIR);
    await fs.mkdir(evidenceDir, { recursive: true });
    const label = `${String(++caseSequence).padStart(2, "0")}-${t.name.replace(/[^a-zA-Z0-9]+/g, "-").slice(0, 100)}`;
    const write = (suffix, bytes) => fs.writeFile(path.join(evidenceDir, label + suffix), bytes, { flag: "wx" });
    await write(".report.json", reportBytes);
    await write(".stdout.txt", stdout);
    await write(".stderr.txt", stderr);
    await write(".execution.json", JSON.stringify({ case: t.name, ...result, elapsedMs, driverSHA256: createHash("sha256").update(await fs.readFile(driver)).digest("hex"),
      command: [process.execPath, "scripts/text-fit/run-text-fit.mjs", base], route, status,
      widths: "375", note: "Exact child report/stdout/stderr preserved before assertions; no automatic retry." }, null, 2) + "\n");
  }
  const rows = JSON.parse(reportBytes);
  return { ...result, rows, stdout, stderr, elapsedMs };
}
function refused(r, reason) {
  assert.equal(r.signal, null, r.stderr);
  assert.equal(r.code, 1, `Unintended content must fail the actual driver; stdout=${r.stdout}; stderr=${r.stderr}`);
  assert.equal(r.rows.length, 4); // Existing one portrait + THREE unchanged landscape inventory.
  assert.ok(r.rows.every((x) => x.measured === false && x.textLines === null && x.defects.length === 0));
  assert.ok(r.rows.some((x) => x.readiness.reasons.includes(reason)));
  assert.doesNotMatch(r.stdout, /text-fit: PASS/);
}

test("HTTP200 Application error with nonzero visible text must not earn zero-defect SUCCESS", async (t) => {
  const r = await audit(t, { body: "<h2>Application error: a client-side exception has occurred while loading this page.</h2>" });
  refused(r, "application-or-not-found-screen");
  assert.equal(r.rows[0].readiness.status, 200);
  assert.match(r.rows[0].readiness.content.bodyTextExcerpt, /Application error/);
  assert.ok(r.rows.every((x) => x.observation.phase === "initial-route-qualification" && x.observation.viewportAttempted === false));
  assert.ok(r.rows.every((x) => x.observation.actualViewport.width === 1280 && x.observation.actualViewport.height === 900));
});
test("healthy intended route still produces a valid zero-defect report", async (t) => {
  const r = await audit(t);
  assert.equal(r.code, 0, r.stdout + r.stderr); assert.match(r.stdout, /text-fit: PASS/);
  assert.equal(r.rows.length, 4);
  assert.ok(r.rows.every((x) => x.textLines > 0 && x.defects.length === 0 && x.measured !== false));
});
test("healthy intended content retains console errors as evidence without a new failure gate", async (t) => {
  const r = await audit(t, { script: 'console.error("F1235 fixture resource diagnostic");' });
  assert.equal(r.code, 0, r.stdout + r.stderr);
  assert.ok(r.rows.every((x) => x.measured && x.readiness.qualified));
  assert.ok(r.rows.every((x) => x.readiness.browserEvents.some((e) => e.kind === "console-error")));
});
test("healthy intended prose mentioning application error is not an error screen", async (t) => {
  const r = await audit(t, { body: healthy + "<p>Contact support if an application error occurs.</p>" });
  assert.equal(r.code, 0, r.stdout + r.stderr);
  assert.ok(r.rows.every((x) => x.measured && x.readiness.qualified && !x.readiness.content.errorScreen));
});
test("nonempty generic site chrome with missing route content is not coverage", async (t) => {
  refused(await audit(t, { body: "<header>Forge</header><footer>Support and Legal</footer>" }), "missing-expected-route-content");
});
test("a redirect to a healthy different route is refused", async (t) => {
  refused(await audit(t, { redirect: "/pricing" }), "wrong-route");
});
test("expected markers cannot hide an unhandled page exception", async (t) => {
  const r = await audit(t, { script: 'console.error("F1235 fixture hydration failed"); throw new Error("F1235 fixture client exception");' });
  refused(r, "unhandled-page-exception");
  assert.ok(r.rows[0].readiness.browserEvents.some((x) => x.kind === "pageerror"));
  assert.ok(r.rows[0].readiness.browserEvents.some((x) => x.kind === "console-error"));
});
test("an error after resize is requalified before that viewport is measured", async (t) => {
  const r = await audit(t, { script: 'window.addEventListener("resize", () => { document.body.innerHTML="<h2>Application error: a client-side exception has occurred</h2>"; });' });
  refused(r, "application-or-not-found-screen");
});
test("new routes without a content contract fail closed", async (t) => {
  refused(await audit(t, { route: "/new-page" }), "unregistered-route-content-contract");
});
test("private 404 chrome is retained as failure evidence, never intended-page measurements", async (t) => {
  const r = await audit(t, { route: "/brand", status: 404, body: "<h1>404</h1><h2>This page could not be found.</h2>" });
  refused(r, "unsuccessful-http-status");
  assert.ok(r.rows.every((x) => x.readiness.coverage === "gated-private-404-chrome-not-intended-content"));
});

test("delayed hydration after networkidle earns intended-content measurements", async (t) => {
  const r = await audit(t, { body: "<main>Loading route</main>", script: `setTimeout(() => { document.body.innerHTML = ${JSON.stringify(healthy)}; }, 1500);` });
  assert.equal(r.code, 0, r.stdout + r.stderr);
  assert.ok(r.elapsedMs >= 1500, `Finished before delayed content: ${r.elapsedMs}ms`);
  assert.ok(r.rows.every((x) => x.measured && x.readiness.qualified && x.readiness.content.markers.every((m) => m.matched)));
});
test("permanently missing content actually exhausts the qualification wait", async (t) => {
  const r = await audit(t, { body: "<main>Loading route permanently</main>" });
  refused(r, "expected-content-or-settling-timeout");
  assert.ok(r.elapsedMs >= 10000, `Qualification did not wait its 10000ms bound: ${r.elapsedMs}ms`);
  assert.ok(r.rows.every((x) => x.observation.viewportAttempted === false));
});
