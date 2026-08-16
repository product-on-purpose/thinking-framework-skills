#!/usr/bin/env node
// gen-catalog.mjs - generate the public, machine-readable catalog + the llms.txt
// convention index, so other agents can discover, route to, and chain the library's
// skills.
//
// OUTPUT (into site/public/, copied verbatim by Astro to the site root):
//   site/public/llms.txt        (the llmstxt.org index: invokable surface + key docs)
//   site/public/catalog.json    (the invokable components: skills + tools + recipes)
//   site/public/evaluated.json  (every evaluated registry method; the not-shipped ones in context)
//
// SOURCES OF TRUTH (joined, never invented): frameworks/registry.mjs + library.json +
// each SKILL.md frontmatter + each skill.meta.yml + _workflows/*.md. Every emitted URL
// is validated against scripts/route-manifest.txt (the live-route set) so a renamed or
// missing page fails the generator rather than shipping a dead link.
//
// Usage:  node scripts/gen-catalog.mjs          (write the three files)
//         node scripts/gen-catalog.mjs --check   (exit 1 if any committed file is stale; for CI)
//
// No dependencies. UTF-8 in/out (Windows cp1252 would otherwise corrupt output).

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import registry from '../frameworks/registry.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const OUT_DIR = join(ROOT, 'site', 'public');

// --- helpers ----------------------------------------------------------------
const strip = (s) => s.replace(/^["']/, '').replace(/["']$/, '').trim();
const firstSentence = (s) => { const r = (s || '').split(/\.\s/)[0].replace(/\.$/, ''); return r ? r + '.' : ''; };
const titleCase = (slug) => slug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
function useWhen(desc) {
  const i = (desc || '').search(/Use when/i);
  return i === -1 ? (desc || '') : 'Use when ' + desc.slice(i + 'Use when'.length).trim();
}

// Tolerant frontmatter reader for SKILL.md / _workflows (top-level scalars, one nested
// map under `metadata:`, and `steps:` style lists). Same shape as gen-site.mjs.
function readFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const out = {};
  let key = null;
  for (const raw of m[1].split(/\r?\n/)) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    const line = raw.trim();
    if (line.startsWith('- ')) {
      if (key) { if (!Array.isArray(out[key])) out[key] = []; out[key].push(strip(line.slice(2))); }
      continue;
    }
    const indent = raw.length - raw.replace(/^\s+/, '').length;
    const kv = line.match(/^([A-Za-z0-9_.-]+):\s*(.*)$/);
    if (!kv) continue;
    const [, k, v] = kv;
    if (indent === 0) {
      if (v === '') { key = k; out[k] = out[k] ?? {}; }
      else { key = null; out[k] = strip(v); }
    } else if (key && !Array.isArray(out[key])) {
      if (typeof out[key] !== 'object') out[key] = {};
      out[key][k] = strip(v);
    }
  }
  return out;
}

// skill.meta.yml is a full YAML doc (not frontmatter); pull just the fields we need by
// regex, exactly as gen-site.mjs reads primary_artifact_type.
const metaScalar = (text, key) => (text.match(new RegExp(`${key}:\\s*([^\\n#]+)`)) || [])[1]?.trim() || null;
function metaBlockList(text, key) {
  const lines = (text || '').split(/\r?\n/);
  const i = lines.findIndex((l) => new RegExp(`^\\s*${key}:\\s*$`).test(l));
  if (i === -1) return [];
  const base = lines[i].match(/^\s*/)[0].length;
  const out = [];
  for (let j = i + 1; j < lines.length; j++) {
    const l = lines[j];
    if (!l.trim() || l.trim().startsWith('#')) continue;
    const indent = l.match(/^\s*/)[0].length;
    if (l.trim().startsWith('- ') && indent > base) out.push(strip(l.trim().slice(2)));
    else if (indent <= base) break;
  }
  return out;
}
// likely_companions / complements appear as EITHER a block list (skills, id form) OR an
// inline array (tools, invocation form). Accept both; idToInvocation normalizes the values.
function metaList(text, key) {
  const block = metaBlockList(text, key);
  if (block.length) return block;
  const m = (text || '').match(new RegExp(`^\\s*${key}:\\s*\\[([^\\]]*)\\]`, 'm'));
  return m ? m[1].split(',').map((s) => strip(s.trim())).filter(Boolean) : [];
}
const idToInvocation = (id) => id.replace(/^thinking-framework-skills\./, 'think-');

// --- absolute URLs + live-route validation ----------------------------------
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const SITE = pkg.homepage.replace(/\/$/, ''); // https://.../thinking-framework-skills
const abs = (p) => SITE + p;
const manifest = new Set(
  readFileSync(join(ROOT, 'scripts', 'route-manifest.txt'), 'utf8')
    .split(/\r?\n/).map((l) => l.trim()).filter(Boolean),
);
const deadUrls = [];
function liveUrl(path) { // path like '/frameworks/think-premortem/'
  if (manifest.has(path + 'index.html')) return abs(path);
  return null;
}
function requireUrl(path, label) { // for surfaces that MUST resolve (skills/tools/recipes)
  const u = liveUrl(path);
  if (!u) deadUrls.push(`${label}: ${path}`);
  return u;
}

// --- gather: registry, library, recipes -------------------------------------
const lib = JSON.parse(readFileSync(join(ROOT, 'library.json'), 'utf8'));
const allSkillNames = new Set(lib.components.skills.map((c) => c.name));
const fwBySlug = new Map(registry.frameworks.map((e) => [e.slug, e]));
const registryNameSet = new Set(registry.frameworks.map((e) => 'think-' + e.slug));
const isTool = (name) => !registryNameSet.has(name);

// recipes (needed for the reverse in_recipes map)
const recipes = readdirSync(join(ROOT, '_workflows'))
  .filter((f) => f.endsWith('.md')).sort()
  .map((f) => {
    const fm = readFrontmatter(readFileSync(join(ROOT, '_workflows', f), 'utf8'));
    const invocation = fm.name || f.replace(/\.md$/, '');
    const slug = invocation.replace(/^think-/, '');
    return {
      slug, type: 'recipe', invocation, name: titleCase(slug),
      when_to_use: fm.description || '',
      steps: Array.isArray(fm.steps) ? fm.steps : [],
      url: requireUrl(`/recipes/${slug}/`, `recipe ${slug}`),
    };
  });
const inRecipes = new Map(); // invocation -> [recipeSlug]
for (const r of recipes) for (const step of r.steps) {
  if (!inRecipes.has(step)) inRecipes.set(step, []);
  inRecipes.get(step).push(r.slug);
}

// skills + tools from library.json
const skills = [];
const tools = [];
for (const c of lib.components.skills) {
  const name = c.name; // think-<slug>
  const slug = name.replace(/^think-/, '');
  const skillMd = readFileSync(join(ROOT, c.path), 'utf8');
  const fm = readFrontmatter(skillMd);
  const meta = fm.metadata || {};
  const dir = join(ROOT, dirname(c.path));
  const sidecarPath = join(dir, 'skill.meta.yml');
  const sidecar = existsSync(sidecarPath) ? readFileSync(sidecarPath, 'utf8') : '';
  const artifact = metaScalar(sidecar, 'primary_artifact_type');
  const compIds = metaList(sidecar, 'likely_companions');
  const compFallback = compIds.length ? compIds : metaList(sidecar, 'complements');
  const seen = new Set();
  const likely_companions = compFallback
    .map(idToInvocation)
    .filter((inv) => inv !== name && allSkillNames.has(inv) && !seen.has(inv) && seen.add(inv));

  if (isTool(name)) {
    tools.push({
      slug, type: 'tool', invocation: name, name: titleCase(slug),
      family: null,
      evidence_tier: meta['evidence-tier'] || null,
      mechanism: firstSentence(fm.description),
      when_to_use: fm.description || '',
      artifact,
      status: c.status || null,
      aliases: [],
      in_recipes: inRecipes.get(name) || [],
      likely_companions,
      url: requireUrl(`/tools/${name}/`, `tool ${name}`),
    });
  } else {
    const reg = fwBySlug.get(slug) || {};
    skills.push({
      slug, type: 'skill', invocation: name, name: reg.name || titleCase(slug),
      family: reg.family || null,
      evidence_tier: meta['evidence-tier'] || reg.tier || null,
      mechanism: reg.oneLine || firstSentence(fm.description),
      when_to_use: useWhen(fm.description),
      artifact,
      status: c.status || null,
      // Contested-lens posture marker (v0.11.0): so an agent reading the catalog sees that a
      // famous-but-weak lens is caveat-first + explicit-request-only, not an endorsed default.
      caveat_first: reg.caveatFirst === true,
      posture: reg.posture || null,
      recommendation_policy: reg.recommendationPolicy || null,
      aliases: Array.isArray(reg.aliases) ? reg.aliases : [],
      in_recipes: inRecipes.get(name) || [],
      likely_companions,
      url: requireUrl(`/frameworks/${name}/`, `skill ${name}`),
    });
  }
}
skills.sort((a, b) => a.slug.localeCompare(b.slug));
tools.sort((a, b) => a.slug.localeCompare(b.slug));

const expectedShipped = registry.frameworks.filter((e) => e.status === 'shipped').length;
if (skills.length !== expectedShipped) {
  throw new Error(`gen-catalog: built ${skills.length} skill entries but the registry has ${expectedShipped} shipped frameworks - a shipped framework is missing from library.json (or a non-shipped one is present).`);
}

if (deadUrls.length) {
  throw new Error('gen-catalog: these surfaces have no live route (regenerate route-manifest.txt or fix the slug):\n  ' + deadUrls.join('\n  '));
}

// --- build catalog.json -----------------------------------------------------
const NOTE = 'GENERATED by scripts/gen-catalog.mjs - do not hand-edit. Regenerate when skills, tools, recipes, or the registry change.';
const entries = [...skills, ...tools, ...recipes];
export const catalog = {
  $note: NOTE,
  generated_from: 'frameworks/registry.mjs + library.json + skills/*/SKILL.md + skills/*/skill.meta.yml + _workflows/*.md',
  site: SITE + '/',
  counts: { skills: skills.length, tools: tools.length, recipes: recipes.length, total: entries.length },
  entries,
};

// --- build evaluated.json (the complete 135-method projection) --------------
const methods = registry.frameworks.map((e) => ({
  slug: e.slug,
  name: e.name,
  family: e.family,
  tier: e.tier,
  status: e.status,
  verdict: e.verdict,
  fold_into: e.foldInto || null,
  mechanism: e.oneLine,
  // shipped methods link to their live skill page; everything else to its Framework Library
  // dossier (or null if neither route exists).
  url: e.status === 'shipped'
    ? (liveUrl(`/frameworks/think-${e.slug}/`) || liveUrl(`/library/${e.slug}/`))
    : liveUrl(`/library/${e.slug}/`),
})).sort((a, b) => a.slug.localeCompare(b.slug));
const shipped = methods.filter((m) => m.status === 'shipped').length;
export const evaluated = {
  $note: NOTE + ' Each method url is the absolute URL of its live page (the shipped skill page, or the Framework Library dossier), or null if neither exists.',
  generated_from: 'frameworks/registry.mjs',
  counts: { total: methods.length, shipped, not_shipped: methods.length - shipped },
  families: registry.families,
  methods,
};

// --- render llms.txt --------------------------------------------------------
function renderLlmsTxt(cat, ev) {
  const L = [];
  L.push('# Thinking Framework Skills');
  L.push('');
  L.push(`> An evidence-graded library of agent-executable thinking-method skills for Claude Code, Codex, and other AI agents. ${cat.counts.skills} skills, ${cat.counts.tools} tools, and ${cat.counts.recipes} recipes; every skill produces a concrete, named artifact. ${ev.counts.total} methods were evaluated and graded, ${ev.counts.shipped} ship as skills.`);
  L.push('');
  L.push(`Machine-readable: [catalog.json](${abs('/catalog.json')}) (the invokable skills, tools, and recipes) and [evaluated.json](${abs('/evaluated.json')}) (all ${ev.counts.total} evaluated methods). Full text: [llms-full.txt](${abs('/llms-full.txt')}) inlines every component for one-fetch ingestion.`);
  L.push('');
  L.push('## Start here');
  for (const [path, linkText, desc] of [
    ['/start/getting-started/', 'Getting started', 'install and first run'],
    ['/showcase/', 'Showcase', 'worked, end-to-end examples'],
    ['/start/does-this-work/', 'Does this work?', 'the behavioral-eval results'],
    ['/learn/using-the-frameworks/', 'Using the frameworks', 'the operating guide'],
    ['/learn/prompt-gallery/', 'Prompt gallery', 'real prompts you can copy'],
  ]) {
    const u = liveUrl(path);
    if (u) L.push(`- [${linkText}](${u}): ${desc}`);
  }
  L.push('');
  L.push('## Skills');
  L.push('');
  for (const fam of ev.families) {
    const inFam = cat.entries.filter((e) => e.type === 'skill' && e.family === fam.slug);
    if (!inFam.length) continue;
    L.push(`### ${fam.name}`);
    for (const s of inFam) L.push(`- [${s.invocation}](${s.url}): ${s.mechanism}`);
    L.push('');
  }
  L.push('## Tools');
  L.push('');
  for (const t of cat.entries.filter((e) => e.type === 'tool')) L.push(`- [${t.invocation}](${t.url}): ${t.mechanism}`);
  L.push('');
  L.push('## Recipes');
  L.push('');
  for (const r of cat.entries.filter((e) => e.type === 'recipe')) {
    L.push(`- [${r.invocation}](${r.url}): ${r.when_to_use} (steps: ${r.steps.join(' -> ')})`);
  }
  L.push('');
  L.push('## Evaluated, not shipped');
  L.push('');
  L.push(`We evaluated ${ev.counts.total} methods; ${ev.counts.shipped} ship as skills. The other ${ev.counts.not_shipped} are documented with the reasoning in the Framework Library. See [evaluated.json](${abs('/evaluated.json')}) and the [Framework Library](${abs('/library/')}).`);
  L.push('');
  return L.join('\n');
}
export const llmsTxt = renderLlmsTxt(catalog, evaluated);

// --- render llms-full.txt (the expanded variant: every component inlined) ---
// llms.txt is an index of links; llms-full.txt inlines each component's routing metadata
// plus the not-shipped methods, so an agent ingests the whole catalog in a single fetch.
function renderLlmsFullTxt(cat, ev) {
  const F = [];
  F.push('# Thinking Framework Skills - full catalog');
  F.push('');
  F.push(`> An evidence-graded library of agent-executable thinking-method skills for Claude Code, Codex, and other AI agents. ${cat.counts.skills} skills, ${cat.counts.tools} tools, and ${cat.counts.recipes} recipes; every skill produces a concrete, named artifact. ${ev.counts.total} methods were evaluated and graded, ${ev.counts.shipped} ship as skills.`);
  F.push('');
  F.push(`This is the expanded llms.txt: every invokable component inlined with its routing metadata, so an agent can ingest the catalog in a single fetch. The compact index is [llms.txt](${abs('/llms.txt')}); the structured forms are [catalog.json](${abs('/catalog.json')}) and [evaluated.json](${abs('/evaluated.json')}).`);
  F.push('');
  const block = (e) => {
    F.push(`#### ${e.invocation}`);
    F.push(`- Name: ${e.name}`);
    if (e.family) F.push(`- Family: ${e.family}`);
    if (e.evidence_tier) F.push(`- Evidence tier: ${e.evidence_tier}`);
    if (e.caveat_first) F.push(`- Contested lens: ${e.posture === 'warn_redirect' ? 'warn-and-redirect' : 'run-caveat-first'}, explicit-request-only (leads with its evidence caveat)`);
    if (e.mechanism) F.push(`- Mechanism: ${e.mechanism}`);
    if (e.when_to_use) F.push(`- When to use: ${e.when_to_use}`);
    if (e.artifact) F.push(`- Produces: ${e.artifact}`);
    if (e.aliases && e.aliases.length) F.push(`- Also known as: ${e.aliases.join(', ')}`);
    if (e.in_recipes && e.in_recipes.length) F.push(`- Used in recipes: ${e.in_recipes.join(', ')}`);
    if (e.likely_companions && e.likely_companions.length) F.push(`- Pairs with: ${e.likely_companions.join(', ')}`);
    F.push(`- URL: ${e.url}`);
    F.push('');
  };
  F.push('## Skills');
  F.push('');
  for (const fam of ev.families) {
    const inFam = cat.entries.filter((e) => e.type === 'skill' && e.family === fam.slug);
    if (!inFam.length) continue;
    F.push(`### ${fam.name}`);
    F.push('');
    for (const s of inFam) block(s);
  }
  F.push('## Tools');
  F.push('');
  for (const t of cat.entries.filter((e) => e.type === 'tool')) block(t);
  F.push('## Recipes');
  F.push('');
  for (const r of cat.entries.filter((e) => e.type === 'recipe')) {
    F.push(`#### ${r.invocation}`);
    if (r.when_to_use) F.push(`- When to use: ${r.when_to_use}`);
    if (r.steps && r.steps.length) F.push(`- Steps: ${r.steps.join(' -> ')}`);
    F.push(`- URL: ${r.url}`);
    F.push('');
  }
  F.push('## Evaluated, not shipped');
  F.push('');
  F.push(`The ${ev.counts.not_shipped} methods that were evaluated and graded but do not ship as skills, with the verdict and where each folds. Full reasoning is in the Framework Library.`);
  F.push('');
  for (const m of ev.methods.filter((x) => x.status !== 'shipped')) {
    const where = m.fold_into ? `, folds into ${m.fold_into}` : '';
    const u = m.url ? ` ${m.url}` : '';
    F.push(`- ${m.slug} (${m.family}; tier ${m.tier}; ${m.status}/${m.verdict}${where}): ${m.mechanism}${u}`);
  }
  F.push('');
  return F.join('\n');
}
export const llmsFullTxt = renderLlmsFullTxt(catalog, evaluated);

// --- main: write or --check -------------------------------------------------
const FILES = [
  ['catalog.json', JSON.stringify(catalog, null, 2) + '\n'],
  ['evaluated.json', JSON.stringify(evaluated, null, 2) + '\n'],
  ['llms.txt', llmsTxt],
  ['llms-full.txt', llmsFullTxt],
];
const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));
if (isMain) {
  if (process.argv.includes('--check')) {
    const stale = FILES.filter(([f, content]) => {
      const p = join(OUT_DIR, f);
      return !existsSync(p) || readFileSync(p, 'utf8') !== content;
    }).map(([f]) => f);
    if (stale.length) {
      console.error(`stale: ${stale.join(', ')} - run: node scripts/gen-catalog.mjs`);
      process.exit(1);
    }
    // Tally, not just "up to date" (audit D-06). Several generated files all being byte-identical
    // to an empty or truncated generation would read exactly the same as a healthy run.
    console.log(`gen-catalog: OK (${FILES.length} generated file(s) up to date: ${FILES.map(([f]) => f).join(', ')}).`);
  } else {
    for (const [f, content] of FILES) writeFileSync(join(OUT_DIR, f), content, 'utf8');
    console.log(`Wrote ${catalog.counts.total} invokable entries + ${evaluated.counts.total} evaluated methods to ${OUT_DIR}`);
  }
}
