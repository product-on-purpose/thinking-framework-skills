// tests/list-misses.test.mjs
// Roadmap C2-2. The close-the-loop review starts from every miss in a scorecard; a miss the
// listing drops is a seam nobody decides about, which is the failure the loop exists to end.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { listMisses } from '../scripts/eval/list-misses.mjs';

test('a trigger scorecard yields false fires, top-1 misses and anti misses, each labelled', () => {
  const rows = listMisses({
    generated: 'TRIGGER eval',
    perSkill: {
      woop: { fire: [{ id: 'c9', got: 'woop', prompt: 'Plan my week.' }], miss: [] },
      premortem: { fire: [], miss: [
        { kind: 'trigger', id: 'c1', want: 'premortem', got: 'red-team-light', prompt: 'Before we launch, how might this fail?' },
        { kind: 'anti-soft', id: 'c2', want: 'red-team-light', got: 'none', prompt: 'Attack my argument.' },
      ] },
    },
  });
  assert.deepEqual(rows.map((r) => `${r.skill}:${r.kind}`), ['premortem:trigger', 'premortem:anti-soft', 'woop:false-fire']);
  assert.equal(rows[0].got, 'red-team-light');
});

test('an output scorecard yields one row per failed check', () => {
  const rows = listMisses({ generated: 'OUTPUT eval', perSkill: { 'affinity-mapping': { passed: 5, total: 6, fails: ['Cluster before naming themes.'] } } });
  assert.deepEqual(rows, [{ skill: 'affinity-mapping', kind: 'output-check', want: null, got: null, text: 'Cluster before naming themes.' }]);
});

test('a clean scorecard yields nothing', () => {
  assert.deepEqual(listMisses({ perSkill: { woop: { fire: [], miss: [], fails: [] } } }), []);
});
