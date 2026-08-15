// tests/engine-no-hardcoded-count.test.mjs
// SPEC-01 / finding B-01: both copies of the shared applicator engine told the model the
// corpus held "34 framework skills" while it held 63. A wrong number inside a tool's own
// execution contract is the worst place to carry one, and the only durable fix is to make
// the class unrepresentable: the engine states no corpus count at all and points at the
// feed's own skill_count instead.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ENGINES = [
  'skills/think-top3/references/engine.md',
  'skills/think-random-frameworks/references/engine.md',
];

// Catches a claim about how big the CORPUS is ("the 34 framework skills", "lists 56
// frameworks", "all 63 skills"), while leaving the engine's own selection size alone
// ("Draw 3 frameworks at random" is the mechanism, not a corpus count, and must survive).
const HARDCODED_COUNT = /\b(?:the|all|lists?|listing|contains?|holds?|of)\s+\d+\s+(?:framework|skill)/i;

for (const rel of ENGINES) {
  test(`${rel} states no hardcoded corpus count`, () => {
    const text = readFileSync(resolve(ROOT, rel), 'utf8');
    const hit = text.match(HARDCODED_COUNT);
    assert.equal(
      hit,
      null,
      hit
        ? `found a hardcoded corpus count: ${JSON.stringify(hit[0])}. The engine must defer to the ` +
          'recommendable feed\'s own skill_count so the number cannot go stale.'
        : '',
    );
  });

  test(`${rel} points the model at the feed's skill_count`, () => {
    const text = readFileSync(resolve(ROOT, rel), 'utf8');
    assert.match(text, /skill_count/, 'the replacement wording must survive future edits');
  });
}

test('both engine copies are byte-identical (the gen-engine drift contract)', () => {
  const [a, b] = ENGINES.map((rel) => readFileSync(resolve(ROOT, rel), 'utf8'));
  assert.equal(a, b, 'run `node scripts/gen-engine.mjs` to resync the copy');
});
