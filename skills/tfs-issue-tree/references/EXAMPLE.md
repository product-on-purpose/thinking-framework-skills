# Issue Tree - Worked Example

A completed run of the `issue-tree` skill on a real, ambiguous decision question. This is the quality bar a generated issue tree should meet.

> Uses the shared recurring scenario: Northwind, a B2B SaaS weighing a self-serve free-tier launch. See `docs/internal/AUTHORING.md`.

---

## Root question

- **Question:** Should Northwind launch a self-serve free tier?
- **Why it cannot be answered as posed:** It bundles at least four separate judgments (will it grow the funnel, will it convert, can we afford it, will it harm the existing sales motion) into one yes/no, so a direct answer would hide which part is actually in doubt.
- **A tree is warranted because:** the decision is consequential and multi-cause, and the team needs to split the analysis so growth, finance, sales, and product can each work a non-overlapping branch.

## Summary (top of the artifact)

The root "should we launch a free tier?" is broken on a single material axis: **the conditions that must all hold for the launch to be worth it** - demand, conversion economics, cost to serve, and effect on the existing sales-led motion. These four are mutually exclusive (each measures a different thing) and collectively exhaustive (a positive answer needs all four; a clear "no" on any one kills it). The leaves most likely to carry the decision are **free-to-paid conversion among ICP-fit users** (1B2) and **whether the free tier cannibalizes paid** (4A1): the first is the upside the whole bet rests on, the second is the fastest way the bet turns negative. Demand (branch 1A) is least in doubt and is deprioritized.

## Issue tree

```
Should Northwind launch a self-serve free tier?
- Top-level split axis: the conditions that must ALL hold for launch to be worth it
  (chosen because the decision is a conjunction of independent tests, not a single estimate)

  1. Will a free tier bring in enough of the RIGHT demand?
     - Split axis: volume vs. fit
       - 1A  Volume - do enough prospects want a self-serve entry point?
             answered by: top-of-funnel demand signals, search/intent data, waitlist test
       - 1B  Fit - are the free sign-ups ICP-shaped, not tire-kickers?
             answered by: firmographics of a sign-up pilot vs. current ICP

  2. Will free users convert to paid at a rate the model needs?
     - Split axis: trigger vs. friction
       - 2A  Value trigger - does free usage hit a moment that motivates upgrade?
             answered by: instrumented free-to-paid funnel; which feature limits bite
       - 2B  Friction - is the upgrade path low-friction (billing, gating, prompts)?
             answered by: checkout/upgrade UX test; trial-to-paid benchmarks

  3. Can Northwind afford to serve free users at scale?
     - Split axis: variable cost vs. support load
       - 3A  Infra cost per free user vs. the modeled ceiling
             answered by: load test + unit-cost model with hard usage caps
       - 3B  Support load from unqualified free users
             answered by: tickets-per-100-free-users from a pilot; deflection via docs

  4. Will launch harm the existing sales-led motion?
     - Split axis: revenue effect vs. organizational effect
       - 4A1 Cannibalization - do paying/prospective customers downgrade to free?
             answered by: feature-gating analysis; net-new paid MRR vs. pre-launch trend
       - 4A2 Channel conflict - do reps resent or undercut the motion (comp, routing)?
             answered by: sales-leadership sign-off; rules of engagement; comp redesign

  - Other / not covered above: legal, brand-perception, and compliance effects
    answered by: a quick screen; surfaced here so the level stays exhaustive, low priority
```

## Leaf register (the answerable parts)

| Leaf sub-question | Parent branch | What would answer it | Priority |
|---|---|---|---|
| Free-to-paid conversion among ICP-fit users | 1B / 2A (value) | Instrumented funnel on a 6-week pilot; conversion vs. breakeven in the model | H |
| Does free cannibalize paid? | 4A1 | Feature-gating analysis + net-new paid MRR vs. pre-launch trend during pilot | H |
| Infra cost per free user vs. ceiling | 3A | Load test + unit-cost model with usage caps in place | M |
| Sales sign-off / channel conflict | 4A2 | Written rules of engagement and comp redesign agreed with VP Sales | M |
| Top-of-funnel demand for self-serve | 1A | Intent data + a waitlist/landing-page test | L |
| Upgrade-path friction | 2B | Checkout/upgrade UX test against trial-to-paid benchmarks | M |

**Column notes:**
- **What would answer it:** the concrete data, metric, owner, or judgment needed to resolve the leaf. Each leaf here is small enough that a single team can return a number or a yes/no.
- **Priority:** 1B/2A and 4A1 are flagged High because the bet's upside and its fastest downside live there; demand (1A) is deprioritized as least in doubt.

## MECE check

- **Mutually exclusive:** the four top branches measure different things (demand, conversion, cost, motion-effect); no leaf is counted twice. Watched borderline: 1B (fit) and 2A (conversion) are adjacent, so fit is scoped to *who signs up* and conversion to *whether they upgrade* to keep them exclusive.
- **Collectively exhaustive:** a "yes" requires all four conditions; the explicit "Other" branch holds legal/brand/compliance so nothing material falls outside the level.
- **Split-axis sanity:** the top split is on the conjunction of conditions that gate the decision, which is the material axis - a tidier split (for example "by department") would have scattered cannibalization and conversion across owners and hidden the real tests.

## Pruned / out-of-scope branches

- Pricing-page redesign and packaging tiers - downstream execution, not part of the go/no-go question; cut.
- Competitor free-tier moves - relevant context but not a condition for *Northwind's* launch to be worth it; noted, not branched.

---

*Note how the value is in the structure: the vague "should we launch a free tier?" becomes four independent, MECE tests, each with a leaf that names exactly what data would answer it - so the team learns the decision hinges on conversion (2A) and cannibalization (4A1), not on the demand question they were debating. A naive prompt would have argued the yes/no directly and never isolated which condition was actually in doubt.*
