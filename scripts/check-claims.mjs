#!/usr/bin/env node
/**
 * Claims this site must not make (F-515, integration version 1).
 *
 * ── Why ─────────────────────────────────────────────────────────────────
 * Forge's version 1 integration lets a company's owner connect an app or AI
 * tool that reads the company's jobs, scopes, estimates and walk transcripts.
 * From that day, some sentences this site used to print are false, and one
 * product name must not appear at all until version 2 is live:
 *
 *   1. The word JobTread. Ruling 13 of the integration PRD: the landing
 *      says nothing about the JobTread connection until version 2 ships.
 *      The rule is off only when the workflow sets ALLOW_JOBTREAD=true,
 *      which the version 2 change (T30) flips in its own commit. This file
 *      and the workflow may name it; they are not the site.
 *   2. Retired sentences. Each was on the site once and each is false once a
 *      customer's own tool can read a walk. They must never come back.
 *
 * The landing has no copy review beyond this repo's CI, so this is it.
 *
 * ── What it reads ───────────────────────────────────────────────────────
 * Source: the text the site renders from src/ (string literals, template
 * literals and JSX text, found with the TypeScript scanner, exactly like
 * scripts/check-em-dashes.mjs). Comments are skipped: they are not copy, and
 * they have to be able to quote a retired sentence to explain why it went.
 * Everything under public/ that is text is read whole.
 *
 * Built output, with `--built <dir>` (CI passes `.next` after `next build`):
 * every prerendered page and every client script in the build. That is the
 * site as a visitor receives it, so a sentence that reaches the page by any
 * route (a constant, a dependency, a generated file) is caught here.
 *
 * Usage:  node scripts/check-claims.mjs [--built .next]
 * Exit 0 clean, 1 on violations, 2 on its own failure (never a silent pass).
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");

const PARTNER_RE = /job[\s_-]*tread/i;

// Lower case, whitespace collapsed; matched against text normalised the same
// way. Each entry names where it used to live and why it is false now.
const RETIRED = [
  {
    text: "nothing is shared, sold, or used to train models",
    why: "support FAQ: data goes to AI providers, and to tools the customer connects",
  },
  {
    text: "nothing leaves forge until you approve it",
    why: "How it works step 3: a connected tool reads drafts once data access is on",
  },
  {
    text: "bound by a data-processing agreement",
    why: "/legal: no agreement of Forge's binds a recipient the customer chose",
  },
  {
    text: "bound by a data processing agreement",
    why: "/legal: no agreement of Forge's binds a recipient the customer chose",
  },
  {
    text: "go only to the ai providers",
    why: "support FAQ: a connected tool reads transcripts too, so 'only' is false",
  },
];

const allowPartner = process.env.ALLOW_JOBTREAD === "true";

const normalise = (s) =>
  s
    .replace(/&#x27;|&#39;|&apos;|’/g, "'")
    .replace(/&quot;|“|”/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\\n/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();

function findIn(text) {
  const hits = [];
  const n = normalise(text);
  if (!allowPartner && PARTNER_RE.test(text)) {
    hits.push("the word JobTread (ruling 13: not before version 2)");
  }
  for (const r of RETIRED) {
    if (n.includes(r.text)) hits.push(`retired sentence "${r.text}" (${r.why})`);
  }
  return hits;
}

function walk(dir, keep, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, keep, out);
    else if (keep(entry)) out.push(full);
  }
  return out;
}

const RENDERED_KINDS = new Set([
  ts.SyntaxKind.StringLiteral,
  ts.SyntaxKind.NoSubstitutionTemplateLiteral,
  ts.SyntaxKind.TemplateHead,
  ts.SyntaxKind.TemplateMiddle,
  ts.SyntaxKind.TemplateTail,
  ts.SyntaxKind.JsxText,
]);

function sourceViolations(file) {
  const text = readFileSync(file, "utf8");
  const sf = ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  // A sentence can be split across adjacent JSX text and string tokens, so
  // the rendered tokens of a file are also checked joined together.
  const pieces = [];
  const found = [];
  const visit = (node) => {
    if (RENDERED_KINDS.has(node.kind)) {
      const raw = node.getText(sf);
      pieces.push(raw.replace(/^["'`}]|["'`{]$|\$\{$/g, ""));
      for (const hit of findIn(raw)) {
        const { line } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
        found.push({ where: `${relative(ROOT, file)}:${line + 1}`, hit });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  if (found.length === 0) {
    for (const hit of findIn(pieces.join(" "))) {
      found.push({ where: `${relative(ROOT, file)} (across tokens)`, hit });
    }
  }
  return found;
}

function rawViolations(file) {
  return findIn(readFileSync(file, "utf8")).map((hit) => ({
    where: relative(ROOT, file),
    hit,
  }));
}

function fail(msg) {
  console.error(`claims guard FAILED TO RUN: ${msg}`);
  process.exit(2);
}

function main() {
  // The detectors must detect, so a broken pattern cannot pass as clean.
  if (!allowPartner && findIn("Send to JobTread").length !== 1) {
    fail("the JobTread detector no longer matches its own example.");
  }
  if (findIn("Nothing leaves   Forge until you APPROVE it.").length !== 1) {
    fail("the retired-sentence detector no longer matches its own example.");
  }

  const sources = walk(join(ROOT, "src"), (e) => e.endsWith(".ts") || e.endsWith(".tsx"));
  if (sources.length < 20) {
    fail(`only ${sources.length} source files under src/. Expected at least 20.`);
  }
  const publicText = walk(join(ROOT, "public"), (e) =>
    /\.(svg|txt|json|xml|webmanifest|html)$/.test(e),
  );
  const violations = [
    ...sources.flatMap(sourceViolations),
    ...publicText.flatMap(rawViolations),
  ];
  let summary = `${sources.length} source files, ${publicText.length} public files`;

  const i = process.argv.indexOf("--built");
  if (i !== -1) {
    const dir = join(ROOT, process.argv[i + 1] ?? ".next");
    const pages = walk(join(dir, "server", "app"), (e) => /\.(html|rsc|body)$/.test(e));
    const scripts = walk(join(dir, "static"), (e) => e.endsWith(".js"));
    // Non-vacuity: the build must contain the home page, and the home page
    // must contain the headline, or this read nothing a visitor sees.
    const home = pages.find((p) => p.endsWith(join("server", "app", "index.html")));
    if (!home) fail(`no prerendered home page under ${relative(ROOT, dir)}/server/app.`);
    if (!normalise(readFileSync(home, "utf8")).includes("walk the job")) {
      fail("the built home page does not contain its headline; the read is not the site.");
    }
    if (scripts.length < 5) fail(`only ${scripts.length} client scripts in the build.`);
    violations.push(...pages.flatMap(rawViolations), ...scripts.flatMap(rawViolations));
    summary += `, ${pages.length} built pages, ${scripts.length} built scripts`;
  }

  if (violations.length === 0) {
    console.log(
      `claims guard: clean. Read ${summary}.` +
        (allowPartner ? " JobTread rule OFF (ALLOW_JOBTREAD=true)." : ""),
    );
    return;
  }
  console.error(`\nclaims guard: ${violations.length} violation(s).\n`);
  for (const v of violations) console.error(`  ${v.where}\n    ${v.hit}`);
  console.error(
    "\nEach retired sentence is false once a customer's own tool can read a walk." +
      "\nRewrite it; the approved words are in scripts/copy-claims.test.mjs.\n",
  );
  process.exit(1);
}

try {
  main();
} catch (err) {
  console.error("claims guard CRASHED (not a pass):", err);
  process.exit(2);
}
