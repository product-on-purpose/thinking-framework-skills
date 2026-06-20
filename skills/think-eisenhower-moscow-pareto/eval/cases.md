# Eval cases: think-eisenhower-moscow-pareto

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. think-eisenhower-moscow-pareto is a contested lens: explicit-request-only, caveat-first. It should fire only when an Eisenhower matrix, a MoSCoW list, or a Pareto chart is asked for by name, never as the default move for a generic prioritization prompt.

## Should trigger

- "Run an Eisenhower matrix on my task list for this week."
- "Sort these requirements into a MoSCoW list for the next release."
- "Give me a Pareto chart of which support tickets are driving most of our volume."
- "Do an urgent-important 2x2 on this backlog and tell me what to delegate."
- "Build a Must/Should/Could/Won't breakdown of our launch scope, but flag where it's weak."
- "Apply the 80-20 rule to our customer revenue and show me the vital few, honestly."

## Should NOT trigger (wrong tool / near-miss)

- "What's the one bottleneck capping our throughput right now?" (single binding constraint with the capacity-versus-demand test; route to think-theory-of-constraints, not a Pareto chart)
- "Help me focus our engineering effort on the few things that actually matter." (vital-few focus that needs the binding-constraint proof; route to think-theory-of-constraints)
- "Should we make this decision quickly or deliberate carefully?" (deliberation-level triage by reversibility and stakes; route to think-one-way-vs-two-way-door)
- "How much process does this hiring choice deserve before we commit?" (one-way vs two-way door triage; route to think-one-way-vs-two-way-door)
- "Compare these three vendors on cost, risk, and fit and rank them." (weighted-criteria comparison; route to think-decision-option-review)
- "Score our feature backlog against value and effort and tell me what to build." (multi-criteria scoring with named criteria; route to think-decision-option-review)

## Output checks (a good output must)

- [ ] Leads with the evidence caveat (tier P; Zhu, Yang and Hsee 2018 measures the urgency bias, not the matrix; Pareto is usually not 80-20) before the artifact; does not overclaim the method's value.
- [ ] Produce exactly one of the three presets (the one named), not a bundle of all three.
- [ ] Eisenhower: each item in one quadrant with a canned action; or MoSCoW: every Must justified against the timebox and ranked within the bucket (category inflation guarded); or Pareto: shares plus a cumulative total and a cut line, with the real measured concentration stated.
- [ ] Name the place the canned template hides the real driver and point to the rigorous shipped alternative (think-theory-of-constraints, think-one-way-vs-two-way-door, or think-decision-option-review).
- [ ] Invent no effectiveness number and assume no clean 80-20 split.

## Value vs unaided baseline

Asked for "a MoSCoW" or "an Eisenhower matrix," a strong model fills the famous template at face value: a four-bucket list where everything has crept into Must, or a 2x2 that treats urgent-vs-important as the analysis rather than a prompt, with no caveat and often a confidently asserted "80-20." This skill refuses that default. It leads with the deficiency (a bundle of three weakly-evidenced presets, with the strong Eisenhower study measuring the bias, not the cure), runs only the one preset asked for, guards its documented failure mode (category inflation, assumed-axes, false 80-20), names where the template stops doing work, and routes the binding cases to the rigorous shipped skill - so an explicitly-requested preset becomes an honest, decision-useful artifact instead of a famous template presented as analysis.
