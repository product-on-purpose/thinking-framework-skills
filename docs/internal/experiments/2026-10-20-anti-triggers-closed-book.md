# Is the zero-false-fire figure an artifact of the leaked anti-triggers? A one-field A/B

**Date:** 2026-10-20 · **Model:** `claude-opus-5-5` (tier `opus`) · **Instrument:** `scripts/eval/route.workflow.mjs`
**Status:** answered. The false-fire figure is not an artifact of the leak. The right-alternative figure is partly open-book: the leak probably supplies about three of its answers. This is recorded here rather than under `docs/internal/eval-results/` on purpose, for the same reason as [the 2026-09-11 enrichment A/B](2026-09-11-catalog-enrichment-ab.md): the control arm routes against a corpus the library does not ship, so it must never be read as a scorecard.

## The question

On 2026-10-14 the trigger eval's anti-case figures were found to be open-book. `gen-recommendable.mjs` copies each skill's "Should NOT trigger" lines from `eval/cases.md`, word for word, into the advisor catalog as that skill's `anti_triggers`. So every anti-case prompt sat in front of the router, filed under the skill it must not pick. The correction is in `scripts/eval/README.md`.

The 2026-09-11 A/B could only bound the effect from above, because it stripped `anti_triggers`, `not_use` and `overlaps` together, and only `anti_triggers` carries leaked case text. On 2026-10-17 the maintainer chose to run an `anti_triggers`-only arm the next time a trigger eval ran anyway. This is that arm.

## Design

The design has one variable. Both arms ran on the same day with the same model, router prompt, cases, blind copy, batching and scorer.

| Held constant | Value |
|---|---|
| Cases | the same 755 (376 trigger, 379 anti, 144 of the anti cases naming a better tool), extracted at `004c484` |
| Router prompt | identical; it has been corpus-agnostic since 2026-09-11 |
| Model | `claude-opus-5-5`, tier `opus`, passed as `args.model` |
| Batching | 25 cases per agent, 31 agents per arm |
| Scorer | `scripts/eval/score.mjs`, the same answer key |

| The one variable | Arm A | Arm B |
|---|---|---|
| Corpus | `recommendable.json` as shipped | the same file with `anti_triggers` removed, built by `strip-corpus.mjs --fields anti_triggers` |

`strip-corpus.mjs` refuses to write unless every retained field is byte-identical to the source. Its `--fields` option, which builds this arm, landed in #202 with a test that checks exactly that.

## Result

| Metric | A: shipped | B: `anti_triggers` removed | Delta |
|---|---|---|---|
| Trigger top-1 | **376/376** | **376/376** | 0 |
| Trigger top-3 | 376/376 | 376/376 | 0 |
| Anti no-false-fire | **379/379** | **379/379** | **0** |
| Anti right-alternative | 141/144 (97.9%) | 137/144 (95.1%) | -4 |
| Unrouted | 0 | 0 | 0 |

Top-1 was identical on **734 of 755** cases (97.2%). All 21 cases that moved were anti cases, and none of them was a false fire in either arm:

- **4 moved from the named better tool to "none".** These are the four right-alternative losses: c150 and c151 (`decision-option-review`), c439 (`reference-class-forecasting`) and c632 (`parallel-perspectives-review`). Answering "none" is not a false fire.
- **17 moved between two acceptable answers.** These were mostly between "none" and a non-authoring tool on cases that name no better tool, plus two cases that accept either `red-team-light` or `premortem`.

## What it means

**The zero-false-fire figure is not an artifact of the leak.** With every leaked line removed, no skill grabbed an anti case, on 379 of 379. The trust page can now report the anti-case false-fire figure as measured closed-book on this run, which the 2026-10-14 correction said the next run must state.

**The right-alternative figure is partly open-book.** Each "Should NOT trigger" line names the better tool next to its prompt. So the shipped corpus shows the router both the question and its answer. Two runs of the shipped corpus, scored on the same answer key, differ by one case:

| Run | Corpus | Model | Right-alternative on the 2026-10-20 key |
|---|---|---|---|
| 2026-09-13 | shipped | `claude-opus-5` | 140/144 |
| 2026-10-20, arm A | shipped | `claude-opus-5-5` | 141/144 |
| 2026-10-20, arm B | `anti_triggers` removed | `claude-opus-5-5` | 137/144 |

The 2026-09-13 run scored 137/144 on its own key. On 2026-10-17, three of its seven misses (c175, c488 and c751) were widened to accept the tool the router had picked, so it scores 140/144 on today's key. Arm B scored four below arm A and three below that re-score.

Three of arm B's four losses (c150, c151 and c632) went to the named tool in both shipped runs, on two models, and answered "none" only without the leaked lines. The fourth, c439, also answered "none" on 2026-09-13, so it moves between runs anyway. One run per arm cannot prove the effect. But the pattern points to the leak supplying about three right-alternative answers. Where the leak matters, the figure to quote is the closed-book one, 137/144 (95.1%). Repeated runs of both arms would settle it, and they are not proposed: the figure is a soft one, and it is not the one the library is held to.

**Compared with the 2026-09-11 A/B,** removing all three fields then cost one false fire and nine right-alternatives on 128 named cases. Removing `anti_triggers` alone now costs no false fire and four right-alternatives on 144. The two runs used different models and different answer keys (#172 widened some keys), so the comparison is directional only. It is consistent with the 2026-09-11 reading that `not_use` and `overlaps`, which carry no case text, do part of the work of keeping neighbours apart.

## Limits

- **Each arm is a single run.** The router's run-to-run variation on this corpus was never measured separately. The shipped arm reproduced the 2026-09-13 trigger and false-fire figures exactly. Re-scored on today's answer key, it also came within one case of the 2026-09-13 right-alternative figure. That is the only reproduction evidence.
- **The 2026-09-13 re-score uses that scorecard's miss list,** because its routed output was not kept. Widening a key only adds accepted answers, so only its seven listed misses could change, and three did.
- **This is a new baseline on a new model.** Earlier scorecards ran on `claude-opus-5`. Per `scripts/eval/README.md`, a run on a different model is compared with the old figures only to describe a change, never to claim one.
- **Closed-book applies to the `anti_triggers` leak only.** The `not_use` lines come from each skill's "When NOT to Use" section, not from its eval cases, so they leak no case text. But they are written by the same author who wrote the cases.
