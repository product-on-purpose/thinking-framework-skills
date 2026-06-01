# Affinity Map (Clustered Theme Map) - Worked Example

A completed run of the `affinity-mapping` skill on a real synthesis task. This is the quality bar a generated affinity map should meet.

> Uses the shared recurring scenario: Northwind, a B2B SaaS weighing a self-serve free-tier launch. Here the team has already collected a large, scattered pile of qualitative signal and needs to turn it into a few themes before deciding. See `docs/internal/AUTHORING.md`.

---

## Synthesis subject

- **Question:** What do prospects and trial users actually struggle with, so we know whether a self-serve free tier would help and where it must be strong?
- **Source of items:** 38 sales-call notes from lost or stalled deals + 24 trial-user onboarding survey free-text answers + 19 support tickets tagged "evaluation."
- **Item count:** 81 discrete items.

## Themes and what they tell us (summary)

The pile collapses into five themes. Two dominate: **time-to-first-value is too slow** (people cannot tell if Northwind works for them before their evaluation window or patience runs out) and **buyers cannot evaluate without committing** (procurement, seat minimums, and sales gating block hands-on trial). Both point the same way: a low-friction self-serve path that delivers value fast is responding to a real, repeated signal, not a hunch. A thinner but sharp theme, **wrong-fit prospects waste cycles**, is a warning that a free tier could amplify unqualified volume if there is no light qualification. The two smallest themes (integration gaps, pricing-page confusion) are real but secondary. The headline: demand for self-serve evaluation is well-evidenced; the risk is fit and activation speed, not appetite.

## Theme map

| # | Theme name | What unifies it (one line) | Size (item count) | Weight | Representative items | Confidence |
|---|---|---|---|---|---|---|
| 1 | Slow time-to-first-value | Users cannot reach a useful result before patience or the eval window runs out | 23 | H | "Spent the whole trial just importing data"; "couldn't get a real report out in two weeks"; "gave up before I saw anything work" | Firm |
| 2 | Cannot evaluate without committing | Procurement, seat minimums, and sales gating block hands-on trial | 19 | H | "Wanted to just try it, got routed to a sales call"; "needed a PO before we could touch it"; "min 10 seats killed our pilot" | Firm |
| 3 | Wrong-fit prospects waste cycles | People who were never a fit consumed trials and sales time | 14 | M | "Solo user, no team to collaborate with"; "expected a free CRM, we're not that"; "wrong industry, no use case" | Firm |
| 4 | Integration gaps block adoption | A missing connector stalls the evaluation before value lands | 12 | M | "No Salesforce sync so we couldn't test the real workflow"; "needed our SSO before security would approve a trial" | Firm |
| 5 | Pricing-page confusion | Prospects misread what each tier includes and disqualify wrongly | 7 | L | "Couldn't tell what was in the Pro plan"; "thought feature X was paid-only, it isn't" | Tentative |

## Outliers / parking lot

- "Loved the mobile app" - positive, off-question, not a struggle. One-off.
- "Competitor offered a free migration" - a single competitive-loss note; could be an early signal of a switching-cost theme if more accumulate, but a singleton today.
- "Asked for an on-prem option" - one regulated prospect; parked, not a pattern.

---

*Note how the value is in the deferred, bottom-up clustering with traceability: the themes emerged from 81 scattered items rather than from the team's prior assumptions, each theme points back to the verbatim signal that supports it, and the thin "pricing-page confusion" cluster is flagged Tentative rather than dressed up as a finding. A naive prompt would summarize the pile into a confident paragraph and lose both the weighting and the trail back to the evidence.*
