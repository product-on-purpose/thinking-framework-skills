---
title: "Storevine red-teams the Campaigns launch"
description: Before committing the quarter, the strongest case against shipping Campaigns, ranked by damage.
sidebar:
  label: "Storevine -> red-team"
---

> **Dana Okafor**, Group PM for Growth at Storevine (B2B ecommerce, 70 staff, 15K merchants). The decision: commit the Growth pod for a quarter to build Campaigns natively. Prompting style: organized.

This is a complete run, prompt to artifact. Framework: [Red Team Light](../../frameworks/think-red-team-light/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

The option is chosen. Storevine restated the problem (owned reach, not an email tool), then ran a weighted option matrix that picked a native build over an ESP integration or a partner. Now Dana has to ask her Q3 planning group for a full quarter of the Growth pod - herself, three engineers, and a designer - on Campaigns. The room agrees. That easy agreement is exactly what makes her want to hear the strongest case against it before the commitment is signed, not after. So she points the red team at her own decision.

## The prompt

```
/think-red-team-light "We've decided to build Campaigns natively this quarter. Before we commit,
argue the strongest honest case against it - deliverability, support load, margin, merchant churn
risk - and rank the objections by how much damage each does if true."
```

Organized: the decision stated plainly, the four risk surfaces named, and one instruction - rank by damage. The framework supplies the adversary.

## The output

> **Adversarial Critique - Native Campaigns, Q3 build**

## Thesis under attack

- Building Campaigns (native email/SMS) ourselves this quarter is the right way to keep merchants from exporting their lists to a third-party ESP, because owned reach drives the retention the CEO has made this year's goal, and a native build keeps the margin and the data inside Storevine.

## Strongest objections (ranked by force)

| Rank | Objection (steelmanned) | Damage if true | How the thesis must answer it | Can it? |
|---|---|---|---|---|
| 1 | Deliverability is a multi-quarter operations problem, not a build. A native sender pooled across 15K merchants means one bad actor can tank the shared sender reputation, and every merchant's mail lands in spam. A native MVP in 13 weeks will not have warmed IPs, complaint-rate monitoring, or per-merchant authentication mature enough to be safe. | Fatal - if shared deliverability degrades, the feature actively harms the merchants it was meant to retain, and the harm is invisible until inboxes go cold | Show a credible deliverability and sender-reputation plan that Leah's infra team has scoped inside the quarter, including isolation of bad senders | Not yet; the deliverability scope has not been costed against the 13 weeks |
| 2 | The retention thesis is unproven. We assume merchants who export to Klaviyo will adopt a native tool and that doing so reduces churn, but we have no evidence the export is why they leave - they may stay for the storefront and leave for unrelated reasons. A quarter buys a feature that may not move the metric the CEO is judging us on. | Severe - we spend the pod's quarter and retention does not move, and Campaigns becomes a feature we cannot kill without admitting the bet failed | Cite or pilot the link between native reach and merchant retention, even a cohort read on exporters vs non-exporters | Weakly; we have the 40%-export figure but no churn correlation |
| 3 | Support and abuse load will swamp a team sized to build, not to operate. Email/SMS invites spam complaints, opt-out compliance (CAN-SPAM, TCPA), and "why did my campaign bounce" tickets across a long tail of SMBs. Sam's three engineers cannot both ship and run an abuse desk. | Severe - operational load eats the pod after launch and there is no separate ops owner staffed | Name who operates Campaigns after launch and budget the support and compliance load, not just the build | Not yet; no post-launch operating owner is named |
| 4 | Margin may be worse native than the ESP integration we rejected. We assumed owning the pipe protects margin, but at 15K merchants the deliverability tooling, compliance, and on-call we now have to build and run may cost more than the per-message ESP fee we were avoiding. | Moderate - weakens the central margin argument for build over integrate | Show the all-in native cost (build plus ongoing ops) against the per-message ESP cost at our volume | Not on current numbers; only the per-message ESP cost was modeled |
| 5 | Thirteen weeks forces a thin, compliance-light path. Opt-out handling, consent records, and rate-limiting are not optional for email/SMS, and under time pressure they are the first things cut. | Moderate - regulatory and reputational exposure, but manageable with a hard scope gate | Commit to a compliance gate and cut feature scope, not the legal floor | Yes, if scope is frozen early and the gate is real |

## Verdict

- **Decisive objections** (would sink or substantially change the plan): #1 (deliverability) and #2 (the unproven retention link). Either, if true, undermines the whole commitment. #1 is the more dangerous because it can harm every merchant, not just waste our quarter; it must be scoped by Leah's infra team before the pod is committed. #2 is cheap to test - a cohort read on whether exporters churn more - and should be checked before, not after, the build.
- **Survivable objections:** #3 (real, but addressable by naming a post-launch operating owner and budgeting the support and compliance load now), #4 (forces an honest all-in cost comparison, may still favor build), and #5 (manageable with a frozen scope and a compliance gate).
- **Genuine dissent needed?** Yes. Committing a quarter of the Growth pod with the CEO's retention goal riding on it is close to a one-way door once the team is staffed and the roadmap is public. This critique is constructed dissent - the model role-playing the adversary - and role-played dissent does not carry the weight of someone who genuinely believes Campaigns is the wrong bet. Before the commitment is signed, have Leah argue #1 and someone who actually doubts the retention thesis argue #2, rather than relying on this critique alone.

*Note: the value is ranking deliverability and the unproven retention link as decisive while support load, margin, and compliance are survivable with named owners and gates. The honesty flag matters here: the model can articulate the case against its own plan, but on a near-one-way-door commitment the team should hear #1 and #2 from people who actually hold them, especially Leah on deliverability.*

## Why this prompt worked

It named the **decision** ("build Campaigns natively this quarter"), named the four **risk surfaces** Dana already half-feared (deliverability, support load, margin, churn), and gave the one instruction the framework needs - **rank by damage, not by ease**. That was enough for the red team to do its job: state the thesis fairly, build steelmanned objections beyond the four she named (it added the compliance-light path), order them by how much each hurts if true, and flag that the two decisive objections deserve a real dissenter, not just constructed dissent. Dana did not have to script the adversary; she had to name what she was committing to and trust the framework to argue the other side honestly.

## The handoff to pm-skills

The ranked objections do not stay in the decision layer. They become the risks section of pm-skills' `deliver-prd`, the delivery doc Sam's pod writes before the build starts. What crosses the boundary is the commitment (a native Campaigns build, one quarter of the Growth pod), the constraints that survived the critique (deliverability must be scoped by infra, a post-launch operating owner must be named, a compliance gate is a launch floor not a follow-up), and the two decisive risks with their cheap tests - the deliverability scope and the exporter-churn cohort read - so the delivery team inherits a risk register that already knows which objections are fatal and which are survivable.

## Next in the thread

That closes Storevine's thread: reframe the request, weigh build vs buy vs partner, then red-team the launch before committing. Back to the [Showcase index](../) for the other companies and journeys.
