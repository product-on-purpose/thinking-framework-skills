# Premortem Risk Register - Worked Example

A completed run of the `premortem` skill on a real, consequential decision. This is the quality bar a generated premortem should meet.

---

## Decision under premortem

- **Decision:** Launch a self-serve free tier of our B2B SaaS in 6 weeks to accelerate top-of-funnel growth ahead of the Q3 board target.
- **Intended outcome:** 3x sign-up volume within one quarter and a measurable lift in paid conversions from self-serve, without degrading the existing sales-led motion.
- **Horizon:** 6 months after launch.
- **Reversibility:** One-way door in practice. Pulling a free tier after launch is possible but damages trust and is publicly visible, so treat it as hard to reverse.

## Top risks and what we will do (summary)

The three most likely ways this fails: (1) the free tier **cannibalizes paid** rather than feeding it, because the entry plan is too generous; we will gate the highest-value features behind paid and instrument the free-to-paid path from day one. (2) **Support and infrastructure load** from unqualified free users swamps the team and blows the cost model; we will cap free usage, ship self-serve docs, and set a cost-per-free-user tripwire before launch. (3) The **sales team undercuts or resents** the motion because comp and qualification rules were not redesigned; we will align comp and lead-routing with sales leadership before any external announcement. Each has a tripwire and a kill criterion below.

## Risk register

| # | Cause of failure | Likelihood | Impact | Leading signal / tripwire | Mitigation | Owner | Kill criterion |
|---|---|---|---|---|---|---|---|
| 1 | Free tier cannibalizes paid: existing or prospective paying customers downgrade to free | H | H | Net new paid MRR growth slows in the first 4 weeks while free sign-ups rise; >5% of trials choosing free over paid | Gate the top 3 value features behind paid; instrument free-to-paid funnel before launch; A/B the free limits | PM (Growth) | Paid net-new MRR drops below the pre-launch trend for 2 consecutive weeks attributable to free downgrades |
| 2 | Support + infra cost from unqualified free users exceeds plan | H | M | Support tickets per 100 free users above threshold by week 2; cloud cost per free user above the modeled ceiling | Hard usage caps on the free tier; self-serve onboarding + docs; a cost-per-free-user budget set before launch | Eng lead + Support lead | Cost per free user exceeds 1.5x model for 3 weeks with no path to fix |
| 3 | Sales team undercuts or resents the motion (comp + qualification not redesigned) | M | H | Reps steering prospects away from free; complaints in pipeline reviews; lead-routing disputes in week 1 | Redesign comp + lead-routing with sales leadership before announce; written rules of engagement; a shared dashboard | VP Sales + RevOps | Sales leadership withholds sign-off, or rep behavior measurably suppresses free sign-ups in month 1 |
| 4 | The 6-week timeline forces shipping a broken or insecure self-serve flow | M | H | Billing/auth edge cases open in QA week 5; security review not complete by week 4 | Cut scope to a thin, secure path; freeze the feature set at week 2; mandatory security review gate | Eng lead | Security review not green by the launch-minus-1-week gate |
| 5 | "Free" attracts the wrong segment (no ICP fit), so conversions never come | M | M | Free cohort firmographics diverge from ICP; week-4 activation among ICP-fit free users is low | Light qualification at sign-up; track activation by ICP fit, not raw sign-ups | PM (Growth) | After 8 weeks, ICP-fit free-to-paid conversion is below the breakeven the model requires |

## Watch list (lower-priority causes)

- Brand perception shift ("they went freemium, they must be struggling") - monitor inbound sentiment, low likelihood.
- Free tier abused for fraud/spam - rate-limit and monitor, standard controls likely sufficient.
- Internal analytics not ready to attribute free-to-paid - ensure tracking is in the launch scope, not after.

---

*Note how the value is in the conversion: every top cause carries a tripwire, a mitigation, an owner, and a kill criterion decided in advance. A list of five risks without those columns would not be a premortem.*
