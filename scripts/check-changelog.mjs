#!/usr/bin/env node
// check-changelog.mjs - release-doc consistency (D4). Asserts CHANGELOG.md parses to
// >=1 released version, has [Unreleased], and that the top RELEASED version equals
// package.json, library.json, and the top RELEASE-NOTES version. [Unreleased] is exempt,
// so build-phase PRs (which only touch [Unreleased]) stay green. No git tags (avoids the
// actions/checkout shallow-fetch foot-gun). Zero-dependency, UTF-8. check.mjs layer.
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
  const distinct = [...new Set(Object.values(all).map(norm))];
  if (distinct.length > 1) errors.push(`version mismatch: ${JSON.stringify(all)}`);
  if (errors.length) { for (const e of errors) console.error(`check-changelog: ${e}`); process.exit(1); }
  console.log(`check-changelog: OK (all at ${pkg}; [Unreleased] present).`);
}
