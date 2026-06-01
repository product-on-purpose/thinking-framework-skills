# Stock-Flow Map - Worked Example

A completed run of `think-stocks-and-flows-reasoning`, on the shared Northwind scenario. This is the quality bar a generated map should meet.

> Northwind is a B2B SaaS. The team just cut churn and concluded "we're growing again." This skill checks whether the customer base is actually rising.

---

## Stock

- **The accumulating quantity:** active paying customers - **current level:** 1,000.

## Flows

| Inflows (add to the stock) | Rate / trend |
|---|---|
| New customers won per month | ~30/month, flat (and slightly declining as the funnel weakens) |

| Outflows (drain the stock) | Rate / trend |
|---|---|
| Customers churned per month | was ~50/month; the retention fix cut it to ~35/month |

## Net flow

- Inflow vs outflow right now: 30 in, 35 out = **net -5/month** (still losing customers), even after the churn cut.
- Net-flow trend: improving (the gap closed from -20 to -5), but still negative; and inflow is drifting down, which could re-widen it.

## Corrected trajectory

- The customer base is **still shrinking**, just more slowly (~5/month), not growing. It only starts growing once new-customer inflow (30) exceeds churn outflow (35) - i.e. either win >35/month or cut churn below 30/month.

## Naive intuition it corrects

- "We halved churn, so we're growing." Wrong: churn is a flow; the customer base is the stock. A lower outflow slows the decline but does not reverse it while inflow is still below outflow. The team would have celebrated growth while the base kept eroding.

---

*Note: the value is refusing to read the stock (customer base) off the direction of one flow (churn). The fix reframes the goal correctly: to actually grow, raise inflow above 35 or cut churn below 30 - which sends the team back to the acquisition work (the free-tier / funnel decisions), now with the right target.*
