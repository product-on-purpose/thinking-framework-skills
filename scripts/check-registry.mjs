#!/usr/bin/env node
// =============================================================================
// check-registry.mjs - the strong CI around frameworks/registry.mjs (SP3 C3).
//
// Runs in the required `check` gate (invoked from scripts/check.mjs after the
// toolkit evaluator + the SP1 eval-case validator). Collects ALL problems and
// prints them, exits 1 if any. Checks, in order:
//   1. Schema    - every entry validates against frameworks/registry.schema.json
//                  (required fields, enums, no unknown keys, branded conditionals).
//   2. Drift     - delegates to gen-registry.mjs --check (catalog + why-not byte-match).
//   3. Referential - shipped <-> skills/think-<slug>/ (both ways, advisor exempt);
//                  recipe -> _workflows/think-<slug>.md; foldInto -> a shipped slug;
//                  family in the families list; dossierPath (!= pending) resolves;
//                  source URLs well-formed.
//   4. Completeness - no orphan frameworks/<slug>/dossier.md without an entry.
//   5. IP lint   - branded -> non-empty attribution + trademark (SP9 enforcement).
//   6. Eval coupling - every shipped entry's evalCases file exists, is a well-formed
//                  cases doc (SP1 validateCasesDoc), and names no unknown think-* skills.
//   7. Tier consistency - each shipped entry's governing tier is one of the grades in its
//                  SKILL.md evidence-tier, so the catalog grade cannot silently diverge from
//                  the grade the skill (and the advisor + site) publish.
//   8. Recommendable - the shipped registry slugs match the advisor's recommendable set.
//
// Zero-dependency; reuses scripts/lib/cases-lib.mjs (the SP1 source) for eval coupling.
// =============================================================================

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import registry from '../frameworks/registry.mjs';
import { validateCasesDoc, findUnknownThinkNames } from './lib/cases-lib.mjs';
import { validateEntry } from './lib/registry-entry-lib.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..'); // cwd-independent; the script and registry share a checkout
const ADVISOR_DIR = 'think-framework-advisor'; // the meta-router skill: a skill dir but not a framework entry
// Meta-skills are skill dirs that are NOT framework methods, so they carry no registry entry and
// are exempt from the "every think-* skill dir has a shipped entry" referential check. The advisor
// (the router) and think-research-framework (the SP5 research engine) are both meta-skills.
const META_SKILLS = new Set([ADVISOR_DIR, 'think-research-framework', 'think-top3', 'think-random-perspectives']);

const problems = [];
const fail = (msg) => problems.push(msg);

const schema = JSON.parse(readFileSync(resolve(ROOT, 'frameworks', 'registry.schema.json'), 'utf8'));
const fw = registry.frameworks ?? [];

// --- 1. Schema validation ---------------------------------------------------
// Per-entry schema conformance is delegated to the shared, zero-dep
// scripts/lib/registry-entry-lib.mjs (the same logic the SP5 proposed-entry validator uses,
// so there is exactly one copy of the rules). Cross-entry slug uniqueness stays here.

if (registry.version !== schema.properties.version.const) {
  fail(`schema: top-level version must be ${schema.properties.version.const} (got ${registry.version}).`);
}
if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(registry.seededDate ?? '')) {
  fail(`schema: top-level seededDate must be an ISO date (got ${JSON.stringify(registry.seededDate)}).`);
}
// families: array shape, item shape ({slug kebab, name}), and slug uniqueness
const familyList = registry.families ?? [];
if (!Array.isArray(familyList) || familyList.length < (schema.properties.families.minItems ?? 0)) {
  fail(`schema: families must be an array of at least ${schema.properties.families.minItems} entries.`);
}
const familySlugs = new Set();
for (const f of familyList) {
  if (typeof f !== 'object' || f === null) { fail('schema: a families entry is not an object.'); continue; }
  for (const k of Object.keys(f)) if (k !== 'slug' && k !== 'name') fail(`schema: families entry has unknown field "${k}".`);
  if (typeof f.slug !== 'string' || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(f.slug)) fail(`schema: families entry slug ${JSON.stringify(f.slug)} is missing or not kebab-case.`);
  if (typeof f.name !== 'string' || !f.name) fail(`schema: families entry ${JSON.stringify(f.slug)} is missing a name.`);
  if (typeof f.slug === 'string') {
    if (familySlugs.has(f.slug)) fail(`schema: duplicate family slug "${f.slug}".`);
    familySlugs.add(f.slug);
  }
}

if (!Array.isArray(fw) || fw.length < 1) fail('schema: frameworks must be a non-empty array.');

const seenSlugs = new Set();
for (const e of fw) {
  for (const p of validateEntry(e, schema)) fail(p);
  // cross-entry: slug uniqueness (not in the single-entry lib)
  if (e.slug) {
    if (seenSlugs.has(e.slug)) fail(`schema: duplicate slug "${e.slug}".`);
    seenSlugs.add(e.slug);
  }
}

// --- 2. Drift guard ---------------------------------------------------------
const drift = spawnSync('node', [resolve(ROOT, 'scripts', 'gen-registry.mjs'), '--check'], { encoding: 'utf8' });
if (drift.status !== 0) {
  fail('drift: generated views are stale - run `node scripts/gen-registry.mjs`.' + (drift.stderr ? `\n  ${drift.stderr.trim()}` : ''));
}

// --- 3. Referential integrity ----------------------------------------------
const shipped = new Set(fw.filter((e) => e.status === 'shipped').map((e) => e.slug));

for (const e of fw) {
  if (e.family && !familySlugs.has(e.family)) fail(`ref: ${e.slug} family "${e.family}" is not in the families list.`);
  if (e.status === 'shipped' && !existsSync(resolve(ROOT, 'skills', `think-${e.slug}`))) {
    fail(`ref: shipped ${e.slug} has no skills/think-${e.slug}/ directory.`);
  }
  // recipe -> workflow doc (forward only: not every _workflows/*.md is a catalog
  // framework row, so there is deliberately no reverse "orphan workflow" check).
  if (e.status === 'recipe' && !existsSync(resolve(ROOT, '_workflows', `think-${e.slug}.md`))) {
    fail(`ref: recipe ${e.slug} has no _workflows/think-${e.slug}.md.`);
  }
  if (e.status === 'shipped' && e.evalCases && e.evalCases !== `skills/think-${e.slug}/eval/cases.md`) {
    fail(`ref: shipped ${e.slug} evalCases "${e.evalCases}" does not match skills/think-${e.slug}/eval/cases.md.`);
  }
  if (e.foldInto && !shipped.has(e.foldInto)) {
    fail(`ref: ${e.slug} foldInto "${e.foldInto}" does not resolve to a shipped entry.`);
  }
  if (e.dossierPath && e.dossierPath !== 'pending' && !existsSync(resolve(ROOT, e.dossierPath))) {
    fail(`ref: ${e.slug} dossierPath "${e.dossierPath}" does not resolve to a file.`);
  }
  for (const s of e.sources ?? []) {
    if (typeof s !== 'object' || s === null) { fail(`ref: ${e.slug} has a non-object source.`); continue; }
    for (const k of Object.keys(s)) if (!['title', 'url', 'kind'].includes(k)) fail(`ref: ${e.slug} source has unknown field "${k}".`);
    if (typeof s.title !== 'string' || !s.title) fail(`ref: ${e.slug} source is missing a title.`);
    if (!/^https?:\/\/\S+$/.test(s.url || '')) fail(`ref: ${e.slug} has a malformed source url ${JSON.stringify(s.url)}.`);
  }
}

// no skill dir without a shipped entry (advisor exempt)
for (const dir of readdirSync(resolve(ROOT, 'skills'))) {
  if (!dir.startsWith('think-') || META_SKILLS.has(dir)) continue;
  const slug = dir.replace(/^think-/, '');
  if (!shipped.has(slug)) fail(`ref: skills/${dir}/ has no matching shipped registry entry (slug "${slug}").`);
}

// --- 4. Completeness: no orphan dossier without an entry --------------------
const frameworksDir = resolve(ROOT, 'frameworks');
for (const name of readdirSync(frameworksDir, { withFileTypes: true })) {
  if (!name.isDirectory()) continue;
  // Underscore-prefixed dirs are staging/scaffold, not catalog entries: frameworks/_proposed/<slug>/
  // (where the research engine drafts a dossier before its entry is admitted) and a future
  // frameworks/_template/. They are intentionally exempt from the orphan-dossier check.
  if (name.name.startsWith('_')) continue;
  if (existsSync(resolve(frameworksDir, name.name, 'dossier.md')) && !seenSlugs.has(name.name)) {
    fail(`completeness: frameworks/${name.name}/dossier.md exists with no registry entry.`);
  }
}

// --- 6. Eval coupling (SP1) -------------------------------------------------
// Build the name-safety universe exactly as eval-cases.mjs does: every skill dir
// name + every _workflows recipe name.
const known = new Set();
for (const d of readdirSync(resolve(ROOT, 'skills'))) {
  if (existsSync(resolve(ROOT, 'skills', d, 'SKILL.md'))) known.add(d);
}
for (const f of readdirSync(resolve(ROOT, '_workflows'))) {
  if (!f.endsWith('.md')) continue;
  known.add(f.replace(/\.md$/, '')); // filename
  const m = readFileSync(resolve(ROOT, '_workflows', f), 'utf8').match(/^name:\s*(.+)$/m);
  if (m) known.add(m[1].trim().replace(/^["']|["']$/g, '')); // frontmatter name (parity with eval-cases.mjs)
}
for (const e of fw) {
  if (e.status !== 'shipped') continue;
  const casesPath = resolve(ROOT, e.evalCases ?? '');
  if (!e.evalCases || !existsSync(casesPath)) {
    fail(`eval: shipped ${e.slug} evalCases "${e.evalCases}" does not exist.`);
    continue;
  }
  const text = readFileSync(casesPath, 'utf8');
  for (const p of validateCasesDoc(text)) fail(`eval: ${e.evalCases}: ${p}`);
  const unknown = findUnknownThinkNames(text, known);
  if (unknown.length) fail(`eval: ${e.evalCases} names unknown think-* skills: ${unknown.join(', ')}.`);
}

// --- 7. Tier consistency (shipped) -----------------------------------------
// The registry records a single GOVERNING evidence tier; a shipped skill's SKILL.md
// frontmatter may carry a compound grade (e.g. "M/P"). The registry tier must be one of
// those grades. This closes the source-of-truth loop on the evidence grade itself (not
// just the shipped slug set): the catalog grade cannot drift from the grade the skill,
// the advisor's recommendable feed, and the site framework pages publish.
for (const e of fw) {
  if (e.status !== 'shipped') continue;
  const skillMd = resolve(ROOT, 'skills', `think-${e.slug}`, 'SKILL.md');
  if (!existsSync(skillMd)) continue; // missing dir already flagged by the referential check
  const m = readFileSync(skillMd, 'utf8').match(/^\s*evidence-tier:\s*["']?([^"'\n]+)["']?\s*$/m);
  if (!m) { fail(`tier: shipped ${e.slug} SKILL.md has no evidence-tier frontmatter.`); continue; }
  const grade = m[1].trim();
  const tokens = grade.split('/').map((s) => s.trim());
  if (!tokens.includes(e.tier)) {
    fail(`tier: ${e.slug} registry tier "${e.tier}" is not a grade in SKILL.md evidence-tier "${grade}".`);
  }
}

// --- 8. Recommendable cross-check ------------------------------------------
// The advisor's recommendable set must be exactly the registry's shipped frameworks.
try {
  const reco = JSON.parse(readFileSync(resolve(ROOT, 'skills', ADVISOR_DIR, 'references', 'recommendable.json'), 'utf8'));
  const recoSlugs = new Set((reco.skills ?? []).map((s) => String(s.name).replace(/^think-/, '')));
  for (const slug of shipped) if (!recoSlugs.has(slug)) fail(`recommendable: shipped ${slug} is missing from recommendable.json.`);
  for (const slug of recoSlugs) if (!shipped.has(slug)) fail(`recommendable: recommendable.json lists think-${slug}, which is not a shipped registry entry.`);
} catch (err) {
  fail(`recommendable: could not cross-check recommendable.json (${err.message}).`);
}

// --- report -----------------------------------------------------------------
if (problems.length) {
  console.error(`Registry conformance: ${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`  - ${p}`);
  console.error('\nFix frameworks/registry.mjs (or regenerate views) and re-run.');
  process.exit(1);
}
console.log(`Registry conformance: OK (${fw.length} frameworks, ${shipped.size} shipped, schema + drift + referential + IP + eval + tier + recommendable).`);
process.exit(0);
