#!/usr/bin/env node
// =============================================================================
// reconstruct-contested-output.mjs - one-shot retro-fix for #95 (missing output-eval json).
//
// what-it-is:   a one-shot retrofit script, not part of the regular eval pipeline
//               (compare scripts/eval/finalize.mjs, which the pipeline uses on every
//               run).
// what-it-does: parses the committed 2026-06-19-contested-output-eval.md table (7 skill
//               rows) back into scorer input (perCheck arrays synthesized as all-pass,
//               since the .md already shows zero failed checks), re-emits the .json
//               sidecar through the real scorer (scoreOutput), and aborts instead of
//               writing unless the regenerated body byte-matches the committed .md (after
//               stripping the hand-added cohort HTML comment and normalizing line
//               endings).
// why:          issue #95 - the contested-output eval's raw run results were scratch and
//               lost, leaving a published .md scorecard with no .json sidecar, which the
//               14th gate layer (scripts/check-eval-results.mjs) now requires every
//               scorecard to have. Verifying the round-trip against the already-committed
//               .md before writing means the reconstructed sidecar can't silently diverge
//               from numbers already public.
// used-by:      run once directly (`node scripts/eval/reconstruct-contested-output.mjs`);
//               no automated caller - see .superpowers/sdd/task-5-brief.md and
//               docs/internal/backlog.md (#95)
// =============================================================================

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scoreOutput } from './score-lib.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const mdPath = join(ROOT, 'docs/internal/eval-results/2026-06-19-contested-output-eval.md');
const jsonPath = mdPath.replace(/\.md$/, '.json');

const committed = readFileSync(mdPath, 'utf8');
// Strip a leading HTML comment block (the hand-added cohort note) + following blank line.
const body = committed.replace(/^<!--[\s\S]*?-->\s*\n/, '');
const norm = (s) => s.replace(/\r\n/g, '\n').replace(/\s+$/, '');

// Parse the table rows: | <skill> | <pct>% (<passed>/<total>) | <chars> |
const rows = [...body.matchAll(/^\|\s*([a-z0-9-]+)\s*\|\s*\d+%\s*\((\d+)\/(\d+)\)\s*\|\s*(\d+|\?)\s*\|$/gm)];
if (rows.length === 0) { console.error('reconstruct: no skill rows parsed - aborting'); process.exit(1); }

const results = rows.map(([, skill, passed, total, chars]) => ({
  skill,
  passed: +passed,
  total: +total,
  artifactChars: chars === '?' ? undefined : +chars,
  perCheck: Array.from({ length: +total }, (_, i) => ({ check: `c${i}`, pass: true })), // 0 fails => check text never surfaces
}));

const { md, json } = scoreOutput({ results });

if (norm(md) !== norm(body)) {
  console.error('reconstruct: regenerated body does NOT match the committed .md after normalization. Aborting (do not commit a divergent artifact).');
  console.error('--- expected (committed body) ---\n' + norm(body));
  console.error('--- got (regenerated) ---\n' + norm(md));
  process.exit(1);
}

writeFileSync(jsonPath, JSON.stringify(json, null, 2) + '\n', 'utf8');
console.log(`reconstruct: verified body match; wrote ${jsonPath} (skills ${json.skills}, ${json.totals.passed}/${json.totals.checks} checks).`);
