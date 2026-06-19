---
title: "Brainshelf draws the boundary on a digest"
description: A consumer note app checks whether a morning digest is even the right problem before building it.
sidebar:
  label: "Brainshelf -> boundary"
---

> **Theo Almeida**, founder and CEO of Brainshelf, a 20-person post-seed consumer note app. The decision: whether "Resurface," a morning digest of old notes, is even the right problem to solve. Prompting style: casual.

This is a complete run, prompt to artifact. Framework: [Boundary Critique](../../frameworks/think-boundary-critique/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

Brainshelf has 22K monthly actives out of ~140K registered, and Theo keeps hearing the same complaint: people forget what they saved. The obvious next bet is "Resurface," a morning digest that pushes old notes and saved articles back at users. Nina Park, the engineer who would build it, has it roughly scoped to a month. But Theo has been around long enough to be suspicious of the obvious bet. Before he points the product trio at a month of work, he wants to know whether "morning digest" is even the right frame, or whether he is about to solve a tidy problem for a frame that has already quietly decided who matters. He types what is on his mind.

## The prompt

```
/think-boundary-critique "thinking about a morning digest ('Resurface') that resurfaces old notes.
but i'm not sure that's the real problem - people say they forget what they saved. help me draw
the boundary on what this is and isn't before we build it."
```

That is the whole prompt. Casual, first person, the doubt named plainly. The framework supplies the audit.

## The output

> **Boundary-Judgment Audit - "Resurface" morning digest**

## Frame under audit

- **Frame as given:** "Build 'Resurface,' a morning push digest that resurfaces old notes and saved articles, because people forget what they saved."
- **Improvement it claims:** Re-engagement - users open the app more often and re-encounter saved value, lifting D30 retention.
- **The user's actual goal:** People get value out of what they already saved, at the moment it would actually help them, without the app becoming a thing they mute or resent.

## Summary (top of the artifact)

The Resurface frame is drawn tightly around one beneficiary (Brainshelf's retention metric) and one delivery mechanism (a scheduled morning push). Audited in is/ought terms, three boundary judgments show real gaps: the beneficiary is the D30 number rather than the user's actual recall problem (motivation); the decision sits with Theo and the growth instinct, while the ~92% of users who keep notifications off, and the support load Nina would carry, are outside the decision environment (power); and the worldview treated as authoritative is "more opens is better," which has no standing for the user who wants to find a note when they need it rather than be pushed one each morning (knowledge and legitimacy). The most consequential affected-but-excluded parties are the notifications-off majority, for whom a push digest is invisible or unwelcome, and the user who forgets a note in context (mid-task) rather than at 8am. **This audit surfaces those boundary questions; it does not decide whether to build Resurface.** It hands the digest-versus-recall and the push-versus-in-context gaps to a decision step, with the excluded parties now on the table.

## The four sources (is vs ought)

| Source (boundary question) | Is (how the frame draws it now) | Ought (how it should) | Gap |
|---|---|---|---|
| **Motivation - who benefits** (client/beneficiary; purpose; measure of success) | The beneficiary is *Brainshelf's D30 retention*; the purpose is more app opens; success is digest open rate. The "improvement" is the retention chart, full stop. | The beneficiary should be the *user who saved something and wants it back when it helps*. Success should be "the user actually re-used a saved item usefully," not "the user opened a push." | **Large.** The frame optimizes Theo's retention number and treats the recall complaint as a reason to send a push, not as the problem to solve on its own terms. |
| **Power/control - who decides** (decision-maker; what is controlled; the decision environment) | Theo decides, on the growth instinct; the digest schedule and content are under the product trio's control. The ~92% of users who keep notifications off, and Nina's support and maintenance load, are treated as the *environment* - outside the decision. | The notifications-off majority should shape the decision (a push-only feature cannot reach them), and Nina - who carries the build and the "why is this app nagging me" tickets - should have a real seat, because the decision spends *her* month and her on-call patience. | **Large.** The person deciding is reasoning from the 8% who allow pushes; the feature's reach and its cost both live outside the frame he is deciding inside. |
| **Knowledge - whose expertise counts** (who is expert; what expertise applies; the assumed guarantors) | Founder intuition and the "people forget what they saved" anecdote are authoritative. The assumed guarantor is "a daily digest will fix forgetting." | The user's *moment of need* (when and where they actually want a forgotten note) should count, and so should the eng read on notification fatigue. "A morning push fixes forgetting" is a *false guarantor* if the real need is in-context surfacing or better search. | **Moderate-to-large.** The expertise admitted is the expertise that supports a digest; the knowledge that would surface search, in-context resurfacing, or "they forget mid-task, not at breakfast" is outside the frame. |
| **Legitimacy - who has standing** (witness for the affected-not-involved; authoritative worldview; reconciling worldviews) | The authoritative worldview is "more opens is better; a daily touchpoint is healthy engagement." Standing belongs to whatever moves D30. | The user who wants *quiet, reliable retrieval* (no push, just the note when searched for) and the user who finds a digest naggy should have standing. Someone must witness for them, since neither is in the room and neither shows up in an open-rate metric. | **Large.** No one currently witnesses for the affected-but-excluded; the engagement worldview has no category for "a user helped by never being pushed at all." |

## Affected-but-excluded

The move the rest of the library does not have. List the parties with a real stake in the consequences who hold no seat, no voice, and no expertise-standing inside the frame. These are not in-scope stakeholders to be voiced - they are outside the line.

| Affected-but-excluded party | Stake in the consequences | Who (if anyone) witnesses for them now |
|---|---|---|
| **The notifications-off majority (~92% of users)** | A push-only digest is invisible to them, so a feature justified by "people forget" reaches the people least able to receive it; if Brainshelf escalates to re-prompt for notification permission, they get nagged. | No one - the frame reasons from the 8% who allow pushes and treats the rest as a conversion target, not a constituency. |
| **The in-context forgetter (forgets mid-task, not at 8am)** | Their real need is to find a saved note *when it is relevant* (search, surfacing while writing a related note), which a fixed morning digest cannot serve; the digest frame spends the month without touching their problem. | No one - the digest worldview has no standing for a need that does not arrive on a morning schedule. |
| **The notification-fatigued / churn-risk user** | A digest that feels naggy is exactly the trigger that makes a small consumer app get muted or deleted; this user bears the downside of the engagement bet but has no voice in the frame that optimizes opens. | No one - the open-rate metric counts the open, never the resentment or the uninstall that follows. |
| **Nina (eng) and the support load** | Absorbs the build, the maintenance, and the "stop nagging me" tickets the digest creates, on a trio with little eng to spare and a one-month budget. | Partially - only if her load is forced into the decision rather than left in the environment. |

## What this audit does NOT do

- **It surfaces the boundary question; it does not adjudicate it.** Whether Brainshelf *should* build Resurface is still open. What the audit establishes is that the current frame answers "whose improvement, decided by whom, on whose knowledge, with whose standing" in a way that excludes the people the recall complaint actually came from - so a build decision made inside this frame would optimize morning opens for the 8% while leaving the in-context forgetter and the notifications-off majority unserved, and risk nagging the very users it means to retain.
- **Onward route (where a real gap exists):** take the widened frame to `think-decision-option-review` - compare "morning push digest as framed," "in-context resurfacing / better search," and "a quiet, opt-in digest" *with the excluded parties' stakes now on the table* - so the choice is made under the real boundary rather than the tidy one. The audit informs that decision; it is not the decision.
- **Evidence caveat:** this audit surfaces who the frame illegitimately includes or excludes, descriptively versus normatively. The method's evidence is conceptual (tier C) and transferred from human practice; it is not a measured improvement in decisions.

## Why this prompt worked

Theo did not over-specify. He named the **proposal** ("morning digest"), named the **doubt** ("not sure that's the real problem"), and named the **observed evidence** ("people say they forget what they saved"). That triple - a frame, a suspicion the frame is wrong, and the raw complaint the frame was built on - is exactly what boundary critique needs to take the frame itself as the suspect object. The framework did the rest: it separated the user's actual goal (re-use saved value) from the frame's beneficiary (the retention metric), audited each boundary judgment in is and ought modes, and surfaced the parties a normal stakeholder walk-through of the product trio could never reach - the notifications-off majority and the in-context forgetter, both outside the line the digest frame had already drawn.

## The handoff to pm-skills

The bounded problem crosses into pm-skills' `define-problem-statement` and `define-hypothesis`. What the decision layer hands over is not "build a digest" but the audited frame: the actual goal (users re-use saved value at the moment it helps), the boundary gaps that a digest-shaped statement would paper over (push reaches only ~8%; the real forgetting may be in-context, not morning), and the affected-but-excluded parties the eventual problem statement and hypothesis must not silently exclude. The delivery layer writes the canonical problem statement and the testable hypothesis against the wider frame, not the tidy one.

## Next in the thread

Theo has a frame he trusts, but no number for how many users would actually engage. Next in the thread: he refuses to invent an adoption target and forecasts it from the outside in [Brainshelf forecasts digest adoption](../brainshelf-forecast-adoption/).
