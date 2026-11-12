// tests/coverage-probe.test.mjs
// Decision 4 of docs/internal/experiments/2026-11-06-clean-router-run.md. The probe's two first-pass
// errors on 2026-11-06 are the first two tests: an anti-trigger line's opening is its prompt, which the
// blind file also carries, and a prompt can reach a router without its id.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  textOf, opening, has, antiTail, catalogProbes, toolKey, readTranscript, assignedIds, unseenPrompts, coverage, summarize,
} from '../scripts/eval/coverage-probe.mjs';

const CATALOG = {
  skills: [
    {
      name: 'think-premortem',
      description: 'Imagine the project has already failed, then work backwards to the causes.',
      anti_triggers: ['"Why did last quarter\'s launch slip?" (retrospective cause, not prospective risk; route to think-after-action-review)'],
    },
    {
      name: 'think-woop',
      description: 'Turn a wish into a plan by naming the obstacle and an if-then response.',
      anti_triggers: [],
    },
  ],
};
const probes = catalogProbes(CATALOG);

const rec = (type, content, extra = {}) => JSON.stringify({ type, message: { role: type, content, ...extra }, timestamp: '2026-11-06T10:00:00Z' });
const toolResult = (text) => rec('user', [{ type: 'tool_result', tool_use_id: 't1', content: text }]);
const transcript = (...lines) => lines.join('\n');

test('an anti-trigger opening alone does not credit the line; only its tail does', () => {
  // The opening is the case prompt, which the blind file carries too.
  const blindOnly = readTranscript(transcript(toolResult('[{"id":"c1","prompt":"Why did last quarter\'s launch slip?"}]')));
  assert.equal(coverage(blindOnly.seen, probes).antiTriggers.seen, 0);
  const catalogRead = readTranscript(transcript(toolResult('(retrospective cause, not prospective risk; route to think-after-action-review)')));
  assert.equal(coverage(catalogRead.seen, probes).antiTriggers.seen, 1);
});

test('a prompt counts only when its id and its opening both reached the agent', () => {
  const promptById = new Map([['c1', 'Before we launch the new pricing page, what could go wrong?']]);
  const promptOnly = readTranscript(transcript(toolResult('Before we launch the new pricing page, what could go wrong?')));
  assert.deepEqual(unseenPrompts(promptOnly.seen, ['c1'], promptById), ['c1']);
  const idOnly = readTranscript(transcript(toolResult('{"id":"c1"}')));
  assert.deepEqual(unseenPrompts(idOnly.seen, ['c1'], promptById), ['c1']);
  const both = readTranscript(transcript(toolResult('{"id":"c1","prompt":"Before we launch the new pricing page, what could go wrong?"}')));
  assert.deepEqual(unseenPrompts(both.seen, ['c1'], promptById), []);
});

test('text the agent wrote itself, such as a Grep pattern, is not seen', () => {
  const t = readTranscript(transcript(
    rec('assistant', [{ type: 'tool_use', id: 't1', name: 'Grep', input: { pattern: 'Imagine the project has already failed' } }], { model: 'claude-opus-5-5' }),
    toolResult('No matches found'),
  ));
  assert.equal(coverage(t.seen, probes).descriptions.seen, 0);
});

test('records other than user and assistant are ignored, so a replayed request does not count', () => {
  const blob = JSON.stringify({ type: 'api-request-blob', message: { content: [{ type: 'tool_result', content: 'Imagine the project has already failed, then work backwards' }] } });
  const t = readTranscript(blob);
  assert.equal(coverage(t.seen, probes).descriptions.seen, 0);
  // A file holding only such records, like a runner's log, reports zero records and is not a transcript.
  assert.equal(t.records, 0);
  assert.equal(readTranscript(toolResult('x')).records, 1);
});

test('a description matches in its JSON-escaped form as well as raw', () => {
  // A tab is not a stop character, and JSON writes it as a backslash pair, so only the escaped probe finds it.
  const tab ={ skills: [{ name: 'think-y', description: 'Line one\tthen a tab, which JSON escapes as a backslash-t pair.' }] };
  const q = catalogProbes(tab);
  assert.ok(has(JSON.stringify(tab), q.desc[0].probe));
  assert.ok(has(tab.skills[0].description, q.desc[0].probe));
  assert.ok(!JSON.stringify(tab).includes(q.desc[0].probe));
});

test('a probe too short to be unique is dropped and reported, not counted as seen or missing', () => {
  assert.equal(opening('Ask "what would have to be true"', 40), null);
  const p = catalogProbes({ skills: [{ name: 'think-x', description: 'Ask "what"' }, { name: 'think-y', description: 'A description long enough to probe.' }] });
  const c = coverage('A description long enough to probe.', p);
  assert.deepEqual({ seen: c.descriptions.seen, probed: c.descriptions.probed, of: c.descriptions.of }, { seen: 1, probed: 1, of: 2 });
});

test('names, descriptions and tails are counted per agent, with the missing names listed', () => {
  const c = coverage('think-premortem think-woop Imagine the project has already failed, then', probes);
  assert.deepEqual(c.names, { seen: 2, probed: 2, of: 2 });
  assert.equal(c.descriptions.seen, 1);
  assert.deepEqual(c.descriptions.missing, ['think-woop']);
  assert.equal(c.prompts, null);
});

test('tool calls are classified the way the records report them', () => {
  assert.equal(toolKey({ name: 'Read', input: { file_path: 'x' } }), 'Read');
  assert.equal(toolKey({ name: 'Read', input: { file_path: 'x', offset: 500 } }), 'Read(page)');
  assert.equal(toolKey({ name: 'Read', input: { file_path: 'x', allow_large: true } }), 'Read(large)');
  assert.equal(toolKey({ name: 'Grep', input: {} }), 'Grep');
  assert.equal(toolKey({ name: 'Bash', input: {} }), 'Bash');
  const t = readTranscript(transcript(rec('assistant', [
    { type: 'tool_use', name: 'Read', input: { allow_large: true } },
    { type: 'tool_use', name: 'StructuredOutput', input: {} },
  ], { model: 'claude-sonnet-5-5' })));
  assert.deepEqual(t.tools, { 'Read(large)': 1 });
  assert.deepEqual(t.models, ['claude-sonnet-5-5']);
});

test('assigned ids are found in a later user message, in both prompt forms', () => {
  const t = readTranscript(transcript(
    rec('user', 'The harness relays the user request: Run it'),
    rec('user', [{ type: 'text', text: 'Process ONLY the situations whose id is one of c7, c38, c69.' }]),
  ));
  assert.deepEqual(assignedIds(t.userText), ['c7', 'c38', 'c69']);
  assert.deepEqual(assignedIds('Process ONLY the situations whose id is c3 through c5.'), ['c3', 'c4', 'c5']);
  assert.equal(assignedIds('Route these situations.'), null);
});

test('tool_result content given as parts is joined', () => {
  assert.equal(textOf([{ type: 'text', text: 'a' }, { type: 'text', text: 'b' }]), 'a\nb');
  assert.equal(textOf(undefined), '');
  assert.equal(antiTail('no quoted prompt here'), null);
});

test('the summary counts agents that saw everything, and gives the lowest and median share', () => {
  const row = (d) => ({ coverage: { names: { seen: 2, probed: 2 }, descriptions: { seen: d, probed: 4 }, antiTriggers: { seen: 0, probed: 0 }, prompts: null } });
  const s = summarize([row(4), row(2), row(1)]);
  assert.deepEqual(s.descriptions, { agents: 3, all: 1, min: 0.25, median: 0.5 });
  assert.equal(s.names.all, 3);
  assert.equal(s.antiTriggers, undefined);
  assert.equal(s.prompts, undefined);
});
