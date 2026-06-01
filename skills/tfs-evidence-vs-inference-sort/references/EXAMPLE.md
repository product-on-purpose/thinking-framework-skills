# Evidence / Inference Ledger - Worked Example

A completed run of `tfs-evidence-vs-inference-sort`, on the shared Northwind scenario. This is the quality bar a generated ledger should meet.

> Northwind is a B2B SaaS weighing a self-serve free-tier launch. Here the skill audits the reasoning in the proposal that argues for it.

---

## Subject

- **What was sorted:** the proposal "We should build a free tier: our competitors all have one, it will triple signups, and more signups means more revenue, so it pays for itself."

## Ledger

| # | Claim | Type | Basis or source | Confidence (inferences) | Flag |
|---|---|---|---|---|---|
| 1 | Our competitors all have a free tier | Evidence (claimed) | None given | - | uncited - presented as fact, not sourced |
| 2 | A free tier will triple signups | Inference | Extrapolated from competitor presence | low - no comparable baseline or test cited | - |
| 3 | More signups means more revenue | Assumption | Depends on free-to-paid conversion holding | - | unexamined - the load-bearing premise |
| 4 | The free tier "pays for itself" | Inference | Chains claims 2 and 3 | low - inherits the weakness of both | - |
| 5 | Q3 growth target requires this approach | Assumption | No alternatives were compared | - | unexamined - assumes no cheaper option exists |

## Load-bearing unknowns

- **Free-to-paid conversion at Northwind's ICP (claim 3):** the whole case rests on it; verify against current self-serve conversion data before committing.
- **Competitor free-tier reality (claim 1):** presented as fact; confirm which competitors actually offer one and on what terms.
- **Cheaper alternatives (claim 5):** untested assumption that a free tier is the only path to the target.

---

*Note: the value is catching that claims 3 and 5 are unexamined assumptions doing the heavy lifting, and that claim 1 is an uncited assertion wearing the costume of evidence. The skill did not verify any fact; it exposed which "facts" still need verifying.*
