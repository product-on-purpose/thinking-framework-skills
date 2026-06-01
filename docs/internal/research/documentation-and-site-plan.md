# Documentation and Site Plan

How `thinking-framework-skills` becomes something people can **explore and learn from, beginner to advanced**, across different perspectives, needs, and interests - not just a folder of `SKILL.md` files. Covers the documentation architecture (exploration, visualization, progressive disclosure, summary-to-deep-dive per framework and per domain, guidance/help, FAQ), the source-reference standard, and an Astro Starlight launch plan.

This is a plan, not the site. It is committable working doc; the site is built from it later (the Silver climb's docs phase, and the go-public flip).

---

## 1. Principles

1. **Learn at any depth.** Every framework and domain is readable as a 20-second answer, a 2-minute orientation, or a 20-minute deep dive. The reader chooses the depth; the page does not force one.
2. **Multiple ways in.** People arrive by job ("I need to decide"), by symptom ("I'm stuck"), by name ("what's a premortem?"), by domain ("teach me systems thinking"), by evidence ("show me what's actually proven"), or as a builder ("how do I call these from an agent?"). The IA serves all of these, not one canonical path.
3. **Honesty is the product.** Every document carries a graded, primary-source reference list and states what the evidence does and does not show. The site is where the "evidence-graded" promise becomes visible and checkable. This is the differentiator (see the audit and `framework-catalog.md`), so it is a documentation standard, not an afterthought.
4. **Progressive disclosure mirrors the artifact layers.** The metadata design already defines four layers (headline / core / narrative / grounding); the docs use the same spine so a page and a skill feel like one thing.
5. **The skill files are the source of truth.** Per-framework pages are generated from `SKILL.md` + `evidence/dossier.md` + `references/EXAMPLE.md` + `skill.meta.yml`. The site is a generated view, not a second copy that can drift (the pm-skills "in-place mount" pattern). Hand-authored content is only the connective learning layer (domain intros, guidance, explanation, FAQ).
6. **Mechanism over ritual, in the teaching too.** Pages teach the durable cognitive move and name the branded ritual as lineage, never the reverse.

---

## 2. Audiences and learning journeys

Five primary personas crossed with three depth levels. The site must let each find a path.

| Persona | Wants | Entry point | Beginner path | Advanced path |
|---|---|---|---|---|
| **Curious learner** | to understand how good thinking works | "Explore by domain" / a map of all frameworks | what each move is + one example | the cognitive science, evidence nuance, failure modes |
| **Solo operator + AI** (primary) | to get unstuck or decide, now | "I need to..." job router / the chooser | pick a recipe, run it | compose custom chains, tune token budgets |
| **Product manager / strategist** | rigor on real decisions | job router + the decision/risk domains | the stress-test-decision recipe | evidence tiers, when-not-to-use, cross-skill composition |
| **Skeptic / researcher** | to check the claims | "Show me the evidence" / the bibliography | the evidence-tier legend | per-skill dossiers, primary sources, the honest debunks |
| **Agent / plugin builder** | to call skills programmatically | "For builders" / install + API | install, invoke one skill | recipes as workflows, the sidecar schema, eval cases |

**Learning tracks** (curated multi-page paths): "Think better in 30 minutes" (beginner sampler), "Decide well under uncertainty" (decision+risk), "Get unstuck" (reframe+ideation), "Audit your reasoning" (the epistemic stack), "The evidence behind thinking tools" (researcher track), "Build with the library" (agent track).

---

## 3. Information architecture (Diataxis-mapped)

Doc types, mapped to the Diataxis quadrants (tutorial / how-to / reference / explanation):

| Doc type | Diataxis | Purpose | Sourced from |
|---|---|---|---|
| **Getting started** | tutorial | first run; install; "your first premortem" | hand-authored |
| **Per-framework page** (28+) | reference + how-to | summary -> deep dive for one skill | generated from SKILL.md + dossier + EXAMPLE + meta |
| **Per-domain page** (11 families) | explanation + how-to | what this cognitive operation is, the frameworks in it, when to reach for it, how they compose | hand-authored intro + generated index |
| **The chooser / "I need to..."** | how-to | route a need to the right framework or recipe | generated from metadata (family, job, problem-context) + hand-authored logic |
| **Recipes** (4+) | how-to | composable chains, end to end | generated from `recipes/` |
| **Explanation / philosophy** | explanation | the evidence model, mechanism-over-ritual, the honesty commitments, cargo-cult warning, the four commitments | hand-authored |
| **Evidence & the bibliography** | reference | the 7-tier model explained; the site-wide graded source list | generated from dossiers + hand-authored legend |
| **Guidance / help** | how-to | how to read a page, how to pick depth, how to compose, troubleshooting | hand-authored |
| **FAQ** | explanation | the recurring questions (below) | hand-authored |
| **For builders** | how-to + reference | install, invoke, the sidecar schema, eval cases, cross-agent notes | generated + hand-authored |

### The per-framework page (the core unit), progressive disclosure in four layers

1. **Headline card (20 sec):** one-line mechanism, the artifact it produces, evidence tier badge, family, "use when" triggers, "not for" near-misses. Everything a chooser needs.
2. **Core (2 min):** the mechanism in a paragraph, the numbered procedure, a compact worked example (the artifact), the "When NOT to Use."
3. **Deep dive (10-20 min):** the full worked example (Northwind), the mechanism explained, composition (what it pairs with, which recipes use it), the failure modes, beginner-vs-advanced notes.
4. **Grounding (for the skeptic):** the evidence section in full - what the research does and does not show, the transferred-evidence flag, the honest caveats (e.g. premortem's "30% measures reasons not decisions"), and the **graded source reference list**.

Beginner readers stop after layers 1-2; advanced readers and skeptics go to 3-4. A visible "depth" affordance (tabs or progressive sections) makes the choice explicit.

### The per-domain (family) page

For each of the 11 families: what the cognitive operation is and why it matters; the frameworks in it (the generated index with tier badges and status); "reach for this family when..."; how its frameworks differ from each other (the overlap boundaries, drawn from the dossiers); how they compose with other families; and the family's reference list.

---

## 4. Exploration and navigation (multiple lenses)

The same 28+ frameworks, re-sortable by the lens the visitor thinks in:

- **By job (verb-first):** Reframe / Challenge / Generate / Stress-test / Decide / Anticipate / Synthesize / Reflect. Closest to "I need to...". The primary human entry.
- **By domain (cognitive operation):** the 11 families. For learners.
- **By evidence tier:** S/M/P/V/A/C/X. For skeptics ("show me only the strong-evidence methods").
- **By capability matrix (context x operation):** the bipartite routing grid (High-Ambiguity/Friction/Stakes/Complexity/Conflict x Deconstruct/Invert/Project/Shift/Synthesize) - a design and routing aid, surfaced as an advanced explorer.
- **By learning level:** beginner sampler -> intermediate -> advanced.
- **Search:** full-text (Pagefind), so "test result probability" finds natural-frequency-bayesian even if the user does not know the name.
- **The chooser:** an interactive "describe your situation -> recommended frameworks/recipe" page (the human-facing sibling of the meta-skill recommender spec'd separately). Cross-links everywhere: each page links to its family, its recipes, its near-misses (so a wrong landing self-corrects).

---

## 5. Visualization plan

Visuals are mermaid-first (text-based, diffable, and enforceable by a `mermaid-valid` check, matching the toolkit). Per type:

- **The map of all frameworks:** one overview diagram - 11 families as clusters, frameworks as nodes, tier as color, with the strong-evidence core highlighted. The "you are here" for the whole library.
- **Per-framework artifact illustration:** a small diagram of the output shape (the futures-wheel radial map, the issue-tree, the ladder-of-inference rungs, the risk register columns, the pyramid). Shows the deliverable at a glance.
- **Composition / recipe flow:** each recipe as a flow diagram (skill -> compressed handoff -> skill), with the composite artifact at the end.
- **The capability matrix:** the 5x5 context-x-operation grid as a navigable diagram.
- **Evidence-tier legend:** a consistent visual badge system (S/M/P/V/A/C/X) used on every card and index.
- **Family relationship map:** how families feed each other (reframe -> generate -> decide -> stress-test -> reflect), so composition is visible.
- **Beginner concept diagrams:** for hard ideas (base-rate neglect for natural-frequency-bayesian; the inside/outside view for reference-class-forecasting; prospective hindsight for premortem).

Each visual has a text fallback (accessibility) and is generated or hand-authored in mermaid so it lives in version control, not as binary images.

---

## 6. Source-reference standard (applies to every document)

A hard documentation rule, mirroring the skills' honesty commitment:

- **Every framework page** ends with its dossier's graded reference list: each source with author/year, what it supports, and the evidence tier it justifies - plus the honest "what this does not show" note.
- **Every domain and explanation page** ends with a reference list for its claims.
- **A site-wide bibliography** aggregates all primary sources, grouped by framework, each tagged with the tier it underwrites. This page is itself a feature for the skeptic persona ("the evidence behind thinking tools").
- **Transferred-evidence and verification-status flags** are surfaced, not hidden: where evidence is human-subject (not AI-validated) or not yet primary-source-verified, the page says so.
- **No laundered statistics:** quantified claims (effect sizes, "30%", RCT counts) appear only where the dossier has them, with the caveat the dossier records.

This standard is the credibility moat made browsable. A reviewer should be able to click from any claim to its grading.

---

## 7. Content sourcing and generation

- **Generated (do not hand-duplicate):** per-framework pages (from `SKILL.md` frontmatter + body, `evidence/dossier.md`, `references/EXAMPLE.md`, `skill.meta.yml`), the family indexes, the tier/job/matrix re-sorts, the recipe pages, the bibliography. A generation step reads the `skills/` tree and emits site pages - so the site cannot drift from the skills.
- **Hand-authored (the learning layer):** getting-started, domain intros, the philosophy/explanation set, guidance/help, FAQ, learning tracks, beginner concept explainers.
- **Single source of truth preserved:** the SKILL.md/dossier are canonical; the site renders them. Editing a skill updates the site on the next build.

---

## 8. FAQ (the recurring questions to answer)

- What is this, in one sentence? How is it different from a list of mental models?
- Do these frameworks actually work? (-> the evidence model + honest answer: mixed; here is what is and is not supported.)
- What do the evidence tiers (S/M/P/V/A/C/X) mean?
- How do I pick the right framework? (-> the chooser / job router.)
- Can I use these without an AI agent? (Yes - they are for humans too.)
- Why do some pages say "when NOT to use this"? (Anti-cargo-cult; honesty.)
- Why is there no Six Thinking Hats / SWOT / [popular method]? (-> mechanism-over-ritual; the exclusions, with reasons.)
- How do recipes work? How do I compose skills?
- How do I install and call these from Claude Code / an agent? (builder FAQ.)
- Is the evidence about AI using these, or humans? (Transferred-evidence honesty.)
- How do I contribute or suggest a framework? (-> the selection bar: four commitments + overlap ceiling.)

---

## 9. Astro Starlight launch plan

Reuse the proven pm-skills stack (the toolkit's release plan copies it near-verbatim): Astro + Starlight, deployed to GitHub Pages, with an **in-place markdown mount** so the site is a generated view of the repo, not a second store; a separate `deploy-pages.yml` workflow; the conformance `ci.yml` stays the gate; `mermaid-valid` enforced.

**Phasing (gated; the site is a go-public-era deliverable, not a Bronze blocker):**

| Phase | Ships | Gate |
|---|---|---|
| **S0 - Scaffold** | Astro Starlight project copied from the pm-skills stack; brand/theme; sidebar skeleton; Pagefind search; mermaid rendering; a `deploy-pages.yml` to GitHub Pages | builds and deploys a placeholder |
| **S1 - Generate framework + family pages** | the generation step (skills/ -> per-framework pages with the 4-layer progressive disclosure; family indexes; the bibliography) | every shipped skill has a generated page with its graded sources |
| **S2 - Learning layer** | hand-authored getting-started, domain intros, philosophy/explanation, guidance, FAQ, the learning tracks | a beginner can complete "Think better in 30 minutes" end to end |
| **S3 - Exploration + visualization** | the multi-lens re-sorts (job/tier/matrix/level), the chooser, the all-frameworks map, per-artifact diagrams, recipe flows | a visitor can find a framework five different ways |
| **S4 - Launch polish** | accessibility/text fallbacks, versioning (starlight-versions, later), analytics for the demand probe, the public announcement surface | public preview ready |

**Sequencing note:** S0-S1 align with the Silver climb (which introduces `build-docs`-style generation and the docs-site stack); S2-S4 align with the go-public flip and the v0.1.0 public preview (audit section 6.4-6.5). The site is how the "explore and learn, beginner to advanced" goal is realized; the skills + dossiers it renders already exist.

**Build vs buy of the generator:** start with a thin repo-specific generator (read `library.json` + each skill's files -> emit Starlight `.md`/`.mdx`), and align it with `agent-skills-toolkit`'s `askit-build-docs` `site` mode when that lands, rather than inventing a parallel system.

---

## 10. Priorities and success measures

**Priority order:** (1) the source-reference standard and the 4-layer per-framework template (the credibility + progressive-disclosure spine), (2) generation of framework + family pages, (3) the learning layer (domain intros, getting-started, FAQ), (4) exploration lenses + visualization, (5) launch polish.

**Success measures** (tie to the audit's demand probe): a beginner can go from "what is a premortem?" to running one; a skeptic can trace any claim to a graded source in two clicks; a visitor can find a framework by job, by name, and by evidence; the site has zero hand-duplicated skill content (everything generates from `skills/`).

---

## References

This plan draws on established documentation and information-architecture practice and the repo's own prior decisions. As a working internal doc its references are pointers rather than a formal bibliography, but the standard it sets (graded sources on every public page) is the binding rule.

- Diataxis documentation framework (tutorial / how-to / reference / explanation): https://diataxis.fr
- Astro Starlight docs framework: https://starlight.astro.build ; Pagefind search: https://pagefind.app
- Progressive disclosure (Nielsen Norman Group): https://www.nngroup.com/articles/progressive-disclosure/
- Internal: `docs/internal/research/framework-catalog.md` (the framework universe + tiers + status); `docs/internal/AUTHORING.md` (the four commitments, the artifact layers); `_local/audit/2026-05-31_complete-audit.md` (the evidence-grading moat, the demand probe, the audience analysis); the `agent-skills-toolkit` v1 release plan (the pm-skills Astro Starlight stack, `mermaid-valid`, the `build-docs` site mode); each skill's `evidence/dossier.md` (the graded sources the framework pages render).
