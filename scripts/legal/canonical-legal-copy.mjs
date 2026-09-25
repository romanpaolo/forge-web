// F-511 TWIN COPY (integration T17, ruling 11). This file has a twin in
// Forge-Solutions-Corp/Forge_Web, Forge/dashboard/scripts/legal/canonical-legal-copy.mjs.
// Everything below the "// ---- BODY" line must be byte-identical in both
// repos, and each repo pins the body's sha256 in a test, so an edit to one
// copy alone turns that repo red. To change the matcher: edit both bodies,
// then update the pinned hash in both repos' tests in the same ticket.
// canonical-legal-fingerprints.json beside it is a byte-identical copy of the
// Forge_Web file of the same name, pinned the same way.
//
// What it is for. Forge publishes ONE Privacy Policy and ONE Terms of
// Service: the app's app.forge.equipment/privacy and /terms (Forge_Web
// app/privacy/page.tsx and app/terms/page.tsx). This site links there
// (/legal#terms, /legal#privacy and the /terms and /privacy redirects,
// F-662) and must carry none of the text. The fingerprints are hashes of
// every 12-word window of that body, sampled every 4 words; any 15-word run
// of it in a file here matches one. They carry none of the text.
// It also refuses a link to the old separate domain (forgesolutions, dot io).
//
// CI (scripts/legal/canonical-legal-copy.test.mjs, `npm run test:legal-copy`):
//   node scripts/legal/canonical-legal-copy.mjs \
//     --fingerprints scripts/legal/canonical-legal-fingerprints.json \
//     --root . --scan src --scan public
// Exit 1 and a list of files when a scanned file carries the body text or
// links to the old domain; exit 0 otherwise.
//
// When the app's pages change (T18's amendments, for one), Forge_Web
// regenerates the JSON; copy it here and update both repos' pins.

// ---- BODY
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { pathToFileURL } from "node:url";

/** Words per fingerprint window. */
export const WINDOW = 12;
/** Windows are sampled every STRIDE words of a canonical span. */
export const STRIDE = 4;

const NAMED_ENTITIES = {
  amp: "&",
  apos: "'",
  quot: '"',
  nbsp: " ",
  lsquo: "'",
  rsquo: "'",
  ldquo: '"',
  rdquo: '"',
  mdash: " ",
  ndash: " ",
  hellip: " ",
};

/** The words of `text`, in order, after the normalisation described above. */
export function words(text) {
  const decoded = String(text)
    .replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (whole, name) => {
      const lower = name.toLowerCase();
      if (lower.startsWith("#x")) return String.fromCodePoint(parseInt(lower.slice(2), 16));
      if (lower.startsWith("#")) return String.fromCodePoint(parseInt(lower.slice(1), 10));
      return NAMED_ENTITIES[lower] ?? whole;
    })
    .replace(/\\u\{[0-9a-fA-F]+\}|\\[nrt]/g, " ");
  return decoded.toLowerCase().match(/[a-z0-9]+/g) ?? [];
}

const FNV_OFFSET = 0xcbf29ce484222325n;
const FNV_PRIME = 0x100000001b3n;
const MASK_64 = 0xffffffffffffffffn;

/** FNV-1a 64 of an ASCII string, as 16 lower-case hex digits. */
export function fnv1a64(ascii) {
  let hash = FNV_OFFSET;
  for (let i = 0; i < ascii.length; i++) {
    hash ^= BigInt(ascii.charCodeAt(i));
    hash = (hash * FNV_PRIME) & MASK_64;
  }
  return hash.toString(16).padStart(16, "0");
}

/** The hash of the window of WINDOW words starting at `start`. */
export function windowHash(ws, start) {
  return fnv1a64(ws.slice(start, start + WINDOW).join(" "));
}

/**
 * Fingerprints of one canonical span of body text: its windows at
 * word offsets 0, STRIDE, 2*STRIDE, ... A span shorter than WINDOW words
 * contributes nothing.
 */
export function spanFingerprints(text) {
  const ws = words(text);
  const out = [];
  for (let i = 0; i + WINDOW <= ws.length; i += STRIDE) out.push(windowHash(ws, i));
  return out;
}

/**
 * A matcher over a set of fingerprints. `find(text)` returns the word
 * offsets in `text` where a canonical window starts (every offset is
 * checked, not only multiples of STRIDE). The first-two-words prefilter
 * only skips windows that cannot match; it never changes the answer.
 */
export function createMatcher(fingerprints) {
  const set = new Set(fingerprints);
  return {
    size: set.size,
    find(text) {
      const ws = words(text);
      const hits = [];
      for (let i = 0; i + WINDOW <= ws.length; i++) {
        if (set.has(windowHash(ws, i))) hits.push(i);
      }
      return hits;
    },
  };
}

/**
 * A link to the old separate domain. The forgesolutions dot io host was
 * never Forge's domain; Android's paywall linked Terms and Privacy there
 * (PaywallScreen.kt, fixed by F-667). This file never spells the host out,
 * so a whole-repo scan does not flag the guard itself. The Android package
 * id com.forgesolutions.forge is not a link and does not match.
 */
export const OLD_DOMAIN_LINK = /(?:https?:\/\/)?(?:[a-z0-9-]+\.)*forgesolutions\.(?:io|com|net|org|co|ai|app)\b/i;

/** Files under `dir` (recursively), as paths relative to `root`, sorted. */
export function listFiles(root, dir, skipDirs = []) {
  const out = [];
  const walk = (abs) => {
    let entries;
    try {
      entries = readdirSync(abs, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const child = join(abs, entry.name);
      if (entry.isDirectory()) {
        if (!skipDirs.includes(entry.name)) walk(child);
      } else if (entry.isFile()) {
        out.push(relative(root, child).split(sep).join("/"));
      }
    }
  };
  walk(join(root, dir));
  return out.sort();
}

/** Text of a file, or null for a binary or oversized one. */
export function readText(absPath) {
  const size = statSync(absPath).size;
  if (size > 4 * 1024 * 1024) return null;
  const buf = readFileSync(absPath);
  if (buf.includes(0)) return null;
  return buf.toString("utf8");
}

/**
 * Scan `files` (relative to `root`). Returns one finding per offending
 * file: `{ file, copyAt: [word offsets], oldDomain: [line numbers] }`.
 */
export function scan(root, files, fingerprints) {
  const matcher = createMatcher(fingerprints);
  const findings = [];
  for (const file of files) {
    const text = readText(join(root, file));
    if (text === null) continue;
    const copyAt = matcher.find(text);
    const oldDomain = [];
    text.split("\n").forEach((line, i) => {
      if (OLD_DOMAIN_LINK.test(line)) oldDomain.push(i + 1);
    });
    if (copyAt.length || oldDomain.length) findings.push({ file, copyAt, oldDomain });
  }
  return findings;
}

/** Every fingerprint in a fingerprint file, both documents. */
export function allFingerprints(json) {
  return [...json.privacy, ...json.terms];
}

function parseArgs(argv) {
  const args = { scan: [], skip: ["node_modules", ".next", ".git"] };
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i];
    const value = argv[i + 1];
    if (key === "--fingerprints") args.fingerprints = value;
    else if (key === "--root") args.root = value;
    else if (key === "--scan") args.scan.push(value);
    else if (key === "--skip-dir") args.skip.push(value);
    else continue;
    i++;
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.fingerprints || !args.root || args.scan.length === 0) {
    console.error("usage: canonical-legal-copy.mjs --fingerprints <json> --root <dir> --scan <dir> [--scan <dir>] [--skip-dir <name>]");
    process.exit(2);
  }
  const json = JSON.parse(readFileSync(args.fingerprints, "utf8"));
  if (json.window !== WINDOW || json.stride !== STRIDE) {
    console.error(`fingerprint file was made with window ${json.window}, stride ${json.stride}; this matcher uses ${WINDOW}, ${STRIDE}`);
    process.exit(2);
  }
  const files = args.scan.flatMap((dir) => listFiles(args.root, dir, args.skip));
  if (files.length === 0) {
    console.error(`no files found under ${args.scan.join(", ")}; the scan would prove nothing`);
    process.exit(2);
  }
  const findings = scan(args.root, files, allFingerprints(json));
  console.log(`canonical legal copy: scanned ${files.length} files against ${allFingerprints(json).length} fingerprints`);
  for (const f of findings) {
    if (f.copyAt.length) console.log(`  ${f.file}: carries Privacy or Terms body text (${f.copyAt.length} matching windows)`);
    if (f.oldDomain.length) console.log(`  ${f.file}: links the old domain forgesolutions at line(s) ${f.oldDomain.join(", ")}`);
  }
  if (findings.length) {
    console.log("The Privacy Policy and Terms are published once, at app.forge.equipment/privacy and /terms (Forge_Web). Link there; do not copy them.");
    process.exit(1);
  }
  console.log("canonical legal copy: no copy of the body text and no old-domain link");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
