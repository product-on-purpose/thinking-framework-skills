# Eval cases: think-process-tracing

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "Our paid-conversion retention cratered in the cohort right after the free-tier launch. We've got three theories - funnel dilution, an onboarding bug, a competitor's launch. Help me figure out which one actually caused it using the evidence we have."
- "This incident has three competing root-cause theories and a pile of logs and timestamps. Don't just tally which one has more support - tell me which evidence actually discriminates between them and which theories it eliminates."
- "We lost the deal. Sales says it was price, the PM says it was the missing integration, the exec says it was the relationship. It's one deal - work out which explanation the evidence we have can actually rule in or out."
- "One metric jumped last Tuesday and there are several plausible causes. For each cause, what would we expect to see in the data that the other causes would NOT produce, and what does the evidence say?"
- "Build me an evidence ledger for this single outage: each rival cause as a mechanism chain, each piece of evidence typed by how decisive it is, and which causes survive."
- "Several stories explain why this churn spike happened. I want a within-case adjudication that lets one decisive observation eliminate a theory, not a vote count - and tell me the one observation we're still missing."

## Should NOT trigger (wrong tool / near-miss)

- "Across all our cohorts over two years, what generally drives retention? Find the combination of conditions that predicts churn." (cross-case generalization over many cases is comparative / configurational work, not single-case process tracing; this skill's jurisdiction is one case, N equals one.)
- "There's one obvious cause of the outage and everyone agrees on it - now help me dig into the deeper systemic levels behind it." (a single agreed causal story with no rivals to discriminate is `think-iceberg-model` (descend the levels) or `think-issue-tree` (decompose coverage); process tracing needs at least two genuine rival explanations.)
- "Score each of our eight hypotheses against every piece of evidence for consistency and pick the least-inconsistent one." (an evidence-by-hypothesis consistency matrix scored by tally is Analysis of Competing Hypotheses, whose controlled record is null-to-negative and which is declined in this library; process tracing types each item by diagnosticity against a mechanism chain and lets single decisive items eliminate, it does not pick the least-inconsistent by count.)
- "Assume the launch has already failed a year from now - work backward to everything that could have caused it." (imagining one specified future failure and reasoning to its causes is `think-premortem`; process tracing adjudicates an outcome that has actually happened, using real within-case evidence.)
- "Build a few alternative external futures for the next three years and tell me which moves survive all of them." (constructing divergent uncontrollable futures and stress-testing a strategy is `think-scenario-planning`, not adjudicating rival explanations of one past outcome.)
- "Summarize what the incident review team concluded for the status update." (unrelated.)

## Output checks (a good output must)

- [ ] State the focal **outcome and single case** in one line, and confirm the question is within-case (N equals one), not cross-case generalization.
- [ ] List **at least two genuinely rival explanations**, each made concrete as a step-by-step **causal mechanism chain** - not relabelings of one story.
- [ ] State the **expected observable fingerprints** for each rival's steps **before** grading any evidence (no post-hoc test-type assignment).
- [ ] **Type each evidence item per rival** by certainty and uniqueness into **hoop / smoking gun / straw-in-the-wind / doubly decisive**.
- [ ] Update rivals **item by item**, letting a single failed hoop eliminate a rival - **not** selecting the explanation with the most supporting items, and **not** a consistency-matrix tally (that is ACH, declined here).
- [ ] If the evidence pool is all straw-in-the-wind, return **"non-diagnostic"** with the discriminating observation named - **never a manufactured winner**.
- [ ] Report the **surviving explanation with its residual uncertainty**, and name the **single most decisive missing observation** to seek next.
- [ ] Deliver the **rival-explanation evidence ledger** artifact, not prose.
- [ ] Not overclaim: keep to a structured single-case adjudication aid; the evidence is practitioner-grade methodology and transferred from human case-study research, and this is **not** a measured improver of reasoning accuracy (and the negative ACH record is not laundered onto it).

## Value vs unaided baseline

Asked the same question, a strong model tends to weigh rival explanations by accumulation: it gathers what supports each story, narrates the most plausible-sounding one, and effectively picks the explanation with the most supporting mentions - which rewards whichever story attracted the most loosely-relevant chatter. It rarely makes each rival a concrete mechanism chain, states the expected fingerprints before looking, and types each piece of evidence by its diagnosticity so that one failed hoop eliminates a rival regardless of how much soft support it had. It also tends to manufacture a confident winner even when nothing in the evidence actually discriminates. This skill forces that discipline: rivals as mechanism chains, fingerprints stated first, per-item certainty/uniqueness typing, elimination by decisive items rather than by count, an honest "non-diagnostic" verdict when the evidence cannot discriminate, and the naming of the single most decisive observation still missing. It converts a shouting match between narratives into a search for discriminating observations - and refuses to become a consistency-tally matrix when there is no single case and no mechanism chain to trace.
