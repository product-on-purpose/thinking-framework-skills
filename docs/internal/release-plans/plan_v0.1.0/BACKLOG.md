# MVP backlog and build order

The single source of "what to build next." WIP = 1: build the **Now** skill end to end (per [AUTHORING.md](../../AUTHORING.md)), ship it, then move the pointer. Roster is from the audit (Appendix B canonical roster); names use the `tfs-` prefix and `thinking-framework-skills.<method>` ids.

## Now

> **MVP complete: 14 skills + 4 recipes + eval cases for every skill, all validated (Tier universal, 0/0).** Next build action: the Silver climb (package the recipes as workflow + command components; add per-target Codex emission), and/or the go-public flip (gated on your go: make the repo public, re-pin and merge the held `agent-plugins` listing).

## Build order

Statuses: `done` | `now` | `next` | `later`. The two `wk3` rows are the strong-evidence additions that keep the "evidence-graded" brand honest (the consensus roster skews to practitioner-tier methods).

| # | Skill (`tfs-<method>`) | Family | Evidence (provisional) | Wave | Status |
|---|---|---|---|---|---|
| 1 | `tfs-premortem` | risk-and-resilience | S/M | showcase | **done (v0.1.0)** |
| 2 | `tfs-problem-restatement` | problem-framing | M/P | showcase | **done (v0.1.0)** |
| 3 | `tfs-evidence-vs-inference-sort` | reasoning-clarity | P | showcase | **done (v0.1.0)** |
| 4 | `tfs-what-would-have-to-be-true` | decision | P | showcase | **done (v0.1.0)** |
| 5 | `tfs-scamper` | divergent-ideation | P | showcase | **done (v0.1.0)** |
| 6 | `tfs-ladder-of-inference-check` | assumption-and-belief-challenge | P | mvp | **done** |
| 7 | `tfs-parallel-perspectives-review` | perspective-and-multi-lens | P (flag) | mvp | **done** |
| 8 | `tfs-question-burst` | divergent-ideation | P | mvp | **done** |
| 9 | `tfs-futures-wheel` (sub: second-order-effects) | systems-and-consequences | P | mvp | **done** |
| 10 | `tfs-decision-option-review` | decision-and-option-evaluation | P (flag) | mvp | **done** |
| 11 | `tfs-assumption-reversal` | divergent-ideation | P | mvp | **done** |
| 12 | `tfs-red-team-light` | assumption-and-belief-challenge | P (flag) | mvp | **done** |
| 13 | `tfs-brainwriting` (6-3-5 / NGT) | divergent-ideation | **S** | mvp | **done** |
| 14 | `tfs-reference-class-forecasting` | risk-and-resilience | **S** | mvp | **done** |

## Milestones

- **Showcase (`v0.1.0` -> public preview):** skills 1-5 + 1-2 recipes. Going public also requires making the repo public and re-pinning the held `agent-plugins` listing (branch `stage/thinking-framework-skills-listing`). See the audit, section 6.4 and 6.5 (the demand probe).
- **Full MVP (`v0.2.0`):** skills 6-14 + the four recipes below.

## Recipes (after 2+ composable skills exist; thin command files)

- `/think:reframe-problem` - problem-restatement -> evidence-vs-inference-sort -> parallel-perspectives-review
- `/think:expand-options` - problem-restatement -> scamper -> assumption-reversal
- `/think:stress-test-decision` (marquee) - decision-option-review -> what-would-have-to-be-true -> premortem -> futures-wheel
- `/think:audit-reasoning` - evidence-vs-inference-sort -> ladder-of-inference-check -> parallel-perspectives-review

## Parallel / later (not gates on the Now skill)

- DONE: renamed `_LOCAL` -> `_local` (folder + `.gitignore`). Corpus relocation reconsidered and NOT done: kept private (gitignored `_local/` + the `backup/discovery-corpus-2026-05-31` branch) rather than committed, because the repo is heading public and committing it would expose ~106k words of strategy research in public history. See `docs/internal/research/README.md`.
- DONE: `eval/cases.md` authored for every skill (triggers, anti-triggers, output checks, value-vs-unaided baseline). Not yet executed by a harness; the runner is a Silver-climb item.
- Confirm license (Apache-2.0); decide the Silver climb; the go-public flip at the showcase.

## Post-MVP candidates (recommended next tranche, v0.3) - not yet committed

The highest-value next move is to **finish the empirical core**: the strongest-evidenced methods the MVP did not include. Evidence-grading is the moat (see the audit), and only 3 of the named empirical-core methods shipped (premortem, brainwriting, reference-class-forecasting). Shipping the rest takes the catalog from 3 S-tier anchors to ~9 and makes "evidence-graded" undeniable.

Recommended v0.3 tranche (S-tier first; each also opens or deepens a family):

| Skill | Family | Evidence | Why next |
|---|---|---|---|
| `tfs-argument-mapping` | reasoning-clarity | **S** (ES ~0.7-0.85, van Gelder) | strongest-evidenced reasoning method; deepens reasoning-clarity |
| `tfs-woop` | risk-and-resilience | **S** (25+ RCTs, Oettingen) | strongest-evidenced commitment method; new use case (goal -> action) |
| `tfs-authentic-dissent` | assumption-and-belief-challenge | **S** (Nemeth) | the real-dissent method red-team-light's dossier already points to |
| `tfs-after-action-review` | meta-thinking-and-reflection | S/M | opens the reflection family (currently empty) |
| `tfs-far-analogy-ideation` | divergent-ideation | **S** (Gentner & Smith) | first S-tier ideation method (current ones are P) |
| `tfs-natural-frequency-bayesian` | reasoning-clarity | **S** (Gigerenzer) | makes conditional-probability reasoning tractable; pairs with reference-class-forecasting |

Later tranche (v0.4, fill still-empty families; mostly P, high composability): synthesis (`tfs-mece-decomposition` / `tfs-issue-trees`, `tfs-affinity-mapping`, `tfs-pyramid-principle`); problem-framing (`tfs-abstraction-laddering`); decision (`tfs-one-way-vs-two-way-door`, `tfs-decision-journal`); perspective (`tfs-stakeholder-lens-review`, `tfs-steelmanning`); systems (`tfs-iceberg-model`, `tfs-leverage-points`); strategy (`tfs-opportunity-solution-tree`); foresight (`tfs-backcasting`).

Selection bar unchanged: each must clear the four commitments (mechanism over ritual, honest evidence grade, artifact-not-prose, when-not-to-use) and stay under a ~20% overlap ceiling vs existing skills.
