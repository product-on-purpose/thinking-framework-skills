# `execution.subagent_suitable` does not select anything, and the unit C3-3 wants is a recipe

**Date:** 2026-09-15
**Status:** answered - phase 1 of C3-3 (reasoning subagents) complete; **phase 2 decided and built 2026-09-24** (option 1, with the selection corrected; see [Phase 2: decided](#phase-2-decided-2026-09-24)).
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

| recipe | required `steps:` | with optional adds / swap-ins |
|---|---|---|
| `think-stress-test-decision` | **4** | 6 |
| `think-expand-options` | 3 | 4 |
| `think-pdca-a3` | 3 (plus two non-skill steps, "Do" and "Act") | 4 |
| `think-audit-reasoning`, `think-reframe-problem`, `think-kepner-tregoe`, `think-issue-position-argument-mapping` | 3 | 3 |
| `think-first-principles`, `think-idea-quality-audit` | 2 | 2 |

> **Corrected 2026-09-24.** This table first read 7 / 6 / 5 / 4 / 3 under the heading "distinct skills chained", and the text below said recipes chain "3 to 7" skills. Both were wrong by the same cause: the count was of distinct `think-*` names in each `_workflows/` file, which includes the recipe's **own** name, and for pdca-a3 a `think-pdca-a` fragment cut off at the digit. Re-measured from the authored `steps:` lists. The direction of the finding survives, but "the three heaviest" does not pick three: stress-test-decision stands alone at 4 and six recipes tie at 3. The phase-2 decision below is taken on the corrected numbers.

Every recipe chains **2 to 4** required skills. Run inline, a recipe drops one to three intermediate artifacts into the caller's context when the caller wants the last one. That is the exact shape the criterion describes, it is already true of nine shipped things, and none of them carries a suitability field at all.

A single premortem produced **12,494 characters** in a 2026-09-15 smoke run. A four-skill chain produces that several times over, and the caller needs one of them.

## What changed here, and what waits

**Done:** `artifactChars` now survives into the `.json` scorecard. The harness has measured it on every run and the `.md` has always printed it in a table, but the `.json` dropped it - so the one machine-readable record of artifact size existed only as rendered markdown, and this question had to be answered with a template-size proxy. From the next output run, it can be answered with the real number.

**Deliberately NOT done: re-authoring `subagent_suitable` across 67 sidecars.** Doing it on a proxy would repeat the mistake that created the problem - authoring a field against an unwritten rule. The next output eval supplies real artifact sizes; the field should be authored then, against the criterion above, with a rationale on every `true`.

**The maintainer decision phase 2 needs:** C3-3 says "2 to 3 subagents that preload specific **skills**". The evidence says the unit should be **recipes**. Three options:

1. **Wrap the three heaviest recipes** (`stress-test-decision`, `expand-options`, `pdca-a3`) as subagents that return only the final artifact. Strongest fit to the criterion, and they already exist as declared chains - no new reasoning content to author or evidence-grade.
2. **Author skill-level subagents anyway**, selected by measured artifact size once the next run lands. Matches the spec's literal wording; weaker rationale, since a single skill is cheap to run inline.
3. **Decline C3-3 and record why.** Defensible: the value proposition rests on caller context hygiene, and the commands already give every recipe an invokable front door. This would be the first roadmap item closed as "not worth building", which is itself worth having a precedent for.

Recommendation: **(1)**, and author the `subagent_suitable` criterion into `AUTHORING.md` as part of it so the next person does not re-derive it.

## Phase 2: decided (2026-09-24)

**Option (1), recipes, taken by the maintainer - but not the three it named.** Re-measuring the table above before building on it (see the correction note) changed the selection:

- **`think-stress-test-decision`: in.** The only 4-step recipe, so it drops the most intermediate artifacts a caller will not reread, and its decision brief is self-contained.
- **`think-pdca-a3`: out, whatever its length.** Its step 3 is *"Do - run the change in the world"*. A delegate returns once; it cannot wait for the world between choosing a countermeasure and reviewing it. This is the exclusion the criterion was missing, and it is now enforced: `renderAgent` refuses any recipe with a numbered step that names no skill.
- **`think-expand-options`: out.** It was chosen for a count that was off by one; at 3 steps it ties with five others and nothing in the criterion prefers it.
- **`think-audit-reasoning`: in, taken from the 3-step tie on mechanism rather than size.** An auditor running in the caller's context shares the unstated assumptions of the reasoning it is auditing. A subagent starts without that conversation, so it can judge only what is on the page, which is what an evidence-versus-inference audit is supposed to do. The spec's own candidate list names "an adversarial reviewer"; this is that role, built from shipped moves. No numeric proxy was invented to break the tie.

Two, not three: the spec asks for 2 to 3, and no third candidate has a reason beyond its size.

**What shipped.** Both subagents are *generated* from their `_workflows/` source by the same generator as the commands (`scripts/gen-recipe-commands.mjs`, allowlist and rationale in `scripts/lib/recipe-agent-lib.mjs`), so the chain exists once. Each preloads exactly its recipe's `steps:` through the `skills:` field, is granted `Read, Glob, Grep` and nothing else (the C4-6 pattern: the grant is the constraint), and returns only the composite artifact. The criterion is written into [`AUTHORING.md`](../AUTHORING.md#reasoning-subagents-when-a-recipe-becomes-one). The 67 `subagent_suitable` sidecar values are deliberately still untouched: the criterion now says the unit is a recipe, so a per-skill field is answering a question the library no longer asks, and retiring or re-scoping it is its own change.

**Verified before shipping, because each failure here is silent.** Claude Code skips a `skills:` entry it cannot resolve, logs one warning to the debug log, and runs the agent anyway. A throwaway canary plugin on Claude Code 2.1.282 showed that both the bare (`canary-bare`) and the plugin-namespaced (`tfsprobe:canary-ns`) forms resolve (`Preloaded skill '...'` in the debug log, canary token printed), and a negative control showed the miss (`Skill '...' specified in frontmatter was not found`, agent ran without it). The generated agents use the namespaced form, which cannot collide with a user's own skill of the same bare name. A third probe confirmed a preloaded skill's `references/TEMPLATE.md` is reachable with `Read` in one call, which is why `Read` is granted at all.

**Smoke-tested end to end, once each** (headless `claude -p --plugin-dir <working tree>`, Claude Code 2.1.282, `sonnet`). A smoke test, not a measurement - one situation per subagent, judged by reading the output:

| | `think-stress-test-decision` | `think-audit-reasoning` |
|---|---|---|
| preloads logged | 4 of 4, none "not found" | 3 of 3, none "not found" |
| tool calls | 8 `Read`s: each step's `TEMPLATE.md` and `EXAMPLE.md`, nothing else | the same 6, plus a `Glob` + `Read` of `recipes/audit-reasoning.md`, which the chain's "Full prose:" pointer invites |
| returned | a **decision brief**, 8,878 characters: recommended option, killer conditions, a five-row risk register with tripwires and kill criteria, an outside-view range | a **reasoning audit**, 5,767 characters: what is supported, the leaps and alternative readings, a verdict |
| intermediate artifacts in the return | none | none |
| honesty rules held | assumptions stated rather than invented; the one base rate attributed and marked as recalled, with no web search available; both optional adds named, not run | caught that "40 percent of a 9 percent response rate" is 3.6 percent of churned customers, which the conclusion under audit had silently inflated |

Both returns closed with a short "files consulted" line the contract did not permit, and the audit read the recipe prose that the tool-limits section did not list. **Both were resolved by changing the contract to match, after the runs:** the generated prompt now allows one closing line of provenance and names the recipe prose as a third permitted read. Neither change touches the description, the preloads or the tool grant, so the verified mechanics are unaffected; the prompt wording that shipped is not the exact wording that was smoke-run.
