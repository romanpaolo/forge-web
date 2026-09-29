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
