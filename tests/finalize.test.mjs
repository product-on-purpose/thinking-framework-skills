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

test('buildArtifacts passes the eval kind and provenance through to the scorer', () => {
  // The skill-selection eval reuses this builder so its .md/.json pair cannot drift from
  // the framework eval's - the exact failure finalize.mjs was introduced to end. What it
  // must NOT reuse is the eval kind: two corpora answering different questions have to be
  // distinguishable from the artifact alone.
  const arts = buildArtifacts({
    date: '2026-09-10',
    prefix: 'skill-selection',
    trigger: {
      cases: readJson('trigger.cases.json').cases,
      routedRaw: readJson('trigger.routed.json'),
      generated: 'SKILL-SELECTION eval',
      provenance: { model: 'claude-opus-5', corpus: 'roster' },
    },
  });
  assert.deepEqual(arts.map((a) => a.path).sort(), [
    'docs/internal/eval-results/2026-09-10-skill-selection-trigger-eval.json',
    'docs/internal/eval-results/2026-09-10-skill-selection-trigger-eval.md',
  ]);
  const json = JSON.parse(arts.find((a) => a.path.endsWith('.json')).content);
  assert.equal(json.generated, 'SKILL-SELECTION eval');
  assert.deepEqual(json.provenance, { model: 'claude-opus-5', corpus: 'roster' });
});

test('buildArtifacts without a kind still emits a plain TRIGGER eval', () => {
  const arts = buildArtifacts({
    date: '2026-06-24',
    trigger: { cases: readJson('trigger.cases.json').cases, routedRaw: readJson('trigger.routed.json') },
  });
  const json = JSON.parse(arts.find((a) => a.path.endsWith('.json')).content);
  assert.equal(json.generated, 'TRIGGER eval');
  assert.ok(!('provenance' in json));
});
