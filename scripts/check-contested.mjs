#!/usr/bin/env node
// check-contested.mjs - the 9th conformance layer (v0.11.0, resolves DS-01). Enforces the
// caveat-first CONTRACT for every contested lens (a framework with caveatFirst: true in
// frameworks/registry.mjs): the deficiency must LEAD the SKILL.md and the artifact, the posture
// (run_caveat_first / warn_redirect) is honored across SKILL.md / TEMPLATE / EXAMPLE / sample /
// eval-cases, branded lenses carry the trademark attribution on every surface, and the marker
// agrees across the registry, the SKILL.md frontmatter, and the skill.meta.yml sidecar.
//
// Wired into scripts/check.mjs. Standalone Node script: exits 0 on pass, 1 on any problem, prints
// findings to stderr. The deterministic core lives in scripts/lib/contested-lib.mjs (pure +
// unit-tested in tests/contested-lib.test.mjs, which negative-tests both postures).

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

const problems = [];

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
  problems.push(...checkContestedEntry(e, files));
}

// Drift the other way: a skill that declares caveat-first in its frontmatter but is NOT a
// contested registry entry (the registry is the single source of truth for the cohort).
for (const dir of readdirSync(resolve(ROOT, 'skills'))) {
  if (!dir.startsWith('think-')) continue;
  const slug = dir.replace(/^think-/, '');
  if (contestedSlugs.has(slug)) continue;
  const md = read(resolve(ROOT, 'skills', dir, 'SKILL.md'));
  if (md && /^\s*caveat-first:\s*true\s*$/m.test(md)) {
    problems.push(`drift: skills/${dir}/SKILL.md declares caveat-first but is not a contested registry entry (add caveatFirst to the registry entry, or remove the frontmatter).`);
  }
}

if (problems.length) {
  console.error(`Contested-lens conformance: ${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`  - ${p}`);
  console.error('\nThe caveat-first contract (scripts/lib/contested-lib.mjs) is not satisfied. See docs/internal/specs/2026-06-19-contested-lenses.md.');
  process.exit(1);
}
console.log(`Contested-lens conformance: OK (${contested.length} contested lens(es): caveat-first contract + posture + branded attribution + cross-marker consistency).`);
process.exit(0);
