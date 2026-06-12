#!/usr/bin/env node
// check-counts.mjs - verify the README's hand-authored count surfaces against the
// machine-readable sources, so catalog-count drift fails the gate instead of slipping
// through to a human/Codex catch three steps later. The README is the last hand-authored
// denormalization of data that lives in the registry (shipped count + per-family), in
// _workflows/ (recipes), and in the META_SKILLS set (tools). This script is the authority
// for those counts; the four surfaces it checks are the badges, the mermaid lifecycle map,
// the catalog table headers, and the project-status table.
//
// FAMILY TAXONOMY NOTE (registry follow-up #3): the per-family counts use each skill's
// `metadata.family` (the coarse "skill" taxonomy the site lifecycle + README catalog group
// by), which differs BY DESIGN from the registry's 13-family catalog taxonomy (and uses a
// different slug set - e.g. there is no `reasoning-clarity` registry family). The two are
// intentionally independent: the catalog taxonomy drives the framework-catalog.md / why-not
// index, the skill taxonomy drives the user-facing lifecycle. Several skills are placed in
// different families by each (a deliberate divergence, not a bug); unifying them reshuffles
// user-facing groupings and is a deferred design call, so this check does NOT force a pair
// match. It does enforce that every shipped skill's metadata.family is one of the canonical
// 12 skill-family slugs below (a typo guard).
//
// Usage: node scripts/check-counts.mjs        (exit 1 on any mismatch)

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const reg = (await import('file://' + join(ROOT, 'frameworks', 'registry.mjs').replace(/\\/g, '/'))).default;

// The four meta-skills (tools): skill dirs with no registry entry (the advisor + the engine + 2 applicators).
const TOOLS = ['think-framework-advisor', 'think-research-framework', 'think-top3', 'think-random-frameworks'];

// The canonical skill-family taxonomy in lifecycle order: `slug` = the skill metadata.family
// (and the gen-site family-page slug); `display` = the README/site display label.
const FAMILIES = [
  { slug: 'problem-framing', display: 'Problem Framing' },
  { slug: 'divergent-ideation', display: 'Divergent Ideation' },
  { slug: 'perspective-and-multi-lens', display: 'Perspective & Multi-Lens' },
  { slug: 'systems-and-consequences', display: 'Systems & Consequences' },
  { slug: 'assumption-and-belief-challenge', display: 'Assumption & Belief Challenge' },
  { slug: 'reasoning-clarity', display: 'Reasoning Clarity' },
  { slug: 'decision-and-option-evaluation', display: 'Decision & Option Evaluation' },
  { slug: 'strategy-and-opportunity', display: 'Strategy & Opportunity' },
  { slug: 'ethics-values-deliberation', display: 'Ethics & Values Deliberation' },
  { slug: 'risk-and-resilience', display: 'Risk & Resilience' },
  { slug: 'synthesis', display: 'Synthesis' },
  { slug: 'meta-thinking-and-reflection', display: 'Meta-Thinking & Reflection' },
];

// Tolerant SKILL.md frontmatter family reader (no YAML dep, the repo convention).
function skillFamily(slug) {
  const p = join(ROOT, 'skills', slug, 'SKILL.md');
  if (!existsSync(p)) return null;
  const fm = readFileSync(p, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return null;
  const m = fm[1].match(/\n\s*family:\s*["']?([a-z0-9-]+)["']?/);
  return m ? m[1] : null;
}

const problems = [];

// ---- canonical counts -------------------------------------------------------
const shippedEntries = reg.frameworks.filter((f) => f.status === 'shipped');
const shippedTotal = shippedEntries.length;
const recipeCount = readdirSync(join(ROOT, '_workflows')).filter((f) => f.endsWith('.md')).length;
const toolCount = TOOLS.length;

const perFamily = Object.fromEntries(FAMILIES.map((f) => [f.slug, 0]));
for (const e of shippedEntries) {
  const fam = skillFamily('think-' + e.slug);
  if (!fam) { problems.push(`shipped skill think-${e.slug}: no metadata.family in SKILL.md`); continue; }
  if (!(fam in perFamily)) { problems.push(`shipped skill think-${e.slug}: metadata.family "${fam}" is not one of the 12 canonical skill-family slugs`); continue; }
  perFamily[fam]++;
}

// ---- README surfaces --------------------------------------------------------
const readme = readFileSync(join(ROOT, 'README.md'), 'utf8');
function expect(label, re, want, opts = {}) {
  const matches = [...readme.matchAll(re)];
  if (!matches.length) { if (!opts.optional) problems.push(`${label}: expected a match for ${re} in README.md, found none`); return; }
  for (const mm of matches) {
    const got = Number(mm[opts.group ?? 1]);
    if (got !== want) problems.push(`${label}: README shows ${got}, canonical is ${want} (at "${mm[0].slice(0, 60).replace(/\n/g, ' ')}")`);
  }
}

// badges
expect('frameworks badge', /badge\/frameworks-(\d+)-/g, shippedTotal);
expect('recipes badge', /badge\/recipes-(\d+)-/g, recipeCount);
expect('tools badge', /badge\/tools-(\d+)-/g, toolCount);
// project-status at-a-glance table
expect('status Frameworks row', /\|\s*\*\*Frameworks\*\*\s*\|\s*(\d+),/g, shippedTotal);
expect('status Recipes row', /\|\s*\*\*Recipes\*\*\s*\|\s*(\d+)\s/g, recipeCount);
// catalog intro
expect('catalog "All N frameworks, by family"', /All (\d+) frameworks, by family/g, shippedTotal);

// per-family surfaces: catalog headers `### <Display> - <blurb> (N)` and lifecycle map `N. <Display> (N)`
for (const f of FAMILIES) {
  const disp = f.display.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  expect(`catalog header "${f.display}"`, new RegExp(`### ${disp} - [^\\n(]*\\((\\d+)\\)`, 'g'), perFamily[f.slug]);
  expect(`lifecycle map "${f.display}"`, new RegExp(`\\d+\\. ${disp} \\((\\d+)\\)`, 'g'), perFamily[f.slug]);
}

// ---- report -----------------------------------------------------------------
if (problems.length) {
  console.error(`check-counts: ${problems.length} problem(s):\n`);
  for (const p of problems) console.error('  - ' + p);
  console.error(`\nCanonical: ${shippedTotal} shipped frameworks, ${recipeCount} recipes, ${toolCount} tools. Per-family: ${FAMILIES.map((f) => f.display + '=' + perFamily[f.slug]).join(', ')}.`);
  console.error('Fix the hand-authored counts in README.md (or the source), then re-run.');
  process.exit(1);
}
console.log(`check-counts: OK (${shippedTotal} shipped / ${recipeCount} recipes / ${toolCount} tools; all four README count surfaces + skill-family validity consistent).`);
process.exit(0);
