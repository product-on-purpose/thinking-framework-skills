# Tiered descriptions: result of the pre-registered runs (roadmap C2-4)

**Date:** 2026-11-04
**Status:** first measurement recorded. The maintainer chose the clean-context pair on 2026-11-04, and that pair's result decides the experiment.
**Design:** [the pre-registration](2026-10-20-tiered-descriptions-preregistration.md), including its amendment that chose option B.

**All five pre-registered thresholds hold, but this memo recommends a clean-context re-run before shipping.** The routers saw more than the roster the design assumed. They also received the `AGENTS.md` skill table, and that could hide damage from compression.

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

## Recommendation

The maintainer has two legitimate options, and this memo leans toward the first.

- **Run one more pair with routers that do not receive `AGENTS.md` (recommended).** It costs about 64 more agents and up to 5.2M more tokens. The five thresholds stay the same. If this pair runs, its result decides: a pass goes to run-order step 6, and a failure publishes the negative result and keeps the branch. Today's pair is then recorded as the first measurement, taken under the wider context. Fixing that now keeps a pass from looking like confirmation-shopping and a failure from looking like moved goalposts.
- **Ship on today's result, with this limit recorded.** The gate passed as pre-registered, and the injected table was the same in both arms. Its added signal may also be small, because each compressed description already leads with its artifact. The cost is that the library would publish a compression result whose isolation it knows was weaker than its design said.

A one-agent probe on the Explore agent type reported no `AGENTS.md`, `CLAUDE.md` or memory index in its startup context, so that type is the likely route to a clean pair. The probe was a self-report on a cheaper model. Explore also tends to read file excerpts, and the roster is 42 KB. A smoke test on `opus` must therefore confirm three things from the transcript: the table is absent, the whole roster was read, and the output carries 25 valid IDs.

**Decision (2026-11-04):** the maintainer chose the first option. This memo records that choice before any clean-context router has run, so the rule above binds whichever way the result falls.
