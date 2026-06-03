# Eval cases: think-belief-update-routine

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. The static
> validator (SP1) checks these are well-formed and name-safe; the behavioral cases are judged by the
> invoking model. These are also the cases to check by hand.

## Should trigger

- "It's our quarterly review. Here are the five open bets we made last quarter with our confidence levels - help me re-score each one against what's actually happened since, with how much I moved and why."
- "I keep holding the same beliefs about this market even as the data shifts. Set up a recurring belief-update ledger so I revise them on the evidence instead of letting them go stale."
- "Re-score these forecasts: I had them at 70 / 40 / 55 percent a month ago. New evidence has come in on two of them. Show the deltas and flag whether I'm under-updating."
- "Every month I want to revisit my key strategic assumptions and explicitly mark how my confidence changed and what drove it - not a retro of finished work, an update of still-open beliefs."
- "I suspect I'm anchoring on my original estimate. Walk my open predictions through a disciplined update with an explicit confidence change and a check that each move is big enough for the evidence."
- "Reopen last cycle's belief ledger and run the next review: for each belief, the evidence since, the new confidence, the delta, and the next trigger."

## Should NOT trigger (wrong tool / near-miss)

- "We're committing to the free-tier launch today - capture my prediction, confidence, and assumptions now so I can't kid myself later about what I knew." (near-miss: that is `think-decision-journal`, which fixes one prediction at commit time and forbids editing it; belief-update deliberately re-scores a portfolio over time)
- "The launch happened last quarter and the results are in - help me write up expected vs actual and what to change." (near-miss: the outcome is resolved - that is `think-after-action-review`, which emits process actions; belief-update operates on beliefs that are still open)
- "What would have to be true for the in-house build to be the right call?" (near-miss: that is `think-what-would-have-to-be-true`, which decomposes one claim's conditions at one sitting, not a cadenced re-score of a belief portfolio)
- "It's the monthly belief review but genuinely nothing new has happened on any of them." (no material new evidence - re-scoring would be reflection theater; the honest output is "no new evidence, no update," not invented deltas)
- "Track my belief about whether pineapple belongs on pizza." (trivial, never-resolving, no stakes - no calibration or decision value)
- "Summarize what the team shipped this sprint." (unrelated)

## Output checks (a good output must)

- [ ] List each tracked belief as a concrete one-line claim with a prior confidence (percentage or band) and a date.
- [ ] Give the evidence accrued since the last review per belief, dated and sorted for/against - or state "no material new evidence."
- [ ] State an explicit **delta and direction** for each revised confidence (for example "65% -> 50%, down 15"), not just a new number.
- [ ] Justify the **size** of each non-trivial move against the evidence and apply the under-updating guard (is the move large enough?).
- [ ] Treat "no change" as legitimate only when no new evidence arrived (not unexamined stickiness).
- [ ] Set a next-review trigger (a date or a forcing signal) per belief.
- [ ] Deliver the belief-update-ledger artifact (header + portfolio table + per-belief detail), not prose, and not claim a measured accuracy gain.

## Value vs unaided baseline

Unprompted, a strong model asked "how are my predictions looking?" will narrate each belief and may give updated numbers, but it rarely states the delta and direction explicitly, almost never justifies the *size* of the move or flags under-updating, and tends to manufacture small confirming bumps even where no new evidence arrived (reflection theater) rather than recording an honest "no change." It also blurs the three near-neighbors: it will happily "journal" a one-off decision, "review" a still-open belief as if resolved, or slide into a what-would-have-to-be-true condition analysis. This skill enforces the portfolio re-score shape (prior, dated evidence, revised confidence with an explicit delta, a sized-justified move with the conservatism guard, a next trigger), holds the three hard walls against decision-journal / after-action-review / what-would-have-to-be-true, and keeps the honest caveat that the ledger surfaces under-updating and enables calibration over time rather than guaranteeing more accurate beliefs.
