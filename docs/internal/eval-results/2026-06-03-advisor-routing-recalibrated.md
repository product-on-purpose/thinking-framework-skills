# Advisor routing eval - 2026-06-03 (recalibrated re-run)

> Second behavioral run, after recalibrating the advisor's engage test cases. Diff against the baseline [`2026-06-03-advisor-routing.md`](./2026-06-03-advisor-routing.md). Data: [`2026-06-03-advisor-routing-recalibrated.json`](./2026-06-03-advisor-routing-recalibrated.json). Model: `claude-opus-4-8`. Still a model-dependent, small-N measurement, not a gate or a validation.

## Before / after

| Metric | Baseline | Recalibrated | Read |
|---|---|---|---|
| Routing accuracy | 7/12 (58%) | **9/12 (75%)** | +2 net |
| Engage cases that engage | 1/6 | **4/5** | the recalibration's target - fixed |
| Engage output quality | 0.28 | **0.78** | rich prompts produce near-exemplary plans (0.92-0.97) |
| Gate case handled correctly | (none) | **1/1** | the moved-thin prompt is now tested on the right side |
| Name-safety | 12/12 | **12/12** | stable floor across both runs |

## What the recalibration proved

The four rewritten engage cases (e1, e3, e4, e5) went from **gating** (raw ~0.1 quality) to **engaging at 0.92-0.97** - confirming the baseline's diagnosis: those cases were below the advisor's own insufficient-signal gate, so they tested the gate, not engagement. Rewriting them with a concrete decision/problem + stakes + reversibility fixed it. The relocated thin prompt (g1) now correctly elicits exactly one clarifying question, so the gate stays tested on the right side of the ledger.

## The new finding (the eval earning its keep again)

Three cases failed, and they share one cause: **the insufficient-signal gate over-fires and wavers run-to-run.**

- **e6** (a rich engage case that scored 0.95 in the baseline) **flipped to clarify** this run - the advisor withheld a plan it had the signal to produce.
- **d2** (options-in-hand + weighted criteria, a near-verbatim `think-decision-option-review` handoff) and **d3** (a finished-PRD critique, a clear out-of-scope decline) were also met with a clarifying question instead of a clean route/decline. In both, the advisor's own reasoning *named the correct answer* and then declined to act on it.

This is not a regression from the recalibration; it is a genuine, separate advisor-calibration issue (and a vivid demonstration of small-N model-dependence: same model, e6 engaged last run and gated this run). The gate's "no specific signal" test is subjective enough that the model applies it inconsistently and too eagerly.

## Grade impact (kept honest)

The advisor dossier (`evidence/dossier.md`, section 3b) moves from "C, never measured" to **"C, now measured, not validated"**: name-safety 12/12 is a real measured floor; routing (7/12 then 9/12, run-to-run-variable) does not earn a higher grade on single-run, self-authored, small-N, model-dependent evidence. The grade does not rise.

## Recommended next

1. **Calibrate the insufficient-signal gate** in `SKILL.md` (protocol 2): tighten when it fires so it does not pre-empt a clear route/decline (d2/d3) or a signal-bearing engage (e6). Add a few explicit boundary examples (route/decline beats clarify when the move or scope is unambiguous, even if short).
2. Re-run this eval after the gate fix; only then reconsider the routing grade.
3. (Still open from the baseline) optionally widen the eval to per-skill routing across the corpus.
