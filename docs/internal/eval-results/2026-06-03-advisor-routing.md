# Advisor routing eval - 2026-06-03 (first behavioral run)

> The first behavioral (model-judged) measurement of `think-framework-advisor`'s routing, the SP1 C2 layer. Data: [`2026-06-03-advisor-routing.json`](./2026-06-03-advisor-routing.json). Model: `claude-opus-4-8`. This is a periodic, model-dependent, small-N **measurement**, not a gate and not a validation. The enforced every-PR layer is the static `scripts/eval-cases.mjs` validator.

## Headline

| Metric | Result |
|---|---|
| Name-safety (never names a nonexistent framework) | **12/12 (100%)** |
| Decline handling (out-of-scope / direct-handoff) | **6/6** |
| Engagement quality when properly triggered (e6) | **0.95** |
| Engage cases that triggered a plan | 1/6 |
| Routing accuracy (raw) | 7/12 (58%) - **confounded, see below** |

## What this run actually shows

**The advisor is not broken; the engage test cases are miscalibrated.** All five failing "engage" cases (e1-e5) are short prompts (~17-23 words) with no concrete decision content, so they fall below the advisor's own documented insufficient-signal threshold (`SKILL.md`: "under ~40 words, no specific signal: ask one clarifying question before planning"). On every one, the advisor correctly asked a single scoped clarifying question instead of fabricating a plan from nothing. The one engage case with real signal (e6: a free-tier launch decision with stated stakes) produced an excellent Thinking Plan (one dominant job, a minimal WWHTBT -> conditional-premortem sequence, valid names, a non-empty "what NOT to use", no tier inflation).

So the raw 58% is a property of the **test suite**, not the advisor. Read the advisor's behavior by intent and it handled all 12 correctly (5 correct insufficient-signal gates + 1 correct engagement + 6 correct declines). The critical safety property - never inventing a framework name - held at 12/12.

## Why this is not frozen into a grade

The advisor's `evidence/dossier.md` still grades routing conservatively (its own output-check forbids presenting routing as validated). This run does not change that grade: a confounded, single-run, self-authored, small-N, model-dependent number should not be advertised as advisor quality. What it earns is a measured floor on the one property that matters most (name-safety: 12/12) and a concrete test-suite bug.

## Recommended follow-up

1. **Recalibrate the engage cases.** Rewrite `skills/think-framework-advisor/eval/cases.md` cases e1-e5 to carry real signal (a stated decision/problem + stakes + a reversibility cue, >= ~40 words), so they test engagement rather than the insufficient-signal gate. Keep one deliberately-thin prompt as an explicit gate case (move it to "Should NOT trigger / gate" with the gating as the correct behavior).
2. **Re-run** this eval after recalibration and compare. Only then consider whether the dossier's routing grade can move off "C", and only as far as the (still model-dependent) evidence earns.
3. Optionally widen the eval beyond the advisor to a sample of per-skill trigger/anti-trigger routing across the corpus.
