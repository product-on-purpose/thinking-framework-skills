import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderAppendix, orphans } from '../scripts/lib/research-appendix-lib.mjs';
import registry from '../frameworks/registry.mjs';

const fixture = {
  families: [
    { slug: 'framing', name: 'Problem framing' },
    { slug: 'empty', name: 'A family with no members' },
  ],
  frameworks: [
    { slug: 'premortem', name: 'Premortem', family: 'framing', status: 'shipped', aliases: ['Prospective hindsight', 'premortem'] },
    { slug: 'pre-parade', name: 'Pre-Parade', family: 'framing', status: 'fold', foldInto: 'premortem' },
    { slug: 'brand-x', name: 'Brand X', family: 'framing', status: 'excl' },
  ],
};

test('renderAppendix: a fold names its target, aliases print, and a self-alias is dropped', () => {
  const { markdown, listed } = renderAppendix(fixture, '2026-10-17');
  assert.equal(listed, 3);
  assert.match(markdown, /^- Pre-Parade \[folded into Premortem\]$/m);
  assert.match(markdown, /^- Premortem \(also: Prospective hindsight\) \[shipped\]$/m);
  assert.match(markdown, /^- Brand X \[excluded\]$/m);
  assert.match(markdown, /^Generated 2026-10-17 from the library's registry: 3 methods in 2 families\.$/m);
});

test('renderAppendix: a family with no members gets no heading', () => {
  const { markdown } = renderAppendix(fixture, '2026-10-17');
  assert.doesNotMatch(markdown, /A family with no members/);
  assert.match(markdown, /^## Problem framing \(3\)$/m);
});

test('orphans: a method whose family is not listed is reported', () => {
  const bad = { ...fixture, frameworks: [...fixture.frameworks, { slug: 'lost', name: 'Lost', family: 'nowhere', status: 'excl' }] };
  assert.deepEqual(orphans(bad).map((f) => f.slug), ['lost']);
  assert.deepEqual(orphans(fixture), []);
});

test('renderAppendix: against the real registry, every method is listed and every fold names a target', () => {
  const { markdown, listed } = renderAppendix(registry, '2026-10-17');
  assert.equal(listed, registry.frameworks.length);
  assert.deepEqual(orphans(registry), []);
  assert.doesNotMatch(markdown, /\[folded into another method\]/);
});
