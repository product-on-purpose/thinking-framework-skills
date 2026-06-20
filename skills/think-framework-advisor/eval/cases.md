# Eval cases: think-framework-advisor

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (Gold-era); check by hand or wire in later.

## Should trigger

> Each carries real signal (a concrete decision or problem, stated stakes, a reversibility cue) so it exercises engagement, not the insufficient-signal gate. A deliberately thin routing request lives under "Should NOT trigger / gate" below.

- "We're deciding whether to migrate our main product database from Postgres to a managed cloud service next quarter. It is effectively a one-way move once data is cut over, the team is split on it, and a bad call sets us back months. I honestly don't know how to even approach the decision - where do I start?"
- "Here are my notes from three customer interviews and a vague goal to 'improve retention.' Some users want faster onboarding, others want deeper features, and a couple churned over price. I'm not sure whether I should be brainstorming new ideas, deciding between these directions, or stress-testing the riskiest one. What should I work through, and in what order?"
- "We've narrowed our Q3 roadmap to two big bets - a self-serve onboarding overhaul or an enterprise SSO push - and leadership wants a recommendation next week. They carry very different risks and we keep going in circles. Recommend a plan of frameworks to work through this, and tell me why each one fits."
- "Our roadmap is a mess: forty-odd requests from sales, support, and three exec pet projects, no clear priority, and we ship next month. I'm overwhelmed about where to even begin untangling it - whether to cluster the inputs, force a prioritization, or reframe the goal first. What thinking approach fits, and in what sequence?"
- "Should we launch a free tier? I'm nervous we're committing because it's the obvious move, not because we thought it through." (the advisor diagnoses the job behind the question; note the user has *not* asked to stress-test a chosen option, so this is routing, not a premortem)

## Should NOT trigger (wrong tool / near-miss / insufficient signal)

- "Run a premortem on our launch." (the user already knows the move - route directly to `think-premortem`, not the advisor)
- "Compare these three vendors against our weighted criteria." (a defined decide task with options in hand - go straight to `think-decision-option-review`)
- "Is this PRD any good? Critique it." (review of a finished artifact, not routing an unframed situation)
- "Facilitate our team offsite agenda." (group facilitation / human-social - a thin family; redirect, do not force a `think-` pick)
- "What's the capital of France?" (factual lookup - refuse)
- "Write me a Python script to parse this CSV." (coding - refuse)
- "We're stuck on this problem. Which of your thinking tools would actually help, and in what order?" (**insufficient-signal gate**: a routing request with no problem, stakes, or reversibility stated - under the advisor's own ~40-word / no-signal threshold, so the correct move is exactly ONE clarifying question, not a full Thinking Plan and not a refusal)
- "Run a SWOT analysis on our pricing change." (the user named a contested lens - route directly to `think-swot`, which leads with its own evidence caveat; the advisor is not needed)

## Output checks (a good Thinking Plan must)

- [ ] Build a source ledger of exact input quotes before any analysis; every `Source:` is an exact substring.
- [ ] Mirror the input and state the inferred intent with a confidence level, before recommending.
- [ ] Name exactly one **dominant** cognitive job, classified by the thinking-move needed (not the topic), with a citation.
- [ ] Read stakes x reversibility and let it cap the plan: the number of frameworks respects the heft table (no over-stacking).
- [ ] Recommend 1-4 frameworks **in sequence**, each named ONLY from `recommendable.json`, each with: job, why-this-over-its-nearest-neighbor, honest evidence tier, expected artifact, a filled (placeholder-free) invocation, and a stop signal.
- [ ] Never make an explicit-request-only contested lens (e.g. `think-swot`, `think-analysis-of-competing-hypotheses`) Step 1 for a generic prompt; route a generic "do a SWOT-ish read" to `think-issue-tree`. A contested lens appears only when the user named it, and then with its caveat.
- [ ] Include a non-empty "what NOT to use, and why," including anything the calibrator cut, and decline a recipe whose precondition is not met.
- [ ] Never invent a framework name; use plain language where nothing listed fits.
- [ ] Never inflate a tier; never present the routing itself as S/validated (the dossier grades routing as C).
- [ ] Be the Thinking Plan artifact (ledger, summary, mirror, diagnosis, sequence, what-not-to-use, evidence map), not a prose essay.

## Value vs unaided baseline

Asked "what frameworks should I use here," an unaided strong model will typically: (a) name plausible-sounding frameworks including ones this library deliberately does not ship as default tools (Six Thinking Hats, mind-mapping) or that it ships only as caveat-first, explicit-request-only contested lenses (SWOT) - i.e., hallucinate or over-trust the tool set; (b) over-stack ("here are seven approaches you could try"); (c) present them with uniform, false confidence and no honest evidence grading; and (d) fail to sequence them or tie them to a diagnosed job. This skill's distinctive value is the opposite on every count: diagnose ONE dominant job from the user's own words, prescribe the **minimal** fitting sequence governed by stakes x reversibility, name **only** frameworks that actually exist (name-safety via `recommendable.json`), carry each framework's honest tier - and grade its own routing as C rather than dressing it up - and state explicitly what not to use and why.
