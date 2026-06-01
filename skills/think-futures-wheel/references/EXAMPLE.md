# Consequence Map - Worked Example

A completed run of `think-futures-wheel`, on the shared Northwind scenario. This is the quality bar a generated map should meet.

> Northwind is a B2B SaaS. Here the skill maps the ripple effects of actually launching the self-serve free tier.

---

## Center

- **Change / decision:** Launch a self-serve free tier.

## Consequence map

- **First order: surge in signups** (customer)
  - Second order: support volume rises
    - Third order: support team overwhelmed, paid-customer SLAs slip
  - Second order: mix shifts toward non-ICP users
    - Third order: sales wastes time triaging unqualified leads
- **First order: some paying customers downgrade to free** (financial)
  - Second order: net new MRR slows
    - Third order: board reads Q3 as a miss despite signup growth
- **First order: infrastructure usage rises** (technical)
  - Second order: cloud cost per user climbs
    - Third order: unit economics break if free cohort is large and non-converting
- **First order: competitors see the move** (competitive)
  - Second order: price/feature response, "free tier" becomes table stakes
- **First order: sales comp and routing strain** (team)
  - Second order: rep behavior shifts to protect commissions
    - Third order: reps suppress free signups, undercutting the whole motion

## Flagged branches (high-impact or non-obvious)

| Branch | Why it matters | Watch or do about it |
|---|---|---|
| Downgrade -> MRR slows -> board reads a miss | The growth move could register as a failure on the one metric that triggered it | Instrument free-vs-paid downgrade weekly; pre-brief the board on leading vs lagging signals |
| Support overwhelmed -> paid SLA slips | A growth tactic damaging existing paid customers is a net loss | Cap free usage; ship self-serve docs before launch; set a support-load tripwire |
| Reps suppress free signups | A non-obvious second-order effect that quietly kills the motion | Realign comp and routing before launch, not after |

---

*Note: the value is the second- and third-order branches. A first-order-only view ("more signups, good") misses that the same move can slip paid SLAs, break unit economics, and be quietly sabotaged by the comp plan. This map feeds directly into a premortem.*
