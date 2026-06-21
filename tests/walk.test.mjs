// tests/walk.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { walk } from '../scripts/lib/walk.mjs';

const TMP = join(process.cwd(), '.tmp-walk-test');

function setup() {
  rmSync(TMP, { recursive: true, force: true });
  mkdirSync(join(TMP, 'sub'), { recursive: true });
  mkdirSync(join(TMP, 'node_modules', 'pkg'), { recursive: true });
  mkdirSync(join(TMP, '.hidden'), { recursive: true });
  writeFileSync(join(TMP, 'a.md'), '# a');
  writeFileSync(join(TMP, 'b.txt'), 'b');
  writeFileSync(join(TMP, 'sub', 'c.md'), '# c');
  writeFileSync(join(TMP, 'sub', 'd.mjs'), 'x');
  writeFileSync(join(TMP, 'node_modules', 'pkg', 'e.md'), '# e');
  writeFileSync(join(TMP, '.hidden', 'f.md'), '# f');
}

test('walk finds nested .md files', () => {
  setup();
  const files = walk(TMP, { exts: ['.md'] }).map((f) => f.replace(/\\/g, '/'));
  rmSync(TMP, { recursive: true, force: true });
  assert.ok(files.some((f) => f.endsWith('a.md')), 'root a.md');
  assert.ok(files.some((f) => f.endsWith('sub/c.md')), 'nested sub/c.md');
});

test('walk skips node_modules', () => {
  setup();
  const files = walk(TMP, { exts: ['.md'] });
  rmSync(TMP, { recursive: true, force: true });
  assert.ok(!files.some((f) => f.includes('node_modules')), 'no node_modules entries');
});

test('walk skips dotfile entries', () => {
  setup();
  const files = walk(TMP, { exts: ['.md'] });
  rmSync(TMP, { recursive: true, force: true });
  assert.ok(!files.some((f) => f.includes('.hidden')), 'no dotdir entries');
});

test('walk with exts filter returns only matching extensions', () => {
  setup();
  const files = walk(TMP, { exts: ['.md'] });
  rmSync(TMP, { recursive: true, force: true });
  assert.ok(files.every((f) => f.endsWith('.md')), 'all results are .md');
  assert.ok(!files.some((f) => f.endsWith('.txt')), 'no .txt');
  assert.ok(!files.some((f) => f.endsWith('.mjs')), 'no .mjs');
});

test('walk with no exts returns all non-skipped files', () => {
  setup();
  const files = walk(TMP);
  rmSync(TMP, { recursive: true, force: true });
  assert.ok(files.some((f) => f.endsWith('.md')));
  assert.ok(files.some((f) => f.endsWith('.txt')));
  assert.ok(files.some((f) => f.endsWith('.mjs')));
});

test('walk returns empty array for non-existent dir', () => {
  const files = walk('/nonexistent-dir-that-does-not-exist-xyz');
  assert.deepEqual(files, []);
});
