// tests/check-repo-links.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { findBrokenRepoLinks } from '../scripts/check-repo-links.mjs';

const TMP = join(process.cwd(), '.tmp-repo-links-test');
test('flags a relative link to a missing file, ignores external + existing', () => {
  rmSync(TMP, { recursive: true, force: true }); mkdirSync(join(TMP, 'docs'), { recursive: true });
  writeFileSync(join(TMP, 'docs', 'real.md'), '# real');
  const body = 'see [a](./real.md), [b](./missing.md), [c](https://x.com), [d](#anchor)';
  const broken = findBrokenRepoLinks(join(TMP, 'docs', 'from.md'), body, TMP);
  rmSync(TMP, { recursive: true, force: true });
  assert.deepEqual(broken.map((x) => x.href), ['./missing.md']);
});

test('link inside a fenced code block is ignored', () => {
  const body = '```\nsee [missing](./missing.md)\n```';
  const broken = findBrokenRepoLinks(join(process.cwd(), 'from.md'), body, process.cwd());
  assert.deepEqual(broken, []);
});

test('link inside a single-backtick inline code span is ignored', () => {
  const body = 'text `[missing](./missing.md)` more text';
  const broken = findBrokenRepoLinks(join(process.cwd(), 'from.md'), body, process.cwd());
  assert.deepEqual(broken, []);
});

test('link inside a 4-backtick inline code span is ignored', () => {
  const body = 'text ````[missing](./missing.md)```` more text';
  const broken = findBrokenRepoLinks(join(process.cwd(), 'from.md'), body, process.cwd());
  assert.deepEqual(broken, []);
});

test('image link is ignored (not checked as a file link)', () => {
  const body = '![alt](./missing.md)';
  const broken = findBrokenRepoLinks(join(process.cwd(), 'from.md'), body, process.cwd());
  assert.deepEqual(broken, []);
});
