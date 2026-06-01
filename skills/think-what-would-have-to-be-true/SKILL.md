---
name: think-what-would-have-to-be-true
description: Converts a strategy, option, or contested claim into the specific conditions that would have to be true for it to be the best choice, rates each condition's confidence, and identifies which load-bearing assumptions to test first, producing an assumption ledger. Use when evaluating a strategic bet, or when a disagreement has become a clash of opinions rather than evidence.
license: Apache-2.0
metadata:
  id: thinking-framework-skills.what-would-have-to-be-true
  family: decision-and-option-evaluation
  evidence-tier: "P"
  version: 0.1.0
  standard: "0.8"
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# What Would Have to Be True

When a team debates whether an option is right, it becomes a clash of opinions and the loudest advocate tends to win. This skill flips the question: instead of "is this a good idea?", ask "what would have to be true for this to be the best choice?" That turns a position into explicit conditions, which can be rated for confidence and tested. It depersonalizes disagreement (we are not debating who is right, we are listing conditions and checking them) and separates what *would have to be true* from what *is* true. The output is an **assumption ledger** that ends by naming the one or two conditions worth testing before committing.

## When to Use

- Evaluating a consequential strategic bet or a specific option.
- A disagreement has hardened into competing opinions with no way to resolve it.
- A choice rests on optimistic or unstated assumptions.
- Often after options exist and before a final decision; pairs with a decision-comparison skill and with premortem.

## When NOT to Use

- Trivial or fully reversible decisions where the ceremony is not worth it.
- To generate options (use an ideation skill) or to choose among several at once (use a decision-comparison skill).
- As a substitute for actually testing the conditions; listing them is not validating them.

## Instructions

When asked what would have to be true, follow these steps:

1. **State the option or claim** under examination in one sentence (the thing whose conditions you will surface).
2. **Enumerate the conditions.** List the things that would have to be true for this to be the best choice. Push for the load-bearing and risky ones, not the easy, agreeable ones. Cover demand, economics, execution, competitive response, and stakeholder conditions.
3. **Mark which are load-bearing.** For each, note why the choice fails if it is false.
4. **Rate current confidence.** High / medium / low, with a reason. Be honest where you do not know.
5. **Say how each could be tested.** A cheap test, a signal, or the data that would confirm or kill it.
6. **Name the killer conditions.** Identify the one or two conditions that are both most load-bearing and least certain. These should be tested before committing.
7. **Emit the assumption ledger** per `references/TEMPLATE.md`.

## Output Format

Use the template in `references/TEMPLATE.md`. The deliverable is the ledger ending in the killer conditions, not prose.

## Quality Checklist

Before finalizing, verify:

- [ ] Conditions are framed as "would have to be true," not asserted as already true.
- [ ] The risky, load-bearing conditions are present, not just easy ones.
- [ ] Each condition has a confidence level and a way to test it.
- [ ] One or two killer conditions (load-bearing and uncertain) are named.
- [ ] The output is the ledger artifact, not prose.
- [ ] No overclaiming: this structures and tests the bet, it does not prove it (see `evidence/dossier.md`).

## Evidence

Tier **P**. A widely adopted strategy method from Lafley and Martin's *Playing to Win* (2013): reverse-engineer an option into the conditions under which it would be best, then test the ones you are least sure of. It has strong practitioner traction and sound hypothesis discipline, but no controlled evidence of improved outcomes, and the evidence is transferred from human strategy practice, not AI-validated. Full grading: `evidence/dossier.md`.

## Examples

See `references/EXAMPLE.md` for a completed assumption ledger.
