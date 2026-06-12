# Eval cases: think-veil-of-ignorance-reasoning

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "We're rationing a fixed support budget between paying enterprise accounts and free-tier users, and honestly our bonuses ride on paid retention. Help me decide this as if I didn't know which kind of user I'd turn out to be, then show me where my real position is biasing the call."
- "This headcount allocation favors my own team. I want to make the call as if I had an equal chance of being any of the affected teams, with the rule I'm using made explicit, then compare that to the call I'd actually make."
- "We're deciding which user group eats the latency hit. Decide it impartially - as if I could be any of them with equal odds - and surface whether self-interest is driving where I want to put the burden."
- "I need a defensible, publicly justifiable answer on who gets the scarce slots. Run the impartiality version: what would I want if I didn't know who I was going to be, under a stated rule, versus what I'd choose knowing my position?"
- "Our platform policy trades one user community's safety against another's growth, and we benefit from growth. Strip out who benefits, decide behind a veil with the rule named, then confront the positioned decision."
- "Allocate this discount pool across customer segments as if I had an equal chance of being in any segment, name the rule I'm using, and tell me what gap that opens against the allocation I'd default to."

## Should NOT trigger (wrong tool / near-miss)

- "Walk this pricing proposal through each affected customer segment's eyes - the enterprise buyer, the SMB, the individual - and tell me how each one sees it." (near-miss: identity-known perspective enumeration, one party at a time, synthesized after, is `think-parallel-perspectives-review`; the veil does the opposite - it removes identity and forces one choice under an equal chance of being any party. The research controls show generic perspective-taking does not reproduce the veil's effect.)
- "We owe this customer a contractual SLA and we promised the partner exclusivity - figure out which commitment to honor." (the stripped identity information is morally load-bearing: promises, desert, and fiduciary duties are relevant, not bias - Sandel's critique. The veil would wrongly strip the obligation; flag it and do not impartiality-wash it.)
- "Which rationing of the support budget actually maximizes net revenue retention?" (empirical, not normative; this needs analysis of which option performs best, not an impartiality device. The veil applies only when the contested matter is whose interests count.)
- "Just tell me the fair answer here - give me the neutral, objective verdict on who should get the resource." (the veiled answer has a known directional push toward aggregate welfare and is one input, not a neutral verdict; promising a neutral objective answer misrepresents the device.)
- "Run us through some impartiality exercises so the team gets better at fair decisions over time." (cross-dilemma transfer failed in the research, study 7; it is a per-decision device, not training. Run it on the decision at hand, and claim no lasting impartiality.)
- "Map the consequences of launching the free tier - support load, churn, MRR - rippling outward." (one consequence map from one decision is `think-futures-wheel`, not an impartiality judgment on a values trade-off.)
- "Summarize what the team shipped this quarter for the board update." (unrelated.)

## Output checks (a good output must)

- [ ] State the focal decision in one line and confirm it is a **normative** whose-interests-count trade-off, not an empirical "which performs best" question.
- [ ] Enumerate the **affected parties**, including the decider's own group and any voiceless party.
- [ ] Run the **load-bearing-identity check**: explicitly test whether desert, a promise, a fiduciary duty, or a compensatory claim makes the stripped identity morally relevant, and flag (not veil away) any case where it does.
- [ ] Name the **decision rule** carried behind the veil explicitly (average utility, maximin, or a floor-constrained variant) and report it with the result - never leave it implicit (the central wall).
- [ ] Record both the **veiled choice** and the **positioned choice**, and **name the gap** between them and what it reveals about silent self-position or group loyalty.
- [ ] Frame the final position as **one input with a known directional push** toward aggregate welfare, never a neutral verdict, and note what a different rule (for example worst-off priority) would have produced.
- [ ] Deliver the **veiled-decision comparison** artifact, not prose.
- [ ] Not overclaim and not drop the caveat: keep to an impartiality aid that surfaces silent self-interest; the evidence is **moderate (M) and transferred from human studies, not agent-validated**, and this is not a producer of "better" ethical decisions. The evidence caveat must ship in the artifact.

## Value vs unaided baseline

Asked the same question, a strong model tends to either declare a "fair" answer with no stated rule (laundering a contested normative choice as neutral impartiality), or walk each stakeholder's perspective and synthesize - which leaves the decider still knowing who they are, the exact variable the device manipulates. It rarely *removes* identity and forces a single self-interested choice under an equal chance of being any party, rarely makes the decision rule explicit (so it cannot show that a maximin rule and an average-utility rule yield different answers from the same veil), and rarely confronts the impartial answer against the positioned one to expose where self-interest was driving the call. This skill forces that discipline: confirm the question is normative, enumerate the parties, run the load-bearing-identity check that walls off promises and desert, state the rule, decide veiled then positioned, name the gap, and present the result as one input with a known directional push rather than a verdict. It converts a self-serving call dressed as fairness into a named, inspectable veiled-decision comparison - and reports honestly that the evidence is a measured judgment *shift* in human studies, not validated better decisions.
