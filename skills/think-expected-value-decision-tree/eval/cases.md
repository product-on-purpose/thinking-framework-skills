# Eval cases: think-expected-value-decision-tree

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "We can launch the new pricing now, or run a pilot first to see how many convert before committing. Map out the decision with the conversion rate as the uncertain part and tell me which bet is worth more."
- "Go / no-go on the hardware bet. There's maybe a 30% chance the supplier delivers on spec; if they don't we eat the tooling cost. Price it out and recommend, and tell me what probability would change the call."
- "Should we sink three months into the integration? It only pays off if the partner's API ships, which is genuinely uncertain. Build the tree, roll it back to an expected value per option, and flag what flips it."
- "We have a base rate for how often these migrations fail. Use it to decide between migrate-now, migrate-after-a-spike, and don't-migrate - I want the expected value of each path, not a vibe."
- "Lay out a decision tree for the trial-extension experiment - chance the cohort converts high vs low, the value of each, fold it back, and show how sensitive the answer is to the conversion assumption."

## Should NOT trigger (wrong tool / near-miss)

- "We're down to three CI/CD vendors. Score them on the criteria that matter - cost, support, lock-in - and recommend one." (this is *deterministic multi-attribute scoring* with no uncertain outcomes to price; route to `think-decision-option-review`. Use the matrix when the differentiator is *which attributes matter*; use the tree when it is *uncertain outcomes and their probabilities*.)
- "What's the actual probability this kind of launch fails? I keep guessing and I want a defensible number before I do anything with it." (this asks for the *probability itself*, the upstream outside view - that is `think-reference-class-forecasting`, which *produces* the number an EV tree later *consumes*. They pair; this is the upstream half, not the choice.)
- "Deploy the hotfix now or wait for the morning window? Pretty obvious, fully reversible, just confirm." (reversible and low-stakes - no tree warranted; triage with `think-one-way-vs-two-way-door`.)
- "Put a positive expected value on this one-shot deal even though a bad draw wipes out the fund - the average is positive so just take it." (near-miss: a single non-repeated decision with intolerable downside; raw EV is the wrong criterion (risk of ruin governs). The skill must *flag* this, not crank out a recommend-the-gamble EV.)
- "Just multiply some made-up odds by some made-up payoffs and give me a number to put in the deck." (near-miss: guessed inputs trusted - manufacturing false precision. The skill must refuse to launder unsourced probabilities into the arithmetic and should send the hard part to `think-reference-class-forecasting`.)
- "Summarize what the team shipped this sprint for a status update." (unrelated.)

## Output checks (a good output must)

- [ ] Build a tree that separates **choice nodes** (decider controls) from **chance nodes** (nature controls), with each chance fan's probabilities summing to 1.
- [ ] Name a source for every probability and flag any guess at the node it enters - no fabricated input laundered into the arithmetic.
- [ ] Price outcomes in a common unit and note any incommensurable value rather than forcing a fake number.
- [ ] Show the rollback right to left with explicit arithmetic (chance node to EV, choice node to best branch), so it can be checked.
- [ ] Include a **what-flips-it** note naming the single probability or value the recommendation is most fragile to and the threshold at which it flips.
- [ ] Run a ruin check - flag any small-probability intolerable one-shot loss and state that raw EV is the wrong criterion there.
- [ ] Deliver the rolled-back tree with the chosen path, not a bare EV number presented as the answer.
- [ ] Not overclaim: keep to "prices uncertain outcomes and makes the assumptions inspectable"; the evidence is practitioner-grade and transferred.

## Value vs unaided baseline

Unprompted, a strong model tends to argue a decision-under-uncertainty in prose and land on a hedge, or - if it does reach for EV - to invent plausible-looking probabilities and payoffs and multiply them into a single authoritative-sounding number, hiding that the inputs were guesses (false precision). It rarely separates outcomes it controls from outcomes it does not, rarely shows the fold-back arithmetic, rarely says which one probability the answer hinges on, and rarely stops to check whether a one-shot ruin makes EV the wrong tool entirely. This skill forces the price-the-uncertainty discipline: lay out choice and chance nodes, source every probability (sending the hard ones to `think-reference-class-forecasting`), roll the tree back with the arithmetic on the page, name the what-flips-it threshold, and run the ruin / risk-attitude check before recommending - turning a prose hunch into an inspectable, contestable decision whose fragile assumption is named.
