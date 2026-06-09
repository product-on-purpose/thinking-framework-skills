# Eval cases: think-contradiction-resolution

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "We keep going round on the free tier: generous enough to drive signups, but limited enough to protect paid conversion. Help me find a way out of that trade-off instead of picking a middle ground."
- "Our onboarding has to be thorough, for safety and compliance, and instant, for conversion. Those fight each other - is there a way to actually get both?"
- "The team is about to compromise on a point on the speed-versus-quality curve for this release. Before we do, I want to test whether we really have to trade one for the other."
- "Frame this as a contradiction and try to dissolve it: the casing must be rugged, which makes it heavy, and portable, which needs it light."
- "Everyone assumes more security means more user friction. Is that trade-off real, or can we break it?"
- "State the ideal final result and see if the 'cheap to run vs reliable' tension on our pipeline can be separated away."

## Should NOT trigger (wrong tool / near-miss)

- "The tension between centralizing and decentralizing the org is one we have to live with and keep rebalancing - help me map and manage it over time, not solve it once." (near-miss: this is an unresolvable *polarity to manage*, not a trade-off to dissolve; contradiction resolution tries to eliminate the trade-off and only declares a standing polarity when dissolution fails.)
- "We've accepted we have to trade budget for scope on this project - help us weigh the options and pick." (the trade-off is already accepted as real; comparing and choosing under it is `think-decision-option-review`.)
- "We have a clear problem and just want a big pile of fresh ideas for it." (idea volume, not one tension; use `think-brainwriting` or `think-far-analogy-ideation`.)
- "The problem is still fuzzy and I'm not even sure what the real issue is yet - help me frame it." (no real two-sided trade-off on the table yet; frame first with `think-problem-restatement`, then return here.)
- "Summarize what the team shipped this sprint for a status update." (unrelated.)

## Output checks (a good output must)

- [ ] Write the trade-off as an explicit opposing pair (to get more A we accept less B) and classify it technical (two parameters) or physical (one parameter, two opposite values).
- [ ] State the Ideal Final Result implementation-free (no "how"), not a reworded goal.
- [ ] Attempt dissolution with named operators - the four separation principles (time, space, scale, condition) for a physical contradiction, or inventive-principle prompts for a technical one - and record each attempt, not just the winner.
- [ ] Treat any 39x39 contradiction matrix as a heuristic prompt, never an authoritative lookup.
- [ ] End in either a concrete resolution OR an honest "this is a genuine trade-off" with an onward route (e.g. to `think-decision-option-review`) - never a vague compromise dressed up as a dissolution.
- [ ] Deliver the contradiction-resolution worksheet artifact, not prose.
- [ ] Not overclaim: keep to "tests whether the trade-off is real and often dissolves it"; the evidence is practitioner-grade and transferred, and the matrix is contested.

## Value vs unaided baseline

Unprompted, a strong model accepts a trade-off as given and optimizes it - it proposes a middle setting, lists pros and cons of each pole, or splits the difference - because "balance the trade-off" is the default frame. It rarely tests whether the trade-off has to exist at all. This skill forces the dissolve-first discipline: name and classify the contradiction, state an implementation-free Ideal Final Result that strips the assumed apparatus, run the fixed separation menu (time / space / scale / condition), and - crucially - exit honestly to a decision tool when the trade-off is genuinely fundamental. It converts the many false trade-offs into win-wins while refusing to fake a dissolution for the real ones.
