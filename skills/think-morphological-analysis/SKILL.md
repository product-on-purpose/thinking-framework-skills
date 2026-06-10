---
name: think-morphological-analysis
description: Produces a morphological field (a Zwicky box of independent parameters by their possible values) plus a cross-consistency-pruned set of internally consistent configurations. Use when a solution is genuinely a configuration - a choice on each of several semi-independent dimensions (product architecture, service bundle, policy package) - and the risk is defaulting to one familiar combination and never seeing the rest of the space. Not a top-down MECE tree and not a provoked option list.
license: Apache-2.0
metadata:
  id: thinking-framework-skills.morphological-analysis
  family: divergent-ideation
  evidence-tier: "P"
  version: 0.1.0
  standard: "0.8"
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Morphological Analysis

Most design and option work jumps straight to a few familiar combinations and never sees the rest of the space. Morphological analysis (the "Zwicky box") refuses that shortcut. It treats a solution as a CONFIGURATION - a single value chosen on each of several semi-independent dimensions - and lays the whole space out so the unobvious corners come into view. The durable move has two halves, and the second is what separates it from a plain options list: (1) decompose the problem into a small set of independent PARAMETERS with their discrete VALUES, giving the full combinatorial cross-product; then (2) run a **cross-consistency assessment** - pair off every value with every other value across parameters, strike the internally incompatible pairs, and keep only the configurations that survive. The output is a **morphological field**: a parameter-by-value box plus a consistency-pruned set of internally consistent configurations. It is not a tree, not a ranked list, and not the chosen answer - it generates and prunes-for-consistency; a downstream step scores and chooses.

## When to Use

- The solution genuinely is a configuration - a choice on each of several semi-independent dimensions (a product architecture, a service or pricing bundle, a feature set, a policy package, a research design, a go-to-market shape).
- The real risk is tunnel vision: the team keeps defaulting to one familiar combination and would not otherwise see the rest of the space, including the corners no forward search would visit.
- The parameters are real and discoverable, and some value pairs are clearly incompatible - so the cross-consistency pass does real pruning rather than rubber-stamping everything.
- The goal is breadth-with-structure (cover the space, then narrow to the viable region), with scoring and selection handled as a separate downstream step.

## When NOT to Use

- **Do not use it to provoke fresh options by negating the premises.** Negating a problem's foundational assumptions to jolt out new ideas is `think-assumption-reversal`; its product is a provoked option list. Morphological analysis negates nothing and provokes nothing - it builds a structured combinatorial space and reduces it by consistency. They share only the abstract goal "expand the option set," which is well under the overlap line.
- **Do not use it to transform one seed idea.** Applying fixed transformation verbs (substitute, combine, adapt, modify, and so on) to a single existing concept is `think-scamper`. There is no decomposition into orthogonal axes and no cross-product there; that is a different machine.
- **Do not use it to import structure from a distant domain.** Borrowing the deep structure of a far-off field to spark an idea is `think-far-analogy-ideation`. Morphological analysis uses no analogy; its lift comes from recombining the problem's own parameters.
- **Do not use it to invert toward bad ideas and flip them.** Deliberately generating the worst possible ideas and then reversing them is a provocation technique, not an enumeration. Morphological analysis does not invert; it enumerates a space and prunes it for internal consistency. (This library ships no skill for that provocation, so reach for it only outside this catalog.)
- **Do not confuse it with a top-down MECE tree.** Decomposing one question into a mutually-exclusive, collectively-exhaustive hierarchy you read as a tree is `think-issue-tree`. A tree never multiplies its branches together and never runs a cross-consistency pass; morphological analysis decomposes into PARALLEL orthogonal axes and then RECOMBINES and prunes them. Decomposition is the only shared part; the recombination-and-pruning is exactly the part a tree lacks.
- **Do not treat the box as the evaluator.** The field generates configurations and prunes them for internal consistency; it does NOT rank them by value. Scoring surviving configurations against weighted criteria to pick one is `think-decision-option-review`, which runs AFTER. Reading a surviving configuration as "the chosen answer" skips the trade-off comparison the box was never designed to make.
- **Do not use it on a non-configurational problem.** If the answer is a single insight, a reframe, or one number, forcing it into orthogonal axes is overhead. The method assumes the solution factorizes; many do not.

## Instructions

When asked to map a solution space or systematically generate configurations, follow these steps:

1. **State the focal problem in one line.** Name the thing being configured and what "a complete solution" must specify. The field exists to serve this; if the answer is a single insight or one number rather than a configuration, stop (that is the non-configurational anti-pattern).
2. **Choose the parameters (the independent dimensions).** Identify a small set (typically 3-6) of orthogonal parameters - the dimensions any solution must take a position on. Keep them genuinely independent and few; adding parameters to feel thorough multiplies the space toward the unmanageable. The decomposition is the whole ballgame, and nothing in the method forces a good one - justify each parameter.
3. **Enumerate the values for each parameter.** For each parameter, list its discrete possible values (the cells in that column). Aim for values that are meaningfully distinct and reasonably exhaustive for that dimension. This is the raw morphological field - the full cross-product is the product of the value counts.
4. **Run the cross-consistency assessment (the reduction step).** Pair every value with every other value ACROSS parameters and judge each pair as compatible or incompatible. Mark the pairs that cannot coexist in a sensible solution (technical conflict, contradiction, mutual exclusion). This is "inference by exclusion": it is what collapses a huge raw space to a small viable residual.
5. **Derive the internally consistent configurations.** Keep only the configurations (one value per parameter) that contain no incompatible pair. These are the surviving, internally consistent candidates - the residual set worth examining. Note the rough before/after size to show the pruning did real work.
6. **Sanity-check coverage and the axes.** Confirm the parameters are still independent and that the surviving set includes the unobvious corners, not just the familiar combination you started from. If the field merely reproduces the preferred solution, the axes are probably arbitrary - say so and reselect.
7. **Hand off, do not rank.** Present the consistent configurations as the candidate set for a separate evaluation step (for example `think-decision-option-review`). Do not score them by value here; the box generates and prunes for consistency, it does not choose.
8. **Emit the morphological field artifact** per `references/TEMPLATE.md`: the parameters and their values (the box), the cross-consistency judgments, and the pruned set of internally consistent configurations.

## Output Format

Use the template in `references/TEMPLATE.md`. The deliverable is the filled morphological field - the parameter-by-value box, the cross-consistency assessment (which value pairs are incompatible), and the pruned set of internally consistent configurations - not a prose essay. Do not rank the configurations by value; that is a separate downstream step.

## Quality Checklist

Before finalizing, verify:

- [ ] The focal problem is stated in one line, and the answer genuinely is a configuration (not a single insight, reframe, or number forced onto axes).
- [ ] The parameters are few (typically 3-6) and genuinely independent - not a sprawling list added to feel thorough, and not arbitrary axes that merely justify a preferred solution.
- [ ] Each parameter's values are discrete, meaningfully distinct, and reasonably exhaustive for that dimension.
- [ ] A real cross-consistency assessment was run: value pairs across parameters are judged compatible or incompatible, with the incompatible pairs named.
- [ ] The pruned set contains only internally consistent configurations, and the rough before/after size shows the pruning did real work.
- [ ] The surviving set surfaces unobvious corners, not just the familiar starting combination.
- [ ] The configurations are handed off as candidates, NOT ranked by value here (scoring is `think-decision-option-review`, downstream).
- [ ] The output is the morphological field artifact, not prose.
- [ ] No overclaiming: the evidence is practitioner-grade and transferred; claim a coverage-and-consistency aid, not a measured gain in solution quality, and remember the coverage promise is often only partly realized in practice (see `evidence/dossier.md`).

## Evidence

Tier **P** (governing). Morphological analysis is a real, named, long-lived method with a clear lineage (Zwicky 1969; Ritchey from 1998) and a large descriptive base - Alvarez and Ritchey (2015) catalogue roughly 80 published applications across engineering design, technology forecasting, and policy. Unusually for this library, controlled experiments DO exist, yet they hold the grade at P rather than lift it, for three reasons. First, they measure a lighter sibling, the morphological CHART, without Ritchey's cross-consistency step. Second, the headline results are mixed-to-unflattering: the strongest comparison (Daly, Seifert, Yilmaz and Gonzalez, 2016, n = 102 students) found the method raised concept ELABORATION but was beaten on practicality by design heuristics and on quantity by plain brainstorming, and Smith, Troy and Summers (2012) found adding chart functions did not improve concept quality and that designers explored only about a quarter to a seventh of the space - so the "complete coverage" promise is largely unrealized in use. Third, every study is on human design students or practitioners; none studies an AI-produced field. The strong "90-99% reduction" descriptions come from Ritchey's own methodological writing, not from controlled validation, and Zwicky's "100x brain efficiency" / "philosopher's stone" claims are excluded as self-promotion. The transfer caveat is double - human-to-agent AND chart-to-full-GMA - which is exactly why the honest grade is held at P. The skill ships as a coverage-and-consistency aid with a hard "the parameterization is only as good as the analyst, and the box is not the evaluator" wall, never as a guaranteed exhaustive search or a decision-quality booster. Full grading, sources, and caveats: `evidence/dossier.md`.

## Examples

See `references/EXAMPLE.md` for a completed morphological field on a real decision.
