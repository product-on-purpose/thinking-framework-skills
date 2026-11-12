# Routers read less of the catalog than the eval assumed, and a clean run with a Sonnet arm

**Date:** 2026-11-06. The transcripts stamp the runs 2026-11-07 in UTC.
**Instrument:** `scripts/eval/route.workflow.mjs` with `agentType: "Explore"` and `interleave: true`, on the corrected answer key from [the redirect correction](2026-11-06-answer-key-redirects.md).
**Status:** recorded. **No scorecard was finalized and no sidecar was stamped**, because the maintainer decides whether a scorecard comes from this run.

**Most routers on the 2026-10-20 baseline never saw most of the anti-trigger lines that the eval assumed were in front of them.** Only 5 of 31 routers in its shipped-catalog arm saw every line, and the median router saw 36%. This run is the first in which every Opus router read every line. It scored 375 of 376 on top-1 and 0 of 379 on false fires, so the Opus results hold up.

The Sonnet arm scored lower and read less. Those two facts cannot be separated from this run.

## Why this ran

The maintainer approved this run on 2026-11-06. It has two jobs. [The router context audit](2026-11-05-eval-router-context-audit.md) found that default workflow routers receive `AGENTS.md` and memory, and no framework routing run had gone without them. Row O-21 (subagent tier validation) in `agent-config/OPEN.md` also asked for a Sonnet arm, compared with a clean Opus arm on agreement and cost.

## What ran

| Run | Model | Routers | Prompts | Workflow tokens |
|---|---|---|---|---|
| `wf_984c9c7a-7e7`, Opus arm | `claude-opus-5-5` | 31 | 755 | 3,816,767 |
| `wf_29914229-760`, Sonnet arm | `claude-sonnet-5-5` | 31 | 755 | 2,983,807 |

Both arms used the same blind file, catalog, answer key, router prompt, agent type and batches. Three smaller runs came first: an Opus smoke test (`wf_ff1d8b38-4bf`), a Sonnet smoke test (`wf_77677ef4-7a7`), and a 5-router Sonnet probe (`wf_70c80aa2-ecb`).

The transcripts confirm the model on every router, and they show no `AGENTS.md`, memory or global instructions in either arm. The advisor tool was attached to every router and never called, so "advisor off" in O-21 holds in effect but not in configuration.

## Results

| Measure | Opus arm | Sonnet arm |
|---|---|---|
| Top-1 on should-fire cases | 375/376 | 370/376 |
| Top-3 on should-fire cases | 376/376 | 371/376 |
| False fires on anti-cases | 0/379 | 6/379 |
| Right-alternative | 165/169 | 157/169 |
| Declined, on anti-cases with no named alternative | 141/210 | 142/210 |
| Top-1 agreement with the Opus arm | n/a | 724/755 (95.9%) |

**Do not compare the Opus column with the 2026-10-20 figures as a change.** The agent type and the batching both differ, so this is a new baseline. On the same corrected key, the 2026-10-20 shipped arm scored 376/376, 0/379 and 166/169, and it agreed with this Opus arm on 739 of 755 top picks.

Three kinds of case moved between those two runs:

- **One should-fire case.** On `c109` the Opus arm ranks `abstraction-laddering` first and `problem-restatement` second.
- **One net right-alternative.** `c439` moved from `reference-class-forecasting` to `none`. `c521` also moved, but its `accept` list still credits the new pick.
- **Thirteen anti-cases with no named alternative.** This arm declined on 10 of them and the baseline declined on 1. Neither pick is scored, because `none` in the key means only that the bullet names no slug.

## What the routers actually read

`Read` caps a default result at 25,000 tokens. The catalog is 67,121 tokens and the blind file is 44,702, so a default read returns a partial view with a notice saying how to get the rest. For the catalog, that view is 573 of 1,810 lines, which is the first 21 of 63 entries. The router prompt says only "Read these two files", so each router decides what to do next.

| Run | Routers with every description | Median descriptions seen | Routers with every anti-trigger line | Median lines seen |
|---|---|---|---|---|
| This run, Opus | 31/31 | 100% | 31/31 | 100% |
| This run, Sonnet | 10/31 | 68% | 2/31 | 44% |
| 2026-10-20, shipped catalog | 20/31 | 100% (lowest 24%) | 5/31 | 36% |
| 2026-10-20, closed-book arm | 22/31 | 100% (lowest 24%) | n/a, lines removed | n/a |

**The routers were not cut off. They chose a shortcut.** On 2026-10-20, low-coverage routers printed every catalog name, picked a shortlist, and read only those entries. Most Sonnet routers took the notice's other suggestion, grepping names and descriptions. In this run, Opus routers passed `allow_large` or paged to the end.

**Every router saw its own prompts (high confidence).** So no answer in this run came without its prompt behind it.

**The skill-selection eval is not affected (high confidence).** Its roster is far smaller, and every router in every run I scanned received all 77 descriptions.

**Runs before 2026-10-20 are not measured.** Their catalogs are no longer on disk, so a probe built from today's catalog would not be reliable.

## Sonnet against Opus

**Agreement looks high, but it hides the difference that matters.** The two arms agree on 95.9% of top picks. On the 31 cases where they disagree, the Opus pick matches the key more often: 6 of 7 should-fire cases against 1 of 7, and 10 of 10 named anti-cases against 2 of 10.

**Model and reading are confounded (high confidence).** All Opus routers read everything, and only 2 Sonnet routers did. Those 2 agreed with Opus on 48 of 49 prompts, and the other 29 agreed on 676 of 706. That direction fits a reading effect, but 49 prompts are too few to separate it from noise, and routers were not assigned at random.

**False fires track exposure to the case's own line (medium confidence).** The table covers the 377 anti-cases whose catalog line could be probed.

| Did the Sonnet router see that case's own line? | Cases | False fires | Right-alternative |
|---|---|---|---|
| Yes | 190 | 1 | 70/73 |
| No | 187 | 5 | 87/96 |

That line states the answer, so this is the known open-book effect and not evidence that the catalog teaches. Six events without random assignment are suggestive only.

**Sonnet also reached for recipes.** It listed a recipe in its top 3 on 21 prompts and put one first on `c36`. Opus listed none on any prompt. This is not scored as an error.

**Sonnet cost about half as much (medium confidence, inferred).** The table prices each arm's transcript usage at the list prices in `agent-config/reference/model-routing/routing-reference.md`, dated 2026-07-04. The cache multipliers are my assumption: 0.1 times input for a read and 1.25 times for a write.

| | Opus arm | Sonnet arm |
|---|---|---|
| API messages | 66 | 113 |
| Cache writes | 3,410,987 | 2,578,051 |
| Cache reads | 1,681,963 | 5,952,560 |
| Output | 86,232 | 78,860 |
| Estimate | about $24 | about $13 |

The comparison flatters Sonnet, because its routers mostly read less. Its routers that read the whole catalog peaked near 133,000 tokens of context, against about 91,000 for the rest.

## What this changes in earlier records

- **The closed-book A/B was less of a contrast than designed.** [That record](2026-10-20-anti-triggers-closed-book.md) has a dated note. Its "with the lines" arm was not fully exposed to the lines.
- **Its conclusion survives (medium confidence).** The Opus arm here saw every line and still scored 165 of 169, so full exposure did not raise right-alternative above the 166 of 169 that partial exposure reached. The setups differ, so this supports the estimate of about three answers without proving it.
- **The trust page overstated exposure.** It said every anti-case prompt was in front of the router. Each one was in the file the router was given, which is a weaker claim, and the page now says so.

## A question this raises about the live advisor

**The cap applies to any agent using this `Read` tool, including one running the real `think-framework-advisor` (high confidence for the cap, not measured for the behavior).** The skill requires that a recommended name appear in `references/recommendable.json`, but it does not say how to read that file. A default read shows 21 of 63 entries, so an agent stopping there could miss a real skill. No run has measured this, because every router here was given the eval's prompt, not the skill's. The backlog holds it as an open item.

## Method and limits

The probes are maintainer scripts in `_local/eval-rerun/2026-11-06/`, which is gitignored, so the method is written out here.

- **What counts as seen.** A router saw something when that thing's own text reached it in a `tool_result`, in any format. Only `user` and `assistant` records count, because `api-request-blob` records replay the same content.
- **Descriptions.** The probe is each entry's first 40 characters.
- **Anti-trigger lines.** The probe is the parenthetical tail, never the opening. A line opens with its prompt, which is also in the blind file.
- **Prompts.** A prompt counts when its opening and its id both reached the router.

Two of my probes were wrong on first pass, and both errors are corrected above:

- **The line probe first used openings.** That credited routers for reading the blind file, and it reported 4 of 31 Sonnet routers with every line, at a median of 73%. Tails give 2 of 31 and 44%.
- **The prompt probe flagged 12 unseen prompts on one router.** Router `a6332e08` grepped all 12 prompts without their ids, so the id test failed. I read its command and spot-checked 3 of the 12.

The probes can undercount text that arrives reformatted, such as a line a script wrapped. They cannot show what a router weighed, only what reached it. Each arm is also one run, and this instrument has a noise band.

## Decisions for the maintainer

1. **Does a scorecard come from the Opus arm?** It is the only run where every router read everything. Recommendation: yes, after decision 2.
2. **Should the router prompt require reading both files whole?** That changes the prompt in three workflows and starts another baseline. It would also let a Sonnet rerun separate the model from the reading, at about 3M to 4M tokens. Recommendation: yes to both.
3. **What should the live advisor do about the cap?** The options are one instruction in the skill or a smaller catalog. Recommendation: measure first, using the skill's own procedure on a sample of prompts.
4. **Should the coverage probe join `scripts/eval/`?** Recommendation: yes, as a maintainer tool with tests, because this finding came from a check no run performs.

**Decided 2026-11-07 by the maintainer.** Decision 1: no scorecard comes from this Opus arm; the scorecard comes from the whole-read rerun instead. Decision 2: yes to both, with Opus and Sonnet rerun as a same-day pair. #236 changed the prompt, and [the pair's record](2026-11-07-whole-read-pair.md) has the results: every router in both arms read everything, and Sonnet's false fires went from 6 to 0. Decision 3: measure first. **Measured 2026-11-09** in [the D3 result](2026-11-09-advisor-catalog-reading-result.md): the live advisor recommended the expected skill in 30 of 31 sessions, because an installed plugin's skill list names every skill, so the 21-of-63 view raised above did not limit it in practice. The maintainer decided on 2026-11-11 to change nothing. Decision 4 was not raised in that walk. **Decided 2026-11-11 by the maintainer: yes.** The coverage probe moves into `scripts/eval/` as a maintainer tool with tests, not a gate layer, using the method in "Method and limits" above.
