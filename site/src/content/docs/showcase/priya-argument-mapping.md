---
title: "Priya audits the argument in a proposal"
description: A policy analyst feeds a persuasive single-issue memo into argument mapping and gets the conclusion's full structure - reasons, hidden co-premises, objections, rebuttals, and the one load-bearing premise the whole case rests on.
sidebar:
  label: "Priya -> argument mapping"
---

> **Priya**, policy analyst at a government agency. The decision: whether to advance a staff memo recommending the agency adopt a mandatory disclosure rule. Prompting style: detailed.

This is a complete run, prompt to artifact. Framework: [Argument Mapping](../../frameworks/think-argument-mapping/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

A program office sent Priya a four-page memo arguing the agency should adopt a new rule requiring covered firms to publicly disclose their data-breach response times. The memo reads well - it is confident, cites a few studies, and the recommendation feels earned by the time you reach it. Priya's job before the review meeting is not to agree or disagree but to make the argument's structure explicit, so the reviewers can see exactly what the conclusion rests on rather than being carried by the prose.

## The prompt

```
/think-argument-mapping

Map the argument in this single proposal memo. I do not want a critique of the
policy, and I am not comparing it against alternatives - I only want this one
memo's internal argument laid out as a structure so my review panel can see what
the conclusion actually depends on.

Context:
- Author: our Market Conduct program office.
- Contention (the memo's recommendation): the agency should adopt a rule
  requiring covered firms to publicly disclose their average data-breach
  response time each year.
- The reasons the memo gives, in order:
  1. Mandatory disclosure pushes firms to improve response times, because
     public numbers create competitive and reputational pressure.
  2. Faster breach response reduces consumer harm (less data exposed per breach).
  3. Two peer agencies adopted similar disclosure rules and reported
     "positive results."
  4. The rule is low-cost to firms because they already track this metric
     internally.
- Objections the memo acknowledges: it briefly notes firms might "game" the
  metric, then says the agency can refine definitions later.

For each reason, surface the unstated co-premise it silently needs. Add the
strongest objections to the contention, with any rebuttal the memo offers. Then
flag the load-bearing premises that are unsupported, and give a verdict on
whether the structure holds.
```

A detailed prompt: the contention named, the reasons enumerated in the memo's own order, the one objection the memo concedes, and an explicit instruction to keep the analysis to this proposal's internal logic rather than weighing it against other options.

## The output

> **Argument Map - Mandatory breach-response-time disclosure memo**

## Contention

- The agency should adopt a rule requiring covered firms to publicly disclose their average annual data-breach response time.

## Map

- **Reason 1:** Mandatory public disclosure pushes firms to improve response times through competitive and reputational pressure.
  - *Co-premise (unstated):* Response time is a metric the public and the market will actually read, compare, and reward or punish - i.e. customers choose firms partly on this number.
  - *Objection:* Reputational pressure only bites where buyers see and act on the metric; in concentrated or low-switching markets it may not move behavior. -> *Rebuttal:* None offered in the memo.
- **Reason 2:** Faster breach response reduces consumer harm, because less data is exposed per breach.
  - *Co-premise (unstated):* "Average response time" is a faithful proxy for the harm we care about - that a lower average means less actual consumer harm, not just a different mix of breaches.
  - *Objection:* A firm can lower its average by responding fast to trivial breaches while the severe ones (where harm concentrates) are unchanged. -> *Rebuttal:* The memo's "refine definitions later" line gestures at this but does not answer it.
- **Reason 3:** Two peer agencies adopted similar rules and reported positive results.
  - *Co-premise (unstated):* Those agencies' markets, firm populations, and enforcement context resemble ours closely enough that their result transfers.
  - *Objection:* "Positive results" is unspecified - it may mean compliance rates, not actual harm reduction, and the peer contexts may differ materially.
- **Reason 4:** The rule is low-cost to firms because they already track this metric internally.
  - *Co-premise (unstated):* Internal tracking equals public-reporting readiness - that the cost is only in disclosure, not in standardizing definitions, auditing the number, and defending it.
  - *Objection:* A number that is now public and enforceable is not the same artifact as an internal operational metric; standardization and assurance are the real cost.
- **Objection to the contention:** The metric is gameable - firms can optimize the reported average without improving real response - so the rule may produce the appearance of progress while consumer harm is unchanged. -> *Rebuttal:* The memo concedes this and defers it ("the agency can refine definitions later"), which assumes a fix exists and will be applied, but does not show one.

## Weak links and unsupported premises

| Link or premise | Problem | What it would need to hold |
|---|---|---|
| Co-premise of Reason 2 (average time is a faithful harm proxy) | Load-bearing: the entire consumer-protection case rests on it, and a gameable average can move without harm moving | A severity-weighted or per-breach definition shown to track actual consumer harm |
| Reason 3 -> contention (peer transfer) | "Positive results" is undefined and assumes comparable markets; imitation is not evidence | Specifics of what the peer agencies measured, and that their context resembles ours |
| Co-premise of Reason 1 (the market reads and rewards the metric) | Asserts a behavioral response that may not occur in low-switching markets | Evidence buyers see, compare, and act on this disclosure |
| Conceded objection (gaming) -> deferred rebuttal | The strongest objection is acknowledged but answered with a promise, not a mechanism | A definition or audit design that resists gaming, in the rule itself, not "later" |

## Verdict

The structure does not yet hold. The contention follows only if the Reason-2 co-premise is true - that the average response time is a faithful proxy for consumer harm - and that premise is both load-bearing and directly undercut by the gaming objection the memo concedes but does not answer. Reason 3 is imitation presented as evidence, and Reason 1 assumes a market response it never establishes. The memo is persuasive but currently unsound: for the recommendation to follow, the disclosed metric must be defined so a better number means less real harm, and that single premise is exactly the one left unsupported.

## Why this prompt worked

Priya named the contention and listed the reasons in the memo's own order, so the map could attach a co-premise to each one rather than guess at the argument. Telling the framework to stay inside this one proposal - not to critique the policy or compare alternatives - kept the output a structure of the memo's logic, which is precisely what a review panel can act on. The detail she front-loaded is why the map surfaced the gaming objection as load-bearing instead of leaving it as the throwaway line the memo treated it as.

## What happened next

Priya carried the map into the review meeting unchanged. It reframed the discussion in one move: instead of debating whether the rule was a good idea, the panel debated the single premise the map flagged as load-bearing and unsupported - whether an average response time actually tracks consumer harm, or just rewards firms for closing trivial breaches fast. The program office agreed to revise the memo with a severity-weighted definition and to specify what the two peer agencies had actually measured before the recommendation went up the chain. Nothing was rejected; the argument was made answerable. Next in her thread: with the memo's logic exposed, Priya wanted to weigh whose interests the rule served and at what cost, and reached for the [framework advisor](../../tools/think-framework-advisor/) to sequence that work.
