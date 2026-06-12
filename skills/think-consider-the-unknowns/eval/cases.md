# Eval cases: think-consider-the-unknowns

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "We're about to call this competitor a non-threat and proceed with our launch unchanged, but honestly the read is built on one funding rumor and a hunch. Before we commit, lay out the things we actually don't know that could change this and tell me how confident we should really be."
- "I'm 80% sure this market is too small to enter, but I've barely looked into it. Map what I'm missing - the variables I haven't observed - and re-rate that confidence against the gap."
- "We've got three data points on this vendor and they all point the same way, so the team feels sure. I'm worried we're confident because of what we looked at, not because the evidence is strong. List what we don't know that bears on this and what's worth finding out before we sign."
- "Make me a known-unknowns ledger for this hiring decision - the file is thin and I want to see which gaps are worth closing before I commit and which I just have to live with."
- "This diagnosis is built from incomplete data and there's no clean base rate to lean on. Surface the absent evidence that would move the call, flag what's resolvable, and tell me how much that should lower my confidence."
- "Our whole go-decision rests on a competitive read we can't really verify. Don't argue for or against it - just enumerate what we don't know that matters and recalibrate how sure we are."

## Should NOT trigger (wrong tool / near-miss)

- "There's a clean base rate here - most B2B free-tier startups like this fail within two years. Just give me the outside-view number for our forecast." (a genuine reference class exists; base rates beat introspective gap-mapping - this is `think-reference-class-forecasting`, not an unknowns ledger.)
- "My estimate is 40 to 60 thousand users in year one - help me set the right width on that range so I'm not overprecise." (this is interval-width repair, which the controlled evidence shows reasoning prompts do NOT fix; route to mechanical widening / calibration training, not this move. The skill must decline rather than dress itself up as interval medicine.)
- "I don't know our current churn rate - can you just pull it from the dashboard?" (the unknown is cheap to just resolve; go get the information, do not catalog a resolvable fact in a ledger.)
- "Build the strongest possible case that this competitor IS a real threat to us." (generating the strongest KNOWN counter-case is `think-red-team-light`; this skill enumerates the absent, it does not argue the present.)
- "We're leaning toward proceeding unchanged - test the conditions that would have to hold for that to be the right call." (backward-chaining a favored option into its required truth conditions is `think-what-would-have-to-be-true`, not an inventory of absent evidence.)
- "Assume the launch has already failed a year from now and work backward to what caused it." (imagining one specified failure and reasoning to its causes is `think-premortem`; an unknown is an unobserved variable, not an imagined outcome.)
- "Summarize what the team shipped this quarter for the board update." (unrelated.)

## Output checks (a good output must)

- [ ] State the **judgment under consideration and its original confidence** in one line.
- [ ] Run the **wall check**: confirm no real reference class, not an interval-width task, unknowns not cheap to just resolve, judge not already calibrated or underconfident, decision not low-stakes-reversible - and redirect or stop if a wall applies instead of producing a ledger anyway.
- [ ] List **relevant ABSENT unknowns** - variables not in hand that bear on the call - not a restatement of claims already present or counterarguments already known.
- [ ] Give each unknown a **bearing rating** (how much it would move the call) AND an **obtainability classification** (resolvable at what cost / genuinely unobservable).
- [ ] Flag the **high-bearing resolvable unknowns** as the resolve-before-committing list, and name the irreducible (high-bearing but unobservable) ones separately.
- [ ] **Re-rate confidence with an explicit delta and the reason for its size**, accepting a small or zero delta as a valid selective result rather than forcing the number down.
- [ ] Deliver the **known-unknowns ledger artifact**, not prose.
- [ ] **Not overclaim**: ship the evidence caveat with the ledger - the evidence is moderate (M) and transferred from human studies, the move is a selective calibration aid not a measured decision-outcome improver, and it is explicitly NOT interval-width repair.

## Value vs unaided baseline

Asked the same question, a strong model tends to either defend or attack the judgment - marshaling the evidence and arguments already on the table - or to hedge with a vague "there's a lot we don't know here" that names no specific variable and changes no specific confidence. It rarely turns attention deliberately onto the ABSENT evidence: the particular variables outside the material in front of it that would move the call, each rated by how much it matters and whether it can be obtained. This skill forces that discipline: a real enumeration of relevant unknowns, a bearing-and-obtainability rating on each, a clean split between the gaps worth closing now and the irreducible ones, and an honest re-rate of confidence against the mapped gap - selectively, so a confidence that already absorbed the gap is left alone. It converts a story-driven confidence into a confidence justified by what is known AND a named account of what is not, with the evidence caveat attached so the re-rated number is read as more honest, not as proven-more-accurate.
