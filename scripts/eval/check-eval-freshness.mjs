#!/usr/bin/env node
// =============================================================================
// check-eval-freshness.mjs - which skills' eval cases changed since they were last measured?
//
// what-it-is:   an ADVISORY report, not a gate layer (roadmap C2-1, SPEC-03 item 5).
// what-it-does: for every skill the committed scorecards measured, compares the eval/cases.md
//               fingerprint recorded by the newest scorecard of each kind with the file as it is
//               now, and lists the skills whose cases changed: a prioritized re-eval queue.
// why:          a sidecar stamp says WHEN a skill was measured, not WHAT was measured. Editing a
//               skill's cases after a run silently detaches the published figure from the cases it
//               describes. This makes that visible before deciding what to re-run. It never fails
//               the build, because the eval is deliberately offline and a re-run is paid spend.
// used-by:      npm run eval:freshness; documented in scripts/eval/README.md
// =============================================================================
//
// Exit: always 0. Scorecards dated before 2026-10-14 carry no fingerprints, so their skills are
// counted as "unrecorded" until the next provenanced run measures them.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkFreshness } from '../lib/eval-results-lib.mjs';
import { skillCasesFingerprints } from '../lib/fingerprint-lib.mjs';
import { casesReader } from './finalize.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const dir = join(ROOT, 'docs', 'internal', 'eval-results');
const entries = readdirSync(dir)
  .filter((n) => n.toLowerCase().endsWith('.json'))
  .map((name) => {
    try { return { name, parsed: JSON.parse(readFileSync(join(dir, name), 'utf8')) }; } catch { return { name, parsed: null }; }
  });

const slugs = readdirSync(join(ROOT, 'skills'))
  .filter((d) => d.startsWith('think-') && existsSync(join(ROOT, 'skills', d, 'eval', 'cases.md')))
  .map((d) => d.replace(/^think-/, ''));
const current = skillCasesFingerprints(slugs, casesReader(ROOT));

const { changed, fresh, unrecorded } = checkFreshness(entries, current);
console.log(`eval:freshness: ${changed.length} changed since measured, ${fresh} unchanged, ${unrecorded} measured before fingerprints were recorded.`);
if (changed.length) {
  console.log('\nRe-eval queue (eval/cases.md differs from what the newest scorecard measured):');
  for (const c of changed) console.log(`  - ${c.slug} (${c.field}, measured by ${c.file}): ${c.recorded} -> ${c.current ?? 'file removed'}`);
}
process.exit(0);
