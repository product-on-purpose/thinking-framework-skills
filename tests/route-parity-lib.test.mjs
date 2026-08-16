// tests/route-parity-lib.test.mjs
// #104 / audit finding D-03. This guard protects every published URL from silently disappearing
// and had no test of its own. The asymmetry it encodes (removed FAILS, added is fine) is easy to
// get backwards, and backwards means either a wall of false alarms on every new page, or - far
// worse - a removed URL sailing through. Negative-first.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toRoutes, parseBaseline, compareRoutes, isEmptyBuild } from '../scripts/lib/route-parity-lib.mjs';

test('THE FAILURE CASE: a baseline route missing from the build is reported removed', () => {
  const r = compareRoutes(['/a/index.html', '/b/index.html'], ['/a/index.html']);
  assert.deepEqual(r.removed, ['/b/index.html'], 'this would 404 for an existing link or bookmark');
});

test('a new route is ALLOWED and is not a failure', () => {
  const r = compareRoutes(['/a/index.html'], ['/a/index.html', '/new/index.html']);
  assert.deepEqual(r.removed, [], 'new pages are expected; failing here would train reflexive baseline updates');
  assert.deepEqual(r.added, ['/new/index.html']);
});

test('a RENAME is caught, because it is one removed plus one added', () => {
  const r = compareRoutes(['/old-name/index.html'], ['/new-name/index.html']);
  assert.deepEqual(r.removed, ['/old-name/index.html']);
  assert.deepEqual(r.added, ['/new-name/index.html']);
});

test('an identical set is clean', () => {
  const routes = ['/a/index.html', '/b/index.html'];
  assert.deepEqual(compareRoutes(routes, routes), { removed: [], added: [] });
});

test('order does not matter (it is a set comparison)', () => {
  const r = compareRoutes(['/a/index.html', '/b/index.html'], ['/b/index.html', '/a/index.html']);
  assert.deepEqual(r, { removed: [], added: [] });
});

test('several removals are all reported, not just the first', () => {
  const r = compareRoutes(['/a.html', '/b.html', '/c.html'], ['/b.html']);
  assert.deepEqual(r.removed, ['/a.html', '/c.html']);
});

// --- the empty-build distinction ---------------------------------------------------------------

test('an empty build is detectable, so the message can say "build broke" not "you deleted the site"', () => {
  assert.equal(isEmptyBuild([]), true);
  assert.equal(isEmptyBuild(['/a.html']), false);
  assert.equal(isEmptyBuild(undefined), true);
});

// --- path normalisation -------------------------------------------------------------------------

test('only .html files become routes', () => {
  assert.deepEqual(toRoutes(['a/index.html', 'a/styles.css', 'b/script.js']), ['/a/index.html']);
});

test('Windows separators normalise, so a baseline compares equal across operating systems', () => {
  assert.deepEqual(toRoutes(['frameworks\\think-premortem\\index.html']), ['/frameworks/think-premortem/index.html']);
});

test('routes are sorted, so the manifest is stable across filesystem orderings', () => {
  assert.deepEqual(toRoutes(['c.html', 'a.html', 'b.html']), ['/a.html', '/b.html', '/c.html']);
});

test('routes carry no Pages base, which is what makes the guard base-agnostic', () => {
  assert.deepEqual(toRoutes(['index.html']), ['/index.html']);
});

test('an empty path list yields no routes rather than throwing', () => {
  assert.deepEqual(toRoutes([]), []);
  assert.deepEqual(toRoutes(undefined), []);
});

// --- baseline parsing ----------------------------------------------------------------------------

test('the baseline parser tolerates blank lines, whitespace and CRLF', () => {
  assert.deepEqual(parseBaseline('/a.html\r\n\r\n  /b.html  \n\n'), ['/a.html', '/b.html']);
});

test('an empty baseline file parses to an empty list', () => {
  assert.deepEqual(parseBaseline(''), []);
  assert.deepEqual(parseBaseline(undefined), []);
});
