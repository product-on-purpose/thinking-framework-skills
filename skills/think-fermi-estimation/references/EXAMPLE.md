# Fermi Decomposition Worksheet - Worked Example

A completed run of `think-fermi-estimation`, on the shared Northwind scenario. This is the quality bar a generated worksheet should meet.

> Northwind is a B2B SaaS weighing a self-serve free-tier launch. The question on the table: how many *new paying accounts* would the free tier convert in its first year? There is no data to look up - the tier has never existed, and there is no genuine reference class with real base rates for Northwind's funnel. So the number has to be built from factors. (If real comparable base rates existed, this should route to `think-reference-class-forecasting` instead.)

---

## Target quantity

- **What is being estimated:** new paying accounts acquired via the free tier in year one - **unit:** paid accounts / year.
- **Why Fermi (not a lookup):** the free tier does not exist yet and Northwind has no comparable self-serve history, so there is no dataset and no genuine reference class - the number is built from factors.

## Factor chain

`paid accounts/year = monthly site visitors x free-signup rate x free-to-paid conversion rate x 12 months`

## Per-factor bands

| Factor | Low | Best | High | Basis for the guess |
|---|---|---|---|---|
| Monthly site visitors | 20,000 | 40,000 | 80,000 | Current marketing-site traffic is ~40k/mo per analytics; band allows for a launch bump or a soft quarter |
| Free-signup rate (visitor -> free account) | 1% | 2% | 4% | Self-serve signup CTRs cluster low single digits; 2% is a common mid-funnel anchor, basis is analogy not Northwind data |
| Free-to-paid conversion (free -> paid, year one) | 2% | 4% | 8% | Freemium B2B free-to-paid is widely cited in low single digits; wide band because Northwind's tier design is unset |
| Months active | 12 | 12 | 12 | One year, fixed (not a source of uncertainty) |

## Independence check

- Do any two factors share a driver? **Yes - partially.** Free-signup rate and free-to-paid conversion both depend on **how qualified the incoming traffic is**: a campaign that floods the top of the funnel with low-intent visitors would lift signups but depress conversion (and vice versa). They are negatively correlated through traffic quality, which means the true range is somewhat *narrower* than the naive low-times-low / high-times-high band suggests (the extremes partly cancel). Visitors and months are independent of both.
- Action: keep the band but read the floor and ceiling as conservative outer bounds, not equally likely; do not treat signup-rate and conversion as freely independent when reasoning about the tails.

## Combined estimate

- **Point estimate** (best-guesses): 40,000 x 2% x 4% x 12 = **~384 paid accounts/year** (call it ~400).
- **Low** (lows): 20,000 x 1% x 2% x 12 = **~48/year**.
- **High** (highs): 80,000 x 4% x 8% x 12 = **~3,072/year** (call it ~3,000).
- So the answer is roughly **~400 paid accounts in year one**, plausibly between **~50 and ~3,000** - and, per the independence check, the true spread is likely tighter than that raw 50-to-3,000 because signup rate and conversion partly offset.

## Dominant uncertainty

- The factor whose band most widens the range is the **free-to-paid conversion rate** (a 4x span from 2% to 8%, and the least anchored to any Northwind datum). Tightening this one guess - by running a small free-tier pilot or finding a true comparable - would shrink the range far more than refining traffic or signup rate. That, not the headline ~400, is the worksheet's most useful output: it says where to spend effort before betting on the number.

---

*Note: the value is not the point estimate. It is that the worksheet (a) makes every assumption challengeable instead of hiding them in one number, (b) refuses to report ~400 without the ~50-3,000 band, (c) catches that two factors share a driver so the tails do not multiply naively, and (d) names conversion rate as the thing to de-risk first. A bare "we'd get about 400 signups converting" would have buried all four. And the honest caveat stands: this is an order-of-magnitude build-from-factors estimate, not a forecast - if a real reference class turns up, switch methods.*
