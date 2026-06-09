# Eval cases: think-theory-of-constraints

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "Our onboarding takes about six weeks and everything waits on the security review. We are about to hire across the whole onboarding team - where do we actually unblock throughput?"
- "The CI pipeline is the slowest part of every release. Is making the other build stages faster even worth it, or are we wasting effort?"
- "We keep adding salespeople but revenue is flat. The demos team seems to be where deals stall - help me figure out where the real limit is and what to do about it."
- "The hiring funnel is jammed at the onsite-interview stage - candidates pile up waiting and the offer step sits idle. Where do we focus?"
- "Support tickets keep piling up even though we hired more L1 agents. Something downstream is the actual bottleneck - where is throughput really capped?"
- "Our fulfillment line runs every station flat-out and there is always work-in-progress stacked in front of packing. Which single step caps how much ships per day, and what should we do first?"

## Should NOT trigger (wrong tool / near-miss)

- "Help me lay out every category of cause that could be hurting activation so we do not miss anything - we want exhaustive coverage of the possibilities." (coverage / exhaustive decomposition, the inverse move; use `think-issue-tree`.)
- "Outages keep recurring no matter how many times we patch the symptom. Why does this keep happening, and where structurally should we intervene?" (recurring, deep-structural-cause leverage by causal depth; use `think-iceberg-model`.)
- "Churn dropped last quarter, so is our customer base finally growing or still shrinking?" (accumulation-trajectory read from a single flow's direction; use `think-stocks-and-flows-reasoning`.)
- "We have to choose between two vendors for a one-off platform decision - there is no pipeline or flow here, just a single call to make." (no flow, no single binding constraint; not a rate-limiter problem - route to a decision tool.)
- "Summarize what the team shipped this sprint for a status update." (unrelated.)

## Output checks (a good output must)

- [ ] State the system as a flow (a sequence of steps work passes through), and if there is no flow or no single binding constraint, say so and stop rather than manufacturing a bottleneck.
- [ ] Name one binding constraint as a **hypothesis**, not asserted as found, and not just the loudest or most-visible step.
- [ ] Include a **capacity-versus-demand test per step**, with the named constraint being the step where demand meets or exceeds capacity while downstream starves.
- [ ] Put **exploit before elevate** - wring throughput from the constraint with current resources first; gate added capacity behind exploitation being exhausted.
- [ ] **Subordinate** non-constraints to the constraint's pace rather than optimizing them to their own local maximum, and name the local-efficiency habits to give up.
- [ ] Record the **re-check trigger** (what would move the constraint, and the warning not to keep optimizing the old one).
- [ ] Deliver the constraint-intervention plan artifact, not prose.
- [ ] Not overclaim: keep to "the bottleneck principle is operationally backed but has no controlled trial of this move and is transferred from human practice."

## Value vs unaided baseline

Asked "where do we unblock throughput?", an unaided model tends to suggest improving several steps at once, or fixing the loudest, most-complained-about step, because "make every part faster" and "address the complaint" are the default frames. It rarely tests whether a given step is actually the rate-limiter. This skill forces the capacity-versus-demand test that singles out the one binding step, the exploit-before-elevate discipline that avoids unnecessary spend, and the subordinate decision that stops wasting effort on non-constraints - and it flags that fixing the constraint will often move it downstream rather than ending the problem.
