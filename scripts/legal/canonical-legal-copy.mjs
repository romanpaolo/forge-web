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
// (/legal#terms, /legal#privacy and the /terms and /privacy redirects in
// next.config.ts, F-662) and must carry none of the text. The fingerprints
// are hashes of every 12-word window of that body, sampled every 4 words;
// any 15-word run of it in a file here matches one. They carry none of the
// text. It also refuses a link to the old separate domain (forgesolutions,
// dot io).
//
// Which files: every file git would commit (repoFiles), not a folder list,
// so next.config.ts, scripts/ and the root files are read as well as src/
// and public/. The body check exempts nothing; the old-domain check exempts
// documentation only (isDocumentation: the repo-root docs/ and README files).
//
// CI runs scripts/legal/canonical-legal-copy.test.mjs (`npm run
// test:legal-copy`). A manual sweep of any checkout:
//   node scripts/legal/canonical-legal-copy.mjs \
//     --fingerprints scripts/legal/canonical-legal-fingerprints.json --root .
// Exit 1 and a list of files when a file carries the body text or links to
// the old domain; exit 0 otherwise.
//
// When the app's pages change (T18's amendments, for one), Forge_Web
// regenerates the JSON; copy it here and update both repos' pins.

// ---- BODY
import { execFileSync } from "node:child_process";
import { lstatSync, readdirSync, readFileSync, realpathSync, statSync } from "node:fs";
import { join } from "node:path";
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

/**
 * The character a numeric entity names, or null when it names no Unicode
 * scalar value (past U+10FFFF, or a surrogate). Such an entity stays literal
 * text, as the Swift port's `Unicode.Scalar(_:)` leaves it; it never throws.
 */
function scalarOf(codePoint) {
  if (!Number.isSafeInteger(codePoint) || codePoint > 0x10ffff) return null;
  if (codePoint >= 0xd800 && codePoint <= 0xdfff) return null;
  return String.fromCodePoint(codePoint);
}

/** The words of `text`, in order, after the normalisation described above. */
export function words(text) {
  const decoded = String(text)
    .replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (whole, name) => {
      const lower = name.toLowerCase();
      if (lower.startsWith("#x")) return scalarOf(parseInt(lower.slice(2), 16)) ?? whole;
      if (lower.startsWith("#")) return scalarOf(parseInt(lower.slice(1), 10)) ?? whole;
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
 * checked, not only multiples of STRIDE).
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

/** The 1-based numbers of the lines of `text` that link the old domain. */
export function oldDomainLines(text) {
  const lines = [];
  text.split("\n").forEach((line, i) => {
    if (OLD_DOMAIN_LINK.test(line)) lines.push(i + 1);
  });
  return lines;
}

/**
 * Every file under `root` that git would commit: tracked, or untracked and
 * not ignored, as sorted `root`-relative POSIX paths. The set is git's, never
 * a list of folder names. Files deleted on disk are left out.
 *
 * A symlink is read as what it points at, under the LINK's path: a server
 * serves the target's bytes at the link, and documentation is judged by
 * where the link sits, so a link in public/ into docs/ is checked (F-835,
 * judge F-511 R2 lens B L2). A linked folder gives every file under it; a
 * dangling link ships nothing and is left out.
 *
 * A git submodule or a nested repository is another repository's files,
 * which git does not list and this scan cannot read, so it throws rather
 * than pass on nothing (F-835, judges F-511 R2 lens A L3, lens B L3).
 * Outside a git checkout this throws too: a scan of nothing proves nothing.
 */
export function repoFiles(root) {
  let listing;
  try {
    listing = execFileSync("git", ["-C", root, "ls-files", "-z", "--cached", "--others", "--exclude-standard"], {
      maxBuffer: 256 * 1024 * 1024,
      stdio: ["ignore", "pipe", "pipe"],
    }).toString("utf8");
  } catch (error) {
    throw new Error(`cannot list the files of ${root} with git (${String(error.message).split("\n")[0]}); the scan reads git's list`);
  }
  const out = new Set();
  const nested = [];
  for (const rel of listing.split("\0")) {
    if (!rel) continue;
    // git lists an untracked nested repository as its folder, with a slash.
    if (rel.endsWith("/")) {
      nested.push(rel.slice(0, -1));
      continue;
    }
    let entry;
    try {
      entry = lstatSync(join(root, rel));
    } catch {
      continue;
    }
    if (entry.isFile()) out.add(rel);
    else if (entry.isSymbolicLink()) for (const file of linkedFiles(root, rel, new Set())) out.add(file);
    // A tracked path that is a folder on disk is a submodule (a gitlink).
    else if (entry.isDirectory()) nested.push(rel);
  }
  if (nested.length) {
    throw new Error(
      `git lists another repository inside ${root} (a submodule or a nested repository): ${[...new Set(nested)].sort().join(", ")}. ` +
        "The scan cannot read its files, so it refuses rather than pass them unread. Copy the files in, or scan that repository too.",
    );
  }
  return [...out].sort();
}

/** The files a symlink at `rel` ships, under the link's path. `seen` ends a folder cycle. */
function linkedFiles(root, rel, seen) {
  let target;
  try {
    target = statSync(join(root, rel));
  } catch {
    return []; // dangling: nothing ships
  }
  if (target.isFile()) return [rel];
  if (!target.isDirectory()) return [];
  const real = realpathSync(join(root, rel));
  if (seen.has(real)) return [];
  const files = [];
  for (const name of readdirSync(join(root, rel))) {
    if (name === ".git") continue;
    files.push(...linkedFiles(root, `${rel}/${name}`, new Set([...seen, real])));
  }
  return files;
}

/**
 * Documentation, which only the old-domain check exempts (a doc may quote
 * the old domain as history); nothing exempts a doc from the body check.
 * `rel` is relative to the repo root: a file under the repo-root docs/
 * folder, or a README.md that is not under a public/ folder (a web server
 * serves that folder as it is). Every other file is checked for both,
 * markdown included: the app's content/legal/msa/*.md is the published MSA.
 */
export function isDocumentation(rel) {
  if (rel.startsWith("docs/")) return true;
  return /(?:^|\/)README\.md$/i.test(rel) && !/(?:^|\/)public\//.test(rel);
}

function utf16(bytes, bigEndian) {
  const even = Buffer.from(bytes.subarray(0, bytes.length - (bytes.length % 2)));
  if (bigEndian) even.swap16();
  return even.toString("utf16le");
}

/**
 * The text of a file, whatever its encoding; no file is skipped. A file that
 * starts with a UTF-16 byte-order mark is decoded as UTF-16 in that order.
 * Any other file is read as UTF-8, where a byte that is not UTF-8 becomes
 * U+FFFD and separates words as any other non-letter does (so Latin-1 text
 * reads the same). Zero characters are then dropped: every character a word
 * is made of is ASCII, so UTF-16 or UTF-32 text with no mark, in either byte
 * order, still reads as its words, and a binary file reads as noise.
 */
export function readText(absPath) {
  const buf = readFileSync(absPath);
  let text;
  if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) text = utf16(buf.subarray(2), false);
  else if (buf.length >= 2 && buf[0] === 0xfe && buf[1] === 0xff) text = utf16(buf.subarray(2), true);
  else text = buf.toString("utf8");
  return text.replace(/\0/g, "");
}

/**
 * Scan `files` (relative to `root`). The body check reads every file; the
 * old-domain check skips documentation. Returns one finding per offending
 * file: `{ file, copyAt: [word offsets], oldDomain: [line numbers] }`.
 */
export function scan(root, files, fingerprints) {
  const matcher = createMatcher(fingerprints);
  const findings = [];
  for (const file of files) {
    const text = readText(join(root, file));
    const copyAt = matcher.find(text);
    const oldDomain = isDocumentation(file) ? [] : oldDomainLines(text);
    if (copyAt.length || oldDomain.length) findings.push({ file, copyAt, oldDomain });
  }
  return findings;
}

/** Every fingerprint in a fingerprint file, both documents. */
export function allFingerprints(json) {
  return [...json.privacy, ...json.terms];
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 2) {
    if (argv[i] === "--fingerprints") args.fingerprints = argv[i + 1];
    else if (argv[i] === "--root") args.root = argv[i + 1];
    else args.unknown = argv[i];
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.fingerprints || !args.root || args.unknown) {
    console.error("usage: canonical-legal-copy.mjs --fingerprints <json> --root <git checkout>");
    process.exit(2);
  }
  const json = JSON.parse(readFileSync(args.fingerprints, "utf8"));
  if (json.window !== WINDOW || json.stride !== STRIDE) {
    console.error(`fingerprint file was made with window ${json.window}, stride ${json.stride}; this matcher uses ${WINDOW}, ${STRIDE}`);
    process.exit(2);
  }
  const files = repoFiles(args.root);
  if (files.length === 0) {
    console.error(`git lists no files under ${args.root}; the scan would prove nothing`);
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
