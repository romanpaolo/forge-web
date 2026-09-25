// The F-631 text-fit detector has a twin: Forge-Solutions-Corp/Forge_Web,
// Forge/dashboard/scripts/text-fit/text-fit-detector.js. Everything below the
// "// ---- BODY" line must be byte-identical in both repos, and the twin
// carries this same test with the same hash, so an edit to one copy alone
// turns that repo red. To change the detector: edit both bodies, then update
// EXPECTED here and in the twin's test in the same ticket.
//
// Same bytes the header's check command hashes:
//   sed '1,/^\/\/ ---- BODY/d' scripts/text-fit/text-fit-detector.js | shasum -a 256
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const EXPECTED = "cc351173f9e9f4c03e0d57762911fc9e474e238758c3deec45abbcdd79b69064";

function detectorBody() {
  const src = readFileSync(new URL("./text-fit/text-fit-detector.js", import.meta.url), "utf8");
  const lines = src.split("\n");
  const marker = lines.findIndex((l) => l.startsWith("// ---- BODY"));
  assert.ok(marker >= 0, "text-fit-detector.js has no '// ---- BODY' line");
  return lines.slice(marker + 1).join("\n");
}

test("the text-fit detector body matches its Forge_Web twin (sha256)", () => {
  const body = detectorBody();
  assert.ok(body.length > 1000, "the detector body is empty or truncated");
  const sha = createHash("sha256").update(body, "utf8").digest("hex");
  assert.equal(
    sha,
    EXPECTED,
    "scripts/text-fit/text-fit-detector.js body changed. Reconcile it with the Forge_Web twin, then update EXPECTED in both repos' tests.",
  );
});
