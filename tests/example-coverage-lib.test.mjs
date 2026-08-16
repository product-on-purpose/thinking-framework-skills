// tests/example-coverage-lib.test.mjs
// #104 / audit finding D-03. This ratchet guarded the whole example layer and had no test of its
// own, so nothing proved it could still fail. A ratchet that silently stops ratcheting is worse
// than no ratchet: it reports OK while the thing it guards rots. Negative-first.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractReferencedSlugs, computeCoverage } from '../scripts/lib/example-coverage-lib.mjs';

test('THE FAILURE CASE: a new shipped skill with no example and no grandfathering', () => {
  const r = computeCoverage({ shipped: ['premortem', 'brand-new'], referenced: ['premortem'], baseline: [] });
  assert.deepEqual(r.missing, ['brand-new'], 'this is the case the ratchet exists for');
});

test('a grandfathered skill with no example does NOT fail', () => {
  const r = computeCoverage({ shipped: ['premortem', 'old-one'], referenced: ['premortem'], baseline: ['old-one'] });
  assert.deepEqual(r.missing, []);
  assert.deepEqual(r.uncovered, ['old-one'], 'still uncovered, just not a failure');
});

test('a fully covered catalog is clean', () => {
  const r = computeCoverage({ shipped: ['a', 'b'], referenced: ['a', 'b'], baseline: [] });
  assert.deepEqual(r.missing, []);
  assert.deepEqual(r.uncovered, []);
});

test('the ratchet only tightens: a grandfathered skill that gains an example is reported', () => {
  const r = computeCoverage({ shipped: ['old-one'], referenced: ['old-one'], baseline: ['old-one'] });
  assert.deepEqual(r.nowCovered, ['old-one'], 'advisory, so the baseline can shrink');
  assert.deepEqual(r.missing, []);
});

test('a baseline entry that is no longer shipped is reported as stale', () => {
  const r = computeCoverage({ shipped: ['a'], referenced: ['a'], baseline: ['deleted-skill'] });
  assert.deepEqual(r.stale, ['deleted-skill']);
  assert.deepEqual(r.missing, []);
});

test('grandfathering does not hide a DIFFERENT new skill', () => {
  // The failure this catches: a baseline entry making the set non-empty could tempt an
  // implementation into "baseline is non-empty, so nothing is missing".
  const r = computeCoverage({ shipped: ['old-one', 'brand-new'], referenced: [], baseline: ['old-one'] });
  assert.deepEqual(r.missing, ['brand-new']);
});

test('empty inputs do not throw and report nothing', () => {
  assert.deepEqual(computeCoverage({}), { uncovered: [], missing: [], nowCovered: [], stale: [] });
  assert.deepEqual(computeCoverage(), { uncovered: [], missing: [], nowCovered: [], stale: [] });
});

test('Set and Array are both accepted for referenced and baseline', () => {
  const withSets = computeCoverage({ shipped: ['a', 'b'], referenced: new Set(['a']), baseline: new Set(['b']) });
  const withArrays = computeCoverage({ shipped: ['a', 'b'], referenced: ['a'], baseline: ['b'] });
  assert.deepEqual(withSets, withArrays);
});

// --- what counts as "an example" --------------------------------------------------------------

test('a framework link counts as a reference', () => {
  assert.ok(extractReferencedSlugs('see [it](frameworks/think-premortem/)').has('premortem'));
});

test('a prompt invocation counts too (the samples corpus uses these, not links)', () => {
  assert.ok(extractReferencedSlugs('/think-stress-test-decision "should we launch"').has('stress-test-decision'));
});

test('multi-segment slugs survive intact', () => {
  const s = extractReferencedSlugs('think-issue-position-argument-mapping');
  assert.ok(s.has('issue-position-argument-mapping'));
});

test('several references in one document are all collected', () => {
  const s = extractReferencedSlugs('think-a and think-b and think-a again');
  assert.deepEqual([...s].sort(), ['a', 'b']);
});

test('prose with no skill references yields nothing', () => {
  assert.equal(extractReferencedSlugs('just some words about thinking').size, 0);
});
