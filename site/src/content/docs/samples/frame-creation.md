---
title: "Frame Creation - quick sample"
description: Frame Creation on a chronic on-call burnout problem that more staffing and stricter alerts only made worse.
sidebar:
  label: frame-creation
---

> A compact worked example of [Frame Creation](../../frameworks/think-frame-creation/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-frame-creation/).

## Situation

Daniel is a staff engineer at a 200-person company whose platform team owns the production on-call rotation. On-call burnout is chronic: the best engineers quietly rotate off the team, paging volume stays high, and every fix the team has tried treats the symptom. Leadership keeps asking for "fewer pages" and the team keeps tightening alert thresholds, but each round either hides real incidents or just moves the noise. The problem has stayed stuck for a year, and the way it is framed feels like part of the trap.

## Prompt

```text
/think-frame-creation "On-call burnout won't die. We've added engineers, tuned alert thresholds, and written runbooks, and people still dread the pager and leave the team. Treating it as 'too many pages, reduce the pages' isn't working. Help me re-see what this problem actually is."
```

## The artifact

## Problem under reframing

- **Problem as given:** "On-call burnout won't die. We've added engineers, tuned alert thresholds, and written runbooks, and people still dread the pager and leave the team. Treating it as 'too many pages, reduce the pages' isn't working."
- **How it arrived / who framed it:** Raised by the platform team and leadership as an **alert-noise problem** - too many pages hitting too few people - whose fix is to reduce the page count. Every initiative is scoped as "drive the number of pages down."
- **What solving inside that frame has already tried (and how it failed):** Three rounds of noise reduction - raised thresholds, alert grouping and deduplication, and a deduplicated runbook so responders act faster. Each round lowered the raw page count for a quarter, then either let a real incident through (because a real signal was suppressed) or pushed the load elsewhere (quieter pager, same dread). The symptom that persisted is the one nobody measured: engineers still experience on-call as unpredictable, lonely, and unrewarded, and still rotate off. The noise-reduction frame is the obstacle, not the threshold settings.

## Summary (top of the artifact)

The team has framed on-call burnout as alert noise and is stuck arguing about thresholds. Exploring the broader context - what actually makes a week of on-call tolerable or miserable - the themes are that the dread is about unpredictability and isolation more than raw volume, that pages are treated as interruptions to "escape" rather than signals the system is asking for help, and that on-call work is invisible and unrewarded while feature work is celebrated. The core paradox the noise frame cannot resolve: the team must suppress pages to protect people, yet every suppressed page is a signal the system needed, so protecting people degrades reliability and vice versa. The value actually sought is **a sustainable rotation people are willing to stay on**. Reframe: **approach on-call as if it were the stewardship of a living system's health**, not a queue of interruptions to drain. That standpoint generates its own directions - make the on-call shift a bounded, supported, visible piece of work whose job is to improve the system's health, so each page leaves the system better than it found it. This is a standpoint to develop and test, not a proven plan; the smallest test is whether a supported, health-focused rotation lowers people's stated dread even before the page count moves.

## Broader context explored

Looked around the problem rather than at the alert config. Talked to engineers who left the rotation and ones who stayed. The leavers did not list page volume first; they described not knowing when the pager would go off and not being able to plan a life, being alone at 2am with a system they only half understood, and watching their on-call weeks vanish from any record of what they contributed while feature shipping got the praise. The engineers who tolerated on-call best were the ones who treated a quiet incident as a chance to fix a fragile corner of the system, and who had a buddy or a clear handoff. Meanwhile every initiative had been designed around the *page count* metric and not at all around the responder's actual week. The pages themselves, looked at honestly, were mostly the system reporting genuine fragility - the noise was real information the team had been trying to mute.

## Themes distilled

- **The dread is about unpredictability and isolation, not raw count.** A plan-able, supported week with ten pages beats a chaotic, lonely week with three. The unit of suffering is the experience of the shift, not the number on the dashboard.
- **Pages are the system asking for help, not interruptions to escape.** Treating every page as noise to suppress means muting the system's own signal that something is fragile - which is why suppression keeps backfiring.
- **On-call work is invisible and unrewarded.** It does not appear in any record of contribution, so the best engineers route around it; the rotation loses exactly the people who could improve it.
- **Improvement and endurance pull together when the work is framed as stewardship.** The engineers who lasted were the ones who left the system a little healthier each shift, not the ones who just survived the queue.

## Core paradox and value sought

- **Core paradox:** the team must **suppress pages** to protect on-call engineers from overload, and must **not suppress pages** because each one is a real signal the system needs attention. Inside the noise frame these pull against each other on a single dial (threshold up = people protected but reliability degraded; threshold down = reliability protected but people burned), which is why every "reduce the pages" round reproduces the trap. (Used here as the signal that the noise frame has failed, not as the thing to solve head-on.)
- **Value actually sought:** a **sustainable on-call rotation people are willing to stay on** - one where the system gets steadily healthier and good engineers do not flee the pager. Page count is a downstream proxy; the real prize is a rotation that retains its people and improves its system.

## The new frame (abduced working principle)

- **Reconception:** approach on-call **as if it were the stewardship of a living system's health** - a tended garden or a patient under care - not a queue of interruptions to drain. A good steward is not measured by how few times the system asks for attention, but by whether the system is healthier over time and whether the work of tending it is bounded, supported, and visible.
- **IF / THEN:** **IF** we treat on-call as stewardship - a bounded, supported shift whose job is to leave the system healthier than it was found - **THEN** we create a sustainable rotation people are willing to stay on (the value actually sought).
- **What this changes:** this is **not** a noise-reduction problem ("how do we make the pager quieter"), it is a **stewardship** problem ("how do we make tending the system's health a humane, bounded, valued job"). The question stops being *how few pages can we get to* and becomes *how do we make each shift a supported, finite, system-improving piece of work*. The suppress-vs-don't-suppress dial largely dissolves, because a steward does not win by muting the patient - a page is information to act on, and the lever moves from the alert threshold to the shape of the work and the health of the system.

> Check: Y ("stewardship of a living system's health") is earned by the distilled themes (dread is unpredictability and isolation, pages are signals, invisible work, improvement-and-endurance pull together), not free-associated. It changes the *problem* (noise queue -> stewardship), not just the solution. And it is adoptable: "make on-call a bounded, supported, valued job that leaves the system healthier" is a standpoint leadership, the platform team, and the engineers rotating off can all get behind far more readily than another threshold fight. Frame is ready to develop.

## Solution directions the frame unlocks

Derived *forward* from the stewardship frame - what becomes obvious once on-call is tending a system's health, not draining a queue. (Note these are generated by the frame; they are not "things gardeners or nurses do" copied across.)

- **Bound and support the shift instead of shrinking the queue.** Give every on-call week a clear start and end, a co-pilot or buddy for night incidents, and a guaranteed protected handoff, so the dread of unpredictability and isolation drops even if the page count does not. The lever is the shape of the week, not the threshold.
- **Treat each page as a fragility to retire, with time funded to do it.** Every shift carries explicit, scheduled capacity to fix the root cause of the pages it received, so the system gets healthier shift over shift instead of the same alert firing forever. "Reducing pages" becomes a *result* of stewardship, not the goal that drives suppression.
- **Make stewardship visible and rewarded.** Surface on-call health work in the same record as feature work - the corner you hardened, the runbook you retired, the incident class you killed - so the best engineers have a reason to stay on the rotation instead of routing around it.
- **Re-instrument success around system health and human sustainability, not page count.** Track time-to-recovery, recurrence of the same incident class, and responders' stated dread and willingness to stay, because the frame says a healthier system and a retained team are the asset. Raw page count becomes a diagnostic, not the target.

## Status

**This is a standpoint to develop and test, not a proven answer.** The stewardship frame is a promising reconception, not a validated plan, and it could fail two ways the skill warns about: a *frame-failure* if leadership will not fund protected time to fix root causes (then the noise frame reasserts itself and stewardship becomes a slogan over the same burnout), and *goal-reformulation drift* if "make on-call pleasant" quietly replaces "keep a reliable system and a retained team" as the goal. The smallest thing that would confirm or break the frame: run one quarter of a bounded, buddied, fix-the-root-cause rotation for a single team and measure whether responders' stated dread and willingness-to-stay improve - even before the page count moves. If they do, the frame is generating the value sought; if dread stays flat, the stewardship reconception is wrong for this team and the work should fall back to a deliberately chosen noise-and-staffing plan via `think-decision-option-review`.

*Evidence caveat: Frame Creation constructs a new, theme-grounded standpoint that generates native solution directions; it does not guarantee a better outcome. It is a well-developed account of expert design reasoning with face validity and case studies, but no controlled or comparative study of the named method, and its base is human design practice transferred to AI-augmented use (tier C). See the [framework page](../../frameworks/think-frame-creation/).*

## Why this framework fits

The problem arrived as "too many pages, reduce the pages," and an unaided pass would have proposed another round of thresholds and grouping - the same move that failed three times. Frame Creation explored the broader context, distilled why on-call really burns people out, named the value (a rotation people stay on) and the paradox (suppress vs don't-suppress), and abduced a standpoint ("as if it were stewardship of a system's health") that redefined what on-call *is* and generated solution directions a noise-reduction frame structurally cannot produce.
