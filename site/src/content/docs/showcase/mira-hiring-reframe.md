---
title: "Mira reframes a hiring decision"
description: A seed-stage founder stuck on who to hire for her first engineering role types one casual line and gets a frame set that turns "who do I hire" into "what capability are we missing and what is the cheapest way to close it."
sidebar:
  label: "Mira -> problem restatement"
---

> **Mira**, solo founder of an 8-person seed-stage startup. The decision: who to hire for the first dedicated engineering role. Prompting style: casual.

This is a complete run, prompt to artifact. Framework: [Problem Restatement](../../frameworks/think-problem-restatement/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

Mira has been carrying engineering herself and the team finally agreed it is time for the first dedicated hire. She has two strong-but-different candidates in mind and keeps flip-flopping between them. Before she opens a req, she wants to check she is even asking the right question.

## The prompt

```
/think-problem-restatement "stuck on who to hire for our first real eng role.
torn between a senior backend person and a scrappy full-stack generalist.
8 people, seed stage, i'm the founder and i've been doing all the eng."
```

That is the whole prompt. One situation, the two candidates she is torn between, just enough context. The framework supplies the rest.

## The output

> **Problem Frame Set - First engineering hire**

## Problem as given

- **Stated problem (verbatim):** "Stuck on who to hire for our first real eng role. Torn between a senior backend person and a scrappy full-stack generalist."
- **Framed by:** Mira (founder), currently the only engineer.
- **Flags:** Names a presupposed solution ("hire a person, pick one of these two") for an unstated goal. Frames the choice as backend-vs-generalist before establishing what work actually needs doing. The decision is treated as a one-way person hire, not as a capability question. No view yet from what the product roadmap or the rest of the team needs.

## Restatements

| # | Restated problem | Move used | Why this might be the real problem |
|---|---|---|---|
| 1 | What does the company most need to be able to do in the next 6-12 months that it cannot do today? | altitude up (goal) | The hire is a means; the objective is a missing capability. Naming it changes who, or what, closes the gap. |
| 2 | Which specific engineering work is currently blocked or only-Mira can do, and how much of it is there? | altitude down (concrete) | The real failing may be a concrete bottleneck (Mira is the single point of failure) rather than an abstract "we need an engineer." |
| 3 | What is the cheapest way to close our biggest engineering capability gap? | goal vs implementation | "Hire one of these two people" is one implementation. The goal is closing a gap, which a contractor, a fractional lead, or unblocking Mira might also do. |
| 4 | What does the team need this role to take off their plates and Mira's, day to day? | stakeholder shift (the 7 others) | Surfaces what the people already here actually need owned, which neither candidate profile was chosen against. |
| 5 | How would we guarantee this first hire is the wrong one? | inversion | Exposes the assumptions: that the gap is permanent and full-time, that it is one person, that backend-vs-generalist is the axis that matters, that Mira knows the gap before defining it. |
| 6 | This is a problem of an undefined capability gap; it is NOT yet a problem of choosing between two named candidates. | is / is not | Bounds scope and challenges the leap from "we should hire" straight to "pick A or B." |

## How Might We angles

- How might we name the specific capability we are missing before we name a person?
- How might we close the biggest gap with the least irreversible commitment?
- How might we test whether the gap is full-time and permanent before opening a full-time req?
- How might we unblock Mira as the single point of failure, whether or not that means a hire?

## Chosen working frame

- **Working frame:** "What engineering capability are we missing, how big and how permanent is the gap, and what is the cheapest way to close it?"
- **Why:** It keeps the real goal (closing a capability gap) central and demotes "pick the senior backend person or the generalist" from a given to one option among several. The two-candidate framing only makes sense after the gap is named; defining the gap may even tell Mira which profile fits, or that a full-time hire is not the cheapest move yet.
- **Hands off to:** name the capability gap concretely, then option generation on ways to close it (hire full-time, fractional/contract, unblock Mira), then a decision skill to choose, then write the role against the chosen capability.

## Why this prompt worked

Mira named the **decision** ("who to hire") and the **two options** she was stuck between, in two casual sentences. That was enough for the framework to do its real job: notice that "who do I hire" presupposes a person and a full-time req, and pull the question up one level to the capability gap underneath. She did not have to know she was asking the wrong question, only describe the one she was stuck on.

## What happened next

The reframe stopped Mira from opening a req she would have regretted. She spent an afternoon writing down the concrete engineering work that was blocked or only she could do, and the gap turned out to be narrower and more backend-shaped than the generalist-vs-senior debate implied, which quietly settled the candidate question she had been agonizing over. It also surfaced that a chunk of the gap was "Mira is the only one who can deploy," which a week of documentation closed for free. Next in her thread: with the role defined, she was not sure she was reading the cheapest-way-to-close-it options fairly, so she described the situation to the [framework advisor](../../tools/think-framework-advisor/) and ran the plan it returned.
