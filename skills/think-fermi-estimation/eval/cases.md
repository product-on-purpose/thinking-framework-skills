# Eval cases: think-fermi-estimation

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (deferred to the Silver climb); check by hand or wire in later.

## Should trigger

- "Roughly how many paying accounts would a free tier convert for us in year one? We have no data on it yet."
- "Ballpark the total support load self-serve signups would add - we've never run self-serve."
- "How big is the addressable market for this niche? There's no analyst report on it; estimate it from the ground up."
- "We can't look this up - give me an order-of-magnitude number for monthly compute cost at 10x scale, and show your factors and a range."
- "Estimate how many person-hours a full data migration would take when we have nothing comparable to anchor on."
- "How many qualified leads would a conference booth generate? Build it up from attendance and rates, with a low/high."

## Should NOT trigger (wrong tool / near-miss)

- "We've shipped 12 similar features; forecast how long this one takes." (real base-rate data exists - `think-reference-class-forecasting`)
- "Forecast our cost overrun using the distribution of past projects." (genuine reference class - `think-reference-class-forecasting`)
- "Break down 'why is churn rising?' into a MECE set of sub-questions." (wants a question tree and no number - `think-issue-tree`)
- "Map out every cause of the margin leak so we can divide the analysis." (coverage decomposition, no estimate - `think-issue-tree`)
- "What's our current MRR?" (a known, lookup-able figure - no estimation needed)
- "How many days are in a fiscal quarter?" (ordinary/familiar quantity - decomposition adds noise, just state it)
- "Should we launch the free tier or fix the funnel?" (a decision, not a magnitude - `think-decision-option-review`)

## Output checks (a good output must)

- [ ] State the target quantity and unit, and confirm it is a build-from-factors case (no real base-rate data / reference class).
- [ ] Write the unknown as a multiplicative chain of factors, each small enough to guess to within a factor.
- [ ] Give every factor a low/best/high band **and** a stated basis for the guess.
- [ ] Run an explicit independence check and flag any correlated factors (sharing a driver) rather than multiplying them naively.
- [ ] Report a point estimate **and** a compounded low/high range - never a point estimate alone.
- [ ] Name the dominant-uncertainty factor (the band that most widens the range).
- [ ] Be the Fermi decomposition worksheet artifact, not prose; not claim a precise or proven number; not cite unverified effect-size figures.

## Value vs unaided baseline

Asked "roughly how many paid accounts would a free tier convert in year one?", a strong model often returns a single confident-sounding number ("probably around a few hundred") with the arithmetic and assumptions buried, and no range. That hides exactly the uncertainty the question is about, and it cannot be challenged factor by factor. This skill forces the multiplicative chain, a band and basis per factor, a compounded low/high range instead of a bare point, an independence check that catches when two factors share a driver (so the tails do not multiply naively), and a dominant-uncertainty flag that says which guess to de-risk first. The honest limit, carried in the output, is that this is an order-of-magnitude estimate for a build-from-factors quantity under an independence condition - directional help on a thin, human-subject evidence base, not a forecast and not a precise number.
