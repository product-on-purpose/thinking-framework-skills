---
title: "Mira asks the advisor where to start"
description: A seed-stage founder facing a bridge-round-versus-cut-burn decision does not know which framework she needs, so she describes the mess in one casual line and gets back a prioritized Thinking Plan.
sidebar:
  label: "Mira -> framework advisor"
---

> **Mira**, solo founder of an 8-person seed-stage startup. The decision: raise a bridge round or cut burn to extend runway. Prompting style: casual.

Tool: [Framework Advisor](../../tools/think-framework-advisor/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

Mira has nine months of runway and a board nudging her toward a bridge round, but raising now means a flat or down valuation and a smaller team if she has to cut later anyway. She is not stuck on how to *run* a framework - she does not even know which one this is. She knows she is about to make a big, hard-to-undo call and she wants someone to tell her where to start.

## The prompt

```
/think-framework-advisor "messy one. ~9 months runway. board wants me to raise a
bridge but it'd be flat or down and i'm not sure we've earned the next milestone
yet. other option is cut burn hard and stretch to 15 months. honestly not sure
i'm even asking the right question. which of your tools should i use?"
```

That is the whole prompt. No structure, no stakes spelled out, just the mess and a plea for a starting point. The advisor's job is to diagnose what kind of thinking this needs and hand back a plan, not a framework.

## The output

> **Thinking Plan - Bridge round vs cut burn**

**Dominant job:** Reframe the question, then test the load-bearing assumption. Not "decide between two options" yet.

**Input mirror.** You have roughly 9 months of runway. The board is pushing a bridge that would price flat or down, you are not convinced you have hit the milestone that would justify raising, and the alternative is cutting burn to stretch to about 15 months. The line that matters most: you are not sure you are asking the right question. *(confidence: High)* Adjacent thing I noticed but did not assume: "cut burn" probably means a smaller team, which may be its own decision with its own stakeholders.

**Stakes x reversibility.** One-way door (a down round and a layoff are both hard to walk back, and both are public) x high stakes (the company's runway and team). That justifies more rigor - but two frameworks, not the whole gauntlet. Plan confidence: **Medium**, because the dominant-job call rests partly on your own hunch that the question is wrong.

**Step 1 - `think-problem-restatement` (reframe).** You have framed this as a binary, raise-or-cut, but you said the quiet part: you suspect that is not the real question (your own words, not my read of the topic). Restatement rewrites the problem several ways - "how do we survive to the next milestone," "what is the cheapest way to buy 6 more months," "what would make a raise un-flat" - and surfaces the options hiding between your two. I am choosing it over abstraction laddering because your issue is a *pre-narrowed choice set*, which restatement attacks head-on, not a wrong altitude. **Evidence tier M/P:** reframing reliably changes the option set; "more frames equals a better decision" is not a hard finding. **Artifact:** 4-6 alternative framings, the strongest one chosen, and the options each implies. **Run it with:**

> "Restate this problem several ways and pick the strongest frame: we have ~9 months runway, the board wants a flat/down bridge, and the alternative is cutting burn to reach 15 months. I suspect raise-or-cut is the wrong framing. Surface other framings and the options each one implies."

**Done looks like:** you have a chosen frame and at least one real option that is neither "take the bridge" nor "cut hard." **Feeds into Step 2.**

**Step 2 - `think-what-would-have-to-be-true` (test the assumption).** Whichever path the reframe leaves you on rests on one untested belief: that you will reach the milestone that makes the *next* raise clean. This converts that belief into the specific conditions that must hold and flags the one whose failure sinks the plan, so you can go check it before you commit. I am choosing it over an evidence-vs-inference sort because you do not just need the assumption *labeled* - you need it turned into a condition you can test. **Evidence tier P:** a disciplined way to make hidden conditions explicit and checkable. **Artifact:** a list of must-be-true conditions with the load-bearing, uncertain one flagged. **Run it with:**

> "For the path we keep after reframing, list what would have to be true for it to work, especially that we hit the milestone that makes our next round clean. Flag the conditions that are both load-bearing and uncertain."

**Done looks like:** you can name the single condition that, if false, kills this - and a cheap way to test it before deciding. **Feeds into:** your actual go decision.

**What NOT to use, and why.**
- **Not [decision-option-review](../../frameworks/think-decision-option-review/) yet.** It scores options against weighted criteria, but right now you have a forced binary and a hunch the framing is wrong. Comparing two options you do not trust is theater. It becomes the right tool *after* Step 1 gives you real alternatives - run it then, before you commit.
- **Not [a premortem](../../frameworks/think-premortem/) yet.** Tempting on a scary call, but a premortem stress-tests a plan you have chosen. You have not chosen one. Borrow it later, once Step 2 leaves you with a path to pressure-test.
- **Cut by the stakes calibrator:** high stakes tempt over-tooling. I am deliberately not adding a scenario set or a reference-class forecast now. Reference-class forecasting is genuinely worth it once you have a runway-extension number to sanity-check (after Step 2) - hold it as an optional Step 2.5.

**An honest note on this routing.** The frameworks I am pointing you to are better-evidenced than the *routing itself*. Picking the right method for your situation has never been measured - treat this sequence as a strong starting hypothesis you can challenge, not a verified answer. If reframing surfaces a third path I did not anticipate, follow it.

## Why this worked

Mira did not have to guess a tool, and guessing would have sent her straight to an options comparison - the wrong move, because her real problem was that the two options were the wrong set. Describing the mess in plain language let the advisor catch the one load-bearing line ("not sure I'm asking the right question") and route to a reframe first. The value was in the subtraction: two frameworks in order, with the obvious-looking ones explicitly deferred.

## What happened next

Mira ran Step 1 that afternoon. [Problem restatement](../../frameworks/think-problem-restatement/) reframed "raise or cut" into "what is the cheapest way to reach the milestone that makes the next round clean," and a third option fell out that neither she nor the board had named: a small, targeted cut plus a short customer-revenue push that bought four months without a down round at all. She carried that frame into Step 2 to test whether the milestone was actually reachable, and only then planned to bring options back to the board - this time with three, not two.
