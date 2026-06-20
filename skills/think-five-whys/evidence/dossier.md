# Evidence Dossier: Five Whys (contested lens)

> Single source of truth for the `five-whys` skill. The SKILL.md, sidecar, and evals derive from this. The full catalog dossier (why Five Whys is not a core skill) lives at `frameworks/five-whys/dossier.md`; this is the skill-facing grounding.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.five-whys` (installable name `think-five-whys`) |
| **Family** | problem-framing |
| **Evidence tier** | **X** (weak or contradictory evidence) |
| **Posture** | contested lens, run-caveat-first, explicit-request-only |
| **Confidence** | Low that the single chain identifies the cause for any non-trivial problem; the added discipline (flag branches, redirect on multi-cause) is what carries value |

## 1. The mechanism

Five Whys traces a problem to a cause by asking "why?" of an answer, taking that answer, asking "why?" again, and repeating roughly five times until it reaches a cause worth acting on. The durable move underneath is iterative causal descent: refuse to stop at the first explanation. The liability is the single-chain shape: it follows one "why" at each step and discards the other contributing causes, so the output looks like THE cause when it is one among many. This skill runs it caveat-first and adds the one thing the critique found missing: an explicit branch-or-not flag on each step, and a hard stop to redirect to a branching tool the moment a step branches or the failure is socio-technical. The output is a single linear why-chain with branch flags, a terminal root cause, and one countermeasure.

## 2. Lineage

- Originates with **Sakichi Toyoda** (1867-1930), founder of Toyota Industries, as a shop-floor discipline of asking "why" past a symptom to the underlying fault.
- Formalized by **Taiichi Ohno** (1912-1990), architect of the Toyota Production System, who treated repeated "why" as Toyota's scientific method and used "five" as a practical stopping rule of thumb (his canonical chain runs from a stopped machine through an overloaded fuse and a worn shaft to a missing filter).
- Spread from the Toyota Production System into Lean, Six Sigma, agile retrospectives, and incident management.
- "Five Whys" / "5 Whys" is a generic descriptive term in common use; no trademark, no owner.

## 3. What the evidence shows, and what it does NOT show

**The governing critique (contradictory evidence):** Alan J. Card, "The problem with '5 whys'," *BMJ Quality & Safety* 26(8) (2017): 671-677, argues that for root-cause analysis the technique is misguided: it oversimplifies complex problems, follows a single causal chain when failures are multi-causal, and limits understanding of how processes actually fail. Card's prescription is branching, systems-oriented causal-tree diagramming. John Allspaw, "The Infinite Hows (or, the Dangers of the Five Whys)" (2014), drawing on Dekker, Conklin, and Leveson, adds that the linear chain ignores socio-technical complexity and drifts toward "who" and blame (the "Bad Apple" trap); he proposes "how" over "why" to recover the multi-contributor picture. The documented practitioner limitations - non-reproducibility across investigators, the tendency to isolate a single root cause, stopping too soon at symptoms, and the inability to surface a cause the investigator does not already know - are catalogued (including in the method's own Wikipedia entry) and not seriously contested even by defenders.

**NOT shown:** there is no controlled or comparative study showing Five Whys produces more accurate root-cause identification than a plain causal discussion, a fishbone, or any branching tool, for any class of problem. Any "fixes N% of problems" or "reduces recurrence by N%" claim is unsupported folklore traceable to no primary source and must never be reproduced.

## 4. Transferred-evidence flag

Evidence is from human investigators in manufacturing, healthcare, and software operations, not AI-augmented use. Transferred, not AI-validated. The honest AI value is narrow: forcing a branch-flagged chain that admits when it is discarding alternatives, and redirecting to `think-issue-tree` on any branch, turns a discredited default into a bounded artifact with its deficiency stated up front. The conservative governing grade is **X** regardless, because even the human evidence does not support the method beyond simple linear cases.

## 5. When it works / when it fails

**Works best when:** the failure is a simple, linear, deterministic chain (a machine fault, a single procedural slip) and you still flag the branch points; or as a five-minute teaching prompt for the habit of not stopping at the first explanation.

**Fails or misleads when (poor-fit / anti-patterns):**
- The problem has more than one contributing cause (the documented failure mode): use `think-issue-tree`, which branches with MECE-plus-remainder discipline.
- The failure is socio-technical and the chain terminates at "operator error" (the Bad Apple blame trap): use `think-issue-tree` to keep the conditions, not the person.
- A reproducible, coverage-checked decomposition is needed rather than one investigator's single path: use `think-issue-tree`.

## 6. Output artifact

A **branch-flagged Five Whys chain**: a single linear why-chain (problem, then cause, then cause-of-cause, down to a terminal root cause) with each step flagged `[single cause]` or `[branch]`, an explicit multi-cause check that redirects to `think-issue-tree` when any step branches, and one countermeasure aimed at the terminal node.

## 7. Sources

1. Card, A. J. (2017), "The problem with '5 whys'," *BMJ Quality & Safety* 26(8): 671-677. (governing critique: the single-chain method oversimplifies multi-causal problems; recommends branching causal-tree diagramming)
2. Allspaw, J. (2014), "The Infinite Hows (or, the Dangers of the Five Whys)" (kitchensoap.com / O'Reilly Radar), building on Dekker, Conklin, and Leveson. (the socio-technical blame trap; "how" over "why")
3. Ohno, T., *Toyota Production System: Beyond Large-Scale Production* (Productivity Press, 1988; Japanese orig. 1978). (primary practitioner source; the canonical machine-failure chain and "five" as a rule of thumb)
4. "Five whys," Wikipedia. (consolidated, sourced catalogue of the documented limitations and the Toyoda/Ohno lineage)

> **Verification status:** Card (2017) and Allspaw (2014) are the well-attested critical anchors; Ohno (1988) is the well-attested origin. Treat Five Whys' value as unproven beyond simple linear failures; the skill exists to run an explicitly-requested lens honestly and redirect on any branch, not to endorse it.
