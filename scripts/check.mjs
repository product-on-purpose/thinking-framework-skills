#!/usr/bin/env node
// Conformance gate (Standard G2: self-hosting CI). This is the single command a
// contributor or CI runs to validate the plugin against the agent-skills-toolkit
// Standard: `node scripts/check.mjs` (or `npm run check`).
//
// It runs fourteen layers:
//   1. the toolkit's portable STRUCTURAL validators (the toolkit is the source of truth;
//      vendoring them here would drift),
//   2. the repo-local static eval-case validator (scripts/eval-cases.mjs, SP1): every
//      skills/*/eval/cases.md must be well-formed and name-safe,
//   3. the registry conformance check (scripts/check-registry.mjs, SP3): frameworks/
//      registry.mjs validates against its schema, its generated views are not stale,
//      its referential / IP / eval-coupling invariants hold, and (SPEC-01) every skill on
//      disk describes its own lifecycle truthfully - shipped implies identity.status active,
//      and both eval stamps at measured-* implies maturity: measured,
//   4. the shared applicator engine-copy drift check (scripts/gen-engine.mjs --check, SP7/SP8):
//      the byte-identical engine.md copy stays in sync, and
//   5. the AGENTS.md table drift check (scripts/gen-agents.mjs --check): the generated
//      Skills + Recipes tables in the contributor guide stay in sync with the catalog, and
//   6. the README count-consistency check (scripts/check-counts.mjs): the four hand-authored
//      count surfaces in README.md (the badges, the lifecycle map, the catalog table headers,
//      and the project-status table) plus the repo-facing docs (docs/getting-started.md,
//      docs/README.md) match the registry / _workflows / tools, and every
//      shipped skill's metadata.family is a valid skill-family slug, and
//   7. the example-coverage ratchet (scripts/check-example-coverage.mjs): every shipped skill
//      has a worked example (a Showcase appearance or a sample) or is grandfathered in
//      scripts/example-coverage-baseline.txt, so a new skill cannot ship without an example.
//   8. the catalog + llms.txt drift check (scripts/gen-catalog.mjs --check): the generated
//      site/public/{catalog.json,evaluated.json,llms.txt} stay in sync with the registry,
//      the skills, and the recipes, so the machine-readable catalog cannot silently go stale, and
//   9. the contested-lens caveat-first contract check (scripts/check-contested.mjs, v0.11.0):
//      every contested lens (caveatFirst in the registry) leads with its evidence caveat across
//      SKILL.md / TEMPLATE / EXAMPLE / sample / eval-cases per its posture, branded lenses carry
//      the trademark attribution on every surface, and the marker agrees across the registry, the
//      SKILL.md frontmatter, and the skill.meta.yml sidecar.
//  10. the mermaid structural-validity check (scripts/check-mermaid.mjs): every mermaid block
//      in repo docs and committed site content is syntactically valid so a broken diagram cannot
//      silently ship.
//  11. the canonical-link check (scripts/check-canonical-links.mjs): every internal link in
//      the repo docs resolves without redirect hops, so stale paths surface immediately.
//  12. the repo-markdown relative-link check (scripts/check-repo-links.mjs): every relative
//      link in repo-facing markdown resolves to a file or anchor that actually exists.
//  13. the changelog version-consistency check (scripts/check-changelog.mjs): CHANGELOG.md
//      and RELEASE-NOTES.md agree on the most recent version, preventing a version bump that
//      updates one file but forgets the other.
//  14. the eval-results pairing + shape check (scripts/check-eval-results.mjs): every
//      behavioral-eval scorecard under docs/internal/eval-results/ is committed as a paired
//      .md + .json, and each trigger/output scorecard JSON carries its totals contract, so a
//      dropped sidecar (e.g. the 2026-06-19 contested-output gap) cannot recur.
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

console.log('\nRunning example-coverage ratchet (scripts/check-example-coverage.mjs)\n');
const coverage = spawnSync('node', [resolve(ROOT, 'scripts', 'check-example-coverage.mjs')], { stdio: 'inherit' });

console.log('\nRunning catalog + llms.txt drift check (scripts/gen-catalog.mjs --check)\n');
const catalog = spawnSync('node', [resolve(ROOT, 'scripts', 'gen-catalog.mjs'), '--check'], { stdio: 'inherit' });

console.log('\nRunning contested-lens caveat-first contract check (scripts/check-contested.mjs)\n');
const contested = spawnSync('node', [resolve(ROOT, 'scripts', 'check-contested.mjs'), ROOT], { stdio: 'inherit' });

console.log('\nRunning mermaid structural-validity check (scripts/check-mermaid.mjs)\n');
const mermaid = spawnSync('node', [resolve(ROOT, 'scripts', 'check-mermaid.mjs'), 'README.md', 'AGENTS.md', 'docs', 'site/src/content/docs'], { cwd: ROOT, stdio: 'inherit' });

console.log('\nRunning canonical-link (no redirect-hop) check (scripts/check-canonical-links.mjs)\n');
const canonical = spawnSync('node', [resolve(ROOT, 'scripts', 'check-canonical-links.mjs')], { stdio: 'inherit' });

console.log('\nRunning repo-markdown relative-link check (scripts/check-repo-links.mjs)\n');
const repoLinks = spawnSync('node', [resolve(ROOT, 'scripts', 'check-repo-links.mjs')], { stdio: 'inherit' });

console.log('\nRunning changelog version-consistency check (scripts/check-changelog.mjs)\n');
const changelog = spawnSync('node', [resolve(ROOT, 'scripts', 'check-changelog.mjs')], { stdio: 'inherit' });

console.log('\nRunning eval-results pairing + shape check (scripts/check-eval-results.mjs)\n');
const evalResults = spawnSync('node', [resolve(ROOT, 'scripts', 'check-eval-results.mjs'), ROOT], { stdio: 'inherit' });

// Fail if any layer failed; all run so contributors see all problems at once.
process.exit((structural.status ?? 1) || (evalCases.status ?? 1) || (registry.status ?? 1) || (engine.status ?? 1) || (agents.status ?? 1) || (counts.status ?? 1) || (coverage.status ?? 1) || (catalog.status ?? 1) || (contested.status ?? 1) || (mermaid.status ?? 1) || (canonical.status ?? 1) || (repoLinks.status ?? 1) || (changelog.status ?? 1) || (evalResults.status ?? 1));
