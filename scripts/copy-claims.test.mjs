import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";

// F-515: the landing's data claims, pinned to the approved words.
//
// The sentences below are copied from the integration legal draft, section 6.3
// (FORGE_BACKEND docs/sessions/2026-09/integration-prd-2026-09-23/
// legal-amendments-draft.md). A copy edit that changes one of these lines
// fails here, so a claim about where customer data goes cannot drift without
// someone changing the approved words too. Executes the real constants module
// with the compiler this repo already has, like scripts/pricing.test.mjs.

const DRAFT_6_3 = {
  security:
    "Your data is encrypted in transit and at rest. We never sell it, and the AI providers Forge uses do not train on it. You decide whether any other app can read it.",
  band:
    "Forge has an MCP server and a public API. Use them from any MCP or agentic tool, not just Claude, or from your own software, to read your jobs, scopes, estimates and walk transcripts. Data access stays off until you turn it on.",
};

const compile = (rel) =>
  ts.transpileModule(readFileSync(new URL(`../src/lib/${rel}`, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
const compiled = compile("constants.ts");
// constants.ts imports only "@/lib/caseStudy", which imports nothing.
const LIBS = { "@/lib/caseStudy": compile("caseStudy.ts") };

function load(env = {}) {
  const run = (code) => {
    const mod = { exports: {} };
    const require = (id) => {
      if (!(id in LIBS)) throw new Error(`copy-claims test: unexpected import ${id}`);
      return run(LIBS[id]);
    };
    runInNewContext(code, { module: mod, exports: mod.exports, require, process: { env } });
    return mod.exports;
  };
  return run(compiled);
}

test("the security FAQ says the approved words", () => {
  const { SUPPORT_FAQ } = load();
  const item = SUPPORT_FAQ.find((q) => q.question === "Is my job walk data secure?");
  assert.ok(item, "the security question is still on the support page");
  assert.equal(item.answer, DRAFT_6_3.security);
});

test("How it works step 3 promises only what a connected tool cannot break", () => {
  // A connected tool reads drafts once data access is on, so the step may
  // promise nothing about Forge as a whole. What stays true is that nothing
  // reaches the client until the contractor sends it.
  const { STEPS } = load();
  const step3 = STEPS.find((s) => s.number === "03");
  assert.match(step3.description, /reach your client only when you send them\.$/);
  assert.doesNotMatch(step3.description, /leaves Forge/i);
});

test("the integrations band carries the approved version 1 line", () => {
  const { INTEGRATIONS_BAND } = load();
  assert.equal(INTEGRATIONS_BAND.body, DRAFT_6_3.band);
});

test("the band is off unless the build sets NEXT_PUBLIC_INTEGRATIONS_GA=on", () => {
  // An allowlist: unset, empty, "true", "1" or anything else stays off, so a
  // build that forgets the variable publishes nothing early.
  for (const value of [undefined, "", "true", "1", "ON", "yes"]) {
    const env = value === undefined ? {} : { NEXT_PUBLIC_INTEGRATIONS_GA: value };
    assert.equal(load(env).INTEGRATIONS_GA, false, `value ${JSON.stringify(value)}`);
  }
  assert.equal(load({ NEXT_PUBLIC_INTEGRATIONS_GA: "on" }).INTEGRATIONS_GA, true);
});

test("the manual link is the app's /docs", () => {
  assert.equal(load().docsUrl(), "https://app.forge.equipment/docs");
});

test("the band's cards and footer links point at the manual's own pages", () => {
  // The paths are the public manual's routes (Forge_Web F-514, app/docs/<slug>).
  const { INTEGRATION_CARDS, INTEGRATIONS_TRUST, docsPageUrl } = load();
  const slugs = [...INTEGRATION_CARDS.map((c) => c.link.slug), ...INTEGRATIONS_TRUST.links.map((l) => l.slug)];
  assert.deepEqual(slugs.sort(), ["api", "connect", "revoke", "what-is-shared"]);
  for (const slug of slugs) assert.equal(docsPageUrl(slug), `https://app.forge.equipment/docs/${slug}`);
});

test("the band names no AI product beyond the approved 'not just Claude'", () => {
  // The site names only tools that have been connected once (F-515 REFUSED),
  // and the manual has no recorded connection yet. Claude appears only inside
  // the approved draft line, as the example of a tool that is not required.
  const { INTEGRATION_CARDS, INTEGRATIONS_TRUST, INTEGRATIONS_BAND } = load();
  const words = JSON.stringify([INTEGRATION_CARDS, INTEGRATIONS_TRUST, { ...INTEGRATIONS_BAND, body: "" }]);
  for (const name of ["Claude", "ChatGPT", "OpenAI", "Cursor", "Codex", "Gemini", "Copilot", "Anthropic", "JobTread"]) {
    assert.doesNotMatch(words, new RegExp(`\\b${name}\\b`, "i"), name);
  }
});
