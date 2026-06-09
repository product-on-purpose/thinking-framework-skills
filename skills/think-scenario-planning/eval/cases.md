# Eval cases: think-scenario-planning

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "We're about to bet the company on a self-serve growth motion for the next three years, but so much depends on how the market moves that we can't really predict. Build a few alternative futures and tell me which moves hold up across all of them."
- "Our whole 5-year strategy assumes regulation stays where it is and adoption keeps climbing. I want to stress-test it against a handful of contrasting futures we don't control, not a single forecast."
- "Pick the two biggest uncertainties about our external environment, cross them into a 2x2, and write out the four worlds - then tell me which of our current plans survive every one."
- "The decisive forces here (technology adoption, geopolitics, demand) are long-horizon and genuinely unpredictable. Construct divergent scenarios and find the robust strategy and the early signals for each world."
- "Help me build a scenario set for entering this new region - a few internally consistent stories of how the environment could play out, and a robustness read of our entry plan across them."
- "Don't give me one prediction. Give me 3-4 contrasting external futures organized by critical uncertainties, and the options we should keep open because they diverge."

## Should NOT trigger (wrong tool / near-miss)

- "We've built our four scenarios - now assign each a probability so we can plan against the most likely one." (near-miss: this is forecasting, not scenario planning; the worlds are structured speculation, not probabilities, and acting on "the most likely quadrant" reintroduces the single-future thinking the method exists to break. Build the divergent worlds and the robustness read; do not rank them by likelihood.)
- "We've already chosen the future we want - market leader in three years. Map the milestones and preconditions backward to a step we can take now." (one chosen desired endpoint with a path derived back to today is `think-backcasting`, not a set of alternative external worlds.)
- "We're launching the self-serve free tier - trace the first, second, and third-order consequences of that one move radiating outward." (one consequence map from one decision is `think-futures-wheel`, not multiple alternative environments held in parallel.)
- "Assume our platform bet has already failed two years from now - work backward to everything that could have caused it." (imagining one specified failure and reasoning to its causes is `think-premortem`; scenario planning is multi-future and not failure-anchored.)
- "We haven't decided whether to do the self-serve motion at all yet - just help me make that call." (no focal decision under pressure to serve, and no uncontrollable long-horizon environment to model; settle the decision first, then build scenarios to stress-test it.)
- "Summarize what the team shipped this quarter for the board update." (unrelated.)

## Output checks (a good output must)

- [ ] State the focal decision and horizon in one line, with the scenario set serving that decision.
- [ ] Name **two** critical-uncertainty axes that are both high-impact and high-uncertainty and genuinely independent, each a spectrum with two named poles - not a rich field collapsed to two for neatness.
- [ ] Cross the axes into a 2x2 and produce **four contrasting, internally consistent worlds** (2-4), each named and given a short divergent narrative - not four mild variations of the present.
- [ ] Include a **robustness read**: a strategy tested against every world, naming robust moves (survive all), one-world bets, and uncovered gaps.
- [ ] Include a per-world **signal watch-list** (leading indicators that the world is arriving) and the **options to keep open**.
- [ ] Frame the worlds as structured speculation - **no likelihood ranking**, no probabilities, no "most likely quadrant."
- [ ] Deliver the scenario set artifact, not prose.
- [ ] Not overclaim: keep to a divergence-and-robustness aid; the evidence is practitioner-grade and transferred, and this is not a predictor of the future.

## Value vs unaided baseline

Asked the same question, a strong model tends to produce a single best-guess forecast and plan against it, or - if asked for scenarios - to generate an optimistic / pessimistic / base case it then quietly ranks by likelihood, which is forecasting in disguise. It rarely isolates two genuinely independent critical uncertainties, crosses them into four deliberately divergent worlds, and - crucially - stress-tests a strategy across all of them to separate the robust moves from the one-world bets. This skill forces that discipline: a real driving-force scan, two independent high-impact / high-uncertainty axes, four internally consistent and contrasting worlds, an explicit robustness read with a signal watch-list and options to keep open, and a hard refusal to rank the worlds by probability. It converts a single implicit forecast into a set of futures held in parallel and a strategy judged against the whole set.
