# CI Guards + Gate Hardening Implementation Plan (Plan 2 of 5)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four new conformance-gate guards (mermaid validity, canonical-link/no-redirect-hop, repo-markdown links, changelog version-consistency), fix the 5 advisor redirect-hop links the canonical guard requires, and reconcile the "how many checks" story across the docs - taking `scripts/check.mjs` from 9 to 13 layers atomically.

**Architecture:** Each guard follows the repo pattern: pure logic in `scripts/lib/*.mjs`, a `scripts/check-*.mjs` runner wired as a `check.mjs` layer, unit-tested in `tests/*.test.mjs` (run by the `guard-tests` job). The mermaid guard also runs post-build over generated site content in both CI workflows. The redirect map is extracted to a single-source module both `site/astro.config.mjs` and the canonical-link guard import (mirroring `scripts/site-base.mjs`).

**Tech Stack:** Node ESM (>=22.12.0), zero runtime deps, `node --test`, Astro Starlight.

**Spec:** `docs/internal/specs/2026-06-20-changelog-docs-audit-diagrams.md` (Workstream D + B1 + B5; codex Major-1/3/4, Minor-7).

## Global Constraints

- Node `>=22.12.0`; scripts are **zero-dependency**; explicit UTF-8; LF newlines.
- **No em-dashes or en-dashes** anywhere (use `-`).
- `BASE` is single-sourced from `scripts/site-base.mjs`; the redirect map becomes single-sourced from `scripts/site-redirects.mjs` (new).
- **Gate-count ripple is atomic:** all four guards are wired and every doc stating the layer count is updated to **13** in the same PR (the wiring/docs task), so no committed state claims the wrong number once the branch is opened for review. The pre-wiring tasks add scripts + tests but do NOT wire them into `check.mjs`.
- **B1 (fix the 5 advisor links) ships with D2 (Task 2)** - the canonical-link guard reds CI on those links otherwise.
- This plan lands in the **build phase**: record it in `CHANGELOG.md [Unreleased]`; **no version bump, no `RELEASE-NOTES.md` content change** (Release contract).
- Commit messages end with the two trailers:
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>` and `Claude-Session: https://claude.ai/code/session_01Re4ykqK5GHaeVvvS5P7boj`.

---

### Task 1: Mermaid validity guard (D1, unwired)

**Files:**
- Create: `scripts/lib/mermaid-lint.mjs`, `scripts/check-mermaid.mjs`
- Test: `tests/mermaid-lint.test.mjs`

**Interfaces:**
- Produces: `lintMermaidBlocks(text: string) => Array<{ line: number, message: string }>` - extracts every ` ```mermaid ` fenced block; flags an unclosed fence, an empty block (no content after skipping `%%`-directive/comment lines), or a first content token not in the recognized diagram-type list. `line` is the 1-based fence line.

- [ ] **Step 1: Write the failing tests**

```javascript
// tests/mermaid-lint.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lintMermaidBlocks } from '../scripts/lib/mermaid-lint.mjs';

test('valid graph block passes', () => {
  assert.deepEqual(lintMermaidBlocks('```mermaid\ngraph LR\n  A-->B\n```'), []);
});
test('init-directive then graph passes (directive line skipped)', () => {
  const md = '```mermaid\n%%{init: {"theme":"base"}}%%\ngraph TD\n  A-->B\n```';
  assert.deepEqual(lintMermaidBlocks(md), []);
});
test('timeline and sequenceDiagram pass', () => {
  assert.deepEqual(lintMermaidBlocks('```mermaid\ntimeline\n  title X\n```'), []);
  assert.deepEqual(lintMermaidBlocks('```mermaid\nsequenceDiagram\n  A->>B: hi\n```'), []);
});
test('unrecognized type is flagged', () => {
  const f = lintMermaidBlocks('```mermaid\ngrph LR\n  A-->B\n```');
  assert.equal(f.length, 1);
  assert.match(f[0].message, /unrecognized mermaid diagram type "grph"/);
});
test('empty block is flagged', () => {
  const f = lintMermaidBlocks('```mermaid\n\n```');
  assert.equal(f.length, 1);
  assert.match(f[0].message, /empty/);
});
test('unclosed fence is flagged', () => {
  const f = lintMermaidBlocks('```mermaid\ngraph LR\n  A-->B\n');
  assert.equal(f.length, 1);
  assert.match(f[0].message, /unclosed/);
});
test('non-mermaid fenced code is ignored', () => {
  assert.deepEqual(lintMermaidBlocks('```js\nconst x = 1;\n```'), []);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/mermaid-lint.test.mjs`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement `scripts/lib/mermaid-lint.mjs`**

```javascript
// scripts/lib/mermaid-lint.mjs
// Pure STRUCTURAL validator for mermaid code blocks (zero-dep). It catches the
// common breakage - an unclosed fence, an empty block, or an unrecognized
// diagram type - without a full semantic parse (semantic correctness of authored
// diagrams is verified at authoring time via the Mermaid MCP; this is the ongoing
// regression gate). Used by scripts/check-mermaid.mjs; tested in tests/.

const DIAGRAM_TYPES = new Set([
  'graph', 'flowchart', 'sequenceDiagram', 'stateDiagram-v2', 'stateDiagram',
  'classDiagram', 'erDiagram', 'journey', 'gantt', 'pie', 'timeline', 'mindmap',
  'quadrantChart', 'gitGraph', 'requirementDiagram', 'block-beta', 'sankey-beta',
  'xychart-beta', 'C4Context',
]);

export function lintMermaidBlocks(text) {
  const lines = text.split('\n');
  const findings = [];
  let i = 0;
  while (i < lines.length) {
    if (!/^\s*```+\s*mermaid\s*$/i.test(lines[i])) { i++; continue; }
    const fenceLine = i + 1; // 1-based
    let j = i + 1;
    const body = [];
    let closed = false;
    while (j < lines.length) {
      if (/^\s*```+\s*$/.test(lines[j])) { closed = true; break; }
      body.push(lines[j]);
      j++;
    }
    if (!closed) {
      findings.push({ line: fenceLine, message: 'unclosed ```mermaid fence' });
      break;
    }
    // first content token = first non-blank line that is not a %% directive or %% comment
    const firstContent = body.find((l) => {
      const t = l.trim();
      return t !== '' && !t.startsWith('%%');
    });
    if (firstContent === undefined) {
      findings.push({ line: fenceLine, message: 'empty mermaid block (no diagram content)' });
    } else {
      const token = firstContent.trim().split(/[\s({:;]/)[0];
      if (!DIAGRAM_TYPES.has(token)) {
        findings.push({ line: fenceLine, message: `unrecognized mermaid diagram type "${token}"` });
      }
    }
    i = j + 1;
  }
  return findings;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test tests/mermaid-lint.test.mjs`
Expected: PASS (7 tests).

- [ ] **Step 5: Implement the runner `scripts/check-mermaid.mjs`**

```javascript
#!/usr/bin/env node
// check-mermaid.mjs - validate every ```mermaid block in the given files/dirs.
// Usage: node scripts/check-mermaid.mjs <path> [<path>...]   (dirs walked for .md/.mdx)
// Exit 0 = all valid; 1 = one or more issues. Zero-dependency, UTF-8.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { lintMermaidBlocks } from './lib/mermaid-lint.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
function collect(paths, acc = []) {
  for (const p of paths) {
    let st; try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) {
      for (const e of readdirSync(p, { withFileTypes: true })) {
        if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
        const full = join(p, e.name);
        if (e.isDirectory()) collect([full], acc);
        else if (e.isFile() && ['.md', '.mdx'].includes(extname(e.name))) acc.push(full);
      }
    } else if (st.isFile() && ['.md', '.mdx'].includes(extname(p))) {
      acc.push(p);
    }
  }
  return acc;
}
const args = process.argv.slice(2);
if (!args.length) { console.error('check-mermaid: no paths given'); process.exit(2); }
const files = collect(args.map((a) => resolve(ROOT, a)));
let total = 0;
for (const f of files) {
  for (const x of lintMermaidBlocks(readFileSync(f, 'utf8'))) {
    console.error(`${f}:${x.line}: ${x.message}`);
    total++;
  }
}
if (total) { console.error(`\ncheck-mermaid: ${total} mermaid issue(s).`); process.exit(1); }
console.log(`check-mermaid: OK (${files.length} file(s) scanned, all mermaid blocks valid).`);
```

- [ ] **Step 6: Run it over the existing diagrams to confirm a clean baseline**

Run: `node scripts/check-mermaid.mjs README.md docs site/src/content/docs`
Expected: `check-mermaid: OK (...)`. (If it flags an existing diagram, that diagram is genuinely malformed - fix it and note it; the existing ones in `docs/architecture.md` and `README.md` start with `%%{init}%%` and must pass.)

- [ ] **Step 7: Commit**

```bash
git add scripts/lib/mermaid-lint.mjs scripts/check-mermaid.mjs tests/mermaid-lint.test.mjs
git commit -m "feat(gate): mermaid structural-validity guard (lib + runner + tests, unwired)"
```

---

### Task 2: Canonical-link guard + redirect SSOT + the 5 advisor link fixes (D2 + B1)

**Files:**
- Create: `scripts/site-redirects.mjs`, `scripts/check-canonical-links.mjs`
- Test: `tests/check-canonical-links.test.mjs`
- Modify: `site/astro.config.mjs` (import the redirect map instead of inlining it); `site/src/content/docs/index.mdx`, `start/getting-started.mdx`, `learn/index.mdx`, `learn/build-with-the-library.md`, `about/faq.md` (the 5 advisor links)

**Interfaces:**
- Produces: `REDIRECTS` (object: redirect source path -> destination) from `scripts/site-redirects.mjs`; `servedPath(relFromDocs: string, frontmatterSlug: string|null) => string` and `findRedirectHopLinks(...)` from the guard (exported for tests).

- [ ] **Step 1: Extract the redirect map to a single source**

Read `site/astro.config.mjs`, find the `redirects: { ... }` object literal. Create `scripts/site-redirects.mjs`:

```javascript
// scripts/site-redirects.mjs - single source for the site's redirect map (clause 14.7,
// mirroring scripts/site-base.mjs). site/astro.config.mjs and scripts/check-canonical-links.mjs
// both import this, so the compat redirects and the no-redirect-hop guard can never disagree.
// Keys are redirect SOURCE paths (root-absolute, trailing slash); values are destinations.
import { BASE } from './site-base.mjs';

export const REDIRECTS = {
  '/frameworks/think-framework-advisor/': `${BASE}/tools/think-framework-advisor/`,
  '/library/cynefin/': `${BASE}/library/complexity-domain-sort/`,
};
```

Then edit `site/astro.config.mjs` to import and use it: add `import { REDIRECTS } from '../scripts/site-redirects.mjs';` near the other imports, and replace the inline `redirects: { ... }` object with `redirects: REDIRECTS,`. (Preserve the explanatory comments above the redirects block.)

- [ ] **Step 2: Write the failing tests** (slug resolution is the codex Major-4 risk - test every form)

```javascript
// tests/check-canonical-links.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { servedPath, findRedirectHopLinks } from '../scripts/check-canonical-links.mjs';
import { REDIRECTS } from '../scripts/site-redirects.mjs';

test('servedPath: root index.mdx -> /', () => {
  assert.equal(servedPath('index.mdx', null), '/');
});
test('servedPath: directory index.md -> /dir/', () => {
  assert.equal(servedPath('about/index.md', null), '/about/');
});
test('servedPath: leaf .mdx -> /dir/leaf/', () => {
  assert.equal(servedPath('start/getting-started.mdx', null), '/start/getting-started/');
});
test('servedPath: frontmatter slug overrides the path', () => {
  assert.equal(servedPath('start/foo.md', 'custom/place'), '/custom/place/');
});
test('findRedirectHopLinks flags a link to a redirect source from the root page', () => {
  // root index.mdx links to the legacy advisor URL via a relative link
  const hops = findRedirectHopLinks('index.mdx', null, 'See [advisor](frameworks/think-framework-advisor/).', REDIRECTS);
  assert.equal(hops.length, 1);
  assert.equal(hops[0].redirectSource, '/frameworks/think-framework-advisor/');
});
test('findRedirectHopLinks ignores links to canonical (non-redirected) targets', () => {
  const hops = findRedirectHopLinks('index.mdx', null, 'See [advisor](tools/think-framework-advisor/).', REDIRECTS);
  assert.equal(hops.length, 0);
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `node --test tests/check-canonical-links.test.mjs`
Expected: FAIL (module not found).

- [ ] **Step 4: Implement `scripts/check-canonical-links.mjs`**

```javascript
#!/usr/bin/env node
// check-canonical-links.mjs - fail any committed hand-authored site page whose internal
// link targets a redirect SOURCE (a redirect-hop). Internal links should point at the
// canonical destination, not lean on a compat redirect meant for external bookmarks.
// Reads the single-source redirect map (scripts/site-redirects.mjs). check.mjs layer.
// Zero-dependency, UTF-8.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { REDIRECTS } from './site-redirects.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = resolve(ROOT, 'site', 'src', 'content', 'docs');

// Starlight slug rules: index files map to their dir; a leaf maps to /dir/leaf/;
// frontmatter `slug:` overrides. BASE is '' (root deploy), so paths are root-absolute.
export function servedPath(relFromDocs, frontmatterSlug) {
  if (frontmatterSlug != null) return '/' + frontmatterSlug.replace(/^\/+|\/+$/g, '') + '/';
  let p = relFromDocs.replace(/\\/g, '/').replace(/\.(md|mdx)$/i, '');
  p = p.replace(/(^|\/)index$/, '$1').replace(/\/+$/, '');
  return p === '' ? '/' : '/' + p + '/';
}

const EXTERNAL = /^(https?:|mailto:|tel:|ftp:|\/\/|#)/i;
const slugOf = (text) => { const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/); if (!m) return null; const s = m[1].match(/^slug:\s*(.+)$/m); return s ? s[1].trim().replace(/^["']|["']$/g, '') : null; };

// Return [{ href, resolved, redirectSource }] for links that resolve to a redirect source.
export function findRedirectHopLinks(relFromDocs, frontmatterSlug, body, redirects) {
  const pageUrl = servedPath(relFromDocs, frontmatterSlug);
  const sources = new Set(Object.keys(redirects));
  const hops = [];
  for (const m of body.matchAll(/(!?)\[[^\]]*\]\(([^)\s]+)\)/g)) {
    if (m[1] === '!') continue; // image
    const raw = m[2];
    if (EXTERNAL.test(raw)) continue;
    let resolved;
    try { resolved = new URL(raw.split('#')[0].split('?')[0], 'https://x' + pageUrl).pathname; } catch { continue; }
    if (!resolved.endsWith('/')) resolved += '/';
    if (sources.has(resolved)) hops.push({ href: raw, resolved, redirectSource: resolved });
  }
  return hops;
}

function collect(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) collect(full, acc);
    else if (e.isFile() && ['.md', '.mdx'].includes(extname(e.name))) acc.push(full);
  }
  return acc;
}

// Only scan committed (hand-authored) pages: generated dirs are gitignored and may be absent.
const GENERATED = new Set(['frameworks', 'families', 'recipes', 'evidence', 'library', 'tools', 'changelog']);
const findings = [];
let scanned = 0;
for (const file of (statSync(DOCS, { throwIfNoEntry: false }) ? collect(DOCS) : [])) {
  const rel = relative(DOCS, file).replace(/\\/g, '/');
  if (GENERATED.has(rel.split('/')[0]) && rel.split('/')[0] !== 'explore') continue; // skip generated trees
  scanned++;
  const text = readFileSync(file, 'utf8');
  for (const hop of findRedirectHopLinks(rel, slugOf(text), text, REDIRECTS)) {
    findings.push({ file, ...hop, canonical: REDIRECTS[hop.redirectSource] });
  }
}
if (findings.length) {
  for (const f of findings) console.error(`${f.file}: link "${f.href}" hits redirect source ${f.redirectSource} - point it at the canonical ${f.canonical}`);
  console.error(`\ncheck-canonical-links: ${findings.length} redirect-hop link(s).`);
  process.exit(1);
}
console.log(`check-canonical-links: OK (${scanned} hand-authored page(s); no internal link leans on a compat redirect).`);
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `node --test tests/check-canonical-links.test.mjs`
Expected: PASS (6 tests).

- [ ] **Step 6: Fix the 5 advisor links (B1)**

In each of these files, find the link to the advisor that uses the `frameworks/think-framework-advisor/` form and repoint it to the canonical `tools/think-framework-advisor/`, preserving the link's relative-depth style (e.g. `../../frameworks/think-framework-advisor/` -> `../../tools/think-framework-advisor/`):
- `site/src/content/docs/index.mdx` (around line 51)
- `site/src/content/docs/start/getting-started.mdx` (around line 32)
- `site/src/content/docs/learn/index.mdx` (around line 37)
- `site/src/content/docs/learn/build-with-the-library.md` (around line 18)
- `site/src/content/docs/about/faq.md` (around line 20)

Read each file, locate the link, repoint it. Do not change anything else.

- [ ] **Step 7: Run the guard against the real tree to confirm it now passes**

Run: `node scripts/check-canonical-links.mjs`
Expected: `check-canonical-links: OK (...)`. (If it still reports a hop, a link was missed - fix it.)

- [ ] **Step 8: Commit**

```bash
git add scripts/site-redirects.mjs scripts/check-canonical-links.mjs tests/check-canonical-links.test.mjs site/astro.config.mjs site/src/content/docs/index.mdx site/src/content/docs/start/getting-started.mdx site/src/content/docs/learn/index.mdx site/src/content/docs/learn/build-with-the-library.md site/src/content/docs/about/faq.md
git commit -m "feat(gate): canonical-link guard + redirect SSOT; repoint the 5 advisor links to /tools/"
```

---

### Task 3: Repo-markdown relative-link checker (D3, unwired)

**Files:**
- Create: `scripts/check-repo-links.mjs`
- Test: `tests/check-repo-links.test.mjs`
- Modify: any repo-browser doc with a broken relative link the guard surfaces (fix as part of this task)

**Interfaces:**
- Produces: `resolveRepoLink(fromFileAbs: string, href: string, repoRoot: string) => string|null` (the resolved absolute target path for a relative link, or null for external/anchor) and `findBrokenRepoLinks(fromFileAbs, body, repoRoot) => Array<{ href, resolved }>`.

- [ ] **Step 1: Write the failing tests**

```javascript
// tests/check-repo-links.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { findBrokenRepoLinks } from '../scripts/check-repo-links.mjs';

const TMP = join(process.cwd(), '.tmp-repo-links-test');
test('flags a relative link to a missing file, ignores external + existing', () => {
  rmSync(TMP, { recursive: true, force: true }); mkdirSync(join(TMP, 'docs'), { recursive: true });
  writeFileSync(join(TMP, 'docs', 'real.md'), '# real');
  const body = 'see [a](./real.md), [b](./missing.md), [c](https://x.com), [d](#anchor)';
  const broken = findBrokenRepoLinks(join(TMP, 'docs', 'from.md'), body, TMP);
  rmSync(TMP, { recursive: true, force: true });
  assert.deepEqual(broken.map((x) => x.href), ['./missing.md']);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test tests/check-repo-links.test.mjs` -> FAIL (module not found).

- [ ] **Step 3: Implement `scripts/check-repo-links.mjs`**

```javascript
#!/usr/bin/env node
// check-repo-links.mjs - assert every RELATIVE markdown link in the repo-browser docs
// resolves to a real file. The site has its own rendered-link guard; this is its repo-side
// analog (README, AGENTS, INDEX, CHANGELOG, RELEASE-NOTES, docs/**). #anchors are advisory.
// Zero-dependency, UTF-8. check.mjs layer.
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, extname, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const EXTERNAL = /^(https?:|mailto:|tel:|ftp:|\/\/|#)/i;

export function findBrokenRepoLinks(fromFileAbs, body, repoRoot) {
  const out = [];
  let inFence = false, fenceChar = '';
  for (const line of body.split('\n')) {
    const f = line.match(/^\s*(```+|~~~+)/);
    if (f) { const c = f[1][0]; if (!inFence) { inFence = true; fenceChar = c; } else if (c === fenceChar) { inFence = false; } continue; }
    if (inFence) continue;
    for (const m of line.matchAll(/(!?)\[[^\]]*\]\(([^)\s]+)\)/g)) {
      const raw = m[2];
      if (EXTERNAL.test(raw)) continue;
      const rel = raw.split('#')[0].split('?')[0];
      if (!rel) continue; // pure anchor
      const target = resolve(dirname(fromFileAbs), rel);
      // a link may point at a dir or a file; accept either existing
      const ok = existsSync(target) || existsSync(target + '.md');
      if (!ok) out.push({ href: raw, resolved: relative(repoRoot, target) });
    }
  }
  return out;
}

const TARGETS = ['README.md', 'AGENTS.md', 'INDEX.md', 'CHANGELOG.md', 'RELEASE-NOTES.md'];
function walkDocs(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) walkDocs(full, acc);
    else if (e.isFile() && extname(e.name) === '.md') acc.push(full);
  }
  return acc;
}
// Only this repo's authored docs: skip generated eval JSON (not .md) and node_modules implicitly.
const files = [...TARGETS.map((t) => resolve(ROOT, t)).filter((p) => existsSync(p)), ...walkDocs(resolve(ROOT, 'docs'))];
const findings = [];
for (const file of files) for (const b of findBrokenRepoLinks(file, readFileSync(file, 'utf8'), ROOT)) findings.push({ file, ...b });
if (findings.length) {
  for (const f of findings) console.error(`${relative(ROOT, f.file)}: broken relative link "${f.href}" -> ${f.resolved}`);
  console.error(`\ncheck-repo-links: ${findings.length} broken relative link(s).`);
  process.exit(1);
}
console.log(`check-repo-links: OK (${files.length} doc(s); all relative links resolve).`);
```

- [ ] **Step 4: Run tests, then run the guard over the real repo**

Run: `node --test tests/check-repo-links.test.mjs` (PASS), then `node scripts/check-repo-links.mjs`.
Expected: ideally OK. If it surfaces pre-existing broken relative links in the repo docs, FIX each (read the doc, repoint or remove the dead link) - this is part of the task. If a finding is a false positive (e.g. a deliberately non-resolving placeholder), note it and adjust the guard's scope minimally rather than silencing it broadly. Record what you fixed in the report.

- [ ] **Step 5: Commit**

```bash
git add scripts/check-repo-links.mjs tests/check-repo-links.test.mjs
# plus any docs you fixed
git commit -m "feat(gate): repo-markdown relative-link checker (+ fix surfaced broken links)"
```

---

### Task 4: Changelog version-consistency lint + changelog-lib hardening (D4 + Plan-1 deferred Minors)

**Files:**
- Create: `scripts/check-changelog.mjs`
- Test: `tests/check-changelog.test.mjs`
- Modify: `scripts/lib/changelog-lib.mjs` (harden the two deferred regex edges) and `tests/changelog-lib.test.mjs` (negative tests + the ftp/header items)

**Interfaces:**
- Produces: `topReleasedVersion(changelogMd) => string` (the first `## [x.y.z]` skipping `[Unreleased]`), `topReleaseNotesVersion(releaseNotesMd) => string`, and a `verify(...)` that the four versions agree.

- [ ] **Step 1: Write the failing tests**

```javascript
// tests/check-changelog.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { topReleasedVersion, topReleaseNotesVersion } from '../scripts/check-changelog.mjs';

test('topReleasedVersion skips [Unreleased] and returns the first released version', () => {
  const md = '# Changelog\n\n## [Unreleased]\n- x\n\n## [0.11.0] - 2026-06-19\n- y\n';
  assert.equal(topReleasedVersion(md), '0.11.0');
});
test('topReleaseNotesVersion reads the first ## vX.Y.Z', () => {
  assert.equal(topReleaseNotesVersion('# Release notes\n\n## v0.11.0\n\nbody'), '0.11.0');
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test tests/check-changelog.test.mjs` -> FAIL.

- [ ] **Step 3: Implement `scripts/check-changelog.mjs`**

```javascript
#!/usr/bin/env node
// check-changelog.mjs - release-doc consistency (D4). Asserts CHANGELOG.md parses to
// >=1 released version, has [Unreleased], and that the top RELEASED version equals
// package.json, library.json, and the top RELEASE-NOTES version. [Unreleased] is exempt,
// so build-phase PRs (which only touch [Unreleased]) stay green. No git tags (avoids the
// actions/checkout shallow-fetch foot-gun). Zero-dependency, UTF-8. check.mjs layer.
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(resolve(ROOT, p), 'utf8');
const norm = (v) => v.replace(/^v/, '').replace(/^\[|\]$/g, '').trim();

export function topReleasedVersion(md) {
  for (const m of md.matchAll(/^##\s+\[([^\]]+)\]/gm)) {
    if (/unreleased/i.test(m[1])) continue;
    const v = norm(m[1]);
    if (/^\d+\.\d+\.\d+$/.test(v)) return v;
  }
  return null;
}
export function topReleaseNotesVersion(md) {
  const m = md.match(/^##\s+v?(\d+\.\d+\.\d+)/m);
  return m ? m[1] : null;
}

// Run as a script (not when imported by tests)
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const changelog = read('CHANGELOG.md');
  const errors = [];
  if (!/##\s+\[unreleased\]/i.test(changelog)) errors.push('CHANGELOG.md is missing an [Unreleased] section');
  const cl = topReleasedVersion(changelog);
  if (!cl) errors.push('CHANGELOG.md has no released ## [x.y.z] section');
  const pkg = JSON.parse(read('package.json')).version;
  const lib = JSON.parse(read('library.json')).version;
  const rn = topReleaseNotesVersion(read('RELEASE-NOTES.md'));
  const all = { 'package.json': pkg, 'library.json': lib, 'CHANGELOG top released': cl, 'RELEASE-NOTES top': rn };
  const distinct = [...new Set(Object.values(all))];
  if (distinct.length > 1) errors.push(`version mismatch: ${JSON.stringify(all)}`);
  if (errors.length) { for (const e of errors) console.error(`check-changelog: ${e}`); process.exit(1); }
  console.log(`check-changelog: OK (all at ${pkg}; [Unreleased] present).`);
}
```

- [ ] **Step 4: Run tests, then the guard on the real tree**

Run: `node --test tests/check-changelog.test.mjs` (PASS), then `node scripts/check-changelog.mjs`.
Expected: `check-changelog: OK (all at 0.11.0; [Unreleased] present).`

- [ ] **Step 5: Harden `scripts/lib/changelog-lib.mjs` (close the Plan-1 deferred Minors) + add negative tests**

In `changelog-lib.mjs`: (a) in `rewriteLinks`, tighten the reference-definition regex's leading-indent from `\s*` to `{0,3} spaces` per CommonMark - change `/^(\s*\[[^\]]+\]:\s*)(\S+)(.*)$/` to `/^( {0,3}\[[^\]]+\]:\s*)(\S+)(.*)$/`; (b) in `extractReleaseTimeline`, make the version-heading brackets paired rather than independently optional - change `/^##\s+\[?v?(\d+\.\d+\.\d+)\]?\s*$/` to `/^##\s+(?:\[v?(\d+\.\d+\.\d+)\]|v?(\d+\.\d+\.\d+))\s*$/` and read the version from whichever group matched (`m[1] || m[2]`).

Add to `tests/changelog-lib.test.mjs`: a top-of-file comment `// tests/changelog-lib.test.mjs`; an `ftp://` pass-through assertion in the external-links test; a negative test that a malformed `## [0.11.0` (open bracket, no close) does NOT produce a timeline row; and a test that a 4-space-indented `    [a]: docs/x.md` is left unrewritten.

- [ ] **Step 6: Run the full changelog-lib suite**

Run: `node --test tests/changelog-lib.test.mjs`
Expected: all pass (existing 11 + the new negative/edge tests).

- [ ] **Step 7: Commit**

```bash
git add scripts/check-changelog.mjs tests/check-changelog.test.mjs scripts/lib/changelog-lib.mjs tests/changelog-lib.test.mjs
git commit -m "feat(gate): changelog version-consistency lint; harden changelog-lib edges + negative tests"
```

---

### Task 5: Wire all 4 guards into `check.mjs` + the gate-count ripple (9 -> 13) + B5 reconciliation

**Files:**
- Modify: `scripts/check.mjs` (add 4 layers + update the header), `docs/architecture.md` (count + list + build-time guards), `docs/conformance.md` (canonical layer enumeration + G1-G7 cross-reference), `docs/contributing.md` (the gate-layer list), `README.md` (qualitative gate mention linking conformance.md)

**Interfaces:**
- Consumes: the four `scripts/check-*.mjs` from Tasks 1-4.

- [ ] **Step 1: Wire the 4 layers into `scripts/check.mjs`**

After the existing contested-lens layer (layer 9) `spawnSync`, add four more, mirroring the existing pattern (each prints a header then spawns; the repo-doc/site globs for mermaid match Task 1's runner). For check-mermaid, scan repo docs + committed site content:

```javascript
console.log('\nRunning mermaid structural-validity check (scripts/check-mermaid.mjs)\n');
const mermaid = spawnSync('node', [resolve(ROOT, 'scripts', 'check-mermaid.mjs'), 'README.md', 'AGENTS.md', 'docs', 'site/src/content/docs'], { cwd: ROOT, stdio: 'inherit' });

console.log('\nRunning canonical-link (no redirect-hop) check (scripts/check-canonical-links.mjs)\n');
const canonical = spawnSync('node', [resolve(ROOT, 'scripts', 'check-canonical-links.mjs')], { stdio: 'inherit' });

console.log('\nRunning repo-markdown relative-link check (scripts/check-repo-links.mjs)\n');
const repoLinks = spawnSync('node', [resolve(ROOT, 'scripts', 'check-repo-links.mjs')], { stdio: 'inherit' });

console.log('\nRunning changelog version-consistency check (scripts/check-changelog.mjs)\n');
const changelog = spawnSync('node', [resolve(ROOT, 'scripts', 'check-changelog.mjs')], { stdio: 'inherit' });
```

Then fold their statuses into the final exit:

```javascript
process.exit((structural.status ?? 1) || (evalCases.status ?? 1) || (registry.status ?? 1) || (engine.status ?? 1) || (agents.status ?? 1) || (counts.status ?? 1) || (coverage.status ?? 1) || (catalog.status ?? 1) || (contested.status ?? 1) || (mermaid.status ?? 1) || (canonical.status ?? 1) || (repoLinks.status ?? 1) || (changelog.status ?? 1));
```

Update the header comment block: change "It runs nine layers" to "It runs thirteen layers" and append entries 10-13 (mermaid validity; canonical-link; repo-markdown links; changelog version-consistency) to the enumerated list.

- [ ] **Step 2: Update `docs/architecture.md`**

- Line ~100: "It runs nine layers in order" -> "It runs thirteen layers in order"; add numbered entries 10-13 describing the four new guards.
- Line ~112: "two build-time guards run after `astro build`" -> "three build-time guards" and add the generated-content mermaid validation alongside rendered-links and route-parity.

- [ ] **Step 3: Reconcile the "how many checks" story (B5)**

- `docs/conformance.md`: add a short section (or paragraph) that is the canonical enumeration of the 13 `check.mjs` layers, and a cross-reference clarifying that these are distinct from the toolkit's frozen **G1-G7** Gold requirements (the repo gate vs the Standard's tier checks - not the same list).
- `docs/contributing.md` (around line 30): replace the partial "structural, eval-cases, registry, and engine-drift layers" list with the full current set (or state "the 13-layer `check.mjs` gate; see conformance.md" rather than a partial enumeration that re-drifts).
- `README.md`: add a one-line qualitative mention of the conformance gate that links to `docs/conformance.md` (no new hard-count denormalization in the README).

- [ ] **Step 4: Run the full 13-layer gate**

Run: `node scripts/check.mjs`
Expected: runs 13 layers; 0 errors (pre-existing description-score warnings are fine). If `check-repo-links` or `check-canonical-links` reds, fix the surfaced issue (it is a real one).

- [ ] **Step 5: Commit**

```bash
git add scripts/check.mjs docs/architecture.md docs/conformance.md docs/contributing.md README.md
git commit -m "feat(gate): wire the 4 new guards into check.mjs (9 -> 13 layers); reconcile the gate docs"
```

---

### Task 6: Add the generated-content mermaid step to both CI workflows

**Files:**
- Modify: `.github/workflows/ci.yml` (the `site-build` job), `.github/workflows/deploy-pages.yml` (the build job)

**Interfaces:**
- Consumes: `scripts/check-mermaid.mjs` (Task 1).

- [ ] **Step 1: Add the post-build mermaid step to `ci.yml`**

In the `site-build` job, after the two existing guard steps (rendered-links, route-parity), add a step that validates mermaid in the generated site content (run after `npm run build`, which regenerates it), gated like the others on the build outcome:

```yaml
      - name: Check mermaid diagrams in generated site content
        if: ${{ !cancelled() && steps.build.outcome == 'success' }}
        run: node ../scripts/check-mermaid.mjs src/content/docs
```

- [ ] **Step 2: Add the same step to `deploy-pages.yml`**

Add the identical step to the deploy build job after its two guard steps. Update the comment that says "Same two guards as the PR `site-build` job" to "Same three guards ..." in both files (codex Major-3).

- [ ] **Step 3: Verify the workflows are well-formed**

Run: `node -e "const f=require('fs');for(const p of ['.github/workflows/ci.yml','.github/workflows/deploy-pages.yml']){const s=f.readFileSync(p,'utf8');if(!s.includes('check-mermaid.mjs'))throw new Error('mermaid step missing in '+p);if(/Same two guards/.test(s))throw new Error('stale two-guards comment in '+p);}console.log('OK: mermaid step in both workflows; comments updated')"`
(If `require` is unavailable in this ESM project, read both files and confirm by eye.)
Expected: `OK: ...`.

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/ci.yml .github/workflows/deploy-pages.yml
git commit -m "ci(gate): validate generated-content mermaid in both CI workflows (two -> three build guards)"
```

---

### Task 7: CHANGELOG [Unreleased] entry + final whole-tree verification

**Files:**
- Modify: `CHANGELOG.md` (`[Unreleased]` -> add an `### Added` bullet under the existing one)

- [ ] **Step 1: Record the CI guards in `CHANGELOG.md [Unreleased]`**

Add a bullet to the `### Added` subsection under `## [Unreleased]` (it already has the changelog-feature bullet from Plan 1):

```markdown
- **Four new conformance-gate guards (the gate goes 9 -> 13 layers).** A mermaid structural-validity check (`scripts/check-mermaid.mjs`, also run post-build over the generated site in both CI workflows), a canonical-link / no-redirect-hop check (`scripts/check-canonical-links.mjs`, reading the new single-source `scripts/site-redirects.mjs`), a repo-markdown relative-link check (`scripts/check-repo-links.mjs`), and a changelog version-consistency lint (`scripts/check-changelog.mjs`, asserting `package.json` = `library.json` = top released `CHANGELOG.md` = top `RELEASE-NOTES.md`, with `[Unreleased]` exempt). The 5 advisor links now point at the canonical `/tools/` URL instead of leaning on the compat redirect, and the "how many checks" story is reconciled across `docs/architecture.md`, `docs/conformance.md`, and `docs/contributing.md`. Part of the v0.12.0 docs effort (build phase).
```

- [ ] **Step 2: Full verification (the whole gate + tests + build)**

Run, in order:
- `npm test` (all suites pass, including the new guard tests)
- `node scripts/check.mjs` (13 layers, 0 errors)
- `cd site && npm run build` (succeeds), then `STRICT_ANCHORS=1 node ../scripts/check-rendered-links.mjs dist` (0 broken), `node ../scripts/check-route-parity.mjs dist` (no removed routes), and `node ../scripts/check-mermaid.mjs src/content/docs` (0 issues).

Record the outputs in the report. All must pass before the task is done.

- [ ] **Step 3: Commit**

```bash
git add CHANGELOG.md
git commit -m "docs: record the 4 new gate guards in CHANGELOG [Unreleased]"
```

---

## Self-Review

- **Spec coverage:** D1 (Task 1 + the workflow step in Task 6), D2 + B1 (Task 2), D3 (Task 3), D4 + Plan-1-deferred Minors (Task 4), gate ripple 9->13 + B5 (Task 5), both workflows updated (Task 6, codex Major-3), CHANGELOG [Unreleased] (Task 7). Redirect SSOT extraction (codex), slug-resolver unit tests (codex Major-4), library.json in the version lint (codex Major-1), first-content-token skips `%%` + scans `.mdx` (codex Minor-7) - all covered.
- **Out of scope here:** the conformance-gate mermaid DIAGRAM (#1) is Plan 4 (it cites this plan's final 13-layer count); the version bump / RELEASE-NOTES / tag is the Plan 5 capstone.
- **Type consistency:** `lintMermaidBlocks`, `servedPath`/`findRedirectHopLinks`, `findBrokenRepoLinks`, `topReleasedVersion`/`topReleaseNotesVersion` signatures match between their defining tasks and their callers (the runners + check.mjs).
- **Ordering:** B1 (Task 2) ships with D2 in the same task; the doc count updates (Task 5) come after all 4 guards exist; the workflow step (Task 6) after the runner exists; CHANGELOG entry (Task 7) last.
- **Placeholders:** none; guard code and test code are complete, doc edits specify exact locations + content.

## Execution Handoff

Plan 2 of 5. After this lands (its own PR, recorded in `[Unreleased]`), the gate is 13 layers and the docs agree. Plans 3 (audit fixes) and 4 (diagrams - including the conformance-gate diagram that cites the 13-layer count) can then proceed; Plan 5 is the v0.12.0 cut.
