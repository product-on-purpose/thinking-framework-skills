import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stampField, resolveStampTargets, stampMeta, missingStampTargets } from '../scripts/eval/stamp-meta.mjs';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

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

// --- stamping nothing must be LOUD ----------------------------------------------------
// The rule above is right as a RESOLUTION rule, and it guarded exactly one direction. It stops a
// miscomputed target set from falling back to "all", and silently permits it to fall to ZERO.
//
// That happened, on 2026-09-13. A slug list was built by mapping the roster corpus over `.slug`,
// but that corpus carries `id`. Every entry was `undefined` - and `[undefined, ...].join(',')`
// renders undefined as an EMPTY STRING, so the argument was 66 bare commas, which
// `filter(Boolean)` reduced to []. The run reported `on 0 skill(s) (skipped 0)`, wrote its
// scorecard, and exited 0, leaving a scorecard dated that day beside 67 sidecars claiming an
// older measurement date. Nothing in the gate caught it: the scorecard was perfectly well-formed.

test('the exact 2026-09-13 mistake: mapping over a field the corpus does not have', () => {
  // Not a re-telling of the bug - the actual expression, so the test fails if `join` ever
  // stopped rendering undefined as ''. This is the step that made the failure invisible:
  // the argument does not LOOK empty, it looks like a long list.
  const corpus = [{ id: 'premortem' }, { id: 'swot' }, { id: 'issue-tree' }];
  const arg = corpus.map((x) => x.slug).join(',');
  assert.equal(arg, ',,', 'undefined joins to an empty string, not "undefined"');
  assert.notEqual(arg, '', 'and the argument is NOT empty, which is why a truthiness check missed it');
  assert.deepEqual(arg.split(',').map((s) => s.trim()).filter(Boolean), []);
});

test('missingStampTargets names the slugs that resolve to no skill directory', () => {
  const missing = missingStampTargets(REPO_ROOT, ['premortem', 'definitely-not-a-skill', 'issue-tree']);
  assert.deepEqual(missing, ['definitely-not-a-skill']);
});

test('missingStampTargets catches the think- prefix mistake', () => {
  // `--stamp` takes BARE slugs; `think-premortem` resolves to skills/think-think-premortem/.
  assert.deepEqual(missingStampTargets(REPO_ROOT, ['think-premortem']), ['think-premortem']);
});

test('stampMeta REFUSES an explicit empty target list instead of stamping nothing quietly', async () => {
  await assert.rejects(
    () => stampMeta('2026-09-14', 'trigger', REPO_ROOT, []),
    /refusing to stamp[\s\S]*target list is empty/,
  );
});

test('stampMeta refuses a target that names no skill directory, and writes NOTHING first', async () => {
  // Validation happens before any write, so a list that is half-good cannot leave the tree
  // half-stamped. `premortem` is real and would have been rewritten under the old ordering.
  const before = readFileSync(join(REPO_ROOT, 'skills', 'think-premortem', 'skill.meta.yml'), 'utf8');
  await assert.rejects(
    () => stampMeta('2026-09-14', 'trigger', REPO_ROOT, ['premortem', 'definitely-not-a-skill']),
    /name no skills\/think-<slug>/,
  );
  const after = readFileSync(join(REPO_ROOT, 'skills', 'think-premortem', 'skill.meta.yml'), 'utf8');
  assert.equal(after, before, 'a refused stamp must not have written the valid targets first');
});
