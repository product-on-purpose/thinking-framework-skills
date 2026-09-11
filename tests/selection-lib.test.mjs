import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildRoster,
  resolveExpected,
  normalizeRouted,
  tallyCommandPicks,
} from '../scripts/lib/selection-lib.mjs';

// Pure-function tests with in-memory fixtures (no fs), matching the cases-lib / score-lib
// precedent. Negative-first: each block leads with the defect it exists to catch.

const MANIFEST = {
  skills: [
    { name: 'think-premortem', path: 'skills/think-premortem/SKILL.md', description: 'Imagine the failure first.' },
    { name: 'think-framework-advisor', path: 'skills/think-framework-advisor/SKILL.md', description: 'Route a situation.' },
    { name: 'think-research-framework', path: 'skills/think-research-framework/SKILL.md', description: 'Research a method.' },
  ],
  commands: [
    { name: 'think-stress-test-decision', path: 'commands/think-stress-test-decision.md', description: 'Run the chain.', mapsTo: 'think-stress-test-decision' },
    { name: 'think-research-framework', path: 'commands/think-research-framework.md', description: 'Run the engine.', mapsTo: 'think-research-framework' },
  ],
};

// --- buildRoster -------------------------------------------------------------------

test('buildRoster: a command sharing a skill name does NOT collapse into one entry', () => {
  // The defect: keying the roster by bare slug silently drops one of the two
  // `think-research-framework` surfaces, so the eval can never see the collision it exists
  // to measure.
  const { entries } = buildRoster(MANIFEST);
  assert.equal(entries.length, 5, 'all 3 skills + 2 commands must survive');
  const ids = entries.map((e) => e.id);
  assert.ok(ids.includes('research-framework'), 'the skill keeps the bare slug');
  assert.ok(ids.includes('command:research-framework'), 'the command is kind-qualified');
  assert.equal(new Set(ids).size, ids.length, 'ids must be unique');
});

test('buildRoster: reports the skill/command name collision explicitly', () => {
  // The defect: an unreported collision makes a `research-framework` pick ambiguous at
  // scoring time, and nothing in the artifact says so.
  const { collisions } = buildRoster(MANIFEST);
  assert.deepEqual(collisions, ['research-framework']);
});

test('buildRoster: a non-colliding command is not reported as a collision', () => {
  const { collisions } = buildRoster(MANIFEST);
  assert.ok(!collisions.includes('stress-test-decision'));
});

test('buildRoster: commands are kind-qualified, skills are bare', () => {
  const { entries } = buildRoster(MANIFEST);
  const byId = Object.fromEntries(entries.map((e) => [e.id, e]));
  assert.equal(byId['premortem'].kind, 'skill');
  assert.equal(byId['command:stress-test-decision'].kind, 'command');
  assert.equal(byId['command:stress-test-decision'].slug, 'stress-test-decision');
});

test('buildRoster: entries carry ONLY what an agent actually sees', () => {
  // The defect: leaking anti_triggers / not_use / overlaps turns the skill-selection eval
  // back into the framework-routing eval, which already exists and measures something else.
  const { entries } = buildRoster({
    skills: [{ name: 'think-premortem', path: 'p', description: 'd', anti_triggers: ['x'], overlaps: ['y'] }],
    commands: [],
  });
  assert.deepEqual(Object.keys(entries[0]).sort(), ['description', 'id', 'kind', 'name', 'slug']);
});

test('buildRoster: an entry with no description is a problem, not a silent blank', () => {
  const { problems } = buildRoster({ skills: [{ name: 'think-x', path: 'p' }], commands: [] });
  assert.ok(problems.some((p) => /think-x/.test(p) && /description/i.test(p)), problems.join('; '));
});

test('buildRoster: counts report skills and commands separately', () => {
  const { counts } = buildRoster(MANIFEST);
  assert.deepEqual(counts, { skills: 3, commands: 2, total: 5 });
});

// --- resolveExpected ---------------------------------------------------------------

test('resolveExpected: a named tool outside the corpus degrades to "none"', () => {
  // This is the exact line that made 5 meta-skill anti-cases unscoreable: the tool was
  // named in the prose but absent from the corpus being searched.
  assert.equal(resolveExpected('framework-advisor', 'top3', new Set(['premortem'])), 'none');
});

test('resolveExpected: the same name IS resolved once the corpus contains it', () => {
  const corpus = new Set(['premortem', 'framework-advisor']);
  assert.equal(resolveExpected('framework-advisor', 'top3', corpus), 'framework-advisor');
});

test('resolveExpected: a self-reference never becomes the expected route', () => {
  const corpus = new Set(['top3']);
  assert.equal(resolveExpected('top3', 'top3', corpus), 'none');
});

test('resolveExpected: no named tool means "none"', () => {
  assert.equal(resolveExpected(null, 'top3', new Set(['top3', 'premortem'])), 'none');
});

// --- normalizeRouted ---------------------------------------------------------------

test('normalizeRouted: a colliding command pick resolves to the skill it shares a name with', () => {
  // `command:research-framework` and the skill `research-framework` are the same
  // capability (the command is the runnable wrapper), so counting them as different picks
  // would manufacture a routing miss that did not happen.
  const r = normalizeRouted('command:research-framework', new Set(['research-framework']));
  assert.deepEqual(r, { id: 'research-framework', normalized: true });
});

test('normalizeRouted: a non-colliding command pick is left alone', () => {
  // The defect: normalizing every command would erase exactly the signal guardrail 6 wants
  // (a command stealing a pick from a skill).
  const r = normalizeRouted('command:stress-test-decision', new Set(['research-framework']));
  assert.deepEqual(r, { id: 'command:stress-test-decision', normalized: false });
});

test('normalizeRouted: a plain skill pick passes through untouched', () => {
  assert.deepEqual(normalizeRouted('premortem', new Set(['research-framework'])), { id: 'premortem', normalized: false });
});

test('normalizeRouted: tolerates a missing/undefined pick', () => {
  assert.deepEqual(normalizeRouted(undefined, new Set()), { id: undefined, normalized: false });
});

// --- tallyCommandPicks -------------------------------------------------------------

const CASES = [
  { id: 'c1', type: 'trigger', source: 'premortem', expected: 'premortem' },
  { id: 'c2', type: 'anti', source: 'top3', expected: 'framework-advisor' },
  { id: 'c3', type: 'gate', source: 'framework-advisor', expected: 'none' },
];

test('tallyCommandPicks: counts a command stealing a pick on a trigger case', () => {
  // The guardrail-6 number. The defect it catches: scoring only top1 === expected reports
  // "a miss" without ever revealing that the thief was an always-loaded command.
  const routes = [{ id: 'c1', top1: 'command:stress-test-decision', top3: [] }];
  const t = tallyCommandPicks(CASES, routes, new Set());
  assert.equal(t.onTrigger, 1);
  assert.equal(t.total, 1);
});

test('tallyCommandPicks: counts trigger and anti separately', () => {
  const routes = [
    { id: 'c1', top1: 'command:stress-test-decision', top3: [] },
    { id: 'c2', top1: 'command:reframe-problem', top3: [] },
  ];
  const t = tallyCommandPicks(CASES, routes, new Set());
  assert.equal(t.onTrigger, 1);
  assert.equal(t.onAnti, 1);
  assert.equal(t.total, 2);
});

test('tallyCommandPicks: a normalized collision pick is NOT counted as a command pick', () => {
  const routes = [{ id: 'c1', top1: 'command:research-framework', top3: [] }];
  const t = tallyCommandPicks(CASES, routes, new Set(['research-framework']));
  assert.equal(t.total, 0, 'it resolved to the skill, so no command stole anything');
  assert.equal(t.normalized, 1);
});

test('tallyCommandPicks: gate cases are excluded from the tally', () => {
  // Gate cases are excluded from scoring entirely, so counting their picks would report a
  // number over a denominator the scorecard never shows.
  const routes = [{ id: 'c3', top1: 'command:reframe-problem', top3: [] }];
  const t = tallyCommandPicks(CASES, routes, new Set());
  assert.equal(t.total, 0);
});

test('tallyCommandPicks: records examples for the scorecard, not just a count', () => {
  const routes = [{ id: 'c1', top1: 'command:stress-test-decision', top3: [] }];
  const t = tallyCommandPicks(CASES, routes, new Set());
  assert.deepEqual(t.examples, [{ id: 'c1', type: 'trigger', want: 'premortem', got: 'command:stress-test-decision' }]);
});

test('tallyCommandPicks: no command picks yields an explicit zero, not an empty object', () => {
  const routes = [{ id: 'c1', top1: 'premortem', top3: [] }];
  const t = tallyCommandPicks(CASES, routes, new Set());
  assert.deepEqual(t, { onTrigger: 0, onAnti: 0, total: 0, normalized: 0, examples: [] });
});
