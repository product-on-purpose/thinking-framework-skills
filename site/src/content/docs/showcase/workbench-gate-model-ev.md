---
title: "Workbench prices the approval-gate model"
description: An expected-value decision tree on lightweight vs strict vs configurable approval gates under uncertain enterprise demand, with the probability assumptions made explicit.
sidebar:
  label: "Workbench -> EV tree"
---

> **Priyanka Rao**, Principal PM for Enterprise at Workbench (Series B, 200 staff, ~500 enterprise customers). The decision: which approval-gate model to build for Blueprints when demand for strict governance is genuinely uncertain. Prompting style: detailed and accountable.

This is a complete run, prompt to artifact. Framework: [Expected Value Decision Tree](../../frameworks/think-expected-value-decision-tree/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

Blueprints, Workbench's reusable templates, is already shipping. The contested addition is approval gates: routing a Blueprint through reviewers before it can publish. About 30% of Workbench's customers are in regulated industries that need SOC2-grade audit trails, and the customer advisory board of ~12 enterprise admins is split. Some segments want strict, multi-stage governance; others want speed and would resent a heavy gate. Priyanka has three real models on the table and a half-year roadmap slot to spend. The arguments in the room are about which segment matters more, which is a disagreement about a number nobody has named. Before her pod (herself, four engineers, and Dr. Elena Voss part-time on compliance) commits, she wants the uncertainty priced, not debated.

## The prompt

```
/think-expected-value-decision-tree "Decide the approval-gate model for Blueprints: (a) lightweight
single-approver, (b) strict multi-stage, (c) configurable per-workspace. Enterprise demand for
strictness is uncertain - some segments need SOC2-grade audit trails, some want speed. Model the
chance nodes (high vs low governance demand) and roll back an expected value for each option."
```

Detailed and accountable, in Priyanka's voice: the three named options, the source of the uncertainty (which segment dominates), and an explicit instruction to model the chance nodes rather than argue the options in prose. The framework supplies the tree, the arithmetic, and the what-flips-it note.

## The output

> **Expected Value Decision Tree - Blueprints approval-gate model**

## Decision

- Which approval-gate model to build for Blueprints, given uncertain enterprise demand for strict governance: lightweight single-approver, strict multi-stage, or configurable per-workspace.

## Options

- A: **Lightweight** - a single named approver gates publish. Fast to author, cheap to maintain, thin audit trail.
- B: **Strict** - mandatory multi-stage review (author -> approver -> compliance sign-off) with a full audit log. Heavy governance, slower authoring, the most build and maintenance cost.
- C: **Configurable** - each workspace admin chooses the gate depth (off, single, or multi-stage) per Blueprint type. Serves both segments, but a configurable gate engine is the most expensive thing to build and the most expensive to maintain.

## Tree

Choice nodes are squares (Priyanka's pod controls them); chance nodes are circles (the market controls them). The load-bearing uncertainty is the same across all three options: whether **governance demand across the ~500 customers lands high** (the regulated ~30% plus enough of the mid-segment to set the requirement) or **low** (most customers want speed and treat a heavy gate as friction). Values are the net 12-month contribution of the roadmap slot, in $K, net of build and maintenance cost and net of the renewal/expansion effect on the affected segment. The probability of "high" is sourced, not guessed (see the probability note).

```
[Decision]
 |
 |--[A: Lightweight] ----( governance demand )-- p=0.45 high [advisory board + segment data] --> +300
 |                                                p=0.55 low                                   --> +900
 |
 |--[B: Strict] ---------( governance demand )-- p=0.45 high                                   --> +1400
 |                                                p=0.55 low                                   --> -200
 |
 |--[C: Configurable] -- build/maint -350 --( governance demand )-- p=0.45 high --> +1400
 |                                                                  p=0.55 low  --> +900
```

## Outcome values

- A, high demand: **+300** (lightweight ships fast and wins the speed segment, but the regulated ~30% cannot adopt without a real audit trail, so the governance-driven expansion is left on the table).
- A, low demand: **+900** (the speed segment is most of the market; a thin, fast gate is exactly what they want, and maintenance is cheap).
- B, high demand: **+1400** (strict governance unlocks the regulated segment's renewals and expansion; the audit trail becomes a competitive differentiator in deals).
- B, low demand: **-200** (the heavy gate is friction for the majority speed segment, authoring slows, some workspaces route around Blueprints entirely, and the build/maintenance cost is not recovered).
- C, high demand: **+1400 gross, then -350** for the configurable gate engine's build and ongoing maintenance (the most complex of the three to build and keep correct under least-privilege rules) -> the rollback applies the -350 to the option, not the leaf.
- C, low demand: **+900 gross, then -350** -> same engine cost applies.
- **Common unit:** $K net 12-month contribution of the roadmap slot vs not building gates.
- **Incommensurable / unpriced:** Workbench's reputation with the regulated segment if it ships a gate that later fails an audit (a SOC2 finding is a trust event, not a line item), and the author-autonomy cost of any gate (least-privilege vs author freedom is a values tension, surfaced in the WB-1 stakeholder matrix). Both are real and are flagged here as judgment inputs, not forced into a dollar figure.

## Rollback (fold back, right to left)

- **Probability note:** p(high) = 0.45 is not invented inside the tree. It is anchored on the customer base (the regulated ~30% are near-certain to need strict governance) adjusted upward for the share of the mid-segment that the advisory board reported would require audit trails within the year. The honest read is that 0.45 carries real estimation error; it is treated below as the single most fragile input. Sourcing a tighter base rate would use `think-reference-class-forecasting`, not a sharper guess inside the tree.
- **Option A chance node:** EV = 0.45 x 300 + 0.55 x 900 = 135 + 495 = **+630**.
- **Option B chance node:** EV = 0.45 x 1400 + 0.55 x (-200) = 630 - 110 = **+520**.
- **Option C chance node:** EV = 0.45 x 1400 + 0.55 x 900 = 630 + 495 = 1125, then subtract the configurable-engine build/maintenance of 350 -> **+775**.
- **Per-option EV:** A = +630; B = +520; C = **+775**.

## Recommendation

- **Chosen:** C, **Configurable per-workspace** - EV **+775**, the highest of the three.
- **Path that produces it:** build the gate engine so each workspace admin sets the gate depth per Blueprint type; the regulated segment turns on multi-stage review with a full audit trail, the speed segment runs single-approver or off. Configurable wins because it captures the high-demand upside (the +1400 governance leaf) without eating the -200 catastrophe that Strict suffers if demand is actually low. It pays a flat 350 premium for that insurance against being wrong about p(high), which is precisely the input we are least sure of.

## What-flips-it (sensitivity)

- **Most fragile input:** the configurable-engine's build and maintenance cost (the 350 premium), closely followed by p(high).
- **Flip threshold:** Configurable (C) beats Lightweight (A) only while the engine premium stays below about **495** (at p=0.45, C's gross 1125 must clear A's 630, a 495 cushion); if the engine proves more expensive to build and keep correct than 495, **Lightweight (A)** wins and the right move is to serve the speed segment now and revisit strict governance later. On the probability side, Strict (B) overtakes Configurable only if p(high) rises above about **0.68** (B's EV in p is 1600p - 200, C's net is 500p + 550; setting them equal gives 1100p = 750, so p = 0.68, where both land near +890); we are at 0.45, well below that, so a single-model strict bet is not justified on the current read, though the margin to that flip (0.45 to 0.68) is tighter than the engine-cost margin. The recommendation is robust to p(high) but genuinely sensitive to the engine cost, which is exactly where the pod's estimate should be pressure-tested before committing.

## Ruin / risk flag

- **Ruin check:** no branch carries literal ruin (no outcome ends the company), but two asymmetric tails are understated by the dollar figures. Strict (B) under low demand is the worst-case: a -200 financial loss that also drags author adoption and could push workspaces to abandon Blueprints, a hard-to-reverse trust loss once authors have routed around the feature. And any model that ships a gate which later fails a customer's SOC2 audit is a reputational event with the regulated segment that no leaf value captures. Configurable's flat premium is, in effect, the price of not betting the regulated segment's trust on a single guess about p(high). This asymmetry is part of why the decision earns a tree rather than a quick call.
- **Risk attitude:** Workbench is a Series B selling governance to regulated enterprises, so a mild risk aversion toward the -200 strict-misfire branch is a real preference, not a bias. It reinforces C (which has no negative leaf) over B. Surfaced here, not used to override the arithmetic, which already points to C.

*Evidence caveat: this framework is tier P (practitioner-grade, transferred). Expected-value maximization is the normatively correct rule given coherent probabilities, but the claim that building a tree makes a real decider choose better than a cheaper rule rests on practitioner evidence from human deciders, none of it from AI-produced trees. The value here is pricing the uncertainty and making the assumptions inspectable, not a measured gain in decision outcomes. See the [dossier](../../frameworks/think-expected-value-decision-tree/) for the full grading.*

## Why this prompt worked

It named the **decision** (which gate model), listed the **three real options**, and pointed at the **one genuine uncertainty** - whether governance demand lands high or low - that should drive the chance nodes. That was enough for the framework to do its job: lay out the tree, force the disputed segment question into a single named probability, roll the arithmetic back to an EV per option, and run the what-flips-it step. The room's argument ("the regulated segment matters more" vs "most customers want speed") became a disagreement about p(high) = 0.45 and a 350 engine premium, both of which can be pressure-tested. Priyanka did not have to know decision theory; she had to know her options and her uncertainty.

## The handoff to pm-skills

The chosen model (configurable per-workspace), its EV rationale, and the two flip thresholds cross the boundary into pm-skills' `develop-adr`. The decision layer hands the delivery layer a real architecture decision record input: the option selected, the alternatives considered and why they lost (Strict's -200 low-demand tail, Lightweight's left-on-the-table regulated upside), the load-bearing assumption (p(high) = 0.45) that the ADR should record as a revisit trigger, and the constraint that the configurable engine must stay correct under least-privilege rules below a ~495 cost ceiling or the calculus flips. The reasoning is the why; the ADR makes it the durable record.

## Next in the thread

This is the last page in Workbench's thread. Back to the [Showcase index](../) for the other companies and journeys.
