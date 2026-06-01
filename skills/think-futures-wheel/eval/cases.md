# Eval cases: think-futures-wheel

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (deferred to the Silver climb); check by hand or wire in later.

## Should trigger

- "We're about to launch a self-serve free tier. Map out the knock-on effects this could have over time across the business."
- "I want to move the whole team to a 4-day work week. Trace the first, second, and third-order consequences so we don't get blindsided."
- "My analysis of deprecating the legacy API just says 'fewer support tickets, good.' That's too shallow - push past the first-order view to the ripple effects."
- "Give me a quick second-order-effects pass on unlimited PTO - what happens, and then what happens after that?"
- "We're considering acquiring a competitor. Walk the cross-domain ripples - technical, financial, team, competitive - radiating out."
- "Build me a consequence map for switching pricing from seat-based to usage-based."

## Should NOT trigger (wrong tool / near-miss)

- "The free-tier launch went sideways last quarter. Run a postmortem on what broke and why." (after the fact)
- "Should we launch the free tier or not? I've seen the trade-offs - just make the call." (decision)
- "Summarize this 10-page strategy doc into a paragraph." (summarization)
- "Our deploy script needs to delete a temp file after the build. Write the bash - single linear step, no side effects." (no higher-order effects)
- "Brainstorm catchy names for our free tier." (ideation)
- "Forecast next quarter's MRR with a probability range for the board deck." (near-miss: forecasting/probabilities, not a consequence map)

## Output checks (a good output must)

- [ ] Be a nested consequence map artifact (center, then first/second/third-order branches), not prose.
- [ ] Reach at least second order; not stop at first-order consequences.
- [ ] Span multiple domains at first order (technical, financial, customer, team, competitive), not just the obvious one.
- [ ] Flag high-impact or non-obvious branches, each with a short "watch or do about it" note.
- [ ] Prune trivial branches rather than padding to irrelevance.
- [ ] Frame branches as possible ripples to watch, not predictions or probabilities.

## Value vs unaided baseline

Asked the same question, a frontier model tends to answer at first order and stop, or list flat consequences without the disciplined "and then what?" expansion across orders. This skill forces the multi-order structure, cross-domain spread at first order, and explicit flagging of non-obvious downstream branches with response notes - while honestly framing them as speculative ripples to watch, not predictions (its evidence is transferred foresight practice, not validated forecast accuracy).
