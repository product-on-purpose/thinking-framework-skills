# Eval cases: think-morphological-analysis

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "Our pricing-and-packaging design keeps defaulting to the same shape. Lay out the whole space - what we gate, how we convert, how we support, where users land - as a parameter grid, strike the combinations that can't coexist, and show me the consistent options."
- "I want to map the full design space for this new device: power source, drive mechanism, control type, housing. Build the Zwicky box, then prune to the internally consistent configurations so we see the corners we'd otherwise miss."
- "Treat the policy package as a configuration across several independent dimensions, enumerate the combinations, and rule out the internally contradictory ones - I don't want a single recommendation yet, just the viable space."
- "Decompose this product architecture into its independent parameters and their possible values, give me the cross-product, then run a cross-consistency pass to cut the incompatible pairs."
- "We always reach for the same go-to-market shape. Build a morphological field of channel x motion x pricing x onboarding, prune for consistency, and surface the unobvious-but-coherent combinations."
- "Give me the full space of service-bundle configurations as a box of parameters by values, and the consistency-pruned set of bundles that actually hang together - scoring comes later."

## Should NOT trigger (wrong tool / near-miss)

- "What if we flipped our core assumption that the free tier must be seat-limited? Negate our foundational premises and provoke some fresh offer ideas." (premise negation to provoke a fresh option list is `think-assumption-reversal`, not a decomposed-and-pruned combinatorial field; morphological analysis negates nothing.)
- "Take our current onboarding flow and run it through substitute / combine / adapt / modify to spin out variations." (applying fixed transformation verbs to one seed idea is `think-scamper`; there is no decomposition into orthogonal axes and no cross-product.)
- "Look at how ant colonies route foragers and use that as inspiration for our notification system." (importing the deep structure of a distant domain by analogy is `think-far-analogy-ideation`; morphological analysis uses no analogy, only the problem's own parameters.)
- "Break 'why is self-serve conversion low?' into a MECE tree of causes I can read top-down and drill into." (decomposing one question into a mutually-exclusive, collectively-exhaustive hierarchy is `think-issue-tree`; a tree never multiplies its branches together or runs a cross-consistency pass.)
- "We've already got our six candidate offer configurations - score them against conversion, support cost, and time-to-value, and tell me which to pick." (scoring given options against weighted criteria to choose one is `think-decision-option-review`, which runs AFTER the box; morphological analysis generates and prunes for consistency, it does not rank by value.)
- "Just tell me the single best pricing model for us." (a non-configurational request for one answer; there is no space to map and prune. If the answer is a single choice, settle it directly or score candidates with `think-decision-option-review`.)

## Output checks (a good output must)

- [ ] State the focal problem in one line, and confirm the answer genuinely is a configuration (not a single insight, reframe, or number forced onto axes).
- [ ] Name a small set (typically 3-6) of **genuinely independent** parameters, each justified - not a sprawling list added to feel thorough, and not arbitrary axes that merely justify a preferred solution.
- [ ] Give each parameter discrete, meaningfully distinct, reasonably exhaustive **values** (the box), with the **raw cross-product count**.
- [ ] Run a real **cross-consistency assessment**: value pairs across parameters judged compatible or incompatible, with the incompatible pairs and reasons named.
- [ ] Produce the **pruned set of internally consistent configurations**, with a rough before/after size showing the pruning did real work, and call out at least one unobvious corner the default search would miss.
- [ ] Hand the survivors off as candidates - **no ranking by value** here (scoring is `think-decision-option-review`, downstream).
- [ ] Deliver the morphological field artifact, not prose.
- [ ] Not overclaim: keep to a coverage-and-consistency aid; the evidence is practitioner-grade and transferred (human design students, on the chart variant), the coverage promise is often only partly realized, and this is not a guaranteed exhaustive search or a decision-quality booster.

## Value vs unaided baseline

Asked the same question, a strong model tends to produce a handful of familiar option bundles - usually the obvious default and one or two near-variants - and then quietly slide into recommending one, which collapses generation and evaluation together. It rarely decomposes the problem into genuinely independent parameters, enumerates the full cross-product, and - crucially - runs an explicit cross-consistency pass that strikes the internally incompatible pairs to reveal the coherent corners no forward search would visit. This skill forces that discipline: a justified parameter decomposition, a complete value enumeration with the raw count, a real incompatibility pass (inference by exclusion), a pruned set of internally consistent configurations with the before/after size, and a hard refusal to rank the survivors by value. It converts "a few combinations we always reach for" into a mapped-and-pruned space of viable configurations, with the unobvious-but-coherent options made visible and handed off for separate scoring.
