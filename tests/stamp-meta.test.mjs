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
  // This guards the regression that matters: if the main-guard were removed, importing the
  // module would run the CLI and process.exit(2) on the test runner's argv, killing the suite.
  // It does not isolate the guard from an argv mismatch; direct-invocation behaviour (CLI runs
  // + exits 2 on bad argv) is verified manually, not here.
  const mod = await import('../scripts/eval/stamp-meta.mjs');
  assert.equal(typeof mod.stampMeta, 'function');
});
