# Eval cases: tfs-evidence-vs-inference-sort

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (deferred to the Silver climb); check by hand or wire in later.

## Should trigger

- "Before we greenlight this migration, audit the architecture proposal: which claims are backed by data versus stuff we're assuming?"
- "Here's the memo arguing we should acquire the competitor. It must be trusted before the board acts. Separate evidence from inference and flag anything stated as fact with no source."
- "Look at the conclusion you just gave me and sort your own reasoning: which parts are observed, which are deduced, and how confident are you in each leap?"
- "This clinical summary mixes study findings with the author's interpretation. Build a ledger separating verifiable evidence from inference and assumption, with confidence on each inference."
- "Our thesis says the free tier will triple signups and pay for itself. Label each claim and tell me which unsupported claims most need verifying first."
- "I need a reasoning audit on this safety case before sign-off - mark the load-bearing assumptions nobody has tested."

## Should NOT trigger (wrong tool / near-miss)

- "Fact-check this article - go confirm whether the numbers are actually true." (near-miss: verifies truth; this skill only classifies claim type)
- "Brainstorm some wild taglines for the brand campaign - no need to be rigorous." (creative)
- "Summarize this already well-sourced report into three bullets." (summarization)
- "Just tell me: is it true our competitor offers a free tier? Go verify it." (fact verification)
- "Write a persuasive one-pager arguing for the free-tier launch." (persuasion)
- "Run a premortem on the migration plan." (risk, not reasoning audit)

## Output checks (a good output must)

- [ ] Be an evidence/inference ledger table (claim, type, basis/source, inference confidence, flag), not prose.
- [ ] Label every claim as exactly one of Evidence / Inference / Assumption; no confident inference mislabeled as evidence.
- [ ] Give each inference a confidence level with a reason; not treat plausibility as verification.
- [ ] Flag claims presented as fact but uncited ("uncited") and load-bearing unexamined assumptions ("unexamined").
- [ ] Explicitly not claim to have verified the truth of any evidence; only sort claim type.
- [ ] End with a "load-bearing unknowns" list (the few unsupported/low-confidence claims that most need verification, with how to verify).

## Value vs unaided baseline

Asked to "vet this reasoning," a strong model renders a fluent prose critique that still blends its own deductions with the source's facts in the same confident register - the exact failure this targets. The skill forces a discrete per-claim ledger that distinguishes uncited assertions wearing the costume of evidence from genuine assumptions, attaches reasoned confidence to each leap, and holds the boundary that it sorts claim type without claiming to have verified truth.
