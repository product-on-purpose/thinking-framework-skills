---
title: Kill criteria / Tripwires
slug: kill-criteria-tripwires
generated_status: true
---

<!-- STATUS:GENERATED (gen-site.mjs from frameworks/registry.mjs) - do not edit between these markers -->
<!-- /STATUS:GENERATED -->

## What it is

Kill criteria and tripwires are the same durable move under two names: decide, in advance and while you are still cool-headed, the observable conditions under which you will stop, reverse, or re-review a commitment, and write them down before you are invested. A tripwire is the early-warning version (a pre-set signal or checkpoint that fires a review when a specific condition is met). A kill criterion is the stop-the-project version (a pre-set condition that, if hit or missed, ends the commitment rather than just triggering a look). Both replace a vague "we'll keep an eye on it" with a concrete, falsifiable rule attached to a specific signal.

The popular packaging gives the move its memorable shape. Annie Duke's formulation in *Quit* is a "state and a date": an objective, measurable condition ("if we have not reached X") paired with a time ("by Y, we quit"). Her stock example is Google X's project filter - a project must be capable of 10x world-changing impact, plausibly commercially viable, within five to ten years - which is just three kill criteria stated as states and a date. In the intelligence-analysis tradition the same move travels under "indicators" or "tripwires": a pre-specified observable whose appearance forces an analyst to revisit a standing judgment.

Separate the underlying move from the packaging, because the packaging is where the brand value sits and the move is where the cognitive value sits. The durable move is: pre-commit to a stop/review signal, expressed as an observable condition, before you are emotionally and financially bought in. That is a single sentence of mechanism. The "state and a date" mnemonic, the kill-vs-tripwire vocabulary, and the project-filter examples are useful teaching scaffolding around that one sentence, not additional machinery.

## When it helps / when it misleads

It helps most where the documented bias it counters is strongest: escalating commitment to a losing course of action. Once you are personally responsible for, and publicly committed to, a bet that is going badly, you reliably throw good resources after bad. A condition written down before that emotional and reputational weight existed is harder to rationalize away in the moment, because the future, invested self is arguing against a rule the past, neutral self already set. So the move fits high-commitment, hard-to-reverse pursuits with a real chance of failure: funding a project, running a launch, holding a position, persisting with a strategy, staying in a hire or a vendor.

It misleads or wastes effort when:

- **The criteria are vague rather than observable.** "If it's clearly not working" is not a tripwire; it is the same soft judgment dressed as a rule, and it will be re-interpreted under pressure exactly like the worry it replaced. The move only works if the condition is something you could check without arguing about whether it is met.
- **It is set but never enforced.** The mechanism is a precommitment; its value is in the follow-through when the wire trips. A kill criterion that the team negotiates away the moment it fires ("yes but this time is different") has bought nothing. The hard part is honoring it, not writing it.
- **The threshold is false precision.** A confidently specific number ("kill at 11.5% conversion") can launder a guess into a rule. The discipline is pre-commitment to *a* signal, not the illusion that the exact cutoff is the right one; treat the threshold as a tripwire to re-review, not always as an automatic execution.
- **There is nothing to stop.** For trivial or fully reversible (two-way-door) decisions, the ceremony is not worth it. You can just change your mind cheaply.

## What the evidence says

The honest grade is **P (practitioner)**, the governing tier for this entry. The move is famous, plausible, and grounded in a real bias, but the controlled evidence is for the underlying de-escalation effect, not for the branded "kill criteria" or "tripwire" packaging.

**What the record supports.** The bias the move targets is one of the most replicated findings in decision research. Barry M. Staw's "Knee-deep in the Big Muddy" (Organizational Behavior and Human Performance, 1976) established escalation of commitment experimentally: people commit the *most* additional resources to a course of action precisely when they are personally responsible for its prior failure. The intervention this move is built on also has a direct, nameable test. Simonson and Staw (Journal of Applied Psychology, 1992, "Deescalation Strategies") compared techniques for reducing commitment to losing courses of action and found that having decision-makers prespecify in advance the minimum target levels that, if not met, would trigger a change of policy was one of the most effective de-escalation strategies, alongside process-based (rather than outcome-based) evaluation. Prespecified stopping conditions made people more likely to actually cut their losses than a control condition. That is, as close as the literature comes, a direct test of the kill-criteria mechanism, and it is positive.

**What the record does NOT support.** There is no controlled, comparative study (that I can locate) of "kill criteria" or "tripwires" as named, packaged methods showing they beat an unstructured alternative on decision quality. The supporting evidence is for the *generic* de-escalation move (prespecified stopping points), studied with business-school subjects in investment role-plays, not for the branded articulations or their specific mnemonics. Annie Duke's *Quit* and the intelligence-community tripwire literature are practitioner and tradecraft sources, not experiments; they describe and teach the move, they do not measure it. No traceable effect-size percentage for "kill criteria improve decisions" maps to a primary source, so none is quoted here.

**Transfer caveat (required).** All of the above is human-subjects evidence - MBA students in escalation simulations, managers, analysts. None of it studies the move performed by or with an AI agent. The evidence is transferred from human contexts and not validated for AI-augmented use; the conservative governing grade is therefore **P**, supported by a real bias and one direct de-escalation experiment, but not lifted above P by packaging-specific or agent-specific proof.

> Excluded under the evidence rule: popular write-ups assert that pre-set kill criteria "make you more likely to quit well" or improve outcomes by an implied margin; the defensible, sourced claim is narrower - prespecifying stopping conditions reduced escalation in Simonson and Staw (1992) - and only that is counted toward the grade.

## Why it is / is not a skill here

Verdict: **Fold into `premortem`.** The registry reasoning is exact: "Subsumed: inside premortem's register." This is not a close call resolved by overlap percentages; it is a literal subset, because the kill criterion and the tripwire are named, mandatory columns of the artifact that `think-premortem` already emits.

The Build burden is to name a distinct, durable move that no shipped skill already produces, above the roughly 20% overlap ceiling. The kill-criteria/tripwire move is "for a risk you care about, pre-commit to an observable signal and a pre-decided response (stop, reverse, or re-review)." Read `think-premortem`'s mandatory conversion step: for each top cause of failure it requires a **leading signal / tripwire** (the early sign it is happening) and a **kill criterion** (the pre-decided condition under which you stop or change course), plus a mitigation and an owner, emitted as a ranked risk register. The two named outputs of this candidate - "tripwire" and "kill criterion" - are the same two words, doing the same job, that premortem's register already carries by name. The overlap is not near the ceiling; it is total. There is no separable mechanism left over once premortem has run.

What the standalone packaging adds over premortem's columns is teaching scaffolding, not a new move: Annie Duke's "state and a date" format is a *style guide* for writing a good kill criterion (make it an objective condition plus a time), and the intelligence-tradecraft "indicator" vocabulary is the same column under another name. Those are worth absorbing as guidance inside premortem's conversion step - "write each kill criterion as a measurable state and a date" - rather than shipping a second skill whose entire output is two columns of a register premortem already produces.

Why `premortem` and not another neighbor:

- **vs `pre-commitment-ulysses-contract` (folds into `woop`):** the Ulysses-contract move is binding your *own future behavior* against a known weakness (the commitment device, the locked-in self-control mechanism). Kill criteria are the inverse direction - they are the *signal-and-response* you pre-decide for a *project or bet*, surfaced as part of imagining its failure. The natural home for "imagine the failure, then attach a tripwire and a stop rule to each cause" is the failure-imagining skill, premortem, not the self-binding skill.
- **vs `regret-minimization` and the rest of the risk family:** those are different mechanisms (reframe to a future self, base-rate outside view, goal-obstacle-plan). None of them emits a tripwire-and-kill-criterion register. Premortem does, by construction.

The learning value of this fold is the same lesson the library's other risk-family folds teach (FMEA-lite's detection column into premortem; inversion into premortem): a celebrated, well-named decision method can still be a fold when its entire deliverable is already a labeled part of a shipped skill's artifact. Kill criteria and tripwires are real, useful, and worth knowing - which is why they are documented here rather than dropped - but they are not a distinct skill in this catalog. They are two columns of the premortem register, and the honest service is to point the reader there and to carry the "state and a date" guidance into that skill's conversion step.

## Lineage and who to read

The mechanism is old and arrives from several traditions at once, which is why it has several names.

- **Decision practice.** Annie Duke popularized "kill criteria" in *Quit: The Power of Knowing When to Walk Away* (Portfolio/Penguin, 2022), building on the escalation and sunk-cost research and on her earlier *Thinking in Bets* (2018). Her contribution is the operational format - a kill criterion as a measurable "state and a date," set before you start, and the explicit pairing of kill criteria with premortems to overcome the psychology of not quitting. She is a popularizer and synthesizer here, not the source of the underlying effect; the format is hers, the mechanism is older.
- **Intelligence tradecraft.** Richards J. Heuer Jr. and Randolph H. Pherson, in *Structured Analytic Techniques for Intelligence Analysis*, formalize "indicators" (also taught as tripwires): pre-specified observables whose appearance should force an analyst to revisit a standing judgment. This is the same move applied to belief revision rather than project termination.
- **Practitioner synthesis.** The Uncertainty Project's "Tripwires" tool is a clean modern write-up: pre-determined signals or checkpoints that trigger a decision, review, or action when specific conditions are met, framed explicitly as a counter to commitment bias.
- **The research root.** The bias the move counters and the one direct test of the move both come from organizational psychology, below.

"Kill criteria" and "tripwires" are generic descriptive terms in common use (no trademark, no required attribution beyond crediting the popularizers and the research), which is why this entry is documented descriptively and is not flagged as branded. To read the move at its best, pair Duke's *Quit* (for the format and the psychology of following through) with Simonson and Staw 1992 (for the one controlled result that the move actually rests on), and treat the gap between them - a famous format, a single adjacent experiment - as the honest evidence picture.

### Named sources

- Barry M. Staw, "Knee-deep in the Big Muddy: A Study of Escalating Commitment to a Chosen Course of Action," *Organizational Behavior and Human Performance* 16(1) (1976): 27-44. The founding experiment on escalation of commitment: personal responsibility for a prior loss increases subsequent investment in the failing course. Establishes the bias the move exists to counter. (Foundational)
- Itamar Simonson and Barry M. Staw, "Deescalation Strategies: A Comparison of Techniques for Reducing Commitment to Losing Courses of Action," *Journal of Applied Psychology* 77(4) (1992): 419-426. Found that prespecifying in advance the minimum target levels that would trigger a change of policy was among the most effective de-escalation strategies. The closest direct test of the kill-criteria/tripwire mechanism, and it is positive - on human subjects in investment role-plays. (The load-bearing empirical source for the P grade)
- Annie Duke, *Quit: The Power of Knowing When to Walk Away* (Portfolio/Penguin, 2022). The popular articulation of "kill criteria" as a measurable "state and a date" set before you start, paired with premortems to overcome the psychology of not quitting (Google X project-filter example). Practitioner synthesis; describes and teaches the move, does not test it. (P)
- Richards J. Heuer Jr. and Randolph H. Pherson, *Structured Analytic Techniques for Intelligence Analysis* (CQ Press / SAGE; 2nd ed. 2014, 3rd ed. 2020). Formalizes "indicators"/tripwires as pre-specified observables that force re-examination of a standing judgment. The intelligence-tradecraft lineage of the same move. (Practitioner reference)
- The Uncertainty Project, "Tripwires" (theuncertaintyproject.org/tools/tripwires). Practitioner write-up defining tripwires as pre-set signals or checkpoints that trigger a review when specific conditions are met, framed as a counter to commitment bias. (Practitioner-popular)

> Excluded under the evidence rule: claims that kill criteria or tripwires "improve decisions" by an implied margin have no primary source measuring the named packaged method; only Simonson and Staw's (1992) de-escalation result for prespecified stopping points is counted toward the grade, and it is human-subjects evidence not validated for AI-augmented use.
