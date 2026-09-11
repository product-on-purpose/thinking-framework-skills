import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stampField, resolveStampTargets } from '../scripts/eval/stamp-meta.mjs';

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

// --- stamp targets -------------------------------------------------------------------
// The hazard this exists to close: stampMeta walked `reg.frameworks` unconditionally, so
// finalizing ANY trigger-shaped run re-stamped all 63 framework sidecars - including a
// skill-selection run that measured the 4 meta-skills and never touched the 63. The four
// meta-skills are not registry entries, so they were simultaneously unreachable.

const FRAMEWORKS = [
  { slug: 'premortem', status: 'shipped' },
  { slug: 'swot', status: 'shipped' },
  { slug: 'draft-idea', status: 'proposed' },
];

test('resolveStampTargets: an explicit slug list does NOT fall back to the 63 frameworks', () => {
  const targets = resolveStampTargets(FRAMEWORKS, ['framework-advisor', 'top3']);
  assert.deepEqual(targets, ['framework-advisor', 'top3']);
  assert.ok(!targets.includes('premortem'), 'a run that measured the meta-skills must not stamp frameworks');
});

test('resolveStampTargets: reaches meta-skills that are not registry entries at all', () => {
  const targets = resolveStampTargets(FRAMEWORKS, ['random-frameworks']);
  assert.deepEqual(targets, ['random-frameworks']);
});

test('resolveStampTargets: with no list, stamps every shipped framework (unchanged default)', () => {
  assert.deepEqual(resolveStampTargets(FRAMEWORKS), ['premortem', 'swot']);
});

test('resolveStampTargets: an explicit EMPTY list stamps nothing, it does not mean "all"', () => {
  // Fail-safe, not fail-open: a caller that computed an empty target set by mistake must
  // stamp zero sidecars rather than silently stamping all 63.
  assert.deepEqual(resolveStampTargets(FRAMEWORKS, []), []);
});
