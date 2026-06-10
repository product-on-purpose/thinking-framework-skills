---
name: think-pairwise-comparison
description: Produces a binary-vote comparison matrix (every pair judged A-beats-B), a derived ranking, and a consistency check, ordering options without any criteria axis or absolute scoring. Use when items must be ranked but no defensible scale or articulable criteria exist. Not a criteria-weighted option matrix and not a base-rate forecast.
license: Apache-2.0
metadata:
  id: thinking-framework-skills.pairwise-comparison
  family: decision-and-option-evaluation
  evidence-tier: "P"
  version: 0.1.0
  standard: "0.8"
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Pairwise Comparison

Ranking a set of options holistically forces an unstable judgment: "rank these six from best to worst" or "score each from 1 to 10" demands a fixed internal scale and a memory of how earlier items were scored, and that scale wobbles. Pairwise comparison replaces the one hard holistic ranking with a series of isolated two-item judgments. For every pair it asks the single easier question - which of these two is better? - then tallies each item's wins into a matrix and reads the ranking off the tally. The durable move is psychophysical: a person (or an agent) holds a far more stable signal for "A beats B" than for "A is a 7," because the binary judgment needs no absolute scale and no criteria axis. The matrix also exposes its own quality - a cycle (A beats B, B beats C, C beats A) is a visible inconsistency to revisit, not a hidden error.

The output is a **binary-vote comparison matrix**: every pair judged A-beats-B, the derived ranking (each option's win count, ties broken by head-to-head), and a consistency check that surfaces any cycles. There is deliberately no criteria column and no absolute score. This is the narrow, honest reading of the technique - rank when you cannot score - and it is scoped precisely to the case the weighted-matrix skills disclaim.

## When to Use

- Items must be ordered, but no one can defend a 1-to-10 scale and the criteria that would justify a score genuinely cannot be articulated (qualitative artifacts - writing samples, design submissions, shortlisted proposals - where holistic marking is noisy).
- The decision-maker can reliably say "this one beats that one" for any pair, even though they cannot say "this one is a 7."
- The set is small enough to compare every pair by hand (roughly up to 6-8 items; the full set is n(n-1)/2 judgments - 15 for six items, 28 for eight).
- A surfaced cycle (an intransitivity) would be useful information - a prompt to re-examine two judgments - rather than noise to suppress.

## When NOT to Use

- **Do not use it when criteria are nameable and a scale is defensible.** That is `think-decision-option-review` - the criteria-weighted option matrix. Its procedure already defines and weights the criteria, scores each option on a stated scale, and surfaces tradeoffs. If you can say what a high score means, that skill is faster and more inspectable, and pairwise voting on the criteria is just an elaborate way to fill one weight column it already owns. Pairwise comparison occupies the case `think-decision-option-review` explicitly disclaims ("when the criteria genuinely cannot be articulated").
- **Do not use it to weight criteria for a scoring model.** Comparing two criteria at a time to set their relative importance (the AHP / PAPRIKA elicitation) produces no new artifact - it fills the weight vector of `think-decision-option-review`. Route criteria-weighting there as an optional elicitation, not here.
- **Do not use it to fix a repeatable formula over named cues.** When you have explicit cues and want a weighted rule applied to many future cases (the same prediction made again and again), that is `think-linear-model-aggregation`. It needs the very cues and scale pairwise comparison refuses; pairwise produces a one-off ranking, not a reusable model.
- **Do not use it to anchor a number on a base rate.** Estimating a quantity by comparing the case to a reference class of similar past cases is `think-reference-class-forecasting`. That anchors one number on outside-view data; pairwise comparison orders a fixed set by internal head-to-head votes.
- **Do not use it when the item count is large.** Past roughly 8 items the n(n-1)/2 judgment count (45 for ten, 120 for sixteen) becomes punishing, and pruning the matrix while preserving the order needs adaptive or incomplete-design tooling a markdown-only agent cannot run by hand. Cut the set down first, or use a scored method.
- **Do not treat the derived ranking as objective output.** A passing consistency check does not make a manufactured preference correct. Pairwise comparison launders subjective inputs into a clean-looking order; the cleanliness is presentational, and a near-duplicate option added to the set can shift the others' ranking (a structural artifact, not a judgment error).

## Instructions

When asked to rank a set of options where no criteria or scale can be defended, follow these steps:

1. **State the ranking question and list the items.** Name the single comparative question that will be asked of each pair ("which of these two better serves X?") and list the items to be ordered. Confirm there is genuinely no defensible absolute scale and no articulable criteria axis - if there is, stop and route to `think-decision-option-review`.
2. **Check the item count.** Compute n(n-1)/2 for the list. If it is more than roughly 28 (eight items), say so and either cut the set down or hand off to a scored method - do not attempt a large matrix by hand.
3. **Enumerate every unordered pair.** For n items there are n(n-1)/2 pairs. List them so none is missed.
4. **Judge each pair A-beats-B.** For each pair, record which item wins the single comparative question. To dampen order effects, consider the pair in both orders before committing the winner. Ties are allowed only if genuinely undecidable; prefer forcing a winner.
5. **Build the comparison matrix.** Fill an n-by-n grid: cell (row, col) records whether the row item beat the column item. Each off-diagonal pair is one win and one loss (the matrix is the votes, not scores).
6. **Derive the ranking.** Count each item's wins (its row total). Order by win count, highest first. Break ties by the head-to-head result between the tied items.
7. **Run the consistency check.** Scan for cycles - any A beats B, B beats C, C beats A triangle. Report each cycle found. A cycle is not auto-corrected: it is flagged as the pair(s) of judgments to revisit, because it signals the comparative question shifted or two judgments conflict.
8. **Emit the artifact** per `references/TEMPLATE.md`: the ranking question, the comparison matrix, the derived ranking with win counts, and the consistency check (cycles found or "transitive, none found"). State plainly that the order is a forced-choice ranking, not an absolute score.

## Output Format

Use the template in `references/TEMPLATE.md`. The deliverable is the filled artifact - the comparison matrix of binary A-beats-B votes, the derived ranking with win counts, and the consistency check - not a prose essay and not a scored or criteria-weighted matrix. Never attach an absolute score or a criteria column to the order.

## Quality Checklist

Before finalizing, verify:

- [ ] There is genuinely no defensible absolute scale and no articulable criteria axis - otherwise this is the wrong skill (route to `think-decision-option-review`).
- [ ] The single comparative question is stated once and applied identically to every pair (a shifting question is what manufactures cycles).
- [ ] Every one of the n(n-1)/2 pairs is judged - none skipped.
- [ ] The item count was checked; a set too large to compare by hand was cut down or handed off, not forced.
- [ ] The ranking is derived from win counts, with ties broken by head-to-head - no absolute scores and no criteria column appear anywhere.
- [ ] The consistency check is run and reported: cycles are surfaced as judgments to revisit, not silently dropped or auto-resolved.
- [ ] The output is framed as a forced-choice ranking, not an objective measurement; no false precision is claimed.
- [ ] No overclaiming: the evidence is practitioner-grade and transferred; claim an easier-and-more-stable ranking aid, not a measured gain in decision quality (see `evidence/dossier.md`).

## Evidence

Tier **P** (governing). Pairwise comparison has a deep lineage and a robust psychometric core for *scaling* - Thurstone's Law of Comparative Judgment (1927) places stimuli on an interval scale from paired comparisons, and educational comparative-judgement work (Pollitt, from 2004) reports high scale-separation reliability for ranking open-ended work. But that evidence is for the *reliability of a scaling artifact*, not for *better decisions by an agent that runs the method*, and it is contested: Bramley (2015) and Bramley and Vitello (2019) show the adaptivity in Adaptive Comparative Judgement inflates the reliability statistic (a reported 0.97 deflating to 0.84), and Verhavert and colleagues (2022) question the rationales. The often-quoted "88 percent versus 74 percent" weight-elicitation figure is real but belongs to Direct Rating versus Point Allocation (Bottomley, Doyle and Green 2000) and does not test pairwise comparison at all - it is excluded. In the AHP tradition the apparatus is criticised on its own terms (rank reversal under consistent judgments; an over-strict consistency ratio). The classic necessity argument (Tversky 1969, intransitivity of preference) has largely failed to replicate (Regenwetter and colleagues, 2011). All of this is from human subjects; the nearest agent-relevant evidence is the LLM-as-judge literature, which finds pairwise evaluation approximates human preference better than pointwise scoring but suffers a position bias that must be corrected by running both orders ("Judging the Judges," 2024) - and that is an agent *evaluating outputs*, not a decider *running a decision*. The evidence is transferred from human contexts and not validated for AI-augmented decision-making, which caps the grade at P. The skill ships as an easier-and-more-stable ranking aid, scoped to the no-scale case, never as an objective scorer. Full grading, sources, and the excluded figures: `evidence/dossier.md`.

## Examples

See `references/EXAMPLE.md` for a completed comparison matrix on a real decision.
