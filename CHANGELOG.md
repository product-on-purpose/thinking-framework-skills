# Changelog

All notable changes to this project are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). User-facing highlights are in [`RELEASE-NOTES.md`](RELEASE-NOTES.md).

## [Unreleased]

## [0.4.0] - 2026-06-08

The **Framework Library platform**. The registry (`frameworks/registry.mjs`) becomes the single source of truth for the whole catalog with strong CI; the `think-research-framework` engine produces graded, sourced proposals; the `think-top3` and `think-random-frameworks` applicators put the corpus to work; the published Framework Library renders per-method dossiers; a `/tools/` section separates the meta-skills from the graded frameworks; and the advisor's insufficient-signal gate is calibrated and re-measured. Documentation is refreshed for the registry era.

### Added
- The **framework registry** (`frameworks/registry.mjs`) is now the single source of truth for every evaluated thinking method (102 entries; the 34 `shipped` entries exactly match the skill directories). Migrated from the hand-maintained `framework-catalog.md` (113 table rows reconciled to 102 distinct methods), each entry carries family, evidence tier, status, verdict, reasoning, fold target, and - for branded methods - attribution + trademark. Authored as a zero-dependency ES data module (the repo's scripts are zero-dep and Node ships no YAML parser) with a committed JSON Schema contract, `frameworks/registry.schema.json`. [SP3, #40]
- **Generated, drift-checked views.** `scripts/gen-registry.mjs` regenerates the `framework-catalog.md` family tables (spliced between markers; the hand-authored narrative is preserved) and the public `about/why-not.md` index from the registry, and `--check` byte-compares them - so the catalog and the why-not page can no longer drift from the verdicts. [SP3/SP9, #40]
- **Strong CI around the registry.** `scripts/check-registry.mjs` (a new third layer of the required `check` gate) enforces schema validation, generated-view drift, referential integrity (shipped <-> skill dir both ways with the advisor exempt, recipe -> `_workflows` doc, every fold target resolves to a `shipped` skill, dossier paths and source URLs resolve), completeness (no orphan dossier), the IP/attribution lint (branded requires attribution + trademark), eval-coupling (every shipped entry's `eval/cases.md` exists and is well-formed, reusing the SP1 validator), tier consistency (each shipped entry's governing `tier` is one of the grades in its `SKILL.md` evidence-tier, so the catalog grade cannot drift from the grade the advisor and site publish), and a registry <-> advisor recommendable cross-check. [SP3, #40]
- `.gitattributes` pins LF line endings repo-wide, so the byte-exact drift guards compare identically on Windows (where `core.autocrlf` would otherwise smudge generated files to CRLF) and on Linux CI.
- The **research-framework engine** (`think-research-framework`): a `think-`-prefixed command -> backing meta-skill -> subagent that researches a candidate thinking method, grades it conservatively on the seven-tier model with real sources, assesses overlap against the catalog, drafts a staged dossier (`frameworks/_proposed/<slug>/`), and prints a schema-valid proposed registry entry validated by `scripts/check-proposed-entry.mjs` (with a DRY-extracted `scripts/lib/registry-entry-lib.mjs`). It never writes the registry - a human admits the entry. A `META_SKILLS` exemption lets a meta-skill be a skill dir with no registry entry. [SP5, #41]
- Two **applicator skills** over one shared, drift-guarded engine: `think-top3` (rank the most relevant frameworks, apply the top three, cross-synthesize) and `think-random-frameworks` (draw three at random to break fixation). The shared `references/engine.md` is copied byte-identically by `scripts/gen-engine.mjs` and guarded by a new `gen-engine --check` layer of the conformance gate. Both ship as meta-skills (no registry entry), tier C, experimental. [SP7/SP8, #42]
- The published **Framework Library** on the docs site: `scripts/gen-site.mjs` renders per-method dossiers + a by-family index from the registry, splicing a registry-generated status block between `STATUS:GENERATED` markers in each `frameworks/<slug>/dossier.md` (the committed dossier never carries a status line that drifts); a page renders only when its `dossierPath` resolves, so the library grows without broken links. Shipped with infrastructure + a first dossier tranche (premortem, steelmanning, six-thinking-hats). [SP4, #43]
- A **`/tools/` section** on the docs site for the four meta-skills (advisor, research-framework, top3, random-frameworks): routers and applicators that operate over the library are now presented distinctly from graded frameworks (no evidence-tier badge, no domain link) and dropped from the family tables, lenses, map, chooser, bibliography, and counts. `gen-site.mjs` partitions skills using the registry itself as the discriminator (a skill with no registry entry is a tool). The advisor's prior `/frameworks/think-framework-advisor/` URL is preserved by an Astro redirect, so existing links and bookmarks survive. [decision A, #45]
- Engineer and maintainer documentation: a registry-era rewrite of `docs/architecture.md` (the two sources of truth, the generator pipeline, the four-layer conformance gate, frameworks vs tools, the engine), a repeatable `docs/internal/release-process.md`, a refreshed contributor guide (`docs/contributing.md` + `docs/internal/AUTHORING.md`), and a user-facing tools-vs-frameworks explainer on the site. [#45]

### Changed
- **IP policy applied (open the IP gate, keep the evidence gate).** Every branded/trademarked method (Six Thinking Hats, Cynefin, Wardley Mapping, Blue Ocean, Disney Creative Strategy, Kepner-Tregoe, ICE/RICE/WSJF, Porter's Five Forces) now carries attribution + a trademark/license string and is re-tagged on evidence + distinctness alone - documented, not shipped. The evidence gate is unchanged: X/V/C grading and the ~20% overlap ceiling still keep SWOT, Five Whys, and role-played dissent out on the merits. [SP9, #40]
- `site/.../about/why-not.md` is now a generated index of the deliberately-not-shipped set (folded / documented-not-shipped / excluded-on-the-merits / out-of-scope), each fold linking to the shipped skill it folds into - replacing the hand-curated essay with a view that cannot drift from the registry. [SP9, #40]
- `docs/internal/research/framework-catalog.md` is now a generated view of the registry (family tables between `<!-- generated -->` markers; the taxonomy/legend/priority preamble and the exclusions/sources postamble stay hand-authored). [SP3, #40]
- `think-framework-advisor` test calibration + first behavioral measurement (docs + test fixtures; no version change). Recalibrated `eval/cases.md` engage cases (e1/e3/e4/e5) to carry real signal so they exercise engagement rather than the advisor's own insufficient-signal gate, and relocated one deliberately-thin prompt to an explicit gate case under "Should NOT trigger". Ran the agent-executed routing eval (the SP1 C2 layer) twice, recorded under `docs/internal/eval-results/`: name-safety 12/12 (a stable measured floor) and routing 7/12 then 9/12 after recalibration, which surfaced that the insufficient-signal gate over-fires run-to-run. The advisor's `evidence/dossier.md` routing grade moves from "never measured" to "C, measured not validated" (the grade does not rise).
- The **advisor's insufficient-signal gate** (`think-framework-advisor` protocol 2) was rewritten from a length reflex into a last-resort gate with explicit route / decline / engage precedences ("never name the answer then ask a question"), then re-measured behaviorally (2 trials x 12 cases): the three boundary failures are fixed and consistent across both trials, name-safety 12/12, routing 24/24 category-correct, and the genuinely-thin case still correctly clarifies. The grade stays an honest C (measured and now consistent; still single-eval, self-authored, small-N). [SP1-C2, #44]
- **Fishbone / Ishikawa re-vetted** via the research engine and **folded into `issue-tree`** (grade P): its move is issue-tree with the root fixed to causes plus a canned 6M/8P category preset, well above the overlap ceiling, so it ships as a documented fold rather than a near-twin skill. Overturns the prior `cand/build` tag, and publishes a rejected-with-reasoning learning dossier in the Framework Library. Closes the SP2 Fishbone vetting slot. [SP2]

### Fixed
- The **Framework Library badge** now renders each shipped method's compound evidence grade (e.g. `S/M`) so it matches the dossier body and the framework page, instead of the registry's single governing tier (which stays single-letter for sorting and the CI tier-consistency check). Removes the misleading appearance, surfaced by the first dossier tranche, that the badge overstated the evidence. [decision B, #45]

## [0.3.0] - 2026-06-03

The advisor-credibility milestone: the authored behavioral eval cases become an enforced artifact, and the advisor gains real negative-routing signal. Bundled with the catalog growth and gitignore change merged earlier on the same day.

### Added
- The behavioral eval cases are now an enforced artifact. `scripts/eval-cases.mjs` (with `scripts/lib/cases-lib.mjs`) validates that every `skills/*/eval/cases.md` is well-formed (the four authored sections with minimum bullets, no placeholders) and name-safe (no case may reference a framework that does not exist - mechanizing the advisor's "never invent a framework name"). Wired into the required conformance gate (`scripts/check.mjs`) and covered by a new `node --test` suite (18 cases across `cases-lib`, `eval-cases`, and corpus enrichment). The model-judged behavioral measurement remains agent-executed and on-demand (see the SP1 spec).
- Advisor corpus enrichment. `scripts/gen-recommendable.mjs` now emits per-skill `anti_triggers` (from each `eval/cases.md` "Should NOT trigger"), `not_use` (from each `SKILL.md` "When NOT to Use"), and `overlaps` (named sibling skills) into `recommendable.json`, giving `think-framework-advisor` the negative-routing signal its required "what NOT to use" output depends on. Derived from existing authored content (no hand-maintained duplication) and drift-guarded.
- `think-belief-update-routine` (tier P) - a meta-thinking-and-reflection skill that re-scores a standing inventory of open beliefs against newly arrived evidence on a cadence, emitting a belief-update ledger (each belief carrying a prior confidence, the evidence accrued, a revised confidence with an explicit delta and direction, a reason for the size of the move that guards against under-updating, and a next-review trigger). It completes the reflection family's over-time-belief corner alongside `think-decision-journal` (record-now) and `think-after-action-review` (review-finished). Vetted Build in the 2026-06-03 catalog round; graded P with the evidence caveat load-bearing (no advertised effect size; the routine's direct evidence is sparse and weak). Catalog 34 -> 35 skills.
- `idea-quality-audit` recipe (`_workflows/think-idea-quality-audit.md` + `recipes/idea-quality-audit.md`) - score a batch of candidate ideas with `think-decision-option-review`, then pressure-test the strongest few with `think-red-team-light`. Ships as a recipe (no separable mechanism of its own) per the same vetting round. Recipes 5 -> 6.
- v0.3.0 Framework Library platform specs under `docs/internal/release-plans/plan_v0.3.0/` (the registry, the published Framework Library, the research-framework engine, the IP policy, and this milestone's own spec) - design records for the work sequenced after this release.

### Changed
- `scripts/check.mjs` now resolves the toolkit worktree-portably (probing the main repo root), so the conformance gate runs cleanly from a `git` worktree, and it runs the static eval-case validator after the toolkit's structural checks.
- `docs/internal/research/framework-catalog.md` and the site `about/why-not.md` truthed-up to the 2026-06-03 catalog-vetting verdicts (leverage-points overturned `[cand]` -> `[fold]` into iceberg-model; belief-update and idea-quality-audit recorded).
- Git-ignore the local `.claude/` agent-state directory (Claude Code worktrees and local settings) so it can never be accidentally committed.

## [0.2.1] - 2026-06-03

### Added
- `site/public/robots.txt` pointing at the generated sitemap.
- Build-aware link and route integrity guards (family Astro site standard 14.11): `scripts/check-rendered-links.mjs` (browser-broken internal links + `#anchor` resolution, enforced with `STRICT_ANCHORS=1` in CI) and `scripts/check-route-parity.mjs` (guards against silently dropping a published route, against the committed `scripts/route-manifest.txt`). Both run after the build in the PR `site-build` job and the deploy build, gated on the build outcome. A `node --test` suite (`tests/check-rendered-links.test.mjs`, 10 cases) proves the rendered-link guard's robustness.

### Changed
- Docs-site CI/deploy converged to the family site standard: the GitHub Pages deploy now uses `actions/upload-pages-artifact@v5` + `actions/deploy-pages@v5`; Node is pinned to `24` via `.nvmrc` / `node-version-file`; and a non-deploying `site-build` job verifies the site on PRs.
- The advisor name-safety set is drift-guarded in CI: `scripts/gen-recommendable.mjs --check` runs on PR and push and fails if `recommendable.json` / `recommendable.md` are stale.
- Every CI job now resolves Node from `.nvmrc` (= 24): the `check` (conformance gate) job moved off its hardcoded `node-version: '22'` to `node-version-file: .nvmrc`, matching the site and deploy jobs (family Astro site standard 14.8).
- The site base path is single-sourced in `scripts/site-base.mjs` (family Astro site standard 14.7), consumed by both `site/astro.config.mjs` and the rendered-link guard, so the build and the validator can never disagree on the base.

### Removed
- Per-file `.md` config sidecars under `site/` (rationale folded into the config files' own comments and a new `site/README.md`).
- The seven remaining repo-level `.md` config/data sidecars (`library.json.md`, `manifest.generated.json.md`, both `plugin.json.md`, both generator `.mjs.md`, and the advisor's `recommendable.json.md`); rationale consolidated into `docs/internal/AUTHORING.md` and the generators' own header comments (family Astro site standard 14.10).

### Fixed
- Docs-site Edit links on hand-authored pages: `editLink.baseUrl` now carries the `/site/` segment (`.../edit/main/site/`) so they resolve to the real repo path instead of 404ing (the Astro project root is `site/`).
- 43 pre-existing browser-broken internal links the new rendered-link guard surfaced on its first run: a bibliography link-depth bug, an over-deep `explore/` index link, and a `by-context` sibling link (`scripts/gen-site.mjs`); two `.mdx` start-page sibling links; and the three base-less 404 hero links (now base-absolute).
- Generated-page "Edit" links no longer 404: `scripts/gen-site.mjs` sets each generated page's `editUrl` to its true source (a per-framework page to its skill's `SKILL.md`) or to `false` for aggregation pages, instead of letting Starlight auto-derive a link to the gitignored build path (family Astro site standard, "Generated-page Edit links").

## [0.2.0] - 2026-06-01

### Added
- Three skills, evidence-vetted against the catalog before authoring: `think-concept-mapping`, `think-causal-loop-diagrams`, `think-fermi-estimation` (all `M/P`, transferred-evidence flagged, with "When NOT to use" hard-walls against their overlapping shipped skills). Catalog 31 -> 34.
- `first-principles` recipe (`_workflows/think-first-principles.md` + `recipes/first-principles.md`), chaining `think-abstraction-laddering` + `think-assumption-reversal`. Recipes 4 -> 5.
- Beginner concept diagrams on six framework pages via an optional `references/CONCEPT.md` per skill, rendered after the quick-facts card (natural-frequency-bayesian, reference-class-forecasting, causal-loop-diagrams, stocks-and-flows-reasoning, iceberg-model, futures-wheel).
- Gold-tier hardening: a self-hosting conformance gate (`scripts/check.mjs` + `.github/workflows/ci.yml`) that runs the agent-skills-toolkit validators on every PR; a generated `INDEX.md`; this `CHANGELOG.md` and `RELEASE-NOTES.md`.

### Changed
- Plugin tier declared `advanced` (Gold) in `library.json`; version `0.1.0` -> `0.2.0`.
- README rewritten to the shipped library with house-style mermaid; the README lifecycle diagram and the site all-frameworks map changed from horizontal to vertical layouts so they are legible in a narrow column.
- `getting-started` and `how-to-read-a-page` converted to interactive `.mdx` (cards, steppers, callouts).
- The native plugin manifests now carry `license` (fixed in the toolkit's `gen-manifest`).

## [0.1.0] - 2026-06-01

### Added
- First public release: 31 evidence-graded, agent-executable thinking-method skills + 4 composable recipes, validating at the toolkit's convergent (Silver) tier.
- The `think-framework-advisor` meta-skill (the front-door router) with a generated name-safety set.
- An Astro Starlight docs site (per-framework pages with 4-layer progressive disclosure, learning tracks, exploration lenses, an interactive chooser, an aggregated graded bibliography), deployed to GitHub Pages.
- Listed in the Product on Purpose marketplace. Apache-2.0.

[unreleased]: https://github.com/product-on-purpose/thinking-framework-skills/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/product-on-purpose/thinking-framework-skills/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/product-on-purpose/thinking-framework-skills/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.2.1
[0.2.0]: https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.2.0
[0.1.0]: https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.1.0
