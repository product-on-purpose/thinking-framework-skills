---
title: FAQ
description: Short, honest answers to the common questions about thinking-framework-skills - what it is, whether the methods work, what the evidence tiers mean, and how to use, install, and contribute.
---

## What is this, in one sentence? How is it different from a list of mental models?

It is a library of thinking methods rebuilt as skills an AI agent can run and a human can follow by hand, where each one ends in a concrete artifact (a ranked risk register, a weighted option matrix, an argument map). A mental-models list tells you a concept exists; here every entry is a bounded procedure that produces a named, reusable output. See [Getting started](../../start/getting-started/).

## Do these frameworks actually work?

The evidence is mixed, and we say so on every page. A handful rest on strong, replicated research; most are widely-used practitioner methods that are defensible without controlled proof; and we name what each method does *not* establish. Read [The evidence model](../../start/evidence-model/) for the full honest picture.

## What do the evidence tiers (S/M/P/V/A/C/X) mean?

They grade the evidence behind each method's mechanism: S strong research, M moderate, P practitioner, V vendor, A anecdotal, C conceptually plausible but under-tested, X poor or contradictory (excluded, documented). A method labeled P is still worth running; it is just labeled honestly. Full definitions are in [The evidence model](../../start/evidence-model/).

## How do I pick the right framework?

Start with the [Framework Advisor](../../frameworks/think-framework-advisor/). Describe your situation in plain language and it returns a short plan: the one or two frameworks worth running, in order, and what to skip.

## Can I use these without an AI agent?

Yes. Each framework is a procedure you can run with a pen and the template on its page. The agent just makes the mechanism cheap to run, enforces the structure, and produces the artifact.

## Why do some pages say "when NOT to use this"?

Because a method run in the wrong situation misleads, and naming where it breaks is part of grading honestly. Every skill states its failure modes to guard against cargo-cult execution - running the ritual without the judgment it depends on.

## Why is there no Six Thinking Hats / SWOT / [popular method]?

A library that grades honestly has to say no: a method earns its place by adding a distinct, durable cognitive move, or it stays out. Some popular names are rituals on top of a move we already ship, and some (like SWOT) sit on weak or contradictory evidence. See [Why not Six Thinking Hats, SWOT, ...](../why-not/) for the per-method reasons.

## How do recipes work? How do I compose skills?

A recipe chains a few skills into one workflow for a recurring job, like stress-testing a decision or auditing reasoning, so the artifact from one feeds the next. Browse the [recipes](../../recipes/), and see [Composing skills](../../learn/composing/) for how to sequence them yourself.

## How do I install and call these from Claude Code or an agent?

Each skill installs as a `think-<method>` skill and runs from a slash command (for example `/think-premortem "..."`). The end-to-end install and invocation steps are in [Build with the library](../../learn/build-with-the-library/).

## Is the evidence about AI using these, or humans?

Almost all of it comes from human-subject studies; very little tests an AI agent running the method, and the page says so where that is the case. Treat the agent's value as making the mechanism cheap to run, enforcing the structure, and producing a durable artifact - not as a separately proven claim. This transferred-evidence flag is explained in [The evidence model](../../start/evidence-model/).

## How do I contribute or suggest a framework?

A candidate has to clear the selection bar: a distinct durable move, an honest evidence grade, a concrete artifact, and an explicit "when not to use." See [Contributing](../contributing/) for how to propose one.
