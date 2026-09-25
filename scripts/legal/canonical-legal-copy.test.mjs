// F-511 (integration T17, ruling 11): this site carries no copy of Forge's
// Privacy Policy or Terms of Service. The one copy is the app's
// (app.forge.equipment/privacy and /terms); /legal and the /terms and
// /privacy redirects link there (F-662).
//
// The defect. /legal carried its own Privacy Policy (effective 16 June) and
// Terms, which drifted from the app's: its Privacy Policy said declining AI
// consent still lets you use Forge, and its Terms printed a free-beta change
// log. F-662 replaced them with links. This keeps them links: it fails when a
// run of the published body text reappears in src/ or public/, or a link to
// the old separate domain does.
//
// The matcher and the fingerprints are byte-identical twins of Forge_Web's
// (Forge/dashboard/scripts/legal/). Forge_Web's
// tests/canonicalLegalOneCopy.test.ts pins the same two hashes, so an edit to
// one repo's copy alone turns that repo red. To change either, change both
// repos and update both pins.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  OLD_DOMAIN_LINK,
  STRIDE,
  WINDOW,
  allFingerprints,
  createMatcher,
  fnv1a64,
  listFiles,
  scan,
  spanFingerprints,
  windowHash,
  words,
} from "./canonical-legal-copy.mjs";

const MATCHER_BODY_SHA256 = "4c077cf638e60dc8b757846cafe584dcdb453b334f5030f8967eceab347c7c16";
const FINGERPRINTS_SHA256 = "b894210be12914bd85d3d38055ce2de4afb98e76105df1cd51ebe44c6d104478";

const ROOT = new URL("../..", import.meta.url).pathname;
const read = (rel) => readFileSync(new URL(rel, import.meta.url), "utf8");
const sha = (text) => createHash("sha256").update(text, "utf8").digest("hex");
const fingerprints = () => JSON.parse(read("./canonical-legal-fingerprints.json"));
const SCANNED = ["src", "public"];

test("the matcher body and the fingerprints are Forge_Web's twins (sha256)", () => {
  const lines = read("./canonical-legal-copy.mjs").split("\n");
  const marker = lines.findIndex((l) => l.startsWith("// ---- BODY"));
  assert.ok(marker >= 0, "canonical-legal-copy.mjs has no '// ---- BODY' line");
  const body = lines.slice(marker + 1).join("\n");
  assert.ok(body.length > 1000, "the matcher body is empty or truncated");
  assert.equal(sha(body), MATCHER_BODY_SHA256, "matcher body changed: reconcile with Forge_Web, update both pins");
  assert.equal(
    sha(read("./canonical-legal-fingerprints.json")),
    FINGERPRINTS_SHA256,
    "fingerprints changed: copy Forge_Web's file here, update both pins",
  );
  const json = fingerprints();
  assert.equal(json.window, WINDOW);
  assert.equal(json.stride, STRIDE);
  assert.ok(json.privacy.length >= 150 && json.terms.length >= 150, "the fingerprints are too few to mean anything");
});

test("src/ and public/ carry no Privacy or Terms body text and no old-domain link", () => {
  const files = SCANNED.flatMap((dir) => listFiles(ROOT, dir, ["node_modules", ".next"]));
  assert.ok(files.length >= 40, `the walk found ${files.length} files; expected the site`);
  assert.ok(files.includes("src/app/legal/page.tsx"), "the walk missed /legal");
  const findings = scan(ROOT, files, allFingerprints(fingerprints()));
  assert.deepEqual(
    findings,
    [],
    "The Privacy Policy and Terms are published once, by the app (app.forge.equipment/privacy and /terms). " +
      "Link there (termsUrl(), privacyUrl() in src/lib/constants.ts); do not copy them.",
  );
});

test("words and hashes equal Forge_Web's and Forge_IOS's ports (pinned vectors)", () => {
  assert.equal(fnv1a64(""), "cbf29ce484222325");
  assert.equal(fnv1a64("a"), "af63dc4c8601ec8c");
  assert.equal(fnv1a64("foobar"), "85944171f73967e8");
  assert.equal(
    words("Forge&apos;s policy:\\nWe don’t sell data. Line\\tTab \\u{2022} bullet &#39;x&#x27; ok").join(" "),
    "forge s policy we don t sell data line tab bullet x ok",
  );
  assert.equal(windowHash(words("one two three four five six seven eight nine ten eleven twelve"), 0), "1943c916d709c840");
});

test("a planted run is found in a scanned file; other copy and the package id are admitted", () => {
  // A synthetic body standing in for the published text, so this repo
  // carries none of it. The real-text red is shown by planting a paragraph
  // of the app's page in src/ (see the PR).
  const policy =
    "The quarry keeps a ledger of every stone it cuts, and each ledger line names the mason, " +
    "the block, the face that was dressed and the day the cart left the yard for the river.";
  const synthetic = spanFingerprints(policy);
  const run = words(policy).slice(6, 6 + WINDOW + STRIDE - 1).join(" ");
  const dir = mkdtempSync(join(tmpdir(), "f511-"));
  mkdirSync(join(dir, "src"));
  writeFileSync(join(dir, "src", "Planted.tsx"), `<p>\n  ${run}\n</p>\n`);
  writeFileSync(join(dir, "src", "Other.tsx"), "<p>Read the Terms of Service and the Privacy Policy in the app.</p>\n");
  writeFileSync(join(dir, "src", "Store.tsx"), 'const id = "com.forgesolutions.forge";\n');
  writeFileSync(join(dir, "src", "Old.tsx"), `const u = "https://${["forgesolutions", "io"].join(".")}/terms";\n`);
  const found = scan(dir, listFiles(dir, "src"), synthetic).map((f) => [f.file, f.copyAt.length > 0, f.oldDomain.length > 0]);
  assert.deepEqual(found, [
    ["src/Old.tsx", false, true],
    ["src/Planted.tsx", true, false],
  ]);
  assert.equal(createMatcher(synthetic).find("Forge links the one published policy.").length, 0);
  assert.equal(OLD_DOMAIN_LINK.test("https://app.forge.equipment/privacy"), false);
});
