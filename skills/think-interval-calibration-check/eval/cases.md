# Eval cases: think-interval-calibration-check

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "Our business case says free-to-paid conversion will be 3 to 5 percent, 90 percent sure. That 90 percent has never been pressure-tested. Can you check whether it really means 90?"
- "The team keeps stating tight confidence intervals on ship dates and they keep blowing through them. Audit our stated 90 percent intervals - run the equivalent-bet test and score them against what actually happened."
- "Before this expected-value model eats our probability numbers at face value, I want to know if our '80 percent sure' inputs are actually calibrated or just overprecise."
- "Dana says 8 to 11 weeks to a thousand activated accounts, 90 percent confident. I think she's anchoring on the optimistic case. Test the width of that interval and widen it if she's overconfident."
- "We have a decision journal full of past forecasts with stated confidences. Score our hit rate against the nominal confidence and tell me if we're systematically overprecise."
- "Give me a calibration scorecard for the three uncertainty numbers in this proposal - the bet-test verdict, the adjusted interval, and our historical hit rate where we have one."

## Should NOT trigger (wrong tool / near-miss)

- "Calibrate your own confidence that this plan will work, and give me a percentage." (near-miss: the method calibrates a HUMAN's stated intervals through elicitation; an LLM posing an equivalent bet to itself has no felt indifference to reveal, and verbalized model confidence is itself overconfident (Xiong et al., 2024). Do not present the agent's own self-administered bet as calibration.)
- "I think our 3 to 5 percent conversion estimate is just wrong - it's anchored on the wrong comparable companies. Fix the number." (the problem is the LOCATION of the estimate, not the width of the uncertainty; relocating an estimate onto the right base rate is `think-reference-class-forecasting`, and building it bottom-up from factors is `think-fermi-estimation`. This method resizes width and never moves the central number.)
- "What's the population of Portugal, give or take, with a confidence interval?" (lookupable fact with no genuine uncertainty; calibrating an interval around a number you could simply check is theater.)
- "Generate a second, contrarian estimate of the conversion rate and average it with the first to get a better point estimate." (improving the accuracy of a POINT estimate by self-averaging is `think-dialectical-bootstrapping`; this method never generates a second estimate and never touches the point value.)
- "List everything we don't know about this market before we commit." (enumerating absent information is the content move `consider-the-unknowns`; this method is content-blind and only asks whether a stated confidence number means what it claims.)
- "Summarize the free-tier business case for the board." (unrelated.)

## Output checks (a good output must)

- [ ] State the focal claim, its stated interval and nominal confidence, and confirm there is genuine (non-lookupable) uncertainty whose worry is WIDTH, not a wrong central estimate.
- [ ] Confirm the judge is a **human** and never present the agent's own confidence as a calibrated reading.
- [ ] Run the **equivalent-bet test** on each interval and record the original interval, the bet verdict (wheel-preferred / interval-preferred / indifferent), the direction (widen / narrow / hold), and the **adjusted interval at indifference**.
- [ ] Where resolvable items exist, **score the hit rate** against the nominal confidence with an explicit **over- or underprecision diagnosis**; where they do not, mark the scorecard **one-legged**.
- [ ] Adjust only the **WIDTH** of the uncertainty; leave the **location** of the central estimate unchanged (a wrong number, well calibrated, is still wrong).
- [ ] Deliver the **calibration scorecard** artifact, not prose.
- [ ] Carry the **evidence caveat** in the artifact and **not overclaim**: tier P, transferred from human studies, partial debiasing only - never promise calibrated certainty, and never present the model's own confidence as calibrated.

## Value vs unaided baseline

Asked the same question, a strong model tends to accept the stated "90 percent sure" at face value and reason forward from it, or - if asked whether the number is right - to second-guess the central estimate (move 3 to 5 percent to 4 percent) rather than the width of the band. It rarely isolates the actual failure: that the stated confidence is a habit of speech whose intervals are too narrow given the judge's own information. Worse, asked to "calibrate confidence" it will often calibrate ITS OWN confidence, which is itself systematically overconfident and not what the method does. This skill forces the discipline: confirm genuine uncertainty and a human judge, run the equivalent-bet test to resize the WIDTH to genuine indifference, score the human's track record against nominal confidence to diagnose over- or underprecision, leave the central estimate untouched, and emit a scorecard that carries its own partial-debiasing caveat. It converts an unaudited "90 percent sure" into a corrected interval and an honest statement of how much is genuinely unknown.
