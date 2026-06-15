# llms.txt + machine-readable catalog - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a single generator that emits `site/public/{llms.txt, catalog.json, evaluated.json}` from the existing sources of truth, drift-gated as an 8th layer of `scripts/check.mjs`, so other agents can discover, route to, and chain the library's skills.

**Architecture:** One zero-dependency Node script, `scripts/gen-catalog.mjs`, reads `frameworks/registry.mjs` + `library.json` + each `SKILL.md` + each `skill.meta.yml` + `_workflows/*.md`, builds three artifacts, validates every emitted URL against `scripts/route-manifest.txt`, and writes them into Astro's `site/public/` passthrough dir. A `--check` mode compares regenerated content against the committed files and fails on drift; `scripts/check.mjs` runs it as layer 8. No new Astro routes, so the route-parity and rendered-links guards are untouched.

**Tech Stack:** Node 20 ESM (`.mjs`), `node:fs`, `node --test` for tests, no third-party deps (repo convention). Reads/writes UTF-8 explicitly (Windows cp1252 would corrupt output).

**Spec:** `docs/internal/specs/2026-06-15-llms-txt-machine-catalog-design.md`

**Branch:** `feat/llms-txt-catalog` (already created; spec committed at `ec7e130`).

---

## Conventions this plan relies on (verified in the codebase)

- **Registry import:** `import registry from '../frameworks/registry.mjs';` gives `{ version, families:[{slug,name}], frameworks:[{slug,name,family,tier,status,verdict,oneLine,foldInto?,aliases?,...}] }`. `frameworks` holds all 135 methods; shipped ones have `status: 'shipped'`.
- **`library.json`:** `lib.components.skills` is an array of `{ name, path, version, tier, status }`. It contains the 60 real skills (56 shipped frameworks + 4 meta-tools), nothing else.
- **Tool discriminator (same as `gen-site.mjs`):** a library skill whose `name` is NOT `think-<registry-slug>` is a meta-tool (advisor, research engine, top3, random-frameworks). No separate hardcoded list.
- **Artifact field:** `skill.meta.yml` line `primary_artifact_type: <value>`, extracted by regex (the repo never parses full YAML). All 60 skill dirs have it (verified).
- **Companions:** `skill.meta.yml` nested list `execution.likely_companions:` (fallback `relationships.complements:`), values are ids like `thinking-framework-skills.<slug>` -> map to `think-<slug>`.
- **Recipes:** `_workflows/*.md` frontmatter has `name` (e.g. `think-stress-test-decision`), `description`, and `steps:` (a list of `think-<slug>` invocations). 9 files.
- **Routes (from `scripts/route-manifest.txt`, 208 entries):** skills `/frameworks/think-<slug>/index.html`; tools `/tools/think-<name>/index.html`; recipes `/recipes/<slug>/index.html`; library dossiers `/library/<slug>/index.html` (shipped slugs have BOTH a `/frameworks/` and a `/library/` page). Docs: `/start/getting-started/`, `/showcase/`, `/start/does-this-work/`, `/learn/using-the-frameworks/`, `/learn/prompt-gallery/`.
- **`package.json` `homepage`:** `https://product-on-purpose.github.io/thinking-framework-skills/` - the single source for absolute URLs.
- **Family choice:** the public artifacts use the **registry catalog family** (the 13-family taxonomy with display names) for both the `family` field and llms.txt grouping, so the field and the grouping are internally consistent. Tools have `family: null`.

---

## Task 1: The generator core + unit tests

**Files:**
- Create: `scripts/gen-catalog.mjs`
- Test: `tests/gen-catalog.test.mjs`

- [ ] **Step 1: Write the failing test**

Create `tests/gen-catalog.test.mjs`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import registry from "../frameworks/registry.mjs";
import { catalog, evaluated, llmsTxt } from "../scripts/gen-catalog.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const lib = JSON.parse(readFileSync(path.join(ROOT, "library.json"), "utf8"));
const SITE = JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf8")).homepage.replace(/\/$/, "");

const shippedCount = registry.frameworks.filter((f) => f.status === "shipped").length;
const recipeCount = readdirSync(path.join(ROOT, "_workflows")).filter((f) => f.endsWith(".md")).length;
const allSkillNames = new Set(lib.components.skills.map((c) => c.name));

test("catalog counts are internally consistent and derived from the sources", () => {
  assert.equal(catalog.counts.skills, shippedCount, "skills == shipped registry frameworks");
  assert.equal(catalog.counts.recipes, recipeCount, "recipes == _workflows files");
  assert.equal(catalog.counts.tools, lib.components.skills.length - shippedCount, "tools == library skills minus shipped");
  assert.equal(catalog.counts.total, catalog.entries.length);
  assert.equal(catalog.counts.total, catalog.counts.skills + catalog.counts.tools + catalog.counts.recipes);
});

test("every catalog entry has a live, absolute url and a known type", () => {
  for (const e of catalog.entries) {
    assert.ok(["skill", "tool", "recipe"].includes(e.type), `${e.slug}: type`);
    assert.ok(typeof e.url === "string" && e.url.startsWith(SITE), `${e.slug}: url ${e.url}`);
  }
});

test("a known skill (premortem) carries the routing fields", () => {
  const p = catalog.entries.find((e) => e.invocation === "think-premortem");
  assert.ok(p, "think-premortem present");
  assert.equal(p.type, "skill");
  assert.equal(p.artifact, "risk-register");
  assert.equal(p.evidence_tier, "S/M");
  assert.ok(p.url.endsWith("/frameworks/think-premortem/"), p.url);
  assert.ok(p.in_recipes.includes("stress-test-decision"), "in_recipes");
  assert.ok(Array.isArray(p.likely_companions));
});

test("likely_companions only ever names real shipped skills", () => {
  for (const e of catalog.entries) {
    for (const c of e.likely_companions || []) {
      assert.ok(allSkillNames.has(c), `${e.slug}: companion ${c} is not a real skill`);
    }
  }
});

test("evaluated.json projects the whole registry with shipped/not-shipped split", () => {
  assert.equal(evaluated.counts.total, registry.frameworks.length);
  assert.equal(evaluated.counts.shipped, shippedCount);
  assert.equal(evaluated.counts.not_shipped, registry.frameworks.length - shippedCount);
  const steel = evaluated.methods.find((m) => m.slug === "steelmanning");
  assert.ok(steel, "steelmanning present");
  assert.equal(steel.fold_into, "red-team-light", "fold_into surfaces where it ships");
});

test("llms.txt has the convention shape and links the data files", () => {
  assert.ok(llmsTxt.startsWith("# Thinking Framework Skills"), "H1 title");
  assert.match(llmsTxt, /^> /m, "blockquote summary");
  assert.ok(llmsTxt.includes(`${SITE}/catalog.json`), "links catalog.json");
  assert.ok(llmsTxt.includes(`${SITE}/evaluated.json`), "links evaluated.json");
  assert.ok(llmsTxt.includes("## Skills"), "Skills section");
  assert.ok(llmsTxt.includes("## Recipes"), "Recipes section");
  assert.ok(llmsTxt.includes("think-premortem"), "lists a known skill");
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/gen-catalog.test.mjs`
Expected: FAIL - cannot import `../scripts/gen-catalog.mjs` (module does not exist).

- [ ] **Step 3: Implement the generator**

Create `scripts/gen-catalog.mjs`:

```js
#!/usr/bin/env node
// gen-catalog.mjs - generate the public, machine-readable catalog + the llms.txt
// convention index, so other agents can discover, route to, and chain the library's
// skills.
//
// OUTPUT (into site/public/, copied verbatim by Astro to the site root):
//   site/public/llms.txt        (the llmstxt.org index: invokable surface + key docs)
//   site/public/catalog.json    (69 invokable components: 56 skills + 4 tools + 9 recipes)
//   site/public/evaluated.json  (all 135 evaluated registry methods; the 79 not-shipped in context)
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
const firstSentence = (s) => (s || '').split(/\.\s/)[0].replace(/\.$/, '') + '.';
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
  const compIds = metaBlockList(sidecar, 'likely_companions');
  const compFallback = compIds.length ? compIds : metaBlockList(sidecar, 'complements');
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
      evidence_tier: reg.tier || meta['evidence-tier'] || null,
      mechanism: reg.oneLine || firstSentence(fm.description),
      when_to_use: useWhen(fm.description),
      artifact,
      status: c.status || null,
      aliases: Array.isArray(reg.aliases) ? reg.aliases : [],
      in_recipes: inRecipes.get(name) || [],
      likely_companions,
      url: requireUrl(`/frameworks/${name}/`, `skill ${name}`),
    });
  }
}
skills.sort((a, b) => a.slug.localeCompare(b.slug));
tools.sort((a, b) => a.slug.localeCompare(b.slug));

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
  url: liveUrl(`/library/${e.slug}/`), // may be null when a method has no dossier page
})).sort((a, b) => a.slug.localeCompare(b.slug));
const shipped = methods.filter((m) => m.status === 'shipped').length;
export const evaluated = {
  $note: NOTE,
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
  L.push(`Machine-readable: [catalog.json](${abs('/catalog.json')}) (the invokable skills, tools, and recipes) and [evaluated.json](${abs('/evaluated.json')}) (all ${ev.counts.total} evaluated methods).`);
  L.push('');
  L.push('## Start here');
  for (const [path, label] of [
    ['/start/getting-started/', 'Getting started: install and first run'],
    ['/showcase/', 'Showcase: worked, end-to-end examples'],
    ['/start/does-this-work/', 'Does this work?: the behavioral-eval results'],
    ['/learn/using-the-frameworks/', 'Using the frameworks: the operating guide'],
    ['/learn/prompt-gallery/', 'Prompt gallery: real prompts you can copy'],
  ]) {
    const u = liveUrl(path);
    if (u) L.push(`- [${label.split(':')[0]}](${u}):${label.slice(label.indexOf(':') + 1)}`);
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

// --- main: write or --check -------------------------------------------------
const FILES = [
  ['catalog.json', JSON.stringify(catalog, null, 2) + '\n'],
  ['evaluated.json', JSON.stringify(evaluated, null, 2) + '\n'],
  ['llms.txt', llmsTxt],
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
    console.log('catalog + llms.txt are up to date.');
  } else {
    for (const [f, content] of FILES) writeFileSync(join(OUT_DIR, f), content, 'utf8');
    console.log(`Wrote ${catalog.counts.total} invokable entries + ${evaluated.counts.total} evaluated methods to ${OUT_DIR}`);
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/gen-catalog.test.mjs`
Expected: PASS - all 6 tests green. (Importing the module runs the in-memory build but writes no files, because the write/`--check` block is guarded by `isMain`.)

- [ ] **Step 5: Commit**

```bash
git add scripts/gen-catalog.mjs tests/gen-catalog.test.mjs
git commit -m "feat: gen-catalog generator + unit tests (no outputs yet)

Co-authored-by: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 2: Generate and commit the output files + npm script

**Files:**
- Create: `site/public/llms.txt`, `site/public/catalog.json`, `site/public/evaluated.json` (generated)
- Modify: `package.json` (add `gen:catalog` script)

- [ ] **Step 1: Add the npm script**

In `package.json`, add to `"scripts"` after the `"gen:registry"` line:

```json
    "gen:catalog": "node scripts/gen-catalog.mjs"
```

(Add a trailing comma to the preceding line so the JSON stays valid.)

- [ ] **Step 2: Generate the three files**

Run: `node scripts/gen-catalog.mjs`
Expected: prints `Wrote 69 invokable entries + 135 evaluated methods to .../site/public`. Three files now exist in `site/public/`.

- [ ] **Step 3: Sanity-check the output**

Run:
```bash
node -e "const c=require('./site/public/catalog.json'); console.log('catalog', c.counts); const e=require('./site/public/evaluated.json'); console.log('evaluated', e.counts);"
head -30 site/public/llms.txt
```
Expected: `catalog { skills: 56, tools: 4, recipes: 9, total: 69 }`, `evaluated { total: 135, shipped: 56, not_shipped: 79 }`, and an llms.txt that opens with the H1, the blockquote, and the machine-readable links.

- [ ] **Step 4: Verify `--check` is clean immediately after generating**

Run: `node scripts/gen-catalog.mjs --check`
Expected: `catalog + llms.txt are up to date.` (exit 0).

- [ ] **Step 5: Commit**

```bash
git add package.json site/public/llms.txt site/public/catalog.json site/public/evaluated.json
git commit -m "feat: generate public llms.txt + catalog.json + evaluated.json

Co-authored-by: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 3: Wire the drift check into the conformance gate (layer 8)

**Files:**
- Modify: `scripts/check.mjs`

- [ ] **Step 1: Add the 8th layer before the final exit line**

In `scripts/check.mjs`, after the example-coverage block (the `const coverage = spawnSync(...)` lines), and BEFORE the `// Fail if any layer failed` comment, insert:

```js
console.log('\nRunning catalog + llms.txt drift check (scripts/gen-catalog.mjs --check)\n');
const catalog = spawnSync('node', [resolve(ROOT, 'scripts', 'gen-catalog.mjs'), '--check'], { stdio: 'inherit' });
```

- [ ] **Step 2: Fold it into the exit status**

Change the final line from:

```js
process.exit((structural.status ?? 1) || (evalCases.status ?? 1) || (registry.status ?? 1) || (engine.status ?? 1) || (agents.status ?? 1) || (counts.status ?? 1) || (coverage.status ?? 1));
```

to:

```js
process.exit((structural.status ?? 1) || (evalCases.status ?? 1) || (registry.status ?? 1) || (engine.status ?? 1) || (agents.status ?? 1) || (counts.status ?? 1) || (coverage.status ?? 1) || (catalog.status ?? 1));
```

- [ ] **Step 3: Update the header comment (seven -> eight layers)**

In the top comment block of `scripts/check.mjs`, change `It runs seven layers:` to `It runs eight layers:` and add an 8th bullet after the example-coverage (layer 7) bullet:

```
//   8. the catalog + llms.txt drift check (scripts/gen-catalog.mjs --check): the generated
//      site/public/{catalog.json,evaluated.json,llms.txt} stay in sync with the registry,
//      the skills, and the recipes, so the machine-readable catalog cannot silently go stale.
```

- [ ] **Step 4: Run the full gate to verify it passes with the new layer**

Run: `node scripts/check.mjs`
Expected: every layer reports OK, including the new `catalog + llms.txt are up to date.`, and the process exits 0.

- [ ] **Step 5: Negative test - prove the layer bites**

Run:
```bash
node -e "const fs=require('fs');fs.writeFileSync('site/public/llms.txt',fs.readFileSync('site/public/llms.txt','utf8')+'\n<!-- drift -->\n')"
node scripts/check.mjs; echo "exit=$?"
git checkout -- site/public/llms.txt
node scripts/check.mjs; echo "exit=$?"
```
Expected: the first `check.mjs` fails with `stale: llms.txt ...` and `exit=1`; after `git checkout` restores the file, the second run is green with `exit=0`.

- [ ] **Step 6: Commit**

```bash
git add scripts/check.mjs
git commit -m "feat: gate catalog + llms.txt drift as check.mjs layer 8

Co-authored-by: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 4: CHANGELOG entry (no version bump)

**Files:**
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Read the top of the changelog**

Run: `sed -n '1,30p' CHANGELOG.md`
Expected: a `## [Unreleased]` section near the top (the project keeps one between releases). Note its exact heading and any existing sub-bullets.

- [ ] **Step 2: Add the entry under `[Unreleased]`**

Under the `## [Unreleased]` heading (creating an `### Added` subsection if the section's style uses them, otherwise matching the existing bullet style), add:

```markdown
- Machine-readable discovery for agents: generated `llms.txt` (the llmstxt.org index), `catalog.json` (the 69 invokable skills, tools, and recipes with routing and chaining fields), and `evaluated.json` (all 135 evaluated methods) at the site root, regenerated by `scripts/gen-catalog.mjs` and drift-gated as an 8th conformance-gate layer.
```

- [ ] **Step 3: Commit**

```bash
git add CHANGELOG.md
git commit -m "docs: changelog entry for llms.txt + machine-readable catalog

Co-authored-by: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 5: Full verification (gate, tests, build, guards, live URLs)

**Files:** none (verification only).

- [ ] **Step 1: Run the conformance gate**

Run: `node scripts/check.mjs`
Expected: all 8 layers pass, exit 0.

- [ ] **Step 2: Run the test suite**

Run: `npm test`
Expected: all suites pass, including `tests/gen-catalog.test.mjs` (6 tests). The count is the prior 43 plus the new file's tests.

- [ ] **Step 3: Build the site and confirm the files pass through to the root**

Run:
```bash
npm --prefix site run build
ls site/dist/llms.txt site/dist/catalog.json site/dist/evaluated.json
```
Expected: the build succeeds and all three files exist at `site/dist/` root (Astro copies `public/` verbatim).

- [ ] **Step 4: Confirm the link guards are unaffected**

Run:
```bash
node scripts/check-rendered-links.mjs site/dist
node scripts/check-route-parity.mjs site/dist
```
Expected: both PASS, unchanged (the new files are `.txt`/`.json`, not Astro routes, so neither guard inspects them).

- [ ] **Step 5: Spot-check that emitted URLs resolve in the build**

Run:
```bash
node -e "
const fs=require('fs'),path=require('path');
const c=require('./site/public/catalog.json'), e=require('./site/public/evaluated.json');
const base='https://product-on-purpose.github.io/thinking-framework-skills';
const toFile=(u)=> path.join('site/dist', u.replace(base,''),'index.html');
let bad=0;
for(const x of c.entries){ if(!fs.existsSync(toFile(x.url))){console.log('MISSING',x.url);bad++;} }
for(const m of e.methods){ if(m.url && !fs.existsSync(toFile(m.url))){console.log('MISSING',m.url);bad++;} }
console.log(bad? bad+' missing':'all catalog + evaluated URLs resolve in site/dist');
"
```
Expected: `all catalog + evaluated URLs resolve in site/dist` (0 missing). This double-checks, against the actual build, what the generator's route-manifest validation enforces.

- [ ] **Step 6: Push the branch and open the PR**

```bash
git push -u origin feat/llms-txt-catalog
gh pr create --fill --base main
```
Then confirm CI (the `check` job) is green on the PR before requesting merge. The PR body should note: no version bump (additive generated infra, rides the next release); 3 new generated public files; an 8th gate layer; guards and route-parity unaffected.

---

## Self-review (completed by the plan author)

- **Spec coverage:** generator (Task 1); three artifacts with the specified schemas (Task 1 code + Task 2 outputs); registry+SKILL+meta+workflows join (Task 1); URL validation against route-manifest (Task 1 `requireUrl`/`liveUrl`); gate layer 8 + header update (Task 3); npm script (Task 2); no-version-bump CHANGELOG (Task 4); guards-unaffected + build passthrough verification (Task 5). All spec sections map to a task.
- **Placeholder scan:** none. Every code and command step is concrete.
- **Type/name consistency:** the module exports `catalog`, `evaluated`, `llmsTxt`; the test imports exactly those. Field names (`invocation`, `mechanism`, `when_to_use`, `artifact`, `in_recipes`, `likely_companions`, `fold_into`) are identical across the generator, the test, and the spec. `liveUrl` returns null-or-string; `requireUrl` collects dead links and the build throws if any exist, so catalog/tool/recipe URLs are guaranteed non-null while `evaluated.methods[].url` may be null by design.
- **Deviation from spec, noted:** the `family` field uses the registry catalog family (not the coarser skill `metadata.family`) so the field and the llms.txt grouping share one taxonomy. Documented in the conventions section above.
```
