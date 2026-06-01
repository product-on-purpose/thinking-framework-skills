# Eval cases: think-premortem

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred to the Silver climb); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "We're two weeks out from launching the new billing system and everyone seems weirdly confident. Can we stress-test this before we ship?"
- "I'm about to sign off on hiring this VP of Sales. Before I make the offer, walk me through what could blow up."
- "We've picked the cloud vendor and migration kicks off Monday. I want the risks surfaced with concrete warning signs and a point where we'd pull the plug."
- "Imagine it's six months from now and this product investment has totally failed. Why did it fail, and what should we watch for?"
- "We chose to rebuild the checkout flow in-house. This is the last gate before we commit budget. Run a premortem."
- "I have a nagging feeling about this acquisition but nobody will say anything. Help me get the unspoken concerns on the table with owners and kill criteria."

## Should NOT trigger (wrong tool / near-miss)

- "The migration shipped last quarter and it went badly. Help me run a postmortem." (near-miss: after the fact, not before)
- "Should I rename my staging environment? One-line config change I can revert anytime." (trivial / reversible)
- "I need fresh ideas for features we could add next quarter. Brainstorm options." (ideation, not risk)
- "We have three vendors on the shortlist. Help me build a scorecard and pick the best one." (decision comparison)
- "We've already decided to go ahead; leadership just wants a risk doc for the board deck so it looks like due diligence." (theater; mitigations won't be acted on)
- "Write a project status update summarizing what the team shipped this sprint." (unrelated)

## Output checks (a good output must)

- [ ] Declare the failure in the definite past with a concrete, specific scenario anchored to a stated horizon (not "it underperformed").
- [ ] Include at least one people/political, process, second-order, or external cause, not only technical ones.
- [ ] Pair every high-priority cause with all four: a tripwire, a mitigation, a named owner, and a pre-decided kill criterion.
- [ ] Rank risks by likelihood and impact (each H/M/L), not a flat list.
- [ ] Deliver the risk-register artifact (ranked table + a short "top risks and what we will do" summary), not prose.
- [ ] Not promise a better decision/outcome; limit any claim to better-surfaced and better-handled risk.

## Value vs unaided baseline

Unprompted, a strong model produces a brainstormed list of risks but typically skips the mandatory conversion step, leaving causes without a paired tripwire, owner, and pre-decided kill criterion, and it tends to imply the exercise yields a better decision. This skill forces prospective-hindsight framing (definite past, concrete horizon), enforces the full four-element conversion into a ranked register, and holds the honest no-overclaim caveat.
