# Eval cases: tfs-decision-option-review

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (deferred to the Silver climb); check by hand or wire in later.

## Should trigger

- "We're down to three CI/CD vendors and the team keeps going in circles. Lay out the tradeoffs so we can pick one and defend it."
- "Choose between rebuilding billing in-house, buying Stripe Billing, or extending our current hack. Weigh them against what matters."
- "Compare these four office locations against cost, commute, and room to grow, and recommend one with reasons."
- "Leadership wants a clear writeup of why we picked Postgres over DynamoDB and MongoDB. Objectives conflict and it's all gut feel now."
- "Score these three onboarding-redesign approaches on the criteria that matter, show what each gives up, then recommend."
- "Two job offers, very different in salary, growth, location. Make the tradeoffs explicit instead of me feeling my way through."

## Should NOT trigger (wrong tool / near-miss)

- "Brainstorm fresh ideas for improving activation - I have no options yet." (ideation; nothing to compare)
- "Deploy the hotfix now or wait for the morning window? Pretty obvious, just confirm." (trivial)
- "We're considering an irreversible migration off our DB vendor - I need a deep risk analysis, not a quick comparison." (near-miss: one-way door needs deeper analysis)
- "Run a premortem on the launch plan." (risk)
- "Write the postmortem for last week's outage." (after the fact)
- "Just tell me which laptop to buy, I trust you, no reasoning needed." (no decision support wanted)

## Output checks (a good output must)

- [ ] Be a criteria-weighted option matrix artifact (options vs weighted criteria, score per cell), not prose and not a bare total.
- [ ] Give each criterion an explicit weight and a reason it is included.
- [ ] Flag soft/low-confidence scores rather than presenting them as exact (or state scores are confident); soft scores not dressed as precise.
- [ ] State plainly what each leading option gives up (its tradeoff).
- [ ] Note factors that resist quantification rather than dropping them.
- [ ] Recommend one option and state what would flip it, with a confidence note; not treat a single weighted total as settling a close call.

## Value vs unaided baseline

Asked to compare options unaided, a strong model tends to compute a weighted total and present it as the answer, hiding soft scores and unscoreable factors inside tidy arithmetic. This skill makes weights and criteria reasons explicit so they can be argued, flags soft scores, keeps hard-to-quantify factors visible, and states the recommendation with what would flip it - treating the matrix as support for judgment, not a total that proves the choice.
