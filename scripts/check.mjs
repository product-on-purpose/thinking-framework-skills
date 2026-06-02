#!/usr/bin/env node
// Conformance gate (Standard G2: self-hosting CI). This is the single command a
// contributor or CI runs to validate the plugin against the agent-skills-toolkit
// Standard: `node scripts/check.mjs` (or `npm run check`).
//
// The validators are the toolkit's portable scripts (the toolkit is the source of
// truth for the checks; vendoring them here would drift). This wrapper LOCATES a
// toolkit checkout and invokes its evaluator against this repo. To reproduce a CI
// failure locally, clone the public toolkit next to this repo and run the command:
//
//   git clone https://github.com/product-on-purpose/agent-skills-toolkit.git ../agent-skills-toolkit
//   node scripts/check.mjs
//
// CI clones it to ./.agent-skills-toolkit and sets AGENT_SKILLS_TOOLKIT (see
// .github/workflows/ci.yml), so the same command runs unchanged.

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const REPO = 'https://github.com/product-on-purpose/agent-skills-toolkit';
const candidates = [
  process.env.AGENT_SKILLS_TOOLKIT,
  resolve(process.cwd(), '.agent-skills-toolkit'),
  resolve(process.cwd(), '..', 'agent-skills-toolkit'),
].filter(Boolean);

const toolkit = candidates.find((p) => p && existsSync(resolve(p, 'scripts', 'evaluate.mjs')));
if (!toolkit) {
  console.error(
    'Conformance gate: agent-skills-toolkit (the validators) not found.\n' +
    'Clone it next to this repo, or set AGENT_SKILLS_TOOLKIT:\n' +
    `  git clone ${REPO}.git ../agent-skills-toolkit\n` +
    'Looked in:\n  ' + candidates.join('\n  '),
  );
  process.exit(2);
}

const evaluator = resolve(toolkit, 'scripts', 'evaluate.mjs');
console.log(`Running conformance gate via ${evaluator}\n`);
const r = spawnSync('node', [evaluator, '.'], { stdio: 'inherit' });
process.exit(r.status ?? 1);
