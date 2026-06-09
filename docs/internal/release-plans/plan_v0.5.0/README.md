# plan_v0.5.0 - catalog expansion (research prep)

> **STATUS: PREP.** This folder holds the research + build specs + implementation plans for candidate frameworks, produced by the `think-research-framework` engine. It is a build queue, not a release record. Canonical history stays in [`CHANGELOG.md`](../../../../CHANGELOG.md). Building a skill from a spec here flips its registry entry from `cand` to `shipped`.

## Phase 1: the M-tier + top-5 P-tier candidates (2026-06-09)

The first 7 candidates were taken through `research -> spec -> plan` (workflow run). The research re-graded each conservatively and tested distinctness against the shipped catalog. Outcome: **3 confirmed Build, 2 Fold, 2 Reject.** Both "M-tier" candidates were honestly downgraded to P (the M-grade research was on adjacent claims - the normative axioms, or systematic deviations - not on the move improving a real decider's outcome).

| Candidate | Prior | Verdict | Governing tier | Spec/plan | Dossier |
|---|---|---|---|---|---|
| Theory of Constraints | cand/P | **Build** | P | [spec](spec-theory-of-constraints.md) | `_proposed/theory-of-constraints/` |
| Expected-value / decision-tree | cand/M | **Build** | **P** (was M) | [spec](spec-expected-value-decision-tree.md) | `_proposed/expected-value-decision-tree/` |
| Scenario planning (2x2) | cand/M | **Build** | **P** (was M) | [spec](spec-scenario-planning.md) | `_proposed/scenario-planning/` |
| Inversion | cand/P | **Fold** -> `premortem` | P | - | `_proposed/inversion/` |
| FMEA-lite | cand/P | **Fold** -> `premortem` | P | - | `_proposed/fmea-lite/` |
| Cognitive bias checklist | cand/P | **Reject** | C | - | `_proposed/cognitive-bias-checklist/` |
| Decision Brief / PR-FAQ | cand/P | **Reject** | V | - | `_proposed/decision-brief-pr-faq/` |

Each candidate's full evidence dossier (with the distinctness proof and the conservative re-grade reasoning) is staged under `frameworks/_proposed/<slug>/dossier.md`.

### The 3 Build-ready skills
Distinct moves the catalog genuinely lacks, each with a build spec + implementation plan ready to execute:
- **Theory of Constraints** - find and exploit the single binding system bottleneck (the five focusing steps), distinct from the structural/feedback systems skills.
- **Expected-value / decision-tree** - the **chance node**: put probabilities on uncontrolled outcomes and roll a tree back to an expected value, with a what-flips-it sensitivity note. No shipped skill prices uncertainty this way (decision-option-review is deterministic weighted scoring).
- **Scenario planning (2x2)** - construct a *set* of divergent, internally consistent external futures by crossing the two critical-uncertainty axes, then robustness-test strategy across them. Distinct from futures-wheel (one consequence map), backcasting (one desired path), premortem (one imagined failure).

All three carry a load-bearing "when NOT to use" wall (false precision / risk-of-ruin for EV; not-forecasting for scenarios; not-the-whole-org-rewrite for ToC).

### Recommended registry reconciliation (awaiting maintainer admission)
The research overturns or revises 6 `cand` entries; applying these keeps the registry honest and consistent with the dossiers. Proposed:
- `expected-value-decision-tree`: tier **M -> P** (keep `cand`).
- `scenario-planning`: tier **M -> P** (keep `cand`).
- `inversion`: `cand/build` -> **`fold`**, `foldInto: premortem` (its "how would this fail" inversion is premortem's core move).
- `fmea-lite`: `cand/build` -> **`fold`**, `foldInto: premortem` (failure-modes-by-severity is premortem's risk register with a scoring preset).
- `cognitive-bias-checklist`: `cand/build` -> **`excl`** (reject; tier C - a checklist, weak distinct move, overlaps red-team-light / ladder-of-inference-check).
- `decision-brief-pr-faq`: `cand/build` -> **`excl`** (reject; tier V - a document template, not a distinct cognitive move).

These are admission decisions; they are not applied automatically.

## Next
- Build the 3 confirmed skills (theory-of-constraints, expected-value-decision-tree, scenario-planning) from their specs when greenlit (each flips `cand -> shipped`).
- Phase 2: the remaining ~19 P-tier candidates (expect a similar fold/reject rate).
- The 4 fold/reject dossiers can be promoted to `frameworks/<slug>/` as published rejected-with-reasoning Framework Library pages (the Fishbone pattern) on admission.
