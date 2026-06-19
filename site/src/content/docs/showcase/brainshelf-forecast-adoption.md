---
title: "Brainshelf forecasts digest adoption from the outside"
description: Before setting an OKR, the base rate for daily-digest open rates instead of a hoped-for number.
sidebar:
  label: "Brainshelf -> forecast"
---

> **Theo Almeida**, founder and CEO of Brainshelf, a 20-person consumer notes app. The decision: what adoption target to set for "Resurface," a morning digest shipping next quarter. Prompting style: casual.

This is a complete run, prompt to artifact. Framework: [Reference Class Forecasting](../../frameworks/think-reference-class-forecasting/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

Brainshelf has 22K monthly actives out of ~140K registered, and Theo's metric of record is D30 retention. Resurface is the next-quarter bet: a morning digest that resurfaces old notes and saved items. Nina Park, the engineer who would build it, has about a month of runway scoped. Before Theo sets a goal, he wants a number he can defend. The trouble is there is no comparable in-app digest in the product yet, so he has no internal data to anchor on, and he flatly refuses to make one up. Roughly 8% of users keep notifications on today, which he suspects is the real ceiling. He types the question the way he thinks it.

## The prompt

```
/think-reference-class-forecasting "before we set a goal for Resurface i don't want to make up a
number. of our 22k users, what share will actually open a daily digest? what do comparable
digest / morning-summary / notification features actually get?"
```

That is the whole prompt. Casual, first person, the decision and the thing he refuses to do (invent a number). The framework supplies the outside view.

## The output

> **Reference-Class Estimate - Resurface daily-digest adoption**

## What is being forecast

- **Quantity:** the share of Brainshelf's 22K monthly actives who open the Resurface daily digest in a given week (the open / engagement rate), and what that implies for a launch OKR.
- **Inside-view estimate (if any):** none committed on purpose. Theo's gut ceiling is "~8%, because that is how many keep notifications on," but he has refused to set a target off a hoped-for number, which is why this run exists.

## Reference class

- **The class:** published engagement rates for recurring consumer digest / morning-summary / re-engagement features that arrive by push or email - daily-summary push notifications in consumer apps, "on this day" / resurfacing features (photos, social), and editorial morning-briefing digests. Brainshelf has no in-product digest of its own, so the class is necessarily external precedents, not Brainshelf's own history.
- **Why comparable:** all are unprompted, recurring, low-commitment nudges to re-open an app or read a summary the user did not explicitly request that morning - the same behavior Resurface asks for. The class is deliberately not narrowed to a single flattering success story (e.g. one viral "On This Day" launch); it spans typical performers so the base rate is not cherry-picked.

## Base rates

- **Data source:** FLAG - external proxies, not Brainshelf data. These are published industry ranges for consumer push-notification open rates and recurring email-digest engagement, plus reported figures for resurfacing features. They are real, but they are other companies' numbers; Brainshelf has zero internal base rate because Resurface does not exist yet. Treat the numbers as a directional outside view, not a measured fact about Brainshelf's users.
- **Typical outcome:** recurring daily-digest and summary features in consumer apps commonly see single-digit to low-double-digit weekly open rates among the eligible base - roughly 5% to 15% engaging in a typical week once novelty fades. Brainshelf's own ~8% notification opt-in rate sits squarely inside that band and acts as a hard upper bound on push-delivered reach.
- **Worst-case / tail:** the realistic bad end is a digest that spikes for a week or two on novelty, then settles to 2% to 4% sustained while quietly raising mute and uninstall rates - the "naggy notification people turn off" failure. A few resurfacing features do break 20%, but those are the flattering tail, not the median, and depend on content people already love (photos of their kids), which Brainshelf has not demonstrated for old notes.

## Outside-anchored estimate

- **Anchored estimate (range):** ~5% to 12% of monthly actives opening Resurface in a typical week after the novelty period - centered around 8%, capped by the current notification opt-in ceiling.
- **Conservative adjustment for specifics:** two small, justified nudges, no return to optimism. Down: only ~8% keep notifications on, so push-delivered reach cannot exceed that without first moving opt-in; an in-app or email surface could lift the ceiling but is not yet built. Slight up: Resurface targets engaged actives (people who already save notes), a more receptive audience than a cold base, which nudges the engaged-cohort rate toward the upper half of the band. Resisted the inside-view pull to assume "our users love their notes, so this will overperform the class."
- **Final forecast:** ~5% to 12% weekly open rate post-novelty, with a planning center near 8%, low-to-moderate confidence. The main uncertainty is the notification opt-in ceiling and whether the digest earns its place or gets muted. Implication for the OKR: a launch target like "10% of monthly actives open Resurface weekly by day 60, with mute rate held under [X]%" is defensible against this class; a target of 30%-plus would be setting up to miss. Pair the open-rate target with a guardrail metric (mute / opt-out and D30 retention) so adoption is not bought at the cost of churn.

---

*Note: the value here is refusing to invent Brainshelf's number and anchoring on what comparable digests actually get (~5% to 12%, with an 8% opt-in ceiling). The honesty rule is load-bearing: these base rates are external proxies, not Brainshelf data, because Resurface has no history yet - the right move is to flag that and forecast a range, not to dress up a guess as a measurement. This pairs naturally with a premortem on the "people just mute it" failure.*

## Why this prompt worked

It named the **decision** (set a goal for Resurface), the **quantity** (what share of 22K open a daily digest), and - critically - the **constraint** ("i don't want to make up a number"). That last clause is what the framework is built for: it forced the outside view instead of an inside-view guess. With no internal data to anchor on, the method did the honest thing - reached for a published reference class, flagged the base rates as external proxies rather than Brainshelf's own, and returned a defensible range with its ceiling and uncertainty named. Theo did not have to supply a methodology or a spreadsheet; he had to supply the one thing he had, which was a refusal to fabricate.

## The handoff to pm-skills

The realistic range crosses into pm-skills' `foundation-okr-writer`. What hands off is a target grounded in a base rate rather than optimism: the key result becomes "10% of monthly actives open Resurface weekly by day 60" anchored on the 5% to 12% class, with the 8% notification ceiling carried over as a known constraint and the mute / opt-out and D30 retention guardrails carried over as the risks the target must not trade away. The decision layer says how ambitious is honest; the delivery layer writes the objective and key results around that, so the OKR is set against evidence instead of hope.

## Next in the thread

With the target grounded, Theo turns to what could sink the launch. Next in his thread: he premortems the Resurface launch in [Brainshelf premortems the Resurface launch](../brainshelf-premortem-digest/).
