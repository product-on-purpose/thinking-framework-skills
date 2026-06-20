# Eval cases: think-five-whys

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. think-five-whys is a contested lens: explicit-request-only, caveat-first. It should fire only when Five Whys is asked for by name, never as the default move for a generic root-cause or "why did this break" prompt.

## Should trigger

- "Run a Five Whys on why our nightly export failed."
- "Can you do a 5 whys for this production incident?"
- "I want a Five Whys analysis of why the deploy broke staging."
- "Walk me through the five whys for this customer complaint."
- "Do a 5-whys on why the build keeps timing out, but tell me where it's weak."
- "My team uses Five Whys in retros - run one on last sprint's missed deadline."

## Should NOT trigger (wrong tool / near-miss)

- "Help me figure out the root cause of our churn." (likely multi-causal; the dominant move is branching decomposition, route to think-issue-tree, not a single chain)
- "Why might this outage have happened? There could be several reasons." (explicitly multi-cause; route to think-issue-tree)
- "What could go wrong with this launch?" (risk surfacing, not root-cause tracing; route to think-red-team-light)
- "Break this problem into a clean tree of sub-questions." (route to think-issue-tree)
- "Map the possible reasons our experiment was flat." (branching cause exploration; route to think-issue-tree)
- "Summarize the causes already listed in this incident doc into a table." (summarization, not analysis)

## Output checks (a good output must)

- [ ] Leads with the evidence caveat (Card 2017, the single-chain method oversimplifies multi-causal problems) before the chain; does not overclaim the method's value.
- [ ] Flag every step `[single cause]` or `[branch]`.
- [ ] If any step is `[branch]` or the failure is socio-technical, say so and redirect to think-issue-tree rather than presenting the chain as the cause.
- [ ] Terminate at a cause you could act on, not a convenient symptom.
- [ ] Aim one countermeasure at the terminal node, not the original symptom.
- [ ] Invent no quantified claim about Five Whys' effectiveness.

## Value vs unaided baseline

Asked for "a Five Whys," a strong model produces exactly the artifact the critical literature condemns: a confident single chain ending in one "root cause," with the other contributing causes silently discarded and, in socio-technical cases, a terminus that quietly blames a person. This skill refuses that default. It leads with the deficiency (Card 2017), flags at every step whether more than one cause could apply, and stops to redirect to think-issue-tree the moment the problem branches or turns socio-technical, so an explicitly-requested Five Whys becomes an honest, bounded artifact instead of a single-cause answer to a many-cause problem.
