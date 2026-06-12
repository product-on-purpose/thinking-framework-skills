# Dialectical Estimate - Worked Example

A completed run of the `dialectical-bootstrapping` skill on a real, consequential numeric estimate. This is the quality bar a generated dialectical estimate should meet.

> Uses the shared recurring scenario (Northwind, a B2B SaaS weighing a self-serve free-tier launch) so examples across skills read as one coherent product. Here Northwind must commit a single hard number that feeds the launch's financial model: the free-to-paid conversion rate. Where `think-scenario-planning` builds alternative external worlds for the same launch and `think-premortem` imagines the launch failing, this skill does something narrower and quantitative - it firms up one committed number by polling the inner crowd and averaging. See `docs/internal/AUTHORING.md`.

> The committed answer below is the plain arithmetic mean of the two estimates. It is not the number that "felt right," and it does not sit outside the range of the two. The discipline is the average.

---

## Applicability check (run this first, before any number)

Northwind has never run a free tier, so there is no internal history. The PM needs a single conversion-rate number for the board financial model by Friday, and the analyst who could give an independent read is on leave. The four gates:

| Gate | Pass? | Note |
|---|---|---|
| The question is genuinely **hard** | yes | No prior free tier; conversion is sensitive to product, pricing, and segment - genuinely uncertain |
| Point estimate on a **bounded / familiar scale** | yes | Free-to-paid conversion is a percentage, bounded 0-100, and realistically in a low single-digit band |
| **One-off** commitment | yes | One number is going into the model now; this is not a repeated weekly forecast off fixed cues |
| **No** second judge, reference class, or better data | yes | Analyst on leave; no internal history; published SaaS benchmarks are too heterogeneous to be a real reference class for Northwind's exact motion |

**Also stop if** the estimate hangs on one assumption (it does not - several independent factors move it) or it is qualitative (it is not - it is a percentage).

- **Applicability verdict:** proceed. (Had the quantity been "roughly how big could the free-tier user base get?" - an unbounded order-of-magnitude unknown - this would route to `think-fermi-estimation` instead. Had a clean cohort of truly comparable launches existed, it would route to `think-reference-class-forecasting`.)

## The quantity

- **What is being estimated:** the rate at which self-serve free-tier signups convert to a paid plan within 12 months of the free tier launching.
- **Units and scale:** a percentage, 0-100, expected in the low single digits.

## Estimate 1 (thesis)

- **First estimate:** **4.0%** free-to-paid within 12 months.
- **Basis:** Northwind's product solves a real, recurring pain, and current sales-led trials convert at a healthy clip. The PM mentally anchors on that trial-conversion intuition and the optimistic case the launch deck was built around - a generous free tier that showcases the core value should pull a meaningful slice of free users into paying.

## Assume it is wrong - and why (the antithesis reasoning)

- **Suppose 4.0% is off the mark.** Where could the basis be wrong, and what would a skeptic bring?
  - The anchor is a **sales-qualified-trial** conversion rate. Free-tier signups are unqualified, top-of-funnel, and self-selected for "free" - a very different and much colder population than a sales-led trial.
  - A **generous** free tier risks being good enough to keep many users from ever needing to pay (the free-tier cannibalization effect), which depresses conversion rather than lifting it.
  - Industry experience with self-serve freemium clusters conversion in the **1-5%** band for most products, and broad horizontal tools sit at the low end - the optimistic deck number ignored that gravity.
  - The 12-month window includes a long tail of dormant signups that inflate the denominator without ever converting.
- **Direction the doubts imply:** the first estimate was more likely **too high**, because every correction above pulls conversion down from a warm-trial intuition toward a cold-signup reality.

## Estimate 2 (antithesis)

- **Second estimate:** **2.0%** free-to-paid within 12 months.
- **Basis:** Treating free signups as a cold, self-selected, partly-dormant population and assuming a generous tier satisfies a real share of users without payment, a low-single-digit rate near the middle-low of the freemium band is the realistic read for a first launch with no optimization yet.

## The synthesis (mechanical average)

- **Committed answer = ( 4.0% + 2.0% ) / 2 = 3.0%** free-to-paid within 12 months.
- **Bracketing note:** the two estimates **do** straddle a plausible truth - 4.0% is the warm-anchor optimistic read, 2.0% is the cold-population skeptical read, and the realized rate for a first launch most plausibly sits between them. Because they bracket, the average is doing the work it is meant to do: it cancels part of the optimism baked into the anchor without swinging all the way to the pessimistic floor. The 3.0% goes into the model, not the 4.0% the deck wanted and not the 2.0% the skeptic argued.

## Evidence caveat (carried into every artifact - do not delete)

> This dialectical estimate is an **M-tier (moderate)** aid. The evidence is **transferred from human-subjects studies** (students, online panels, casino patrons; Herzog and Hertwig 2009 and the crowd-within line); none of it validates the procedure performed by an AI agent. The effect is **modest** - about a few percent error reduction at best when it applies - and it is **not a guarantee**: in the original study roughly a quarter of individuals ended up worse off. A **real second judge, a real reference class, or real data would beat this**, and it does not apply to easy questions or unbounded order-of-magnitude unknowns. Treat the 3.0% as a better-anchored single number for the model, not as a validated forecast. If Northwind can run even a small private beta and measure actual conversion, that real data should replace this estimate immediately. See `evidence/dossier.md`.

---

*Note how this differs from its neighbors on the same Northwind launch. `think-scenario-planning` builds several uncontrollable external futures and asks which moves survive them; `think-premortem` assumes the launch failed and reasons back to causes; `think-fermi-estimation` would decompose an unbounded magnitude (how many signups could there ever be?) into multiplied factors. This skill takes one hard, bounded number that has to be committed now, generates a deliberately contrarian second read of it, and averages - the durable move no other skill performs is the averaged pair of self-generated estimates.*
