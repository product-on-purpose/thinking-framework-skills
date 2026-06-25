import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stampField } from '../scripts/eval/stamp-meta.mjs';

test('stampField rewrites only the target field, preserving the rest', () => {
  const yaml = 'quality:\n  trigger_eval_status: not-run\n  output_eval_status: not-run\n';
  const out = stampField(yaml, 'trigger_eval_status', '2026-06-24');
  assert.match(out, /trigger_eval_status: measured-2026-06-24/);
  assert.match(out, /output_eval_status: not-run/); // untouched
});

test('stampField is a no-op when the field is absent', () => {
  const yaml = 'name: x\n';
  assert.equal(stampField(yaml, 'trigger_eval_status', '2026-06-24'), yaml);
});

test('importing stamp-meta.mjs has no side effect (no throw, no argv parse)', async () => {
  // If the module ran its CLI on import it would call process.exit(2) on bad argv.
  const mod = await import('../scripts/eval/stamp-meta.mjs');
  assert.equal(typeof mod.stampMeta, 'function');
});
