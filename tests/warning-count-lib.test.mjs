import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseEvaluatorTotals, WARNING_SURFACES } from '../scripts/lib/warning-count-lib.mjs';
import { checkCountSurface } from '../scripts/lib/count-surface-lib.mjs';

// Negative-first. The defect this file exists to prevent: the gate's headline warning count
// is hand-copied onto several pages, so it goes stale silently the moment any commit adds a
// warning. It has now gone stale three times - at v0.11.0, at the troubleshooting page, and
// again when the skill-selection eval added four files with no header docblock.

// --- parseEvaluatorTotals ------------------------------------------------------------

const TAIL = [
  '  [warn] G10: Diataxis directory docs/how-to is missing or has no *.md page.  -> docs/how-to',
  'Tier: advanced',
  '0 error(s), 129 warning(s).',
  'Real issues (objective + vendor-cited errors): 0',
].join('\n');

test('parseEvaluatorTotals: reads the evaluator totals line', () => {
  assert.deepEqual(parseEvaluatorTotals(TAIL), { errors: 0, warnings: 129 });
});

test('parseEvaluatorTotals: returns null when the totals line is absent', () => {
  // The dangerous failure is a SILENT one: if the evaluator changes its output and the
  // parser quietly yields nothing, the assertion would pass forever without checking.
  // Null forces the caller to treat that as a problem.
  assert.equal(parseEvaluatorTotals('Tier: advanced\nsome other output\n'), null);
  assert.equal(parseEvaluatorTotals(''), null);
});

test('parseEvaluatorTotals: is not fooled by a warning line that mentions warnings', () => {
  const noisy = '  [warn] G9: 3 warning(s) about docblocks here  -> scripts/x.mjs\n';
  assert.equal(parseEvaluatorTotals(noisy), null);
});

test('parseEvaluatorTotals: handles CRLF and a non-zero error count', () => {
  assert.deepEqual(parseEvaluatorTotals('Tier: bronze\r\n4 error(s), 7 warning(s).\r\n'), { errors: 4, warnings: 7 });
});

// --- the published surfaces ----------------------------------------------------------

const read = (p) => readFileSync(p, 'utf8');

test('WARNING_SURFACES: every surface matches the live document exactly once', () => {
  // A zero-match is the subtle failure - a reworded sentence silently leaves the gate's
  // coverage, which is exactly how these counts drifted before.
  for (const s of WARNING_SURFACES) {
    const hits = [...read(s.where).matchAll(new RegExp(s.pattern.source, 'g'))];
    assert.equal(hits.length, 1, `${s.label}: expected exactly 1 match in ${s.where}, got ${hits.length}`);
  }
});

test('WARNING_SURFACES: the live documents agree with the committed count', () => {
  const committed = Number(readFileSync('docs/internal/gate-warning-count.txt', 'utf8').trim());
  assert.ok(Number.isInteger(committed), 'the committed count must be an integer');
  for (const s of WARNING_SURFACES) {
    const problems = checkCountSurface({ text: read(s.where), label: s.label, pattern: s.pattern, want: committed, where: s.where });
    assert.deepEqual(problems, [], problems.join('; '));
  }
});

test('WARNING_SURFACES: a stale number in a surface is caught', () => {
  const s = WARNING_SURFACES[0];
  const problems = checkCountSurface({ text: read(s.where), label: s.label, pattern: s.pattern, want: 9999, where: s.where });
  assert.equal(problems.length, 1, 'a wrong count must produce exactly one problem');
});

test('WARNING_SURFACES: the HISTORICAL provenance sentences are deliberately not matched', () => {
  // README and conformance.md both narrate how the count moved (0 -> 7 -> 128 -> 129).
  // Those are dated records and must never be rewritten to the current number; only the
  // present-tense claims are asserted. This guards the pattern against widening.
  const historical = [
    'the run was `0 errors, 0 warnings` through v0.10.0, became `0 errors, 7 warnings` when the contested lenses shipped',
    '`0 errors / 0 warnings` through v0.10.0; `0 errors / 7 warnings` from v0.11.0; `0 errors / 128 warnings` from v0.13.x',
  ].join('\n');
  for (const s of WARNING_SURFACES) {
    assert.equal(new RegExp(s.pattern.source).test(historical), false, `${s.label} must not match historical prose`);
  }
});
