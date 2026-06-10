#!/usr/bin/env node
// Conformance gate (Standard G2: self-hosting CI). This is the single command a
// contributor or CI runs to validate the plugin against the agent-skills-toolkit
// Standard: `node scripts/check.mjs` (or `npm run check`).
//
// It runs six layers:
//   1. the toolkit's portable STRUCTURAL validators (the toolkit is the source of truth;
//      vendoring them here would drift),
//   2. the repo-local static eval-case validator (scripts/eval-cases.mjs, SP1): every
//      skills/*/eval/cases.md must be well-formed and name-safe,
//   3. the registry conformance check (scripts/check-registry.mjs, SP3): frameworks/
//      registry.mjs validates against its schema, its generated views are not stale, and
//      its referential / IP / eval-coupling invariants hold,
//   4. the shared applicator engine-copy drift check (scripts/gen-engine.mjs --check, SP7/SP8):
//      the byte-identical engine.md copy stays in sync, and
//   5. the AGENTS.md table drift check (scripts/gen-agents.mjs --check): the generated
//      Skills + Recipes tables in the contributor guide stay in sync with the catalog, and
//   6. the README count-consistency check (scripts/check-counts.mjs): the four hand-authored
//      count surfaces in README.md (the badges, the lifecycle map, the catalog table headers,
//      and the project-status table) match the registry / _workflows / tools, and every
//      shipped skill's metadata.family is a valid skill-family slug.
//
// To reproduce a CI failure locally, clone the public toolkit next to this repo:
//   git clone https://github.com/product-on-purpose/agent-skills-toolkit.git ../agent-skills-toolkit
//   node scripts/check.mjs
//
// CI clones it to ./.agent-skills-toolkit and sets AGENT_SKILLS_TOOLKIT (see
// .github/workflows/ci.yml), so the same command runs unchanged. Toolkit resolution is
// worktree-portable: when run from a linked worktree (cwd under .claude/worktrees/), it also
// probes the MAIN repo root, so a toolkit next to the main checkout is still found.

import { spawnSync, execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = 'https://github.com/product-on-purpose/agent-skills-toolkit';
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..'); // this checkout's root (main or worktree), cwd-independent

// Resolve the MAIN repo root too, so running from a linked worktree still finds a toolkit
// checked out next to (or inside) the main checkout rather than under .claude/worktrees/.
let mainRoot = ROOT;
try {
  const commonDir = execSync('git rev-parse --git-common-dir', { cwd: ROOT, encoding: 'utf8' }).trim();
  if (commonDir) mainRoot = resolve(ROOT, commonDir, '..'); // commonDir is <main>/.git -> parent is <main>
} catch {
  /* not a git checkout, or git unavailable: fall back to ROOT */
}

const candidates = [
  process.env.AGENT_SKILLS_TOOLKIT,
  resolve(ROOT, '.agent-skills-toolkit'),
  resolve(ROOT, '..', 'agent-skills-toolkit'),
  resolve(mainRoot, '.agent-skills-toolkit'),
  resolve(mainRoot, '..', 'agent-skills-toolkit'),
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
const structural = spawnSync('node', [evaluator, '.'], { cwd: ROOT, stdio: 'inherit' });

console.log('\nRunning static eval-case validator (scripts/eval-cases.mjs)\n');
const evalCases = spawnSync('node', [resolve(ROOT, 'scripts', 'eval-cases.mjs'), ROOT], { stdio: 'inherit' });

console.log('\nRunning registry conformance check (scripts/check-registry.mjs)\n');
const registry = spawnSync('node', [resolve(ROOT, 'scripts', 'check-registry.mjs'), ROOT], { stdio: 'inherit' });

console.log('\nRunning engine-copy drift check (scripts/gen-engine.mjs --check)\n');
const engine = spawnSync('node', [resolve(ROOT, 'scripts', 'gen-engine.mjs'), '--check'], { stdio: 'inherit' });

console.log('\nRunning AGENTS.md table drift check (scripts/gen-agents.mjs --check)\n');
const agents = spawnSync('node', [resolve(ROOT, 'scripts', 'gen-agents.mjs'), '--check'], { stdio: 'inherit' });

console.log('\nRunning README count-consistency check (scripts/check-counts.mjs)\n');
const counts = spawnSync('node', [resolve(ROOT, 'scripts', 'check-counts.mjs')], { stdio: 'inherit' });

// Fail if any layer failed; all run so contributors see all problems at once.
process.exit((structural.status ?? 1) || (evalCases.status ?? 1) || (registry.status ?? 1) || (engine.status ?? 1) || (agents.status ?? 1) || (counts.status ?? 1));
