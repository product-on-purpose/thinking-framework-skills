---
name: think-fermi-estimation
description: Produces a Fermi decomposition worksheet that estimates an unknown numeric quantity by factoring it into a chain of order-of-magnitude sub-estimates, guessing each to within a band, then multiplying back to a point estimate plus a compounded low/high range, with an independence check and a dominant-uncertainty flag. Use when you need a number and no lookup-able data or genuine reference class exists, so the magnitude has to be built from factors (for example sizing a market, a load, a cost, or a conversion you cannot look up). Not for forecasting from real base rates (use reference-class-forecasting) or decomposing a question for coverage with no number (use issue-tree).
license: Apache-2.0
metadata:
  id: thinking-framework-skills.fermi-estimation
  family: decision-and-option-evaluation
  evidence-tier: "M/P"
  version: 0.1.0
  standard: "0.8"
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Fermi Estimation

Sometimes you need a number and there is nothing to look up: no dataset, no genuine reference class, no precedent to borrow. A single all-at-once guess at the whole magnitude is badly anchored and hides its own uncertainty. The Fermi move is to **factor the unknown into a short chain of sub-quantities** - each one small and familiar enough to guess to within a factor - then multiply the chain back into an estimate and compound the per-factor bands into a low/high range. The reason it can beat one wild guess is **partial error cancellation**: if the per-factor errors are roughly independent and centered, over-guessing one factor and under-guessing another tend to offset in the product. The output is a **Fermi decomposition worksheet**, not a lone number. The honest constraint: the cancellation only works when the factors are independent, and the benefit is real mainly for large, unfamiliar quantities - not ordinary ones you could estimate directly.

## When to Use

- You need a numeric magnitude and **no lookup-able data and no genuine reference class** exists, so the number has to be built from factors.
- The quantity is **large and unfamiliar** (market size, total load, total cost, a conversion count you cannot look up) - the regime where decomposition actually helps.
- An **order-of-magnitude** answer with an honest band is useful for sizing, sanity-checking, or triage; the number does not have to be exact.
- You want the estimate **inspectable**: each factor, its basis, and its band exposed so a reader can challenge one number, not an opaque total.

## When NOT to Use

- **A genuine reference class with real base-rate data exists.** Then anchor on that data, not on invented factors - use `think-reference-class-forecasting`. Fermi is precisely the build-from-factors method for when no such class exists; if you have real base rates, reference-class forecasting is strictly better.
- **The task only needs the question decomposed for coverage, not a number.** If you want a mutually-exclusive, collectively-exhaustive breakdown of a question and explicitly *no* estimate, use `think-issue-tree`, which produces a tree and produces no number. Fermi exists to produce a number; do not use it when a number is not wanted.
- **The quantity is ordinary and familiar.** Decomposing something you could estimate directly adds noise; the decomposition benefit was absent or negative in that regime (see `evidence/dossier.md`).
- **The factors share a driver (correlated).** Multiplicative error-cancellation fails when factors move together; the chain can be worse than one careful guess. Flag it and restructure to independent factors, or stop.
- **Never emit a point estimate with no low/high band.** A Fermi number without its range hides the uncertainty the method exists to expose.

## Instructions

When asked to estimate a magnitude with no data to look up, follow these steps:

1. **State the target quantity precisely**, with its unit. Confirm there is no real base-rate data or reference class to use instead (if there is, route to `think-reference-class-forecasting`). Confirm a number is actually wanted (if not, route to `think-issue-tree`).
2. **Build the multiplicative factor chain.** Write the unknown as a product of sub-quantities, each one small and familiar enough to guess to within roughly a factor. Keep the chain short; prefer factors you can anchor.
3. **Give each factor a band and a basis.** For every factor, state a low / best / high guess, and **where the number came from** (a known datum, an analogy, a plausible range). A factor with no stated basis is just a guess in disguise.
4. **Run the independence check.** Ask whether any two factors share a driver (move together). If they do, the error-cancellation premise breaks - flag the correlated factors and either restructure to independent factors or note that the range is unreliable.
5. **Combine.** Multiply the best-guesses for the **point estimate**. Multiply the lows for the range floor and the highs for the range ceiling to get the **compounded low/high range**. Report the estimate as the point value *and* the range, never the point alone.
6. **Flag the dominant uncertainty.** Name the one factor whose band most widens the combined range - that is where tightening one guess would most improve the answer.
7. **Emit the Fermi decomposition worksheet** per `references/TEMPLATE.md`.

## Output Format

Use the template in `references/TEMPLATE.md`. The deliverable is the worksheet: the factor chain, per-factor low/best/high with bases, the point estimate, the compounded low/high range, the independence check, and the dominant-uncertainty flag - not a single number and not prose.

## Quality Checklist

Before finalizing, verify:

- [ ] The target is genuinely a build-from-factors magnitude: no real base-rate data or reference class was available (else use reference-class-forecasting), and a number is actually wanted (else use issue-tree).
- [ ] The unknown is written as a multiplicative chain of factors, each small enough to guess to within a factor.
- [ ] Every factor has a low/best/high band **and** a stated basis for the guess.
- [ ] The independence check was run, and any correlated factors (sharing a driver) are flagged rather than silently multiplied.
- [ ] The output gives a point estimate **and** a compounded low/high range - never a point estimate alone.
- [ ] The dominant-uncertainty factor is named.
- [ ] No overclaim: the method gives directional, order-of-magnitude help for extreme uncertain quantities under an independence condition; it does not give a precise or proven number (see `evidence/dossier.md`).
- [ ] The output is the Fermi decomposition worksheet artifact, not prose.

## Evidence

Tier **M/P**, transferred-evidence. The mechanism - judgmental multiplicative decomposition - has *some* controlled support: MacGregor & Armstrong (2007, *Decision Sciences*, "Judgmental Decomposition: When Does It Work?") and MacGregor (2001, in Armstrong ed., *Principles of Forecasting*) report that breaking an estimate into parts and recombining can reduce error - that earns the M half. Three facts cap it below a clean M and demand honesty: (1) the benefit is **conditional**, present for extreme/uncertain (large, unfamiliar) quantities and absent or negative for ordinary ones; (2) the multiplicative cancellation premise is **sensitive to correlated component errors**, which erode the benefit; (3) the base is essentially a single multi-problem study line plus field lore (the "within an order of magnitude" track record) plus a statistical argument (log-normal / geometric-mean cancellation), **not** replicated or meta-analytic. This skill therefore cites **no effect-size figure**; widely-repeated numbers could not be verified to a primary source and would overstate the grade. The evidence is human-subject, **not** AI-agent-validated. Full grading, sources, and the deliberately-omitted statistics: `evidence/dossier.md`.

## Examples

See `references/EXAMPLE.md` for a completed Fermi decomposition worksheet on the shared Northwind scenario.
