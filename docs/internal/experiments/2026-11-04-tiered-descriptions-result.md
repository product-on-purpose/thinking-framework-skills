# Tiered descriptions: result of the pre-registered runs (roadmap C2-4)

**Date:** 2026-11-04
**Status:** negative under the pre-registered rule. Both pairs are recorded. Publishing the result, and any later experiment, wait for the maintainer.
**Design:** [the pre-registration](2026-10-20-tiered-descriptions-preregistration.md), including its amendment that chose option B.

**The result is negative as written, because the deciding pair fails threshold 3. The failure is not evidence that compression hurt the head cohort.** The head cohort's descriptions are identical in both arms, and its score rose under compression. One router batch in the control arm caused most of the change. The rule fixed before this pair ran says a failure is a negative result, so this memo does not treat the figure as a pass.

## The deciding pair: routers without the `AGENTS.md` table

Both arms ran on 2026-11-04 on `claude-opus-5-5` with the Explore agent type. They used the same rosters, prompts and answer key as the first pair, and the router prompt did not change.

| # | Measure | Threshold | Control | Compressed | Result |
|---|---|---|---|---|---|
| 1 | Footprint of the 67 descriptions | cut of at least 40 percent | 33,235 characters | 19,937 characters (40.01 percent cut) | Pass, by 4 characters |
| 2 | Tail top-1 on trigger cases | falls by at most 2 points | 280/281 | 280/281 | Pass |
| 3 | Head top-1 on trigger cases | changes by at most one case | 66/71 | 70/71 | **Fail, by a change of 4 cases** |
| 4 | `falseFires` | at most the control plus one | 2 | 3 | Pass, at the limit |
| 5 | `recommendable.json` | byte-identical | not applicable | identical | Pass |

The contested lenses scored 41/41 in both arms. Overall, trigger top-1 went from 387/393 to 391/393, and the anti right-alternative figure was 146/157 in both arms. Top-1 picks differ on 15 of 793 scored cases, which matches the 15 of 794 in the null run.

**The isolation worked (high confidence, measured).** A detector was first checked against the first pair, where its markers for `AGENTS.md`, the memory index and the global instructions hit in all 65 agents. The same markers hit in none of the 65 agents in this pair, including the smoke test. First-turn input fell from 63,365 tokens to 33,401, which confirms the absence independently. Every router read the whole roster, and no tool call left the run folder.

## What the deciding pair shows

- **Threshold 3 fails on control-arm instability, not on compression (high confidence on the cause, measured).** Three of the four changed cases (`c529`, `c531` and `c533`) are `think-problem-restatement` prompts that the same router batch sent to `command:reframe-problem`. Neither of those descriptions changed, and the other three runs routed all three cases correctly. The fourth case, `c410`, was missed in the other three runs, so its gain looks like noise.
- **The threshold is two-sided, so the direction does not rescue it.** It says "changes by no more than one case", and the rule says that any failure is negative. Calling this a pass after seeing the figure would be the moved goalpost that the earlier decision was meant to prevent.
- **The noise band is too narrow for this instrument (medium confidence, inferred from one batch).** The pre-registration treats a move of one case as noise. Prompts for one skill sit next to each other, so one router can move several of them together. Case counts therefore understate how far a same-day control can move.
- **The `AGENTS.md` table did not flatter compression, as far as this eval can see (medium confidence).** The tail scored 280/281 in both arms of both pairs. The eval is still near its ceiling, so this shows no detectable effect, not proof of none.
- **Absolute figures do not compare across the pairs.** Explore has a different system prompt from the default subagent, so the 387/393 here and the 390/393 in the first pair are different instruments.

## What compression did change

Five flips repeated with the same picks in both pairs, out of 10 flips in the first pair and 15 in this one. All five are anti cases, and repetition makes them the best evidence of real effects (medium confidence; the repetition is measured and the causes are inferred).

| Case | Authoring skill | Control pick | Compressed pick | Effect |
|---|---|---|---|---|
| `c499` | `think-pairwise-comparison` | `decision-option-review` | `pairwise-comparison` | **Worse:** a new false fire, after "Not a criteria-weighted option matrix" was dropped |
| `c476` | `think-natural-frequency-bayesian` | `none` | `dialectical-bootstrapping` | **Worse, and not gated:** the router no longer declines when the rates are unknown |
| `c440` | `think-linear-model-aggregation` | `fermi-estimation` | `dialectical-bootstrapping` | Both picks are wrong, because the key expects `none` |
| `c697` | `think-stocks-and-flows-reasoning` | `iceberg-model` | `causal-loop-diagrams` | Both picks are wrong, because the key expects `none` |
| `c115` | `think-boundary-critique` | `none` | `parallel-perspectives-review` | **Better:** the router now picks the keyed tool |

This replaces the first measurement's reading of `c115` as noise, because it repeated. The thresholds count only `c499`. The scorer accepts any pick except the authoring skill when the key expects `none`, so `c476`, `c440` and `c697` do not lower any score.

## Recommendation

**Hold to the rule: record the negative result, keep the branch and do not ship.** The saving is about 3,300 tokens per session, which does not justify rewriting a gate after seeing the data.

The pre-registration's public sentence, "it cost X", would misstate this result, because the failing threshold moved in compression's favour. Suggested wording for the trust page: "We measured description compression. It failed our pre-registered gate because a same-day control moved more than the gate allows. Trigger accuracy did not fall, and one new false fire repeated across both pairs. We keep paying the tokens."

A later experiment is optional and would be a new pre-registration, not a rerun of this one. It should shuffle prompts across routers, so that one router cannot move a whole skill's cases. It should also replicate each arm, and gate the "none" picks that this scorer cannot see. A pair costs about 3.4M tokens.

## Cost of the deciding pair

The pair used 65 agents and 3.35M subagent tokens, including one smoke-test agent, against an estimate of up to 5.2M. The working files are in `_local/eval-rerun/2026-11-04-clean/`, which is gitignored. No scorecard was written and no sidecar was stamped.

# First measurement

This pair ran first, with routers that received the `AGENTS.md` table. It is recorded here and does not decide the experiment.

## The five thresholds

Both arms ran on 2026-11-04 on `claude-opus-5-5`, with the same 794 prompts and the same answer key. The control arm used `main` at `13a2fe7`. The compressed arm used `experiment/tiered-descriptions` at `8767b36`, which differs from `main` only in the 47 tail descriptions, three generators and two generated files.

| # | Measure | Threshold | Control | Compressed | Result |
|---|---|---|---|---|---|
| 1 | Footprint of the 67 descriptions | cut of at least 40 percent | 33,235 characters | 19,937 characters (40.01 percent cut) | Pass, by 4 characters |
| 2 | Tail top-1 on trigger cases | falls by at most 2 points | 280/281 | 280/281 | Pass |
| 3 | Head top-1 on trigger cases | changes by at most one case | 69/71 | 69/71 | Pass |
| 4 | `falseFires` | at most the control plus one | 2 | 3 | Pass, at the limit |
| 5 | `recommendable.json` | byte-identical | not applicable | identical | Pass |

The contested lenses, which the thresholds do not gate, scored 41/41 in both arms. Overall, the anti right-alternative figure was 147/157 in both arms, and the same three trigger cases missed in both. The cut saves 13,298 characters, about 3,300 tokens per session at four characters per token.

## What the figures can and cannot support

- **The two arms disagree less than the noise band (high confidence, measured).** Top-1 picks differ on 10 of 793 scored cases. The [2026-09-13 null run](2026-09-13-skill-selection-noise-band.md) disagreed on 15 of 794 with nothing changed. Only two of the 10 flips change a score.
- **One lost case is probably a real cost of compression (medium confidence; the flip is measured and the cause is inferred).** In `c499`, a user wants to weight decision criteria by comparing them in pairs, and then score options with those weights. The compressed arm picked `think-pairwise-comparison` instead of `think-decision-option-review`. The compressed description dropped "Not a criteria-weighted option matrix", which is the boundary this prompt tests. The null run found false fires stable, so a new false fire with this explanation looks like signal rather than noise. It also answers an open question from the drafting session: dropping about 20 "Not for X" clauses stays inside threshold 4, with no margin left. The compressed arm also gained one case, `c115`, which looks like noise because the description change gives no reason for it.
- **The instrument is near its ceiling (high confidence, measured).** Both arms score 390/393 on trigger cases. Skill names are preserved and descriptive, so many cases may be decided by the name alone. A pass therefore shows no detectable harm, not proven absence of harm.

## The instrument limit found while checking the runs

The pre-registration says that an agent sees "a name and a description and nothing else". That was not true of these runs (high confidence, measured). All 64 router transcripts, 32 in each arm, contain the injected `AGENTS.md`, which lists each skill's family, evidence tier and artifact, and also lists the recipe chains. All 64 also contain the auto-memory index.

An installed user's agent does not get this table. It could rescue a compressed description, so the result may flatter compression. The size of that effect is unknown. The file audit itself is clean: the routers opened only the roster and the blind prompts, and no router opened a `SKILL.md` or an `eval/cases.md`.

The same harness produced earlier skill-selection scorecards, so their "name + description only" wording probably overstates the isolation too. This memo did not check those transcripts.

## Known limit from the pre-registration

The eval prompts are authored per skill, not drawn from real traffic. A compressed description could pass the eval and still miss phrasings that real users write. The eval also cannot see a description that claims less scope than its skill has. The honesty review compared each draft with its original description, not with its full `SKILL.md`.

## Other facts for the record

- **Reference, not baseline:** the recorded 2026-10-20 run scored 392/393 and 1 false fire on unchanged `eval/cases.md` files. Today's control scored 390/393 and 2. That is one case beyond the measured band of plus or minus one, so the band may be slightly wider than recorded.
- **Cost:** the runs used 65 agents and 5.24M subagent tokens, including one smoke-test agent, against an estimate of 64 agents and 6.8M.
- **No scorecard was written.** Neither arm was finalized, so no sidecar was stamped. The working files are in `_local/eval-rerun/2026-11-04/`, which is gitignored.

## Recommendation made before the deciding pair

The maintainer has two legitimate options, and this memo leans toward the first.

- **Run one more pair with routers that do not receive `AGENTS.md` (recommended).** It costs about 64 more agents and up to 5.2M more tokens. The five thresholds stay the same. If this pair runs, its result decides: a pass goes to run-order step 6, and a failure publishes the negative result and keeps the branch. Today's pair is then recorded as the first measurement, taken under the wider context. Fixing that now keeps a pass from looking like confirmation-shopping and a failure from looking like moved goalposts.
- **Ship on today's result, with this limit recorded.** The gate passed as pre-registered, and the injected table was the same in both arms. Its added signal may also be small, because each compressed description already leads with its artifact. The cost is that the library would publish a compression result whose isolation it knows was weaker than its design said.

A one-agent probe on the Explore agent type reported no `AGENTS.md`, `CLAUDE.md` or memory index in its startup context, so that type is the likely route to a clean pair. The probe was a self-report on a cheaper model. Explore also tends to read file excerpts, and the roster is 42 KB. A smoke test on `opus` must therefore confirm three things from the transcript: the table is absent, the whole roster was read, and the output carries 25 valid IDs.

**Decision (2026-11-04):** the maintainer chose the first option. An earlier commit of this memo recorded that choice before any clean-context router ran, so the rule above binds whichever way the result falls.
