import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkEvalResults, checkStampsLanded } from '../scripts/lib/eval-results-lib.mjs';

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

// --- the negative TRIGGER-eval shape case ----------------------------------------------
// The positive case above has been covered since this gate shipped; the negative one was a
// recorded Minor ("the trigger path is covered only by the real-tree runner"). Both kinds share
// one REQUIRED_TOTALS loop, so this is about the TABLE being right for TRIGGER, not the loop.

test('a TRIGGER eval scorecard missing totals.falseFires reds', () => {
  hasProblem([
    { name: '2026-06-25-trigger-eval.md' },
    { name: '2026-06-25-trigger-eval.json', parsed: { generated: 'TRIGGER eval', totals: { triggerTop1Pct: 99.2 } } },
  ], /missing totals\.falseFires/);
});

test('a TRIGGER eval scorecard missing totals.triggerTop1Pct reds', () => {
  hasProblem([
    { name: '2026-06-25-trigger-eval.md' },
    { name: '2026-06-25-trigger-eval.json', parsed: { generated: 'TRIGGER eval', totals: { falseFires: 0 } } },
  ], /missing totals\.triggerTop1Pct/);
});

// --- checkStampsLanded: the scorecard claims a measurement the sidecar must carry --------
// Closes the hole #139 guarded only at the source. On 2026-09-13 a run reported
// "on 0 skill(s) (skipped 0)", wrote its scorecard, and exited 0 - leaving a scorecard dated that
// day beside 67 sidecars claiming an older date, with pairing and shape both perfectly happy.

const sidecars = (map) => (slug) => (slug in map ? map[slug] : null);
const card = (name, generated, slugs) => ({
  name,
  parsed: { generated, perSkill: Object.fromEntries(slugs.map((s) => [s, {}])) },
});

test('checkStampsLanded: a sidecar that never moved is caught', () => {
  const problems = checkStampsLanded(
    [card('2026-09-13-output-eval.json', 'OUTPUT eval', ['premortem'])],
    sidecars({ premortem: 'quality:\n  output_eval_status: measured-2026-09-10\n' }),
  );
  assert.equal(problems.length, 1);
  assert.match(problems[0], /expected measured-2026-09-13/);
  assert.match(problems[0], /silently stamped nothing/);
});

test('checkStampsLanded: a matching sidecar is silent', () => {
  assert.deepEqual(
    checkStampsLanded(
      [card('2026-09-13-output-eval.json', 'OUTPUT eval', ['premortem'])],
      sidecars({ premortem: 'quality:\n  output_eval_status: measured-2026-09-13\n' }),
    ),
    [],
  );
});

test('checkStampsLanded: an OLDER scorecard is superseded, not a failure', () => {
  // The naive rule - every scorecard's date must match - would red on all committed history,
  // because a sidecar carries ONE date per field. Only the newest run of a kind governs.
  assert.deepEqual(
    checkStampsLanded(
      [
        card('2026-06-25-output-eval.json', 'OUTPUT eval', ['premortem']),
        card('2026-09-13-output-eval.json', 'OUTPUT eval', ['premortem']),
      ],
      sidecars({ premortem: 'quality:\n  output_eval_status: measured-2026-09-13\n' }),
    ),
    [],
  );
});

test('checkStampsLanded: TRIGGER and SKILL-SELECTION both govern trigger_eval_status', () => {
  // Different instruments, different corpora, same stamped field - so the newest of EITHER is
  // what a sidecar's trigger date should reflect.
  const problems = checkStampsLanded(
    [
      card('2026-09-13-trigger-eval.json', 'TRIGGER eval', ['premortem']),
      card('2026-09-14-skill-selection-trigger-eval.json', 'SKILL-SELECTION eval', ['premortem']),
    ],
    sidecars({ premortem: 'quality:\n  trigger_eval_status: measured-2026-09-13\n' }),
  );
  assert.equal(problems.length, 1);
  assert.match(problems[0], /expected measured-2026-09-14/);
});

test('checkStampsLanded: a slug with no skill directory is skipped, not double-reported', () => {
  // check-registry.mjs owns "this slug has no directory"; reporting it here too would turn one
  // defect into two failures pointing at different files.
  assert.deepEqual(
    checkStampsLanded([card('2026-09-13-output-eval.json', 'OUTPUT eval', ['gone'])], sidecars({})),
    [],
  );
});

test('checkStampsLanded: a scorecard with no recognised kind is ignored', () => {
  // The older advisor-routing JSONs carry no `generated`, and must not be read as claiming
  // a measurement of anything.
  assert.deepEqual(
    checkStampsLanded(
      [{ name: '2026-06-12-advisor-routing.json', parsed: { perSkill: { premortem: {} } } }],
      sidecars({ premortem: 'quality:\n  output_eval_status: measured-2020-01-01\n' }),
    ),
    [],
  );
});

test('checkStampsLanded: an absent field is reported, not treated as a match', () => {
  const problems = checkStampsLanded(
    [card('2026-09-13-output-eval.json', 'OUTPUT eval', ['premortem'])],
    sidecars({ premortem: 'quality:\n  trigger_eval_status: measured-2026-09-13\n' }),
  );
  assert.equal(problems.length, 1);
  assert.match(problems[0], /\(absent\)/);
});
