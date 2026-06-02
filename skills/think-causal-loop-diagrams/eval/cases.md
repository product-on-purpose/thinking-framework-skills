# Eval cases: think-causal-loop-diagrams

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (deferred to the Silver climb); check by hand or wire in later.

## Should trigger

- "Our growth keeps accelerating then stalling out, over and over. Map why."
- "Every time we add support capacity, demand seems to swell to fill it again. What's the feedback here?"
- "Sales fund marketing and marketing drives sales - is this a self-reinforcing engine, and what limits it?"
- "Our quick fix for the bug backlog seems to be recreating the backlog. Is there a loop?"
- "Map the reinforcing and balancing loops behind our free-tier flywheel."
- "Why does our hiring overshoot and then we have to do layoffs - is this an oscillation?"

## Should NOT trigger (wrong tool / near-miss)

- "We cut churn in half - is our customer base actually growing?" (near-miss: stocks-and-flows - one accumulation, net flow, no loop or polarity)
- "What are the second- and third-order effects of launching a free tier?" (futures-wheel - acyclic, one-directional consequence tree)
- "What are the events, patterns, structures, and mental models behind our churn?" (iceberg-model - names feedback as one layer but does not close or sign loops)
- "Walk me through the steps from signing the contract to going live." (a linear/open chain - no feedback; forcing a loop would manufacture false feedback)
- "Where is the highest-leverage place to intervene in this system?" (leverage points - separate catalog row, out of scope)
- "Summarize our systems-thinking training for the team." (summarization)

## Output checks (a good output must)

- [ ] Identify genuinely **closed** loops (each returns to a variable it started from); mark open chains as linear rather than forcing them.
- [ ] Sign every link (+/-) and derive each loop's **R/B** label from the product of its signs.
- [ ] Mark delays where they exist (they drive oscillation/overshoot).
- [ ] State which loop **dominates** and the resulting dynamic (spiral / goal-seeking / oscillation).
- [ ] Frame the behavior read-out as a structured **argument**, not a prediction or forecast.
- [ ] Record the open/linear parts honestly; not manufacture a loop to fill the diagram.
- [ ] Be the signed causal loop diagram artifact, not prose; not claim to predict the system or teach systems thinking wholesale.

## Value vs unaided baseline

Asked "is our free tier a self-reinforcing growth engine?", a strong model often narrates a one-directional chain ("free users -> referrals -> more users -> revenue") - an R-loop described without its explicit loop-back, and with the balancing loops (support strain, cost ceiling) dropped entirely. That mirrors the feedback-misperception the human-subject evidence documents (Sterman 1989; Sweeney & Sterman 2000). This skill forces explicit loop **closure** and **R/B polarity signing**, surfacing that the same users who drive the reinforcing loop also feed the balancing loops, and that a delay makes overshoot - not a clean spiral - the structure's argument. The honest limit (evidence is human-subject and transferred, CLD reliability is contested per Schaffernicht 2010, and the read-out is an argument not a prediction) is stated, not hidden.
