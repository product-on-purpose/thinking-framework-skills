# What the eval agents received, and what the skill-selection figures did on 2026-11-04

**Date:** 2026-11-05
**Status:** a record of an audit. No eval ran for it, and no figure was re-scored.
**Prompted by:** [the tiered-descriptions result](2026-11-04-tiered-descriptions-result.md), which found that default routers receive `AGENTS.md` and left the earlier runs unchecked.

**Eval agents have never been as isolated as the trust page said, and the amount of extra context changed over time.** No router had an eval prompt in its injected context, so the routing test was not leaked this way. Three claims on the trust page needed correcting. The front-door figure held in every run.

## What each run received

This table comes from the saved agent transcripts. The "injected files" are the entries in each agent's `instructions` attachment, which the harness adds before the agent's first turn. Every agent in a run received the same files.

| Run | Eval | Agents | Answering model | Injected files | Skill table |
|---|---|---|---|---|---|
| 2026-06-25 | framework routing | 31 | `claude-opus-4-8` | no `instructions` attachment recorded | no |
| 2026-09-10 | skill selection | 32 | `claude-opus-5` | global instructions and memory index | no |
| 2026-09-10 | framework routing | 31 | `claude-opus-5` | global instructions and memory index | no |
| 2026-09-11 (A/B, 2 arms) | framework routing | 31 each | `claude-opus-5` | global instructions and memory index | no |
| 2026-09-12 | artifacts | 126 | `claude-opus-5` | global instructions and memory index | no |
| 2026-09-12 (null re-run) | skill selection | 32 | `claude-opus-5` | global instructions and memory index | no |
| 2026-09-13 | skill selection | 32 | `claude-opus-5` | global instructions and memory index | no |
| 2026-09-13 | framework routing | 31 | `claude-opus-5` | global instructions and memory index | no |
| 2026-10-20 | skill selection | 32 | `claude-opus-5-5` | the same, plus `AGENTS.md` | yes |
| 2026-10-20 (2 arms) | framework routing | 31 each | `claude-opus-5-5` | the same, plus `AGENTS.md` | yes |
| 2026-10-20 | artifacts | 126 | `claude-opus-5-5` | the same, plus `AGENTS.md` | yes |
| 2026-11-04, default agent (2 arms) | skill selection | 32 each | `claude-opus-5-5` | the same, plus `AGENTS.md` | yes |
| 2026-11-04, Explore agent (2 arms) | skill selection | 32 each | `claude-opus-5-5` | none | no |

"Global instructions" means the maintainer's `CLAUDE.md` and rule files. The Explore runs had a median first-turn input of 33,401 tokens, against 63,365 for the same day's default runs and about 50,000 in September.

`route.workflow.mjs` calls `agent()` with no agent type, so framework routers run as the default subagent. The 2026-10-20 transcripts confirm that the table reached all of them.

## What the context did and did not contain

- **No eval prompt (high confidence, measured).** The audit searched all 788 prompts longer than 30 characters in every router's records before its first tool result. It found none in any skill-selection or framework-routing run. The six shortest prompts were not searched, because short strings match by chance.
- **Skills in the host's skill listing: none (high confidence, measured).** No listing named `think-premortem`, so this library was not installed in the sessions that ran its own evals.
- **Published figures: yes (medium confidence, read from the current index only).** The memory index holds lines such as earlier eval totals. They name no prompt, but a router could read them.
- **What the table adds differs by eval.** A skill-selection router otherwise has only names and descriptions, so the table adds family, tier, artifact and recipe chains. `recommendable.json` already gives a framework router family and tier, so the table adds the artifact and the recipe chains.

## The six runs on the shipped descriptions

| Run | Agent setup | Top-1 | Anti no-fire | False fires | Front door |
|---|---|---|---|---|---|
| 2026-09-10 | default, Opus 5 | 391/393 | 399/400 | `c502` | 16/17 |
| 2026-09-12, null re-run | default, Opus 5 | 392/393 | 399/400 | `c502` | 16/17 |
| 2026-09-13, one description corrected | default, Opus 5 | 392/393 | 399/400 | `c502` | 16/17 |
| 2026-10-20 | default, Opus 5.5 | 392/393 | 399/400 | `c502` | 16/17 |
| 2026-11-04 control | default, Opus 5.5 | 390/393 | 398/400 | `c393`, `c502` | 16/17 |
| 2026-11-04 control | Explore, Opus 5.5 | 387/393 | 398/400 | `c393`, `c502` | 16/17 |

The null re-run has no scorecard of its own, and [the noise-band record](2026-09-13-skill-selection-noise-band.md) gives only its totals. This audit rebuilt its routes from the router transcripts and scored them with the current scorer and answer key. The same rebuild of the 2026-09-13 run matched its committed top-1 and no-fire totals. Right-alternative figures are left out, because that rebuild gave 145/157 against the committed 141/157. The answer key was widened on 2026-10-17, which is the likely reason (not verified case by case).

The trust page used to say that all three September runs had the same roster. The 2026-09-13 run used a roster with one description corrected, as the noise-band record says, so the page now says that.

The roster file on 2026-10-20 and both 2026-11-04 controls has the same SHA-256 hash. The prompts and the answer key are byte-identical too. The router prompt did not change, because the only commit to the workflow in that period added the optional agent type.

- **The band is wider than one case (high confidence, measured).** On one model and one agent setup, 392 and 390 differ by two cases. The Explore figure stays out of this comparison, because its system prompt differs.
- **The second false fire is unexplained (high confidence that it happened, low confidence on any cause).** `c393` (*"I'm about to negotiate but I have no other options at all"*) fired in all four 2026-11-04 arms, with and without `AGENTS.md`, and in none of the earlier runs. The audit found no difference in the inputs it could check. It cannot see what else changed in the harness or the served model.
- **The front door held (high confidence, measured).** The figure is 16 of 17 with zero false fires in all six runs, and the one trigger miss is `c351` each time.

## Limits of this audit

- The transcripts are local to the maintainer's machine, so a reader cannot repeat this audit from the repo. The audit scripts were not committed.
- The audit does not measure the effect of the context on any figure. That needs a same-day pair that differs only in context, and agent types differ in more than that.
- The `instructions` attachment is absent in June. Those agents may have received context another way, so "none recorded" is not proof of none.
- The artifact eval was not searched meaningfully. A producer is handed its own prompt, and that prompt is repeated in later records on 2026-10-20, so the 12 hits there are probably that echo (not verified).

## What changed as a result

The trust page now states all of this, and the page's "every number traces to a scorecard" line names the exception. The three skill-selection scorecards carry a dated correction, with their figures unchanged. `score-selection.mjs` no longer writes the old sentence into new scorecards.

`route.workflow.mjs` still has no `agentType` option, and no framework-routing run has been made without the wider context. Both are open in [the backlog](../backlog.md).
