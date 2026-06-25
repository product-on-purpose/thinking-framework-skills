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
