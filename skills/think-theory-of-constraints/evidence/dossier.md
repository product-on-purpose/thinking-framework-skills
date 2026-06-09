# Evidence Dossier: Theory of Constraints

> Single source of truth for the `theory-of-constraints` skill. The SKILL.md, sidecar, and evals derive from this. If a claim is not here, it does not belong in the skill.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.theory-of-constraints` (installable name `think-theory-of-constraints`) |
| **Family** | systems-and-consequences |
| **Evidence tier** | **P** governing (honest floor and ceiling - see "What the evidence shows") |
| **Confidence** | High that the bottleneck principle is real and operationally useful; low that any controlled effect size for the bare cognitive move transfers to agents |
| **Status** | draft (admitted from the v0.5.0 catalog-expansion shortlist) |

---

## 1. The mechanism (what actually does the work)

The Theory of Constraints starts from one claim: the throughput of a whole system is governed by a single binding constraint - its bottleneck - and so improving anything other than that constraint does almost nothing for the system as a whole. The durable cognitive move is the **Five Focusing Steps**: (1) **identify** the system's one binding constraint, the step whose limited capacity caps the output of everything downstream; (2) **exploit** it, wringing maximum useful throughput out of that step with the resources already on hand before spending a cent; (3) **subordinate** every other step to that decision, so non-constraints run at the pace the constraint can absorb rather than at their own local maximum; (4) **elevate** the constraint, adding capacity to it only once exploitation is exhausted; and (5) repeat - when the constraint moves, return to step one and do not let inertia keep you optimizing yesterday's bottleneck.

The move that does the work is the inversion of ordinary improvement instinct. The default is to make every part faster, cheaper, or more utilized; this method says that local efficiency at a non-constraint is waste, because a non-bottleneck working harder just builds inventory in front of the bottleneck. The single question it forces is whether one step limits the throughput of the whole, and whether effort is aimed there or scattered. The deliverable is the named binding constraint plus the exploit / subordinate / elevate decisions attached to it - a single-point intervention plan, not a coverage map.

**Scope (load-bearing for the grade below).** The method is broader than this core in practice. Goldratt built operational toolkits on top of it - Drum-Buffer-Rope for production scheduling, Critical Chain Project Management for projects, and Throughput Accounting for the money view - plus a separate logic-diagram toolkit, the **Thinking Processes** (Current Reality Tree, Evaporating Cloud / conflict resolution diagram, Future Reality Tree, Prerequisite and Transition Trees), for diagnosing what to change, what to change to, and how to cause the change. This skill is scoped to the bottleneck move itself - find and exploit the system bottleneck - not to those full operational systems, and that scoping is load-bearing for the evidence grade in section 3.

## 2. Lineage

- The Theory of Constraints is **Eliyahu M. Goldratt**'s (1947-2011), an Israeli physicist turned management thinker. He introduced it in 1984 through the business novel *The Goal* (with Jeff Cox), which dramatizes the Five Focusing Steps on a struggling factory and has sold millions of copies as standard operations-management reading.
- Goldratt extended the core into Critical Chain project management (*Critical Chain*, 1997) and codified the logic-diagram **Thinking Processes** in *What Is This Thing Called Theory of Constraints and How Should It Be Implemented?* (1990).
- **Naming and attribution.** "Theory of Constraints" and "bottleneck analysis" are used generically across the academic and practitioner literature with attribution to Goldratt; the term is not handled here as a trademark. This entry is documented descriptively with attribution to Goldratt rather than flagged as branded; attribution is required, trademark string is none.

## 3. What the evidence shows, and what it does NOT show

The honest governing grade is **P (practitioner)**, and the split underneath it is the whole point of this entry. P is both the floor and the ceiling.

**What the record supports.** The bottleneck principle is durable, broadly taught, and - unusually for a practitioner method - endorsed even by its critics. Mukherjee and Chatterjee (2007) note that the criticism of Goldratt's work targets his lack of academic rigour and presentation, but not the bottleneck approach, treating the two as separate questions. On the operational side there is a large descriptive literature: Mabin and Balderstone's review of the international literature (the 2000 book and the 2003 *IJOPM* paper, "The performance of the theory of constraints methodology") aggregated on the order of 80-plus reported applications and found consistent, often large improvements in lead time, inventory, due-date performance, and financial results. Domain reviews echo the pattern: Bacelar-Silva, Cox and Rodrigues (2020), a systematic review of 42 implementations in healthcare, reports positive results across the board - improvements in productivity and timeliness in the large majority of studies - and concludes the evidence supports the method as a promising solution. So the supported claim is real and worth stating plainly: in flow-heavy operational settings, focusing improvement on the binding constraint is a sound, repeatedly-reported way to lift system throughput.

**What the record does NOT support.** None of this is controlled, comparative effectiveness evidence for the cognitive move. Two cautions are decisive.

1. **Selection bias.** Mabin and Balderstone explicitly report finding *no documented failures* in the literature - an outcome that, in a body of self-reported success stories and consulting case studies, signals a literature of winners rather than an unbiased effect estimate. It is not evidence of a method that never fails.
2. **The move under test is not the move shipped.** Almost all of the operational evidence measures the *full apparatus* - Drum-Buffer-Rope scheduling, Critical Chain, Throughput Accounting - implemented as a management system, not the bare identify-and-exploit reasoning step. The part of the method closest to a standalone thinking method, the **Thinking Processes / Evaporating Cloud**, has the *weakest* evidence: Kim, Mabin and Davies (2008), reviewing the peer-reviewed Thinking-Processes literature from 1994 to 2006, document how thin the empirical base is, and the broader literature notes there is little to no controlled empirical validation of the Evaporating Cloud's effectiveness in decision-making.

So the evidence is genuinely split - operational use is P with selection-bias caveats; the thinking tools are closer to anecdotal and largely unvalidated - and the conservative governing grade is the lower-supported reading of the *actual move*, which is **P**. Grading it above P would borrow the operational system's case-review record for a reasoning step those studies did not isolate; grading it below P would understate that the bottleneck principle has real, repeated operational backing and near-universal endorsement.

## 4. Transferred-evidence flag

**True.** Every result above is from human teams in manufacturing, projects, and healthcare. None studies a constraint analysis produced by or with an AI agent. The evidence is transferred from human operational practice and is not validated for AI-augmented use; that transfer is a second, independent reason the governing grade is capped at P.

Why the AI value still holds: a model reaching for "make every step faster" or fixing the loudest-complained-about step is exactly the failure this move counters. Forcing the explicit capacity-versus-demand test that singles out one binding step, gating elevate behind exploit, and emitting an inspectable plan is a direct counter to naming the loudest step instead of the binding one. Those benefits do not depend on any unproven outcome claim.

## 5. When it works / when it fails (drives the eval negative cases and "When NOT to Use")

**Works best when:** a system has a clear **flow** and a plausible single rate-limiter - a delivery pipeline, a manufacturing line, a hiring funnel, a support queue, a CI pipeline, a multi-stage approval. When throughput is capped by one step and teams are spreading improvement effort evenly across all steps, the discipline - find the binding step, squeeze it before buying capacity, and stop optimizing the steps that are not the constraint - is a sharp, useful correction. Its anti-coverage stance is exactly the value: it tells you what to ignore.

**Fails or misleads when (poor-fit / anti-patterns):**
- **There is no single binding constraint, or the constraint is not stable.** The method assumes one dominant bottleneck governs the system. With several co-equal limiters, a shifting constraint, or no flow at all (a one-off decision, a design question, a values trade-off), forcing a single-constraint frame manufactures a bottleneck that is not really binding and points effort at the wrong place.
- **The problem is about coverage or root cause, not flow.** Exhaustive decomposition of every category of cause or option is `think-issue-tree`; recurring-and-structural-cause questions are `think-iceberg-model`; this method answers neither - it answers where the rate-limiting step is.
- **The constraint is treated as found rather than tested.** "Identify the constraint" is a hypothesis. A wrongly named bottleneck - the loudest step rather than the binding one - sends the whole exploit / subordinate / elevate sequence at the wrong target. The method does not itself prove which step is binding; that requires data on each step's capacity versus demand.
- **Local optimization is genuinely the right call.** "Subordinate everything to the constraint" is correct only when one constraint really governs. Applied where it does not, it can justify starving healthy parts of a system to feed a step that was never the true limiter.

## 6. Output artifact

The skill must emit a **constraint-intervention plan**, not prose. It carries:

- the **named binding constraint** (one step), stated as a hypothesis;
- the **capacity-versus-demand test** per step that this step is genuinely the rate-limiter, not the loudest step (each step's capacity against the demand placed on it; the constraint is where demand meets or exceeds capacity and downstream starves);
- the **exploit** decision (wring maximum throughput from that step with resources already on hand, before spending);
- the **subordinate** decision (run every non-constraint at the pace the constraint can absorb, not at its own local maximum);
- the **elevate** decision (add capacity to the constraint only once exploitation is exhausted);
- the **re-check** trigger (when the constraint moves, the plan is stale - return to identify; do not let inertia keep optimizing yesterday's bottleneck).

A short summary sits above the plan.

## 7. Sources

1. Eliyahu M. Goldratt and Jeff Cox, *The Goal: A Process of Ongoing Improvement* (North River Press, 1984). The founding text; introduces the Five Focusing Steps and the bottleneck principle in narrative form. Foundational / practitioner.
2. Eliyahu M. Goldratt, *What Is This Thing Called Theory of Constraints and How Should It Be Implemented?* (North River Press, 1990). Codifies the Thinking Processes logic tools. Primary source.
3. Victoria J. Mabin and Steven J. Balderstone, "The performance of the theory of constraints methodology: analysis and discussion of successful TOC applications," *International Journal of Operations and Production Management* 23(6) (2003), 568-595; and *The World of the Theory of Constraints: A Review of the International Literature* (St. Lucie Press, 2000). The most comprehensive review of reported applications; documents large operational and financial improvements and, notably, no reported failures (a selection-bias signal). (P, review of success cases.)
4. Gabriel M. Bacelar-Silva, James F. Cox III, and Pedro P. Rodrigues, "Outcomes of managing healthcare services using the Theory of Constraints: a systematic review," *Health Systems* 11(1) (2020), 1-16. Systematic review of 42 healthcare implementations; positive outcomes (productivity, timeliness) but a heterogeneous evidence base including non-peer-reviewed sources, no controlled-trial or bias assessment. (P, domain systematic review.)
5. Sangwon Kim, Victoria J. Mabin, and John Davies, "The theory of constraints thinking processes: retrospect and prospect," *International Journal of Operations and Production Management* 28(2) (2008), 155-184. Reviews the peer-reviewed Thinking-Processes literature (1994-2006) and documents the empirical and publication gaps in the logic tools. (Critical / review literature; bounds the thinking-tools evidence.)
6. Ashok Mukherjee and A. K. Chatterjee, "Theory of constraints: is it a theory and a good one?" (2007). Separates criticism of Goldratt's academic rigour from the validity of the bottleneck approach itself; useful for not conflating the two. (Critical literature.)

> Excluded on the evidence rule: the general impression that "the method always works," and any implied success rate read off the no-failures-reported literature, trace to a self-selected body of success cases with no controlled comparison; they are not counted toward the grade.

> **Verification status:** The bottleneck principle and the no-failures-reported caveat are well-attested and mutually consistent. Confirm the Mabin and Balderstone (count of applications) and Bacelar-Silva, Cox and Rodrigues (42 implementations) citation specifics before any public quantified claim. The honest scope - a durable, operationally-backed principle whose specific cognitive step has no controlled comparative trial, transferred from human practice - is the core caveat.
