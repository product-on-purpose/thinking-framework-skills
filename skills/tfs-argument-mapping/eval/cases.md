# Eval cases: tfs-argument-mapping

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (deferred to the Silver climb); check by hand or wire in later.

## Should trigger

- "This board memo argues we should shut the on-prem line. The logic sounds airtight - map it out and tell me if it actually holds."
- "Evaluate the soundness of this recommendation: I want the reasons, the hidden assumptions, and the objections laid out."
- "Map the argument in your own last answer - what unstated premises is it resting on?"
- "Our VP made a fluent case for doubling the sales team. Break the argument into its structure and flag the weak links."
- "Here's the case for the acquisition. Show me the co-premises each reason depends on and whether the conclusion follows."
- "I want to see the logical skeleton of this strategy doc - claim, supporting reasons, and the objections it never addresses."

## Should NOT trigger (wrong tool / near-miss)

- "Is this pitch persuasive enough to win the deal? Make it more convincing." (rhetoric/persuasion, not logical structure)
- "Sort the claims in this memo into evidence vs inference." (near-miss: evidence-vs-inference-sort classifies claim type; this maps inferential structure)
- "Give me three arguments for adopting Postgres." (generating arguments, not analyzing one)
- "Reframe this problem for me before we solve it." (problem-restatement)
- "The claim is just that 2+2=4 - confirm it." (no argumentative structure)
- "Summarize this debate into three bullets." (summarization)

## Output checks (a good output must)

- [ ] State a single contention at the top.
- [ ] Give each reason its explicit co-premise(s), not leave them unstated.
- [ ] Include objections and rebuttals, not only supporting reasons.
- [ ] Flag the weakest links and the load-bearing unsupported premises.
- [ ] Distinguish valid structure from true premises (not claim soundness from structure alone).
- [ ] Be the argument-map artifact (structured tree + weak-links table + verdict), not prose.

## Value vs unaided baseline

Asked to "assess this argument," a strong model writes a fluent prose critique that mirrors the original's smooth structure and rarely surfaces the unstated co-premises a conclusion silently needs. This skill forces externalizing contention, co-premises, and objections as a tree so a broken inference and a load-bearing-but-unsupported premise become visible - and holds the boundary that valid structure is not a true conclusion. (Per the dossier, the S-tier effect is for sustained practice, not a one-shot map.)
