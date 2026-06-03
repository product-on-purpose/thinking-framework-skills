// check-rendered-links.mjs - assert the built site has zero browser-broken internal links.
//
// Clause 14.11(a) of the family Astro site standard: the rendered-link check with anchor
// resolution. A Starlight page builds to `slug/index.html` and is served one URL level deeper
// than its source file, so a filesystem-correct relative link can still 404 in the browser (the
// trailing-slash class), and a host-root link missing the base path lands at the bare github.io
// domain ("Site not found"). This guard resolves every intra-site href (relative or
// /thinking-framework-skills-absolute) against the page's REAL served URL and asserts the target
// exists in dist. External links (http/https/mailto/...) are skipped. #anchors are validated
// against the target page's element ids (advisory by default; set STRICT_ANCHORS=1 to enforce).
// Run after `npm run build`. The site mixes generated pages with hand-authored ones, so this is
// the regression gate that keeps every emitted link resolving in the browser.
//
// Ported from the FIXED agent-skills-toolkit guard (which hardened the pm-skills donor):
//   - bare-relative hrefs resolved via new URL() (askit F2: a bare `getting-started/` on a deep
//     page is no longer silently skipped),
//   - both attribute quote styles matched (askit F3),
//   - percent-escaped path segments decoded defensively before the filesystem lookup (askit F4),
//   - an empty-but-existing dist hard-fails (never a silent green next to a red build).
// The one deliberate change from askit: BASE is imported from the single source
// scripts/site-base.mjs (clause 14.7) instead of being a redeclared literal, so the build and
// this check can never disagree. When the shared reusable workflow ships (ROADMAP Phase 1), this
// migrates to it. See the astro-starlight-conformance release plan and ADR-style note.
//
// Usage:  node scripts/check-rendered-links.mjs [distDir]   (default: site/dist)
//         (CI runs it from the site/ working dir as `node ../scripts/check-rendered-links.mjs dist`.)
// Exit:   0 = all internal links resolve; 1 = one or more would 404 in the browser.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE } from './site-base.mjs';

// ROOT is the repo root (this script lives in scripts/), so the default dist resolves
// cwd-independently to site/dist whether run from the repo root or the site/ working dir.
// An explicit first argument overrides.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.resolve(process.argv[2] || path.join(ROOT, 'site', 'dist'));

if (!fs.existsSync(DIST)) {
  console.error(`check-rendered-links: dist dir not found at ${DIST}; run \`npm run build\` first`);
  process.exit(1);
}

// Scheme / protocol-relative links are out of scope. Pure #anchors are NOT skipped here (handled
// below as same-page anchor checks).
const SKIP = /^(https?:|mailto:|tel:|ftp:|ws:|wss:|data:|javascript:|\/\/)/i;

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else if (e.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

function urlOf(file) {
  let rel = path.relative(DIST, file).split(path.sep).join('/');
  if (rel.endsWith('/index.html')) rel = rel.slice(0, -'index.html'.length);
  else if (rel === 'index.html') rel = '';
  else rel = rel.replace(/\.html$/, '/');
  return BASE + '/' + rel;
}

function existsInDist(urlPath) {
  if (!urlPath.startsWith(BASE + '/')) return false;
  let rel = urlPath.slice((BASE + '/').length).replace(/\/$/, '');
  // Decode percent-escapes defensively so an encoded slug (for example my%20page) matches the real
  // on-disk name; keep the raw value if it is not valid encoding (never crash on malformed input).
  try { rel = decodeURIComponent(rel); } catch { /* keep raw */ }
  if (rel === '') return fs.existsSync(path.join(DIST, 'index.html'));
  if (fs.existsSync(path.join(DIST, rel, 'index.html'))) return true;
  const asFile = path.join(DIST, rel);
  if (fs.existsSync(asFile) && fs.statSync(asFile).isFile()) return true;
  if (fs.existsSync(path.join(DIST, rel + '.html'))) return true;
  return false;
}

// --- #anchor validation ----------------------------------------------------
// Extract element ids from a built page so links with a #fragment can be checked against real
// heading/element ids (build-aware, not filesystem). Cached per file.
const idCache = new Map();
function idsOfFile(distFile) {
  if (idCache.has(distFile)) return idCache.get(distFile);
  const set = new Set();
  try {
    // Accept both quote styles. Starlight emits double-quoted ids today, but a future
    // rehype/markdown plugin could emit single-quoted ids; matching both keeps a real
    // (browser-honored) anchor from being flagged broken under STRICT_ANCHORS. (name="..." is
    // deliberately NOT matched: <meta name=...> would flood the id set and mask broken anchors.)
    for (const m of fs.readFileSync(distFile, 'utf8').matchAll(/\sid=(?:"([^"]+)"|'([^']+)')/g)) set.add(m[1] ?? m[2]);
  } catch { /* unreadable: leave empty */ }
  idCache.set(distFile, set);
  return set;
}
// Reverse of urlOf: map a base-absolute URL path to its dist file.
function distFileFor(urlPath) {
  if (!urlPath.startsWith(BASE + '/')) return null;
  let rel = urlPath.slice((BASE + '/').length).replace(/\/$/, '');
  try { rel = decodeURIComponent(rel); } catch { /* keep raw */ }
  const cands = rel === ''
    ? [path.join(DIST, 'index.html')]
    : [path.join(DIST, rel, 'index.html'), path.join(DIST, rel), path.join(DIST, rel + '.html')];
  for (const c of cands) if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  return null;
}

const broken = [];
const brokenAnchors = [];
// Anchor checks are advisory by default (a broken anchor scrolls to top, it does not 404). Set
// STRICT_ANCHORS=1 to make them fail the build (CI does this for this small, partly hand-authored site).
const STRICT_ANCHORS = process.env.STRICT_ANCHORS === '1';
// A built site is never empty. An existing-but-empty dist is the state Astro leaves when a build
// crashes after emptying outDir; scanning zero pages would otherwise PASS silently and show a
// misleading green next to a red build. Fail loudly (kept symmetric with check-route-parity.mjs).
const pages = walk(DIST);
if (pages.length === 0) {
  console.error(`check-rendered-links: ${DIST} exists but has no .html pages - the build likely failed and emptied outDir. Failing (a built site is never empty).`);
  process.exit(1);
}
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const pageUrl = urlOf(file);
  for (const m of html.matchAll(/href=(?:"([^"]+)"|'([^']+)')/g)) {
    const raw = m[1] ?? m[2];
    if (SKIP.test(raw)) continue;
    const hashIdx = raw.indexOf('#');
    let frag = '';
    if (hashIdx !== -1) {
      const rawFrag = raw.slice(hashIdx + 1).split('?')[0];
      // A literal '%' that is not a valid percent-escape (e.g. #50%-off) makes decodeURIComponent
      // throw URIError; fall back to the undecoded fragment so a single hand-authored anchor cannot
      // crash the whole link check (the throw would also kill the browser-broken-link pass here).
      try { frag = decodeURIComponent(rawFrag); } catch { frag = rawFrag; }
    }
    // Same-page anchor (#frag): validate against this page's element ids.
    if (raw.startsWith('#')) {
      if (frag && !idsOfFile(file).has(frag)) brokenAnchors.push({ page: pageUrl, href: raw });
      continue;
    }
    // Everything that reaches here is an intra-site link (external schemes and protocol-relative //
    // were skipped above; pure #anchors were handled above): base-absolute
    // ('/thinking-framework-skills/x'), host-root missing the base ('/x', which resolves outside
    // BASE and is correctly flagged as the "Site not found" class), or relative - INCLUDING
    // bare-relative ('getting-started/', 'x.html') with no leading './' or '/'. Resolve them all
    // against the page's real URL; new URL() handles each form, so a broken bare-relative link on a
    // deep page is caught rather than silently skipped.
    const clean = raw.split('#')[0].split('?')[0];
    if (!clean) continue;
    let resolved;
    try { resolved = new URL(clean, 'https://x' + pageUrl).pathname; } catch { continue; }
    if (!existsInDist(resolved)) { broken.push({ page: pageUrl, href: raw, resolved }); continue; }
    // Page exists: if the link targets a #anchor, validate it against the target page.
    if (frag) {
      const tf = distFileFor(resolved);
      if (tf && !idsOfFile(tf).has(frag)) brokenAnchors.push({ page: pageUrl, href: raw });
    }
  }
}

console.log('=== Rendered Link Resolution Check ===');
console.log(`Base (single source, scripts/site-base.mjs): ${BASE}`);
console.log(`Pages scanned: ${pages.length}`);
console.log(`Browser-broken internal links: ${broken.length}`);
console.log(`Broken #anchors (${STRICT_ANCHORS ? 'enforcing' : 'advisory'}): ${brokenAnchors.length}`);

if (broken.length) {
  console.log('\nBroken internal links (resolved against the page URL):');
  const byPage = {};
  for (const b of broken) (byPage[b.page] ||= []).push(b);
  for (const pg of Object.keys(byPage).sort()) {
    console.log(`  ${pg}`);
    for (const b of byPage[pg]) console.log(`     ${b.href}  ->  ${b.resolved}`);
  }
}

if (brokenAnchors.length) {
  console.log(`\n${STRICT_ANCHORS ? 'Broken' : 'Advisory: broken'} #anchor link(s) (target page exists, fragment id does not):`);
  const byPage = {};
  for (const b of brokenAnchors) (byPage[b.page] ||= []).push(b);
  const list = Object.keys(byPage).sort();
  for (const pg of list.slice(0, 40)) {
    console.log(`  ${pg}`);
    for (const b of byPage[pg]) console.log(`     ${b.href}`);
  }
  if (list.length > 40) console.log(`  ... and ${list.length - 40} more page(s)`);
}

const fail = broken.length > 0 || (STRICT_ANCHORS && brokenAnchors.length > 0);
if (!fail) {
  const note = brokenAnchors.length ? ` (${brokenAnchors.length} advisory #anchor warning(s); set STRICT_ANCHORS=1 to enforce)` : '';
  console.log(`\nPASS: all internal links resolve in the browser${note}.`);
  process.exit(0);
}
const parts = [];
if (broken.length) parts.push(`${broken.length} browser-broken link(s)`);
if (STRICT_ANCHORS && brokenAnchors.length) parts.push(`${brokenAnchors.length} broken #anchor(s)`);
console.log(`\nFAIL: ${parts.join(' + ')}.`);
if (broken.length) {
  console.log('Fix broken links by routing to a published page or a GitHub source URL; the generator');
  console.log('emits relative, base-derived links (clause 14.7), so a break usually means a missing target.');
}
if (STRICT_ANCHORS && brokenAnchors.length) {
  console.log('Fix broken #anchors: a heading id was renamed/removed, or the fragment is stale.');
}
process.exit(1);
