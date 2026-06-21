// tests/check-canonical-links.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { servedPath, findRedirectHopLinks, findAbsoluteRedirectHops } from '../scripts/check-canonical-links.mjs';
import { REDIRECTS } from '../scripts/site-redirects.mjs';

test('servedPath: root index.mdx -> /', () => {
  assert.equal(servedPath('index.mdx', null), '/');
});
test('servedPath: directory index.md -> /dir/', () => {
  assert.equal(servedPath('about/index.md', null), '/about/');
});
test('servedPath: leaf .mdx -> /dir/leaf/', () => {
  assert.equal(servedPath('start/getting-started.mdx', null), '/start/getting-started/');
});
test('servedPath: frontmatter slug overrides the path', () => {
  assert.equal(servedPath('start/foo.md', 'custom/place'), '/custom/place/');
});
test('findRedirectHopLinks flags a link to a redirect source from the root page', () => {
  // root index.mdx links to the legacy advisor URL via a relative link
  const hops = findRedirectHopLinks('index.mdx', null, 'See [advisor](frameworks/think-framework-advisor/).', REDIRECTS);
  assert.equal(hops.length, 1);
  assert.equal(hops[0].redirectSource, '/frameworks/think-framework-advisor/');
});
test('findRedirectHopLinks ignores links to canonical (non-redirected) targets', () => {
  const hops = findRedirectHopLinks('index.mdx', null, 'See [advisor](tools/think-framework-advisor/).', REDIRECTS);
  assert.equal(hops.length, 0);
});
test('findRedirectHopLinks flags a JSX href to a redirect source', () => {
  const hops = findRedirectHopLinks('start/getting-started.mdx', null, '<LinkCard href="../../frameworks/think-framework-advisor/" />', REDIRECTS);
  assert.equal(hops.length, 1);
  assert.equal(hops[0].redirectSource, '/frameworks/think-framework-advisor/');
});

// Item D: empty slug falls through to path derivation
test('servedPath: empty slug falls through to path-derived URL', () => {
  assert.equal(servedPath('start/getting-started.mdx', ''), '/start/getting-started/');
});
test('servedPath: whitespace-only slug falls through to path-derived URL', () => {
  assert.equal(servedPath('about/index.md', '   '), '/about/');
});

// Item B: findAbsoluteRedirectHops
test('findAbsoluteRedirectHops flags JSX href with base template literal to redirect source', () => {
  const body = 'href={`${base}/frameworks/think-framework-advisor/`}';
  const hops = findAbsoluteRedirectHops(body, REDIRECTS);
  assert.equal(hops.length, 1);
  assert.equal(hops[0].redirectSource, '/frameworks/think-framework-advisor/');
});
test('findAbsoluteRedirectHops does NOT flag a canonical (non-redirect) absolute path', () => {
  const body = 'href={`${base}/tools/think-framework-advisor/`}';
  const hops = findAbsoluteRedirectHops(body, REDIRECTS);
  assert.equal(hops.length, 0);
});
test('findAbsoluteRedirectHops does NOT flag relative links', () => {
  const body = '[advisor](frameworks/think-framework-advisor/)';
  const hops = findAbsoluteRedirectHops(body, REDIRECTS);
  assert.equal(hops.length, 0);
});
