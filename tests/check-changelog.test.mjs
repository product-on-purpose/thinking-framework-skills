// tests/check-changelog.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { topReleasedVersion, topReleaseNotesVersion } from '../scripts/check-changelog.mjs';

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
