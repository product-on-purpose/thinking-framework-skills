# Rival-Explanation Evidence Ledger - Worked Example

A completed run of the `process-tracing` skill on a real, consequential question. This is the quality bar a generated ledger should meet.

> Uses the shared recurring scenario (Northwind, a B2B SaaS that launched a self-serve free tier) so examples across skills read as one coherent product. Where `think-premortem` imagines one specified failure of the launch before it ships, and `think-scenario-planning` builds alternative external worlds the launch might land in, this skill takes one outcome that has ALREADY happened - a sharp churn spike six weeks after launch - and adjudicates the rival explanations of why. See `docs/internal/AUTHORING.md`.

> Evidence is weighed by diagnosticity, not by count. The winner is decided by the decisive typed items (a failed hoop, a smoking gun), not by which explanation collected the most supporting mentions. The expected fingerprints were written down before the evidence was graded.

---

## Focal outcome and case

- **Outcome:** Six weeks after Northwind launched its self-serve free tier, paid-conversion-cohort retention dropped sharply - the week-4 retention of users who started on the free tier and upgraded fell from a steady 88% to 71% in a single cohort, and has stayed there.
- **Case:** The one cohort of free-tier-originated paid accounts that activated in the two weeks after launch (the "launch cohort"). N equals one - this is "why did THIS cohort's retention crater?", not "what drives B2B retention in general."
- **Within-case check:** Single-case, backward-looking "why did this specific drop happen?" question. Confirmed in scope. (A cross-case "what generally causes retention loss across all our cohorts?" question would be the wrong tool.)

## Rival explanations and their mechanism chains

Three genuinely competing stories surfaced in the postmortem. Each is made concrete as a mechanism chain, with the observable fingerprints stated before any evidence was graded.

### Rival A: Free-tier dilution (the funnel changed who upgrades)
- **Mechanism chain:** free tier opens -> a flood of low-intent, low-fit users sign up -> some upgrade impulsively without a real use case -> they never reach the habit-forming workflow -> they churn fast.
- **Expected fingerprints (stated first):** the launch-cohort upgraders should look demographically and behaviorally different from prior upgraders (smaller accounts, fewer seats, lower pre-upgrade activation); churn should concentrate in the never-activated segment; the effect should be present from day one of the cohort, not triggered by a later event.

### Rival B: Onboarding regression (a launch-day code change broke activation)
- **Mechanism chain:** the free-tier launch shipped alongside a rewritten onboarding flow -> a regression in that flow silently broke a key first-run step for a subset of users -> those users never complete setup -> unset-up accounts churn.
- **Expected fingerprints:** an error-rate or drop-off spike at a specific onboarding step beginning at the launch deploy timestamp; the broken step's failure logs; churn concentrated among accounts that hit the broken step; retention of accounts created just BEFORE the deploy should be unaffected.

### Rival C: Competitor launch (an external pull, not an internal break)
- **Mechanism chain:** a competitor launched an aggressive free offering in the same window -> Northwind's newest, least-committed users are the most poachable -> they leave for the competitor -> the launch cohort churns.
- **Expected fingerprints:** the competitor's launch dated inside the window; churned accounts citing or switching to the competitor (support notes, cancel-reason field, win/loss); the churn should hit competitor-overlapping segments hardest; timing of churn should track the competitor's launch date, not Northwind's deploy.

## Evidence typed per rival

Each item typed against the rivals by certainty (must we see this if the rival is true?) and uniqueness (could the others produce it too?). The expected-fingerprint column was predicted before each find.

| Evidence item | Expected fingerprint (stated first) | Diagnosticity | Test type | Effect on rivals |
|---|---|---|---|---|
| Onboarding step-3 completion rate fell from 94% to 61% starting exactly at the launch deploy timestamp; error logs show a null-state crash for accounts without a seeded workspace | Rival B predicted a step-level drop-off spike at the deploy timestamp with failure logs | If B is true we MUST see a broken step (certain); a dilution funnel or a competitor would NOT break step-3 completion with a deploy-timed crash (unique) | **Doubly decisive** for Rival B | B confirmed; A and C cannot easily produce a deploy-timed step-3 crash |
| Churned launch-cohort accounts are 4x concentrated among users who hit the step-3 crash | B predicted churn concentrated among accounts that hit the broken step | Certain for B; A would predict churn concentrated in never-activated low-fit users instead | **Hoop** for B (B passes) | B stays alive and strengthened; weak against A |
| Launch-cohort upgraders look slightly smaller (median seats 4 vs 6) than prior upgraders | A predicted demographically different, smaller upgraders | Consistent with A but a free tier always shifts the mix somewhat; not unique, not certain | **Straw in the wind** for A | A nudged up slightly - not decisive |
| Accounts created in the 2 weeks BEFORE the deploy retained at the normal 88% | B predicted pre-deploy accounts unaffected; A predicted dilution should also affect any free-adjacent funnel, less time-bound | Certain test for B (pre-deploy must be normal if B); discriminates B from A's day-one prediction | **Hoop** for A (A fails) | A weakened: A predicted a from-day-one funnel effect, but the break is sharply deploy-timed, not cohort-wide |
| Cancel-reason field and support notes: 2 of 41 churned accounts mention a competitor; no competitor free launch is dated in the window | C predicted competitor citations and a dated competitor launch | If C drove the spike we MUST see meaningful competitor signal and a dated launch (certain); near-absence fails the hoop | **Hoop** for C (C fails) | C eliminated |

## Running status per rival

| Rival | Status after the typed evidence | What decided it |
|---|---|---|
| Rival A: free-tier dilution | **alive but minor**, not the driver | failed the "from day one" hoop (the break is deploy-timed, not cohort-wide); only straw-in-the-wind support |
| Rival B: onboarding regression | **confirmed** | the doubly-decisive deploy-timed step-3 crash plus a passed hoop on churn concentration |
| Rival C: competitor launch | **eliminated** | failed its hoop - no dated competitor launch, negligible competitor citations |

## Surviving explanation and residual uncertainty

- **Surviving explanation:** The churn spike was caused chiefly by an **onboarding regression** - a null-state crash at step 3 that shipped with the launch deploy and silently broke first-run setup for accounts without a seeded workspace (Rival B).
- **Residual uncertainty:** Free-tier dilution (Rival A) is a real but secondary effect (slightly smaller, lower-fit upgraders) that the data cannot fully separate from the regression's footprint; it would not, on its own, explain the sharp deploy-timed drop. How much of the residual 71%-to-88% gap closes once the crash is fixed is not yet known and is the test of this conclusion.

## Most decisive missing observation

Fix the step-3 null-state crash and measure week-4 retention of the NEXT post-fix cohort. If retention returns to roughly 88%, that is a doubly-decisive confirmation of Rival B and bounds Rival A as minor. If it recovers only partway (say to 80%), the gap is the live measure of the dilution effect (Rival A), and the funnel-quality question becomes the next thing to work. This single forward observation discriminates the surviving explanation from its residual rival better than any further mining of the existing logs.

---

## Evidence caveat (carried from the artifact)

> This ledger is a structured single-case adjudication aid, not a measured accuracy improver. The governing evidence tier is **P (practitioner)**: process tracing's methodological literature establishes that the diagnosticity logic is valid, but no controlled trial shows that using it improves reasoning accuracy, for humans or agents, and the evidence is transferred from human case-study methodology (not agent-validated). The nearby controlled evidence is negative and belongs to the cousin method ACH; it sets no tier here. The conclusion above is the best-supported rival given the typed evidence, not a proof - which is why the most decisive missing observation is named and run next. See `evidence/dossier.md`.

---

*Note how this differs from its neighbors on the same Northwind launch. The `think-premortem` example imagines one specified way the launch could fail BEFORE it ships and reasons back to causes. The `think-scenario-planning` example builds alternative external futures the launch might land in. This ledger does neither: the outcome has already happened, and the work is to adjudicate the genuinely rival explanations of why - by typing each piece of within-case evidence by its diagnosticity and letting the decisive items eliminate or confirm, not by tallying support. The deliverable is the surviving explanation with its residual uncertainty and the next decisive observation, not a forecast and not a risk list.*
