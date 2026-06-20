# Disciplined SWOT + TOWS - Worked Example

A completed run of `think-swot`, on the shared Northwind scenario. This is the quality bar a generated SWOT should meet: the caveat leads, factors are tagged and pruned, and the TOWS step produces options.

> Northwind is a B2B SaaS weighing a self-serve free-tier launch and feeling stuck on "build it or not."

> **Evidence caveat (read first):** SWOT is tier X. The most-cited study found bare SWOT grids "did not constitute analysis" (Hill and Westbrook 1997). What follows is worth reading only because it is pruned, tagged, and matched into options; the four boxes alone would not be. For rigorous decomposition of this decision, `think-issue-tree` is the stronger move.

---

## Situation

- Should Northwind launch a self-serve free tier to hit the Q3 growth target?

## The grid

| Internal | External |
|---|---|
| **Strengths**<br>- Strong trial-to-paid motion for sales-led deals `[evidence]`<br>- (*) Product already supports usage metering `[evidence]` | **Opportunities**<br>- (*) Large unserved self-serve segment competitors ignore `[assumption]`<br>- Inbound asks for a "just let me try it" path `[evidence]` |
| **Weaknesses**<br>- (*) No self-serve onboarding; today every account is hand-held `[evidence]`<br>- Support team sized for ~200 accounts, not thousands `[evidence]` | **Threats**<br>- (*) Free tier could cannibalize the sales-led pipeline `[assumption]`<br>- Infra cost of free users is unmodeled `[assumption]` |

## Priorities

- Internal: the absent self-serve onboarding (Weakness) is the binding constraint; metering (Strength) is the enabler.
- External: the unserved self-serve segment (Opportunity) is the prize; pipeline cannibalization (Threat) is the risk to disprove.

## TOWS matching

| Match | Strategic option |
|---|---|
| **S-O** (strength to seize an opportunity) | Use existing metering to ship a metered free tier aimed at the self-serve segment, no new billing work. |
| **S-T** (strength to counter a threat) | Gate the free tier below the feature line sales deals need, so it serves self-serve without cannibalizing pipeline. |
| **W-O** (fix a weakness to seize an opportunity) | Build self-serve onboarding first as a thin slice; the opportunity is unreachable without it. |
| **W-T** (defend a weakness meeting a threat) | Cap free-tier seats and model infra cost before launch, so an undersized support team and unknown costs do not compound. |

## What to do next

- The strongest option is W-O: the missing onboarding is the real blocker, so a thin onboarding slice plus a capped, gated free tier (S-T) is the reversible first step. Before committing, verify the two starred `[assumption]` factors: size the unserved segment, and model whether a gated free tier actually cannibalizes pipeline. That verification, not the grid, is where the decision turns.

---

*Note: the grid alone would have been a 20-item dump. The work was pruning to the load-bearing few, separating evidence from assumption, and matching them into options, then handing the load-bearing assumptions to `think-what-would-have-to-be-true` before any build.*
