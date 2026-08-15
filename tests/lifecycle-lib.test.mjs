// tests/lifecycle-lib.test.mjs
// Covers the SPEC-01 lifecycle-truth rules. These are negative-first: the point of the guard
// is that the pre-fix state of this repo (65 sidecars at draft, 2 at experimental, all 67 at
// alpha with measured eval stamps) can never come back, so every one of those shapes has a
// test that must fail.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkLifecycle, readLifecycle, SHIPPED_STATUSES } from '../scripts/lib/lifecycle-lib.mjs';

/** A sidecar in the shape this repo actually uses (two-space indent under top-level keys). */
const sidecar = ({ status = 'active', maturity = 'measured', trigger = 'measured-2026-06-25', output = 'measured-2026-06-25' } = {}) => `
# Rich sidecar for the think-example skill.
identity:
  id: thinking-framework-skills.example
  slug: example
  name: think-example
  version: 0.1.0
  status: ${status}
  maturity: ${maturity}

quality:
  trigger_eval_status: ${trigger}
  output_eval_status: ${output}
  known_failure_modes:
    - something
`;

test('a shipped, measured skill passes clean', () => {
  assert.deepEqual(checkLifecycle('think-example', sidecar()), []);
});

test('every allowed shipped status passes', () => {
  for (const status of SHIPPED_STATUSES) {
    assert.deepEqual(checkLifecycle('think-example', sidecar({ status })), [], `status: ${status}`);
  }
});

test('a shipped skill saying draft fails, with the file named', () => {
  const problems = checkLifecycle('think-premortem', sidecar({ status: 'draft' }));
  assert.equal(problems.length, 1);
  assert.match(problems[0], /skills\/think-premortem\/skill\.meta\.yml/);
  assert.match(problems[0], /identity\.status is "draft"/);
  assert.match(problems[0], /Set status: active/);
});

test('a shipped skill saying experimental fails too (the two applicators pre-fix state)', () => {
  const problems = checkLifecycle('think-top3', sidecar({ status: 'experimental' }));
  assert.equal(problems.length, 1);
  assert.match(problems[0], /identity\.status is "experimental"/);
});

test('maturity alpha with both eval stamps measured fails', () => {
  const problems = checkLifecycle('think-example', sidecar({ maturity: 'alpha' }));
  assert.equal(problems.length, 1);
  assert.match(problems[0], /identity\.maturity is "alpha"/);
  assert.match(problems[0], /Set maturity: measured/);
});

test('maturity alpha is CORRECT for a shipped but unmeasured skill (the four meta-skills)', () => {
  const problems = checkLifecycle(
    'think-framework-advisor',
    sidecar({ maturity: 'alpha', trigger: 'authored', output: 'authored' }),
  );
  assert.deepEqual(problems, [], 'shipped-and-unmeasured must stay representable, and honest');
});

test('one measured stamp is not enough to require maturity: measured', () => {
  const problems = checkLifecycle('think-example', sidecar({ maturity: 'alpha', output: 'authored' }));
  assert.deepEqual(problems, []);
});

test('the pre-fix repo state fails on both axes at once', () => {
  const problems = checkLifecycle('think-premortem', sidecar({ status: 'draft', maturity: 'alpha' }));
  assert.equal(problems.length, 2);
});

test('missing fields are reported rather than silently passing', () => {
  const problems = checkLifecycle('think-example', 'identity:\n  slug: example\n');
  assert.equal(problems.length, 2);
  assert.match(problems.join('\n'), /no identity\.status/);
  assert.match(problems.join('\n'), /no identity\.maturity/);
});

test('readLifecycle does not mistake trigger_eval_status for status', () => {
  // The anchoring property the whole lib rests on: `^\s+status:` cannot match a line whose
  // first non-whitespace characters are `trigger_`. If this ever regresses, the guard would
  // read an eval stamp as the lifecycle and pass everything.
  const fields = readLifecycle(sidecar({ status: 'draft', trigger: 'measured-2026-06-25' }));
  assert.equal(fields.status, 'draft');
  assert.equal(fields.triggerEval, 'measured-2026-06-25');
  assert.equal(fields.outputEval, 'measured-2026-06-25');
});

test('a sidecar with no lifecycle fields at all does not throw', () => {
  assert.doesNotThrow(() => checkLifecycle('think-example', ''));
  assert.doesNotThrow(() => checkLifecycle('think-example', undefined));
});
