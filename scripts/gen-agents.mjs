#!/usr/bin/env node
// =============================================================================
// gen-agents.mjs - generate the drift-checked tables in AGENTS.md.
//
// AGENTS.md is the contributor/agent guide. Its Skills and Recipes tables are a
// view of the same sources everything else is generated from, so they used to
// drift every time the catalog grew (a hand-maintained denormalized roster). This
// regenerates them, and a `--check` byte-compare in the conformance gate fails CI
// if the committed AGENTS.md ever falls out of sync.
//
// Two generated blocks, both in AGENTS.md:
//   1. SKILLS - one row per shipped framework (Skill | Family | Evidence | Artifact)
//      + the advisor meta-router row + the count line. Family + compound evidence
//      tier come from each skills/think-<slug>/SKILL.md frontmatter; the artifact is
//      the de-slugified primary_artifact_type from skill.meta.yml.
//   2. RECIPES - one row per _workflows/think-<slug>.md (Recipe | Chain), the chain
//      being the workflow's step list with the think- prefix stripped.
//
// Run `node scripts/gen-agents.mjs` to write; `--check` regenerates in memory and
// byte-compares (exit 1 on drift). Zero-dependency, explicit UTF-8, LF newlines -
// the gen-registry.mjs / gen-recommendable.mjs convention (.gitattributes pins LF so
// the byte compare is identical on every platform).
// =============================================================================

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import registry from '../frameworks/registry.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const CHECK = process.argv.includes('--check');
const AGENTS = resolve(ROOT, 'AGENTS.md');

const SKILLS_BEGIN = '<!-- BEGIN GENERATED SKILLS (scripts/gen-agents.mjs from frameworks/registry.mjs + skills/) - do not hand-edit below this line -->';
const SKILLS_END = '<!-- END GENERATED SKILLS -->';
const RECIPES_BEGIN = '<!-- BEGIN GENERATED RECIPES (scripts/gen-agents.mjs from _workflows/) - do not hand-edit below this line -->';
const RECIPES_END = '<!-- END GENERATED RECIPES -->';

const read = (p) => readFileSync(p, 'utf8');
const escapePipes = (s) => String(s).replace(/\|/g, '\\|');

// --- tiny, tolerant frontmatter reader (no YAML dependency) -------------------
// Handles top-level `key: value`, one level of nesting under `metadata:`, and a
// `steps:` list of `- item`. The same shape gen-recommendable.mjs parses.
function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return { metadata: {}, steps: [] };
  const out = { metadata: {}, steps: [] };
  let parent = null;
  for (const raw of m[1].split('\n')) {
    const line = raw.replace(/\r$/, '');
    if (!line.trim()) continue;
    const indented = /^\s+/.test(line);
    const listItem = line.match(/^\s*-\s+(.*)$/);
    if (parent === 'steps' && listItem) { out.steps.push(stripInline(listItem[1])); continue; }
    const kv = line.match(/^(\s*)([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    const [, , key, value] = kv;
    if (!indented) {
      if (key === 'metadata' && value === '') { parent = 'metadata'; }
      else if (key === 'steps' && value === '') { parent = 'steps'; }
      else { parent = null; out[key] = stripInline(value); }
    } else if (parent === 'metadata') {
      out.metadata[key] = stripInline(value);
    }
  }
  return out;
}
// strip surrounding quotes and a trailing ` # comment` (skill.meta.yml uses inline comments)
function stripInline(v) {
  let s = String(v).replace(/\s+#.*$/, '').trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) s = s.slice(1, -1);
  return s.trim();
}

// --- per-skill metadata -------------------------------------------------------
function skillMeta(slug) {
  const dir = resolve(ROOT, 'skills', `think-${slug}`);
  const fm = frontmatter(read(resolve(dir, 'SKILL.md')));
  const family = fm.metadata.family || 'other';
  const tier = fm.metadata['evidence-tier'] || '';
  const metaYml = read(resolve(dir, 'skill.meta.yml'));
  const am = metaYml.match(/^\s*primary_artifact_type:\s*(.+)$/m);
  const artifact = am ? stripInline(am[1]).replace(/-/g, ' ') : '';
  return { family, tier, artifact };
}

const tierCell = (tier) => (tier === 'S' ? '**S**' : tier);

// --- block 1: the Skills table + count line -----------------------------------
function skillsBlock() {
  // sort by displayed family then slug, so the Family column is cleanly grouped
  const shipped = registry.frameworks
    .filter((e) => e.status === 'shipped')
    .map((e) => ({ slug: e.slug, ...skillMeta(e.slug) }))
    .sort((a, b) => a.family.localeCompare(b.family) || a.slug.localeCompare(b.slug));
  const rows = shipped.map((s) =>
    `| [\`think-${s.slug}\`](skills/think-${s.slug}/SKILL.md) | ${s.family} | ${tierCell(s.tier)} | ${escapePipes(s.artifact)} |`);
  // the advisor is a meta-skill (no registry entry); special-cased as the router row
  const advTier = frontmatter(read(resolve(ROOT, 'skills', 'think-framework-advisor', 'SKILL.md'))).metadata['evidence-tier'] || 'M/C';
  rows.push(`| [\`think-framework-advisor\`](skills/think-framework-advisor/SKILL.md) | meta (router) | ${advTier} | Thinking Plan |`);

  const sCount = shipped.filter((s) => /^S(\/|$)/.test(s.tier)).length;
  const count = `${shipped.length} skills, ${sCount} at **S**/S-M tier - the named empirical core is fully shipped. **\`think-framework-advisor\` is the front door / meta-router:** describe a situation and it returns a prioritized, evidence-graded *Thinking Plan* of which of the other skills to use and why (graded ${advTier} - honest that the routing itself is unvalidated; see its dossier). See \`docs/internal/research/framework-catalog.md\` for the full framework universe and roadmap.`;

  return ['| Skill | Family | Evidence | Artifact |', '|---|---|---|---|', ...rows, '', count].join('\n');
}

// --- block 2: the Recipes table -----------------------------------------------
function recipesBlock() {
  const files = readdirSync(resolve(ROOT, '_workflows')).filter((f) => f.endsWith('.md')).sort();
  const rows = files.map((f) => {
    const fm = frontmatter(read(resolve(ROOT, '_workflows', f)));
    const slug = (fm.name || f.replace(/\.md$/, '')).replace(/^think-/, '');
    const chain = fm.steps.map((s) => s.replace(/^think-/, '')).join(' -> ');
    return `| [${slug}](recipes/${slug}.md) | ${escapePipes(chain)} |`;
  });
  return ['| Recipe | Chain |', '|---|---|', ...rows].join('\n');
}

// --- splice + write/check -----------------------------------------------------
function splice(body, begin, end, block, label) {
  const i = body.indexOf(begin);
  const j = body.indexOf(end);
  if (i === -1 || j === -1 || j < i) throw new Error(`gen-agents: ${label} markers not found (or out of order) in AGENTS.md`);
  return `${body.slice(0, i + begin.length)}\n${block}\n${body.slice(j)}`;
}

const current = read(AGENTS);
let next = splice(current, SKILLS_BEGIN, SKILLS_END, skillsBlock(), 'SKILLS');
next = splice(next, RECIPES_BEGIN, RECIPES_END, recipesBlock(), 'RECIPES');

if (CHECK) {
  if (next !== current) {
    console.error('gen-agents: AGENTS.md is out of date. Regenerate: node scripts/gen-agents.mjs');
    process.exit(1);
  }
  console.log('gen-agents: OK (AGENTS.md tables in sync).');
} else {
  writeFileSync(AGENTS, next, 'utf8');
  console.log('gen-agents: wrote AGENTS.md (Skills + Recipes tables).');
}
