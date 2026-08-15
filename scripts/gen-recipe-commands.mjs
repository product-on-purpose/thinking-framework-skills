#!/usr/bin/env node
// =============================================================================
// gen-recipe-commands.mjs - generate one invokable slash command per recipe.
//
// what-it-is:   the CLI that turns each _workflows/<name>.md into commands/<name>.md.
// what-it-does: with no flag, writes the commands; with --check, regenerates in memory and
//               byte-compares, exiting 1 on drift so a hand-edit reds CI.
// why:          SPEC-09 phase 1b. Declaring a workflow (phase 1a) satisfies the Standard's
//               components mirror and delivers NOTHING to a user, because no runtime scans
//               _workflows/ (agent-skills-toolkit ADR 0047 says so explicitly). Commands are what
//               the runtimes actually expose, so a command per recipe is what makes the nine
//               chains runnable. Generating rather than authoring keeps nine files from drifting
//               against the recipes they describe.
// used-by:      scripts/check.mjs (--check mode); npm run gen:recipe-commands
//
// The rendering rules live in scripts/lib/recipe-command-lib.mjs so they can be unit-tested
// without importing this file, which reads and writes at module scope.
// =============================================================================

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isWorkflowFile, workflowName } from './lib/workflow-mirror-lib.mjs';
import { renderCommand } from './lib/recipe-command-lib.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const CHECK = process.argv.includes('--check');

const recipes = readdirSync(resolve(ROOT, '_workflows'))
  .filter((f) => isWorkflowFile(f))
  .map((f) => workflowName(f))
  .sort();

let drift = 0;
let wrote = 0;
for (const name of recipes) {
  const src = readFileSync(resolve(ROOT, '_workflows', `${name}.md`), 'utf8');
  const want = renderCommand(name, src);
  const dest = resolve(ROOT, 'commands', `${name}.md`);
  let have = null;
  try { have = readFileSync(dest, 'utf8'); } catch { /* absent */ }
  if (have === want) continue;
  if (CHECK) {
    console.error(`gen-recipe-commands: commands/${name}.md is ${have === null ? 'missing' : 'stale'}.`);
    drift += 1;
  } else {
    writeFileSync(dest, want, 'utf8');
    wrote += 1;
  }
}

if (CHECK) {
  if (drift) {
    console.error(`\n${drift} recipe command(s) out of sync - run \`npm run gen:recipe-commands\`.`);
    process.exit(1);
  }
  console.log(`gen-recipe-commands: OK (${recipes.length} recipe command(s) in sync).`);
  process.exit(0);
}
console.log(`gen-recipe-commands: wrote ${wrote} of ${recipes.length} recipe command(s).`);
process.exit(0);
