#!/usr/bin/env node
/**
 * No spaced em dashes in the copy this site renders.
 *
 * ── Why ─────────────────────────────────────────────────────────────────
 * RZ flagged the em dash (U+2014) as the clearest tell that copy was
 * machine-written. Ethan restated it as the copy standard for this repo on
 * 2026-08-12: "No em dashes anywhere on the site. Write in plain,
 * professional sentences, the kind a person would actually write, not
 * AI-generated cadence."
 *
 * forge-backend, Forge_Web and Forge_IOS each enforce this in CI. This repo
 * did not, and it is the one a prospective customer actually reads. It had no
 * CI at all, so the standard rested entirely on whoever was editing
 * remembering it, which is exactly the thing an LLM writing prose will not do:
 * it reaches for the em dash by default.
 *
 * ── The rule, deliberately identical to forge-backend's ─────────────────
 * A VIOLATION is a U+2014 with whitespace immediately before AND immediately
 * after, appearing in text this site RENDERS. That spaced prose dash is the
 * tell. Unspaced forms are not prose and are not flagged:
 *
 *   "2020—2024"     numeric range, fine
 *   "—"             a bare dash standing in for an empty value, fine
 *   "$5M–$10M"      that is an EN dash (U+2013), a different character,
 *                   typographically correct for a range, and not this rule's
 *                   business
 *
 * Keeping the rule byte-identical to the backend's matters more than making it
 * cleverer. Four repos enforcing four slightly different definitions of the
 * same standard is how a "sweep" ends up leaving the surfaces disagreeing,
 * which is what happened to the receipt-placeholder sentinel.
 *
 * ── Why the TypeScript scanner and not a regex ──────────────────────────
 * The obvious `grep -rn " — " src` is wrong in both directions. It flags code
 * COMMENTS, which this site does not render (there are four such em dashes on
 * `main` today, in `src/lib/constants.ts` and `next.config.ts`, and none of
 * them reaches a user), and a naive comment-stripping regex then breaks on
 * `https://` inside a string.
 *
 * So this walks real tokens with the TypeScript scanner that ships with the
 * repo, and inspects only the token kinds that become visible text: string
 * literals, template literals, and JSX text. Comments are skipped because they
 * are not copy. A false positive here would train somebody to pass `--fix` or
 * delete the check, so precision is the point.
 *
 * ── How to fix one, in order of preference ──────────────────────────────
 *   1. " — X" becomes ". X"   the trailing clause is a real sentence.
 *   2. " — x" becomes ", x"   it is a fragment that cannot stand alone.
 *   3. " — "  becomes ": "    the dash is a label-to-value joiner.
 *
 * Do NOT swap in an en dash or a double hyphen. Both read the same to a human
 * and both re-open the class.
 *
 * Usage:  node scripts/check-em-dashes.mjs
 * Exit 0 clean, 1 on violations, 2 on its own failure (never a silent pass).
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const SCAN_DIRS = ["src"];
const EXTS = [".ts", ".tsx"];
const EM_DASH = "—";

/** Spaced prose em dash: whitespace, U+2014, whitespace. */
const SPACED_EM_DASH = /\s—\s/;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next" || entry.startsWith(".")) {
      continue;
    }
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (EXTS.some((e) => entry.endsWith(e))) out.push(full);
  }
  return out;
}

/**
 * Token kinds that become text the user reads. Template SPANS are included
 * because `` `Save ${pct} — billed annually` `` renders its literal parts.
 */
const RENDERED_KINDS = new Set([
  ts.SyntaxKind.StringLiteral,
  ts.SyntaxKind.NoSubstitutionTemplateLiteral,
  ts.SyntaxKind.TemplateHead,
  ts.SyntaxKind.TemplateMiddle,
  ts.SyntaxKind.TemplateTail,
  ts.SyntaxKind.JsxText,
]);

function violationsIn(file) {
  const text = readFileSync(file, "utf8");
  // Cheap pre-filter: most files contain no em dash at all.
  if (!text.includes(EM_DASH)) return [];

  const sf = ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.Latest,
    /* setParentNodes */ true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );

  const found = [];
  const visit = (node) => {
    if (RENDERED_KINDS.has(node.kind)) {
      const raw = node.getText(sf);
      if (SPACED_EM_DASH.test(raw)) {
        const { line } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
        found.push({
          file: relative(ROOT, file),
          line: line + 1,
          snippet: raw.trim().slice(0, 120),
        });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return found;
}

function main() {
  const files = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)));

  // Non-vacuity floor. A refactor that moves the app, or a bug in `walk`,
  // must not let this report "clean" because it inspected nothing. The repo
  // had 40+ source files when this was written.
  if (files.length < 20) {
    console.error(
      `em-dash guard FAILED TO RUN: only found ${files.length} source files under ` +
        `${SCAN_DIRS.join(", ")}. Expected at least 20. Refusing to report clean ` +
        `on a scan that inspected almost nothing.`,
    );
    process.exit(2);
  }

  // And prove the detector can still detect, against a synthetic literal, so a
  // broken regex or a renamed SyntaxKind cannot pass as "no violations".
  if (!SPACED_EM_DASH.test(`a ${EM_DASH} b`)) {
    console.error("em-dash guard FAILED TO RUN: the detector no longer matches its own example.");
    process.exit(2);
  }

  const violations = files.flatMap(violationsIn);

  if (violations.length === 0) {
    console.log(
      `em-dash guard: clean. Scanned ${files.length} files under ${SCAN_DIRS.join(", ")}.`,
    );
    return;
  }

  console.error(
    `\nem-dash guard: ${violations.length} spaced em dash${violations.length === 1 ? "" : "es"} in rendered copy.\n`,
  );
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}\n    ${v.snippet}`);
  }
  console.error(
    `\nFix by ending the sentence (". X"), joining the fragment (", x"), or using a\n` +
      `colon for a label ("Sales tax: 8.5%"). Do NOT substitute an en dash or "--":\n` +
      `both read the same to a human and both re-open the class.\n`,
  );
  process.exit(1);
}

try {
  main();
} catch (err) {
  console.error("em-dash guard CRASHED (not a pass):", err);
  process.exit(2);
}
