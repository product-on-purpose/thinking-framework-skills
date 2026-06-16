# Custom Domain Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve the docs site from the root of the custom domain `thinking-framework-skills.productonpurpose.com` instead of the GitHub Pages project subpath `product-on-purpose.github.io/thinking-framework-skills`.

**Architecture:** A host + base change. The single-source base literal (`scripts/site-base.mjs`) becomes empty (root); `astro.config.mjs` gets the new `site` and `base: BASE || '/'`; `package.json` `homepage` (the catalog generator's origin source) moves to the new root origin; a committed `site/public/CNAME` auto-configures GitHub Pages on deploy; the generated discovery artifacts are regenerated; the base-pinned guard test is updated; public-facing prose URLs are swept.

**Tech Stack:** Astro + Starlight, Node ESM generators (`gen-catalog.mjs`, `gen-site.mjs`), GitHub Pages via GitHub Actions, zero-dep conformance gate (`check.mjs`).

**Spec:** `docs/internal/specs/2026-06-16-custom-domain.md`

**Execution note:** This is ~7 tightly-coupled edits plus regenerate that must build together; executing inline (not subagent-per-task) is the pragmatic choice. Commit per task. Do NOT merge - the merge is gated on the external DNS step (spec section 6).

---

### Task 1: Add the CNAME passthrough file

**Files:**
- Create: `site/public/CNAME`

- [ ] **Step 1: Create the file**

Single line, no trailing content (Astro copies `public/` verbatim to `dist/`):

```text
thinking-framework-skills.productonpurpose.com
```

- [ ] **Step 2: Commit**

```bash
git add site/public/CNAME
git commit -m "chore(site): add CNAME for custom domain"
```

---

### Task 2: Move the single-source base to root

**Files:**
- Modify: `scripts/site-base.mjs:22` (the `export const BASE`) and its doc comment

- [ ] **Step 1: Change the literal and comment**

Replace the export line:

```js
export const BASE = '/thinking-framework-skills';
```

with:

```js
export const BASE = '';
```

Update the comment block above it so it describes the root deploy: the site is now
served at `https://thinking-framework-skills.productonpurpose.com/` (a root-served
custom domain), so the base is the empty string. Keep the "single source / two
consumers / sanctioned exceptions" explanation. Note that `BASE` is concatenated as
a string prefix (`${BASE}/path`, `BASE + '/'`), which is why root is `''` not `'/'`.

- [ ] **Step 2: Commit**

```bash
git add scripts/site-base.mjs
git commit -m "chore(site): base is empty (root) for the custom domain"
```

---

### Task 3: Update Astro `site` and `base`

**Files:**
- Modify: `site/astro.config.mjs:30-31` (`site` + `base`) and the redirect comment at `:32-41`

- [ ] **Step 1: Change `site` and `base`**

Replace:

```js
  site: 'https://product-on-purpose.github.io',
  base: BASE,
```

with:

```js
  site: 'https://thinking-framework-skills.productonpurpose.com',
  base: BASE || '/',
```

The redirect line stays `'/frameworks/think-framework-advisor/': `${BASE}/tools/think-framework-advisor/`,` - with `BASE=''` it now evaluates to `/tools/think-framework-advisor/`, which is correct for root. Lightly update the redirect comment to note that BASE is now empty (root), so the destination is already root-absolute.

- [ ] **Step 2: Sanity-check the redirect value**

Run:

```bash
node -e "import('./scripts/site-base.mjs').then(m => console.log(JSON.stringify(m.BASE + '/tools/think-framework-advisor/')))"
```

Expected: `"/tools/think-framework-advisor/"` (no leading `//`).

- [ ] **Step 3: Commit**

```bash
git add site/astro.config.mjs
git commit -m "chore(site): point Astro site at the custom domain, base at root"
```

---

### Task 4: Move the catalog origin (`package.json` homepage)

**Files:**
- Modify: `package.json:8` (`homepage`)

- [ ] **Step 1: Change homepage**

Replace:

```json
  "homepage": "https://product-on-purpose.github.io/thinking-framework-skills/",
```

with:

```json
  "homepage": "https://thinking-framework-skills.productonpurpose.com/",
```

(`gen-catalog.mjs:98` does `pkg.homepage.replace(/\/$/, '')`, so the trailing slash is fine.)

- [ ] **Step 2: Commit**

```bash
git add package.json
git commit -m "chore: homepage -> custom domain (catalog origin source)"
```

---

### Task 5: Update the passthrough robots.txt sitemap URL

**Files:**
- Modify: `site/public/robots.txt:4`

- [ ] **Step 1: Change the sitemap line**

Replace:

```text
Sitemap: https://product-on-purpose.github.io/thinking-framework-skills/sitemap-index.xml
```

with:

```text
Sitemap: https://thinking-framework-skills.productonpurpose.com/sitemap-index.xml
```

- [ ] **Step 2: Commit**

```bash
git add site/public/robots.txt
git commit -m "chore(site): robots.txt sitemap -> custom domain"
```

---

### Task 6: Update the base-pinned guard test

**Files:**
- Modify: `tests/check-rendered-links.test.mjs:24` (the pinned `BASE`) and the comment at `:18-20`

- [ ] **Step 1: Change the pinned value**

Replace:

```js
const BASE = "/thinking-framework-skills";
```

with:

```js
const BASE = "";
```

Update the comment (lines 18-20) so it still reads true: BASE is value-pinned to the
configured base, which is now the empty string (root deploy); it must equal what
`scripts/site-base.mjs` exports or the fixtures will not line up with the guard's resolver.

- [ ] **Step 2: Run the guard test to verify it passes with the new base**

Run:

```bash
node --test tests/check-rendered-links.test.mjs
```

Expected: all tests pass. (The fixtures build hrefs as `${BASE}/overview/` = `/overview/`, and the guard resolves them under the empty base.)

- [ ] **Step 3: Commit**

```bash
git add tests/check-rendered-links.test.mjs
git commit -m "test: pin rendered-link guard base to root"
```

---

### Task 7: Regenerate the discovery artifacts

**Files:**
- Modify (generated): `site/public/catalog.json`, `site/public/evaluated.json`, `site/public/llms.txt`

- [ ] **Step 1: Regenerate**

Run:

```bash
node scripts/gen-catalog.mjs
```

- [ ] **Step 2: Verify the new origin landed and no base segment remains**

Run:

```bash
node -e "const c=require('./site/public/catalog.json'); console.log(c.site); console.log(c.entries[0].url)"
grep -c 'product-on-purpose.github.io' site/public/catalog.json site/public/evaluated.json site/public/llms.txt
```

Expected: `c.site` is `https://thinking-framework-skills.productonpurpose.com/`; the first entry URL starts with that origin and has no `/thinking-framework-skills/` segment; the grep counts are all `0`.

- [ ] **Step 3: Verify the drift gate is satisfied**

Run:

```bash
node scripts/gen-catalog.mjs --check
```

Expected: exit 0, "catalog + llms.txt are up to date".

- [ ] **Step 4: Commit**

```bash
git add site/public/catalog.json site/public/evaluated.json site/public/llms.txt
git commit -m "chore(site): regenerate discovery artifacts for the custom domain"
```

---

### Task 8: Sweep the public-facing prose URLs

**Files:**
- Modify: `README.md`, `docs/getting-started.md`, `docs/README.md`, `docs/architecture.md`, `docs/concepts.md`

- [ ] **Step 1: Targeted substring replace**

In each file, replace every occurrence of the substring
`product-on-purpose.github.io/thinking-framework-skills` with
`thinking-framework-skills.productonpurpose.com`. The path tail after it
(`/frameworks/...`, `/recipes/...`, etc.) is identical, so the result is a correct
new-domain URL. Do NOT touch `github.com/product-on-purpose/thinking-framework-skills`
(the repo URL, a different host - it must not match).

- [ ] **Step 2: Verify no stray live-doc references remain**

Run:

```bash
grep -rn 'product-on-purpose.github.io/thinking-framework-skills' README.md docs/getting-started.md docs/README.md docs/architecture.md docs/concepts.md
```

Expected: no output. (CHANGELOG.md, RELEASE-NOTES.md, and prior internal specs/plans are intentionally left as historical records; their old URLs auto-redirect.)

- [ ] **Step 3: Commit**

```bash
git add README.md docs/getting-started.md docs/README.md docs/architecture.md docs/concepts.md
git commit -m "docs: point public-facing URLs at the custom domain"
```

---

### Task 9: Full verification

**Files:** none (verification only)

- [ ] **Step 1: Build the site**

Run:

```bash
cd site && npm run build && cd ..
```

Expected: build succeeds, ~207 pages, the three `public/` files pass through to `site/dist/`.

- [ ] **Step 2: Rendered-link guard (the load-bearing check for empty base)**

Run:

```bash
STRICT_ANCHORS=1 node scripts/check-rendered-links.mjs site/dist
```

Expected: 0 broken links; the log prints `Base (single source, scripts/site-base.mjs):` with an empty value.

- [ ] **Step 3: Route-parity guard**

Run:

```bash
node scripts/check-route-parity.mjs site/dist
```

Expected: parity holds (route-manifest is base-less, so it is unchanged).

- [ ] **Step 4: Full conformance gate + tests + recommendable drift**

Run:

```bash
node scripts/check.mjs && npm test && node scripts/gen-recommendable.mjs --check
```

Expected: `check.mjs` rc=0 (8 layers, layer 8 green); all tests pass; recommendable up to date.

- [ ] **Step 5: Confirm dist/CNAME is present**

Run:

```bash
cat site/dist/CNAME
```

Expected: `thinking-framework-skills.productonpurpose.com`.

---

### Task 10: Push the branch and open the PR (do NOT merge)

**Files:** none

- [ ] **Step 1: Commit the spec and plan if not already**

```bash
git add docs/internal/specs/2026-06-16-custom-domain.md docs/internal/plans/2026-06-16-custom-domain.md
git commit -m "docs: spec + plan for the custom-domain migration"
```

- [ ] **Step 2: Push and open the PR**

```bash
git push -u origin chore/custom-domain
gh pr create --title "chore: serve docs site from thinking-framework-skills.productonpurpose.com" --body "<summary + the spec's rollout section: DNS first, then merge auto-configures the domain via CNAME; HTTPS after cert>"
```

- [ ] **Step 3: Report status and hand off the merge**

Wait for CI (check, guard-tests, recommendable-drift, site-build). Report the PR
URL and the 3 external steps (DNS, merge, enforce HTTPS). Do NOT merge - it is
gated on the maintainer setting DNS first (spec section 6).

---

## Self-Review

- **Spec coverage:** every file in spec section 4 has a task (CNAME=T1, site-base=T2, astro.config=T3, homepage=T4, robots=T5, test=T6, generated artifacts=T7, prose=T8); verification (spec section 5) = T9; rollout handoff (spec section 6) = T10.
- **Placeholder scan:** the only `<...>` is the PR body text in T10, intentionally composed at author time from the spec's rollout section.
- **Consistency:** `BASE = ''` is used identically in T2 (source), T3 (`BASE || '/'`), and T6 (pinned test); the origin string `thinking-framework-skills.productonpurpose.com` is identical across T1/T3/T4/T5/T7/T8.
