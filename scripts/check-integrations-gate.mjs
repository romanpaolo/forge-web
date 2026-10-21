#!/usr/bin/env node
/**
 * The integrations band publishes on one day and not before (F-515).
 *
 * The band after "How it works", the "Developers" footer group, the extra
 * keywords and the forge.equipment/docs redirect are built behind
 * NEXT_PUBLIC_INTEGRATIONS_GA=on. This reads a finished build and checks all
 * four together, so a build can never publish half of them:
 *
 *   --expect off   the production build: none of them is in it.
 *   --expect on    the GA build: all of them are, and with --url the running
 *                  server answers /docs with a non-permanent redirect to the
 *                  app's /docs.
 *
 * Both halves run in CI (.github/workflows/ci.yml). A gate that is only ever
 * checked closed passes when the band is broken, and one only checked open
 * passes when it leaks early.
 *
 * Usage:  node scripts/check-integrations-gate.mjs --expect off|on [--url http://localhost:3107]
 * Exit 0 as expected, 1 when not, 2 on its own failure.
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const arg = (name) => {
  const i = process.argv.indexOf(name);
  return i === -1 ? undefined : process.argv[i + 1];
};
const expect = arg("--expect");
const url = arg("--url");
const DOCS = `${process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://app.forge.equipment"}/docs`;

function fail(msg) {
  console.error(`integrations gate FAILED TO RUN: ${msg}`);
  process.exit(2);
}

async function main() {
  if (expect !== "on" && expect !== "off") fail("pass --expect on or --expect off.");
  const home = join(ROOT, ".next", "server", "app", "index.html");
  const routes = join(ROOT, ".next", "routes-manifest.json");
  if (!existsSync(home) || !existsSync(routes)) fail("no build in .next; run next build first.");

  const html = readFileSync(home, "utf8");
  // Non-vacuity: this is the home page, or nothing below means anything.
  if (!html.includes("How It Works")) fail("the built home page has no How It Works section.");

  const redirects = JSON.parse(readFileSync(routes, "utf8")).redirects ?? [];
  const docsRule = redirects.find((r) => r.source === "/docs");

  const facts = {
    "band on the home page": html.includes('id="developers"') && html.includes("Forge has an MCP server"),
    "Developers footer group": />Developers</.test(html),
    "MCP keywords in the page head": /<meta name="keywords" content="[^"]*MCP server/.test(html),
    "/docs redirect to the app's /docs": Boolean(
      docsRule && docsRule.destination === DOCS && docsRule.permanent !== true && docsRule.statusCode !== 308,
    ),
  };

  if (url) {
    if (expect !== "on") fail("--url checks the live redirect, which only the GA build has.");
    const res = await fetch(`${url}/docs`, { redirect: "manual" });
    const location = res.headers.get("location");
    facts[`GET /docs answers 307 to ${DOCS}`] = res.status === 307 && location === DOCS;
  }

  const want = expect === "on";
  let wrong = 0;
  for (const [fact, present] of Object.entries(facts)) {
    const ok = present === want;
    if (!ok) wrong++;
    console.log(`${ok ? "ok  " : "FAIL"} ${fact}: ${present ? "present" : "absent"}, expected ${want ? "present" : "absent"}`);
  }
  if (wrong) {
    console.error(`\nintegrations gate: ${wrong} of ${Object.keys(facts).length} wrong for --expect ${expect}.`);
    process.exit(1);
  }
  console.log(`integrations gate: all ${Object.keys(facts).length} ${want ? "present" : "absent"}, as expected.`);
}

main().catch((err) => {
  console.error("integrations gate CRASHED (not a pass):", err);
  process.exit(2);
});
