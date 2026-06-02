# Signed Causal Loop Diagram - Worked Example

A completed run of `think-causal-loop-diagrams`, on the shared Northwind scenario. This is the quality bar a generated diagram should meet.

> Northwind is a B2B SaaS weighing a self-serve free-tier launch. The free tier is meant to drive a viral, self-funding growth engine. This skill closes and signs the loops to see whether that engine is reinforcing, what would balance it, and which loop is likely to dominate - framed as an argument, not a forecast.

---

## Variables in play

- Free-tier signups, Active free users, Word-of-mouth referrals, Paid conversions, Revenue, Support load, Support quality, Free-user experience, Server/cost strain.

## Closed loops (signed)

| Loop | Link path with polarities | Net sign | Label (R/B) | Delay? | What this loop does |
|---|---|---|---|---|---|
| R1 (growth engine) | Active free users -(+)-> Word-of-mouth referrals -(+)-> Free-tier signups -(+)-> Active free users | + (two positives) | R (reinforcing) | yes (referrals build slowly) | amplifies: a virtuous spiral of self-funding growth IF it engages |
| R2 (revenue reinvest) | Paid conversions -(+)-> Revenue -(+)-> Marketing spend -(+)-> Free-tier signups -(+)-> Active free users -(+)-> Paid conversions | + (all positive) | R (reinforcing) | yes | amplifies: revenue funds more acquisition that funds more revenue |
| B1 (support strain) | Active free users -(+)-> Support load -(-)-> Support quality -(+)-> Free-user experience -(+)-> Word-of-mouth referrals -(+)-> Active free users | - (one negative) | B (balancing) | yes (quality erodes before churn shows) | counteracts: rising free users degrade support, which throttles referrals - caps the engine |
| B2 (cost ceiling) | Active free users -(+)-> Server/cost strain -(-)-> Free-user experience -(+)-> Free-tier signups -(+)-> Active free users | - (one negative) | B (balancing) | yes | counteracts: free users you do not monetize raise cost strain that degrades the product, limiting growth |

## Open / linear parts (no loop closed - recorded honestly)

- "Launch announcement -> initial signup spike": a one-time, linear kickoff. It seeds the loops but does not itself feed back, so it is not a loop. (Mapping its downstream consequences acyclically would be `think-futures-wheel`, not this skill.)

## Behavior read-out (an argument, not a prediction)

- **Dominant loop right now:** none yet - at launch the system sits before any loop has gained. The structure argues that **R1/R2 dominate early** (low users, slack support and cost headroom, so the balancing loops are weak), then **B1 and B2 strengthen as free users pile up** and begin to dominate.
- **Resulting dynamic:** **overshoot-then-stall, not a clean spiral.** Reinforcing growth runs first; because the balancing loops act with a delay (support quality and cost strain erode before the slowdown is visible), the likely shape is overshoot - rapid early growth, then a stall or dip as B1/B2 bite. This is the classic "limits to growth" structure, argued from the loop signs, not predicted as a number.
- **What would flip dominance:** raising **Paid conversions** (so R2's revenue actually funds the support and infrastructure that weaken B1/B2) keeps the reinforcing loops on top longer. If conversion stays low, the free tier loads B1 and B2 (cost and support) without feeding R2, and the balancing loops dominate sooner - growth that pays for nothing.
- **Honest scope:** a structured argument about likely dynamics from the loop structure, not a forecast of signup numbers or dates. Another modeler might sign or include loops differently (CLD reliability is a known limit); the value is the explicit, inspectable structure, not a prediction.

---

*Note: the load-bearing move is closing the loops and signing them. The naive story - "free tier -> viral growth -> revenue" - is a one-directional chain (an R-loop narrated without its loop-back, and with the two balancing loops dropped entirely). Signing the loops surfaces that the same free users who drive R1 also feed B1 (support) and B2 (cost), and that the delay makes overshoot, not a smooth spiral, the structure's argument. It also reframes the real lever - paid conversion - as the thing that keeps the reinforcing loops dominant, which routes the decision back to monetization design.*
