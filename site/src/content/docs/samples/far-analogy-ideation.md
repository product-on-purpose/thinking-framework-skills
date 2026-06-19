---
title: "Far-Analogy Ideation - quick sample"
description: Far-Analogy Ideation on a city's stalled effort to get residents to recycle correctly without more fines or flyers.
sidebar:
  label: far-analogy-ideation
---

> A compact worked example of [Far-Analogy Ideation](../../frameworks/think-far-analogy-ideation/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-far-analogy-ideation/).

## Situation

Priya analyzes waste programs for a mid-size city. Contamination in the residential recycling stream is stuck near 28 percent, high enough that the processor charges penalty fees and threatens to reject whole loads. Every option on the table looks the same as the last decade's: more fines, more flyers, more "what goes where" signage on the bins. The council wants genuinely different mechanisms to get the right material in the right bin, not another awareness campaign.

## Prompt

```text
/think-far-analogy-ideation "Residential recycling contamination is stuck at ~28% and the processor is charging penalties. Every idea we have is a variant of fines, flyers, or better signage. Reach to distant domains and transfer the underlying mechanism so I get genuinely original options to test, not more of the same campaign."
```

## The artifact

> **Far-Analogy Transfer Sheet**

## Problem (surface)

- How does the city get residents to put the right material in the recycling bin and keep contamination out, without relying on more fines, flyers, or signage?

## Deep relational structure (abstract, domain-stripped)

- A distributed set of independent actors must each make a correct sorting decision at the moment of action, with no supervision present, where one actor's error degrades the value of the whole batch.

## Distant sources and transferred mechanisms

| Distant domain | How it solves the structure (mechanism) | Structural or surface? | Candidate idea (adapted) |
|---|---|---|---|
| Immune system (biology) | The body does not inspect every cell centrally; each item carries a self/non-self marker the local machinery reads, so foreign material is caught at the point of entry, not after | Structural (the item carries the signal that makes the local decision easy) | Move the sorting cue onto the item: a standardized on-package "recycle / trash" mark the resident reads at the bin, so the correct decision is legible at the moment of action rather than recalled from a flyer |
| Casino chip handling (other industry) | High-error, high-stakes sorting happens fast and accurately because the objects are color-and-shape coded to a fixed value, making misclassification visually obvious to anyone, including the actor | Structural (encode the category in the object's perceptible form) | Pilot a small set of clearly distinct, color-coded recycling sub-streams (e.g. paper / rigid plastic / glass) so the right bin is matched by sight, turning a recall task into a pattern-match |
| Multiplayer game loot systems (games) | Players self-correct because the system gives immediate, item-level feedback ("this slot is full," "wrong type") at the instant of the action, not a monthly summary | Structural (feedback co-located in time and place with the decision) | A smart-bin or QR check that gives instant per-item or per-household feedback at disposal time, replacing the delayed, abstract penalty notice |
| Blood donation drives (other industry) | Volume and quality come from local social reciprocity and visible community totals, not from penalties for not donating | Structural (positive local norm and a visible shared goal drive the behavior) | Block- or building-level recycling scorecards with a shared, visible target, so the norm is reciprocal and local rather than enforced top-down |

(Reach far: biology, other industries, games, history. Reject surface-only matches.)

## Shortlist (candidates to test)

1. **On-item legible sorting mark (from the immune system)** - move the decision cue onto the package so the correct choice is read at the bin, not recalled - would have to be true: the city or producers can drive adoption of a standardized, trustworthy on-package mark, and residents act on a cue present at the moment of disposal. Highest-leverage because it attacks the decision point itself rather than upstream awareness, but depends on producer cooperation the city only partly controls.
2. **Instant point-of-disposal feedback (from game loot systems)** - per-household or per-item feedback at the moment of disposal instead of a delayed penalty - would have to be true: a low-cost feedback channel exists (smart bins on a sample route, or a QR self-check) and immediate signals change behavior more than deferred fines. Testable cheaply on one or two routes before any citywide spend.
3. **Color-coded sub-streams (from casino chip handling)** - split into a few visually distinct streams so the right bin is matched by sight - would have to be true: the processor accepts pre-sorted streams at a price that beats the current penalty, and added bins do not raise total contamination through confusion.

---

*Note: the value is reaching past the near, same-industry options (every city's fines-flyers-signage loop) to structural mechanisms - encode the category in the object, co-locate feedback with the decision - that change where and how the sorting choice is made. The mappings are structural (point-of-action legibility, immediate feedback, local norms), not surface ("recycling is green like nature"). These are candidates to test, not answers; the evidence behind far analogy is for human ideation transferred to AI use, not AI-validated, so route the shortlist into a pilot or a decision skill before committing.*

## Why this framework fits

The council's options were all near, same-industry variants that kept failing the same way, so the cognitive job here is to escape the local search space and import a working mechanism from somewhere structurally similar but surface-distant. The transfer sheet gives Priya three testable candidates anchored to a clear mechanism (on-item cues, instant feedback, visible local norms) that "run another campaign" thinking would never surface.
