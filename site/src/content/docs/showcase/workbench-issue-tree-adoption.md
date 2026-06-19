---
title: "Workbench structures the adoption question"
description: A MECE issue tree breaking "will enterprises adopt Blueprints?" into what must be true.
sidebar:
  label: "Workbench -> issue tree"
---

> **Priyanka Rao**, Principal PM for Enterprise at Workbench (Series B collaboration platform, 200 staff, ~500 enterprise customers). The decision: whether enterprise customers will adopt Blueprints with approval gates, and what discovery to run before committing the half-year roadmap slot. Prompting style: detailed and accountable, names roles and what each branch is owned by.

This is a complete run, prompt to artifact. Framework: [Issue Tree](../../frameworks/think-issue-tree/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

Blueprints (the reusable templates) is already shipping. The contested addition this quarter is **approval gates** - routing a template through reviewers before it can publish. Marcus Hale, the eng lead, can scope the build. The harder problem is that nobody knows whether enterprises will actually turn the gates on. The customer advisory board of ~12 admins is split, and "will they adopt it?" is too big to answer as one yes/no. Before Priyanka spends a single discovery cycle, she wants the question broken into the parts that must each be true, so the discovery she does run is aimed, not scattered.

## The prompt

```
/think-issue-tree "Question: will our enterprise customers adopt Blueprints with approval gates?
Break it into a MECE tree of what must be true - admin demand for governance, fit with their
compliance regimes, migration cost off their current process, and competitive parity - so we know
what discovery to run."
```

That is the whole prompt. Detailed, in the enterprise voice: it names the root question, the dimensions Priyanka already suspects matter, and the downstream use (deciding discovery). The framework supplies the MECE discipline, the leaf register, and the prioritization.

## The output

> **Issue Tree - Will enterprises adopt Blueprints with approval gates?**

## Root question

- **Question:** Will Workbench's enterprise customers adopt Blueprints with approval gates?
- **Why it cannot be answered as posed:** It bundles at least four separate judgments (do admins want governance, does the gate model fit their compliance regime, is the switching cost off their current process tolerable, and are we at parity with what they can buy elsewhere) into one adoption yes/no, so a direct answer would hide which condition is actually in doubt and across which customer segment.
- **A tree is warranted because:** the decision gates a half-year roadmap slot, adoption is multi-cause, and the ~12-admin advisory board is split - so the analysis needs to be split into non-overlapping branches the team can run discovery against in parallel.

## Summary (top of the artifact)

The root "will enterprises adopt approval gates?" is broken on a single material axis: **the conditions that must all hold for an enterprise admin to turn gates on and keep them on** - demand for the governance, fit with their compliance regime, switching cost off their current process, and competitive parity. These four are mutually exclusive (each measures a different thing) and collectively exhaustive (sustained adoption needs all four; a clear "no" on any one stalls it for that segment). The leaves most likely to carry the decision are **whether the regulated ~30% who need audit trails will require gates rather than merely tolerate them** (1A) and **whether our gate model maps onto their existing change-control and SOC2 evidence requirements** (2A): the first is where the real pull lives, the second is where a plausible-looking feature most easily fails to satisfy an auditor. Competitive parity (branch 4) is least in doubt and is deprioritized.

## Issue tree

```
Will enterprises adopt Blueprints with approval gates?
- Top-level split axis: the conditions that must ALL hold for an enterprise to turn gates
  on and keep them on (chosen because adoption is a conjunction of independent tests across
  segments, not a single demand estimate)

  1. Is there real DEMAND for the governance, not just stated interest?
     - Split axis: regulated need vs. discretionary preference
       - 1A  Required - do the regulated ~30% (SOC2 / change-control) NEED gates to pass audit?
             answered by: compliance interviews with regulated admins; do current audits cite
             the lack of pre-publish review as a finding? (owner: Dr. Elena Voss, compliance)
       - 1B  Preferred - do the non-regulated ~70% want gates enough to configure them?
             answered by: advisory-board survey; share who would enable gates if shipped
             (owner: Priyanka Rao)

  2. Does the gate model FIT their compliance regime?
     - Split axis: control mapping vs. evidence/audit output
       - 2A  Control fit - does pre-publish review map to their change-control policy
             (separation of duties, least-privilege approver roles)?
             answered by: map our role model against 5-6 customers' written control policies
             (owner: Elena Voss + Marcus Hale)
       - 2B  Evidence fit - does the gate produce an audit trail their auditors will accept
             (who approved, when, what changed, immutable)?
             answered by: review the proposed audit-log schema with 2-3 customer auditors
             (owner: Elena Voss)

  3. Is the MIGRATION COST off their current process tolerable?
     - Split axis: process switching cost vs. author-workflow disruption
       - 3A  Process cost - how much rework to move from their current approval tooling
             (email sign-off, separate GRC tools) onto Blueprints gates?
             answered by: current-state interviews; count of steps/tools replaced vs. added
             (owner: Priyanka Rao)
       - 3B  Author friction - do template authors accept the added gate step, or route
             around it (publish outside Blueprints)?
             answered by: prototype walkthrough with authors; measured added time-to-publish
             (owner: Marcus Hale)

  4. Are we at COMPETITIVE PARITY with what they could buy or build instead?
     - Split axis: feature parity vs. switching incentive
       - 4A  Parity - do competing platforms / homegrown workflows already offer equivalent
             gated publishing?
             answered by: competitive scan of the alternatives admins name (owner: Priyanka Rao)
       - 4B  Differentiation - is gated Blueprints enough better/cheaper to justify enabling it?
             answered by: advisory-board preference vs. their current workaround (owner: Priyanka Rao)

  - Other / not covered above: pricing/packaging of the governance tier, and rollout/change-
    management inside the customer's org
    answered by: a quick screen with 2-3 customers; surfaced here so the level stays
    exhaustive, low priority for the go/no-go
```

## Leaf register (the answerable parts)

| Leaf sub-question | Parent branch | What would answer it (data / metric / owner / judgment) | Priority (H/M/L) |
|---|---|---|---|
| Do the regulated ~30% require gates to pass audit (vs. merely tolerate them)? | 1A | Compliance interviews with regulated admins; whether current audits cite missing pre-publish review as a finding (owner: Elena Voss) | H |
| Does our approver/role model map onto their change-control policy (separation of duties, least-privilege)? | 2A | Map the role model against 5-6 customers' written control policies (owner: Elena Voss + Marcus Hale) | H |
| Does the gate produce an audit trail their auditors will accept? | 2B | Review the audit-log schema with 2-3 customer auditors (owner: Elena Voss) | M |
| Will template authors accept the gate step rather than route around it? | 3B | Prototype walkthrough; measured added time-to-publish (owner: Marcus Hale) | M |
| Process switching cost off their current approval tooling | 3A | Current-state interviews; steps/tools replaced vs. added (owner: Priyanka Rao) | M |
| Do non-regulated customers want gates enough to enable them? | 1B | Advisory-board survey; share who would turn gates on (owner: Priyanka Rao) | M |
| Competitive parity with alternatives admins already use | 4A | Competitive scan of named alternatives (owner: Priyanka Rao) | L |

**Column notes:**
- **What would answer it:** the concrete data, interview, or judgment needed to resolve the leaf, and the named owner who returns it. A leaf nobody can answer is not yet a leaf - split it further or restate it.
- **Priority:** 1A and 2A are flagged High because the real pull for gates lives in the regulated segment's requirement, and the fastest way a plausible feature fails is an audit-control mismatch; competitive parity (4A) is deprioritized as least in doubt.

## MECE check

- **Mutually exclusive:** the four top branches measure different things (demand, compliance fit, migration cost, competitive position); no leaf is counted twice. Watched borderline: 1A (regulated demand) and 2A (control fit) are adjacent, so 1A is scoped to *whether they require gates at all* and 2A to *whether our specific model satisfies the control* once they do - kept exclusive so a "yes, they need it" does not absorb "but our design does not fit."
- **Collectively exhaustive:** sustained adoption requires all four conditions; the explicit "Other" branch holds pricing/packaging and internal rollout so nothing material falls outside the level.
- **Split-axis sanity:** the top split is on the conjunction of conditions that gate adoption, which is the material axis - a tidier split (for example "by customer segment" or "by feature area") would have scattered the compliance-fit question across owners and hidden that 2A is where the design most plausibly breaks.

## Pruned / out-of-scope branches

- Detailed gate-model choice (lightweight single-approver vs. strict multi-stage vs. configurable per-workspace) - that is the next decision, priced separately once adoption conditions are understood; noted, not branched here.
- UI design of the approver inbox - downstream execution, not a condition for adoption; cut.
- Workbench's own internal maintenance cost of a configurable gate model - a real tension, but it bears on *which model to build*, not on *whether enterprises would adopt gates at all*; deferred to the model decision.

*Evidence note: the issue tree is a practitioner-grade method (tier P). It structures the adoption question for coverage and tractability and tells the team where to aim discovery; it does not by itself answer whether enterprises will adopt, and a MECE-clean tree split on the wrong axis can be tidy and useless. The value here is that "will they adopt?" became four owned, testable conditions - not a better answer on its own. See the [dossier](../../frameworks/think-issue-tree/) for the full grading and caveats.*

## Why this prompt worked

It named the **root question**, supplied the **candidate dimensions** Priyanka already suspected (demand, compliance fit, migration cost, parity), and stated the **downstream use** ("so we know what discovery to run"). That was enough for the framework to do its real job: enforce MECE so the four dimensions did not overlap, drive each branch down to leaves that name a concrete owner and data source, and flag the two leaves (1A regulated requirement, 2A control fit) most likely to carry the decision. The detailed, role-naming style paid off directly - because Priyanka named accountability in the prompt's spirit, the tree could assign Elena Voss the compliance leaves, Marcus Hale the author-friction leaf, and Priyanka the demand and competitive leaves, turning a vague "will they adopt?" into a discovery plan with owners.

## The handoff to pm-skills

Each branch of the tree becomes a discovery question, which is exactly the input pm-skills' `discover-competitive-analysis` needs to be structured rather than ad hoc. What crosses the boundary is the decomposition itself: the four conditions (regulated demand, compliance-regime fit, migration cost, competitive parity), the high-priority leaves Workbench must validate first (the regulated segment's requirement and the audit-control mapping), and the named owners for each. The decision layer hands the delivery layer a question already broken into what must be true, so the competitive analysis is organized around the conditions that gate adoption instead of a generic feature comparison.

## Next in the thread

Priyanka has the adoption question structured and the discovery aimed. Next she has to pick the actual gate model under genuinely uncertain demand: [Workbench prices the approval-gate model](../workbench-gate-model-ev/).
