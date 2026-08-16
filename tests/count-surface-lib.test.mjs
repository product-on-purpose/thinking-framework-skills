// tests/count-surface-lib.test.mjs
// #104 / audit finding D-03. check-counts guards every hand-authored count in the README and the
// repo docs, and had no test of its own. It also carried a real inconsistency, fixed alongside
// these tests and regression-tested at the bottom of this file.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkCountSurface } from '../scripts/lib/count-surface-lib.mjs';
import { isWorkflowFile } from '../scripts/lib/workflow-mirror-lib.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const badge = /badge\/frameworks-(\d+)-/g;

test('THE OBVIOUS FAILURE: a wrong number is reported with the canonical one', () => {
  const p = checkCountSurface({ text: 'badge/frameworks-31-green', label: 'frameworks badge', pattern: badge, want: 63 });
  assert.equal(p.length, 1);
  assert.match(p[0], /shows 31, canonical is 63/);
});

test('THE SUBTLE FAILURE: a missing match is a problem, not a silent pass', () => {
  // This is how docs/README and getting-started drifted to stale counts: reword the prose the
  // pattern was written against and a naive matcher reports nothing at all.
  const p = checkCountSurface({ text: 'no counts here at all', label: 'frameworks badge', pattern: badge, want: 63 });
  assert.equal(p.length, 1);
  assert.match(p[0], /found none/);
  assert.match(p[0], /silently stops covering it/, 'the message must explain WHY zero matches is a failure');
});

test('a correct number passes clean', () => {
  assert.deepEqual(checkCountSurface({ text: 'badge/frameworks-63-green', label: 'x', pattern: badge, want: 63 }), []);
});

test('EVERY occurrence is checked, not just the first', () => {
  // A count usually appears on several surfaces; stopping at the first match would let the
  // second one drift unnoticed.
  const text = 'badge/frameworks-63-green ... later badge/frameworks-31-green';
  const p = checkCountSurface({ text, label: 'frameworks badge', pattern: badge, want: 63 });
  assert.equal(p.length, 1);
  assert.match(p[0], /shows 31/);
});

test('optional surfaces may be absent', () => {
  assert.deepEqual(checkCountSurface({ text: 'nothing', label: 'x', pattern: badge, want: 63, optional: true }), []);
});

test('a non-default capture group is honoured', () => {
  const p = checkCountSurface({
    text: 'All 63 frameworks', label: 'catalog', pattern: /(All) (\d+) frameworks/g, want: 63, group: 2,
  });
  assert.deepEqual(p, []);
});

test('the failure message names the file, so a multi-file run is navigable', () => {
  const p = checkCountSurface({ text: 'badge/frameworks-1-x', label: 'x', pattern: badge, want: 63, where: 'docs/README.md' });
  assert.match(p[0], /docs\/README\.md/);
});

test('the excerpt is truncated so a huge match cannot swamp the output', () => {
  const long = 'badge/frameworks-1-' + 'z'.repeat(500);
  const p = checkCountSurface({ text: long, label: 'x', pattern: badge, want: 63 });
  assert.ok(p[0].length < 200, 'message stayed bounded');
});

test('empty and absent text do not throw', () => {
  assert.equal(checkCountSurface({ text: '', label: 'x', pattern: badge, want: 1 }).length, 1);
  assert.equal(checkCountSurface({ label: 'x', pattern: badge, want: 1 }).length, 1);
});

// --- regression: the recipe count must use the SHARED predicate --------------------------------

test('REGRESSION: check-counts counts recipes with isWorkflowFile, not a bare .md filter', () => {
  // Fixed 2026-08-15. check-counts.mjs counted every .md in _workflows/, while the workflow
  // mirror in check-registry.mjs excludes README.md and _-prefixed control files per the Standard
  // (toolkit ADR 0047). The two agreed only because _workflows/ happened to contain neither.
  // Demonstrated before the fix: adding a folder README made check-counts demand a recipes badge
  // of 10 while the mirror saw 9. Standard G8 (folder-readme) actively WANTS that README, so this
  // was a live trap, not a hypothetical one.
  const src = readFileSync(resolve(ROOT, 'scripts', 'check-counts.mjs'), 'utf8');
  assert.match(src, /isWorkflowFile/, 'check-counts must use the shared predicate');
  assert.ok(
    !/readdirSync\(join\(ROOT, '_workflows'\)\)\.filter\(\(f\) => f\.endsWith\('\.md'\)\)/.test(src),
    'the bare .md filter must not come back',
  );
});

test('REGRESSION: the two counts agree on the real tree, including if a folder README existed', () => {
  const entries = readdirSync(resolve(ROOT, '_workflows'));
  const viaPredicate = entries.filter((f) => isWorkflowFile(f)).length;
  const withInjectedReadme = [...entries, 'README.md'].filter((f) => isWorkflowFile(f)).length;
  assert.equal(withInjectedReadme, viaPredicate, 'a folder README must not change the recipe count');
  assert.ok(viaPredicate >= 9, `expected at least the nine recipes, saw ${viaPredicate}`);
});
