---
name: think-eisenhower-moscow-pareto
description: Runs one of the three lightweight prioritization presets (Eisenhower urgent-important 2x2, MoSCoW Must/Should/Could/Wont bucketing, or Pareto vital-few cut) caveat-first. It leads with the fact that this is a bundle of three different operations stapled by the word "prioritization", not one move, and each is weakly evidenced, then produces the one preset the user named with the discipline a canned template lacks. Use only when an Eisenhower matrix, MoSCoW list, or Pareto chart is asked for by name; for the rigorous versions prefer think-theory-of-constraints, think-one-way-vs-two-way-door, or think-decision-option-review.
license: Apache-2.0
metadata:
  id: thinking-framework-skills.eisenhower-moscow-pareto
  family: decision-and-option-evaluation
  evidence-tier: "P"
  version: 0.1.0
  standard: "0.8"
  caveat-first: true
  posture: run_caveat_first
  recommendation-policy: explicit_request_only
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Eisenhower / MoSCoW / Pareto

These are the three most widely taught lightweight prioritization presets: the Eisenhower urgent-important 2x2, MoSCoW four-bucket scope cutting, and the Pareto vital-few chart. They are famous, frequently requested, and weakly evidenced as decision tools. This skill runs whichever one was asked for honestly: it leads with the caveat, then produces that single preset with the discipline its bare template omits.

## Before you run this: the evidence caveat

These three sit at tier **P** (practitioner heuristic, no controlled effectiveness evidence). They are not one method but a bundle of three different operations stapled together by the word "prioritization", and that heterogeneity is the central fact: Eisenhower is categorical triage by two canned axes, MoSCoW is ordinal bucketing against one implicit scale, Pareto is a descriptive concentration observation. None has a controlled or comparative study measuring it against an alternative on decision quality. The strong study quoted to make Eisenhower look evidence-backed, Zhu, Yang and Hsee (2018), measures the *mere urgency effect* - the bias the matrix targets - not the matrix as a remedy; borrowing that grade would be laundering a finding about the disease onto a claim about the cure. MoSCoW's best-documented failure is category inflation: anything not a "Must" rarely gets built, so users mark almost everything "Must" and the method stops where the hard ranking begins. Pareto's concentration is real but domain-dependent and usually not 80-20: Kim, Singh and Winer (2017) measured a ratio averaging about 0.73 across 22 packaged-goods categories. Never invent an effectiveness number, and never report a clean 80-20 split the data does not support.

## When to Use

- The user asks for an Eisenhower matrix, a MoSCoW list, or a Pareto chart by name and you should run it honestly rather than refuse.
- A fast, cheap prioritization is genuinely wanted and the cost of getting it slightly wrong is low, and you will add the discipline the bare template lacks.
- As a quick jolt: Eisenhower when urgent noise is crowding out the important; MoSCoW when stakeholders need a shared word for "not this release"; Pareto when you want to check whether a minority of causes drives most of an effect before spreading effort evenly.

## When NOT to Use

- When the job is to focus a system on its one binding constraint: use `think-theory-of-constraints`, which adds the capacity-versus-demand test that proves which few are actually binding (the step a bare Pareto chart lacks, since it shows concentration but not causation).
- When the decision turns on how much deliberation a choice deserves (reversibility, urgency, stakes): use `think-one-way-vs-two-way-door` rather than forcing it into an urgent-important grid.
- When you need to compare items against criteria that actually matter: use `think-decision-option-review` with the criteria named honestly, instead of MoSCoW's single canned axis and pre-binned labels.
- When the canned axis would be treated as the analysis instead of a prompt, or when the real driver is cost, dependency, or value that the preset cannot see.

## Instructions

When asked to run one of these presets, follow these steps:

1. **Lead with the caveat.** State up front that this is a bundle of three weakly-evidenced presets, that you will run the one named, and that the value is the discipline you add, not the template. Do not invent an effectiveness number.
2. **Identify which one.** If the user named the preset (Eisenhower / MoSCoW / Pareto), run that one. If they did not, ask, or pick the closest fit and say which you chose and why.
3. **Run the one preset, honestly:**
   - **Eisenhower:** a 2x2 of urgent x important, each item placed in one quadrant, with one canned action per quadrant (do now / schedule / delegate / delete). Name where urgent-important is the wrong pair of axes for this decision.
   - **MoSCoW:** four ordinal buckets - Must / Should / Could / Won't (this time) - against a stated timebox. Guard against category inflation: justify every Must against the timebox, and rank within the Must bucket so the method does not stop where the hard choice begins.
   - **Pareto:** a ranked-contribution list with each item's share and a cumulative running total, and a cut line marking the vital few. State the measured concentration; do not assume 80-20.
4. **Name the limit.** Flag the one place the canned template hides the real driver (Eisenhower's assumed axes, MoSCoW's intra-bucket ranking, Pareto's concentration-not-causation), and point to the rigorous skill if that limit is binding.
5. **Emit the single chosen artifact** per `references/TEMPLATE.md`, caveat leading.

## Output Format

Use the template in `references/TEMPLATE.md`. The deliverable is exactly one of the three artifacts (the one asked for), produced with its discipline added, the caveat leading, and the limit named - not all three, and not a bare template presented as analysis.

## Quality Checklist

Before finalizing, verify:

- [ ] Leads with the evidence caveat (Zhu, Yang and Hsee 2018 measures the urgency bias, not the matrix; Pareto is usually not 80-20) before the artifact; does not overclaim the method's value.
- [ ] Exactly one of the three presets is produced (the one named), not a bundle of all three.
- [ ] Eisenhower: each item in one quadrant with a canned action; or MoSCoW: every Must justified against the timebox and ranked within the bucket; or Pareto: shares plus a cumulative total and a cut line, with the real measured concentration stated.
- [ ] The place the canned template hides the real driver is named, with the rigorous alternative pointed to.
- [ ] No invented effectiveness number and no assumed 80-20 split appear.

## Evidence

Tier **P** (practitioner heuristic; recognized and useful, but no controlled effectiveness evidence). It ships as a contested lens, caveat-first and explicit-request-only, because these are among the most-requested prioritization tools in the world and an honest run that leads with the deficiency and adds the missing discipline beats a flat refusal. The Eisenhower 2x2 is Covey's "Time Management Matrix" (1989) from a 1954 Eisenhower remark; the strong urgency-effect study (Zhu, Yang and Hsee 2018) measures the bias, not the matrix. MoSCoW is Clegg (1994, later DSDM). Pareto is Juran's "vital few" generalization of Pareto's 1896 observation; the honest measured ratio is about 0.73 (Kim, Singh and Winer 2017). Evidence is transferred from human contexts, not AI-validated. Full grading: `evidence/dossier.md`.

## Examples

See `references/EXAMPLE.md` for a completed honest run (a MoSCoW scope cut with category inflation guarded and the intra-bucket ranking added).
