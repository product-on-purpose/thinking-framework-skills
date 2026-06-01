# Eval cases: tfs-stocks-and-flows-reasoning

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (deferred to the Silver climb); check by hand or wire in later.

## Should trigger

- "We cut churn in half - does that mean our customer base is finally growing?"
- "Emissions growth is slowing. Is the CO2 in the atmosphere going down?"
- "Hiring is up but attrition is also up - is headcount actually rising, and when do we hit 200?"
- "Our backlog feels endless even though we're closing more tickets than ever. What's going on?"
- "We reduced new debt this quarter. Is our total debt shrinking?"
- "Map the runway: cash in vs cash out - when do we actually run out?"

## Should NOT trigger (wrong tool / near-miss)

- "What are the second- and third-order effects of launching a free tier?" (near-miss: futures-wheel, forward consequences, not accumulation dynamics)
- "Why does our conversion keep dropping? Map the systemic causes." (iceberg-model)
- "What's our gross margin this quarter?" (a ratio/snapshot, no accumulation)
- "Should we launch the free tier or fix the funnel?" (decision)
- "Forecast next year's revenue with a range." (reference-class-forecasting)
- "Summarize our financials for the board." (summarization)

## Output checks (a good output must)

- [ ] Name the stock as a level (accumulation), not a flow/rate.
- [ ] List both inflows and outflows separately; not ignore the outflow.
- [ ] Derive the stock's trajectory from the net flow (inflow minus outflow), not from one flow's direction.
- [ ] State when the stock actually rises/falls/plateaus.
- [ ] Name the naive intuition it corrects.
- [ ] Be the stock-flow map artifact, not prose; not claim to teach systems thinking wholesale.

## Value vs unaided baseline

Asked "we cut churn, are we growing?", a strong model often mirrors the user's framing and confirms the flow-direction intuition ("yes, lower churn means growth"), the exact stock-flow error the evidence documents even in expert subjects. This skill forces the explicit stock/inflow/outflow separation and the net-flow logic, surfacing that a base can keep shrinking while churn falls - and names the wrong intuition it corrects.
