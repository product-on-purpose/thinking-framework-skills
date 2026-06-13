---
title: "Priya deliberates a values trade-off, by hand"
description: A government policy analyst rations a scarce assistance fund by reasoning as if she had an equal chance of being any affected resident, then confronts the gap with her own positioned view - filled in step by step on a legal pad, no agent.
sidebar:
  label: "Priya -> veil of ignorance"
---

> **Priya**, policy analyst at a government agency. The decision: how to set the eligibility default for a one-time emergency heating-assistance fund that cannot reach everyone. Prompting style: run by hand, no agent.

Framework: [Veil-of-Ignorance Reasoning](../../frameworks/think-veil-of-ignorance-reasoning/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

A supplemental winter fund landed late and underfunded: enough to cover roughly 60% of the households that would qualify under the broad standard. Priya has to recommend the eligibility default, and the cheapest, most defensible-on-paper option happens to be the one her own division is measured on (low error rate, fast disbursement), which is exactly the kind of alignment that makes her distrust her own answer. She cannot enumerate every affected resident, so she reasons as if she had an equal chance of being any of them.

## Run by hand

Priya does not open a terminal. She works the skill's numbered procedure straight down a legal pad, one heading per step, because the discipline she needs is the removal of her own identity from the call, and that is something she has to do in her own handwriting to trust it. She confirms the question is normative, lists the affected parties, runs the load-bearing-identity check, writes the decision rule down before she reasons from it, decides the veiled version, decides her positioned version, and only then compares the two.

The agent build of the same framework is optional and produces the identical artifact. She could have typed:

```
/think-veil-of-ignorance-reasoning "How should we set the eligibility default for a
one-time heating-assistance fund that can cover ~60% of qualifying households?
Affected: deep-poverty households, near-threshold working households, residents who
miss the paperwork window, and my own division (measured on low error rate and fast
disbursement). Which default would I pick if I had an equal chance of being any of them?"
```

But the point of this page is that she did not need to. The numbered procedure is the method; the agent only fills the template faster.

## The output

> **Veiled-Decision Comparison - Heating-assistance eligibility default**

> **Evidence caveat (ships with this artifact by construction).** Governing evidence tier: **M (moderate)**. The veil-of-ignorance device has direct, replicated, partly pre-registered controlled support on this exact move (Huang, Greene and Bazerman 2019; Huang et al. 2021; Weidinger et al. 2023), but the measured effect is a directional *shift* in normatively contested judgments toward the greater-good option, not validated "better" decisions. All of it is **human-subject evidence, transferred and not validated for AI-agent execution**. The veiled answer is one input with a known directional push, never a neutral verdict. State the decision rule; a different rule (worst-off priority vs average utility) yields a different answer from the same veil.

---

### Focal decision and question type

- **Focal decision:** The fund covers roughly 60% of qualifying households. Should the eligibility default ration the money by the easiest-to-administer, lowest-error rule (auto-enroll the households already verified in the existing benefits system and stop there), or should the default reserve a share of the fund for the hardest-to-reach households that the existing system does not already capture, even though that raises the error rate and slows disbursement?
- **Question type:** Normative. This is a whose-interests-count trade-off (how much the welfare of the deep-poverty and the paperwork-excluded households weighs against the administrative cleanliness the agency is measured on), not the empirical question of which default disburses fastest. The empirical question is real but separate; the veil applies to the normative one.

### Affected parties

- **Deep-poverty households** - the residents for whom a cold winter is a safety emergency, not a budget line; many are outside the verified benefits system and would be missed by an auto-enroll-only default. Stand to lose the most if the fund routes to whoever is easiest to pay.
- **Near-threshold working households** - qualify under the broad standard, are usually already in the verified system, and would be reliably captured by the low-error default. Stand to lose a marginal amount of certainty if some fund is reserved for harder-to-reach residents.
- **Residents who miss the paperwork window** - eligible in substance but excluded by a documentation default; the most voiceless party, with no representation in the room and no way to contest a "did not apply" outcome.
- **Priya's own division** - measured on low error rate and fast disbursement; an auto-enroll-only default makes its numbers look best. This is the decider's own group, and the reason the veil is worth running here.

### Load-bearing-identity check

Does desert, a promise, a fiduciary duty, a special relationship, or a compensatory claim for a past wrong make the stripped identity information morally *relevant* rather than bias?

- **Verdict:** No - identity is not load-bearing here; proceed.
- **Detail:** No household holds a prior promise or contractual claim on this specific supplemental fund; it is new, discretionary, and one-time. There is no desert ranking among eligible residents and no fiduciary duty owed to one qualifying group over another. The agency's administrative interest (a clean error rate) is an institutional convenience, not a moral obligation owed to anyone, so stripping the knowledge of which party Priya represents removes bias, not a duty. The veil applies cleanly to the whole question.

### Decision rule behind the veil (stated, not assumed)

- **Rule:** Floor-constrained average maximization. Guarantee a minimum floor first (no qualifying household in the deepest need is categorically shut out by an administrative default), then allocate the remaining fund to maximize total welfare across all qualifying households.
- **Why this rule:** Pure average utility would route everything through the cheapest channel and let the easiest-to-reach majority absorb the whole fund; pure maximin would pour the entire fund into the single worst-off household past the point of useful return. The floor-constrained variant is what deliberating groups behind simulated veils actually converge on (Frohlich and Oppenheimer), and it fits a case where the real risk is categorical exclusion of the neediest by a paperwork default. The rule is a choice, not a neutral default - a strict maximin decider would reserve a larger share for the hardest-to-reach, and that alternative is noted below.

### The veiled choice

With identity stripped and the floor-constrained rule fixed: "What default would I want here if I had an equal chance of being any of these residents - a deep-poverty household outside the system, a near-threshold working household already in it, a resident who will miss the paperwork window, or a member of the deciding division?"

- **Veiled choice:** Auto-enroll the already-verified households to disburse the bulk of the fund quickly and cleanly, but reserve a fixed share (roughly 20%) for active outreach to the hardest-to-reach households and run a presumptive-eligibility fallback so that a missed paperwork window does not, by itself, exclude a household in evident deep need. Accept the higher error rate and slower tail that this reserve creates.
- **Reasoning:** Under an equal chance of being any resident, the concentrated downside of landing as a deep-poverty household frozen out by a documentation default is far larger than the diffuse downside of landing as a near-threshold household whose certain payment is shaved by the reserved share. Floor-constrained averaging spends first to lift the worst floor (no categorical exclusion of the neediest), then maximizes across the rest.

### The positioned choice

The standard, identity-known answer - the call Priya's division would actually make from its real position.

- **Positioned choice:** Set the default to auto-enroll only the already-verified households and disburse the full fund through that channel. No reserved outreach share, no presumptive-eligibility fallback; residents outside the verified system or past the paperwork window are not reached.
- **Reasoning:** The division is measured on error rate and speed, and the verified-only default optimizes both: it is fast, auditable, and produces a clean disbursement report. Reaching the hardest cases introduces documentation risk, slows the program, and shows up as error in exactly the metric the division answers for. "We funded everyone the system could confirm" is the legible, defensible-on-paper position.

### The gap and what it reveals

| | Veiled choice | Positioned choice |
|---|---|---|
| **Option** | Auto-enroll the verified majority, but reserve a share for outreach + a presumptive-eligibility fallback for the deepest need | Auto-enroll the verified majority only; no reserve, no fallback for the unreached |
| **Rests on** | Floor-constrained averaging behind the veil | The division's error-rate-and-speed metric and "we funded who the system could confirm" |

- **Gap:** Wide and one-directional. The positioned choice withholds any share from the hardest-to-reach households; the veiled choice funds a floor for them first.
- **What it reveals:** The positioned call is being driven by the division's own measured interest (a clean error rate and fast disbursement), not by an impartial reading of who is hurt. "We funded everyone the system could confirm" is doing the moral work of justifying the exclusion of the residents the system was never going to confirm - which are disproportionately the deepest-need households the fund most exists for. That is exactly the silent self-position the veil is built to surface, and it maps onto the documented self-serving-bias finding (Huang et al. 2021), where the party with the stake discounts the other party until the veil removes the stake.

### Defended position

- **Position:** Recommend the default that auto-enrolls verified households for the bulk of the fund, reserves roughly 20% for active outreach to the hardest-to-reach, and adds a presumptive-eligibility fallback so a missed paperwork window does not by itself exclude a household in evident deep need. Set the division's reported metric to count reach into deep-need populations alongside error rate, so the administrative incentive stops silently penalizing the residents who need the fund most. Revisit the reserve share once the first disbursement shows what the outreach actually reached.
- **Rule it rests on:** Floor-constrained average maximization, with no prior obligation to any single qualifying group.
- **Directional push acknowledged:** This answer leans toward aggregate welfare across all qualifying residents, which is the device's known directional push toward the "greater good" option - state it plainly. It is one input to the recommendation, not a neutral verdict, and the empirical questions (what the outreach reserve actually reaches, what the error rate becomes) still have to be settled separately.
- **What a different rule would produce:** A strict maximin decider would reserve a larger share - routing more of the fund to the very hardest-to-reach even at the cost of paying fewer verified households - because maximin weights the worst-off hardest. A pure average-utility decider would drop the reserve entirely and pay the cheapest, largest channel, which is the positioned choice the veil just flagged. The veil did not settle the rule; it made visible that the positioned default was settling it by the division's self-interest.

*She filled this in on a legal pad. The agent is optional; the discipline of removing your identity is the method.*

## Why running it by hand worked

The method's whole force is in one uncomfortable act - writing down what she would want before she knows which resident she is - and doing it in her own handwriting, step by labeled step, made the move impossible to skip or soften. Because she stated the decision rule on the page before reasoning from it, she could see that her positioned default was not "impartial administration" but average utility dressed as fairness, and the gap row showed her own division's metric doing the silent work. No agent was needed; the legal pad held the same artifact a generated run would have produced.

## What happened next

Priya did not recommend the veiled answer as a verdict; she carried the comparison into the policy memo as a named input with its directional push stated, so the deciding committee could see both the floor-constrained recommendation and what a strict worst-off rule would have chosen instead. The reserved outreach share and the presumptive-eligibility fallback went into the recommendation, and the single most consequential change was institutional: she proposed counting reach into deep-need households in the division's own metric, so the next analyst would not face the same silent pull toward the easy-to-confirm default. When a later case turned on whether a contractual promise to one group should survive the veil at all, she reached for the [advisor](../../tools/think-framework-advisor/) to sequence the load-bearing-identity question against the right neighboring frameworks.
