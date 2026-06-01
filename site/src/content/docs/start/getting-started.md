---
title: Getting started
description: What thinking-framework-skills is, who it is for, and how to run your first framework in a few minutes.
---

This is a library of **thinking frameworks rebuilt as skills** an AI agent can run, and that humans can follow by hand. Each one takes a messy situation and produces a concrete artifact: a ranked risk register, a weighted option matrix, an argument map, an honest base-rate estimate.

## Who it is for

- **Anyone making a real decision or stuck on a problem** who wants a structured move, not vibes.
- **Solo operators working with an AI** who want to get unstuck or decide well, now.
- **Skeptics** who want to check whether these methods are actually supported by evidence (spoiler: it is mixed, and we say so).
- **Agent and plugin builders** who want to call these skills programmatically.

## The fastest path: let the advisor choose

If you do not already know which framework you need, start with the **[Framework Advisor](../../frameworks/think-framework-advisor/)**. Describe your situation in plain language and it returns a *Thinking Plan*: the one or two frameworks worth running, in order, why each fits, and what to skip. It is the front door to everything else.

## Your first framework: a premortem

A [premortem](../../frameworks/think-premortem/) stress-tests a plan by imagining it has already failed and working backward to why, then turning each cause into a tripwire and a pre-decided response.

1. Pick a real decision you are about to commit to (a launch, a hire, a migration).
2. Run the skill (in Claude Code: `/think-premortem "we're about to ..."`), or follow its numbered steps by hand.
3. You get a ranked **risk register** with, for each top risk, a leading signal, a mitigation, an owner, and a kill criterion.

That artifact, not a feeling of caution, is the point.

## How to read these pages

Every framework page is layered so you can stop at any depth: a quick-facts card, the mechanism and procedure, a worked example, and the full evidence dossier with graded sources. See [How to read a page](./how-to-read-a-page/), and [The evidence model](./evidence-model/) for what the S/M/P/V/A/C/X tiers mean.

## Using these without an agent

You do not need an AI to use these. Each framework is a procedure you can run with a pen and the template on its page. The agent just makes the mechanism cheap to run and enforces the structure.
