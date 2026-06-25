#!/usr/bin/env node
// One-shot retro-fix for #95 (the missing contested-output .json sidecar). The raw run
// results were scratch and are gone, but the committed .md has zero failed checks for all
// 7 skills, so the scorer INPUT is information-complete: rebuild it from the .md table,
// re-emit the .json via the real scorer, and VERIFY the regenerated body matches the
// committed .md (after stripping its hand-added cohort HTML comment and normalizing
// newlines - review M1). Writes the .json next to the .md. Run once, commit the .json.

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
