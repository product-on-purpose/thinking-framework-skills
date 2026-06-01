# Eval cases: tfs-red-team-light

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (deferred to the Silver climb); check by hand or wire in later.

## Should trigger

- "Everyone agreed we should launch the free tier in Q3 and it felt too easy. Red team this and argue the strongest case against it before we commit."
- "I'm about to recommend we sunset the legacy API. Steelman the opposition first so I'm not walking into a wall I didn't see."
- "You just confidently told me microservices is the right call. Now build the best case against your own recommendation."
- "We have consensus that acquiring this startup is the move. Give me the strongest objections an intelligent skeptic would raise, ranked by how badly they'd hurt us if true."
- "Pressure-test this thesis: 'cutting prices 20% will win back enterprise.' I want the objections that actually land, not nitpicks."
- "Before I sign off, play devil's advocate properly - the strongest version - and tell me which objections are decisive versus survivable."

## Should NOT trigger (wrong tool / near-miss)

- "The free-tier launch flopped last quarter. Walk us through what went wrong and what we'd do differently." (postmortem)
- "We're committing to the roadmap and need buy-in. Help me write the announcement that aligns the team, not more debate." (alignment, not critique)
- "Give me a rounded view of this pricing decision from customer, sales, finance, and engineering angles." (near-miss: parallel perspectives, not single adversarial case)
- "Assume we launch and it fails 12 months from now; map all the ways it could go wrong over time." (premortem)
- "Just poke holes for fun - any objection, doesn't matter if real or strong." (performative contrarianism)
- "Summarize the attached strategy doc into three bullets." (summarization)

## Output checks (a good output must)

- [ ] Open by stating the thesis fairly in its strongest honest form, not a weakened version.
- [ ] Steelman the objections (strongest a motivated informed critic would raise), not strawmen.
- [ ] Rank objections by force (damage if true), not by ease, with the ranking explicit.
- [ ] For top objections, state how the thesis would have to answer each and whether it plausibly can.
- [ ] Give a verdict naming which objections are decisive vs survivable.
- [ ] Note whether a real, independent dissenting view should be sought for high stakes, acknowledging this is constructed/role-played dissent.
- [ ] Deliver the ranked-objections artifact, not free prose.

## Value vs unaided baseline

Asked to "critique this," a frontier model tends toward sycophantic, easy objections and stops at listing concerns. The skill forces a genuinely adversarial steelman ranked by force with a decisive-vs-survivable verdict, and critically surfaces the Nemeth honesty flag - that this is constructed dissent that does not replicate authentic dissent - telling the user to seek a real dissenter for high-stakes/one-way-door calls, a limit an unaided model presenting its own critique as sufficient would not flag.
