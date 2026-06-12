# Eval cases: think-speculative-harms-anti-goals

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "Our new location-sharing feature is going to be a hit. Before we ship it, walk through the dystopian near-future where it works perfectly and still hurts people - including people who never installed it - and turn each harm into a hard constraint on what we will never build."
- "Assume our recommendation engine succeeds and reaches everyone. Who does that success harm, and who would exploit it on purpose? Give me the bad actors by name and convert each scenario into an anti-goal we commit to."
- "We've run a premortem on whether the launch fails. Now I want the opposite: assume it succeeds at scale and find who outside our customer base gets hurt, and who weaponizes it. Produce the list of things the product must never do."
- "Do a Black Mirror brainstorm on this data-inference feature - the stalker, the data broker, the abusive ex - and give me anti-goals we can put into the requirements."
- "This open-signup free tier could be abused. Narrate the worst-case misuse by bad-faith actors, name who is harmed, and bind each harm to a standing design constraint with a place it lives in the spec."
- "Our risk review only ever looks at whether the project survives. Nobody has asked who outside the customer relationship gets hurt if this targeting feature works as designed. Run that analysis and convert it into design constraints."

## Should NOT trigger (wrong tool / near-miss)

- "Assume this launch has already failed two years out - work backward to everything that could have caused it." (imagining the *plan's* failure and reasoning to its causes is `think-premortem`; this method assumes success and finds who that success harms. Plan-survival risk routes to the premortem.)
- "Users are already reporting that our sharing feature is being used to harass them. Help me figure out what went wrong and how to fix it." (the harm is present and documented, so the job is incident analysis and remediation, not speculation. Speculative harms is for harms that have not happened yet; running fiction here wastes effort and risks centering imagined futures over the real present harm.)
- "We need a complete threat model of the attack surface on this API before the security review." (complete adversarial coverage is a structured threat-modeling job; narrative speculation is an elicitation device, not an enumeration guarantee, and a structured decomposition finds more threats - Opdahl and Sindre 2009. Use structured threat modeling.)
- "Should the upgrade button be blue or green?" (trivial, fully reversible decision; the method will manufacture dystopian gravity for a button color. A two-way-door triage belongs upstream.)
- "We need an algorithmic impact assessment to file with the regulator." (a compliance or assurance artifact is governance process work, not a thinking move, and belongs to a governance toolkit, not this library.)
- "Trace the first, second, and third-order consequences of launching the free tier on our own org - support load, MRR, comp." (one neutral consequence map radiating from one decision is `think-futures-wheel`; it has no success anchor, no third-party victim cast, no misuse actor, and no conversion to design constraints.)
- "Summarize what the team shipped this quarter for the board update." (unrelated.)

## Output checks (a good output must)

- [ ] State the **focal design and the success anchor** in one line, and narrate harms that coexist with success - not ways the plan fails.
- [ ] Narrate at least one harm as a concrete **near-future scene**, not an abstraction, and keep the narration near-future rather than cinematically far-fetched.
- [ ] Name the **harmed parties**, with explicit attention to **non-users** (people who never chose to use the product).
- [ ] Ask the **misuse-actor question** for the adversarial harms: who exploits this in bad faith, named, and by what concrete pathway.
- [ ] Convert **every speculated harm into an anti-goal** - a standing constraint on what the product must never do, enable, or optimize for - not into a mitigation, tripwire, or kill criterion.
- [ ] Give every anti-goal a **design implication** (requirement, acceptance criterion, default, or review gate) and a **stated home** in the requirements (the binding line) - the register is bound, not theater.
- [ ] Deliver the **anti-goals register artifact**, not prose and not a ranked risk list.
- [ ] **Not overclaim / no missing caveat:** the artifact carries the evidence caveat (tier A, anecdotal, transferred from human studies); it claims a harm-elicitation aid that forces a discipline, never a measured improvement in harm anticipation and never a complete-coverage or security guarantee.

## Value vs unaided baseline

Asked the same question, a strong model tends to do a generic "what could go wrong" risk list that quietly stays project-centric (will it fail, will it be slow, will it lose money) and stops at the harms the team can already see. If pushed toward ethics it produces abstract principles ("respect privacy", "be fair") that do not bite, or a failure analysis that is really a premortem in disguise. It rarely *anchors on success* (the harms that arrive precisely because the product works at scale), rarely casts **non-users and named bad-faith actors** (the stalker, the data broker, the abusive ex, the authoritarian buyer), and almost never converts each harm into a **standing design constraint bound into the requirements** rather than a monitoring control. This skill forces that discipline: the success anchor, a concrete near-future narrative, the explicit misuse-actor question, the harmed-non-users cast, the conversion of each harm into an anti-goal, and a binding line that puts each anti-goal somewhere in the spec. It also enforces the honest grade - an anecdotal-tier elicitation aid, transferred from human studies, with a hard wall against being mistaken for a premortem, an incident analysis, or a security threat model. The win is a bound set of design refusals the team would not otherwise have written down, not a count of harms found.
</content>
