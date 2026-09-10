// tests/check-changelog.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { topReleasedVersion, topReleaseNotesVersion, duplicateSections } from '../scripts/check-changelog.mjs';

test('topReleasedVersion skips [Unreleased] and returns the first released version', () => {
  const md = '# Changelog\n\n## [Unreleased]\n- x\n\n## [0.11.0] - 2026-06-19\n- y\n';
  assert.equal(topReleasedVersion(md), '0.11.0');
});

test('topReleaseNotesVersion reads the first ## vX.Y.Z', () => {
  assert.equal(topReleaseNotesVersion('# Release notes\n\n## v0.11.0\n\nbody'), '0.11.0');
});

test('topReleasedVersion returns null when no released sections exist', () => {
  const md = '# Changelog\n\n## [Unreleased]\n- x\n';
  assert.equal(topReleasedVersion(md), null);
});

test('topReleasedVersion skips [Unreleased] case-insensitively', () => {
  const md = '## [UNRELEASED]\n## [0.9.0] - 2025-01-01\n';
  assert.equal(topReleasedVersion(md), '0.9.0');
});

test('topReleaseNotesVersion returns null when no version heading found', () => {
  assert.equal(topReleaseNotesVersion('# Release notes\n\nno versions here'), null);
});

test('topReleasedVersion handles v-prefixed brackets like [v0.11.0]', () => {
  const md = '## [v0.11.0] - 2026-06-19\n- y\n';
  assert.equal(topReleasedVersion(md), '0.11.0');
});

test('topReleaseNotesVersion: bare (non-v) heading matches; trailing-garbage heading does not', () => {
  assert.equal(topReleaseNotesVersion('# Release notes\n\n## 0.11.0\n\nbody'), '0.11.0');
  assert.equal(topReleaseNotesVersion('# Release notes\n\n## v0.11.0-rc1\n\nbody'), null);
});

// --- duplicateSections: one section per change type per version block ---------------
// The defect this exists to catch, reproduced from CHANGELOG.md as it stood at 60aa2a0:
// seven PRs each prepended their own block to [Unreleased], leaving `### Added` four
// times, `### Changed` four times, `### Fixed` three times and `### Security` twice.
// check-changelog only compared version numbers, so the gate stayed green through all
// seven merges. Negative-first: the first case is the failure.

test('duplicateSections reports a change type used twice in one version block', () => {
  const md = '## [Unreleased]\n\n### Added\n- a\n\n### Added\n- b\n\n## [0.13.0] - 2026-06-25\n### Added\n- c\n';
  assert.deepEqual(duplicateSections(md), [{ version: 'Unreleased', type: 'Added', count: 2 }]);
});

test('duplicateSections reports every duplicated type, in first-appearance order', () => {
  const md = [
    '## [Unreleased]',
    '### Added', '- a',
    '### Changed', '- b',
    '### Added', '- c',
    '### Changed', '- d',
    '### Changed', '- e',
  ].join('\n');
  assert.deepEqual(duplicateSections(md), [
    { version: 'Unreleased', type: 'Added', count: 2 },
    { version: 'Unreleased', type: 'Changed', count: 3 },
  ]);
});

test('duplicateSections is silent on a well-formed changelog', () => {
  const md = '## [Unreleased]\n### Added\n- a\n### Changed\n- b\n\n## [0.13.0] - 2026-06-25\n### Added\n- c\n### Fixed\n- d\n';
  assert.deepEqual(duplicateSections(md), []);
});

test('duplicateSections scopes per version block: the same type in two blocks is fine', () => {
  const md = '## [Unreleased]\n### Added\n- a\n\n## [0.13.0] - 2026-06-25\n### Added\n- b\n\n## [0.12.0] - 2026-06-20\n### Added\n- c\n';
  assert.deepEqual(duplicateSections(md), []);
});

test('duplicateSections catches duplicates in a released block, not just [Unreleased]', () => {
  const md = '## [Unreleased]\n### Added\n- a\n\n## [0.13.0] - 2026-06-25\n### Fixed\n- b\n### Fixed\n- c\n';
  assert.deepEqual(duplicateSections(md), [{ version: '0.13.0', type: 'Fixed', count: 2 }]);
});

test('duplicateSections ignores headings inside a fenced code block', () => {
  const md = '## [Unreleased]\n### Added\n- a\n\n```md\n### Added\n### Added\n```\n\n- b\n';
  assert.deepEqual(duplicateSections(md), []);
});

test('duplicateSections tolerates trailing whitespace on a heading', () => {
  const md = '## [Unreleased]\n###   Added   \n- a\n### Added\n- b\n';
  assert.deepEqual(duplicateSections(md), [{ version: 'Unreleased', type: 'Added', count: 2 }]);
});

// Documented boundary: the rule is Keep a Changelog's six change types, not "any repeated
// h3". A repeated non-type subsection is a formatting choice, not the prepend defect.
test('duplicateSections ignores a repeated non-canonical h3', () => {
  const md = '## [Unreleased]\n### Notes\n- a\n### Notes\n- b\n';
  assert.deepEqual(duplicateSections(md), []);
});

test('duplicateSections returns [] when there are no version blocks at all', () => {
  assert.deepEqual(duplicateSections('# Changelog\n\nnothing here yet.\n'), []);
});
