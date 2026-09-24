// F-631 text-fit audit. Loads every page of a RUNNING build at every width in
// the matrix, evaluates text-fit-detector.js in it, prints a summary, and exits
// 1 on any defect. It builds nothing and starts no server: point it at one.
//
//   npm run build && npx next start -p 3107 &
//   npm run check:text-fit -- http://localhost:3107
//
// The standard (RZ, F-631): whatever the angle or size of the screen, text fits
// the space it has. No control label broken over lines, no text overlapping or
// touching other text, no text clipped, no page scrolling sideways.
//
// Routes are DERIVED from src/app/**/page.tsx, so a new page is audited by
// construction. Pages under a dynamic segment ([slug]) are listed and skipped:
// there is no URL to load without real data. Route groups "(x)" do not appear in
// the URL; private "_x" and parallel "@x" folders are not routes.
//
// A route also FAILS when it renders no visible text line or its response is not
// 2xx: a blank or error page must never pass as "nothing overflows".
//
// Browser: TEXT_FIT_CHANNEL=chrome uses the system Chrome (local runs, no
// download); unset, it uses Playwright's bundled Chromium (CI installs it with
// `npx playwright install --with-deps chromium`).
//
// Env: TEXT_FIT_BASE_URL (default http://localhost:3000; argv[2] wins),
// TEXT_FIT_WIDTHS (comma list, overrides the portrait widths),
// TEXT_FIT_ROUTES (comma list, audit only these), TEXT_FIT_OUT (write JSON).
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "../..");
const appDir = path.join(repo, "src/app");

// Portrait widths at 900px tall: every phone class, the tablet band where the
// header used to crunch (768-1024), and the common desktop widths. Plus three
// short landscape screens, where full-height sections clipped their copy.
const WIDTHS = (process.env.TEXT_FIT_WIDTHS ||
  "320,360,375,390,414,480,600,700,768,792,800,850,900,960,1000,1024,1100,1180,1280,1366,1440,1600,1920")
  .split(",").map(Number);
const LANDSCAPE = [[667, 375], [844, 390], [1024, 600]];
const VIEWPORTS = [...WIDTHS.map((w) => [w, 900]), ...LANDSCAPE];

// ── Routes from the filesystem ────────────────────────────────────────────────
function findPages(dir, segs = [], out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.isDirectory()) {
      if (ent.name.startsWith("_") || ent.name.startsWith("@")) continue;
      findPages(path.join(dir, ent.name), [...segs, ent.name], out);
    } else if (/^page\.(tsx|ts|jsx|js|mdx)$/.test(ent.name)) {
      out.push(segs);
    }
  }
  return out;
}
const allPages = findPages(appDir);
const dynamic = allPages.filter((s) => s.some((x) => x.startsWith("[")));
let routes = allPages
  .filter((s) => !s.some((x) => x.startsWith("[")))
  .map((s) => "/" + s.filter((x) => !(x.startsWith("(") && x.endsWith(")"))).join("/"))
  .sort();
if (process.env.TEXT_FIT_ROUTES) routes = process.env.TEXT_FIT_ROUTES.split(",");
if (!routes.length) {
  console.error(`text-fit: no routes found under ${appDir}`);
  process.exit(1);
}

const base = (process.argv[2] || process.env.TEXT_FIT_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const detector = fs.readFileSync(path.join(here, "text-fit-detector.js"), "utf8");
const channel = process.env.TEXT_FIT_CHANNEL || undefined;

console.log(`text-fit: ${base}, ${routes.length} routes x ${VIEWPORTS.length} viewports, browser ${channel || "bundled chromium"}`);
console.log(`  routes: ${routes.join(" ")}`);
if (dynamic.length) console.log(`  skipped (dynamic segment, no URL without data): ${dynamic.map((s) => "/" + s.join("/")).join(" ")}`);

// Visible text lines on the page, counted the way the detector collects them.
// Zero means the page rendered nothing a reader could see.
const countTextLines = () => {
  let n = 0;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  for (let t = walker.nextNode(); t; t = walker.nextNode()) {
    if (!t.nodeValue || !t.nodeValue.trim()) continue;
    const el = t.parentElement;
    if (!el || ["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"].includes(el.tagName)) continue;
    if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
    range.selectNodeContents(t);
    for (const r of range.getClientRects()) if (r.width >= 1 && r.height >= 1) n++;
  }
  return n;
};

const browser = await chromium.launch(channel ? { channel } : {});
const results = [];
const failures = [];
for (const route of routes) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  let status = 0;
  try {
    const res = await page.goto(base + route, { waitUntil: "networkidle", timeout: 60000 });
    status = res ? res.status() : 0;
  } catch (e) {
    failures.push(`${route}: failed to load (${e.message.split("\n")[0]})`);
    await ctx.close();
    continue;
  }
  if (status < 200 || status > 299) failures.push(`${route}: HTTP ${status}`);
  for (const [w, h] of VIEWPORTS) {
    await page.setViewportSize({ width: w, height: h });
    await page.waitForTimeout(250);
    // Scroll through so lazy and whileInView content renders, then back to top.
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 150));
    });
    const r = await page.evaluate(`(${detector})()`);
    const textLines = await page.evaluate(countTextLines);
    if (textLines === 0) failures.push(`${route} ${w}x${h}: renders no visible text line (blank page)`);
    results.push({ route, w, h, textLines, ...r });
    const kinds = r.defects.reduce((m, d) => ((m[d.kind] = (m[d.kind] || 0) + 1), m), {});
    if (r.defects.length) console.log(`  ${route} ${w}x${h} ${JSON.stringify(kinds)}`);
  }
  await ctx.close();
}
await browser.close();
if (process.env.TEXT_FIT_OUT) fs.writeFileSync(process.env.TEXT_FIT_OUT, JSON.stringify(results, null, 1));

// ── Summary: one row per distinct defect, with the routes and widths it hits ──
const vpLabel = (x) => (x.h === 900 ? String(x.w) : `${x.w}x${x.h}`);
const unique = new Map();
for (const x of results) {
  for (const d of x.defects) {
    const what = d.text || (d.a !== undefined ? `${d.a} <> ${d.b}` : "") ||
      (d.culprits || []).map((c) => `${c.el.split(" > ").pop()} "${c.text}"`).join(", ");
    const where = (d.el || d.elA || "").split(" > ").pop();
    const key = `${d.kind} | ${what.slice(0, 100)} | ${where.slice(0, 80)}`;
    if (!unique.has(key)) unique.set(key, { routes: new Set(), vps: new Set() });
    unique.get(key).routes.add(x.route);
    unique.get(key).vps.add(vpLabel(x));
  }
}
const perRoute = routes.map((rt) => {
  const rows = results.filter((x) => x.route === rt);
  return `${rt}: ${rows.reduce((n, x) => n + x.defects.length, 0)} defects over ${rows.length} viewports`;
});
console.log("\nper route:\n  " + perRoute.join("\n  "));
if (unique.size) {
  console.log(`\nDEFECTS (${unique.size} unique):`);
  for (const [k, v] of [...unique.entries()].sort()) {
    console.log(`  ${k}\n      routes: ${[...v.routes].join(" ")}\n      at: ${[...v.vps].join(" ")}`);
  }
}
const truncated = new Set();
for (const x of results) for (const d of x.truncated || []) truncated.add(`${x.route} | ${d.text.slice(0, 60)} | ${d.el.split(" > ").pop()}`);
if (truncated.size) console.log(`\nTRUNCATED with an ellipsis (review, not a failure): ${truncated.size}\n  ` + [...truncated].join("\n  "));
if (failures.length) console.log(`\nPAGE FAILURES (${failures.length}):\n  ` + failures.join("\n  "));

const bad = unique.size + failures.length;
console.log(`\ntext-fit: ${unique.size} unique defects, ${failures.length} page failures, ${truncated.size} truncations (review) over ${results.length} page renders`);
if (bad) {
  console.log("text-fit: FAIL. Fix the owner (the primitive, the breakpoint, the section), not the instance; see F-631.");
  process.exit(1);
}
console.log("text-fit: PASS");
