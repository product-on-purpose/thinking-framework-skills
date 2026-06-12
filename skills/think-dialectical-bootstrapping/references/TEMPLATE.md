# Dialectical Estimate - Template

Fill this in. The deliverable is the dialectical estimate - the applicability check, two numbered estimates with the reasoning that produced the second, and the mechanical average - not a prose argument.

> The committed answer is the plain arithmetic mean of the two estimates. Do NOT cherry-pick the estimate you prefer, and do NOT land outside the range between the two. The discipline is the average.

---

## Applicability check (run this first, before any number)

All four gates must pass. If any fails, do not run the method - route out as noted.

| Gate | Pass? | If it fails, route to |
|---|---|---|
| The question is genuinely **hard** (not easy or routine) | [yes / no] | No method needed; a forced second estimate harms easy questions |
| The quantity is a **point estimate on a bounded / familiar scale** (a year, a percentage, a count) - not an order-of-magnitude unknown | [yes / no] | `think-fermi-estimation` (decompose the magnitude into factors) |
| It is a **one-off** commitment (not a repeated, cue-based judgment) | [yes / no] | `think-linear-model-aggregation` (mechanical cue weights for repeated judgments) |
| **No** real second judge, **no** real reference class, and **no** better data are available | [yes / no] | A real judge, or `think-reference-class-forecasting` if a reference class exists - both beat the inner crowd |

**Also stop if** the whole estimate hangs on one load-bearing assumption (test the assumption, do not average over it) or the judgment is qualitative (there is nothing to average).

- **Applicability verdict:** [proceed / route out to ___]

## The quantity

- **What is being estimated:** [the single quantity, in one line]
- **Units and scale:** [e.g. a calendar year; a percentage 0-100; a count; a dollar forecast]

## Estimate 1 (thesis)

- **First estimate:** [the single best point estimate, with units]
- **Basis:** [the assumptions and considerations the first number rests on]

## Assume it is wrong - and why (the antithesis reasoning)

- **Suppose the first estimate is off the mark.** Which assumptions behind it could be wrong? What different knowledge would a skeptic bring?
  - [reason 1]
  - [reason 2]
  - [reason 3]
- **Direction the doubts imply:** the first estimate was more likely **[too high / too low]**, because [why].

## Estimate 2 (antithesis)

- **Second estimate:** [a real re-estimate built on the doubts and the implied direction, with units - not the first number shaded slightly]
- **Basis:** [the different assumptions this estimate rests on]

## The synthesis (mechanical average)

- **Committed answer = ( Estimate 1 + Estimate 2 ) / 2 =** [the plain arithmetic mean, with units]
- **Bracketing note:** the two estimates **[do / do not]** straddle a plausible truth (one high, one low). [Bracketing is where the method earns its keep; if both fall on the same side, the average is a smaller, riskier help.]

## Evidence caveat (carried into every artifact - do not delete)

> This dialectical estimate is an **M-tier (moderate)** aid. The evidence is **transferred from human-subjects studies** (students, online panels, casino patrons; Herzog and Hertwig 2009 and the crowd-within line); none of it validates the procedure performed by an AI agent. The effect is **modest** - about a few percent error reduction at best when it applies - and it is **not a guarantee**: in the original study roughly a quarter of individuals ended up worse off. A **real second judge, a real reference class, or real data would beat this**, and it does not apply to easy questions or unbounded order-of-magnitude unknowns. Treat the average as a better-anchored single number, not as a validated forecast. See `evidence/dossier.md`.
