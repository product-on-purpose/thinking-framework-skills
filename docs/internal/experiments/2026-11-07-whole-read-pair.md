# Routers told to read whole files: an Opus and Sonnet pair on the new prompt

**Date:** 2026-11-07. The transcripts stamp the runs 2026-11-08 in UTC.
**Instrument:** `scripts/eval/route.workflow.mjs` after #236, with `agentType: "Explore"`, `interleave: true` and the whole-read prompt, on the corrected answer key from [the redirect correction](2026-11-06-answer-key-redirects.md).
**Status:** recorded. The Opus arm is the new framework-routing baseline, and its scorecard is [`2026-11-07-trigger-eval`](../eval-results/2026-11-07-trigger-eval.md). The Sonnet arm answers row O-21 (subagent tier validation) and writes no scorecard.

**Every router in both arms read the whole catalog and the whole blind file.** On 2026-11-06, all 31 Opus routers did, but only 2 of 31 Sonnet routers did. With the reading equal, Sonnet's six false fires went to zero, and its agreement with Opus rose from 95.9% to 98.5%. So most of the 2026-11-06 gap between the models came from reading, not from the model (medium confidence, one run per arm).

## Why this ran

[The 2026-11-06 run](2026-11-06-clean-router-run.md) found that the router prompt said only "Read these two files", and that a default `Read` returns 25,000 tokens. The catalog is 67,121 tokens and the blind file is 44,702. The maintainer decided on 2026-11-07 that the prompt must require whole reads, and that Opus and Sonnet rerun on it as a same-day pair. #236 made the change, and the maintainer approved the run in their own words.

## What ran

| Run | Model | Routers | Prompts routed | Workflow tokens |
|---|---|---|---|---|
| `wf_b87c6495-d12`, Opus arm | `claude-opus-5-5` | 31 | 755 of 755 | 4,986,052 |
| `wf_59ab102e-289`, Sonnet arm | `claude-sonnet-5-5` | 31 | 753 of 755 | 4,980,312 |

Both arms used the blind file, answer key, batches and agent type of the 2026-11-06 run. The answer key was checked byte-identical to a fresh `extract-cases.mjs` on `main`. The two arms ran at the same time. "Workflow tokens" is the same field the 2026-11-06 table used, the `totalTokens` of each Workflow result. The pair cost 9.97M tokens, above the 8M to 9M estimated before the run.

## What the routers read

| Measure | Opus arm | Sonnet arm |
|---|---|---|
| Routers that saw all their prompts | 31 of 31 | 31 of 31 |
| Routers that saw every catalog description | 31 of 31 | 31 of 31 |
| Routers that saw every anti-trigger line | 31 of 31 | 31 of 31 |
| Tool calls | 64 large reads, 3 `ls` | 62 large reads |

The probe is the one from the 2026-11-06 record: an anti-trigger line counts as seen only when its parenthetical tail reached the router. No transcript in either arm holds `AGENTS.md` text or the memory index. Every Sonnet router made exactly two reads, one per file, each with `allow_large: true`. The three Opus `ls` calls listed directories and did not replace a read.

## Results

| Measure | Opus arm | Sonnet arm | Opus, 2026-11-06 | Sonnet, 2026-11-06 |
|---|---|---|---|---|
| Top-1 on should-fire cases | 376/376 | 373/376 | 375/376 | 370/376 |
| Top-3 on should-fire cases | 376/376 | 374/376 | 376/376 | 371/376 |
| False fires on anti-cases | 0/379 | 0/379 | 0/379 | 6/379 |
| Right-alternative | 165/169 | 163/169 | 165/169 | 157/169 |
| Declined, on anti-cases with no named alternative | 144/210 | 146/210 | 141/210 | 142/210 |

**Sonnet's three top-1 misses are two omissions and one wrong pick.** `c711` and `c712`, two should-fire cases for `think-interest-based-negotiation`, are missing from its output. Interleaving put them with two different routers, and each router returned one route fewer than it was given, with no truncation in its transcript. Both routers saw the prompt they left out. The one wrong pick is `c750`, which went to `think-process-tracing` instead of `think-analysis-of-competing-hypotheses`. On the 374 should-fire cases it routed, Sonnet scored 373. An omitted id is a reliability finding, not a routing error, and a run that needs every id should check the count.

## Two comparisons this pair allows

**The prompt alone, on a model whose reading did not change.** The new Opus arm differs from the 2026-11-06 Opus arm only in the prompt, and both read everything. They agreed on 746 of 755 top picks. One trigger case, `c109`, moved to the right answer. One named anti-case, `c521`, moved from `premortem` to the named `red-team-light`, and the key accepts both, so the right-alternative count did not move. Seven anti-cases with no named alternative moved: four to a decline, one from a decline to a pick (`c95`), and two from one other tool to another. Read those 9 as this instrument's noise band plus the wording's effect, not as an improvement. Opus top-1 went from 375 to 376 within that band.

**The model, with the reading held equal.** The new arms agreed on 742 of the 753 prompts Sonnet routed (98.5%). On 2026-11-06 they agreed on 724 of 755 (95.9%). Sonnet's own two runs agreed on 729 of 753. Of the 24 prompts that changed, 19 moved to the key's expected answer and 3 moved away from it, counting exact matches only. The remaining gap to Opus, on one run per arm, is 1 wrong pick, 2 omissions and 2 right-alternatives.

## Cost

The estimate prices each arm's transcript usage at the list prices in `agent-config/reference/model-routing/routing-reference.md`, as the 2026-11-06 record did. The cache multipliers are the same assumption: 0.1 times input for a read and 1.25 times for a write.

| | Opus arm | Sonnet arm | Opus, 2026-11-06 | Sonnet, 2026-11-06 |
|---|---|---|---|---|
| API messages | 66 | 62 | 66 | 113 |
| Cache writes | 4,593,364 | 4,587,669 | 3,410,987 | 2,578,051 |
| Cache reads | 1,585,124 | 1,435,620 | 1,681,963 | 5,952,560 |
| Output | 93,487 | 67,174 | 86,232 | 78,860 |
| Estimate | about $32 | about $19 | about $24 | about $13 |

**Sonnet now costs about 60% of Opus, not about half (medium confidence, inferred).** The 2026-11-06 figure flattered Sonnet, because its routers mostly read less. With whole reads, both arms write about the same number of tokens to the cache, and the price per token is the only difference left. The token counts are nearly equal, so a comparison by tokens alone would show no saving.

## What this changes in earlier records

- **The 2026-11-06 record's open questions 2 and 3.** The prompt now requires whole reads, and the Sonnet rerun has run. This record answers both, and a dated note there points here.
- **The trust page.** The trigger section now cites this run as the first published scorecard on which every router read every copied line. The 2026-11-06 Opus arm read them all too, but it has no scorecard. The closed-book figures from 2026-10-20 still stand, because this run measured open-book only.
- **The open-book estimate.** On 2026-10-20, the page said the copied lines "probably supply about three" right-alternatives. This run is fully open-book and scored 165 of 169, against 162 of 169 closed-book on 2026-10-20. The gap is still about three, now with every router reading the lines.

## Limits

- Each arm is one run, and this instrument has a noise band. The 9 picks that moved between the two Opus arms give its size on this setup.
- The closed-book comparison crosses agent types and prompts. The 2026-10-20 closed-book arm ran on the default subagent with contiguous batches and the older prompt.
- The probes show what reached a router, not what it weighed.
- The live `think-framework-advisor` is not measured here. These routers got the eval's prompt, not the skill's procedure, so the separate measurement the maintainer approved on 2026-11-07 still has to run.
