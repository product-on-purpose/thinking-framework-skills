---
title: "Question Burst - quick sample"
description: Question Burst on a realistic situation - a senior engineer stuck on whether to keep firefighting a flaky checkout service.
sidebar:
  label: question-burst
---

> A compact worked example of [Question Burst](../../frameworks/think-question-burst/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-question-burst/).

## Situation

Daniel is a senior engineer at a 200-person company. The checkout service has gone down three times this quarter, each time a different root cause, and the team keeps shipping one-off patches. He has been told to "make checkout reliable" but every fix feels like it buys a week. He is stuck on the framing that this is a series of bugs to squash, and wants a better question before he commits another sprint to it.

## Prompt

```text
/think-question-burst "Checkout has failed 3 times this quarter, different cause each time, and we keep patching. I'm being told to make it reliable but I feel like I'm just whacking moles. Help me find the question I should actually be asking before I burn another sprint."
```

## The artifact

## Problem

- We keep patching checkout outages one at a time, and I am not sure "fix the bugs" is even the right frame.

## The burst (questions only)

- Why do three different root causes keep landing in the same service?
- What do the three outages actually have in common upstream?
- Are these independent bugs or symptoms of one structural weakness?
- What would "reliable" mean as a number we could agree on?
- Who decides when checkout is reliable enough to stop investing?
- What would have to be true for the next outage to be impossible, not just unlikely?
- What is the cheapest signal that tells us an outage is starting?
- How much of this is the code, and how much is the deploy and ownership model?
- What would we do if we were forbidden from touching the checkout code for a quarter?
- Which dependency, if it failed silently, would take checkout down again tomorrow?
- Who owns checkout end to end, and is that the same as who is paged?
- What did we learn from outage one that did not prevent outage two?
- Is the real cost the downtime, or the trust we lose with each repeat?
- What would a competitor who never has checkout outages be doing differently?

## Ranked by catalytic potential

| Rank | Question | Why it would change the approach |
|---|---|---|
| 1 | Are these independent bugs or symptoms of one structural weakness? | If it is one structural weakness, every per-bug patch is wasted effort and the real fix is architectural. |
| 2 | What would have to be true for the next outage to be impossible, not just unlikely? | Shifts the goal from faster patching to designing the failure class out, changing what we build. |
| 3 | How much of this is the code, and how much is the deploy and ownership model? | If the fault is organizational, no amount of code fixing will stop the repeats. |

## Next question to pursue

- **"Are these independent bugs or symptoms of one structural weakness?"** - it is upstream of every patch decision: answering it either redirects the whole effort toward one architectural fix or confirms these really are unrelated, and it is answerable by laying the three post-mortems side by side, which we already have.

---

*Note: the value is the ranking. A model can list these 14 questions instantly; the work was deciding that question 1 reframes the firefighting as a possible single structural fault, and feeding it into a root-cause or systems-mapping pass next. Evidence for Question Burst is tier P, transferred from human workshops and not AI-validated; treat the ranking as a prompt for judgment, not a verdict.*

## Why this framework fits

Daniel was locked into "these are three bugs to squash," and the burst surfaced the one question - whether they are one structural fault - that decides whether another sprint of patching is even worth starting. Unaided, he would have kept ranking fixes by ease; the artifact gives him a single catalytic question, chosen for how much it would change the approach, plus the cheap next move to answer it.
