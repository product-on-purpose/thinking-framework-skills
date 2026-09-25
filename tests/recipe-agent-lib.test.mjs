// tests/recipe-agent-lib.test.mjs
// SPEC-09 phase 3 (C3-3). A recipe subagent is only worth shipping if three things hold, and each
// fails silently rather than loudly, so each gets a test:
//   1. it preloads EXACTLY the recipe's chain. Claude Code skips a missing `skills:` entry with a
//      debug-log warning and runs the agent anyway (verified 2026-09-24 with a canary probe), so a
//      preload list that drifts from `steps:` produces a delegate that quietly runs half a chain;
//   2. it keeps the recipe's handoff compression, which is the recipe's authored value; and
//   3. its tools are read-only in the grant itself (the C4-6 pattern), not by prose prohibition.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SUBAGENT_RECIPES, AGENT_TOOLS, renderAgent, compositeArtifact, worldSteps, isGeneratedAgent,
} from '../scripts/lib/recipe-agent-lib.mjs';
import { stepNames, frontmatterBlock } from '../scripts/lib/recipe-command-lib.mjs';
import { isWorkflowFile, workflowName } from '../scripts/lib/workflow-mirror-lib.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PLUGIN = JSON.parse(readFileSync(resolve(ROOT, 'library.json'), 'utf8')).name;

const RECIPE = `---
name: think-demo
description: Do the demo thing, then the other demo thing.
steps:
  - think-alpha
  - think-beta
metadata:
  version: 0.1.0
---
<!-- thinking-framework-skills | Apache-2.0 -->
# Recipe: demo (workflow)

Run the steps in order, carrying forward only the compressed artifact between them:

1. \`think-alpha\` -> carry the **first thing**.
2. \`think-beta\` (on that) -> carry the **second thing**.

Optional adds when stakes justify the tokens: \`think-gamma\` after step 1.

Composite artifact: a demo sheet - the first thing and the second thing. Full prose: \`recipes/demo.md\`.
`;

/** The `skills:` entries of a rendered agent, in order. */
function preloads(agentMd) {
  const { fm } = frontmatterBlock(agentMd);
  const m = fm.match(/^skills:\s*$([\s\S]*?)(?=^\S|$(?![\s\S]))/m);
  return m ? (m[1].match(/^\s*-\s+\S+/gm) || []).map((l) => l.replace(/^\s*-\s+/, '').trim()) : [];
}

test('the agent is named for its recipe', () => {
  assert.match(renderAgent('think-demo', RECIPE, 'demo-plugin'), /^name: think-demo$/m);
});

test('it preloads exactly the chain, in order, namespaced to the plugin', () => {
  assert.deepEqual(preloads(renderAgent('think-demo', RECIPE, 'demo-plugin')), [
    'demo-plugin:think-alpha', 'demo-plugin:think-beta',
  ]);
});

test('an optional add is NOT preloaded (the delegate names it instead of running it)', () => {
  const out = renderAgent('think-demo', RECIPE, 'demo-plugin');
  assert.ok(!preloads(out).some((s) => s.endsWith('think-gamma')));
  assert.match(out, /Run only the preloaded skills/);
});

test('the tool grant is read-only: nothing that writes, executes, fetches or dispatches', () => {
  const out = renderAgent('think-demo', RECIPE, 'demo-plugin');
  assert.match(out, /^tools: Read, Glob, Grep$/m);
  for (const t of ['Write', 'Edit', 'Bash', 'WebSearch', 'WebFetch', 'Skill', 'Agent', 'NotebookEdit']) {
    assert.ok(!AGENT_TOOLS.split(/,\s*/).includes(t), `${t} must not be granted`);
  }
});

test('no field a plugin-shipped agent is refused (hooks, mcpServers, permissionMode)', () => {
  const { fm } = frontmatterBlock(renderAgent('think-demo', RECIPE, 'demo-plugin'));
  assert.doesNotMatch(fm, /^(hooks|mcpServers|permissionMode):/m);
});

test('THE HANDOFF LINES SURVIVE, as in the command', () => {
  const out = renderAgent('think-demo', RECIPE, 'demo-plugin');
  assert.match(out, /1\. `think-alpha` -> carry the \*\*first thing\*\*\./);
  assert.match(out, /2\. `think-beta` \(on that\) -> carry the \*\*second thing\*\*\./);
});

test('the return contract names the composite artifact and forbids the intermediates', () => {
  const out = renderAgent('think-demo', RECIPE, 'demo-plugin');
  assert.match(out, /returns only the finished demo sheet/);
  assert.match(out, /Return a demo sheet, assembled from what each handoff carried forward, and nothing else/);
});

test('the description says when NOT to delegate, and names the inline command as the alternative', () => {
  const desc = renderAgent('think-demo', RECIPE, 'demo-plugin').match(/^description: (.+)$/m)[1];
  assert.match(desc, /^Do the demo thing, then the other demo thing\. /);
  assert.match(desc, /Do NOT use when the user wants to see or steer each step \(run the \/think-demo command inline instead\)/);
});

test('the output is marked generated, so the generator can find an orphan', () => {
  assert.ok(isGeneratedAgent(renderAgent('think-demo', RECIPE, 'demo-plugin')));
  assert.ok(!isGeneratedAgent(readFileSync(resolve(ROOT, 'agents', 'think-research-framework.md'), 'utf8')));
});

test('rendering is deterministic (byte-identical across runs, or --check is meaningless)', () => {
  assert.equal(renderAgent('think-demo', RECIPE, 'p'), renderAgent('think-demo', RECIPE, 'p'));
});

test('compositeArtifact reads the noun phrase and refuses to guess', () => {
  assert.equal(compositeArtifact('Composite artifact: a decision brief - recommended option.'), 'a decision brief');
  assert.equal(compositeArtifact('Composite artifact: an improvement-cycle record - the root cause.'), 'an improvement-cycle record');
  assert.throws(() => compositeArtifact('No artifact line here.'), /Composite artifact/);
});

test('a chain with a real-world gap cannot be wrapped (the pdca-a3 exclusion, enforced)', () => {
  const gapped = RECIPE.replace('2. `think-beta`', '2. *(Do - run the change in the world.)*\n3. `think-beta`');
  assert.equal(worldSteps(frontmatterBlock(gapped).body).length, 1);
  assert.throws(() => renderAgent('think-demo', gapped, 'p'), /real-world gap/);
  const pdca = readFileSync(resolve(ROOT, '_workflows', 'think-pdca-a3.md'), 'utf8');
  assert.throws(() => renderAgent('think-pdca-a3', pdca, PLUGIN), /real-world gap/);
});

test('the plugin name is required, since an unnamespaced preload is a different contract', () => {
  assert.throws(() => renderAgent('think-demo', RECIPE), /plugin name/);
});

// --- against the real repo -------------------------------------------------------------------

test('every allowlisted recipe exists, carries a rationale, and renders', () => {
  const names = readdirSync(resolve(ROOT, '_workflows')).filter(isWorkflowFile).map(workflowName);
  const entries = Object.entries(SUBAGENT_RECIPES);
  assert.ok(entries.length >= 2 && entries.length <= 3, `SPEC-09 phase 3 asks for 2 to 3, saw ${entries.length}`);
  for (const [name, why] of entries) {
    assert.ok(names.includes(name), `${name}: no _workflows/ file`);
    assert.ok(why.length > 40, `${name}: the rationale is the point of the entry; write one`);
    renderAgent(name, readFileSync(resolve(ROOT, '_workflows', `${name}.md`), 'utf8'), PLUGIN);
  }
});

test('each shipped recipe subagent preloads exactly its workflow steps (a hand-edit is caught here too)', () => {
  for (const name of Object.keys(SUBAGENT_RECIPES)) {
    const agent = readFileSync(resolve(ROOT, 'agents', `${name}.md`), 'utf8');
    const wf = readFileSync(resolve(ROOT, '_workflows', `${name}.md`), 'utf8');
    assert.deepEqual(
      preloads(agent),
      stepNames(frontmatterBlock(wf).fm).map((s) => `${PLUGIN}:${s}`),
      `agents/${name}.md preloads a different chain than _workflows/${name}.md declares`,
    );
    for (const s of stepNames(frontmatterBlock(wf).fm)) {
      assert.ok(readdirSync(resolve(ROOT, 'skills')).includes(s), `${name}: preloads ${s}, which is not a shipped skill`);
    }
  }
});

test('every generated agent on disk is allowlisted and declared in library.json', () => {
  const declared = JSON.parse(readFileSync(resolve(ROOT, 'library.json'), 'utf8')).components.subagents.map((s) => s.name);
  for (const f of readdirSync(resolve(ROOT, 'agents')).filter((x) => x.endsWith('.md'))) {
    const name = f.slice(0, -3);
    if (!isGeneratedAgent(readFileSync(resolve(ROOT, 'agents', f), 'utf8'))) continue;
    assert.ok(Object.hasOwn(SUBAGENT_RECIPES, name), `agents/${f} is generated but not allowlisted`);
    assert.ok(declared.includes(name), `agents/${f} is not declared in library.json components.subagents`);
  }
});
