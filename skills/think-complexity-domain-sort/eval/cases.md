# Eval cases: think-complexity-domain-sort

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. think-complexity-domain-sort is a contested lens: explicit-request-only, caveat-first. It should fire only when this complexity sort (also known as Cynefin) is asked for by name, never as the default move for a generic "how should we approach this" prompt.

## Should trigger

- "Run a Complexity Domain Sort on whether we should plan this launch or experiment our way into it."
- "Do a Cynefin sort on our situation and tell me which domain each part is in."
- "Sort this problem into Clear, Complicated, Complex, or Chaotic and tell me the response posture."
- "Use the complexity domain sort to figure out if this is something to analyze or something to probe."
- "My team keeps planning everything like it's known. Run a Cynefin sense-making sort and show where we're wrong."
- "Give me a complexity domain sort of this initiative, and say what to actually do in each domain."

## Should NOT trigger (wrong tool / near-miss)

- "Break down the causes of our churn into a clean tree." (cause decomposition; route to think-issue-tree, not a domain sort)
- "Map out the possible futures for our market over the next three years." (divergent external futures; route to think-scenario-planning)
- "Compare these three vendors on cost, risk, and fit and pick one." (option scoring under criteria; route to think-decision-option-review)
- "Help me think through whether to launch a free tier." (generic strategy; the dominant move is decomposition, route to think-issue-tree)
- "What could go wrong if we ship this?" (risk surfacing, not problem-type triage; route to think-red-team-light)
- "Summarize how complex our different projects are into a table." (summarization, not a sense-making sort)

## Output checks (a good output must)

- [ ] Leads with the evidence caveat (tier C, "scientific proof of its validity has yet to be provided," 2021, and the Cynefin / The Cynefin Co. attribution) before the artifact; does not overclaim the method's value.
- [ ] Place the situation (and parts that differ) into the five domains as a stated judgment, not a found fact.
- [ ] Carry the response posture for each domain used (sense-categorize-respond, sense-analyze-respond, probe-sense-respond, act-sense-respond).
- [ ] Name the comfort-zone default the team would wrongly fall back to (the Confusion trap).
- [ ] End every domain used in a concrete next action, not just the label (the cargo-cult guard).
- [ ] Invent no quantified claim about the method's effectiveness.

## Value vs unaided baseline

Asked to "sort this with Cynefin," a strong model tends to produce exactly the failure the critics name: a confident set of labels ("this is complex, this is complicated") that is satisfying to read and changes nothing, presented as if the placement were a measured fact. This skill refuses that default. It leads with the conceptual-evidence caveat and the trademark attribution, frames each placement as a contested judgment rather than a finding, parks what it cannot place in Confusion instead of forcing a box, names the comfort-zone default as the trap, and turns every domain into a concrete next action - the experiment to run, the expert to consult, the standard to apply. So an explicitly-requested sort becomes an honest, decision-useful artifact instead of a pleasant-sounding label dump.
