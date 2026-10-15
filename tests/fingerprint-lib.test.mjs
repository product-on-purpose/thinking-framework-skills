// tests/fingerprint-lib.test.mjs
// Roadmap C2-1 / SPEC-03. A scorecard that records only a date can be re-measured but not
// reproduced. These pin the pieces that make a run self-describing: a fingerprint that is the same
// on a Windows and a Linux checkout, a model resolution that refuses to guess, and the header line.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  casesFingerprint, skillCasesFingerprints, combinedFingerprint, resolveRunModel, runProvenance, withRunLine,
} from '../scripts/lib/fingerprint-lib.mjs';

test('the same cases hash identically with CRLF and LF line endings', () => {
  const lf = '# Eval cases\n\n## Should trigger\n- "a prompt"\n';
  assert.equal(casesFingerprint(lf), casesFingerprint(lf.replace(/\n/g, '\r\n')));
  assert.match(casesFingerprint(lf), /^[0-9a-f]{12}$/);
  assert.notEqual(casesFingerprint(lf), casesFingerprint(lf + '- "one more"\n'), 'an edit changes it');
});

test('a skill with no cases file is recorded as null, not dropped', () => {
  const fp = skillCasesFingerprints(['woop', 'premortem', 'ghost'], (s) => (s === 'ghost' ? null : `cases for ${s}`));
  assert.deepEqual(Object.keys(fp), ['ghost', 'premortem', 'woop'], 'sorted, one key per slug');
  assert.equal(fp.ghost, null);
});

test('the run fingerprint ignores order and moves when any one skill changes', () => {
  const a = { premortem: 'aaaaaaaaaaaa', woop: 'bbbbbbbbbbbb' };
  assert.equal(combinedFingerprint(a), combinedFingerprint({ woop: a.woop, premortem: a.premortem }));
  assert.notEqual(combinedFingerprint(a), combinedFingerprint({ ...a, woop: 'cccccccccccc' }));
});

test('resolveRunModel refuses a missing model, a missing tier, conflicting tiers, and an ID that names another tier', () => {
  assert.throws(() => resolveRunModel({ model: undefined, tierSources: ['opus'] }), /--model <id> is required/);
  assert.throws(() => resolveRunModel({ model: 'claude-opus-5-5', tierSources: [undefined, null] }), /no model tier/);
  assert.throws(() => resolveRunModel({ model: 'claude-opus-5-5', tierSources: ['opus', 'sonnet'] }), /different model tiers/);
  assert.throws(() => resolveRunModel({ model: 'claude-sonnet-5-5', tierSources: ['opus'] }), /does not name the tier/);
  assert.throws(() => resolveRunModel({ model: 'claude-opus-5-5', tierSources: ['opsu'] }), /unknown model tier/);
});

test('resolveRunModel accepts agreeing sources, including a run output and a matching fallback flag', () => {
  assert.deepEqual(resolveRunModel({ model: 'claude-opus-5-5', tierSources: ['opus', 'opus', undefined] }),
    { model: 'claude-opus-5-5', modelTier: 'opus' });
});

test('runProvenance and withRunLine put model, tier and fingerprint under the scorecard title', () => {
  const prov = runProvenance({ model: 'claude-opus-5-5', modelTier: 'opus', readCases: (s) => `cases ${s}` }, ['woop', 'premortem']);
  assert.deepEqual(Object.keys(prov), ['model', 'modelTier', 'casesSha', 'skillCasesSha']);
  const md = withRunLine('# Trigger eval scorecard\n\n- **Trigger accuracy**: 99%\n', '2026-10-14', prov);
  const lines = md.split('\n');
  assert.equal(lines[0], '# Trigger eval scorecard');
  assert.match(lines[2], /^Run: 2026-10-14 \| model: `claude-opus-5-5` \(tier `opus`\) \| cases: `[0-9a-f]{12}` \(fingerprint of 2 skills' eval\/cases\.md\)$/);
  assert.match(md, /- \*\*Trigger accuracy\*\*: 99%/, 'the body is untouched');
});
