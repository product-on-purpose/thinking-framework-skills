#!/usr/bin/env node
// =============================================================================
// check-changelog.mjs - release-doc version + changelog-shape consistency (D4).
//
// what-it-is:   a standalone conformance check script (check.mjs layer 14).
// what-it-does: two assertions. (1) VERSION: CHANGELOG.md parses to >=1 released version, has
//               an [Unreleased] section, and the top RELEASED version equals package.json,
//               library.json, and the top RELEASE-NOTES version ([Unreleased] is exempt, so
//               build-phase PRs that only touch it stay green). (2) SHAPE: no version block
//               repeats a Keep a Changelog change type.
// why:          each PR prepending its own "### Added" block is how [Unreleased] accumulated
//               four Added / four Changed / three Fixed / two Security sections across the
//               seven v0.14.0-cycle merges without the gate noticing - assertion 1 only ever
//               compared version numbers, never section shape.
// used-by:      scripts/check.mjs (layer 14); tests/check-changelog.test.mjs (imports
//               topReleasedVersion, topReleaseNotesVersion, duplicateSections)
// =============================================================================
// No git tags (avoids the actions/checkout shallow-fetch foot-gun). Zero-dependency, UTF-8.
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(resolve(ROOT, p), 'utf8');
const norm = (v) => v.replace(/^v/, '').replace(/^\[|\]$/g, '').trim();

export function topReleasedVersion(md) {
  for (const m of md.matchAll(/^##\s+\[([^\]]+)\]/gm)) {
    if (/unreleased/i.test(m[1])) continue;
    const v = norm(m[1]);
    if (/^\d+\.\d+\.\d+$/.test(v)) return v;
  }
  return null;
}

export function topReleaseNotesVersion(md) {
  const m = md.match(/^##\s+v?(\d+\.\d+\.\d+)\s*$/m);
  return m ? m[1] : null;
}

// Keep a Changelog's six change types. The rule is scoped to these on purpose: a repeated
// non-type h3 is a formatting choice, while a repeated TYPE is the prepend defect.
const CHANGE_TYPES = new Set(['Added', 'Changed', 'Deprecated', 'Removed', 'Fixed', 'Security']);

// Report every change type used more than once inside one "## [version]" block, in
// first-appearance order. Fence-aware, so a heading quoted in a code sample does not count.
export function duplicateSections(md) {
  const dupes = [];
  let version = null;
  let counts = null;   // Map<type, n> for the block being read
  let order = null;    // types in first-appearance order, so output is stable
  let inFence = false;
  let fenceChar = '';
  const flush = () => {
    if (!order) return;
    for (const type of order) {
      const count = counts.get(type);
      if (count > 1) dupes.push({ version, type, count });
    }
  };
  for (const line of md.split('\n')) {
    const fence = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      const ch = fence[1][0];
      if (!inFence) { inFence = true; fenceChar = ch; }
      else if (ch === fenceChar) { inFence = false; fenceChar = ''; }
      continue;
    }
    if (inFence) continue;

    const h2 = line.match(/^##\s+(.+?)\s*$/);
    if (h2) {
      flush();
      const bracketed = h2[1].match(/^\[([^\]]+)\]/);
      version = norm(bracketed ? bracketed[1] : h2[1].replace(/\s*-\s*\d{4}-\d{2}-\d{2}$/, ''));
      counts = new Map();
      order = [];
      continue;
    }

    const h3 = line.match(/^###\s+(.+?)\s*$/);
    if (h3 && counts && CHANGE_TYPES.has(h3[1])) {
      if (!counts.has(h3[1])) order.push(h3[1]);
      counts.set(h3[1], (counts.get(h3[1]) || 0) + 1);
    }
  }
  flush();
  return dupes;
}

// Run as a script (not when imported by tests)
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const changelog = read('CHANGELOG.md');
  const errors = [];
  if (!/##\s+\[unreleased\]/i.test(changelog)) errors.push('CHANGELOG.md is missing an [Unreleased] section');
  const cl = topReleasedVersion(changelog);
  if (!cl) errors.push('CHANGELOG.md has no released ## [x.y.z] section');
  const pkg = JSON.parse(read('package.json')).version;
  const lib = JSON.parse(read('library.json')).version;
  const rn = topReleaseNotesVersion(read('RELEASE-NOTES.md'));
  const all = { 'package.json': pkg, 'library.json': lib, 'CHANGELOG top released': cl, 'RELEASE-NOTES top': rn };
  const distinct = [...new Set(Object.values(all).map((v) => (v == null ? v : norm(v))))];
  if (distinct.length > 1) errors.push(`version mismatch: ${JSON.stringify(all)}`);
  for (const d of duplicateSections(changelog)) {
    errors.push(
      `CHANGELOG.md [${d.version}] has ${d.count} "### ${d.type}" sections; Keep a Changelog wants ` +
      `one per change type per release. Merge them into one, preserving bullet order.`,
    );
  }
  if (errors.length) { for (const e of errors) console.error(`check-changelog: ${e}`); process.exit(1); }
  console.log(`check-changelog: OK (all at ${pkg}; [Unreleased] present; no duplicated change-type sections).`);
}
