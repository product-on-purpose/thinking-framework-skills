#!/usr/bin/env node
// check-route-parity.mjs - guard against silently removing a published route.
//
// Clause 14.11(b) of the family Astro site standard. Compares the current built route set (every
// *.html under site/dist/) against a committed baseline (scripts/route-manifest.txt). FAILS if any
// baseline route is missing from the current build: a removed or renamed URL is a "Site not found"
// for any existing external link or bookmark. ADDED routes are allowed (new pages are expected),
// so the baseline only needs updating when a route is intentionally removed.
//
// When you intentionally remove a route: add a redirect for it (Astro renders the redirect source
// as a page, so the route stays present and this check still passes), OR update
// scripts/route-manifest.txt in the same commit with a reason.
//
// SCOPE (deliberate, normative per 14.11): this guard checks route PRESENCE, not page CONTENT. A
// route that keeps its path but silently regresses to a stub/empty page still passes here (the
// path is present). That is the same mechanism that lets an intentional redirect pass. The loud
// failure this guard exists to prevent is a removed/renamed URL ("Site not found"), which it does
// catch (a rename is one removed + one added, and removed-detection fires).
//
// Route paths are dist-relative (e.g. /frameworks/think-premortem/index.html) and do NOT carry the
// Pages base, so this guard is base-agnostic - only the manifest is per-repo. Ported from the FIXED
// agent-skills-toolkit guard, which hardened the pm-skills donor with an empty-but-existing dist
// hard-fail (kept symmetric with check-rendered-links.mjs). When the shared reusable workflow ships
// (ROADMAP Phase 1), this migrates to it.
//
// Usage:  node scripts/check-route-parity.mjs [distDir] [baselineFile]
//   distDir       default: site/dist
//   baselineFile  default: scripts/route-manifest.txt
//   (CI runs it from the site/ working dir as `node ../scripts/check-route-parity.mjs dist`.)
// Exit:   0 = every baseline route still present; 1 = one or more removed.
//
// Regenerate the baseline after an intentional route change:
//   node scripts/check-route-parity.mjs --update   (writes the current routes)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ROOT is the repo root (this script lives in scripts/), so defaults resolve cwd-independently.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2).filter((a) => a !== '--update');
const UPDATE = process.argv.includes('--update');
const DIST = path.resolve(argv[0] || path.join(ROOT, 'site', 'dist'));
const BASELINE = path.resolve(argv[1] || path.join(ROOT, 'scripts', 'route-manifest.txt'));

function routesIn(dir) {
  const out = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name.endsWith('.html')) {
        out.push('/' + path.relative(dir, full).split(path.sep).join('/'));
      }
    }
  };
  walk(dir);
  return out.sort();
}

if (!fs.existsSync(DIST)) {
  console.error(`route-parity: dist not found at ${DIST}; build the site first (cd site && npm run build).`);
  process.exit(1);
}

const current = routesIn(DIST);

// A built site is never empty; an existing-but-empty dist (a crashed build that emptied outDir)
// would make every baseline route count as removed and fail loudly anyway, which is the intended
// signal. Surface it explicitly so the failure reads as "build broke" not "you deleted everything".
if (current.length === 0 && !UPDATE) {
  console.error(`route-parity: ${DIST} exists but has no .html routes - the build likely failed and emptied outDir. Failing (a built site is never empty).`);
  process.exit(1);
}

if (UPDATE) {
  fs.writeFileSync(BASELINE, current.join('\n') + '\n', 'utf8');
  console.log(`route-parity: wrote ${current.length} routes to ${path.relative(ROOT, BASELINE)}`);
  process.exit(0);
}

if (!fs.existsSync(BASELINE)) {
  console.error(`route-parity: baseline not found at ${BASELINE}. Generate it with: node scripts/check-route-parity.mjs --update`);
  process.exit(1);
}

const baseline = fs.readFileSync(BASELINE, 'utf8').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
const currentSet = new Set(current);
const baselineSet = new Set(baseline);
const removed = baseline.filter((r) => !currentSet.has(r));
const added = current.filter((r) => !baselineSet.has(r));

console.log('=== Route Parity Check ===');
console.log(`baseline routes: ${baseline.length}   current routes: ${current.length}`);
if (added.length) {
  console.log(`\n${added.length} new route(s) (allowed; update the baseline when convenient):`);
  for (const r of added.slice(0, 20)) console.log(`  + ${r}`);
  if (added.length > 20) console.log(`  ... and ${added.length - 20} more`);
}

if (removed.length === 0) {
  console.log('\nPASS: every baseline route is still present in the build.');
  process.exit(0);
}

console.log(`\nFAIL: ${removed.length} baseline route(s) removed (these would 404 for existing links/bookmarks):`);
for (const r of removed) console.log(`  - ${r}`);
console.log('\nIf intentional: add a redirect (keeps the route present as a redirect page),');
console.log('or run `node scripts/check-route-parity.mjs --update` and commit the new baseline with a reason.');
process.exit(1);
