# Advisor routing eval - 2026-06-06 (gate-calibrated re-run)

> Third behavioral run, after calibrating the advisor's insufficient-signal gate (`SKILL.md` protocol 2). 2 trials per case x 12 cases. Diff against [`2026-06-03-advisor-routing-recalibrated.md`](./2026-06-03-advisor-routing-recalibrated.md). Data: [`2026-06-06-advisor-routing-calibrated.json`](./2026-06-06-advisor-routing-calibrated.json). Model: `claude-opus-4-8`. Still a model-dependent, small-N measurement, not a gate or a validation.

## The fix under test

The recalibrated run found the insufficient-signal gate (protocol 2) over-firing and wavering run-to-run: it gated **e6** (a signal-bearing engage), **d2** (an options-in-hand handoff to `think-decision-option-review`), and **d3** (a finished-artifact decline). In d2/d3 the advisor named the right answer, then asked a clarifying question anyway. Protocol 2 was rewritten from a length-based reflex ("under ~40 words, no specific signal") into a **last-resort** gate with explicit precedences: a clear route, decline, or signal-bearing engage beats a clarifying question, even on a short input; unstated stakes or reversibility is not itself insufficient signal; and "never name the answer and then ask a question instead."

## Result (2 trials x 12 cases = 24 runs)

| Metric | Recalibrated (prior) | Gate-calibrated (this run) |
|---|---|---|
| Routing accuracy | 9/12 (75%) | **24/24 to the correct category (100%)** |
| The 3 boundary failures (e6, d2, d3) | all failed (gate over-fired) | **all fixed AND consistent across both trials** |
| Run-to-run wavering | e6 flipped engage to clarify between runs | **zero wavering** - all 12 cases gave the same action on both trials |
| Gate case g1 (genuinely thin) | correct | **still correctly clarifies** (the gate fires when it should) |
| Name-safety | 12/12 | **12/12** (every named framework is a real think-*) |

Per-case, both trials: e1/e3/e4/e5/e6 engage; g1 clarify; d1 route to premortem; d2 route to decision-option-review; d3 decline (out-of-scope review); d4 decline-redirect (facilitation); d5/d6 decline (non-thinking task).

**Label note:** d5 (factual lookup) and d6 (coding) were declined via protocol 1's one-line redirect ("use a general assistant"), classified `decline-redirect`. A strict refuse-vs-redirect split would read 20/24, but the decline behavior is correct either way - protocol 1 is itself a redirect.

## What it proves (and does not)

The calibration removed **both** the gate's over-firing (e6/d2/d3 now route or engage correctly) **and** the run-to-run wavering (every case is now consistent across two trials). The wavering was the recalibrated run's central, vivid defect (same model, e6 engaged one run and gated the next). The legitimate gate case (g1) still fires correctly, so the gate was calibrated, not removed.

This does **not** raise the grade. The advisor routing grade stays **C, measured (not validated)**: the measurement is now consistent, but it is still a single eval of self-authored cases, 2 trials, small-N (12), model-dependent, with no external validation. An honest "now consistent" is the improvement; the tier does not move.

## Recommended next

- (Optional, carried from the baseline) widen the eval to per-skill routing across the full corpus.
- The grade rises only on external or larger-N validation, not another self-run.
