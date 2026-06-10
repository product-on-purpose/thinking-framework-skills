# plan_v0.6.0 - catalog expansion phase 2 (research prep)

> **STATUS: PHASE 2 APPLIED (2026-06-09).** This folder holds the cross-candidate synthesis for the v0.6.0 research sweep: 26 phase-2 candidates were each researched and adversarially verified INDEPENDENTLY, then reconciled in one cross-candidate pass the fan-out could not do (no single agent had seen the whole set together). The reconciliation is now **applied to `frameworks/registry.mjs`**: the 7 Build survivors are shipped skills (catalog 40 -> 47), the 11 folds and 6 rejects are recorded with published Framework Library dossiers, and the 2 recipes ship as `_workflows/` chains. The version cut (0.5.0 -> 0.6.0, RELEASE-NOTES, tag, marketplace re-pin) remains maintainer-gated. Canonical history stays in [`CHANGELOG.md`](../../../../CHANGELOG.md).

> **How this was produced.** A batched Workflow fan-out: one `think-research-framework` engine agent per candidate (real-source evidence grade + distinctness proof + staged dossier + schema-valid proposed entry), pipelined into a per-candidate adversarial-verify stage (refute Builds, validate Fold targets, catch laundered grades), then a single cross-candidate dedupe + synthesis barrier. Research verdict and verify verdict agreed on all 26 (4 minor refinements, 0 majors, 0 evidence-honesty flags). Every proposed entry passed `scripts/check-proposed-entry.mjs`, and every `foldInto` was confirmed against the live registry to resolve to a `status:shipped` slug, before admission. On admission the staged `frameworks/_proposed/` dossiers were consumed: the 7 Build dossiers moved into their skills' `evidence/dossier.md`, and the 17 fold/reject dossiers were promoted to `frameworks/<slug>/dossier.md` as published library pages.

## Phase 2: the remaining P-tier (and a few C-tier) candidates (2026-06-09)

Phase 1 set the honest expectation: even vetted `cand` entries mostly do not survive a deep adversarial run (phase 1 was 3 Build / 2 Fold / 2 Reject). Phase 2 confirms it at scale - **7 Build / 11 Fold / 2 Recipe / 6 Reject across 26 candidates.** Roughly two-thirds fold, reject, or reduce to a recipe. That is the point of the workflow, not a failure of it: blindly building all 26 would have shipped ~17 near-twins, recipes, and group-only protocols that dilute the catalog. The durable deliverable of phase 2 is the same as phase 1 - **the browsable, rejected-with-reasoning dossiers** (the Fishbone pattern): a reader who reaches for "PEST(LE)" or "Six-Hats-style role-play" lands on a page that says where the move already lives and why a separate skill would be redundant.

Research verdict and adversarial-verify verdict AGREED on all 26 candidates. Where the reconciliation differs from a raw read, it is to take the more conservative shape (recipe over fold, fold over Build, reject over a dishonest single fold) and to enforce that every `foldInto` is a `status:shipped` slug.

### Verdict table

| Candidate | Prior | Verdict | Governing tier | foldInto / dossier |
|---|---|---|---|---|
| role-storming | cand/P | **Build** | P | `frameworks/_proposed/role-storming/` |
| morphological-analysis | cand/P | **Build** | P | `frameworks/_proposed/morphological-analysis/` |
| three-horizons | cand/C | **Build** | C | `frameworks/_proposed/three-horizons/` |
| causal-layered-analysis | cand/C | **Build** | C | `frameworks/_proposed/causal-layered-analysis/` |
| pairwise-comparison | cand/P | **Build** | P | `frameworks/_proposed/pairwise-comparison/` |
| minimax-regret | cand/P | **Build** | P | `frameworks/_proposed/minimax-regret/` |
| contradiction-tension-mapping | cand/C | **Build** | C | `frameworks/_proposed/contradiction-tension-mapping/` |
| outside-in-inside-out-framing | cand/P | **Fold** | P | -> `parallel-perspectives-review` |
| worst-possible-idea | cand/P | **Fold** | P | -> `assumption-reversal` |
| lotus-blossom | cand/P | **Fold** | P | -> `issue-tree` |
| alternate-uses-constraint-insertion-removal | cand/P | **Fold** | P | -> `assumption-reversal` |
| counterfactual-reasoning | cand/P | **Fold** | P | -> `after-action-review` |
| regret-minimization | cand/P | **Fold** | P | -> `one-way-vs-two-way-door` |
| pre-commitment-ulysses-contract | cand/P | **Fold** | P | -> `woop` |
| pestle | cand/P | **Fold** | P | -> `issue-tree` |
| dialectical-synthesis | cand/C | **Fold** | C | -> `red-team-light` |
| what-so-what-now-what | cand/P | **Fold** | P | -> `after-action-review` |
| socratic-self-questioning | cand/P | **Fold** | P | -> `ladder-of-inference-check` |
| kepner-tregoe | cand/P | **Recipe** | P | chain (see below) |
| pdca-a3 | cand/P | **Recipe** | P | chain (see below) |
| eisenhower-moscow-pareto | cand/P | **Reject** | P | `excl` |
| white-space-adjacent-possible | cand/P | **Reject** | P | `pm` |
| moat-defensibility-lens | cand/P | **Reject** | P | `pm` |
| insight-statement-generation | cand/P | **Reject** | P | `excl` |
| sensemaking-matrix | cand/C | **Reject** | C | `excl` |
| note-and-vote | cand/P | **Reject** | P | `excl` |

### Recommended registry reconciliation

Proposed edits to `frameworks/registry.mjs` (NOT applied - awaiting admission). All 26 entries are currently `status:cand, verdict:build`; the moves below are the deltas. Every `foldInto` named here is a `status:shipped` slug.

Re-grades (tier moves):
- None. All 26 keep their researched governing tier. Both "tier" disagreements between fan-out and verify were on which adversarial attack was strongest, not on the grade; the grades were already conservatively floored in the dossiers (the three M-graded ideation/strategy studies were excluded from the governing tiers they touch, not laundered upward).

Builds (stay `cand`, verdict `build`, lower priority; admit the staged dossier and build the skill):
- `role-storming` - Build, cand, P. Identity-adoption as a divergent-generation engine.
- `morphological-analysis` - Build, cand, P. The decompose-recombine-prune machine (Zwicky cross-product + cross-consistency assessment).
- `three-horizons` - Build, cand, C. The three-curve transition canvas with the H2-plus/H2-minus split.
- `causal-layered-analysis` - Build, cand, C. The upward layered current-vs-reconstructed rewrite.
- `pairwise-comparison` - Build, cand, P. Rank without a criteria axis or absolute scale, from a binary-vote matrix.
- `minimax-regret` - Build, cand, P. The probability-free opportunity-loss-minimizing selection over states of nature.
- `contradiction-tension-mapping` - Build, cand, C. Diagnose-then-deliberately-not-resolve a permanent polarity (the both/and Polarity Map).

Folds (`cand/build` -> `fold`, with `foldInto`):
- `outside-in-inside-out-framing` -> `parallel-perspectives-review` (two named opposed lenses = a strategy-domain preset of the choose-your-lenses step; same grounds as the folded six-thinking-hats / stakeholder-lens-review).
- `worst-possible-idea` -> `assumption-reversal` (same negate-then-generate engine; object-of-negation difference is in-family variation already folded for Crazy-8s and forced-connections).
- `lotus-blossom` -> `issue-tree` (recursive re-centering is issue-tree's machinery; the fixed-eight fan-out and lotus grid are a branching preset + visual format; same Fishbone fold shape).
- `alternate-uses-constraint-insertion-removal` -> `assumption-reversal` (a frame-plus-metric; the dominant strip-a-constraint half matches assumption-reversal's shipped When-to-Use and When-NOT verbatim).
- `counterfactual-reasoning` -> `after-action-review` (the dominant retrospective reading IS AAR's diagnose-the-why-gap step; the formal Pearl-SCM sense is out-of-scope and capability-negative).
- `regret-minimization` -> `one-way-vs-two-way-door` (same Bezos insight, same recoverable-decision class; emits no separable artifact - the inversion-stance precedent).
- `pre-commitment-ulysses-contract` -> `woop` (the residue an agent can produce is WOOP's if-then Plan bound to a foreseen internal obstacle; the externally-enforced-penalty kernel is distinct but non-shippable).
- `pestle` -> `issue-tree` (a six-bucket macro-environment preset axis over a root-pinned decomposition - the Fishbone -> issue-tree analogue).
- `dialectical-synthesis` -> `red-team-light` (the reproducible solo procedure is construct-oppose-reconcile; the synthesis tail is owned by shipped contradiction-resolution, the group form by authentic-dissent).
- `what-so-what-now-what` -> `after-action-review` (the same generic three-bucket reflective skeleton retro-formats already folds into AAR).
- `socratic-self-questioning` -> `ladder-of-inference-check` (a Paul-Elder six-type bundle; ladder is the best single home for the dominant belief-interrogation reading).

Recipes (`cand` -> `recipe`; a chain of shipped skills, no separable new artifact):
- `kepner-tregoe` -> recipe. Situation Appraisal (router) then Problem Analysis (`issue-tree` cause decomposition) then Decision Analysis (`decision-option-review`, MUST = veto-weighted column) then Potential Problem Analysis (`premortem`, KT itself calls it "a simplified FMEA"). Carry-forward flag: a future, separately-scoped IS/IS-NOT-analysis candidate could merit its own distinctness look.
- `pdca-a3` -> recipe. Plan (`iceberg-model`/`issue-tree` root-cause + `decision-option-review` countermeasure) then a hypothesis-plus-recorded-prediction forward move then Check (`after-action-review`) then a standardize-or-re-loop gate. The forward + iterate-to-standardize residue is control flow plus execution, not a move (the first-principles / idea-quality-audit recipe precedent).

Rejects (`cand/build` -> reject):
- `eisenhower-moscow-pareto` -> `excl` (a three-preset bundle that splinters across theory-of-constraints / one-way-vs-two-way-door / decision-option-review; no single subsumer; the cognitive-bias-checklist reject-on-the-merits precedent).
- `white-space-adjacent-possible` -> `pm` (dominant white-space flavor is Blue Ocean's uncontested-market question, a PM artifact; the adjacent-possible residue is a recipe over abstraction-laddering + scenario-planning; route the market remainder out).
- `moat-defensibility-lens` -> `pm` (the general operation folds to red-team-light, but the irreducible competitive-economics remainder is product-strategy domain, like decision-brief-pr-faq; consistent with the whole strategy-and-opportunity family routing away).
- `insight-statement-generation` -> `excl` (a quality of good synthesis, not an artifact; diffuse sub-threshold overlap with affinity-mapping / abstraction-laddering / problem-restatement; scope-mismatch blocks a clean affinity-mapping fold).
- `sensemaking-matrix` -> `excl` (three shipped skills each breach the ceiling - affinity-mapping, scenario-planning, evidence-vs-inference-sort - so no single fold is honest).
- `note-and-vote` -> `excl` (the capturable residue is a brainwriting -> decision-option-review chain, but the defining value is non-reproducible social governance; mirrors scaled-participation-formats).

### Build-ready survivors

The 7 moves that genuinely clear the bar against the 40 shipped skills AND a 2-step chain of them. Each is staged at `frameworks/_proposed/<slug>/dossier.md` (validated, NOT admitted). All are `cand` (lower-priority), not `next` - the residual on each is priority or narrowness, not distinctness. None has a controlled agent-context study; the C-tier three are honest C (no controlled study at all).

- **role-storming** (P) - artifact: a persona-tagged divergent idea list generated while inhabiting a chosen non-self identity (inhibition-release via ownership-distance + standpoint-distance). When NOT to use: when you need genuine challenge to a thesis (route to red-team-light or authentic-dissent - role-PLAYED dissent underperforms genuine dissent, Nemeth 2001); when the lens should be a fixed evaluative function rather than an arbitrary identity (parallel-perspectives-review).
- **morphological-analysis** (P) - artifact: a parameter-by-value morphological field (Zwicky box) plus a cross-consistency-pruned set of internally consistent configurations. When NOT to use: when the decomposition is a MECE hierarchy you read as a tree, not orthogonal axes you recombine (issue-tree); when you are scoring already-generated options to pick one, not generating by combination (decision-option-review). The cross-product and the cross-consistency assessment are the catalog-absent half.
- **three-horizons** (C) - artifact: a single three-curve transition map - a declining present (H1), a contested middle read in two directions (H2-plus carrying the future vs H2-minus captured by the incumbent), an emerging desired future (H3) - with the actor located in it. When NOT to use: when you want a single committed route from one desired future (backcasting); when you want a SET of uncommitted parallel external futures to robustness-test (scenario-planning). The built skill MUST lead with the H2 transition-zone object and three-curve simultaneity or it collapses toward backcasting.
- **causal-layered-analysis** (C) - artifact: a four-layer matrix (litany / system / worldview / myth) of the current "used future" vs a reconstructed preferred future per layer, anchored by a deliberately changed deep metaphor. When NOT to use: when you only need a downward diagnostic descent to structures and mental models (iceberg-model); when one whole-problem reframed standpoint is enough (frame-creation). The distinct, weakest-evidenced half is the upward layered rewrite - it is the by-product of no nameable shipped sequence.
- **pairwise-comparison** (P) - artifact: a binary-vote ("A beats B") comparison matrix plus the derived ranking and a consistency check, produced WITHOUT a criteria axis and WITHOUT absolute scoring. When NOT to use: when criteria can be articulated and scored on an absolute scale (decision-option-review, which defines itself against this exact case); when you need a fixed formula over named cues for a repeated prediction (linear-model-aggregation). It is a bolt-on second mechanism, not a lens or column.
- **minimax-regret** (P) - artifact: a regret (opportunity-loss) matrix with the minimax pick and the binding worst-case state, chosen with NO probabilities over states of nature. When NOT to use: when you can put a probability distribution on the outcomes and roll a tree back to an expected value (expected-value-decision-tree, which structurally cannot run without probabilities - the exact regime this fills); guard the IIA pathology (Chernoff 1954 - adding a dominated option can flip the pick). Kept formally distinct from regret-minimization (which shares only the word "regret").
- **contradiction-tension-mapping** (C) - artifact: a both/and Polarity Map (two poles; upside and downside quadrant of each; greater purpose and deeper fear; early-warning signs; action steps), built to MANAGE a permanent interdependent tension and deliberately NOT resolve it. When NOT to use: when the trade-off is genuinely dissolvable (contradiction-resolution, which routes the unresolvable-polarity case here from its side); when you must pick a single weighted winner (decision-option-review). Fires only when the tension is genuinely permanent and interdependent.

### Cross-candidate collisions resolved

The pass the fan-out could not do - candidates collapsing into EACH OTHER or into the SAME shipped skill:

- **{regret-minimization, minimax-regret} - the load-bearing collision.** Both are live registry candidates carrying the word "regret"; they share ONLY the word. minimax-regret (formal opportunity-loss matrix) survives as the canonical regret-decision procedure; regret-minimization (affective Bezos reframe) folds OUT to shipped one-way-vs-two-way-door. regret-minimization's artifact-bearing reading IS minimax-regret (~70%), but minimax-regret is `cand` so cannot be a foldInto - hence fold-to-one-way-door now, keep the two formally distinct, and note a future collapse once minimax-regret ships. No double-Build.
- **{dialectical-synthesis, contradiction-tension-mapping} vs shipped contradiction-resolution.** Three terminal engines off one shared contradiction-diagnosis step (dissolve / transcend / manage). Only one is a Build: contradiction-tension-mapping (manage the permanent polarity). dialectical-synthesis (transcend to a third) folds OUT to red-team-light, its synthesis tail owned by shipped contradiction-resolution. The shipped contradiction-resolution entry already routes the polarity case OUT to tension-mapping from its side, keeping shared mechanism under ~20%. Flagged as a future "contradiction triage" consolidation watch item, not a present-day fold.
- **{outside-in-inside-out-framing, role-storming} vs shipped parallel-perspectives-review.** They split on the generate/evaluate line: outside-in-inside-out folds in (two named lenses = a preset of the fixed-functional-lens evaluation), role-storming builds (arbitrary identities as a divergent GENERATION engine). One folds, one builds, on opposite sides.
- **{morphological-analysis, lotus-blossom} - the structural-expansion near-miss.** morphological-analysis builds (it has a genuine non-tree second operation: the cross-product + cross-consistency assessment); lotus-blossom folds to issue-tree (pure recursion, no second operation). The morphological precedent confirms the rule rather than breaking it.
- **Co-folds into the same shipped target (not competing Builds, recorded for consistency).** {worst-possible-idea, alternate-uses-constraint-insertion-removal} both -> assumption-reversal (the reverse/strip-to-ideate family's absorbing home). {lotus-blossom, pestle} both -> issue-tree (the fixed-category / fixed-width decomposition-preset home). {counterfactual-reasoning, what-so-what-now-what} both -> after-action-review, which is also pdca-a3's Check step - three reflection candidates routing through AAR at three strengths (two fold, pdca-a3 stays a recipe because AAR is only ~25% of it).
- **{socratic-self-questioning, insight-statement-generation, sensemaking-matrix} - the diffuse-stance cluster.** Each fragments across multiple sharper shipped skills, but they resolve differently: socratic has one defensible dominant home (ladder-of-inference-check) so it folds; insight and sensemaking each have three shipped skills breaching the ceiling so no single fold is honest - they reject on the merits (the cognitive-bias-checklist precedent).

## Next

- ~~Maintainer admission~~ **DONE (2026-06-09):** the reconciliation is applied to `frameworks/registry.mjs`, the 17 fold/reject dossiers are promoted to `frameworks/<slug>/`, the 2 recipes ship as `_workflows/` chains with prose in `recipes/`, all views are regenerated, and the 5-layer gate is advanced 0/0.
- ~~Build the 7 survivors~~ **DONE (2026-06-09):** all 7 built end to end (catalog 40 -> 47 shipped), including the 3 honest C-tier methods (`three-horizons`, `causal-layered-analysis`, `contradiction-tension-mapping`); a maintainer who wants to ship P+ only can hold those three at `cand`.
- **Release cut (maintainer-gated):** version 0.5.0 -> 0.6.0, RELEASE-NOTES, manifest re-regeneration, the tag, and the agent-plugins marketplace re-pin remain the maintainer's call, per [`docs/internal/release-process.md`](../../release-process.md).
- **Watch item:** the "contradiction triage" consolidation (`contradiction-resolution` / `contradiction-tension-mapping` / `dialectical-synthesis`) flagged above - revisit once more of the cluster is built.
