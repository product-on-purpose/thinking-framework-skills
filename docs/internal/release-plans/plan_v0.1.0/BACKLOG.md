# MVP backlog and build order

The single source of "what to build next." WIP = 1: build the **Now** skill end to end (per [AUTHORING.md](../../AUTHORING.md)), ship it, then move the pointer. Roster is from the audit (Appendix B canonical roster); names use the `tfs-` prefix and `thinking-framework-skills.<method>` ids.

## Now

> **`tfs-ladder-of-inference-check`** - trace the jump from data to conclusion to catch silent leaps. Build this next. (Showcase slice 1-5 is complete; this begins the full-MVP tranche.)

## Build order

Statuses: `done` | `now` | `next` | `later`. The two `wk3` rows are the strong-evidence additions that keep the "evidence-graded" brand honest (the consensus roster skews to practitioner-tier methods).

| # | Skill (`tfs-<method>`) | Family | Evidence (provisional) | Wave | Status |
|---|---|---|---|---|---|
| 1 | `tfs-premortem` | risk-and-resilience | S/M | showcase | **done (v0.1.0)** |
| 2 | `tfs-problem-restatement` | problem-framing | M/P | showcase | **done (v0.1.0)** |
| 3 | `tfs-evidence-vs-inference-sort` | reasoning-clarity | P | showcase | **done (v0.1.0)** |
| 4 | `tfs-what-would-have-to-be-true` | decision | P | showcase | **done (v0.1.0)** |
| 5 | `tfs-scamper` | divergent-ideation | P | showcase | **done (v0.1.0)** |
| 6 | `tfs-ladder-of-inference-check` | assumptions | P | mvp | **now** |
| 7 | `tfs-parallel-perspectives-review` | perspective | P | mvp | later |
| 8 | `tfs-question-burst` | ideation | P | mvp | later |
| 9 | `tfs-futures-wheel` (sub: second-order-effects) | systems | P | mvp | later |
| 10 | `tfs-decision-option-review` | decision | P | mvp | later |
| 11 | `tfs-assumption-reversal` | assumptions | P | mvp | later |
| 12 | `tfs-red-team-light` | assumptions | P | mvp | later |
| 13 | `tfs-brainwriting` (6-3-5 / NGT) | ideation | **S** | mvp (wk3) | later |
| 14 | `tfs-reference-class-forecasting` | risk-and-resilience | **S** | mvp (wk3) | later |

## Milestones

- **Showcase (`v0.1.0` -> public preview):** skills 1-5 + 1-2 recipes. Going public also requires making the repo public and re-pinning the held `agent-plugins` listing (branch `stage/thinking-framework-skills-listing`). See the audit, section 6.4 and 6.5 (the demand probe).
- **Full MVP (`v0.2.0`):** skills 6-14 + the four recipes below.

## Recipes (after 2+ composable skills exist; thin command files)

- `/think:reframe-problem` - problem-restatement -> evidence-vs-inference-sort -> parallel-perspectives-review
- `/think:expand-options` - problem-restatement -> scamper -> assumption-reversal
- `/think:stress-test-decision` (marquee) - decision-option-review -> what-would-have-to-be-true -> premortem -> futures-wheel
- `/think:audit-reasoning` - evidence-vs-inference-sort -> ladder-of-inference-check -> parallel-perspectives-review

## Parallel / later (not gates on the Now skill)

- Relocate the discovery corpus into committed `docs/internal/research/` (secret-scan first); rename `_LOCAL` -> `_local`.
- Add `eval/` cases per skill (incl. a run vs a frontier model doing the method unaided).
- Confirm license (Apache-2.0); decide the Silver climb; the go-public flip at the showcase.
