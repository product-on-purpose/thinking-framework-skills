---
title: "Brainshelf premortems the Resurface launch"
description: A casual one-line premortem yields a ranked risk register with tripwires for the digest launch.
sidebar:
  label: "Brainshelf -> premortem"
---

> **Theo Almeida**, founder and CEO of Brainshelf, a 20-person consumer note app. The decision: ship "Resurface," a morning digest, in a month. Prompting style: casual.

This is a complete run, prompt to artifact. Framework: [Premortem](../../frameworks/think-premortem/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

Brainshelf is shipping Resurface, a morning digest that resurfaces old notes and saved articles, in about a month. By now Theo has bounded the problem and forecast adoption from the outside; the bet is made and Nina Park is building it. What is left is the part Theo trusts least: a launch on a 20-person team where ~8% of users keep notifications on, where the digest could just as easily read as nagging. He does not write a brief. He types the worry that is keeping him up.

## The prompt

```
/think-premortem "we're shipping Resurface (the morning digest) in a month. nervous it just becomes
notification spam people mute, or worse, makes the app feel naggy. what kills this?"
```

That is the whole prompt. Casual, one situation, the two worries on his mind. The framework supplies the rest.

## The output

> **Premortem Risk Register - Resurface launch**

**Decision:** Ship Resurface, a daily morning digest that resurfaces old notes and saved items, to all Brainshelf users in one month.
**Intended outcome:** Resurface lifts daily engagement and D30 retention by giving people a reason to return, without driving notification opt-outs or making the app feel naggy.
**Horizon:** 3 months after launch.
**Reversibility:** Two-way door on the feature, one-way door on trust. We can pull or soften the digest, but a wave of notification opt-outs or uninstalls does not come back when we do.

**The failure, declared.** *It is three months after launch. Resurface shipped on time and it failed quietly. The notification opt-in rate fell from ~8% toward 5% as people muted the digest within the first week; the users who kept it on opened it a few times and then stopped, so daily opens are back to where they were pre-launch. D30 retention did not move. Worse, our app-store reviews picked up a thread of "stop nagging me" complaints, and Nina spent three of her four launch weeks tuning notification timing instead of the content that would have made the digest worth opening.*

**Top risks and what we will do.** The three most likely ways this dies: (1) the digest **feels naggy, so people mute notifications** and we lose the channel - we will ship a one-tap frequency control and a quiet default, and treat the opt-out rate as a launch tripwire, not a post-launch metric; (2) the **content is not worth opening** because we resurface stale or random notes - we will rank what surfaces by recency and save-signal before launch and watch open-through rate from day one; (3) **the small team over-invests in delivery plumbing** (timing, channels) and under-invests in whether the digest is good - we will timebox the plumbing and protect Nina's time for content quality. Each has a tripwire and a kill criterion below.

| # | Cause of failure | Likelihood | Impact | Leading signal / tripwire | Mitigation | Owner | Kill criterion |
|---|---|---|---|---|---|---|---|
| 1 | The digest reads as naggy, so users mute notifications and we lose the channel | H | H | Notification opt-out rate among Resurface recipients above 3% in week 1; "stop nagging" sentiment in reviews | Quiet, low-frequency default; one-tap frequency control (daily / weekly / off) in the digest itself; soft in-app intro before the first push | Theo | Opt-in rate falls below 6% (from ~8%) within 2 weeks and is attributable to Resurface |
| 2 | What we surface is not worth opening (stale, random, or already-seen notes) | H | H | Digest open-through rate below 25% by week 2; opens decline week over week among opted-in users | Rank surfaced items by recency + save-signal before launch; cap at a few high-signal items; suppress items seen recently | Nina | Open-through rate stays below 20% for 3 straight weeks with no content fix in flight |
| 3 | The 3-person product trio burns the month on notification plumbing, not digest quality | M | H | By week 2, most of Nina's time is on timing/channel work; the ranking logic is still unstarted | Timebox delivery plumbing to week 1; freeze it; protect at least half of Nina's remaining weeks for content/ranking | Theo | Ranking logic not testable by the week-3 internal check, forcing a thin random-surface launch |
| 4 | Early adopters try it, see no lasting value, and churn - D30 does not move | M | H | Week-4 D30 for the launch cohort flat vs the pre-launch baseline; opened-once-then-stopped pattern dominates | Instrument repeat-open, not just first-open, from day one; ship a "why am I seeing this" line so value is legible | Theo | After 8 weeks, D30 for Resurface-exposed users is no better than the pre-launch baseline |
| 5 | A timing/delivery bug makes the digest land at 3am or duplicate, poisoning first impressions | M | M | QA finds timezone or duplicate-send edge cases in week 3; no staged rollout planned | Send to an internal + small beta cohort first; verify timezone handling; cap to one send per user per day | Nina | Duplicate or off-hours sends reach real users at launch, or the timezone test is not green by launch-minus-3-days |

**Watch list.** Digest cannibalizes ordinary app opens (people read the summary instead of opening Brainshelf) - monitor, likely minor at this scale. Saved-article licensing/preview edge cases in the digest - low likelihood, standard handling. Brand read ("another app pinging me") - tied to risk 1, covered by the quiet default.

*Evidence note: a premortem reliably surfaces more and more specific risks and reduces overconfidence in a plan; it does not promise a better launch outcome. The often-quoted "30%" figure is about the number of reasons generated, not decision quality, and the evidence is transferred from human studies, not validated for AI-augmented use. See the [dossier](../../frameworks/think-premortem/).*

## Why this prompt worked

It named the **decision** ("shipping Resurface in a month"), a **horizon was implied** by "in a month," and it surfaced the **two real worries** (notification spam, the app feeling naggy). That was enough for the framework to do its job: declare the failure in the past tense, generate causes beyond the two Theo named (stale content, the team burning the month on plumbing, a flat D30, a timing bug), and force each into a tripwire and a kill criterion. No structure or polish was required of Theo, and the casual one-liner lost nothing for it.

## The handoff to pm-skills

The ranked register is where the decision layer ends and delivery begins. Theo carries it into pm-skills' `deliver-launch-checklist`, where each tripwire becomes a launch gate: the opt-out-rate threshold, the open-through floor, the timezone-test green light, and the staged-rollout step all move from "things we worried about" to "checks that must pass before and during launch." What crosses the boundary is the decision (ship Resurface in a month), the constraints (a 3-person trio, ~8% notifications on, D30 as the metric that matters), and the risks with their pre-decided kill criteria - so the checklist is built around the failure modes the premortem found, not a generic launch template.

## Next in the thread

That closes the Brainshelf thread: from drawing the boundary, to forecasting adoption from the outside, to premorteming the launch. Back to the [Showcase index](../) for the other companies and journeys.
