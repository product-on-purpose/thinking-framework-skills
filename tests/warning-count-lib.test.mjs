import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  parseEvaluatorTotals, WARNING_SURFACES,
  parseEvaluatorComposition, postStandard08, diffComposition,
  POST_08_SURFACES, ERRORS_AT_013_SURFACES,
} from '../scripts/lib/warning-count-lib.mjs';
import { checkCountSurface } from '../scripts/lib/count-surface-lib.mjs';

// Negative-first. The defect this file exists to prevent: the gate's headline warning count
// is hand-copied onto several pages, so it goes stale silently the moment any commit adds a
// warning. It has now gone stale three times - at v0.11.0, at the troubleshooting page, and
// again when the skill-selection eval added four files with no header docblock.

// --- parseEvaluatorTotals ------------------------------------------------------------

const TAIL = [
  '  [warn] G10: Diataxis directory docs/how-to is missing or has no *.md page.  -> docs/how-to',
  'Tier: advanced',
  '0 error(s), 129 warning(s).',
  'Real issues (objective + vendor-cited errors): 0',
].join('\n');

test('parseEvaluatorTotals: reads the evaluator totals line', () => {
  assert.deepEqual(parseEvaluatorTotals(TAIL), { errors: 0, warnings: 129 });
});

test('parseEvaluatorTotals: returns null when the totals line is absent', () => {
  // The dangerous failure is a SILENT one: if the evaluator changes its output and the
  // parser quietly yields nothing, the assertion would pass forever without checking.
  // Null forces the caller to treat that as a problem.
  assert.equal(parseEvaluatorTotals('Tier: advanced\nsome other output\n'), null);
  assert.equal(parseEvaluatorTotals(''), null);
});

test('parseEvaluatorTotals: is not fooled by a warning line that mentions warnings', () => {
  const noisy = '  [warn] G9: 3 warning(s) about docblocks here  -> scripts/x.mjs\n';
  assert.equal(parseEvaluatorTotals(noisy), null);
});

test('parseEvaluatorTotals: handles CRLF and a non-zero error count', () => {
  assert.deepEqual(parseEvaluatorTotals('Tier: bronze\r\n4 error(s), 7 warning(s).\r\n'), { errors: 4, warnings: 7 });
});

// --- the published surfaces ----------------------------------------------------------

const read = (p) => readFileSync(p, 'utf8');

test('WARNING_SURFACES: every surface matches the live document exactly once', () => {
  // A zero-match is the subtle failure - a reworded sentence silently leaves the gate's
  // coverage, which is exactly how these counts drifted before.
  for (const s of WARNING_SURFACES) {
    const hits = [...read(s.where).matchAll(new RegExp(s.pattern.source, 'g'))];
    assert.equal(hits.length, 1, `${s.label}: expected exactly 1 match in ${s.where}, got ${hits.length}`);
  }
});

test('WARNING_SURFACES: the live documents agree with the committed count', () => {
  const committed = Number(readFileSync('docs/internal/gate-warning-count.txt', 'utf8').trim());
  assert.ok(Number.isInteger(committed), 'the committed count must be an integer');
  for (const s of WARNING_SURFACES) {
    const problems = checkCountSurface({ text: read(s.where), label: s.label, pattern: s.pattern, want: committed, where: s.where });
    assert.deepEqual(problems, [], problems.join('; '));
  }
});

test('WARNING_SURFACES: a stale number in a surface is caught', () => {
  const s = WARNING_SURFACES[0];
  const problems = checkCountSurface({ text: read(s.where), label: s.label, pattern: s.pattern, want: 9999, where: s.where });
  assert.equal(problems.length, 1, 'a wrong count must produce exactly one problem');
});

test('WARNING_SURFACES: the HISTORICAL provenance sentences are deliberately not matched', () => {
  // README and conformance.md both narrate how the count moved (0 -> 7 -> 128 -> 129).
  // Those are dated records and must never be rewritten to the current number; only the
  // present-tense claims are asserted. This guards the pattern against widening.
  const historical = [
    'the run was `0 errors, 0 warnings` through v0.10.0, became `0 errors, 7 warnings` when the contested lenses shipped',
    '`0 errors / 0 warnings` through v0.10.0; `0 errors / 7 warnings` from v0.11.0; `0 errors / 128 warnings` from v0.13.x',
  ].join('\n');
  for (const s of WARNING_SURFACES) {
    assert.equal(new RegExp(s.pattern.source).test(historical), false, `${s.label} must not match historical prose`);
  }
});

// --- the figures published BESIDE the total ------------------------------------------
// Added after the G9 docblock sweep took the count 129 -> 90 and showed that only the TOTAL was
// asserted: the subtotal, the breakdown and the 0.13 counterfactual were live in six more places
// and covered by nothing.

const composition = JSON.parse(readFileSync('docs/internal/gate-composition.json', 'utf8'));

test('parseEvaluatorComposition: tallies warn lines by requirement id', () => {
  const run = [
    '  [warn] G8: meaningful folder has no README.md  -> skills/a/README.md',
    '  [warn] G8: meaningful folder has no README.md  -> skills/b/README.md',
    '  [warn] G7: docs page is missing taxonomy frontmatter  -> docs/x.md',
    '  [warn] U5: description scores below the floor  -> skills/think-swot',
    'Tier: advanced',
    '0 error(s), 4 warning(s).',
  ].join('\n');
  assert.deepEqual(parseEvaluatorComposition(run), { G8: 2, G7: 1, U5: 1 });
});

test('parseEvaluatorComposition: returns {} rather than inventing a tally', () => {
  // The caller must treat {} as suspicious, not as "zero warnings" - a silently empty tally
  // would let the composition assertion pass forever without comparing anything.
  assert.deepEqual(parseEvaluatorComposition('Tier: advanced\n0 error(s), 0 warning(s).\n'), {});
  assert.deepEqual(parseEvaluatorComposition(''), {});
});

test('parseEvaluatorComposition: is not fooled by prose that mentions a requirement id', () => {
  // Only a real `[warn] <REQ>:` line counts. An [error] line or a sentence about G9 must not.
  const noise = [
    '  [error] S7: command maps-to a workflow that does not exist  -> commands/x.md',
    'Note: G9 source docblocks are a post-0.8 requirement.',
    '  [warn] G9 without a colon should not count',
  ].join('\n');
  assert.deepEqual(parseEvaluatorComposition(noise), {});
});

test('postStandard08: counts only the G-prefixed families', () => {
  // U5 is the caveat-first description score, not post-0.8 documentation debt. Folding it in
  // would overstate the debt on every page that quotes the subtotal.
  assert.equal(postStandard08({ G8: 71, G7: 7, G10: 5, U5: 7 }), 83);
  assert.equal(postStandard08({ U5: 7 }), 0);
  assert.equal(postStandard08({}), 0);
  assert.equal(postStandard08(null), 0);
});

test('diffComposition: clean when live matches committed', () => {
  assert.deepEqual(diffComposition({ G8: 71, G7: 7 }, { G8: 71, G7: 7 }), []);
});

test('diffComposition: catches a family that DISAPPEARED - the G9 case', () => {
  // The direction a one-way check would miss, and the one that actually happened: the debt was
  // paid off, the run stopped reporting G9, and six published sentences still said 39.
  const problems = diffComposition({ G8: 71 }, { G8: 71, G9: 39 });
  assert.equal(problems.length, 1);
  assert.match(problems[0], /G9: .*says 39 but the run reports none/);
  assert.match(problems[0], /remove G9 from the breakdown/);
});

test('diffComposition: catches a NEW family the breakdown does not list', () => {
  const problems = diffComposition({ G8: 71, U13: 4 }, { G8: 71 });
  assert.equal(problems.length, 1);
  assert.match(problems[0], /U13: the run reports 4 warning\(s\) but .* does not list U13 at all/);
});

test('diffComposition: catches a changed count', () => {
  const problems = diffComposition({ G8: 70 }, { G8: 71 });
  assert.equal(problems.length, 1);
  assert.match(problems[0], /G8: the run reports 70 warning\(s\) but .* says 71/);
});

test('gate-composition.json: the breakdown sums to the committed warning total', () => {
  // The two canonical files must agree. check.mjs proves both against a live run; this proves
  // they cannot be committed in a state that disagrees with each other.
  const committed = Number(readFileSync('docs/internal/gate-warning-count.txt', 'utf8').trim());
  const sum = Object.values(composition.byRequirement).reduce((n, v) => n + v, 0);
  assert.equal(sum, committed, `byRequirement sums to ${sum} but gate-warning-count.txt says ${committed}`);
});

test('POST_08_SURFACES / ERRORS_AT_013_SURFACES: each matches its document exactly once', () => {
  for (const s of [...POST_08_SURFACES, ...ERRORS_AT_013_SURFACES]) {
    const hits = [...read(s.where).matchAll(new RegExp(s.pattern.source, 'g'))];
    assert.equal(hits.length, 1, `${s.label}: expected exactly 1 match in ${s.where}, got ${hits.length}`);
  }
});

test('POST_08_SURFACES: the live documents agree with the derived subtotal', () => {
  const want = postStandard08(composition.byRequirement);
  for (const s of POST_08_SURFACES) {
    const problems = checkCountSurface({ text: read(s.where), label: s.label, pattern: s.pattern, want, where: s.where });
    assert.deepEqual(problems, [], problems.join('; '));
  }
});

test('ERRORS_AT_013_SURFACES: the live documents agree with the recorded measurement', () => {
  for (const s of ERRORS_AT_013_SURFACES) {
    const problems = checkCountSurface({ text: read(s.where), label: s.label, pattern: s.pattern, want: composition.errorsAtStandard013, where: s.where });
    assert.deepEqual(problems, [], problems.join('; '));
  }
});

test('the new surfaces do not match the HISTORICAL provenance prose either', () => {
  // Same guard as for WARNING_SURFACES, extended to the new patterns: the provenance sentences
  // now narrate 0 -> 7 -> 128 -> 129 -> 90 and must keep every one of those numbers.
  const historical = [
    'became `0 errors, 129 warnings` when the troubleshooting page shipped without taxonomy frontmatter, and became `0 errors, 90 warnings` when the `G9` docblock sweep paid off all 39 source-docblock warnings.',
    '`0 errors / 128 warnings` from v0.13.x when the toolkit pin moved forward; `0 errors / 129 warnings` once `docs/troubleshooting.md` shipped',
    'took the run 129 -> 133, making the figure published in `README.md` wrong',
  ].join('\n');
  for (const s of [...POST_08_SURFACES, ...ERRORS_AT_013_SURFACES]) {
    assert.equal(new RegExp(s.pattern.source).test(historical), false, `${s.label} must not match historical prose`);
  }
});
