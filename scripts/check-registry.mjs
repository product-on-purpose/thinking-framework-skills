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
//   7. Recommendable - the shipped registry slugs match the advisor's recommendable set.
//
// Zero-dependency; reuses scripts/lib/cases-lib.mjs (the SP1 source) for eval coupling.
// =============================================================================

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import registry from '../frameworks/registry.mjs';
import { validateCasesDoc, findUnknownThinkNames } from './lib/cases-lib.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..'); // cwd-independent; the script and registry share a checkout
const ADVISOR_DIR = 'think-framework-advisor'; // the meta-skill: a skill dir but not a framework entry

const problems = [];
const fail = (msg) => problems.push(msg);

const schema = JSON.parse(readFileSync(resolve(ROOT, 'frameworks', 'registry.schema.json'), 'utf8'));
const fw = registry.frameworks ?? [];

// --- 1. Schema validation ---------------------------------------------------
// Enums + required come from the schema (single source of truth); the few
// conditionals below mirror the schema's allOf if/then blocks.
const entrySchema = schema.definitions.entry;
const entryProps = entrySchema.properties;
const allowedKeys = new Set(Object.keys(entryProps));
const enumOf = (k) => entryProps[k]?.enum ?? null;

if (registry.version !== schema.properties.version.const) {
  fail(`schema: top-level version must be ${schema.properties.version.const} (got ${registry.version}).`);
}
if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(registry.seededDate ?? '')) {
  fail(`schema: top-level seededDate must be an ISO date (got ${JSON.stringify(registry.seededDate)}).`);
}
const familySlugs = new Set((registry.families ?? []).map((f) => f.slug));
if (familySlugs.size < (schema.properties.families.minItems ?? 0)) {
  fail(`schema: families must list at least ${schema.properties.families.minItems} entries (got ${familySlugs.size}).`);
}

const seenSlugs = new Set();
for (const e of fw) {
  const at = e.slug ? `entry "${e.slug}"` : `entry ${JSON.stringify(e.name ?? e)}`;
  // required
  for (const req of entrySchema.required) {
    if (e[req] === undefined || e[req] === null || e[req] === '') fail(`schema: ${at} missing required field "${req}".`);
  }
  // unknown keys (additionalProperties: false)
  for (const k of Object.keys(e)) {
    if (!allowedKeys.has(k)) fail(`schema: ${at} has unknown field "${k}".`);
  }
  // enums
  for (const k of ['family', 'tier', 'status', 'verdict']) {
    const allowed = enumOf(k);
    if (allowed && e[k] !== undefined && !allowed.includes(e[k])) {
      fail(`schema: ${at} field "${k}" = ${JSON.stringify(e[k])} is not one of ${allowed.join('/')}.`);
    }
  }
  // slug shape + uniqueness
  if (e.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.slug)) fail(`schema: ${at} slug is not kebab-case.`);
  if (e.slug) {
    if (seenSlugs.has(e.slug)) fail(`schema: duplicate slug "${e.slug}".`);
    seenSlugs.add(e.slug);
  }
  if (e.evalDate !== undefined && !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(e.evalDate)) {
    fail(`schema: ${at} evalDate must be an ISO date (got ${JSON.stringify(e.evalDate)}).`);
  }
  // conditionals (mirror registry.schema.json allOf)
  if ((e.status === 'fold' || e.verdict === 'fold') && !e.foldInto) fail(`schema: ${at} is a fold but has no foldInto.`);
  if (e.status === 'shipped' && !e.evalCases) fail(`schema: ${at} is shipped but has no evalCases.`);
  if (e.branded === true) {
    if (!e.attribution) fail(`schema/IP: ${at} is branded but has no attribution.`);
    if (!e.trademark) fail(`schema/IP: ${at} is branded but has no trademark.`);
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
  if (e.status === 'recipe' && !existsSync(resolve(ROOT, '_workflows', `think-${e.slug}.md`))) {
    fail(`ref: recipe ${e.slug} has no _workflows/think-${e.slug}.md.`);
  }
  if (e.foldInto && !shipped.has(e.foldInto)) {
    fail(`ref: ${e.slug} foldInto "${e.foldInto}" does not resolve to a shipped entry.`);
  }
  if (e.dossierPath && e.dossierPath !== 'pending' && !existsSync(resolve(ROOT, e.dossierPath))) {
    fail(`ref: ${e.slug} dossierPath "${e.dossierPath}" does not resolve to a file.`);
  }
  for (const s of e.sources ?? []) {
    if (!/^https?:\/\/\S+$/.test(s.url || '')) fail(`ref: ${e.slug} has a malformed source url ${JSON.stringify(s.url)}.`);
  }
}

// no skill dir without a shipped entry (advisor exempt)
for (const dir of readdirSync(resolve(ROOT, 'skills'))) {
  if (!dir.startsWith('think-') || dir === ADVISOR_DIR) continue;
  const slug = dir.replace(/^think-/, '');
  if (!shipped.has(slug)) fail(`ref: skills/${dir}/ has no matching shipped registry entry (slug "${slug}").`);
}

// --- 4. Completeness: no orphan dossier without an entry --------------------
const frameworksDir = resolve(ROOT, 'frameworks');
for (const name of readdirSync(frameworksDir, { withFileTypes: true })) {
  if (!name.isDirectory()) continue;
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
  if (f.endsWith('.md')) known.add(f.replace(/\.md$/, ''));
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

// --- 7. Recommendable cross-check ------------------------------------------
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
console.log(`Registry conformance: OK (${fw.length} frameworks, ${shipped.size} shipped, schema + drift + referential + IP + eval + recommendable).`);
process.exit(0);
