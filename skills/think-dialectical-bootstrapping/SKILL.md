---
name: think-dialectical-bootstrapping
description: Produces a dialectical estimate that improves a single committed number by polling the inner crowd, make a first estimate, assume it is wrong and list why, read whether that pushes the answer too high or too low, make a second estimate from those changed assumptions, then mechanically average the two. Use when a hard, one-off, bounded-scale numeric estimate (a year, a percentage, a count, a forecast) is about to be committed and no second judge, no real reference class, and no better data are available. Not for easy questions, not for unbounded order-of-magnitude unknowns, and never a cherry-picked single number in place of the average.
license: Apache-2.0
metadata:
  id: thinking-framework-skills.dialectical-bootstrapping
  family: decision-and-option-evaluation
  evidence-tier: "M"
  version: 0.1.0
  standard: "0.8"
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Dialectical Bootstrapping

A single estimate of a hard quantity is an anchor: the first number that comes to mind quietly fixes the answer, and merely staring at it again does not move it. Dialectical bootstrapping breaks that anchor by simulating a second opinion from inside one head and then harvesting it the way a crowd is harvested - by averaging. The durable move is to **poll the inner crowd and force the synthesis to be arithmetic**: make a first estimate, deliberately assume it is wrong and generate a second estimate that draws on at least partly different knowledge, then take the plain arithmetic mean of the two numbers as the committed answer. The statistical reason it works is the wisdom of crowds in miniature - averaging two estimates cancels random error, and when the two bracket the truth (one too high, one too low) it eats into systematic error too. The "dialectical" name is literal: thesis (first estimate), antithesis (the contrarian second estimate), synthesis (the average). The output is a **dialectical estimate** artifact, not prose: the applicability check, both numbered estimates with the assumed-wrong reasoning that produced the second, and the non-negotiable average.

## When to Use

- A one-off numeric estimate is about to be committed on a genuinely hard question - a date, a percentage, a count, a forecast - where being off matters.
- No second human judge is available or consultation is impossible, so the only "second opinion" obtainable is a second pass from the same mind.
- No genuine reference class of comparable past cases exists to anchor an outside view, so reference-class forecasting is not an option.
- The quantity lives on a familiar or bounded scale (a year, a share, a percentage), where a deliberately different second guess can plausibly land on the other side of the truth.

## When NOT to Use

- **Do not use it on an easy question or one well within competence.** The strongest pre-registered evidence on the modern variant found a forced-different second estimate helps on difficult questions and actively HARMS accuracy on easy ones (Van de Calseyde and Efendic, 2025). When the first estimate is already close, the contrarian second mostly adds error that the average then bakes in.
- **Do not use it on an unbounded, order-of-magnitude unknown.** Muller-Trede (2011) found the gains vanish for general numerical questions whose answers range over orders of magnitude. That is `think-fermi-estimation`'s home regime - decompose the magnitude into factors instead of re-sampling a holistic guess.
- **Do not use it when a real second judge or real data is available.** Your own second opinion is worth about half of someone else's (Herzog and Hertwig, 2009); and if a genuine reference class exists, `think-reference-class-forecasting` (the outside view) dominates simulating a crowd from one mind. The method is a fallback, and it must say so.
- **Do not use it when the error is one shared load-bearing assumption.** Averaging two estimates from the same mind cannot remove a bias both estimates share; the inner crowd tops out near the value of only 1.5 independent judges (van Dolder and van den Assem, 2018). If the whole estimate hangs on one assumption, test that assumption instead of averaging over it.
- **Do not make the average optional.** The discipline IS the mechanical average. Left free, most people cherry-pick the estimate they now prefer or extrapolate outside their own two numbers, and the realized gain disappears (Muller-Trede, 2011). The final answer is the mean of the two estimates - never a single number you liked better, never a value outside their range.
- **Do not use it on a qualitative judgment.** The move is defined for quantitative point estimates only. There is no arithmetic mean of two opinions, so there is nothing to average.

## Instructions

When asked to firm up or pressure-test a single numeric estimate, follow these steps:

1. **Run the applicability check first, before touching any number.** Confirm all four gates: the question is genuinely hard (not easy or routine); the quantity is a point estimate on a bounded or familiar scale (not an order-of-magnitude unknown); it is a one-off commitment; and no real second judge, no reference class, and no better data are available. If any gate fails, stop and route to the right tool (an easy question needs no method; an unbounded magnitude routes to fermi-estimation; available data routes to reference-class-forecasting; a single load-bearing assumption routes to assumption-testing).
2. **Make the first estimate.** State the single best point estimate of the quantity, with its units and the scale it lives on. This is the thesis.
3. **Assume the first estimate is wrong and say why.** Deliberately suppose the first number is off the mark. List the assumptions and considerations behind it that could have been mistaken, and what different knowledge a skeptic would bring. The goal is a genuinely different basis, not a token nudge.
4. **Read the direction the doubts imply.** From those reasons, judge whether the first estimate was more likely too high or too low. This direction is what gives the second estimate a chance to bracket the truth.
5. **Make the second estimate from the changed perspective.** Produce a second point estimate built on the doubts and the implied direction - the antithesis. It should be a real re-estimate from different assumptions, not the first number shaded slightly.
6. **Mechanically average the two estimates.** Take the plain arithmetic mean of the first and second estimates. This mean is the committed answer. Do not pick a favorite, do not weight them by which "feels" right, do not land outside the range between them.
7. **Note bracketing and carry the caveat.** Record whether the two estimates straddle a plausible truth (one high, one low) - bracketing is where the method earns its keep. Carry the evidence caveat into the artifact: this is an M-tier, human-subjects-validated, modest aid (about a few percent error reduction at best), not a guarantee, and a real judge or real data would beat it.

## Output Format

Use the template in `references/TEMPLATE.md`. The deliverable is the filled **dialectical estimate** - the applicability check, the first estimate, the assumed-wrong reasoning and its direction, the second estimate, the mechanical average as the committed answer, and the carried caveat - not a prose argument. The final answer is always the arithmetic mean of the two estimates.

## Quality Checklist

Before finalizing, verify:

- [ ] The applicability check passed all four gates (hard question, bounded-scale point estimate, one-off, no better source), and the artifact records it.
- [ ] There is a first estimate and a genuinely different second estimate - the second is built on assumed-wrong reasoning and a stated direction, not a token nudge from the first.
- [ ] The committed answer is the plain arithmetic mean of the two estimates - not a cherry-picked single number and not a value outside their range.
- [ ] The bracketing note states whether the two estimates straddle a plausible truth.
- [ ] The artifact routes out rather than runs when a gate fails (easy question, unbounded magnitude, available judge or data, single load-bearing assumption, qualitative judgment).
- [ ] No overclaiming: the carried caveat states the evidence is M-tier and transferred from human studies, the effect is modest, this is not a guarantee, and a real second judge or real reference class would beat it (see `evidence/dossier.md`).

## Evidence

Tier **M** (moderate, governing). The record has two layers the honest grade keeps apart. The robust layer: averaging two self-generated estimates beats the first estimate (Vul and Pashler, 2008; the pre-registered replication Steegen et al., 2014, dz = 0.34 to 0.72; van Dolder and van den Assem, 2018, about 1.2 million estimates). The contested layer: how much the deliberate consider-the-opposite instruction adds over a plain second guess - the original experiment measured a 4.1 percentage-point gain at d = 0.53 (Herzog and Hertwig, 2009), but White and Antonakis (2013) found no advantage under a different accuracy measure, and the modern variant's benefit is difficulty-dependent (helpful on hard questions, harmful on easy ones; Van de Calseyde and Efendic, 2025). M, not S: the effects are modest (about 4 percent error reduction at best), the instruction's increment is measure- and difficulty-dependent, and the critique exchange is unresolved. All evidence is from human subjects (students, online panels, casino patrons); none validates the procedure performed by an AI agent, which independently caps the grade. The skill ships honestly as an estimate-improvement aid with hard walls, never as a guaranteed accuracy gain. Full grading, sources, and caveats: `evidence/dossier.md`.

## Examples

See `references/EXAMPLE.md` for a completed dialectical estimate on a real decision.
