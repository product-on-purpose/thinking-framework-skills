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
