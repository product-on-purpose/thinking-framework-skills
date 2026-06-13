---
title: Using the frameworks
description: The operating guide. How to invoke a framework, describe your situation well, work with the artifact, chain frameworks, and use the power-user patterns. Read top to bottom once, then keep it as reference.
sidebar:
  order: 1
---

This is the manual for operating the library well. It goes from "I can run one framework" to "I run, iterate, chain, and customize like a power user." Read the tier you need and stop; the later tiers are here when you want them.

A framework here is not advice. It is a **procedure** an agent runs (or you run by hand) that ends in a concrete **artifact**: a ranked risk register, a weighted option matrix, an argument map. The artifact is the point.

---

## Beginner

### Anatomy of a framework page

Every [framework page](../../frameworks/) is layered so you can stop at any depth: a 20-second quick-facts card (the mechanism, the artifact, the evidence tier, when to use and when not), then the procedure and output format, then a worked example, then the full evidence dossier. You never have to read the whole page to use the framework.

### Basic invocation

With an agent (Claude Code shown), call the skill by name with your situation:

```
/think-premortem "we're about to launch a free tier to drive signups"
```

By hand, open the framework page, copy its `references/TEMPLATE.md`, and follow the numbered procedure with a pen. The numbered steps *are* the method; the agent just makes them cheap to run and enforces the structure. See [running by hand](../../start/getting-started/) for the full workflow.

### Describing your situation well (the SOFT check)

The framework supplies the structure. Your only job is to supply the situation. A good prompt usually has four things - remember **SOFT**:

- **S - Situation:** the real decision or problem, in one sentence, with the stakes.
- **O - Options and constraints** you already know (budget, deadline, what is ruled out).
- **F - Facts versus unknowns:** what you actually know, and what you are guessing.
- **T - Target:** what a good artifact would let you do next.

You do not need all four, and you do not need polish. A sparse prompt works because the framework, not the prompt, structures the output. The most common mistake is describing the *framework* instead of the *situation* - say what you are deciding, not how you think it should be analyzed.

### Working with the artifact

The output is a document, not a chat reply. Save it. Put the risk register in the launch doc; paste the option matrix into the decision record. The value compounds when the artifact lives where the decision is made.

---

## Intermediate

### Iterating on an artifact

The first artifact is a draft. Push on it in plain language: "rank these by reversibility, not just impact," "the second risk is the real one - expand its mitigation," "add an owner column." Specificity in the ask drives specificity in the artifact.

### Chaining frameworks

The output of one framework is often the input to the next. Reframe a problem, *then* generate options against the new frame; compare options, *then* premortem the winner. When you copy an artifact into the next prompt, copy the part that matters (the chosen frame, the top three risks), not the whole thing.

### Letting the advisor sequence for you

If you do not know which framework, or which order, describe the situation to the [Framework Advisor](../../tools/think-framework-advisor/). It returns a short Thinking Plan: the one or two frameworks worth running, in order, why each fits, and what to skip. It is the front door - use it whenever you are unsure, and overrule it when you have a reason.

### Using a recipe instead of building a chain

When a chain recurs, it is a [recipe](../../recipes/): a fixed sequence shipped as one workflow. [Stress-test a decision](../../recipes/stress-test-decision/) runs What-Would-Have-to-Be-True, then a comparison, then a premortem. Reach for a recipe when your situation matches its job; build your own chain when it does not.

---

## Advanced

### Power-user patterns

Named moves that combine frameworks for a recurring need:

- **The Pre-Commit Gate.** Before any one-way-door decision, compare the options, then run a [premortem](../../frameworks/think-premortem/) on the winner. Deciding and stress-testing are different jobs; do them in that order.
- **The Steelman Swap.** Before committing to the position you favor, argue the one you reject as well as you can ([argument mapping](../../frameworks/think-argument-mapping/) or a red-team pass). If it survives, you are more sure; if it does not, you just saved yourself.
- **The Evidence Check.** Before you quote a number a framework produced, open its dossier. The library grades its own evidence; a "30% better" figure usually means something narrower than it sounds.
- **The Frame-First Rule.** When stuck, suspect the framing before the options. [Restate the problem](../../frameworks/think-problem-restatement/) or audit its boundary before generating solutions to the wrong question.

### Cross-referencing artifacts across one decision

A real decision produces several artifacts - a problem frame, an option matrix, a risk register. Keep them together and let them reference each other: the register stress-tests the option the matrix chose, against the frame the restatement set. The connected trail is worth more than any single artifact, and it is what the [Showcase](../../showcase/) demonstrates end to end.

### Integrating into your process

The frameworks earn their keep when they become habits, not one-offs. A [decision journal](../../frameworks/think-decision-journal/) before commitments and an after-action review afterward turn single runs into calibration over time.

---

## Reference

### By the job you need done

| If you need to... | Start with | Or the recipe |
|---|---|---|
| Make a hard decision | Decision Option Review; Expected-Value Decision Tree | [stress-test-decision](../../recipes/stress-test-decision/) |
| Reframe a stuck problem | [Problem Restatement](../../frameworks/think-problem-restatement/) | [reframe-problem](../../recipes/reframe-problem/) |
| Generate real options | SCAMPER; Brainwriting; Morphological Analysis | [expand-options](../../recipes/expand-options/) |
| Stress-test a plan | [Premortem](../../frameworks/think-premortem/); Red Team Light | [stress-test-decision](../../recipes/stress-test-decision/) |
| Audit your reasoning | Evidence-vs-Inference Sort; [Argument Mapping](../../frameworks/think-argument-mapping/) | [audit-reasoning](../../recipes/audit-reasoning/) |

Do not know which? The [Framework Advisor](../../tools/think-framework-advisor/) picks for your specific situation. Or browse [the six explore lenses](../../explore/) (by job, by situation, by evidence, by artifact, the chooser, the map).

### Next steps

You have the moves. Now: read the [Prompt Gallery](../prompt-gallery/) to see real prompts in three styles, watch a full decision in the [Showcase](../../showcase/), and check [whether this actually works](../../start/does-this-work/) - the library measures its own routing and output quality, and publishes the numbers.
