---
name: think-red-team-light
description: Produces an adversarial critique by constructing the strongest case against a proposal or thesis (the best objections an intelligent adversary would raise), then judging which objections actually land and what would rebut them. Use when a plan has too-easy consensus and needs pressure-testing, or to steelman the opposition before committing.
license: Apache-2.0
metadata:
  id: thinking-framework-skills.red-team-light
  family: assumption-and-belief-challenge
  evidence-tier: "P"
  version: 0.1.0
  standard: "0.8"
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Red Team Light

Plans that reach easy consensus go untested. This skill suspends the cooperative stance and constructs the strongest case against a single proposal or thesis: the best objections a motivated, intelligent adversary would raise (steelman, not strawman), then judges which land and what would rebut them. The output is an **adversarial critique**. Honest limit: an AI red team is constructed, role-played dissent, and role-played dissent does not match genuine dissent (Nemeth) - so for high stakes it flags whether a real dissenting view should be sought, not just the model's.

## When to Use

- A plan has too-easy consensus and nobody is really arguing the other side.
- Before committing to a strong thesis or recommendation.
- To pressure-test the agent's own confident output.

## When NOT to Use

- When the team needs alignment and buy-in more than another critique.
- When you need failure causes over time (use premortem) or a rounded multi-lens view (use parallel perspectives).
- If it would only produce performative contrarianism rather than the strongest objections.

## Instructions

When asked to red team, follow these steps:

1. **State the thesis fairly** in one or two sentences - the proposal being attacked, in its strongest honest form.
2. **Build the strongest objections.** Adopt a genuinely adversarial stance and construct the best case against it: where it is weakest, what an informed critic or competitor would attack, what evidence cuts against it. Steelman, do not strawman.
3. **Rank by force.** Order the objections by how much damage they do if true, not by how easy they are to raise.
4. **Test each.** For the top objections, state how the thesis would have to answer them, and whether it plausibly can.
5. **Verdict.** Say which objections are decisive (would sink or substantially change the plan) and which are survivable. For high stakes, note whether a real, independent dissenting view should be sought, given this is constructed dissent.
6. **Emit the critique** per `references/TEMPLATE.md`.

## Output Format

Use the template in `references/TEMPLATE.md`. The deliverable is the ranked objections with verdicts, not prose.

## Quality Checklist

Before finalizing, verify:

- [ ] Objections are steelmanned (strongest form), not strawmen.
- [ ] They are ranked by force, not by ease.
- [ ] Each top objection has how the thesis must answer it.
- [ ] The verdict names which objections are decisive.
- [ ] It notes whether genuine (not constructed) dissent should be sought for high stakes.
- [ ] The output is the adversarial critique artifact, not prose.

## Evidence

Tier **P** (flagged). Adversarial review (red teaming, from military/intelligence/security practice) surfaces objections cooperative review misses. But Nemeth et al. (2001) found role-played dissent does not replicate the reasoning gains of authentic dissent, and an AI red team is constructed dissent, so it is a blind-spot finder, not a substitute for a real dissenter. Evidence is transferred from human contexts, not AI-validated. Full grading: `evidence/dossier.md`.

## Examples

See `references/EXAMPLE.md` for a completed critique.
