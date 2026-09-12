import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parsePinnedRef, CI_FILE, TOOLKIT_REPO } from '../scripts/lib/toolkit-pin-lib.mjs';

// Negative-first. The defect this file exists to prevent: `npm run setup` installs a toolkit at a
// DIFFERENT commit than the one CI grades against, so a contributor's local gate disagrees with CI
// for a reason they cannot see. The only way that cannot happen is if the pin is never re-typed -
// so these tests are mostly about the parser REFUSING rather than the parser succeeding.

const SHA = 'a'.repeat(40);
const OTHER = 'b'.repeat(40);

const ciYaml = (ref, repo = TOOLKIT_REPO) => `
jobs:
  check:
    steps:
      - name: Checkout this repo
        uses: actions/checkout@v4
      - name: Checkout the toolkit validators (pinned)
        uses: actions/checkout@v4
        with:
          repository: ${repo}
          ref: ${ref}
          path: .agent-skills-toolkit
`;

// --- the refusals (the whole point) --------------------------------------------------

test('parsePinnedRef: throws when no step pins the toolkit at all', () => {
  // A silent fallback to `main` would install validators CI never ran. Refusing is the feature.
  assert.throws(() => parsePinnedRef('jobs:\n  check:\n    steps:\n      - uses: actions/checkout@v4\n'), /found no checkout step pinning/);
  assert.throws(() => parsePinnedRef(''), /found no checkout step pinning/);
});

test('parsePinnedRef: throws on a branch name rather than accepting it', () => {
  assert.throws(() => parsePinnedRef(ciYaml('main')), /not a full 40-character commit SHA/);
});

test('parsePinnedRef: throws on a short SHA', () => {
  // A short SHA cannot be byte-compared against what CI checked out.
  assert.throws(() => parsePinnedRef(ciYaml('93da438')), /not a full 40-character commit SHA/);
});

test('parsePinnedRef: throws when the toolkit is pinned twice to different refs', () => {
  // Two pins mean two different gates, and picking one silently would pick the wrong one half
  // the time. The caller must fix ci.yml, not be guessed at.
  const two = ciYaml(SHA) + ciYaml(OTHER);
  assert.throws(() => parsePinnedRef(two), /pinned to 2 different refs/);
});

test('parsePinnedRef: a different repository pinned nearby is not mistaken for the toolkit', () => {
  assert.throws(() => parsePinnedRef(ciYaml(SHA, 'some-org/unrelated-action')), /found no checkout step pinning/);
});

test('parsePinnedRef: does not claim a `ref:` that belongs to a later step', () => {
  // The repository line and the ref line must be in the same `with:` block. A new list item
  // ends the block; without that bound, an unrelated later ref would be adopted.
  const detached = `
      - name: Checkout the toolkit validators (pinned)
        uses: actions/checkout@v4
        with:
          repository: ${TOOLKIT_REPO}
          path: .agent-skills-toolkit
      - name: Something else entirely
        uses: actions/checkout@v4
        with:
          ref: ${SHA}
`;
  assert.throws(() => parsePinnedRef(detached), /found no checkout step pinning/);
});

// --- the success path ---------------------------------------------------------------

test('parsePinnedRef: reads the pinned repository and ref', () => {
  assert.deepEqual(parsePinnedRef(ciYaml(SHA)), { repository: TOOLKIT_REPO, ref: SHA });
});

test('parsePinnedRef: handles CRLF, since ci.yml can be smudged on Windows', () => {
  assert.deepEqual(parsePinnedRef(ciYaml(SHA).replace(/\n/g, '\r\n')), { repository: TOOLKIT_REPO, ref: SHA });
});

test('parsePinnedRef: the same ref pinned twice is not an ambiguity', () => {
  assert.deepEqual(parsePinnedRef(ciYaml(SHA) + ciYaml(SHA)), { repository: TOOLKIT_REPO, ref: SHA });
});

// --- the real file (the assertion that actually protects the repo) -------------------

test('parsePinnedRef: parses THIS repo\'s real ci.yml to a full SHA', () => {
  // If ci.yml is ever restructured so the parser stops finding the pin, `npm run setup` breaks
  // for every new contributor. This test is what notices.
  const { repository, ref } = parsePinnedRef(readFileSync(CI_FILE, 'utf8'));
  assert.equal(repository, TOOLKIT_REPO);
  assert.match(ref, /^[0-9a-f]{40}$/);
});
