---
title: "Storevine weighs build vs buy vs partner"
description: A weighted option matrix on Campaigns - native build, ESP integration, or partner - with an honest sensitivity note.
sidebar:
  label: "Storevine -> build vs buy"
---

> **Dana Okafor**, Group PM for Growth at Storevine, a Series A B2B ecommerce platform (70 staff, 15K merchants, ~$10M ARR). The decision: how to deliver "Campaigns," the native email/SMS feature ~40% of merchants currently leave Storevine for. Prompting style: organized.

This is a complete run, prompt to artifact. Framework: [Decision Option Review](../../frameworks/think-decision-option-review/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

In the first step of this thread, Dana restated the problem: the job is owned reach and attribution, not "an email tool." With that framing fixed, three real ways to deliver it are on the table for Q3 planning, and the choice is genuinely open. Build native email/SMS inside Storevine. Integrate a third-party ESP under Storevine's UI so merchants never see Klaviyo or Mailchimp. Or partner and white-label an existing sender.

The criteria are in tension and nobody has said them out loud. Time-to-value matters because retention is the CEO's stated goal this year. Deliverability is a hard requirement - a bad sender reputation would hurt every merchant on the platform, and Leah Chen on infra has been clear about that. Margin matters because an ESP integration carries a per-message cost that a native build avoids. The Growth pod (Dana plus Sam Reyes' three engineers and one designer) has about one quarter of capacity, so eng load is a real constraint. And mid-market merchants care about data control. Rather than let intuition settle it on shifting, unstated grounds, Dana asks for the tradeoffs made explicit.

## The prompt

```
/think-decision-option-review "Decision: how to deliver Campaigns. Options: (a) build native
email/SMS, (b) integrate an ESP under our UI, (c) partner/white-label. Criteria that matter:
time-to-value for merchants, deliverability risk, gross margin, eng load this quarter, and merchant
trust/data control. Give me a weighted matrix and tell me how sensitive the pick is to the weights."
```

A short structured block: the decision, the three real options, the five criteria that matter, and an explicit ask for the sensitivity. Organized, the way Dana runs everything. The framework supplies the weighting discipline and the honesty about where the scoring is soft.

## The output

> **Criteria-Weighted Option Matrix - Delivering Campaigns**

## Decision

- How to deliver Campaigns (native email/SMS for Storevine merchants), committing roughly one quarter of the Growth pod.

## Options

- A: Build native email/SMS sending inside Storevine (own the infra, the IP-warming, the reputation).
- B: Integrate a third-party ESP under Storevine's UI (merchants never leave; we broker the send).
- C: Partner / white-label an existing sender (resell a partner's product under co-brand).

## Matrix

| Criterion (weight H/M/L, why) | A: Native build | B: ESP integration | C: Partner / white-label |
|---|---|---|---|
| Deliverability risk (H - a hard requirement; bad sender reputation hurts every merchant) | 2 - we own warming + reputation from scratch, the riskiest path; *soft, depends on hiring deliverability expertise we do not have today* | 5 - inherit a mature ESP's reputation + compliance | 4 - partner owns deliverability, but we control it least |
| Time-to-value for merchants (H - retention is the CEO goal; the longer this slips, the more merchants stay on Klaviyo) | 2 - the slowest; full quarter+ before merchants send | 4 - an integration ships within the quarter | 3 - fast to launch, slow to feel native |
| Gross margin (H - per-message cost erodes the unit economics at 15K merchants' scale) | 5 - best long-run margin once infra is paid down | 2 - per-message ESP fee on every send, permanently | 2 - rev-share with the partner caps the upside |
| Eng load this quarter (M - the pod is Dana + 3 eng + 1 designer for ~13 weeks) | 2 - consumes the whole quarter and likely overruns | 3 - fits the quarter with focus | 5 - lightest lift; mostly integration + co-brand |
| Merchant trust / data control (M - mid-market merchants care who touches their buyer lists) | 5 - data never leaves Storevine | 3 - data transits a third party under our contract | 2 - buyer data lives with the partner |

Score scale 1-5; 5 = best on that criterion. **Flagged soft scores:** A's deliverability (2) is the softest number in the matrix - it assumes we build sender reputation from zero without a deliverability hire, and the whole case for A turns on it. B's time-to-value (4) assumes the ESP's API is as clean as their docs claim, unverified until a spike. Treat both as estimates, not measurements.

## Tradeoffs

- **Option A** gives up time-to-value and deliverability safety this quarter for the best long-run margin and the strongest data-control story. It is the right *destination* and the wrong *first move*: it bets a full quarter of the pod on reputation-building the team has never done.
- **Option B** gives up per-message margin, permanently, in exchange for shipping inside the quarter on someone else's proven deliverability. It buys time-to-value and de-risks the hard requirement at the cost of unit economics that worsen as Campaigns scales.
- **Option C** gives up margin and data control for the lightest eng lift, but scores worst on the two things mid-market merchants and Leah's team care most about, so it is hard to recommend despite the easy build.

## Factors that resist scoring

- **Sequencing.** The matrix scores each option as a standalone bet, but B and A are not mutually exclusive over time: B this quarter could be the path that funds and de-risks A later. The single-quarter frame hides that.
- **Negotiating leverage.** Integrating an ESP (B) now gives Storevine real send volume, which is leverage in any future partner or build-vs-buy renegotiation. Not a number, but it shifts the long game.
- **Merchant perception of "native."** A white-label (C) may technically work yet still feel like a bolt-on to mid-market merchants, undercutting the retention goal in a way no criterion above captures.

## Recommendation

- **Recommended:** **B (ESP integration) for this quarter** - confidence **M**. It is the only option that meets the hard deliverability requirement without a team we do not have, ships time-to-value inside the quarter, and fits the pod's capacity. Treat A (native build) as the deferred destination, explicitly gated on a deliverability hire and on Campaigns proving demand under B. Reject C: it loses on the two criteria (data control, native feel) that the retention goal most depends on.
- **Would flip if:** the per-message ESP economics prove untenable at 15K-merchant scale (then A's margin advantage outweighs its risk and we build sooner), **or** Leah's team can credibly own sender reputation this quarter via a deliverability hire (then A's softest score firms up and native becomes viable now), **or** a partner offers terms that fix both margin and data control (then C re-enters).

---

*Note: the value is that the two high-weighted criteria the team would have under-weighted on instinct - deliverability and margin - pull in opposite directions, and a single weighted total would have hidden that B wins by being least-bad on the hard requirement, not by being best overall. This is a lightweight multi-criteria aid (evidence tier P, transferred from human decision practice, not AI-validated); the weighted scores support Dana's judgment, they do not replace it. The pick is sensitive to one number: A's deliverability score. Pressure-test the recommendation before committing the quarter.*

## Why this prompt worked

It named the **decision**, listed the **three real, distinct options**, and - the part most teams skip - it named the **five criteria that actually matter and asked which weights the pick is sensitive to.** That was enough for the framework to do its job: assign honest weights with a reason each, score every option on a stated scale, flag the soft scores instead of laundering them into a clean total, and say out loud what each leading option gives up. Dana did not get a number that "decided" for her. She got a defensible comparison that showed the close call turning on a single soft input, which is exactly the thing to go verify before spending a quarter.

## The handoff to pm-skills

The chosen option and its rationale cross the boundary into the delivery layer. The recommendation - integrate an ESP this quarter, gate the native build on a deliverability hire, reject the white-label - feeds pm-skills' `develop-adr`, where the decision, the options considered, and the flip conditions become a durable architecture decision record, and `develop-solution-brief`, where the constraints (deliverability as a hard requirement, the per-message margin watch, mid-market data control) and the flagged risks (sender reputation, unverified ESP API) become the scope and the open questions the build has to answer. The decision layer hands over a defended choice with its assumptions exposed; the delivery layer turns that choice into a buildable plan.

## Next in the thread

Before committing the quarter to the chosen option, Dana stress-tests it: next in her thread, she [red-teams the Campaigns launch](../storevine-red-team-launch/).
