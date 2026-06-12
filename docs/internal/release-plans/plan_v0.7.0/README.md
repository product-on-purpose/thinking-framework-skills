# plan_v0.7.0 - eval-informed quality pass + wave-3 candidate intake

> **STATUS: IN FLIGHT (planning + registry intake applied, 2026-06-11).** The wave-3 admissions (14 candidates + the 13th family) and the dialectical-bootstrapping unbundle are applied to `frameworks/registry.mjs` in the working tree, gate-green (advanced 0/0; registry 135/47; 43/43 tests), alongside the still-uncommitted 2026-06-10 queue re-open (16 candidates + the 12th family). Nothing here is committed, shipped, or version-bumped yet. Canonical history stays in [`CHANGELOG.md`](../../../../CHANGELOG.md); cut mechanics follow [`release-process.md`](../../release-process.md).

## What v0.7.0 contains

Three streams, in honesty order: measure-driven quality fixes, the re-opened candidate pipeline, and the release cut.

Already merged to `main` and sitting in `[Unreleased]` (PRs #53, #54, #55):

- The behavioral **trigger eval** (561 cases: 0 false-fires, 99% top1, 100% top3) and **output eval** (315 checks: 99% pass), both first-run and stamped.
- The **check-counts** sixth gate layer + the strategy-and-opportunity family intro.
- The causal-layered-analysis distinctness resolution.

In the working tree (this plan's intake, uncommitted):

- **Queue re-open (2026-06-10):** 16 `cand` entries + 12th family `self-and-team-awareness` (6 build-candidate thinking-move extractions, 6 famous-but-weak instruments queued as documentation candidates, 4 domain candidates).
- **Wave-3 intake (2026-06-11):** 14 `cand` entries + 13th family `ethics-values-deliberation`, from the three-platform external deep-research pass, deduped and admitted per [`2026-06-11-wave3-external-research.md`](../../research/2026-06-11-wave3-external-research.md). Includes the **dialectical-bootstrapping unbundle** from `dialectical-synthesis`'s aliases (the fold reasoning had already disclaimed it; reversible).
- Registry totals: **135 methods / 47 shipped / 30 cand / 13 families.** Nothing shipped; `why-not.md` byte-unchanged.

## Phases

### Phase 0 - land the intake (next action; needs maintainer commit/push)

Branch (suggested: `feat/v0.7.0-candidate-intake`), commit the working tree, PR, merge on green. Registry-only + docs; no version bump, no marketplace action. Files: `frameworks/registry.mjs`, `frameworks/registry.schema.json`, `scripts/check-counts.mjs`, `docs/internal/research/framework-catalog.md`, `docs/internal/research/2026-06-11-wave3-external-research.md`, this plan, `CHANGELOG.md` (two `[Unreleased]` bullets), `docs/internal/release-plans/README.md` (index refresh).

### Phase 1 - tighten the four output-eval-flagged skills

The output eval's one actionable cluster: the **evidence caveat is the most-dropped artifact element** when a skill runs cold. Fix by construction, not by exhortation:

1. `think-boundary-critique`, `think-contradiction-resolution`, `think-three-horizons`: put the evidence caveat into the artifact TEMPLATE itself (a pre-printed line the procedure fills, not a step the agent may skip).
2. `think-premortem`: enforce definite-past framing in its signature step.
3. Re-run the output eval on just these four (`node scripts/eval/extract-output.mjs <slugs>` -> the output workflow -> `score-output.mjs`). The eval is non-deterministic: confirm with a clean full pass on the four, not a single lucky run.

### Phase 2 - NAME-mode vetting of the 30-cand queue

Do NOT build from `cand` rows. Every candidate goes through `think-research-framework` NAME mode -> graded dossier + Build/Fold/Reject verdict, exactly as phases 1-2 did. Calibration: phase-1 was 3 Build / 2 Fold / 2 Reject from 7; phase-2 was 7 Build / 11 Fold / 2 Recipe / 6 Reject from 26. Expect roughly half of build verdicts to survive.

Batching: serial groups of ~4 (the 26-way all-at-once fan-out tripped a server-side burst throttle in phase 2; `resumeFromRunId` recovers stragglers). Suggested batch order, clusters that must be adjudicated TOGETHER kept together:

| Batch | Candidates | Why together |
|---|---|---|
| 1 | veil-of-ignorance-reasoning, ethical-matrix, speculative-harms-anti-goals, reflective-equilibrium | The new ethics family stands or falls as a unit; principlism folds into ethical-matrix |
| 2 | walton-argumentation-schemes, toulmin-argument-model, issue-position-argument-mapping (+ shipped argument-mapping as the wall) | The argumentation collision: at most one new survivor is plausible |
| 3 | dialectical-bootstrapping, interval-calibration-check, consider-the-unknowns, estimate-talk-estimate | The estimation/calibration cluster; ETE's agent-executable residue overlaps bootstrapping |
| 4 | process-tracing, qualitative-comparative-analysis, analysis-of-competing-hypotheses, system-archetypes | The causal-inference cluster; ACH/process-tracing share the disconfirmation spirit |
| 5 | interest-based-negotiation (+ MGA/ZOPA fold-in), ideological-turing-test, concept-knowledge-theory | Remaining domain candidates |
| 6-8 | The 12 self-and-team-awareness entries (6 build + 6 documentation) | The psychometric genre; trait-lens-perspective vs role-storming/parallel-perspectives is the load-bearing distinctness call |

Admission homing (gate-enforced, from the v0.6.0 lesson): shipped -> consume dossier into `skills/think-<slug>/evidence/` (no dossierPath); fold/reject -> promote to `frameworks/<slug>/` + set dossierPath; recipe -> `_workflows/` + `recipes/` prose.

### Phase 3 - build survivors + publish documentation dossiers

- Build verdicts: batched build subagents, template = `think-scenario-planning`, primed with the staged dossier + the U5 description rubric (ACTION verb + "use when", no colon-space in the YAML description). Each agent writes only its own `skills/think-<slug>/`; registry + library.json integrated centrally.
- Reject/fold verdicts become **published Framework Library dossiers** - the "rejections are the product" output. This is where the famous weak instruments (MBTI, CliftonStrengths, DISC, Enneagram, learning styles, Strong) get their honest public "why we don't ship this" pages: status moves `cand` -> `flag`/`excl`, the entry appears on `why-not.md`, and the dossier page goes live on the site.

### Phase 4 - fold-enrichments (after vetting, engine-vetted only)

The wave-3 research surfaced S-tier citations that strengthen EXISTING entries (consider-the-opposite + multiple-explanation into `red-team-light`; pre-parade into `premortem`; SAST 2x2 into `what-would-have-to-be-true`; QOC into `decision-option-review`; cone-of-plausibility into `scenario-planning`; full list in the wave-3 research note). Any tier raise goes through the research engine; hand-editing a grade up is laundering even when the citation is real.

### Phase 5 (optional) - complete the psychometric documentation shelf

The registry's instrument coverage is representative, not exhaustive (see Decision points). If the maintainer wants the full "famous instrument" shelf documented: admit the missing well-known ones as `cand`/`reject` documentation candidates (the MBTI modeling pattern) and vet them in phase-2 style batches. Known absences, roughly by fame: Thomas-Kilmann conflict modes (TKI), FIRO-B, HBDI (Herrmann), Insights Discovery, True Colors, Kolbe A Index, 16PF, Hogan assessments, Birkman, Predictive Index, Working Genius, EQ-i 2.0. Each is cheap (one registry row) and pays out as an honest public dossier.

### Phase 6 - the cut (maintainer-gated, per release-process.md)

1. Reconcile `CHANGELOG.md` `[Unreleased]` against `git log` since v0.6.0.
2. Bump `library.json` + `package.json` 0.6.0 -> 0.7.0; regenerate manifests + INDEX via the pinned toolkit; confirm the diff is version-only.
3. Consolidate `[Unreleased]` -> `[0.7.0]` + footer compare-links; write the RELEASE-NOTES entry.
4. Cutting PR `chore(release): v0.7.0 - <milestone>`; full gate + 43 tests + site build green; squash-merge.
5. Gated: tag on the merge commit + GitHub release; re-pin the agent-plugins marketplace; verify the docs deploy + footer version.

## Decision points (maintainer)

| # | Decision | Default in this plan | Reversal cost |
|---|---|---|---|
| 1 | **Dialectical-bootstrapping unbundle** (alias -> own cand row) | Applied; the d-s fold reasoning had already disclaimed it as "a separate estimation trick" | One-line alias restore + row delete |
| 2 | **13th family `ethics-values-deliberation`** | Applied, candidate-only (mirrors the 12th-family precedent) | Delete family + re-home 4 rows |
| 3 | **ACH at X / reject** vs Gemini's build-on-artifact argument | X / reject preliminary; building on artifact quality despite contradicted human evidence is grade laundering | Vetting can re-grade with evidence on its face |
| 4 | **Estimate-talk-estimate admitted despite the facilitation wall** | Admitted as documentation candidate (famous; dossier is the product) | Move to excl directly |
| 5 | **Phase-5 instrument shelf scope** | Deferred; phase 2 vets the existing 12 first | n/a (additive) |
| 6 | **v0.7.0 scope cut** - ship phases 0-1 alone as a small v0.7.0 and let vetting/builds become v0.8.0, or hold for the full arc | Hold for at least phases 0-2; the cut decides itself by volume when vetting lands | Release timing only |

## Site impact

- `cand` rows already render on the public Framework Library **index** as "Candidate ... (dossier pending)" plain-text rows; the two new family sections appear there and in the generated catalog. No new routes until a dossier or skill exists, so `route-manifest.txt` is untouched by the intake.
- New routes (and route-manifest updates) arrive only in phase 3, via the existing generators; no hand-authored Astro pages are needed at any phase.

## Verification record (intake, 2026-06-11)

- `node scripts/check.mjs`: advanced 0 error(s) 0 warning(s); eval-cases 51 ok; registry conformance OK (135 frameworks, 47 shipped); gen-engine in sync; gen-agents in sync; check-counts OK (47/8/4).
- `npm test`: 43/43 pass.
- `why-not.md`: regenerated byte-identical (all intake rows are `cand`).
