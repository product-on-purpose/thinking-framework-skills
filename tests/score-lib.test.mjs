import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { scoreTrigger, scoreOutput, formatPct } from '../scripts/eval/score-lib.mjs';

const FX = join(dirname(fileURLToPath(import.meta.url)), 'fixtures', 'eval');
const read = (f) => readFileSync(join(FX, f), 'utf8');
const readJson = (f) => JSON.parse(read(f));

test('scoreTrigger reproduces the golden scorecard', () => {
  const { md, json } = scoreTrigger(readJson('trigger.cases.json').cases, readJson('trigger.routed.json'));
  assert.equal(md, read('trigger.golden.md'));
  assert.deepEqual(json, readJson('trigger.golden.json'));
});

test('scoreOutput reproduces the golden scorecard', () => {
  const { md, json } = scoreOutput(readJson('output.results.json'));
  assert.equal(md, read('output.golden.md'));
  assert.deepEqual(json, readJson('output.golden.json'));
});

// --- skill-selection additions -------------------------------------------------------
// scoreTrigger is corpus-agnostic (it reads only c.source / c.expected / c.type and the
// routed top1/top3), which is why the skill-selection eval reuses it unchanged. These
// cover the two things that eval needs it to do: exclude gate cases, and carry provenance.

const SEL_CASES = [
  { id: 'c1', prompt: 'p1', expected: 'framework-advisor', type: 'trigger', source: 'framework-advisor' },
  { id: 'c2', prompt: 'p2', expected: 'premortem', type: 'anti', source: 'framework-advisor' },
  { id: 'c3', prompt: 'p3', expected: 'framework-advisor', type: 'gate', source: 'framework-advisor' },
];

test('scoreTrigger: a gate case is excluded from scoring, not counted as a false fire', () => {
  // The defect this catches: the advisor's insufficient-signal case says the advisor IS
  // the right tool. Scored as an anti-case, a correct `framework-advisor` pick would be
  // recorded as a FALSE FIRE - the one metric this library says matters - publishing a
  // defect that is actually correct behavior.
  const routed = { routes: [
    { id: 'c1', top1: 'framework-advisor', top3: ['framework-advisor'] },
    { id: 'c2', top1: 'premortem', top3: ['premortem'] },
    { id: 'c3', top1: 'framework-advisor', top3: ['framework-advisor'] },
  ] };
  const { json } = scoreTrigger(SEL_CASES, routed);
  assert.equal(json.totals.falseFires, 0, 'the gate case must not read as a false fire');
  assert.equal(json.cases, 2, 'the gate case is excluded from the scored denominator');
  assert.equal(json.totals.anti, 1);
});

test('scoreTrigger: gate exclusion does not swallow a real false fire', () => {
  const routed = { routes: [
    { id: 'c1', top1: 'framework-advisor', top3: [] },
    { id: 'c2', top1: 'framework-advisor', top3: [] }, // grabbed a premortem situation
    { id: 'c3', top1: 'framework-advisor', top3: [] },
  ] };
  const { json } = scoreTrigger(SEL_CASES, routed);
  assert.equal(json.totals.falseFires, 1);
});

test('scoreTrigger: a command pick is a miss, and the miss list names the command', () => {
  // Commands are kind-qualified so strict-equality scoring surfaces interference for free.
  const routed = { routes: [{ id: 'c1', top1: 'command:stress-test-decision', top3: [] }] };
  const { json } = scoreTrigger([SEL_CASES[0]], routed);
  assert.equal(json.totals.triggerTop1, 0);
  assert.equal(json.perSkill['framework-advisor'].miss[0].got, 'command:stress-test-decision');
});

test('scoreTrigger: provenance is recorded when supplied, and absent when not', () => {
  // The 2026-06-25 baseline did not record its model, which is why the re-run could only
  // be called a reproduction of the measurement rather than a controlled comparison.
  const routed = { routes: [] };
  const withProv = scoreTrigger(SEL_CASES, routed, {
    generated: 'SKILL-SELECTION eval',
    provenance: { model: 'claude-opus-5', corpus: 'roster' },
  }).json;
  assert.equal(withProv.generated, 'SKILL-SELECTION eval');
  assert.deepEqual(withProv.provenance, { model: 'claude-opus-5', corpus: 'roster' });
  const without = scoreTrigger(SEL_CASES, routed).json;
  assert.equal(without.generated, 'TRIGGER eval');
  assert.ok(!('provenance' in without), 'no provenance key unless supplied');
});

// --- formatPct: never overstate -------------------------------------------------------
// Negative-first. The defect this block exists to prevent SHIPPED, twice, and then escaped onto
// the public trust page: `(100*n/d).toFixed(0)` rounded any ratio at or above 99.5% up to a flat
// "100%". It wrote "Overall: 100% of checks passed (428/429)" into the committed 2026-06-25 output
// scorecard, and "Anti no-false-fire: 100% (399/400)" into the 2026-09-10 skill-selection one. The
// trust page then copied the first of those, so the library's own honesty page claimed 100% two
// cards above the card that admits the miss.

test('formatPct: 100% is reserved for an exact pass - nothing else may round up to it', () => {
  // These four are the actual committed figures that were printed as "100%".
  assert.equal(formatPct(428, 429), '99.7%');   // was "100%" - 2026-06-25 output scorecard
  assert.equal(formatPct(399, 400), '99.7%');   // was "100%" - 2026-09-10 skill-selection
  assert.equal(formatPct(999, 1000), '99.9%');
  assert.equal(formatPct(1999, 2000), '99.9%'); // 99.95 must NOT become 100%
});

test('formatPct: an exact pass prints a bare 100%', () => {
  assert.equal(formatPct(429, 429), '100%');
  assert.equal(formatPct(376, 376), '100%');
  assert.equal(formatPct(1, 1), '100%');
});

test('formatPct: floors rather than rounds, so a pass rate is never flattered', () => {
  // 5/6 is 83.33; 2/3 is 66.67. Rounding would give 83.3 / 66.7; flooring gives 83.3 / 66.6.
  // Flooring is the choice that cannot overstate, which is the only property that matters here.
  assert.equal(formatPct(5, 6), '83.3%');
  assert.equal(formatPct(2, 3), '66.6%');
  assert.equal(formatPct(1, 3), '33.3%');
});

test('formatPct: degenerate inputs', () => {
  assert.equal(formatPct(0, 0), 'n/a');   // no denominator is not 0%
  assert.equal(formatPct(0, 10), '0%');
});

test('formatPct: clean ratios keep their bare form', () => {
  // Dropping a trailing `.0` keeps the scorecards readable, and it can never overstate: a value
  // with no fractional part had nothing to round away in the first place.
  assert.equal(formatPct(3, 4), '75%');
  assert.equal(formatPct(1, 2), '50%');
});

test('formatPct: a rendered scorecard never claims 100% for a NEAR-miss', () => {
  // The end-to-end property, on the real renderer rather than the helper. 399/400 is the shape that
  // actually shipped as "100%". No skill here is exact, so no legitimate 100% exists to confuse it.
  const results = [
    { skill: 'a', perCheck: Array.from({ length: 400 }, (_, i) => ({ check: `c${i}`, pass: i !== 0, reason: 'x' })), passed: 399, total: 400 },
  ];
  const { md } = scoreOutput(results);
  assert.ok(!/100%/.test(md), `399/400 must never render as 100%:\n${md.slice(0, 300)}`);
  assert.match(md, /99\.7%/, 'it should report 99.75% floored to 99.7%');
});

// --- artifactChars survives into the .json --------------------------------------------
// The harness measures how big each skill's deliverable is on every run, and the .md scorecard
// has always printed it in a table - but the .json dropped it, so the only machine-readable record
// of artifact size existed as rendered markdown. It is the signal the subagent-suitability
// question turns on (a subagent earns its keep when the caller wants the deliverable without the
// derivation), and it could not be read from any committed scorecard.

test('scoreOutput carries artifactChars into perSkill', () => {
  const { json } = scoreOutput([
    { skill: 'a', artifactChars: 12494, perCheck: [{ check: 'c', pass: true, reason: 'r' }], passed: 1, total: 1 },
  ]);
  assert.equal(json.perSkill.a.artifactChars, 12494);
});

test('scoreOutput omits artifactChars rather than writing null when the run did not measure it', () => {
  // The older committed scorecards carry no artifact size. Emitting `artifactChars: null` would
  // make "not measured" indistinguishable from "measured as nothing" for anyone reading the field.
  const { json } = scoreOutput([
    { skill: 'a', perCheck: [{ check: 'c', pass: true, reason: 'r' }], passed: 1, total: 1 },
  ]);
  assert.ok(!('artifactChars' in json.perSkill.a), 'absent, not null');
});
