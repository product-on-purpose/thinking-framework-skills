# How the live advisor reads its catalog: measurement design (D3)

**Status: design, written 2026-11-09. Nothing has run.** This file fixes the question, the sample, the measures and the decision rule before any run, so the decision cannot move to fit the data. The maintainer approves the design, the spend and the two setup choices under "What the maintainer decides" before step 1 of the run order.

**Prompted by:** decision 3 in [the clean router run](2026-11-06-clean-router-run.md), which the maintainer decided on 2026-11-07: measure how the live `think-framework-advisor` reads `references/recommendable.json` before changing anything. The backlog entry dated 2026-11-07 holds the same item.

## The question

**When an agent runs `think-framework-advisor` as the skill is written, does enough of `recommendable.json` reach it to recommend a skill that only the catalog names?** And when the catalog entry for the best-fitting skill never reaches the agent, does the Thinking Plan miss that skill?

The skill requires every recommended name to appear in `recommendable.json` (protocol 7, guardrail 6). It never says how to read that file. The file is 199,332 bytes, about 67,000 tokens, and 1,809 lines. A default `Read` returns 573 lines, which is the first 21 of the 63 skill entries and none of the 9 recipes.

## What the earlier transcripts already show

Two advisor runs from September are still on disk. They are the `framework-advisor` producers in the output eval: agent `a933684dd00b6b929` in `wf_60ce551a-d9a` (2026-09-11) and agent `a4af3edc3e6b1ab02` in `wf_33d3ce14-aed` (2026-09-12). Both ran on `claude-opus-5` as default Workflow subagents, so they received the maintainer's global instructions and memory index (see [the context audit](2026-11-05-eval-router-context-audit.md)). Both worked the same prompt, a Postgres migration whose fitting skills all appear in `SKILL.md`. The probe scripts are in `_local/advisor-read-probe/2026-11-09/`.

**Neither agent hit the `Read` cap, because neither used `Read` on the catalog (high confidence, read from the tool calls).** Both ran `cat` on it through Bash. The shell result was too large and was saved to a file, so the agent received a 2,231-character notice that carried 2 of the 63 names.

**The two agents then recovered in different ways (high confidence).**

| Agent | What it did next | Names that reached it | Descriptions that reached it |
|---|---|---|---|
| `a4af3edc3e6b1ab02` | A script printed all 63 names with family, tier and policy, then full entries for 18 chosen skills and all recipes | 63/63 | 19/63 |
| `a933684dd00b6b929` | A script printed full entries for 14 names it had already chosen, then the recipes | 32/63 | 14/63 |

The second agent chose its shortlist before it had seen the catalog. Every name on that list appears in the Engine 1 table in `SKILL.md`, so 31 skills could never have been recommended in that run. On that prompt the omission cost nothing, because the right answers were all in the table.

**So the risk has two mechanisms, not one (medium confidence, inferred from two runs).** The first is the `Read` cap that the 2026-11-06 record found. The second is shortlisting from the `SKILL.md` table and never looking past it. Both runs are prior evidence of the mechanism. They are not a measurement of the live advisor, because the eval's produce prompt, the agent type and the model all differ from live use.

## Why the sample is built this way

**A prompt whose answer is in the `SKILL.md` table cannot detect the failure.** An agent can name a table skill without reading the catalog at all. Of the 63 skills, 32 appear in `SKILL.md` and 31 appear only in the catalog. Of those 31, 10 sit in the first 21 entries and 21 sit after line 573, where a default `Read` never reaches.

**The sample has 31 prompts in three strata, selected mechanically.** The selection script is `_local/advisor-read-probe/2026-11-09/select-sample.mjs`, run against `main` at `8ce0429` (v0.21.0).

- **Late, 21 prompts:** every catalog-only skill after line 573. This is the stratum that decides the result.
- **Early, 5 prompts:** every second catalog-only skill in the first 21 entries. A default `Read` reaches these, so they separate the cap from the shortlist mechanism.
- **Control, 5 prompts:** five table skills that the trigger corpus most often names as the right alternative. If the controls also miss, the problem is not reading.

**Each prompt is an existing "Should trigger" case from that skill's `eval/cases.md`, so no prompt is written for this run.** The script takes the first trigger prompt that does not name the method, using the slug's words and a fixed alias list. The five contested lenses are the exception. Their policy is explicit-request-only, so a prompt that names the lens is the correct test, and the script takes their first prompt. That tests whether the agent finds the lens and its policy flag, which live only in the catalog for four of the five.

| Stratum | Entry | Skill | Prompt opens with |
|---|---|---|---|
| late | 22 | `eisenhower-moscow-pareto` (contested, named) | "Run an Eisenhower matrix on my task list for this week." |
| late | 23 | `ethical-matrix` | "We're about to ship a default-on clause that trains our models on free-tier users' data." |
| late | 25 | `expected-value-decision-tree` | "Go / no-go on the hardware bet." |
| late | 27 | `fermi-estimation` | "Roughly how many paying accounts would a free tier convert for us in year one?" |
| late | 28 | `five-whys` (contested, named) | "Run a Five Whys on why our nightly export failed." |
| late | 29 | `frame-creation` | "We've thrown more support staff, more docs, and more reminders at churn for a year" |
| late | 32 | `interest-based-negotiation` | "I'm going into a contract renewal with our biggest vendor next week" |
| late | 33 | `interval-calibration-check` | "Our business case says free-to-paid conversion will be 3 to 5 percent, 90 percent sure." |
| late | 37 | `minimax-regret` | "This is a one-shot bet on a brand-new category." |
| late | 38 | `morphological-analysis` | "Our pricing-and-packaging design keeps defaulting to the same shape." |
| late | 41 | `pairwise-comparison` | "I have six candidate taglines for the launch page." |
| late | 45 | `process-tracing` | "Our paid-conversion retention cratered in the cohort right after the free-tier launch." |
| late | 47 | `qualitative-comparative-analysis` (contested, named) | "Run a QCA across our last eight launches" |
| late | 51 | `reflective-equilibrium` (contested, named) | "Run a reflective equilibrium on whether our LIFO layoff policy should apply" |
| late | 52 | `role-storming` | "Our brainstorm keeps circling the same three obvious ideas" |
| late | 54 | `scenario-planning` | "We're about to bet the company on a self-serve growth motion for the next three years" |
| late | 55 | `speculative-harms-anti-goals` | "Our new location-sharing feature is going to be a hit." |
| late | 58 | `theory-of-constraints` | "Our onboarding takes about six weeks and everything waits on the security review." |
| late | 59 | `three-horizons` | "Half the team wants to defend our core business and half wants to chase the disruptive new" |
| late | 60 | `veil-of-ignorance-reasoning` | "We're rationing a fixed support budget between paying enterprise accounts and free-tier users" |
| late | 61 | `walton-argumentation-schemes` | "Someone keeps shooting down our free-tier plan by quoting one analyst" |
| early | 9 | `belief-update-routine` | "It's our quarterly review." |
| early | 12 | `causal-layered-analysis` | "We've fought about 'free vs paid' for two years" |
| early | 14 | `complexity-domain-sort` (contested, named) | "Run a Complexity Domain Sort on whether we should plan this launch" |
| early | 16 | `consider-the-unknowns` | "We're about to call this competitor a non-threat" |
| early | 18 | `contradiction-tension-mapping` | "Our leadership is split: half want hard standardization across teams" |
| control | 43 | `premortem` | "We're two weeks out from launching the new billing system" |
| control | 20 | `decision-option-review` | "We're down to three CI/CD vendors and the team keeps going in circles." |
| control | 34 | `issue-tree` | "Churn jumped last quarter and nobody can say why." |
| control | 11 | `brainwriting` | "I need a wide range of options for how we could onboard new users" |
| control | 56 | `stocks-and-flows-reasoning` | "We cut churn in half - does that mean our customer base is finally growing?" |

The full prompts are in `_local/advisor-read-probe/2026-11-09/sample.json`, and the script regenerates them from `eval/cases.md`.

## The instrument

**The run uses the real skill-loading path, not a Workflow subagent told to read `SKILL.md`.** Each prompt runs as one headless Claude Code session:

```
claude -p "<invocation> <prompt>" --plugin-dir <v0.21.0 export> --add-dir <v0.21.0 export> \
  --allowedTools "Read Grep Glob Bash" --model claude-opus-5-5 \
  --setting-sources project,local --output-format stream-json --verbose --max-budget-usd 8
```

- **The plugin is an export of tag `v0.21.0`** (`git archive`), loaded with `--plugin-dir` for that session only. The marketplace pins the same commit, and nothing is installed into the maintainer's configuration.
- **Every reading route a live user would approve stays open, so the agent's own choice of route is what gets measured.** A headless session has no one to approve a tool call, and the export sits outside the session's working folder. Without `--add-dir` and the allowlist, the run could deny `Read` on the catalog or deny the shell, and force a route the live advisor does not have. Both September agents reached the catalog through the shell, so the shell must stay available. `Write` and `Edit` are not granted, because the advisor's deliverable is its reply.
- **The allowlist replaces `bypassPermissions` on purpose.** Leaving out user settings also leaves out the maintainer's guard hook against destructive commands, so the session gets only the four read and shell tools it needs.
- **Each session starts in an empty folder outside any repository**, `E:/tmp/tfs-d3/run/`. So no `AGENTS.md` loads. The repository's `AGENTS.md` lists all 63 skills, so a session that received it would see every name without reading the catalog, and that would hide exactly what this run measures.
- **`--setting-sources project,local` leaves out the maintainer's user settings,** so user hooks, the output style and other plugins do not load. Whether `~/.claude/CLAUDE.md` still loads is checked in the smoke test. If it does, the run records that as a known difference from a fresh user. Those instructions name no skill, so they cannot leak a name.
- **`--bare` is not used.** It would remove the user instructions too, but it authenticates only through `ANTHROPIC_API_KEY`, not the subscription login.
- **Session persistence stays on, because the transcript is the instrument.** Transcripts land under `~/.claude/projects/` in the folder for the run's working directory.
- **The invocation names the skill explicitly,** so every session runs the advisor. Whether the advisor triggers on its own is a different question, which the skill-selection eval already measures. The smoke test settles the exact invocation form for a `--plugin-dir` skill.
- **A session that asks one clarifying question and stops is valid advisor behavior** (protocol 2). Headless mode has no user to answer, so such a run counts toward reading coverage and is excluded from the outcome figures.

## Measures

**Reading coverage, per session.** The probe reuses the method in [the clean router run](2026-11-06-clean-router-run.md), so the figures are comparable. Text counts as seen when it reached the agent in a `tool_result`, counting only `user` and `assistant` records.

- Names seen, out of 63, and recipe names seen, out of 9.
- Descriptions seen, out of 63, probed by each entry's first 40 characters.
- Whether the expected skill's own description, `not_use` text and policy flag reached the agent.
- The reading route: `Read` with a default limit, `Read` with `allow_large` or paging, `cat` or another shell read, a scripted query, or a search. Also whether a size limit or a persisted-output notice cut a result.

**Outcome, per session.** A script reads the Thinking Plan and classifies the expected skill. A name in "what NOT to use" does not count as a recommendation.

- **Recommended:** the expected skill is named in a plan step. The run also records whether it is Step 1. A direct handoff that names the skill also counts, because the skill tells the advisor to route a user who already names the move straight to that skill. The five named contested prompts will often produce a handoff.
- **Neighbor:** the plan names other skills but not the expected one.
- **Plain language:** the plan describes a step without naming any skill for it.
- **Zero or asked:** the plan recommends no framework, or the session asked a clarifying question.
- **Invented name:** any recommended name that is not in `recommendable.json`. This is a name-safety failure, counted on its own.
- **Capped:** the budget cap ended the session before it produced a plan. Such a session counts toward reading coverage up to the cut and is excluded from the outcome figures. The record reports every capped session, because the cap could bias the result: reading the whole catalog costs more, so a cap that cuts off thorough readers would flatter partial reading. The $8 cap is about 3.5 times the highest September session.

The expected skill is the case's own skill, because these are its trigger cases. A neighbor pick is not automatically wrong, and the record reports each neighbor pick with its name. **The finding is the cross-tabulation of the two:** whether the expected skill was missed more often when its entry never reached the agent.

## Decision rule (fixed before the run)

A "miss while unseen" is a catalog-only session where the expected skill's description never reached the agent and the plan did not recommend that skill.

| Result | What it means | What follows |
|---|---|---|
| 3 or more misses while unseen, across the 26 catalog-only sessions | Partial reading costs recommendations | A fix is warranted. The record names the mechanism behind each miss: the cap, the shortlist, or both |
| The expected description reached at least 24 of 26 catalog-only sessions, and there was at most 1 miss while unseen | The advisor reads enough as written | No change. The record says so, and the backlog item closes. Name coverage is reported but does not decide, because an agent can find the right entry without listing all 63 names |
| Anything between those two | A weak signal | The record reports it, and the maintainer decides |
| Any invented name, in any stratum | Name safety failed | Reported separately, whatever the reading result |
| A control misses its expected skill in 2 or more of 5 sessions | Something other than reading is wrong | The reading result is not interpreted until that is understood |

**The fix is not chosen here.** Two candidates already exist. One is a reading instruction in `SKILL.md`. The cheapest version would point the agent at `references/recommendable.md`, a generated index of all 63 skills with tier and a short description at about 4,000 tokens, before it reads full entries for a shortlist. `SKILL.md` does not mention that file today. The other candidate is a smaller catalog. **Whichever fix is chosen, it is measured by re-running the same 31 prompts on the same model and comparing against this run.**

## Cost

**One advisor session costs far more than one routing answer.** Each September advisor run used 120,000 to 130,000 tokens of cache writes, 1.6 to 2.7 million tokens of cache reads, and up to 7,500 output tokens. At Opus list prices ($5 input and $25 output per million, from `agent-config/reference/model-routing/routing-reference.md`), with the 0.1 times cache-read and 1.25 times cache-write multipliers used in earlier records, that is about $1.60 to $2.30 a session. A routing answer on 2026-11-07 cost about $0.04, so one advisor session costs about 50 routing answers. That is why the sample is 31 prompts and not 755.

| Stage | Sessions | Estimated tokens | Estimated cost |
|---|---|---|---|
| Smoke test | 2 | about 4 million | about $5 |
| Main run, Opus 5.5 | 31 | 50 to 85 million, mostly cache reads | about $50 to $70 |
| Optional Sonnet 5.5 arm, same 31 prompts | 31 | similar | about $30 to $45 |

These are estimates from two transcripts (medium confidence). The `--max-budget-usd 8` flag caps each session, so the main run cannot exceed $248 even if every session runs long.

## Run order

1. **The maintainer approves this design, the spend and the two choices below.** Nothing runs before this.
2. **Smoke test, 2 sessions:** one late prompt and one control. It must confirm that the `--plugin-dir` skill is invocable, that transcripts hold full `tool_result` bodies, what context loaded on the first turn, that no read or shell call on the catalog was denied, and that the probe scripts read the new transcript format. A smoke-test failure stops the run and comes back to the maintainer.
3. **Main run:** the 31 sessions, at most 4 at a time, from a runner script under `_local/advisor-read-probe/`.
4. **Probe and score** with the scripts above, then check by hand every session the scripts classify as a miss while unseen.
5. **Write the result** as `docs/internal/experiments/<date>-advisor-catalog-reading-result.md`, apply the decision rule as written, and update the backlog entry.

## What the maintainer decides

1. **Approve the run and its spend:** the smoke test, then 31 Opus 5.5 sessions, about $55 to $75 together. Recommendation: yes.
2. **Add the Sonnet arm or not.** It would show whether a cheaper model reads the catalog differently, which bears on row O-21 (subagent tier validation) in `agent-config/OPEN.md`. Recommendation: not now. Run it only if the Opus result shows a reading problem, because a fix would need re-measuring on both models anyway.
3. **Accept the headless instrument with user settings left out.** The alternative is a Workflow run, which is cheaper to orchestrate but cannot avoid `AGENTS.md` on a default agent, while the `Explore` agent's own prompt steers it toward reading excerpts. Recommendation: accept the headless instrument.

## What this cannot show

- **Each prompt runs once, so the run has no noise band.** A single miss may be noise. That is why the threshold is 3 misses, not 1.
- **The prompts are authored cases, not real traffic.** Real users may describe situations that point less clearly at one skill.
- **A headless session is close to live use, not identical.** It has no user to answer a question, and its system prompt can differ from an interactive session.
- **The result holds for Opus 5.5 and Claude Code 2.1.321.** The `Read` limit and the size at which shell output is saved to a file both belong to the tool, so a later version can change the result.
- **Coverage shows what reached the agent, not what it weighed.**
