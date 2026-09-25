#!/usr/bin/env node
// =============================================================================
// gen-recipe-commands.mjs - generate every runnable surface of a recipe from its _workflows/ source.
//
// what-it-is:   the CLI that turns each _workflows/<name>.md into commands/<name>.md, and each
//               allowlisted one into agents/<name>.md as well.
// what-it-does: with no flag, writes the commands and subagents; with --check, regenerates in
//               memory and byte-compares, exiting 1 on drift so a hand-edit reds CI.
// why:          SPEC-09 phase 1b. Declaring a workflow (phase 1a) satisfies the Standard's
//               components mirror and delivers NOTHING to a user, because no runtime scans
//               _workflows/ (agent-skills-toolkit ADR 0047 says so explicitly). Commands are what
//               the runtimes actually expose, so a command per recipe is what makes the nine
//               chains runnable. Generating rather than authoring keeps nine files from drifting
//               against the recipes they describe.
//               SPEC-09 phase 3 (C3-3) adds the subagents here rather than in a second generator:
//               they come from the same source, and "run npm run gen:recipe-commands if you
//               touched _workflows/" stays the one thing a contributor has to remember.
// used-by:      scripts/check.mjs (--check mode); npm run gen:recipe-commands
//
// The rendering rules live in scripts/lib/recipe-command-lib.mjs and scripts/lib/recipe-agent-lib.mjs
// so they can be unit-tested without importing this file, which reads and writes at module scope.
// =============================================================================

import { readdirSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isWorkflowFile, workflowName } from './lib/workflow-mirror-lib.mjs';
import { renderCommand } from './lib/recipe-command-lib.mjs';
import { SUBAGENT_RECIPES, renderAgent, isGeneratedAgent } from './lib/recipe-agent-lib.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const CHECK = process.argv.includes('--check');
const PLUGIN = JSON.parse(readFileSync(resolve(ROOT, 'library.json'), 'utf8')).name;

const recipes = readdirSync(resolve(ROOT, '_workflows'))
  .filter((f) => isWorkflowFile(f))
  .map((f) => workflowName(f))
  .sort();

// An allowlisted name with no recipe behind it would silently generate nothing. Fail loudly instead.
const unknown = Object.keys(SUBAGENT_RECIPES).filter((n) => !recipes.includes(n));
if (unknown.length) {
  console.error(`gen-recipe-commands: SUBAGENT_RECIPES names ${unknown.join(', ')}, which has no _workflows/ file.`);
  process.exit(1);
}

let drift = 0;
let wrote = 0;

function sync(rel, want) {
  const dest = resolve(ROOT, rel);
  let have = null;
  try { have = readFileSync(dest, 'utf8'); } catch { /* absent */ }
  if (have === want) return;
  if (CHECK) {
    console.error(`gen-recipe-commands: ${rel} is ${have === null ? 'missing' : 'stale'}.`);
    drift += 1;
  } else {
    writeFileSync(dest, want, 'utf8');
    wrote += 1;
  }
}

for (const name of recipes) {
  const src = readFileSync(resolve(ROOT, '_workflows', `${name}.md`), 'utf8');
  sync(`commands/${name}.md`, renderCommand(name, src));
  if (Object.hasOwn(SUBAGENT_RECIPES, name)) sync(`agents/${name}.md`, renderAgent(name, src, PLUGIN));
}

// A generated subagent whose recipe left the allowlist is an orphan: it still ships, still loads, and
// no longer has a source. The marker says this generator owns it, so --check reds and a write removes it.
for (const f of readdirSync(resolve(ROOT, 'agents')).filter((x) => x.endsWith('.md'))) {
  const name = f.slice(0, -3);
  if (Object.hasOwn(SUBAGENT_RECIPES, name)) continue;
  if (!isGeneratedAgent(readFileSync(resolve(ROOT, 'agents', f), 'utf8'))) continue;
  if (CHECK) {
    console.error(`gen-recipe-commands: agents/${f} is generated but ${name} is not in SUBAGENT_RECIPES (orphan).`);
    drift += 1;
  } else {
    unlinkSync(resolve(ROOT, 'agents', f));
    console.log(`gen-recipe-commands: removed orphaned agents/${f}.`);
    wrote += 1;
  }
}

const agentCount = Object.keys(SUBAGENT_RECIPES).length;
if (CHECK) {
  if (drift) {
    console.error(`\n${drift} recipe surface(s) out of sync - run \`npm run gen:recipe-commands\`.`);
    process.exit(1);
  }
  console.log(`gen-recipe-commands: OK (${recipes.length} recipe command(s) and ${agentCount} recipe subagent(s) in sync).`);
  process.exit(0);
}
console.log(`gen-recipe-commands: wrote ${wrote} file(s) across ${recipes.length} recipe command(s) and ${agentCount} recipe subagent(s).`);
process.exit(0);
