# plan_v0.5.0 - catalog expansion (research prep)

> **STATUS: PHASE 1 APPLIED (2026-06-09).** This folder holds the research + build specs + implementation plans for candidate frameworks, produced by the `think-research-framework` engine. It is a build queue, not a release record. Canonical history stays in [`CHANGELOG.md`](../../../../CHANGELOG.md). Building a skill from a spec here flips its registry entry from `cand` to `shipped`. Phase 1 (the 7 entries below) has been **applied to the registry**: the 3 Build skills are shipped (catalog 37 -> 40), the 2 folds and 2 rejects are recorded with published dossiers. Phase 2 (the remaining ~19 P-tier candidates) is the next queue.

## Phase 1: the M-tier + top-5 P-tier candidates (2026-06-09)

The first 7 candidates were taken through `research -> spec -> plan` (workflow run). The research re-graded each conservatively and tested distinctness against the shipped catalog. Outcome: **3 confirmed Build, 2 Fold, 2 Reject.** Both "M-tier" candidates were honestly downgraded to P (the M-grade research was on adjacent claims - the normative axioms, or systematic deviations - not on the move improving a real decider's outcome).

| Candidate | Prior | Verdict | Status now | Governing tier | Dossier (now) |
|---|---|---|---|---|---|
| Theory of Constraints | cand/P | **Build** | `shipped` | P | `skills/think-theory-of-constraints/evidence/` |
| Expected-value / decision-tree | cand/M | **Build** | `shipped` | **P** (was M) | `skills/think-expected-value-decision-tree/evidence/` |
| Scenario planning (2x2) | cand/M | **Build** | `shipped` | **P** (was M) | `skills/think-scenario-planning/evidence/` |
| Inversion | cand/P | **Fold** -> `premortem` | `fold` | P | `frameworks/inversion/` |
| FMEA-lite | cand/P | **Fold** -> `premortem` | `fold` | P | `frameworks/fmea-lite/` |
| Cognitive bias checklist | cand/P | **Reject** | `excl` | C | `frameworks/cognitive-bias-checklist/` |
| Decision Brief / PR-FAQ | cand/P | **Reject** | `pm` | V | `frameworks/decision-brief-pr-faq/` |

Each candidate's full evidence dossier (with the distinctness proof and the conservative re-grade reasoning) now lives at its admitted location: the 3 Build skills under `skills/think-<slug>/evidence/dossier.md`, and the 4 fold/reject dossiers under `frameworks/<slug>/dossier.md` (the staging path `frameworks/_proposed/` was consumed and removed on admission).

### The 3 Build-ready skills
Distinct moves the catalog genuinely lacks, each with a build spec + implementation plan ready to execute:
- **Theory of Constraints** - find and exploit the single binding system bottleneck (the five focusing steps), distinct from the structural/feedback systems skills.
- **Expected-value / decision-tree** - the **chance node**: put probabilities on uncontrolled outcomes and roll a tree back to an expected value, with a what-flips-it sensitivity note. No shipped skill prices uncertainty this way (decision-option-review is deterministic weighted scoring).
- **Scenario planning (2x2)** - construct a *set* of divergent, internally consistent external futures by crossing the two critical-uncertainty axes, then robustness-test strategy across them. Distinct from futures-wheel (one consequence map), backcasting (one desired path), premortem (one imagined failure).

All three carry a load-bearing "when NOT to use" wall (false precision / risk-of-ruin for EV; not-forecasting for scenarios; not-the-whole-org-rewrite for ToC).

### Registry reconciliation (APPLIED 2026-06-09)
The research overturned or revised 7 `cand` entries; these are now reflected in `frameworks/registry.mjs`:
- `expected-value-decision-tree`: tier **M -> P**, then `cand` -> **`shipped`** (built).
- `scenario-planning`: tier **M -> P**, then `cand` -> **`shipped`** (built; adds the Strategy & Opportunity family).
- `theory-of-constraints`: `cand` -> **`shipped`** (built; tier P unchanged).
- `inversion`: `cand/build` -> **`fold`**, `foldInto: premortem` (its "how would this fail" inversion is premortem's core move).
- `fmea-lite`: `cand/build` -> **`fold`**, `foldInto: premortem` (failure-modes-by-severity is premortem's risk register; the Detection axis is an optional column).
- `cognitive-bias-checklist`: `cand/build` -> **`excl`** (reject; tier P -> C - the self-scan is the most-undercut debiasing intervention, overlaps red-team-light / ladder-of-inference-check diffusely).
- `decision-brief-pr-faq`: `cand/build` -> **`pm`** (reject as a standalone thinking skill; tier P -> V - cognitive core is `pyramid-principle`, distinctive remainder is a pm-skills domain template). Resolved to `pm` rather than `excl` per the dossier's verdict: `excl` would misread a genuinely useful method whose remainder belongs to the sibling library.

The 4 fold/reject dossiers were promoted from `frameworks/_proposed/<slug>/` to `frameworks/<slug>/` and now render as published Framework Library pages.

## Next
- ~~Build the 3 confirmed skills~~ **DONE (2026-06-09):** theory-of-constraints, expected-value-decision-tree, scenario-planning all shipped (`cand -> shipped`).
- ~~Promote the 4 fold/reject dossiers to `frameworks/<slug>/`~~ **DONE (2026-06-09):** published as rejected-with-reasoning Framework Library pages (the Fishbone pattern).
- Phase 2: the remaining ~19 P-tier candidates (expect a similar fold/reject rate). Run `research -> spec -> plan` per candidate, then a reconciliation pass like this one.
