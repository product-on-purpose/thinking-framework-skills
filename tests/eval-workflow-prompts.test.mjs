import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// A Workflow script cannot import - the tool executes it standalone - so scripts/eval/eval.workflow.mjs
// (the combined runner, eval-harness Task 8) carries VERBATIM COPIES of the router, producer and
// judge prompts from the two single-half runners, plus their schemas.
//
// A duplicated prompt is not a style problem here: THE PROMPT IS THE INSTRUMENT. PR #126 tightened
// the judge to verify claims about other skills rather than trust them, and that one change moved
// the published output figure from 428/429 to 424/429 - it found a defect that had shipped for
// three months. A copy that missed that edit would go on measuring against the laxer judge and
// emit a scorecard indistinguishable from a correct one.
//
// So the copies are asserted rather than trusted. If this test fails: copy the ORIGIN's version
// into eval.workflow.mjs verbatim. Do not reconcile the two by hand - the whole point is that they
// cannot differ by a word.

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => readFileSync(join(ROOT, 'scripts', 'eval', f), 'utf8');

const COMBINED = read('eval.workflow.mjs');
const ROUTE = read('route.workflow.mjs');
const OUTPUT = read('output.workflow.mjs');

// Extract a top-level `function NAME(...) {...}` or `const NAME = {...}` block: from its opening
// line to the first line that is exactly a closing brace at column 0.
function block(source, opener) {
  const lines = source.split('\n');
  const start = lines.findIndex((l) => l.startsWith(opener));
  assert.notEqual(start, -1, `could not find a block opening with: ${opener}`);
  for (let i = start + 1; i < lines.length; i++) {
    if (lines[i] === '}') return lines.slice(start, i + 1).join('\n');
  }
  assert.fail(`no closing brace at column 0 for: ${opener}`);
}

const SHARED = [
  ['routePrompt', 'function routePrompt(', () => ROUTE, 'route.workflow.mjs'],
  ['ROUTE_SCHEMA', 'const ROUTE_SCHEMA = {', () => ROUTE, 'route.workflow.mjs'],
  ['producePrompt', 'function producePrompt(', () => OUTPUT, 'output.workflow.mjs'],
  ['judgePrompt', 'function judgePrompt(', () => OUTPUT, 'output.workflow.mjs'],
  ['PRODUCE_SCHEMA', 'const PRODUCE_SCHEMA = {', () => OUTPUT, 'output.workflow.mjs'],
  ['JUDGE_SCHEMA', 'const JUDGE_SCHEMA = {', () => OUTPUT, 'output.workflow.mjs'],
];

for (const [name, opener, origin, originName] of SHARED) {
  test(`eval.workflow.mjs ${name} is byte-identical to ${originName}`, () => {
    assert.equal(
      block(COMBINED, opener),
      block(origin(), opener),
      `${name} has drifted from ${originName}. Copy the origin's version verbatim into ` +
      `scripts/eval/eval.workflow.mjs - a prompt is the instrument, and two runners that word it ` +
      `differently are two different measurements wearing the same scorecard.`,
    );
  });
}

test('the extractor actually discriminates - a changed word fails', () => {
  // Guards the guard. A comparison that always passes is worse than no comparison, because it
  // reads as coverage. Mutate one word of the origin and the assertion must fail.
  const mutated = ROUTE.replace('the SINGLE framework', 'the BEST framework');
  assert.notEqual(mutated, ROUTE, 'the mutation did not apply - the anchor text has moved');
  assert.notEqual(
    block(COMBINED, 'function routePrompt('),
    block(mutated, 'function routePrompt('),
    'the extractor is not sensitive to prompt wording',
  );
});

test('the combined runner declares every phase it uses, and only those', () => {
  // The Workflow tool matches meta.phases titles to phase() calls by exact string.
  const declared = [...COMBINED.matchAll(/\{ title: '([^']+)'/g)].map((m) => m[1]);
  const used = [...COMBINED.matchAll(/\bphase\('([^']+)'\)/g)].map((m) => m[1]);
  const inAgents = [...COMBINED.matchAll(/phase: '([^']+)'/g)].map((m) => m[1]);
  assert.deepEqual(declared, ['Route', 'Produce', 'Judge']);
  for (const p of [...used, ...inAgents]) {
    assert.ok(declared.includes(p), `phase "${p}" is used but not declared in meta.phases`);
  }
});
