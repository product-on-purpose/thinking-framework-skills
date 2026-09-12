#!/usr/bin/env node
// =============================================================================
// check-contested.mjs - the caveat-first conformance layer for contested lenses (v0.11.0).
//
// what-it-is:   a standalone conformance check script (check.mjs layer 10, resolves DS-01).
// what-it-does: for every contested lens (a framework with caveatFirst: true in
//               frameworks/registry.mjs), enforces the caveat-first CONTRACT: the deficiency
//               must LEAD the SKILL.md and the artifact, the posture (run_caveat_first /
//               warn_redirect) is honored across SKILL.md / TEMPLATE / EXAMPLE / sample /
//               eval-cases, branded lenses carry the trademark attribution on every surface,
//               and the caveat-first marker agrees across the registry, the SKILL.md
//               frontmatter, and the skill.meta.yml sidecar. Also flags the reverse drift: a
//               skill that declares caveat-first in its frontmatter without a matching entry.
// why:          a famous-but-weak framework that ships without its deficiency leading every
//               surface would mislead a reader into treating a controlled-evidence method as
//               sound; this makes a late caveat, a missing posture, or a dropped attribution a
//               red gate instead of a silent quality regression.
// used-by:      scripts/check.mjs (layer 10, spawned with ROOT as argv[2])
// =============================================================================
// Standalone Node script: exits 0 on pass, 1 on any problem, prints findings to stderr. The
// deterministic core lives in scripts/lib/contested-lib.mjs (pure + unit-tested in
// tests/contested-lib.test.mjs, which negative-tests both postures).

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import registry from '../frameworks/registry.mjs';
import { checkContestedEntry } from './lib/contested-lib.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = process.argv[2] ? resolve(process.argv[2]) : resolve(HERE, '..');
const read = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : null);

const fw = registry.frameworks ?? [];
const contested = fw.filter((e) => e.caveatFirst === true);
const contestedSlugs = new Set(contested.map((e) => e.slug));
// The set of invocations a warn_redirect may legitimately route to: shipped AND not a contested
// lens AND (per call) not the self-slug. A redirect to a nonexistent or contested target is cosmetic.
const validAlternatives = new Set(
  fw.filter((e) => e.status === 'shipped' && e.caveatFirst !== true).map((e) => `think-${e.slug}`),
);

const problems = [];
// Advisory findings: surfaced to the operator, never gate-failing. Currently the RT-1
// contrastive-rehabilitation heuristic, which is deliberately soft because the honest phrasing
// ("the value here is the discipline this skill adds") sits close to the dishonest one.
const warnings = [];

for (const e of contested) {
  const dir = resolve(ROOT, 'skills', `think-${e.slug}`);
  const files = {
    skillMd: read(resolve(dir, 'SKILL.md')),
    template: read(resolve(dir, 'references', 'TEMPLATE.md')),
    example: read(resolve(dir, 'references', 'EXAMPLE.md')),
    cases: read(resolve(dir, 'eval', 'cases.md')),
    sidecar: read(resolve(dir, 'skill.meta.yml')),
    sample: read(resolve(ROOT, 'site', 'src', 'content', 'docs', 'samples', `${e.slug}.md`)),
  };
  // Each lens may legitimately reference itself; exclude only the self-slug from its alternatives.
  const alternatives = new Set([...validAlternatives].filter((t) => t !== `think-${e.slug}`));
  problems.push(...checkContestedEntry(e, files, { validAlternatives: alternatives, warnings }));
}

// Drift the other way: a skill that declares caveat-first in its frontmatter but is NOT a
// contested registry entry (the registry is the single source of truth for the cohort).
for (const dir of readdirSync(resolve(ROOT, 'skills'))) {
  if (!dir.startsWith('think-')) continue;
  const slug = dir.replace(/^think-/, '');
  if (contestedSlugs.has(slug)) continue;
  const md = read(resolve(ROOT, 'skills', dir, 'SKILL.md'));
  if (md && /^\s*caveat-first:\s*true\s*(#.*)?$/m.test(md)) {
    problems.push(`drift: skills/${dir}/SKILL.md declares caveat-first but is not a contested registry entry (add caveatFirst to the registry entry, or remove the frontmatter).`);
  }
}

// Advisory findings print whether or not the gate passes, and never change the exit code. They
// exist to give the mandated adversarial evidence-honesty pass a concrete place to look.
if (warnings.length) {
  console.warn(`Contested-lens advisory: ${warnings.length} finding(s) for human review (not gate-failing):\n`);
  for (const w of warnings) console.warn(`  ! ${w}`);
  console.warn('');
}

if (problems.length) {
  console.error(`Contested-lens conformance: ${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`  - ${p}`);
  console.error('\nThe caveat-first contract (scripts/lib/contested-lib.mjs) is not satisfied. See docs/internal/specs/2026-06-19-contested-lenses.md.');
  process.exit(1);
}
console.log(`Contested-lens conformance: OK (${contested.length} contested lens(es): caveat-first contract + posture + branded attribution + cross-marker consistency)${warnings.length ? `, ${warnings.length} advisory finding(s) above` : ''}.`);
process.exit(0);
