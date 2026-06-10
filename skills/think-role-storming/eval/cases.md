# Eval cases: think-role-storming

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "Our brainstorm keeps circling the same three obvious ideas and the junior folks clearly aren't saying what they're really thinking. Let's generate by pretending to be other people - a kid, a rival, an outsider - and see what comes out."
- "I'm stuck in the standard framing for this feature. Generate ideas as if you were an eccentric inventor, a street artist, and a curious ten-year-old, and tag which persona produced what."
- "Give me a wild, divergent pile of ways we could grow this product - generate them in character as different unconventional personas, not as a sensible analyst. We'll narrow it down afterwards."
- "The room self-censors anything that sounds unserious. Use role-storming: pick a few uninhibited personas, generate ideas in their voice, and attribute each idea to its persona so we can see where the fresh stuff came from."
- "How would a guerrilla growth hacker, a community organizer, and a sci-fi novelist each approach getting people to adopt our free tier? Generate their ideas separately and keep them tagged."
- "We need fresh associations, not more of our own. Inhabit some deliberately foreign identities and produce a persona-tagged idea list we can take into a convergence step."

## Should NOT trigger (wrong tool / near-miss)

- "We've got one free-tier proposal on the table - evaluate it thoroughly through different angles (facts, upside, risk, alternatives) and give me a balanced read." (this is appraisal of a single decision through fixed functional lenses, which is `think-parallel-perspectives-review`; role-storming generates a creative pile, it does not produce a judgment.)
- "I want someone to genuinely poke holes in this plan and surface real objections, not pretend-argue against it." (genuine challenge is `think-authentic-dissent`; a persona arguing against the plan is role-played opposition, which underperforms authentic dissent and can harden the original view - do not role-storm for dissent.)
- "Generate ideas by systematically substituting, combining, adapting, and reversing parts of our current onboarding flow." (that is the seven-transformation engine of `think-scamper` applied to a seed, not identity-adoption.)
- "Take our foundational assumption that the free tier must be a capped version of the paid product and flip it - what if the opposite were true?" (negating a foundational premise is `think-assumption-reversal`, a different generation engine.)
- "Have everyone write ideas down silently and in parallel so the loud voices don't dominate, then pool them." (silent parallel written generation is `think-brainwriting`; role-storming changes WHO is generating, not the channel.)
- "Now take these forty raw ideas and score them on impact and effort so we can pick the top few." (ranking and down-selecting is convergence - hand the role-storming pool to `think-decision-option-review`; the role-storming artifact itself never ranks.)

## Output checks (a good output must)

- [ ] State the generative question in one line, and confirm the block is self-consciousness or a fixated frame, not missing knowledge, with a named downstream convergence step.
- [ ] Use **3-5 personas, each uninhibited or deliberately foreign**; no inhibited or narrowing persona (cautious auditor, risk-averse executive, rigid bureaucrat) is used to generate.
- [ ] Give each persona a one-phrase rationale for why it is expected to free or shift thinking.
- [ ] **Tag every idea** with the persona that produced it, so the distancing is auditable.
- [ ] Keep ideas as concrete candidates, not complaints or stereotype performances; show that a caricature sweep was done.
- [ ] Stay **divergent** - no ranking, scoring, or down-selecting inside the artifact - and name the convergence hand-off.
- [ ] NOT frame the output as an evaluation of a decision (`think-parallel-perspectives-review`) or as genuine challenge (`think-authentic-dissent`).
- [ ] Not overclaim: keep to a practitioner-grade, transferred-evidence generation aid; claim more and more-varied candidates, not a measured gain in idea quality, and never cite the creative-stereotype effect sizes as role-storming's own.

## Value vs unaided baseline

Asked the same question, a strong model tends to produce a single sensible list of ideas in its own default "helpful analyst" voice - competent, on-frame, and quietly self-censored toward the respectable and the obvious. If asked to "use personas," it often narrates them shallowly (a paragraph each) or lets them collapse into caricature, and - crucially - it does not enforce the one boundary the evidence actually establishes: that an INHIBITED persona ("a cautious auditor") backfires and lowers idea output below baseline. This skill forces the discipline: a persona gate that mandates uninhibited or deliberately-foreign identities and forbids narrowing ones, generation held in each standpoint past the first obvious idea, every idea tagged to its persona so the distancing is auditable, a caricature sweep, and a hard refusal to rank or evaluate inside the artifact (with evaluation routed to `think-parallel-perspectives-review` and genuine challenge to `think-authentic-dissent`). It converts a single on-frame idea list into a wider, attributed, deliberately off-default divergent pool - while being honest that the evidence for the move is practitioner-grade, transferred from human subjects, and untested for an AI agent.
