---
title: "Priya maps stakeholders before a policy"
description: A government policy analyst grids the parties affected by an automated eligibility rule against ethical principles, fills it in by hand for the review packet, and reads the trade-off pattern instead of a score.
sidebar:
  label: "Priya -> ethical matrix"
---

> **Priya**, policy analyst at a government agency. The decision: recommend (or not) an automated eligibility-screening rule for a benefits program. Prompting style: detailed, run by hand.

Framework: [Ethical Matrix](../../frameworks/think-ethical-matrix/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

Priya has been asked to write the ethics section of a review packet for a proposed rule that would auto-screen benefit applications against a risk model before a caseworker ever sees them. The debate in the working group keeps sliding - someone raises applicants, someone answers with fairness, someone jumps to caseworker workload, and the trade-off that actually matters never gets held in one frame. She decides to grid it: parties down the side, principles across the top, every cell filled in. She runs it on paper at her desk, because the filled sheet goes into the packet as-is and she wants every cell to be hers to defend.

## The prompt

She could hand the whole thing to the skill with a detailed, fully specified prompt:

```
/think-ethical-matrix "Assess one proposal for the benefits-program review packet:
an automated eligibility-screening rule that scores every new application against a
risk model and auto-routes low-scoring applications to a slower manual-review queue
before any caseworker sees them.

Affected parties (rows), and please keep the ones with no voice in the room:
- Applicants (the people applying for the benefit)
- Applicants wrongly down-scored (false positives sent to the slow queue)
- Caseworkers (whose triage the model replaces)
- The agency (accountability, cost, audit exposure)
- Applicants' dependents - VOICELESS (children/household members affected by a delay
  they did not apply for and cannot contest)
- Future applicants - VOICELESS (people who inherit whatever norm 'screen first,
  see a human later' becomes if this rule ships)

Principles (columns): wellbeing, autonomy, fairness. Tell me if the case needs an
adapted column rather than swapping one silently.

Fill every party-by-principle cell with a concrete impact, tag each [factual] or
[contested], then read the trade-off pattern. Do not score it or recommend - this is
the ethics map for the packet, not the decision."
```

She just as easily follows the eight numbered steps on a sheet of grid paper: state the option, roster the parties (mark the voiceless ones), name the three principle columns, fill every cell with an impact, tag each factual or contested, read the pattern, write the no-verdict footer, carry the evidence caveat. The prompt and the procedure produce the same artifact. The grid is the method, and the method does not need an agent.

## The output

> **Ethical Matrix - Automated eligibility-screening rule**

**Option under analysis:** Adopt an automated eligibility-screening rule that scores every new benefit application against a risk model and auto-routes low-scoring applications into a slower manual-review queue before any caseworker reviews them.

(One option's impacts, not a comparison. The separate "model A versus model B versus no model" choice is a scored options review; this maps the ethics of the one rule on the table.)

**Affected parties (rows):**

- **Applicants** (people applying for the benefit)
- **Applicants wrongly down-scored** (false positives routed to the slow queue who would have qualified)
- **Caseworkers** (whose front-line triage the model displaces)
- **The agency** (accountability, cost, audit and legal exposure, public trust)
- **Applicants' dependents** - **voiceless**: household members, including children, who bear a delay they never applied for and cannot contest
- **Future applicants** - **voiceless**: people downstream who inherit "screen first, see a human later" as the default if this rule normalizes

**Principle columns:** default prima facie set, stated and unadapted - **Wellbeing** (benefit and harm together), **Autonomy** (consent, self-determination, the ability to contest), **Fairness** (distribution of benefits and burdens). A separate "due process" column was considered; the contestability concern is captured inside the autonomy and fairness cells, so the set is left standard and the choice is recorded rather than made silently.

| Affected party | Wellbeing | Autonomy | Fairness |
|---|---|---|---|
| **Applicants** | Faster decisions for clearly-eligible applications; slower path and added stress for anyone the model down-scores **[factual]** | An opaque score they cannot see or rebut shapes their route before any human looks **[contested]** | Screening accuracy is uneven across groups, so error is unlikely to fall evenly **[contested]** |
| **Applicants wrongly down-scored** | A real benefit delayed or deterred by a model error, with material hardship during the wait **[factual]** | No notice that a model rerouted them and no plain way to challenge the score **[contested]** | They carry the full cost of the system's errors while contributing none of its benefit **[contested]** |
| **Caseworkers** | Lower routine load; the hard and ambiguous cases concentrate on them, raising strain **[factual]** | Professional judgment is narrowed to what the model already routed **[contested]** | Held accountable for outcomes a model's upstream routing partly determined **[contested]** |
| **The agency** | Lower processing cost and faster throughput; offset by audit, legal, and trust exposure if the model errs at scale **[factual]** | Acts within its own statutory discretion to set the process **[factual]** | Captures the efficiency gain while the cost of error falls on applicants, not the agency **[contested]** |
| **Applicants' dependents** *(voiceless)* | A delayed benefit reaches the household late; children and dependents bear hardship from a decision they had no part in **[factual]** | No standing, no notice, no route to contest - the consent chain does not reach them at all **[factual]** | They absorb a burden with no share of the efficiency benefit and no voice - the sharpest fairness gap in the grid **[contested]** |
| **Future applicants** *(voiceless)* | Inherit a system tuned to throughput, with human review as the exception rather than the norm **[contested]** | A weaker default expectation that a person, not a score, decides eligibility first **[contested]** | If "screen first, see a human later" becomes standard, the burden-on-the-error-prone pattern is locked in for everyone after **[contested]** |

**Trade-off pattern read-out**

- **Who bears the burdens, and on which principle:** the burden concentrates on the least-powerful parties - applicants wrongly down-scored (on autonomy and fairness, where they pay for errors they cannot see or contest) and, most sharply, applicants' dependents (on fairness and autonomy, where the consent chain does not even reach them). The agency carries the least burden and most of the benefit.
- **Where one party's benefit is paid for by another's burden:** the agency's lower processing cost and faster throughput (wellbeing benefit) are paid for by wrongly-down-scored applicants' delayed benefits and degraded ability to contest (autonomy and fairness burden). Faster decisions for the clearly-eligible (applicant wellbeing benefit) are paid for by concentrating the hard cases and the accountability on caseworkers (caseworker wellbeing and fairness burden). These are the benefit-here-paid-by-burden-there crossings a parties-only or principles-only discussion keeps missing.
- **The contested cells the assessment turns on:** the applicant autonomy cell (is an opaque, unrebuttable score acceptable as the first gate?), the two wrongly-down-scored cells (who should bear the cost of model error?), and the dependents' fairness cell (is it acceptable that the parties with no voice carry the sharpest burden?). The judgment hangs on these, which is where the review group's deliberation should focus.
- **Voiceless parties' exposure:** the grid makes plain that the worst-treated party is the one nobody in the room represents - applicants' dependents, who get a pure burden with no benefit, no consent, and no voice. That row would not appear at all in a "who showed up to the working group" analysis.

**No-verdict footer**

> This matrix maps the moral terrain of the screening rule across affected parties and principles. It is **not a score, a ranking, or a recommendation**, and it emits **no verdict**. It surfaces that the burden concentrates on the least-powerful and voiceless parties and that the judgment turns on a handful of contested consent-and-fairness cells; the weighing of those cells - whether the rule is acceptable, and what would have to change to make it so - is left to deliberation among the people who must decide (Schroeder and Palmer, 2003: the matrix is helpful for unpacking and fact-finding but "much less helpful" for weighing).

**Evidence caveat (ships with the artifact)**

> **Evidence tier: P (practitioner).** The ethical matrix has roughly twenty-five years of multi-domain application and serious methodological scrutiny, but **no controlled outcome study** exists - there is no measured evidence that using it produces better or more defensible ethical assessments, and no effect size is claimed here. All of that evidence is **human group-deliberation practice; none is on AI agents**, so an agent-produced matrix is a transferred-evidence application, not a validated one. Treat this artifact as a trade-off-mapping aid that made the trade-offs visible and contestable - not as a measure of how ethical the rule is, and not as a decision. See `evidence/dossier.md`.

*This skill works on paper. You do not need an agent - the grid is the method.*

## Why this prompt worked

Priya named one concrete **option**, gave a full **party roster** that deliberately kept the two voiceless rows, and stated the **principle columns** rather than letting them be swapped silently. That was everything the framework needs to do its real job: force a concrete impact into every cell, tag the contested ones so the value judgments stop hiding in wording, and read the result as a pattern of who-pays-for-whose-benefit rather than a tidy score. The detail she front-loaded is exactly what a careful by-hand run would itemize anyway.

## What happened next

The filled grid went straight into the review packet as the ethics section, and it changed the conversation in the working group. Instead of the debate sliding between applicants, fairness, and caseworker load, disagreement now attached to three named contested cells - the opaque-score autonomy cell and the two voiceless-burden cells - so the group argued about the right things in the right place. The dependents' row, which no one had raised before she gridded it, became the packet's headline concern and prompted a recommended notice-and-appeal safeguard. Priya was careful to keep the no-verdict footer attached: the matrix mapped the terrain, and the decision stayed with the people accountable for it. When she later needed to pressure-test whether the rule's framing had quietly assumed away the people it would screen, she reached for the [advisor](../../tools/think-framework-advisor/) to sequence the next step.
