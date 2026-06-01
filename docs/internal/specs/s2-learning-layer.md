# Spec: S2 - the docs-site learning layer

> **Type:** build spec (a contract for the hand-authored learning layer of the docs site, plus the one generator change it needs).
> **Status:** proposed, ready to build. Approach 1 (family-intro weave) approved by the maintainer.
> **Author:** product-on-purpose - **Drafted:** 2026-06-01 - **Scope:** docs-site phase S2 (per `docs/internal/research/documentation-and-site-plan.md` section 9).
> **Builds on:** S0+S1 (PR #17). The site in `site/` is a generated view; S2 adds the hand-authored connective layer.

---

## 1. Purpose and scope

S1 generated the per-framework, per-domain, recipe, and bibliography pages. S2 adds the **hand-authored learning layer** that turns a folder of generated reference pages into something a beginner can learn from and a skeptic can navigate: domain intros, an FAQ, a philosophy/explanation set, a guidance page, and six curated learning tracks. The S2 exit gate (from the site plan, section 9): **a beginner can complete the "Think better in 30 minutes" track end to end**, and every domain has a real intro rather than a one-line auto-blurb.

S2 is hand-authored prose plus exactly one generator change (the family-intro weave). It deliberately does **not** include the multi-lens re-sorts, the interactive chooser, or mermaid visualizations - those are S3 (section 12, deferrals).

## 2. The architecture decision (approved: Approach 1)

The generator (`scripts/gen-site.mjs`) calls `fresh(families/)` and rewrites the whole directory each build, so a hand-authored family intro cannot live in `families/` - it would be wiped. Approved approach: **each family's intro is an authored source file the generator reads and weaves into the generated domain page**, so the page becomes `intro (hand) + frameworks table (generated)`. This preserves the "no second store / generated view" invariant: the generator stays the single assembler, the table half always reflects current `metadata.family`, and the intro half is version-controlled prose the generator only reads.

Rejected: separate intro pages (splits each domain across two pages); intro prose inside `library.json` (markdown-in-JSON is unauthorable and pollutes the manifest).

## 3. Deliverables overview

| # | Deliverable | Count | Kind | Path |
|---|---|---|---|---|
| A | Generator change (family-intro weave + domain ordering) | 1 edit | code | `scripts/gen-site.mjs` |
| B | Family intro source files | 10 | authored | `site/intros/families/<family>.md` |
| C | FAQ | 1 | authored | `site/src/content/docs/about/faq.md` |
| D | Philosophy / explanation set | 3 | authored | `site/src/content/docs/about/{philosophy,why-not,contributing}.md` |
| E | Guidance page | 1 | authored | `site/src/content/docs/learn/composing.md` |
| F | Learning tracks + hub | 6 + 1 | authored | `site/src/content/docs/learn/` |
| G | Sidebar update (Learn, About groups) | 1 edit | code | `site/astro.config.mjs` |

Authored standalone pages live under `about/` and `learn/`, which are **not** in the gitignored generated set (`frameworks/`, `families/`, `recipes/`, `evidence/`), so they are committed. Family intro sources live at `site/intros/families/`, also committed and outside the ignore.

## 4. A - Generator change (the only code in the content path)

**New source:** `site/intros/families/<family>.md`, one per family (10 files). Frontmatter:

```
---
order: <int>          # pedagogical sort position (see section 5)
label: <Display Name> # optional; overrides the derived FAMILY_LABEL
tagline: <one line>   # optional; a one-sentence "what this domain is"
---
<intro body, plain markdown - no Astro components, HTML comments only>
```

**`gen-site.mjs` changes** (target ~25 lines, behavior-preserving when an intro is absent):
1. Add `INTROS = join(ROOT, 'site', 'intros', 'families')`; read the matching intro file per family if it exists (reuse `readFrontmatter` + `bodyOf`).
2. In the family-page emitter: insert the intro body **between** the existing "N frameworks / see evidence model" line and the table. Use `label` for the page title if present (else `FAMILY_LABEL(fam)`). Emit `sidebar:\n  order: <order>` into the page frontmatter so the "Domains" sidebar group and the families index sort pedagogically (Starlight autogenerate honors `sidebar.order`).
3. Sort the families index (`families/index.md`) rows by `order` rather than alphabetically; optionally show the `tagline` in a column.
4. **Graceful fallback:** if an intro file is missing, emit today's thin auto-blurb, so the build never breaks mid-authoring.

Constraint: the intro body is embedded in a generated **`.md`** page, so it must be plain markdown (no `<Card>`/JSX; HTML comments only). This matches the existing generated-page leniency rule.

## 5. B - Family intros (10), ordered as a thinking lifecycle

Order (the `order` frontmatter), following the reframe -> generate -> ... -> reflect arc from the site plan:

| order | family | label | n | members (tier) |
|---|---|---|---|---|
| 1 | problem-framing | Problem Framing | 2 | Problem Restatement (M/P), Abstraction Laddering (P) |
| 2 | divergent-ideation | Divergent Ideation | 5 | SCAMPER (P), Question Burst (P), Assumption Reversal (P), Brainwriting (S), Far-Analogy Ideation (S) |
| 3 | perspective-and-multi-lens | Perspective & Multi-Lens | 1 | Parallel Perspectives Review (P) |
| 4 | systems-and-consequences | Systems & Consequences | 3 | Futures Wheel (P), Iceberg Model (P), Stocks and Flows Reasoning (S) |
| 5 | assumption-and-belief-challenge | Assumption & Belief Challenge | 3 | Ladder of Inference Check (P), Red Team Light (P), Authentic Dissent (S) |
| 6 | reasoning-clarity | Reasoning Clarity | 4 | Evidence vs Inference Sort (P), Argument Mapping (S), Natural-Frequency Bayesian (S), Issue Tree (P) |
| 7 | decision-and-option-evaluation | Decision & Option Evaluation | 4 | What Would Have to Be True (P), Decision Option Review (P), One-Way vs Two-Way Door (P), Linear-Model Aggregation (S) |
| 8 | risk-and-resilience | Risk & Resilience | 4 | Premortem (S/M), Reference Class Forecasting (S), WOOP (S), Backcasting (P) |
| 9 | synthesis | Synthesis | 2 | Affinity Mapping (P), Pyramid Principle (P) |
| 10 | meta-thinking-and-reflection | Meta-Thinking & Reflection | 3 | After Action Review (S), Decision Journal (P), Framework Advisor (M/C) |

Each intro (~30-45 lines) contains, in this order:
1. **What the cognitive operation is** and why it matters (the durable move, not a brand).
2. **Reach for this family when...** - the triggers.
3. **How its frameworks differ from each other** - the within-family chooser, drawn from the dossiers' overlap boundaries (so a reader picks the right one of N). For single-member families (perspective-and-multi-lens), this collapses to "when to use it / when not."
4. **What it composes with** - links to the sibling families it feeds or is fed by (e.g., problem-framing -> divergent-ideation -> decision-and-option-evaluation).

The generated table (already emitted) lists the members with tier badges below the intro. The intro must not duplicate the table.

## 6. C - FAQ (`about/faq.md`)

The eleven questions from site plan section 8, each with a short answer that links out rather than re-explaining:

1. What is this, in one sentence? How is it different from a list of mental models?
2. Do these frameworks actually work? (-> the evidence model; honest answer: mixed.)
3. What do the evidence tiers (S/M/P/V/A/C/X) mean? (-> evidence model.)
4. How do I pick the right framework? (-> the Framework Advisor.)
5. Can I use these without an AI agent? (Yes - humans too.)
6. Why do some pages say "when NOT to use this"? (Anti-cargo-cult.)
7. Why is there no Six Thinking Hats / SWOT / [popular method]? (-> why-not page.)
8. How do recipes work? How do I compose skills? (-> composing page + recipes.)
9. How do I install and call these from Claude Code / an agent? (-> Build-with-the-library track.)
10. Is the evidence about AI using these, or humans? (Transferred-evidence honesty -> evidence model.)
11. How do I contribute or suggest a framework? (-> contributing page.)

## 7. D - Philosophy / explanation set (`about/`)

- **`philosophy.md`** - mechanism over ritual; the four commitments; honest grading as the product. The manifesto page. (The evidence model already lives at `start/evidence-model.md`; link to it, do not duplicate.)
- **`why-not.md`** - the exclusions: why no Six Thinking Hats, SWOT, and similar popular-but-thin methods, each with its reason (mechanism-over-ritual; the overlap ceiling; the X-tier exclusions). Ties to FAQ Q7.
- **`contributing.md`** - the selection bar (the four commitments + the overlap ceiling) and how to propose a framework. Ties to FAQ Q11.

## 8. E - Guidance (`learn/composing.md`)

How recipes work; how to compose skills (the compressed-handoff pattern); how to pick depth on a framework page; a note on token budgets for agent users. Reading a page is already covered by `start/how-to-read-a-page.md` - link, do not duplicate.

## 9. F - Learning tracks (`learn/`)

A `learn/index.mdx` hub (CardGrid of the six tracks, so it uses Astro components -> `.mdx`) plus six track pages. Each track is an **ordered sequence of existing framework pages** + connective prose ("why this order") + a "what you will be able to do" close. Sequences (accurate to the real library):

1. **`think-better-in-30-minutes.md`** (beginner sampler): Problem Restatement -> Question Burst -> Premortem -> Decision Journal. One move from framing, ideation, risk, reflection; each runnable in minutes.
2. **`decide-under-uncertainty.md`** (decision + risk): What Would Have to Be True -> Decision Option Review -> One-Way vs Two-Way Door -> Premortem -> Reference Class Forecasting.
3. **`get-unstuck.md`** (reframe + ideation): Problem Restatement / Abstraction Laddering -> Question Burst -> Assumption Reversal / SCAMPER -> Far-Analogy Ideation.
4. **`audit-your-reasoning.md`** (the epistemic stack): Evidence vs Inference Sort -> Ladder of Inference Check -> Argument Mapping -> Red Team Light / Authentic Dissent -> Natural-Frequency Bayesian (when numbers are involved).
5. **`evidence-behind-thinking-tools.md`** (researcher track): start at the evidence model -> the bibliography -> trace the S-tier core (Brainwriting, Far-Analogy Ideation, Stocks and Flows, Authentic Dissent, Argument Mapping, Natural-Frequency Bayesian, Linear-Model Aggregation, Premortem, Reference Class Forecasting, WOOP, After Action Review) -> the honest debunks. A "trace the grading" path, not a "run these" path.
6. **`build-with-the-library.md`** (agent / builder track): install -> invoke one skill -> the recipes (as workflow components) -> the Framework Advisor as the front door -> the sidecar schema and eval cases. Links to the existing getting-started and the builder-facing material.

## 10. G - Sidebar (`astro.config.mjs`)

Add two autogenerate groups. Final sidebar order: **Start here -> Learn -> Frameworks (by name) -> Domains -> Recipes -> Evidence -> About.**

```js
{ label: 'Learn', items: [{ autogenerate: { directory: 'learn' } }] },
// ... existing Frameworks / Domains / Recipes / Evidence ...
{ label: 'About', items: [{ autogenerate: { directory: 'about' } }] },
```

"Domains" now orders by the `sidebar.order` the generator emits (section 4). "Learn" and "About" order alphabetically unless track/about pages carry their own `sidebar.order` - the tracks should carry `order` so the hub and the 30-minute sampler lead.

## 11. Cross-cutting constraints

- **Voice and length:** match the existing `start/` pages - active, honest, concrete, ~30-50 lines. Mechanism over ritual in the teaching too: name the durable move first, the branded ritual as lineage.
- **No em or en dashes** anywhere (a PreToolUse hook enforces it; use " - " or restructure).
- **Source-reference standard (site plan section 6):** every authored page that makes an empirical claim either links to the grounding (the skill's page, its dossier, or the bibliography entry) or states the claim as practitioner framing. No laundered statistics - quantified claims (effect sizes, "30%") appear only where a dossier supports them, with the dossier's caveat. Family intros lean on the per-skill pages for grounding; philosophy pages cite where they assert.
- **File type:** pages using Astro components (`<Card>`, `<CardGrid>`) are `.mdx`; pure-prose pages are `.md`. Family intro **sources** are plain `.md` (they embed into a generated `.md` page).
- **Links:** internal links are relative with a trailing slash (Starlight convention, matching the existing pages and generator output). All internal links must resolve in the build.

## 12. Deferrals (out of scope for S2)

S3: the multi-lens re-sorts (by job, by tier, the capability matrix), the interactive chooser (the human-facing sibling of the advisor), and all mermaid visualizations (the all-frameworks map, per-artifact diagrams, recipe flows, beginner concept diagrams). S4: accessibility/text-fallback polish, versioning, analytics. Surfacing the FAQ on the splash landing is optional and deferred.

## 13. Build and verification approach

Generator change and sidebar: authored directly (small, deterministic). Prose: fanned out with a workflow - one agent per family intro grounded in that family's actual dossiers, one per learning track, the FAQ and philosophy set as a batch - then an adversarial verify pass against the source-reference standard, the established voice, and link/claim accuracy, then assembled and built clean.

## 14. Acceptance criteria

1. `node scripts/gen-site.mjs` runs clean; each of the 10 family pages renders `intro + table`; the families index and the Domains sidebar group are ordered 1-10 per section 5; a missing intro falls back gracefully.
2. `cd site && npm install && npm run build` succeeds, Pagefind index builds, sitemap emits; page count rises from 55 by the count of new standalone pages (FAQ + 3 about + composing + hub + 6 tracks = 12) to ~67.
3. All 10 families have an intro; the FAQ answers all 11 questions; the about set (philosophy, why-not, contributing) and the guidance page exist; the six tracks + hub exist with sequences matching section 9.
4. The "Think better in 30 minutes" track is runnable end to end by a beginner using only the linked pages (the S2 exit gate).
5. Every authored page with an empirical claim links to its grounding or frames it as practitioner-level; no laundered statistics; no em/en dashes; all internal links resolve.
6. Sidebar reads Start here -> Learn -> Frameworks -> Domains -> Recipes -> Evidence -> About.
7. `node agent-skills-toolkit/scripts/evaluate.mjs .` still reports convergent 0/0 (the site is outside the plugin surface, so this should be unaffected - confirmed, not assumed).

## 15. Open questions

1. Sidebar placement of "About" (end vs. higher) and whether to surface FAQ on the splash landing. Default: About last, no landing FAQ for S2.
2. Family display-name overrides - the derived labels (e.g., "Perspective & Multi-Lens") read fine; `label` frontmatter exists as an escape hatch but is expected to be unused.
3. Whether the six tracks stay six pages (chosen, for deep-linkability) or collapse to one. Default: six pages + hub.
