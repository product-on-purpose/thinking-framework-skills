import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rewriteLinks } from '../scripts/lib/changelog-lib.mjs';

const OPTS = {
  selfLinks: { whatsNew: '/changelog/whats-new/', full: '/changelog/full/' },
  repoBlobBase: 'https://github.com/product-on-purpose/thinking-framework-skills/blob/main/',
};

test('rewrites a repo-relative inline link to a blob URL', () => {
  const out = rewriteLinks('see [arch](docs/architecture.md) here', OPTS);
  assert.equal(out, 'see [arch](https://github.com/product-on-purpose/thinking-framework-skills/blob/main/docs/architecture.md) here');
});

test('rewrites CHANGELOG.md and RELEASE-NOTES.md to on-site self-links', () => {
  assert.equal(rewriteLinks('[full](CHANGELOG.md)', OPTS), '[full](/changelog/full/)');
  assert.equal(rewriteLinks('[notes](RELEASE-NOTES.md)', OPTS), '[notes](/changelog/full/)'.replace('/full/', '/whats-new/'));
  assert.equal(rewriteLinks('[notes](./RELEASE-NOTES.md)', OPTS), '[notes](/changelog/whats-new/)');
});

test('preserves a #fragment on a self-link', () => {
  assert.equal(rewriteLinks('[u](CHANGELOG.md#unreleased)', OPTS), '[u](/changelog/full/#unreleased)');
});

test('leaves external links, pure anchors, and images untouched', () => {
  assert.equal(rewriteLinks('[x](https://example.com)', OPTS), '[x](https://example.com)');
  assert.equal(rewriteLinks('[x](#section)', OPTS), '[x](#section)');
  assert.equal(rewriteLinks('![alt](docs/img.png)', OPTS), '![alt](docs/img.png)');
});

test('does not rewrite inside a fenced code block', () => {
  const md = ['```', '[x](CHANGELOG.md)', '```', '[y](CHANGELOG.md)'].join('\n');
  const out = rewriteLinks(md, OPTS).split('\n');
  assert.equal(out[1], '[x](CHANGELOG.md)');      // inside fence: untouched
  assert.equal(out[3], '[y](/changelog/full/)');  // outside: rewritten
});

test('rewrites a repo-relative reference definition but preserves external ones', () => {
  assert.equal(rewriteLinks('[a]: docs/x.md', OPTS), '[a]: https://github.com/product-on-purpose/thinking-framework-skills/blob/main/docs/x.md');
  assert.equal(rewriteLinks('[0.11.0]: https://github.com/x/compare/a...b', OPTS), '[0.11.0]: https://github.com/x/compare/a...b');
});
