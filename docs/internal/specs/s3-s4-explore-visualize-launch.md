# Spec: S3 + S4 - exploration, visualization, and launch polish

> **Type:** build spec (the docs-site S3 exploration/visualization phase and the S4 launch-polish phase, built together).
> **Status:** proposed, ready to build. Four scope decisions taken by the maintainer (below).
> **Author:** product-on-purpose - **Drafted:** 2026-06-01 - **Builds on:** S0-S2 (the site in `site/`, the generated view via `scripts/gen-site.mjs`).

---

## 1. Purpose

S2 made the library learnable. S3 makes it **findable five ways** (the plan's exploration goal) and gives it the "you are here" visuals. S4 is launch polish: analytics, versioning, a 404, accessibility, and meta. Both phases ship before the go-public flip.

## 2. Decisions (taken)

1. **Chooser = interactive JS widget.** A client-side filter: pick context tags and the framework list narrows live. Progressive-enhancement (works without JS by showing all; filters with JS).
2. **Visualization depth = library maps + recipe flows** (generated). Defer the 31 per-framework artifact diagrams and the beginner concept diagrams as additive-later.
3. **Analytics = Google Analytics (GA4)**, injected via Starlight `head`, gated on a `PUBLIC_GA_ID` env var so it only loads when the ID is set (at go-public). A consent-banner is a documented follow-up depending on audience.
4. **Versioning = starlight-versions, wired now, archive deferred.** Configure `current: { label: 'v0.1.0' }` and no archived snapshot yet (the plugin archives the *current generated* docs into a committed frozen copy on dev-server start, which is backwards with one pre-release version on a generated site). The first real archive happens at the v0.2 release. This honors "set up now" (the plumbing + version label ship) without freezing a redundant copy.

## 3. Data sources (robust fields only)

The `skill.meta.yml` sidecars are the engine, but only the **consistently-formatted** fields are used, to keep the dependency-free generator robust:

| Field | Format | Used for |
|---|---|---|
| `metadata.evidence-tier` (SKILL.md) | scalar | by-evidence lens, map colors, widget |
| `metadata.family` (SKILL.md) | scalar | by-job lens (via family->job map), map clusters, widget |
| `problem_contexts` (sidecar) | inline array | by-context lens, widget filter tags |
| `thinking_modes` (sidecar) | inline array | widget secondary tags |
| `primary_artifact_type` (sidecar) | scalar (comment-stripped) | by-artifact lens, widget |
| `library.json` families | - | all-frameworks map |
| `_workflows/*.md` `steps` | list | recipe flow diagrams |
| lifecycle family order (gen-site const) | - | family-relationship map |

**Not used:** the relationship fields (`complements`, `likely_companions`, `often_follows`) are inline on some skills and block-style on others; parsing them robustly needs a real YAML parser, out of scope. The family-relationship map uses the deterministic lifecycle order instead.

## 4. S3 deliverables

### 4.1 Exploration lenses (generated, under `explore/`)
Four re-sort pages, each a grouped table with tier badges and links:
- **`explore/by-job.md`** - frameworks grouped by verb-job (Reframe, Generate, See-from-other-angles, Trace-consequences, Challenge, Clarify, Decide, Anticipate-risk, Synthesize, Reflect), mapped from family via a generator `JOB_OF` table.
- **`explore/by-evidence.md`** - grouped by tier (S, M, P, then the rest), strong-evidence core first.
- **`explore/by-artifact.md`** - grouped/sorted by the deliverable each produces.
- **`explore/by-context.md`** - grouped by `problem_contexts` tag (high-stakes, high-ambiguity, high-complexity, high-conflict, high-friction, and the long tail).

### 4.2 Visualizations (generated mermaid, each with a text fallback)
- **`explore/map.mdx`** - the all-frameworks map: 10 families as mermaid subgraphs, frameworks as nodes, tier as node class (color). Plus the family-relationship map: the lifecycle flow (Problem Framing -> Divergent Ideation -> ... -> Meta-Thinking). Below each diagram, a text-equivalent list (accessibility). Mermaid validity is verified (MCP validator or browser render).
- **Recipe flow diagrams** - each generated recipe page gets a mermaid flowchart of its step sequence (the `steps` list), above the existing numbered list (which is the text fallback).

### 4.3 The chooser (interactive)
- **`src/components/Chooser.astro`** (committed) - renders every framework as a card with `data-*` attributes (family, tier, contexts), plus filter controls (context-tag checkboxes, family select, tier select). A client `<script>` toggles card visibility by the active filters and shows a live count. No JS -> all cards visible (progressive enhancement).
- **`src/generated/frameworks.json`** (generated, gitignored) - the data the component imports at build time: `{slug, title, tier, family, artifact, contexts, modes, useWhen}` per framework.
- **`src/content/docs/explore/chooser.mdx`** (committed) - imports and renders `<Chooser />`, with a short intro and a pointer to the live Framework Advisor for context-aware routing.

### 4.4 Navigation
- New **"Explore"** sidebar group: chooser, the four lenses, the map. Placed after "Learn".

## 5. S4 deliverables

- **GA4** - `astro.config.mjs` `head` injects the gtag loader + init, only when `process.env.PUBLIC_GA_ID` is set. Documented in `site/README.md`.
- **starlight-versions** - `npm i starlight-versions`; add the plugin with `current: { label: 'v0.1.0' }`; update `src/content.config.ts` to add the `versions` collection with `docsVersionsLoader()`. No archived snapshot this release.
- **Custom 404** - `src/content/docs/404.md`, `template: splash`, with search + home links.
- **Meta/OG** - confirm Starlight's per-page description meta; add a site `head` og:image if a static social image exists (else defer).
- **Accessibility** - every generated mermaid diagram is paired with a text-equivalent list/table on the same page; tier-badge color contrast checked.

## 6. gitignore and provenance

Generated and committed split, extending the existing rule:
- Generated (gitignored): `src/content/docs/explore/*` EXCEPT `chooser.mdx`; `src/generated/`.
- Committed: `Chooser.astro`, `explore/chooser.mdx`, `404.md`, config changes, `content.config.ts`.

Use `src/content/docs/explore/*` + `!src/content/docs/explore/chooser.mdx` so the hand-authored chooser page survives the generator's `fresh()` wipe (the generator must NOT wipe `chooser.mdx`; it writes only the four lens pages + `map.mdx` into `explore/`).

## 7. Build and verification

Mostly deterministic generator + config (built inline, not fanned out). Steps:
1. Extend `gen-site.mjs`: sidecar field extraction (robust fields), the four lens pages, `explore/map.mdx`, recipe flow diagrams, `src/generated/frameworks.json`. Add `explore/` to `OUT` with a guarded `fresh()` that preserves `chooser.mdx`.
2. Add `Chooser.astro` + `explore/chooser.mdx`.
3. S4: GA4 head, starlight-versions (+ content.config), 404, meta.
4. Build clean; validate generated mermaid (MCP validator on a sample of each diagram type); test the chooser filter in a real browser (Playwright: load `/explore/chooser/`, toggle a filter, assert the visible count changes).
5. Confirm `evaluate.mjs` still convergent 0/0.
6. A final adversarial review pass (workflow) over the new surface.

## 8. Acceptance criteria

1. `node scripts/gen-site.mjs` emits the four lens pages, `explore/map.mdx`, `src/generated/frameworks.json`, and recipe pages with flow diagrams; it does NOT delete `explore/chooser.mdx`.
2. `cd site && npm run build` succeeds; page count rises by the new explore pages; Pagefind + sitemap emit.
3. The all-frameworks map and lifecycle map render as valid mermaid; each has a text-equivalent on the page.
4. Each recipe page shows a step flow diagram above its numbered list.
5. The chooser filters live in a browser: toggling a context tag changes the visible framework count; with JS disabled all frameworks are listed.
6. GA4 injects only when `PUBLIC_GA_ID` is set (absent in the build -> no gtag tags in the HTML).
7. starlight-versions shows "v0.1.0" as the current version label; the site builds with the `versions` collection configured and no archived snapshot.
8. A custom 404 renders; internal links resolve; no em/en dashes; `evaluate.mjs` convergent 0/0.

## 9. Deferred (post-S4)

The 31 per-framework artifact diagrams, the beginner concept diagrams, the formal 5x5 capability matrix (its grid was never captured as data), a relationship-graph map from the sidecar relationship fields (needs a real YAML parser), the consent banner (audience-dependent), and the first archived version snapshot (at v0.2).
