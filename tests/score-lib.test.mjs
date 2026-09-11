import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { scoreTrigger, scoreOutput } from '../scripts/eval/score-lib.mjs';

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
