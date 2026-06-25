import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { buildArtifacts } from '../scripts/eval/finalize.mjs';

const FX = join(dirname(fileURLToPath(import.meta.url)), 'fixtures', 'eval');
const readJson = (f) => JSON.parse(readFileSync(join(FX, f), 'utf8'));

test('buildArtifacts emits a paired md+json per supplied kind, with canonical paths', () => {
  const arts = buildArtifacts({
    date: '2026-06-24',
    trigger: { cases: readJson('trigger.cases.json').cases, routedRaw: readJson('trigger.routed.json') },
    output: { rawResults: readJson('output.results.json') },
  });
  const paths = arts.map((a) => a.path).sort();
  assert.deepEqual(paths, [
    'docs/internal/eval-results/2026-06-24-output-eval.json',
    'docs/internal/eval-results/2026-06-24-output-eval.md',
    'docs/internal/eval-results/2026-06-24-trigger-eval.json',
    'docs/internal/eval-results/2026-06-24-trigger-eval.md',
  ]);
  const md = arts.find((a) => a.path.endsWith('trigger-eval.md')).content;
  assert.match(md, /# Trigger eval scorecard/);
  // json content parses and carries the contract
  const json = JSON.parse(arts.find((a) => a.path.endsWith('output-eval.json')).content);
  assert.equal(json.generated, 'OUTPUT eval');
  assert.ok('passPct' in json.totals);
});

test('prefix produces the cohort filename', () => {
  const arts = buildArtifacts({ date: '2026-06-19', prefix: 'contested', output: { rawResults: readJson('output.results.json') } });
  assert.deepEqual(arts.map((a) => a.path).sort(), [
    'docs/internal/eval-results/2026-06-19-contested-output-eval.json',
    'docs/internal/eval-results/2026-06-19-contested-output-eval.md',
  ]);
});
