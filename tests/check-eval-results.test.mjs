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
