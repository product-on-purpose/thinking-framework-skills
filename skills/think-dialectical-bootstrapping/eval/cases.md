# Eval cases: think-dialectical-bootstrapping

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "I have to put a single free-to-paid conversion rate into the board model by Friday, it's genuinely uncertain, and our analyst is out. Give me a defensible number, not a hand-wave."
- "Estimate what year this regulation will actually take effect. I keep landing on one number and I'm worried I'm anchored - is there a way to pressure-test my own guess without a second person?"
- "What share of our users will be on mobile by next year? It's a hard call, I have no comparable past launch to lean on, and I want a more reliable single percentage than my first instinct."
- "Make a first estimate of this quantity, then deliberately assume it's wrong, re-estimate from different assumptions, and average the two - I want the inner-crowd trick on this number."
- "I need to commit one count for the forecast and I only get one shot. No reference class exists. Help me debias my own estimate by generating a contrarian second read and combining them."
- "My estimate of the adoption percentage feels too confident. Poll my own 'inner crowd' - a second estimate from changed assumptions - and give me the average as the committed figure."

## Should NOT trigger (wrong tool / near-miss)

- "Roughly how many total signups could the free tier ever reach - ballpark order of magnitude?" (near-miss: an unbounded, order-of-magnitude unknown is exactly the documented no-gain zone for this method (Muller-Trede 2011); decompose it into multiplied factors with `think-fermi-estimation`, do not re-sample a holistic guess and average.)
- "What's 15% of our 12,000 active users?" (an easy question well within competence; a forced contrarian second estimate would only add error the average bakes in (Van de Calseyde and Efendic 2025). Just compute it.)
- "We have three analysts and a partner who can each give an independent read on this number - help me combine their judgments." (a real second judge - in fact several - is available; a real second opinion is worth about twice the inner crowd (Herzog and Hertwig 2009). Aggregate the real judges; do not simulate a crowd from one mind.)
- "We have five years of conversion data from four near-identical past launches. Forecast this launch's conversion." (a genuine reference class exists; the outside view dominates - that is `think-reference-class-forecasting`, not an averaged pair of self-estimates.)
- "Should we launch the free tier at all? Help me make the call." (a qualitative decision, not a numeric point estimate; there is nothing to average. Use a decision or option-evaluation method instead.)
- "Our whole revenue number hinges on one assumption - that enterprise renews at 90%. Pressure-test that assumption." (the estimate hangs on one shared load-bearing assumption; averaging cannot remove a bias both estimates share - test the assumption, do not average over it.)
- "Summarize what the team shipped this quarter for the board update." (unrelated.)

## Output checks (a good output must)

- [ ] Run the **applicability check first**, confirming all four gates (hard question, bounded-scale point estimate, one-off, no better source) before producing any number - and route out instead of running if a gate fails.
- [ ] Produce a **first estimate** with units and the scale it lives on.
- [ ] Produce **assumed-wrong reasoning**: explicit reasons the first estimate could be off and what different knowledge a skeptic brings - a genuinely different basis, not a token nudge.
- [ ] State the **direction** the doubts imply (too high or too low).
- [ ] Produce a **second estimate** that is a real re-estimate from the changed assumptions, not the first number shaded slightly.
- [ ] Commit the **plain arithmetic mean** of the two estimates as the answer - never a cherry-picked single number, never a value outside the range of the two.
- [ ] Include a **bracketing note** stating whether the two estimates straddle a plausible truth.
- [ ] Deliver the **dialectical estimate artifact**, not a prose argument.
- [ ] Not overclaim: carry the evidence caveat - the grade is **M**, the evidence is **transferred from human studies** and not agent-validated, the effect is modest and not a guarantee, and a real judge or real data would beat it.

## Value vs unaided baseline

Asked the same question, a strong model tends to produce a single confident point estimate and commit it - anchored on the first plausible number and the framing of the prompt - or, if nudged, to "sanity check" by restating the same estimate with slightly more words, which moves nothing. It rarely does the one thing that carries the evidence: deliberately assume its own first number is wrong, re-estimate from genuinely different assumptions so the second guess can land on the other side of the truth, and then mechanically average the two rather than picking the one it now prefers. This skill forces that discipline: an applicability check that routes easy questions, unbounded magnitudes, and available-data cases away; a first estimate; a real contrarian second estimate with its direction; and a non-negotiable arithmetic mean as the committed answer. It also forces the honesty the unaided model omits - the modest, transferred, M-tier caveat and the explicit note that a real second judge or real reference class would do better. It converts one anchored guess into a debiased, better-anchored committed number, and refuses to dress that up as a forecast.
