import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkEvalResults } from '../scripts/lib/eval-results-lib.mjs';

const ok = (entries) => assert.deepEqual(checkEvalResults(entries), []);
const hasProblem = (entries, re) => assert.ok(checkEvalResults(entries).some((p) => re.test(p)), `expected a problem matching ${re}`);

test('a valid paired output scorecard passes', () => {
  ok([
    { name: '2026-06-17-output-eval.md' },
    { name: '2026-06-17-output-eval.json', parsed: { generated: 'OUTPUT eval', totals: { passPct: 99, failedChecks: 3 } } },
  ]);
});

test('a .md with no .json sibling reds', () => {
  hasProblem([{ name: '2026-06-19-contested-output-eval.md' }], /no matching \.json/);
});

test('a .json with no .md sibling reds', () => {
  hasProblem([{ name: 'x-eval.json', parsed: { generated: 'OUTPUT eval', totals: { passPct: 1, failedChecks: 0 } } }], /no matching \.md/);
});

test('a malformed .json reds', () => {
  hasProblem([{ name: 'x-eval.md' }, { name: 'x-eval.json', parsed: null }], /does not parse/);
});

test('an output scorecard missing a totals key reds', () => {
  hasProblem([{ name: 'x-eval.md' }, { name: 'x-eval.json', parsed: { generated: 'OUTPUT eval', totals: { passPct: 1 } } }], /missing totals\.failedChecks/);
});

test('an advisor-routing json (no `generated`) is paired-checked but NOT shape-checked', () => {
  ok([
    { name: '2026-06-03-advisor-routing.md' },
    { name: '2026-06-03-advisor-routing.json', parsed: { eval: 'advisor-routing', routing_accuracy: { pct: 0.58 } } },
  ]);
});

// --- SKILL-SELECTION eval (the roster corpus) ----------------------------------------
// A distinct `generated` kind rather than reusing 'TRIGGER eval': the two evals answer
// different questions over different corpora, and a reader holding two scorecards must be
// able to tell which is which from the artifact alone. That is the same confusion the
// trust page's two-dates treatment exists to prevent.

const selJson = (over = {}) => ({
  name: '2026-09-10-skill-selection-trigger-eval.json',
  parsed: {
    generated: 'SKILL-SELECTION eval',
    totals: { triggerTop1Pct: 82.4, falseFires: 0 },
    provenance: { model: 'claude-opus-5', corpus: 'roster' },
    ...over,
  },
});
const selMd = { name: '2026-09-10-skill-selection-trigger-eval.md' };

test('a valid skill-selection scorecard passes', () => {
  ok([selMd, selJson()]);
});

test('a skill-selection scorecard missing a totals key reds', () => {
  hasProblem([selMd, selJson({ totals: { triggerTop1Pct: 82.4 } })], /missing totals\.falseFires/);
});

test('a skill-selection scorecard with no provenance reds', () => {
  // The defect: an unattributed number. The 2026-06-25 baseline did not record its model,
  // so the 2026-09-10 re-run could only be called a reproduction of the measurement.
  hasProblem([selMd, selJson({ provenance: undefined })], /missing provenance\.model/);
});

test('a skill-selection scorecard missing provenance.corpus reds', () => {
  // Which corpus produced the number is the whole distinction between the two evals.
  hasProblem([selMd, selJson({ provenance: { model: 'claude-opus-5' } })], /missing provenance\.corpus/);
});

test('a TRIGGER eval scorecard still needs no provenance (the older runs carry none)', () => {
  ok([
    { name: '2026-06-25-trigger-eval.md' },
    { name: '2026-06-25-trigger-eval.json', parsed: { generated: 'TRIGGER eval', totals: { triggerTop1Pct: 99.2, falseFires: 0 } } },
  ]);
});
