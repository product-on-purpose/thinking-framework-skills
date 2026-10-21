import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CLAIM_SURFACES, checkClaimSurface, TIER_MEDAL } from '../scripts/lib/tier-claim-lib.mjs';

// Unit tests for the words half of the conformance claim: the sentences that name the tier, its
// medal and the declared Standard (scripts/lib/tier-claim-lib.mjs).

const read = (p) => readFileSync(p, 'utf8');
const declared = JSON.parse(read('library.json'));

test('every claim surface matches the tree and agrees with library.json', () => {
  for (const s of CLAIM_SURFACES) {
    const problems = checkClaimSurface({ text: read(s.where), surface: s, declared });
    assert.deepEqual(problems, [], problems.join('; '));
  }
});

test('a tier change in library.json reds every surface that names the tier or medal', () => {
  const other = { ...declared, tier: 'convergent' };
  for (const s of CLAIM_SURFACES.filter((x) => 'tier' in x.fields || 'medal' in x.fields)) {
    const problems = checkClaimSurface({ text: read(s.where), surface: s, declared: other });
    assert.ok(problems.length >= 1, `${s.label} must fail when the declared tier changes`);
  }
});

test('a Standard re-pin in library.json reds every surface that names the Standard', () => {
  const other = { ...declared, standard: '0.13' };
  for (const s of CLAIM_SURFACES.filter((x) => 'standard' in x.fields)) {
    const problems = checkClaimSurface({ text: read(s.where), surface: s, declared: other });
    assert.ok(problems.length >= 1, `${s.label} must fail when the declared Standard changes`);
  }
});

test('a reworded surface is a problem, not a silent pass', () => {
  const s = CLAIM_SURFACES[0];
  const problems = checkClaimSurface({ text: 'the badge was removed', surface: s, declared });
  assert.equal(problems.length, 1);
  assert.match(problems[0], /found none/);
});

test('a stale medal beside a correct tier is caught', () => {
  const s = CLAIM_SURFACES.find((x) => x.label === 'README conformance heading');
  const problems = checkClaimSurface({ text: 'Conformance: what advanced (Silver) tier means', surface: s, declared });
  assert.equal(problems.length, 1);
  assert.match(problems[0], /medal "Silver"/);
});

test('every tier has a medal', () => {
  assert.deepEqual(Object.keys(TIER_MEDAL).sort(), ['advanced', 'convergent', 'universal']);
});
