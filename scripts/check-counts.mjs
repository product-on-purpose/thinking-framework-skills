#!/usr/bin/env node
// check-counts.mjs - verify the hand-authored count surfaces (README.md plus the
// repo-facing docs/getting-started.md and docs/README.md) against the
// machine-readable sources, so catalog-count drift fails the gate instead of slipping
// through to a human/Codex catch three steps later. The README is the last hand-authored
// denormalization of data that lives in the registry (shipped count + per-family), in
// _workflows/ (recipes), and in the META_SKILLS set (tools). This script is the authority
// for those counts; the four surfaces it checks are the badges, the mermaid lifecycle map,
// the catalog table headers, and the project-status table.
//
// FAMILY TAXONOMY NOTE (registry follow-up #3, RESOLVED - keep separate, mapping documented in
// docs/architecture.md "Two family taxonomies"): the per-family counts use each skill's
// `metadata.family` (the coarse "skill" taxonomy the site lifecycle + README catalog group
// by), which differs BY DESIGN from the registry's 13-family catalog taxonomy (and uses a
// different slug set - e.g. there is no `reasoning-clarity` registry family). The two are
// intentionally independent and crisscross (the catalog merges synthesis + reasoning-clarity;
// the skill taxonomy splits them): the catalog taxonomy drives framework-catalog.md / why-not,
// the skill taxonomy drives the user-facing lifecycle. Unifying them reshuffles user-facing
// groupings for no correctness gain, so this check does NOT force a pair match. It DOES enforce
// that every shipped skill's metadata.family is one of the canonical 12 skill-family slugs below
// (a typo guard). The dominant catalog-to-skill mapping table lives in docs/architecture.md.
//
// Usage: node scripts/check-counts.mjs        (exit 1 on any mismatch)

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkCountSurface } from './lib/count-surface-lib.mjs';
import { isWorkflowFile } from './lib/workflow-mirror-lib.mjs';

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
// Count recipes through the SHARED predicate, not a bare .md filter. The Standard excludes a
// folder README.md and _-prefixed control files from _workflows/ (toolkit ADR 0047), and the
// workflow mirror in check-registry.mjs already honours that. A bare .md count disagreed with it
// the moment a folder README appeared - which Standard G8 (folder-readme) actively wants - and
// would then demand a recipes badge one higher than the number of recipes that exist.
const recipeCount = readdirSync(join(ROOT, '_workflows')).filter((f) => isWorkflowFile(f)).length;
const toolCount = TOOLS.length;
const totalMethods = reg.frameworks.length; // every registry entry (shipped + documented-not-shipped + recipe)

const perFamily = Object.fromEntries(FAMILIES.map((f) => [f.slug, 0]));
for (const e of shippedEntries) {
  const fam = skillFamily('think-' + e.slug);
  if (!fam) { problems.push(`shipped skill think-${e.slug}: no metadata.family in SKILL.md`); continue; }
  if (!(fam in perFamily)) { problems.push(`shipped skill think-${e.slug}: metadata.family "${fam}" is not one of the 12 canonical skill-family slugs`); continue; }
  perFamily[fam]++;
}

// ---- README surfaces --------------------------------------------------------
const readme = readFileSync(join(ROOT, 'README.md'), 'utf8');
// Matching lives in scripts/lib/count-surface-lib.mjs so both failure modes are unit-tested: a
// wrong number, and the subtler MISSING match that silently drops a surface from coverage when
// someone rewords the prose the pattern was written against.
function expect(label, re, want, opts = {}) {
  problems.push(...checkCountSurface({
    text: readme, label, pattern: re, want, where: 'README.md', group: opts.group, optional: opts.optional,
  }));
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
// prose one-liners that previously drifted: the catalog count in the tools section and the registry total
expect('catalog one-liner "(the N in the catalog above)"', /thinking method \(the (\d+) in the catalog above\)/g, shippedTotal);
expect('registry total "N evaluated methods"', /catalog of (\d+) evaluated methods/g, totalMethods);

// per-family surfaces: catalog headers `### <Display> - <blurb> (N)` and lifecycle map `N. <Display> (N)`
for (const f of FAMILIES) {
  const disp = f.display.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  expect(`catalog header "${f.display}"`, new RegExp(`### ${disp} - [^\\n(]*\\((\\d+)\\)`, 'g'), perFamily[f.slug]);
  expect(`lifecycle map "${f.display}"`, new RegExp(`\\d+\\. ${disp} \\((\\d+)\\)`, 'g'), perFamily[f.slug]);
}

// ---- repo-facing docs outside the site generator ----------------------------
// docs/getting-started.md and docs/README.md are hand-authored repo docs (not site
// pages emitted by gen-site.mjs), so their catalog counts were ungated and drifted
// silently: getting-started lingered at "31 thinking frameworks" (the v0.1.0 count)
// and docs/README at "47 graded frameworks across 11 families ... 8 composable recipes".
// Gate their live counts here so that drift class is a red build, not a reader's surprise.
const EXTRA_DOC_CHECKS = [
  ['docs/getting-started.md', [
    [/\*\*(\d+) thinking frameworks/g, shippedTotal, 'frameworks'],
  ]],
  ['docs/README.md', [
    [/(\d+) graded frameworks across/g, shippedTotal, 'frameworks'],
    [/graded frameworks across (\d+) families/g, FAMILIES.length, 'families'],
    [/(\d+) tools \(meta-skills\)/g, toolCount, 'tools'],
    [/(\d+) composable recipes/g, recipeCount, 'recipes'],
  ]],
];
for (const [rel, checks] of EXTRA_DOC_CHECKS) {
  const text = readFileSync(join(ROOT, ...rel.split('/')), 'utf8');
  for (const [re, want, what] of checks) {
    const matches = [...text.matchAll(re)];
    if (!matches.length) { problems.push(`${rel}: expected a ${what} count matching ${re}, found none (keep the count phrase gate-visible if you reword)`); continue; }
    for (const mm of matches) {
      const got = Number(mm[1]);
      if (got !== want) problems.push(`${rel}: ${what} shows ${got}, canonical is ${want}`);
    }
  }
}

// ---- report -----------------------------------------------------------------
if (problems.length) {
  console.error(`check-counts: ${problems.length} problem(s):\n`);
  for (const p of problems) console.error('  - ' + p);
  console.error(`\nCanonical: ${shippedTotal} shipped frameworks, ${recipeCount} recipes, ${toolCount} tools. Per-family: ${FAMILIES.map((f) => f.display + '=' + perFamily[f.slug]).join(', ')}.`);
  console.error('Fix the hand-authored counts in README.md (or the source), then re-run.');
  process.exit(1);
}
console.log(`check-counts: OK (${shippedTotal} shipped / ${recipeCount} recipes / ${toolCount} tools; the four README count surfaces + repo-facing docs (getting-started, docs/README) + skill-family validity consistent).`);
process.exit(0);
