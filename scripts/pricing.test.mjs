import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { runInNewContext } from "node:vm";
import ts from "typescript";

// Execute the real TypeScript module using the compiler already installed
// for this site. No copied pricing implementation and no new test dependency.
const source = readFileSync(
  process.env.PRICING_SOURCE_PATH ?? new URL("../src/lib/pricing.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const compiledModule = { exports: {} };
runInNewContext(compiled, { module: compiledModule, exports: compiledModule.exports });
const pricing = compiledModule.exports;

test("catalog and controls match the approved two-class pricing", () => {
  assert.equal(pricing.BASE_MONTHLY, 249);
  assert.equal(pricing.BASE_ANNUAL, 2390);
  assert.equal(pricing.SEAT_MONTHLY, 39);
  assert.equal(pricing.SEAT_ANNUAL, 374);
  assert.equal(pricing.SUB_SEAT_MONTHLY, 9.99);
  assert.equal(pricing.SUB_SEAT_ANNUAL, 95.90);
  assert.equal(pricing.INCLUDED_SEATS, 3);
  assert.equal(pricing.MIN_STAFF_SEATS, 1);
  assert.equal(pricing.DEFAULT_STAFF_SEATS, 3);
});

// Sep8 F075 ruling: first three seats are type-agnostic, staff first.
// Backend115c actual seat-pricing.ts confirms2staff+1Sub is base only.
for (const [staff, subs, monthly, annual] of [
  [1, 0, 249, 2390],
  [2, 0, 249, 2390],
  [3, 0, 249, 2390],
  [4, 0, 288, 2764],
  [5, 0, 327, 3138],
  [12, 0, 600, 5756],
  [2, 1, 249, 2390],
  [1, 2, 249, 2390],
  [1, 3, 258.99, 2485.90],
  [2, 2, 258.99, 2485.90],
  // F-075 done_when: a three person shop plus one Sub bills what the
  // agreement and the backend biller bill. The three staff take the
  // included seats, the Sub is the one seat past them at the Sub rate.
  // The retired one-rate page quoted $288 here (the Sub at $39).
  [3, 1, 258.99, 2485.90],
  [3, 2, 268.98, 2581.80],
  [4, 1, 297.99, 2859.90],
  [5, 10, 426.90, 4097],
  [100, 100, 5031, 48258],
]) {
  test(`${staff} staff + ${subs} Subs shares the included allowance and retains exact cents`, () => {
    assert.equal(pricing.monthlyTotal(staff, subs), monthly);
    assert.equal(pricing.annualTotal(staff, subs), annual);
  });
}

test("Sub seats use the included allowance remaining after staff", () => {
  assert.equal(pricing.monthlyTotal(1, 2), 249);
  assert.equal(pricing.monthlyTotal(2, 1), 249);
  assert.equal(pricing.monthlyTotal(3, 2), 268.98);
  assert.equal(pricing.annualTotal(1, 2), 2390);
  assert.equal(pricing.annualTotal(3, 2), 2581.80);
});

test("annual headline retains the established sum of displayed rounded parts", () => {
  assert.equal(pricing.annualHeadlineMonthly(3), 199);
  assert.equal(pricing.annualHeadlineMonthly(5), 261);
  assert.equal(pricing.annualHeadlineMonthly(12), 478);
  assert.equal(pricing.annualSubAsMonthly(), 7.99);
  assert.equal(pricing.annualHeadlineMonthly(2, 1), 199);
  assert.equal(pricing.annualHeadlineMonthly(5, 10), 340.90);
  // The visible annual charge must not be reconstructed from that headline.
  assert.equal(pricing.annualTotal(5, 10), 4097);
  assert.notEqual(pricing.annualHeadlineMonthly(5, 10) * 12, 4097);
});

test("quote formatting keeps meaningful cents and explicit Sub rate precision", () => {
  assert.equal(pricing.formatUsd(249), "$249");
  assert.equal(pricing.formatUsd(258.99), "$258.99");
  assert.equal(pricing.formatUsd(2485.90), "$2,485.90");
  assert.equal(pricing.formatUsd(2581.80), "$2,581.80");
  assert.equal(pricing.formatSeatUsd(9.99), "$9.99");
  assert.equal(pricing.formatSeatUsd(95.90), "$95.90");
  assert.equal(pricing.formatSeatUsd(7.99), "$7.99");
});

// ── Seat copy (F-075 / F-076) ────────────────────────────────────────────
// The copy has to state the rule the agreement (MSA 3.4, served by the app at
// app.forge.equipment/legal/msa) and the backend biller state: the included
// seats are shared, staff first; past them staff and Subs have their own
// prices; an admin can switch an included seat; a Sub seat bought past the
// included seats stays a Sub seat; a Sub is not a team role. Read as source
// text so no JSX runtime or new test dependency is needed. SRC_ROOT lets the
// same assertions run against another checkout (red proof on the old copy).
const SRC_ROOT = process.env.SRC_ROOT ?? new URL("../src/", import.meta.url).pathname;

function readSrc(rel) {
  return readFileSync(join(SRC_ROOT, rel), "utf8");
}

function allSourceFiles(dir = SRC_ROOT) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return allSourceFiles(full);
    return /\.(ts|tsx|md)$/.test(entry.name) ? [full] : [];
  });
}

function seatFaqAnswer() {
  const match = /question: "What counts as a seat\?",\s*answer:\s*"([^"]*)"/.exec(
    readSrc("lib/constants.ts"),
  );
  assert.ok(match, "the pricing FAQ has a 'What counts as a seat?' answer");
  return match[1];
}

test("no page sells a Sub as a full team role or prices it as a teammate", () => {
  for (const file of allSourceFiles()) {
    const text = readFileSync(file, "utf8");
    assert.doesNotMatch(text, /Full team roles/, `${file} lists 'Full team roles'`);
    assert.doesNotMatch(text, /additional teammate/i, `${file} prices an 'additional teammate'`);
    for (const line of text.split("\n").filter((l) => /Team roles:/.test(l))) {
      assert.doesNotMatch(line, /\bSub\b/, `${file} lists Sub as a team role: ${line.trim()}`);
    }
  }
});

test("the seat FAQ prices each class and says a Sub is not a team role", () => {
  const answer = seatFaqAnswer();
  assert.match(answer, /each additional staff seat is \$39\/month or \$374\/year/);
  assert.match(answer, /each additional Sub seat is \$9\.99\/month or \$95\.90\/year/);
  assert.match(answer, /A Sub seat is for a subcontractor and is not a team role/);
  assert.match(answer, /never sees your pricing, your estimates or your team's conversations/);
  assert.doesNotMatch(answer, /teammate/i);
});

test("the seat FAQ states MSA 3.4's allocation and swap rules", () => {
  const answer = seatFaqAnswer();
  assert.match(answer, /Staff use the included seats first, then Subs use any remaining/);
  assert.match(answer, /your admin can switch an included seat between staff and Sub at any time/);
  assert.match(answer, /A Sub seat added beyond the included 3 keeps Sub access and can't be changed to a staff seat/);
});

test("the calculator note states the swap rule beside the Sub price", () => {
  const source = readSrc("components/pricing/PlanConfigurator.tsx");
  assert.match(source, /switch an included seat between staff and Sub at any time/);
  assert.match(source, /stays a Sub seat/);
  assert.match(source, /"Team roles: Owner, Admin, PM, and Estimator"/);
});

// ── The MSA is linked, not copied (F-050, ruling 11) ─────────────────────
// The agreement is published once, by the app at app.forge.equipment/legal/msa.
// A second copy here had already drifted: this PR's earlier v1.0.md carried a
// clause 3.4 without the admin-swap and "cannot be changed to a full Seat"
// sentences the app's copy states. So the site links, and a copy of the body
// coming back fails here.
test("no copy of the MSA body lives in this site", () => {
  for (const file of allSourceFiles()) {
    const text = readFileSync(file, "utf8");
    assert.doesNotMatch(text, /3\.4 Sub Seats\./, `${file} carries MSA clause 3.4`);
    assert.doesNotMatch(text, /1\.6 Sub Seat\./, `${file} carries MSA clause 1.6`);
    assert.doesNotMatch(file, /content\/legal\/msa\//, `${file} is an MSA content file`);
  }
});

test("the legal page and old MSA addresses point at the app's copy", () => {
  assert.match(readSrc("lib/constants.ts"), /return `\$\{DASHBOARD_URL\}\/legal\/msa`;/);
  assert.match(readSrc("app/legal/page.tsx"), /href=\{msaUrl\(\)\}/);
  const config = readFileSync(join(SRC_ROOT, "../next.config.ts"), "utf8");
  assert.match(config, /source: "\/legal\/msa",\s*destination: `\$\{DASHBOARD_URL\}\/legal\/msa`/);
  assert.match(config, /source: "\/legal\/msa\/:path\*",\s*destination: `\$\{DASHBOARD_URL\}\/legal\/msa`/);
});
