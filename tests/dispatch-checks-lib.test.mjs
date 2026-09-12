import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spliceChecks } from '../scripts/lib/dispatch-checks-lib.mjs';

// Negative-first. The defect this file exists to prevent: the dispatch eval splits ONE checklist
// between a model judge and a deterministic validator, then merges the two back. An off-by-one in
// that merge attributes a grade to the WRONG check while `passed/total` still looks correct - a
// scorecard that is wrong in exactly the way a reader cannot see. Every mismatch must throw.

const CHECKS = [
  'Grade the evidence on the seven-tier model.',
  'Name 3 to 6 real sources.',
  'Emit a proposed registry entry that passes `scripts/check-proposed-entry.mjs`.',
  'State an explicit overlap call.',
];
const isDet = (c) => c.includes('check-proposed-entry');
const passing = () => ({ pass: true, reason: 'validator exited 0' });
const failing = () => ({ pass: false, reason: 'validator exited 1: missing required field "tier"' });

const grades = (...passes) => passes.map((p, i) => ({ pass: p, reason: `judge reason ${i}` }));

// --- the refusals -------------------------------------------------------------------

test('spliceChecks: throws when too few model grades are supplied', () => {
  // The dangerous case: 2 grades for 3 model checks would shift every later grade up one check.
  assert.throws(() => spliceChecks(CHECKS, grades(true, true), isDet, passing), /3 model-judged check\(s\) but 2 grade\(s\)/);
});

test('spliceChecks: throws when too many model grades are supplied', () => {
  assert.throws(() => spliceChecks(CHECKS, grades(true, true, true, true), isDet, passing), /3 model-judged check\(s\) but 4 grade\(s\)/);
});

test('spliceChecks: throws when nothing matches the deterministic predicate', () => {
  // A dispatch scorecard that claims a validator decided something must actually have run one.
  const noDet = ['a check', 'another check'];
  assert.throws(() => spliceChecks(noDet, grades(true, true), isDet, passing), /no check matched the deterministic predicate/);
});

test('spliceChecks: throws on an empty or missing checklist rather than scoring nothing', () => {
  assert.throws(() => spliceChecks([], [], isDet, passing), /non-empty array/);
  assert.throws(() => spliceChecks(null, [], isDet, passing), /non-empty array/);
});

test('spliceChecks: throws on a malformed model grade', () => {
  const bad = [{ pass: true, reason: 'ok' }, { reason: 'no pass field' }, { pass: false, reason: 'ok' }];
  assert.throws(() => spliceChecks(CHECKS, bad, isDet, passing), /model grade is missing or malformed/);
});

test('spliceChecks: throws when resolveDeterministic does not return a boolean pass', () => {
  assert.throws(() => spliceChecks(CHECKS, grades(true, true, true), isDet, () => ({ reason: 'hmm' })), /must return \{pass:boolean, reason\}/);
});

// --- ordering, the thing that actually matters ---------------------------------------

test('spliceChecks: every grade lands on its own check, in the checklist\'s order', () => {
  // The validator check sits at index 2, so the third MODEL grade must land on index 3, not 2.
  const r = spliceChecks(CHECKS, grades(true, false, true), isDet, failing);

  assert.deepEqual(r.perCheck.map((c) => c.check), CHECKS, 'order must be the checklist order');
  assert.deepEqual(r.perCheck.map((c) => c.decidedBy), ['judge', 'judge', 'validator', 'judge']);
  assert.deepEqual(r.perCheck.map((c) => c.pass), [true, false, false, true]);

  // The second model grade (pass:false) belongs to "Name 3 to 6 real sources", NOT to the entry
  // check that sits after it. This assertion is the whole point of the file.
  assert.equal(r.perCheck[1].check, 'Name 3 to 6 real sources.');
  assert.equal(r.perCheck[1].reason, 'judge reason 1');
  assert.equal(r.perCheck[3].check, 'State an explicit overlap call.');
  assert.equal(r.perCheck[3].reason, 'judge reason 2');
});

test('spliceChecks: the validator verdict is carried through, not re-judged', () => {
  const r = spliceChecks(CHECKS, grades(true, true, true), isDet, failing);
  const det = r.perCheck.find((c) => c.decidedBy === 'validator');
  assert.equal(det.pass, false);
  assert.match(det.reason, /missing required field "tier"/);
  // Three model passes plus one validator fail is 3/4 - the validator must be able to sink the run.
  assert.equal(r.passed, 3);
  assert.equal(r.total, 4);
});

test('spliceChecks: counts who decided what', () => {
  const r = spliceChecks(CHECKS, grades(true, true, true), isDet, passing);
  assert.equal(r.decidedByValidator, 1);
  assert.equal(r.decidedByJudge, 3);
  assert.equal(r.passed, 4);
  assert.equal(r.total, 4);
});

test('spliceChecks: a checklist that is ALL deterministic needs no model grades', () => {
  const r = spliceChecks(['passes `scripts/check-proposed-entry.mjs`'], [], isDet, passing);
  assert.equal(r.total, 1);
  assert.equal(r.decidedByJudge, 0);
  assert.equal(r.perCheck[0].decidedBy, 'validator');
});

test('spliceChecks: a deterministic check at index 0 still shifts correctly', () => {
  const front = ['Emit an entry that passes `scripts/check-proposed-entry.mjs`.', 'Grade the evidence.', 'Name sources.'];
  const r = spliceChecks(front, grades(false, true), isDet, passing);
  assert.deepEqual(r.perCheck.map((c) => c.decidedBy), ['validator', 'judge', 'judge']);
  assert.equal(r.perCheck[1].check, 'Grade the evidence.');
  assert.equal(r.perCheck[1].pass, false);
});
