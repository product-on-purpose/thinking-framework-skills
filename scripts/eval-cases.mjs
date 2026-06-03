#!/usr/bin/env node
// eval-cases.mjs - static validator for skills/*/eval/cases.md (SP1, the free eval layer).
//
// The behavioral eval cases were authored long before any runner ("No runner yet... wire in
// later"). This is the deterministic layer that makes them a first-class ENFORCED artifact: every
// skill's cases.md must be well-formed (the four authored sections with minimum bullets, no
// placeholder text), and every framework named inside a cases.md must actually exist - mechanizing
// the advisor's "never invent a framework name." The model-judged behavioral layer (does a skill
// actually trigger; does an output satisfy the checks) is separate and agent-executed; see
// docs/internal/release-plans/plan_v0.3.0/spec-sp1-advisor-credibility.md.
//
// Wired into scripts/check.mjs so it runs inside the required conformance gate on every PR.
//
// Usage:  node scripts/eval-cases.mjs [rootDir]   (default: repo root; --check accepted as an alias)
// Exit:   0 = all cases well-formed and name-safe; 1 = one or more problems; 2 = bad invocation.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { validateCasesDoc, findUnknownThinkNames } from './lib/cases-lib.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = resolve(HERE, '..');
const argRoot = process.argv.slice(2).find((a) => !a.startsWith('--'));
const ROOT = resolve(argRoot || DEFAULT_ROOT);

const skillsDir = join(ROOT, 'skills');
if (!existsSync(skillsDir)) {
  console.error(`eval-cases: no skills/ directory at ${ROOT}`);
  process.exit(2);
}

// Enumerate skills (a directory under skills/ that carries a SKILL.md).
const skillNames = readdirSync(skillsDir).filter(
  (n) => statSync(join(skillsDir, n)).isDirectory() && existsSync(join(skillsDir, n, 'SKILL.md')),
);

// Name-safety universe: skill names + recipe workflow names.
const known = new Set(skillNames);
const wfDir = join(ROOT, '_workflows');
if (existsSync(wfDir)) {
  for (const f of readdirSync(wfDir).filter((f) => f.endsWith('.md'))) {
    const m = readFileSync(join(wfDir, f), 'utf8').match(/^name:\s*(.+)$/m);
    if (m) known.add(m[1].trim().replace(/^["']|["']$/g, ''));
    known.add(f.replace(/\.md$/, ''));
  }
}

const problems = [];
for (const name of skillNames.sort()) {
  const casesPath = join(skillsDir, name, 'eval', 'cases.md');
  if (!existsSync(casesPath)) {
    problems.push(`${name}: missing eval/cases.md`);
    continue;
  }
  const text = readFileSync(casesPath, 'utf8');
  for (const p of validateCasesDoc(text)) problems.push(`${name}: ${p}`);
  for (const u of findUnknownThinkNames(text, known)) {
    problems.push(`${name}: cases.md references unknown framework "${u}"`);
  }
}

if (problems.length) {
  console.error(`eval-cases: ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`eval-cases: ${skillNames.length} skill(s) - all cases well-formed and name-safe.`);
process.exit(0);
