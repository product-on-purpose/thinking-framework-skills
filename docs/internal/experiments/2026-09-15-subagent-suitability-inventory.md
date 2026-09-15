# `execution.subagent_suitable` does not select anything, and the unit C3-3 wants is a recipe

**Date:** 2026-09-15
**Status:** answered - phase 1 of C3-3 (reasoning subagents) complete; phase 2 needs a maintainer decision.
**Spec:** [`2026-08-15-plugin-surface.md`](../specs/2026-08-15-plugin-surface.md) phase 3.

## Why this was run first

The spec says selection must be data-driven from `execution.subagent_suitable` - and then names *"an adversarial reviewer, a decision auditor, and a synthesis role"* as the natural candidates.

**Those two instructions disagree.** Every adversarial and every decision skill carries `false`. So the spec's own instruction applied:

> *"Inventory those fields first; if they turn out to be stale, fixing them is part of this phase rather than a reason to ignore them."*

## The field is not a usable selection input

| | |
|---|---|
| sidecars | 67 |
| `subagent_suitable: true` | **3** - and one is `think-research-framework`, which already *is* the subagent. So **2 of 66**. |
| carrying any rationale comment | **2 of 67** |
| `think-affinity-mapping` | `true`, with **no** rationale |
| `think-brainwriting` | `true`, rationale *"parallel streams map naturally to parallel sub-agents"* - a **parallelism** argument, not a "returns only the artifact" one |

**No field explains the split.** `primary_family` does not track it. `mode` does not either: one `true` is `inline`, the other `forked`.

**And the two trues are the worst picks under the obvious criterion.** Ranked by `references/TEMPLATE.md` size - the available proxy for how large a deliverable is - `affinity-mapping` sits at **rank 38 of 66** and `brainwriting` at **rank 60**, both below the 2005 B median, with `brainwriting` near the smallest in the catalog. If artifact size were the rule, these two would be excluded by it.

Every one of the spec's named candidates reads `false`, unexplained:

```
red-team-light  authentic-dissent  parallel-perspectives-review
decision-option-review  one-way-vs-two-way-door  premortem  issue-tree     all false
```

**Verdict: the field was authored per skill against no written criterion, drives nothing, and cannot select subagents.** That is the condition the spec anticipated.

## The criterion was never written down, and the obvious one is backwards

The instinct is that a subagent suits a **context-hungry** skill - one that reads a lot. Measured against the catalog, almost nothing qualifies: only five skills instruct reading repo files or the web at all, and four of those do it once. The 63 thinking skills are overwhelmingly situation-in, artifact-out, and cheap to run inline.

**So 64 sidecars reading `false` is probably correct.** What is missing is the reason.

The property that actually pays is on the **caller's** side, not the skill's:

> A subagent earns its keep when the caller wants the **deliverable without the derivation** - when running the thing inline would fill the conversation with working that the caller will never read again.

That is why `think-research-framework` is a subagent: it does live web research and reads the whole catalog, and the caller wants the dossier, not the search.

## The unit is a recipe, not a skill

Under that criterion the strongest candidates in this repo are not skills at all:

| recipe | distinct skills chained |
|---|---|
| `think-stress-test-decision` | **7** |
| `think-expand-options` | 6 |
| `think-pdca-a3` | 5 |
| `think-audit-reasoning`, `think-reframe-problem`, `think-kepner-tregoe`, `think-issue-position-argument-mapping` | 4 |
| `think-first-principles`, `think-idea-quality-audit` | 3 |

Every recipe chains **3 to 7** skills. Run inline, a recipe drops three to seven intermediate artifacts into the caller's context when the caller wants the last one. That is the exact shape the criterion describes, it is already true of nine shipped things, and none of them carries a suitability field at all.

A single premortem produced **12,494 characters** in a 2026-09-15 smoke run. A seven-skill chain produces that several times over, and the caller needs one of them.

## What changed here, and what waits

**Done:** `artifactChars` now survives into the `.json` scorecard. The harness has measured it on every run and the `.md` has always printed it in a table, but the `.json` dropped it - so the one machine-readable record of artifact size existed only as rendered markdown, and this question had to be answered with a template-size proxy. From the next output run, it can be answered with the real number.

**Deliberately NOT done: re-authoring `subagent_suitable` across 67 sidecars.** Doing it on a proxy would repeat the mistake that created the problem - authoring a field against an unwritten rule. The next output eval supplies real artifact sizes; the field should be authored then, against the criterion above, with a rationale on every `true`.

**The maintainer decision phase 2 needs:** C3-3 says "2 to 3 subagents that preload specific **skills**". The evidence says the unit should be **recipes**. Three options:

1. **Wrap the three heaviest recipes** (`stress-test-decision`, `expand-options`, `pdca-a3`) as subagents that return only the final artifact. Strongest fit to the criterion, and they already exist as declared chains - no new reasoning content to author or evidence-grade.
2. **Author skill-level subagents anyway**, selected by measured artifact size once the next run lands. Matches the spec's literal wording; weaker rationale, since a single skill is cheap to run inline.
3. **Decline C3-3 and record why.** Defensible: the value proposition rests on caller context hygiene, and the commands already give every recipe an invokable front door. This would be the first roadmap item closed as "not worth building", which is itself worth having a precedent for.

Recommendation: **(1)**, and author the `subagent_suitable` criterion into `AUTHORING.md` as part of it so the next person does not re-derive it.
