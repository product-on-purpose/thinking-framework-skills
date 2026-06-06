---
name: think-top3
description: Produces a worked three-framework analysis of a topic. Ranks the library's thinking frameworks for relevance, applies the top three so each emits its real artifact, and reconciles them into one cross-framework synthesis. Use when a decision, problem, or stuck point deserves more than one lens and the goal is worked output now rather than a plan of which methods to run later. Use when several frameworks plausibly fit and the most relevant few should be ranked, executed, and integrated into a single read.
license: Apache-2.0
metadata:
  id: thinking-framework-skills.top3
  family: meta-thinking-and-reflection
  evidence-tier: "C"
  version: 0.1.0
  standard: "0.8"
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Top 3

Most thinking tools name or recommend a method. This one runs three. It ranks the library's frameworks for relevance to your topic, takes the most relevant three, applies each to the topic so it emits that framework's real artifact, and then reconciles the three into one integrated read. The distinct move is execution at a fixed count of three, plus the cross-framework synthesis: not "here are the methods to consider", but "here is what three fitting methods, worked end to end, jointly say about this".

## When to Use

- A real decision, problem, or stuck point where one lens is not enough and you want worked output now, not a routing plan.
- Several frameworks plausibly apply and you want the most relevant few ranked, executed, and integrated rather than chosen for you.
- You want the combined read: where the strongest-fitting methods agree, conflict, and converge on a next move.

## When NOT to Use

- **You do not yet know whether you need three frameworks, or might need none.** Use `think-framework-advisor`; it subtracts to the fewest fitting moves (often zero to two). This skill force-applies exactly three and will manufacture work on a problem that needs one move or none.
- **You already know the single framework you want.** Run that skill directly, for example `think-premortem`. This skill adds two frameworks you did not ask for.
- **A known multi-step chain already fits the job.** Use the relevant recipe (reframe-problem, expand-options, stress-test-decision, audit-reasoning); recipes are curated, sequence-checked chains. This skill is an ad-hoc relevance-ranked set with no validated sequence.
- **You are stuck and want unexpected lenses to break a frozen framing.** That is the opposite selection rule; use `think-random-frameworks`.
- **Not a thinking task** (lookup, drafting, coding): redirect.

## Instructions

When asked for the top three frameworks applied to a topic, follow these steps:

1. **Parse the topic.** Restate the situation in one or two sentences. If the input is under about 15 words or carries no concrete signal, ask one clarifying question, then proceed.
2. **Run the shared engine in RANK mode.** Follow `references/engine.md`: read the corpus, score every entry for relevance, take the top three (deduped by cognitive job), and apply each framework to the topic so it emits that framework's real artifact, honoring each one's When NOT to Use.
3. **Synthesize.** Reconcile the three artifacts into one integrated read: where they converge, where they conflict, and the single most load-bearing conclusion for the topic.

## Output Format

Use the template in `references/TEMPLATE.md`. The deliverable is the three named-and-justified frameworks, the three filled artifacts, and the cross-framework synthesis, not a prose essay and not a list of recommendations.

## Quality Checklist

Before finalizing, verify:

- [ ] Exactly three frameworks, each with a name that exists in the recommendable corpus and a one-line reason it ranked.
- [ ] Each framework was applied, emitting its real artifact, not merely named or recommended.
- [ ] The three do different cognitive jobs (no near-duplicate lenses); any when-NOT no-fit was swapped out and noted.
- [ ] A cross-framework synthesis reconciles convergence, conflict, and the load-bearing conclusion.
- [ ] No tier inflation: each framework's evidence tier is carried honestly; applying three does not multiply confidence.

## Evidence

Tier **C** (conceptually plausible, under-tested). Applying a fitting structured method to a decision is well-supported per method, but neither the relevance ranking nor the fixed-three-then-synthesize contract has been measured, in humans or in AI use. Treat the selection as a useful starting hypothesis and trust the individual frameworks' own tiers (carried from each skill) over this meta-skill's. Full grading and caveats: `evidence/dossier.md`.

## Examples

See `references/EXAMPLE.md` for a completed run that ranks, applies, and synthesizes three frameworks on a real topic.
