# Eval cases: think-decision-journal

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred to the Silver climb); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "We're committing to the self-serve free-tier launch today. Before we pull the trigger, I want to write down exactly what we expect and how confident we are, so we can judge it honestly in Q4."
- "I'm about to make the offer to this VP of Sales candidate. Capture my reasoning and my prediction now so I don't kid myself later about what I knew going in."
- "Record this decision: we're betting on the in-house build over the vendor. I want my confidence level and assumptions on the record before we find out."
- "Help me log this investment decision at the moment I make it - the call, why, what I think happens, and how sure I am - so I can review it against reality later."
- "We keep rewriting history after the fact. I want a contemporaneous record of this strategic bet, with a confidence number and a review date."
- "I want to start getting better-calibrated on these big calls. Set up an entry for today's decision that I can score later."

## Should NOT trigger (wrong tool / near-miss)

- "The free-tier launch happened last quarter and the results are in. Help me write up what we expected versus what actually happened and what to change." (near-miss: the outcome is already known - that is an after-action review, `think-after-action-review`; a "journal entry" written now would back-fit the prediction)
- "Should I rename my staging environment? One-line config change I can revert anytime." (trivial / fully reversible - not worth a journal entry)
- "What would have to be true for the in-house build to be the right call?" (near-miss: that is `think-what-would-have-to-be-true`, which surfaces conditions; the journal captures the whole decision plus a predicted outcome and confidence)
- "Stress-test this launch plan by imagining it has already failed and list the risks." (that is a premortem, a risk tool, not a contemporaneous decision record)
- "This decision is already locked by contract; just note it for the file." (no honest prediction or confidence to record - nothing to calibrate against)
- "Write a project status update summarizing what the team shipped this sprint." (unrelated)

## Output checks (a good output must)

- [ ] Be dated and written before the outcome is known (a contemporaneous record, not a back-fitted one after the result).
- [ ] State a concrete predicted outcome tied to a stated date.
- [ ] Include an explicit confidence as a percentage or band, so the prediction can be scored later.
- [ ] Name the specific assumptions the decision rests on, not leave them implicit.
- [ ] Set a review date and the signals to check then, so the entry is actually reviewable (ideally pairing with an after-action review).
- [ ] Deliver the decision-journal-entry artifact (header, rationale, options not taken, prediction, assumptions, review), not prose, and not claim journaling made the decision turn out better.

## Value vs unaided baseline

Unprompted, a strong model will discuss the decision and may list pros and cons, but it rarely fixes an explicit confidence number, names the assumptions as checkable items, or sets a review date - the three things that make a record calibratable later. It also tends to blur into either advising the decision or, if asked after the fact, quietly back-fitting what "we expected." This skill enforces contemporaneous capture (dated, before the outcome), a stated confidence and named assumptions, and a concrete review date that pairs with an after-action review, while holding the honest caveat that the entry enables honest review and calibration rather than guaranteeing a better outcome.
