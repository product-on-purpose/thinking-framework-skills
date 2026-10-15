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
    calls.push(opts);
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
