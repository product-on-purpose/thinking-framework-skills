# The answer key lost 25 more correct answers to redirects written without their slug

**Date:** 2026-11-06
**Status:** corrected. No router ran for this record. The figures below rescore saved routes.
**Decision:** the maintainer approved fixing the bullets and the guard on 2026-11-06, because widening an answer key is the maintainer's call. [PR #132](https://github.com/product-on-purpose/thinking-framework-skills/pull/132) set the precedent on 2026-09-13.

**The right-alternative figure was undercounted by 25 in both routing evals, and the routers had already answered all 25 correctly.** No other figure moves. Top-1, no-fire and false fires are identical on every run rescored.

## What was wrong

`extract-cases.mjs` reads an anti case's right answer from a `think-<slug>` in its bullet. A bullet that writes "(iceberg-model)" names no slug, so its key falls through to `none`, which means "no named alternative". The router's pick of that tool then scored as no credit.

[PR #132](https://github.com/product-on-purpose/thinking-framework-skills/pull/132) fixed 16 such bullets and added a guard, `findProseNamedRedirects`, to stop more. The guard searched for a tool's name with spaces ("iceberg model"), so it passed the hyphenated spelling that authors usually wrote. This was found on 2026-11-06, while building the other-tool list in `score-lib.mjs`.

## What changed

- **The guard** in `scripts/lib/cases-lib.mjs` now matches hyphens as well as spaces, with a test.
- **26 bullets** in 15 skills' `eval/cases.md` gained the `think-` prefix. Each was read first, and each is a real redirect rather than a contrast. Only the prefix changed.
- **`recommendable.json`** was regenerated. Its diff is 25 lines. The bullet for `think-top3` is not in it, because meta-skills are not in that catalog.

**This adds no new exposure to the open-book figures (high confidence, checked).** Those tool names were already in the catalog, because the build copies each bullet word for word. Only the prefix is new.

## The figures

| Run | Right-alternative, old key | Corrected key | Top-1 and false fires |
|---|---|---|---|
| Framework routing, 2026-10-20, shipped catalog | 141/144 | 166/169 | Unchanged |
| Framework routing, 2026-10-20, closed-book arm | 137/144 | 162/169 | Unchanged |
| Skill selection, 2026-10-20 | 146/157 | 171/182 | Unchanged |
| Skill selection, 2026-11-04 control, default agent | 147/157 | 172/182 | Unchanged |
| Skill selection, 2026-11-04 control, Explore agent | 146/157 | 171/182 | Unchanged |

The numerator and denominator rise by 25 on every run, so every router in every run picked the named tool on all 25 (high confidence, measured). A script compared the old and new keys: both hold the same prompts, sources and types, and `expected` changed from `none` to the named tool on exactly 25 cases in each eval.

The committed scorecards stay as they are, because they state what was measured on the key in force that day. Those dated 2026-10-20 carry a note. `npm run eval:freshness` now reports the edited skills as stale, which is accurate until the next scorecard.

## What this does not fix

- **`none` still mixes two meanings.** On the 2026-11-04 default control, 74 other-tool picks remain on cases with no named alternative. Many of those bullets name a category, such as "(decision)" or "(risk over time)". Nothing separates a right pick from a wrong one there, so `score-lib.mjs` lists them without scoring them.
- **Short names.** The guard skips names under seven characters. The one such redirect found, `think-woop` on `c90`, was fixed by hand, and a new one would not be caught.
- **Commands.** `c744` redirects to the `think-stress-test-decision` recipe. Its bullet now carries the slug, but its key stays `none`, because the key has no way to name a command as the right answer.
- **A deliberate exception.** `c548` names Analysis of Competing Hypotheses in order to decline it, as the guard allows, so its key correctly stays `none`.
