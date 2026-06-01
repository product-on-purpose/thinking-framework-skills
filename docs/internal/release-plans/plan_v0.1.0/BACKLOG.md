# MVP backlog and build order

The single source of "what to build next." WIP = 1: build the **Now** skill end to end (per [AUTHORING.md](../../AUTHORING.md)), ship it, then move the pointer. Roster is from the audit (Appendix B canonical roster); names use the `tfs-` prefix and `thinking-framework-skills.<method>` ids.

## Now

> **28 skills shipped (MVP 14 + empirical core 6 + coverage 8) + 4 recipes + eval cases for every skill, all validated (Tier universal, 0/0).** 9 are S/S-M tier; the empty families (synthesis, reflection) are now filled. The skill build-out is essentially complete for v0.x. Next: the Silver climb and the go-public flip (both gated on your go). See `docs/internal/research/framework-catalog.md` for the full framework universe and what remains as future candidates.

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

## v0.3 - empirical core (DONE)

The highest-value move was to finish the empirical core: the strongest-evidenced methods the MVP did not include. All six shipped and validated (Tier universal, 0/0), taking the catalog to 9 S/S-M-tier skills of 20.

| Skill | Family | Evidence | Status |
|---|---|---|---|
| `tfs-argument-mapping` | reasoning-clarity | **S** (van Gelder) | **done** |
| `tfs-woop` | risk-and-resilience | **S** (Oettingen, 25+ RCTs) | **done** |
| `tfs-authentic-dissent` | assumption-and-belief-challenge | **S** (Nemeth) | **done** |
| `tfs-after-action-review` | meta-thinking-and-reflection | S/M (Tannenbaum & Cerasoli) | **done** (opened the reflection family) |
| `tfs-far-analogy-ideation` | divergent-ideation | **S** (Gentner & Smith) | **done** |
| `tfs-natural-frequency-bayesian` | reasoning-clarity | **S** (Gigerenzer) | **done** |

Later tranche (v0.4, fill still-empty families; mostly P, high composability): synthesis (`tfs-mece-decomposition` / `tfs-issue-trees`, `tfs-affinity-mapping`, `tfs-pyramid-principle`); problem-framing (`tfs-abstraction-laddering`); decision (`tfs-one-way-vs-two-way-door`, `tfs-decision-journal`); perspective (`tfs-stakeholder-lens-review`, `tfs-steelmanning`); systems (`tfs-iceberg-model`, `tfs-leverage-points`); strategy (`tfs-opportunity-solution-tree`); foresight (`tfs-backcasting`).

Selection bar unchanged: each must clear the four commitments (mechanism over ritual, honest evidence grade, artifact-not-prose, when-not-to-use) and stay under a ~20% overlap ceiling vs existing skills.
