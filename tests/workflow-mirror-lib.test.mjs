// tests/workflow-mirror-lib.test.mjs
// SPEC-09 phase 1a. The repo shipped nine recipes in _workflows/ and declared none of them for
// the whole of v0.11.0 through v0.13.0, which is exactly the shape this guard exists to prevent.
// Negative-first, and the first two cases reproduce the historical defect in both directions.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  checkWorkflowMirror,
  checkWorkflowEntryShape,
  isWorkflowFile,
  workflowName,
} from '../scripts/lib/workflow-mirror-lib.mjs';

const NINE = [
  'think-audit-reasoning', 'think-expand-options', 'think-first-principles',
  'think-idea-quality-audit', 'think-issue-position-argument-mapping', 'think-kepner-tregoe',
  'think-pdca-a3', 'think-reframe-problem', 'think-stress-test-decision',
];

test('the historical defect: nine on disk, none declared, produces nine findings', () => {
  const problems = checkWorkflowMirror([], NINE);
  assert.equal(problems.length, 9);
  assert.match(problems[0], /on disk but not declared/);
  assert.match(problems[0], /components\.workflows/);
});

test('the other direction: a declared workflow with no file is caught', () => {
  const problems = checkWorkflowMirror([...NINE, 'think-ghost'], NINE);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /declares "think-ghost"/);
  assert.match(problems[0], /not on disk/);
});

test('a matching set is clean', () => {
  assert.deepEqual(checkWorkflowMirror(NINE, NINE), []);
});

test('both directions can fail at once, and each is reported', () => {
  const problems = checkWorkflowMirror(['think-ghost'], ['think-real']);
  assert.equal(problems.length, 2);
  assert.ok(problems.some((p) => /think-ghost/.test(p) && /not on disk/.test(p)));
  assert.ok(problems.some((p) => /think-real/.test(p) && /not declared/.test(p)));
});

test('order does not matter (the mirror is a set comparison)', () => {
  assert.deepEqual(checkWorkflowMirror([...NINE].reverse(), NINE), []);
});

// --- exclusions: these must agree with the toolkit's listWorkflowFiles ------------------------

test('README.md is not a workflow', () => {
  assert.equal(isWorkflowFile('README.md'), false);
});

test('underscore-prefixed control files are not workflows', () => {
  assert.equal(isWorkflowFile('_chain-permitted.md'), false);
  assert.equal(isWorkflowFile('_draft.md'), false);
});

test('non-markdown files are not workflows', () => {
  assert.equal(isWorkflowFile('notes.txt'), false);
  assert.equal(isWorkflowFile('script.mjs'), false);
});

test('an ordinary recipe file is a workflow', () => {
  assert.equal(isWorkflowFile('think-stress-test-decision.md'), true);
});

test('the name is the basename, not frontmatter', () => {
  // ADR 0047 decision point 3: workflows in the wild carry `title`, not `name`, and the basename
  // is what the Standard's path form and a command's maps-to both refer to.
  assert.equal(workflowName('think-pdca-a3.md'), 'think-pdca-a3');
});

// --- entry shape ------------------------------------------------------------------------------

test('a well-formed entry passes', () => {
  const entries = [{ name: 'think-pdca-a3', path: '_workflows/think-pdca-a3.md', version: '0.1.0', tier: 'convergent', status: 'active' }];
  assert.deepEqual(checkWorkflowEntryShape(entries), []);
});

test('a missing name is caught (the toolkit requires a string name)', () => {
  const problems = checkWorkflowEntryShape([{ path: '_workflows/x.md', status: 'active' }]);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /missing a string "name"/);
});

test('a path that does not match the name is caught', () => {
  const problems = checkWorkflowEntryShape([{ name: 'think-a', path: '_workflows/think-b.md', status: 'active' }]);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /must have path "_workflows\/think-a\.md"/);
});

test('a non-active status is caught', () => {
  const problems = checkWorkflowEntryShape([{ name: 'think-a', path: '_workflows/think-a.md', status: 'draft' }]);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /must have status "active"/);
});

test('empty and absent inputs do not throw', () => {
  assert.deepEqual(checkWorkflowEntryShape([]), []);
  assert.deepEqual(checkWorkflowEntryShape(undefined), []);
  assert.deepEqual(checkWorkflowMirror(undefined, undefined), []);
});
