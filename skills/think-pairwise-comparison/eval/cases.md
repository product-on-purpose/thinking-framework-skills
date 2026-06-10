# Eval cases: think-pairwise-comparison

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "I have six candidate taglines for the launch page. I can't put a number on any of them and we keep arguing about the criteria, but I can always tell you which of two I'd rather ship. Rank them for me."
- "Here are five shortlisted design submissions. There's no rubric everyone agrees on and scoring them 1-to-10 is hopeless, but pick the better one in each head-to-head and give me the overall order."
- "We need to order these grant proposals by merit. The evaluators can't defend an absolute score, so just compare them two at a time and tell me the ranking - and flag if their judgments contradict each other."
- "Rank these seven essays without marking them. Use forced choice between pairs and show me the matrix and whether the comparisons are consistent."
- "I can't agree with the team on what makes a 'good' candidate name, but for any two names I can say which I prefer. Build the comparison matrix and read off the order, and tell me if there's a cycle."
- "Give me a defensible order for these five vendor pitches using only A-beats-B judgments - no scoring axis, and surface any intransitivity so we know where to re-look."

## Should NOT trigger (wrong tool / near-miss)

- "Compare these four vendors on price, support, security, and integration depth, weight the criteria, score each, and recommend one with the tradeoffs." (the criteria are nameable and a scale is defensible - this is `think-decision-option-review`, the criteria-weighted option matrix, not a no-scale forced-choice ranking.)
- "Help me set the relative importance of our five decision criteria by comparing them two at a time, then plug those weights into our option scoring." (criteria-weighting by pairwise voting - the AHP / PAPRIKA elicitation - produces no separate artifact; it fills the weight vector of `think-decision-option-review`. Route it there, not here.)
- "I screen dozens of inbound leads a week. Give me a consistent weighted rule over a few signals (company size, intent, fit) I can apply to every new lead." (a repeatable formula over named cues for a recurring prediction is `think-linear-model-aggregation`; it needs the cues and scale pairwise comparison refuses, and it builds a reusable model, not a one-off ranking.)
- "Roughly how long will this migration take? Base it on how similar past migrations actually went." (anchoring a number on a reference class of past cases is `think-reference-class-forecasting`; pairwise comparison orders a fixed set, it does not estimate a quantity from a base rate.)
- "I have twenty candidates to rank by forced pairwise comparison." (the item count is too large - 20 items is 190 pairwise judgments, which collapses under its own combinatorics with no adaptive tooling a markdown-only agent can run; cut the set down to a shortlist first, or use a scored method. Do not attempt the full matrix.)
- "Summarize what the team shipped this quarter for the board update." (unrelated.)

## Output checks (a good output must)

- [ ] Confirm up front that there is no defensible absolute scale and no articulable criteria axis - otherwise the case belongs to `think-decision-option-review`.
- [ ] State the single comparative question once and apply it identically to every pair.
- [ ] Check the item count (n(n-1)/2) and judge **every** pair - none skipped; if the set is too large, cut it down or hand off rather than forcing a giant matrix.
- [ ] Present the **comparison matrix** of binary A-beats-B votes (one win and one loss per off-diagonal pair), with no scores and no criteria column anywhere.
- [ ] Derive the **ranking** from win counts, breaking ties by head-to-head result.
- [ ] Run and report the **consistency check**: surface any cycle (A beats B, B beats C, C beats A) as the specific judgments to revisit, not silently dropped or auto-resolved.
- [ ] Frame the order as a forced-choice ranking, not an objective measurement; note that a passing consistency check does not make the preference correct and that a near-duplicate item could shift the order.
- [ ] Not overclaim: keep to an easier-and-more-stable ranking aid; the evidence is practitioner-grade and transferred, not a measured gain in decision quality.

## Value vs unaided baseline

Asked to rank a set of un-scoreable items, a strong model tends to either invent a scoring rubric nobody can defend (manufacturing the very 1-to-10 scale the situation lacks) or produce a confident holistic order with no visible reasoning and no way to inspect where it might be wrong. It rarely decomposes the ranking into every isolated A-beats-B judgment, holds one comparative question fixed across all pairs, tallies the votes into a matrix, and - crucially - checks the head-to-head judgments for cycles so that an intransitivity becomes a flagged prompt to re-examine rather than a hidden inconsistency buried inside an aggregate. This skill forces that discipline: a single fixed comparative question, every pair judged (with both orders considered to dampen position bias), a comparison matrix, a ranking derived from win counts, and an explicit consistency check that surfaces cycles. It converts an unstable holistic ranking into a stable, inspectable, forced-choice order - and it refuses to attach a false-precision score to the result.
