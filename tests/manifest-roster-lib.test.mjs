// tests/manifest-roster-lib.test.mjs
// Roadmap C1-4 / SPEC-06. manifest.generated.json was the one committed generated file nothing
// guarded, and the skill-selection eval reads its roster from it. Negative-first: each case is a
// drift a real edit produces, and the last two pin the "never red a valid file" rule.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkManifestRoster, plainScalar, REGENERATE } from '../scripts/lib/manifest-roster-lib.mjs';

const SPINE = { name: 'thinking-framework-skills', version: '0.17.0', tier: 'advanced', standard: '0.8' };
const skill = (name, description = `${name} does a thing.`) =>
  ({ name, path: `skills/${name}/SKILL.md`, description });
const command = (name, mapsTo = name) =>
  ({ name, path: `commands/${name}.md`, description: `Run ${name}.`, mapsTo });

function fresh() {
  return {
    spine: { ...SPINE },
    skills: [skill('think-premortem'), skill('think-woop')],
    commands: [command('think-stress-test-decision')],
  };
}
const manifestOf = (exp) => ({ ...exp.spine, skills: exp.skills.map((e) => ({ ...e })), commands: exp.commands.map((e) => ({ ...e })) });

test('an edited skill description without regeneration is caught, and named', () => {
  const expected = fresh();
  const manifest = manifestOf(expected);
  expected.skills[0].description = 'think-premortem now says something else.';
  const problems = checkManifestRoster(manifest, expected);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /skills entry "think-premortem" has a stale description/);
  assert.ok(problems[0].includes(REGENERATE), 'the message carries the fix command');
});

test('a new skill on disk, and a removed one, are each caught', () => {
  const expected = fresh();
  const manifest = manifestOf(expected);
  expected.skills.push(skill('think-new'));
  manifest.skills.push(skill('think-gone'));
  const problems = checkManifestRoster(manifest, expected);
  assert.equal(problems.length, 2);
  assert.ok(problems.some((p) => /"think-new" exists on disk but is not listed/.test(p)));
  assert.ok(problems.some((p) => /"think-gone" is listed but no longer exists/.test(p)));
});

test('a command retargeted to another skill is caught on maps-to', () => {
  const expected = fresh();
  const manifest = manifestOf(expected);
  expected.commands[0].mapsTo = 'think-premortem';
  const problems = checkManifestRoster(manifest, expected);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /commands entry "think-stress-test-decision" has a stale mapsTo/);
});

test('a version bump without regeneration is caught on the spine', () => {
  const expected = fresh();
  const manifest = manifestOf(expected);
  expected.spine.version = '0.18.0';
  const problems = checkManifestRoster(manifest, expected);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /"version" is "0.17.0" but library.json says "0.18.0"/);
});

test('a fresh manifest passes', () => {
  const expected = fresh();
  assert.deepEqual(checkManifestRoster(manifestOf(expected), expected), []);
});

test('plainScalar reads the one-line form every skill here uses, and null when absent', () => {
  assert.equal(plainScalar('name: x\ndescription: Builds a ladder.\nlicense: MIT', 'description'), 'Builds a ladder.');
  assert.equal(plainScalar('name: x', 'description'), null);
});

test('plainScalar declines what it cannot read with certainty, so a valid file is never red', () => {
  for (const fm of [
    'description: "Quoted \\"value\\""',
    "description: 'single'",
    'description: >\n  folded text',
    'description: |\n  literal text',
    'description: starts here\n  and continues here',
    'description: has a # comment',
  ]) assert.equal(plainScalar(fm, 'description'), undefined, fm);
  const expected = fresh();
  const manifest = manifestOf(expected);
  expected.skills[0].description = undefined;
  assert.deepEqual(checkManifestRoster(manifest, expected), [], 'an unreadable description is skipped, not failed');
});
