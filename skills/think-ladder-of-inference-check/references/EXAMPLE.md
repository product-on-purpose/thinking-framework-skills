# Reasoning Trace - Worked Example

A completed run of `think-ladder-of-inference-check`, on the shared Northwind scenario. This is the quality bar a generated trace should meet.

> Northwind is a B2B SaaS. Here the skill audits a conclusion the team reached during the free-tier debate.

---

## Conclusion under examination

- "Our trials are not converting because the product is missing a free tier."

## The ladder, reconstructed

| Rung | Content |
|---|---|
| Observable data available | Trial-to-paid conversion is down 6 points QoQ; two lost deals mentioned wanting to "try before buying"; support tickets up; a competitor launched a free tier; onboarding completion rate also dropped; sales hired three new reps last quarter. |
| Data actually selected | Only the two "try before buying" comments and the competitor's free tier. |
| Meaning added | Prospects need a no-commitment way to try, and competitors are setting that expectation. |
| Assumptions | That the two comments are representative; that the conversion drop is about packaging, not onboarding or new-rep ramp; that a free tier is what "try before buying" means. |
| Conclusion | We need a free tier to fix conversion. |

## Riskiest rung

- **Data actually selected.** The conclusion ignores two strong alternative signals present in the same data: onboarding completion also dropped, and three new reps were ramping. Either could explain the conversion fall without any packaging change.

## Alternative interpretation

- A credible different reading: the conversion drop is an onboarding and ramp problem, not a packaging gap. The two "try before buying" comments are real but may be a small, vocal minority.
- What it would imply: fix the onboarding funnel and support new-rep ramp first (cheap, reversible), and verify the packaging hypothesis with data before building a free tier. (This hands off cleanly to `think-evidence-vs-inference-sort` and `think-what-would-have-to-be-true`.)

---

*Note: the value is exposing that the conclusion was built on two anecdotes plus a competitor move, while three other data points pointing elsewhere were silently dropped at the "selected data" rung.*
