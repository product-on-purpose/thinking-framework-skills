# Eval cases: think-framework-advisor

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (Gold-era); check by hand or wire in later.

## Should trigger

- "I've got a big, consequential decision coming up and I honestly don't know how to even approach it - where do I start?"
- "We're stuck on this problem. Which of your thinking tools would actually help, and in what order?"
- "Here are my notes from three customer calls and a vague goal - I'm not sure whether I need to brainstorm, decide, or stress-test. What should I do?"
- "Recommend a plan of frameworks to work through this and tell me why each one fits."
- "I'm overwhelmed by where to begin with our roadmap mess. What thinking approach fits?"
- "Should we launch a free tier? I'm nervous we're committing because it's the obvious move, not because we thought it through." (the advisor diagnoses the job behind the question; note the user has *not* asked to stress-test a chosen option, so this is routing, not a premortem)

## Should NOT trigger (wrong tool / near-miss)

- "Run a premortem on our launch." (the user already knows the move - route directly to `think-premortem`, not the advisor)
- "Compare these three vendors against our weighted criteria." (a defined decide task with options in hand - go straight to `think-decision-option-review`)
- "Is this PRD any good? Critique it." (review of a finished artifact, not routing an unframed situation)
- "Facilitate our team offsite agenda." (group facilitation / human-social - a thin family; redirect, do not force a `think-` pick)
- "What's the capital of France?" (factual lookup - refuse)
- "Write me a Python script to parse this CSV." (coding - refuse)

## Output checks (a good Thinking Plan must)

- [ ] Build a source ledger of exact input quotes before any analysis; every `Source:` is an exact substring.
- [ ] Mirror the input and state the inferred intent with a confidence level, before recommending.
- [ ] Name exactly one **dominant** cognitive job, classified by the thinking-move needed (not the topic), with a citation.
- [ ] Read stakes x reversibility and let it cap the plan: the number of frameworks respects the heft table (no over-stacking).
- [ ] Recommend 1-4 frameworks **in sequence**, each named ONLY from `recommendable.json`, each with: job, why-this-over-its-nearest-neighbor, honest evidence tier, expected artifact, a filled (placeholder-free) invocation, and a stop signal.
- [ ] Include a non-empty "what NOT to use, and why," including anything the calibrator cut, and decline a recipe whose precondition is not met.
- [ ] Never invent a framework name; use plain language where nothing listed fits.
- [ ] Never inflate a tier; never present the routing itself as S/validated (the dossier grades routing as C).
- [ ] Be the Thinking Plan artifact (ledger, summary, mirror, diagnosis, sequence, what-not-to-use, evidence map), not a prose essay.

## Value vs unaided baseline

Asked "what frameworks should I use here," an unaided strong model will typically: (a) name plausible-sounding frameworks including ones this library deliberately does not ship (Six Thinking Hats, mind-mapping, SWOT) - i.e., hallucinate the tool set; (b) over-stack ("here are seven approaches you could try"); (c) present them with uniform, false confidence and no honest evidence grading; and (d) fail to sequence them or tie them to a diagnosed job. This skill's distinctive value is the opposite on every count: diagnose ONE dominant job from the user's own words, prescribe the **minimal** fitting sequence governed by stakes x reversibility, name **only** frameworks that actually exist (name-safety via `recommendable.json`), carry each framework's honest tier - and grade its own routing as C rather than dressing it up - and state explicitly what not to use and why.
