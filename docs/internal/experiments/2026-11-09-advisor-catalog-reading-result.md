# How the live advisor reads its catalog: result (D3)

**Date:** 2026-11-09, local time. The session records stamp 2026-11-10 in UTC.
**Design:** [the D3 design](2026-11-09-advisor-catalog-reading-design.md), including its amendment after the smoke test, committed as `3a1479a` before the main run started.
**Status:** closed. The pre-registered rule placed the result in the middle band, so the maintainer decided. **Decided 2026-11-11 by the maintainer: no change, and the D3 item is closed.**

**The live advisor recommended the expected skill in 30 of 31 sessions, including 25 of the 26 whose skill only the catalog names.** No session invented a name, no session hit its budget cap, and no miss happened while the expected skill's description was unseen. The one miss was a judgment call made with the description in view. The 31 sessions cost $11.61.

## What ran

| Item | Value |
|---|---|
| Sessions | 31, one per sampled prompt, 4 at a time, from 06:08 to 06:14 UTC |
| Model | `claude-opus-5-5`, Claude Code 2.1.321 |
| Plugin | `git archive` of tag `v0.21.0`, loaded with `--plugin-dir` |
| Setup | Empty working folder, user settings left out, `Read Grep Glob Bash` allowlist, $8 cap per session |
| Cost | $11.61 in total, $0.24 to $0.60 per session, from Claude Code's own `total_cost_usd` figure rather than the list-price method the design used for its estimate |

A Haiku session with the same flags reported no user instructions, no project instructions and no `AGENTS.md`. Every session's first record lists the library plugin at version 0.21.0. No tool call was denied.

## Results

| Measure | Catalog-only, 26 sessions | Controls, 5 sessions |
|---|---|---|
| Expected skill recommended | 25 | 5 |
| As Step 1 of a Thinking Plan | 19 | 5 |
| As a direct handoff | 6 | 0 |
| Neighbor picked instead | 1 | 0 |
| Invented names | 0 | 0 |
| Misses while unseen | 0 | not applicable |
| Expected description reached the agent | 23 | not scored |

**The six handoffs are the behavior the skill specifies.** Four were the named contested lenses: `eisenhower-moscow-pareto`, `five-whys`, `qualitative-comparative-analysis` and `reflective-equilibrium`. Each one sent the user straight to the named skill and stated its caveat. The other two were `complexity-domain-sort`, also named, and `belief-update-routine`, whose prompt describes the routine closely.

**The one miss was `frame-creation`, and the agent had its description in view.** Its description reached the agent through both the skill list and a scripted query. The plan chose `think-iceberg-model` and then `think-problem-restatement`, and it said why it passed over `frame-creation`: that skill is graded C/P, and the user would already have causal evidence by Step 2. `SKILL.md` tells the advisor to prefer the higher-tier skill when two do the same job, so this is a defensible routing call, not a reading failure (medium confidence).

**Three sessions recommended their skill without its description reaching them through either channel:** `morphological-analysis`, `scenario-planning` and `theory-of-constraints`. All three made it Step 1. The skill list showed each one by name only, and the agent's searches returned the name but not the description. The skill names alone were descriptive enough.

## How the agents read the catalog

**Almost no session read the catalog the way the design worried about.** Only 1 of 31 used a default `Read`, the route that stops at entry 21. 29 of 31 used `Grep`, usually for names, tiers and the policy flag. 11 then paged through parts of the file with `Read`, and 10 used the shell, most often a short script that printed chosen entries. 1 used `Read` with `allow_large`.

**Coverage was low, and it did not matter.** The median session saw 18 of the 63 names and 2 of the 63 descriptions through tool results. Only 12 sessions saw all 63 names that way. A size limit cut a tool result in 7 sessions, and all 7 still recommended their expected skill. The agents did not need the catalog to learn what exists, because the skill list in the session already names every skill and describes 56 of the 91 entries it lists.

**The September transcripts were misleading for this reason (high confidence).** Those runs had no installed plugin and so no skill list. The shortlist mechanism they showed was real for that setup and absent in live use.

## Against the pre-registered rule

The rule, as amended before the run, has three bands:

- **A fix is warranted** at 3 or more misses while unseen. There were 0.
- **No change** needs the expected description to reach at least 24 of the 26 catalog-only sessions, and at most 1 miss while unseen. The description reached 23, one short, so this band is not met.
- **Anything between** goes to the maintainer. This result lands here.

The rule is applied as written. The shortfall is in coverage, not in outcomes. The three sessions behind it all recommended the expected skill as Step 1.

## The control rule

No control missed its expected skill. All 5 made it Step 1, so the reading result needs no further check under the control rule.

## Recommendation for the maintainer

**Make no change to `SKILL.md` or the catalog, and close the D3 item (medium confidence).** The outcome that matters for users held in 30 of 31 sessions, and the one miss was a reasoned tier preference. A reading instruction would add text to a skill that already works. If the maintainer wants insurance anyway, the cheapest option is still one sentence pointing the advisor at `references/recommendable.md`, re-measured on these same 31 prompts for about $12.

**Decided 2026-11-11 by the maintainer:** no change, and no pointer. The backlog keeps one watch item: a run with several plugins installed, which is the limit below most likely to matter in live use.

## Scoring corrections made by hand

The scorer classifies by finding names in the plan text, so every session was checked by hand:

- **`frame-creation` was scored "recommended" and is a neighbor.** Its name appears only in the explanation of why another skill was chosen. The table above uses the corrected figure.
- **The scorer's Step 1 flag missed 5 plans that did put the skill first,** because of how their headings were formatted. The table counts Step 1 from the plan headings, read by hand.

## What this cannot show

- **Each prompt ran once.** A different run could move a case or two.
- **The prompts are each skill's own trigger cases,** written to point at that skill. Real situations are messier, so the 30 of 31 is likely an upper bound on live accuracy.
- **Recommending from a name alone works only when the model already knows the method.** The three sessions that did so carry familiar method names: theory of constraints, scenario planning and morphological analysis. A skill with an unfamiliar name would not get that help (medium confidence, inferred).
- **The session had only this plugin installed.** The skill list is capped, and a user with many plugins could see fewer descriptions for this library. Whether names are ever dropped from the list was not tested.
- **The count of described and name-only entries came from a Haiku session reading its own context,** not from a file. `interval-calibration-check` was classified by the alphabetical cutoff.
- **Coverage shows what reached the agent, not what it weighed.**

## Files

The runner, scorer, probes, raw session output and `scored.json` are in `_local/advisor-read-probe/2026-11-09/`, which is gitignored. The session transcripts are under `~/.claude/projects/E--tmp-tfs-d3-run/`.
