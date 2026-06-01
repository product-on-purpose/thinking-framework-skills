# Multi-Lens Review - Worked Example

A completed run of `tfs-parallel-perspectives-review`, on the shared Northwind scenario. This is the quality bar a generated review should meet.

> Northwind is a B2B SaaS weighing a self-serve free-tier launch. Here the skill gives the decision a rounded look before committing.

---

## Under review

- Launching a self-serve free tier in 6 weeks to hit the Q3 growth target.

## Lenses

| Lens | What it surfaces |
|---|---|
| Facts | Trial-to-paid is down 6 points QoQ; a competitor launched a free tier; current free-to-paid conversion is unknown; the 6-week timeline is fixed by the board date. Missing: cost-per-free-user model, ICP-fit data on free signups. |
| Upside | If conversion holds, a free tier could 3x top-of-funnel and create a durable self-serve growth motion that compounds. |
| Risks | Cannibalizes paid; floods Sales with unqualified users; infra and support cost breaks unit economics; a rushed 6-week build ships an insecure billing path. |
| Intuition | The team is reaching for a competitor's move under board pressure; it feels reactive rather than chosen, and "free tier" may be a proxy for "do something visible about growth." |
| Alternatives | Fix the trial funnel; gated reverse-trial; outbound plus free pilots; extend the trial. Several are cheaper and more reversible. |
| Process | This is a near-one-way door. The big-picture move is to de-risk the two load-bearing unknowns (ICP conversion, cheaper alternatives) before committing the 6 weeks. |

## Synthesis

The upside is real but rests entirely on a conversion assumption the facts cannot yet confirm, and the intuition lens flags that the decision is board-pressure-reactive rather than chosen. The central tension: speed (a fixed Q3 date) versus reversibility (a free tier is hard to unwind). Resolve it by running a small gated pilot to test ICP conversion and a one-day comparison of the cheaper alternatives before committing the build, rather than treating the free tier as decided.

---

*Note: the value is the intuition and alternatives lenses, which a risk-or-upside-only debate would have skipped. Together they reframed the choice from "build it fast" to "de-risk it first."*
