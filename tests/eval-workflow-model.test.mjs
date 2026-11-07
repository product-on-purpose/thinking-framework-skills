// tests/eval-workflow-model.test.mjs
// Roadmap C2-1. A published number that does not say which model produced it can be re-measured
// but never reproduced, and every eval run before this change inherited whatever model the session
// was on. The workflows now require args.model and hand it to every agent() call.
//
// A Workflow script cannot run in CI (it needs the Workflow tool and a live model), but it can be
// executed against a stubbed runtime that records each agent() call's options. That proves the one
// property this change exists for, with no spend: no eval agent inherits the session's model.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

// The Workflow tool runs a script as an async function body with these globals in scope.
function load(file) {
  const body = readFileSync(join(ROOT, 'scripts', 'eval', file), 'utf8').replace(/^export const meta/m, 'const meta');
  return new AsyncFunction('args', 'agent', 'parallel', 'pipeline', 'phase', 'log', body);
}

function runtime() {
  const calls = [];
  const agent = async (prompt, opts = {}) => {
    calls.push({ ...opts, prompt });
    const label = opts.label || '';
    if (label.startsWith('route:') || label.startsWith('select:')) return { routes: [] };
    if (label.startsWith('read:')) return { agentBody: 'body', brief: 'brief', checks: ['a check'] };
    if (label.startsWith('produce:')) return { artifact: 'artifact', dossier: 'dossier', verdict: 'FOLD', sources: [] };
    if (label.startsWith('judge:')) return { perCheck: [], passed: 0, total: 0 };
    return {};
  };
  const parallel = (fns) => Promise.all(fns.map((f) => f()));
  const pipeline = async (items, ...stages) => {
    const out = [];
    for (const item of items) {
      let value = await stages[0](item);
      for (const stage of stages.slice(1)) value = await stage(value, item);
      out.push(value);
    }
    return out;
  };
  return { calls, agent, parallel, pipeline, phase: () => {}, log: () => {} };
}

const WORKFLOWS = {
  'route.workflow.mjs': { blindPath: 'blind.json', count: 3 },
  'output.workflow.mjs': { casesPath: 'out-cases.json', skills: ['premortem'] },
  'eval.workflow.mjs': { blindPath: 'blind.json', count: 3, casesPath: 'out-cases.json', skills: ['premortem'] },
  'skill-selection.workflow.mjs': { blindPath: 'blind.json', rosterPath: 'roster.json', count: 3 },
  'dispatch-output.workflow.mjs': { casesPath: 'out-cases.json' },
};
// The one deliberate exception: the dispatch eval's first agent only copies two files verbatim.
const FIXED = { 'read:shipped-prompt': 'haiku' };

for (const [file, baseArgs] of Object.entries(WORKFLOWS)) {
  test(`${file} refuses to start without a model, and with a misspelled one`, async () => {
    for (const model of [undefined, 'opsu']) {
      const rt = runtime();
      await assert.rejects(
        load(file)({ ...baseArgs, model }, rt.agent, rt.parallel, rt.pipeline, rt.phase, rt.log),
        /requires args\.model/,
      );
      assert.equal(rt.calls.length, 0, 'no agent ran on an inherited model');
    }
  });

  test(`${file} hands the run's model to every agent and returns it as modelTier`, async () => {
    const rt = runtime();
    const result = await load(file)({ ...baseArgs, model: 'sonnet' }, rt.agent, rt.parallel, rt.pipeline, rt.phase, rt.log);
    assert.ok(rt.calls.length > 0, 'the stub saw at least one agent call');
    for (const opts of rt.calls) {
      assert.equal(opts.model, FIXED[opts.label] || 'sonnet', `${opts.label} ran on ${opts.model}`);
    }
    assert.equal(result.modelTier, 'sonnet');
  });
}

// The three workflows that route. eval.workflow.mjs also runs producers and judges, and those keep
// the default subagent because they need its full tools.
const ROUTING = {
  'route.workflow.mjs': 'route:',
  'skill-selection.workflow.mjs': 'select:',
  'eval.workflow.mjs': 'route:',
};

async function runWorkflow(file, extra = {}) {
  const rt = runtime();
  const result = await load(file)({ ...WORKFLOWS[file], model: 'sonnet', ...extra }, rt.agent, rt.parallel, rt.pipeline, rt.phase, rt.log);
  assert.ok(rt.calls.length > 0, 'the stub saw at least one agent call');
  return { calls: rt.calls, result };
}

for (const [file, prefix] of Object.entries(ROUTING)) {
  const routers = (calls) => calls.filter((c) => c.label.startsWith(prefix));

  // Roadmap C2-4. The default Workflow subagent receives AGENTS.md and the memory index, so a router
  // that must run without them needs another agent type. The default path has to stay unchanged.
  test(`${file} passes agentType to every router only when it is given`, async () => {
    const plain = await runWorkflow(file);
    for (const opts of plain.calls) assert.equal('agentType' in opts, false, `${opts.label} carried an agentType`);
    assert.equal('agentType' in plain.result, false);

    const typed = await runWorkflow(file, { agentType: 'Explore' });
    assert.ok(routers(typed.calls).length > 0);
    for (const opts of typed.calls) {
      const want = opts.label.startsWith(prefix) ? 'Explore' : undefined;
      assert.equal(opts.agentType, want, `${opts.label} ran as ${opts.agentType}`);
    }
    assert.equal(typed.result.agentType, 'Explore');
  });

  test(`${file} keeps its contiguous ranges and prompt wording unless interleave is given`, async () => {
    const { calls, result } = await runWorkflow(file, { count: 5, batchSize: 2 });
    assert.deepEqual(routers(calls).map((c) => c.label), [`${prefix}c1-c2`, `${prefix}c3-c4`, `${prefix}c5-c5`]);
    assert.match(routers(calls)[0].prompt, /whose id is c1 through c2 inclusive\. For each/);
    assert.match(routers(calls)[0].prompt, /covering every id in c1\.\.c2\.$/);
    assert.equal('interleave' in result, false);
  });

  // 2026-11-06: a default Read returns 25,000 tokens, so most routers saw part of the catalog.
  // The prompt now asks for whole reads, and wholeRead: false restores the older instrument.
  test(`${file} tells routers to read both files whole, and records it, unless wholeRead is false`, async () => {
    const whole = await runWorkflow(file);
    for (const c of routers(whole.calls)) {
      assert.match(c.prompt, /Read these two files whole, using the Read tool\./);
      assert.match(c.prompt, /pass `allow_large: true`/);
      assert.match(c.prompt, /keep reading with `offset` until you reach the end/);
      assert.match(c.prompt, /Do not use a search such as Grep, Glob or a shell command in place of reading a file\./);
    }
    assert.equal(whole.result.reading, 'whole-file');

    const old = await runWorkflow(file, { wholeRead: false });
    for (const c of routers(old.calls)) {
      assert.match(c.prompt, /\n\nRead these two files \(use the Read tool\):\n- /);
      assert.doesNotMatch(c.prompt, /allow_large/);
    }
    assert.equal('reading' in old.result, false);
  });

  test(`${file} interleave covers every id exactly once and never batches neighbours`, async () => {
    const count = 794;
    const batchSize = 25;
    const { calls, result } = await runWorkflow(file, { count, batchSize, interleave: true });
    const batches = routers(calls).map((c) => {
      const m = c.prompt.match(/whose id is one of ([c0-9, ]+)\. For each/);
      assert.ok(m, `${c.label} does not list its ids`);
      assert.match(c.prompt, /covering every id listed above\.$/);
      return m[1].split(', ').map((id) => Number(id.slice(1)));
    });
    assert.equal(result.interleave, true);
    assert.equal(batches.length, Math.ceil(count / batchSize));
    assert.deepEqual(batches.flat().sort((a, b) => a - b), Array.from({ length: count }, (_, i) => i + 1));
    for (const ids of batches) {
      assert.ok(ids.length <= batchSize, `a batch holds ${ids.length}`);
      for (let i = 1; i < ids.length; i++) assert.ok(ids[i] - ids[i - 1] > 1, 'two neighbouring prompts shared a router');
    }
  });
}
