# Evidence Dossier: Causal Loop Diagrams

> Single source of truth for the `causal-loop-diagrams` skill. The SKILL.md, sidecar, and evals derive from this. A moderate-evidence, transferred-evidence skill: the failure it targets is strongly evidenced; that causal loop diagrams (CLDs) specifically fix it is only moderately and conditionally evidenced. Grade honestly; do not borrow the strong number for the weaker claim.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.causal-loop-diagrams` (installable name `think-causal-loop-diagrams`) |
| **Family** | systems-and-consequences |
| **Evidence tier** | **M/P** (transferred-evidence; conditional) |
| **Confidence** | High that people misperceive feedback; moderate-and-conditional that CLDs improve it; the externalization move is mechanically sound |
| **Status** | draft (authored 2026-06-01 from the discovery corpus) |

## 1. The mechanism (what actually does the work)

The distinct cognitive move is **closing feedback loops and signing them**. You notice that a variable feeds back on itself through a cycle (sales fund marketing, marketing drives sales), trace the cycle back to its start to **close** it, assign a **polarity** to each link (does a rise in A raise or lower B: + or -), and then **label the whole loop** by the product of its link signs:

- A loop with an even number of negative links (net positive) is **reinforcing (R)**: it amplifies, producing a vicious or virtuous spiral (exponential-looking growth or collapse).
- A loop with an odd number of negative links (net negative) is **balancing (B)**: it counteracts, producing goal-seeking behavior toward a target, or - when delayed - oscillation.

The skill then reads likely behavior off the **structure**: which loop currently dominates, and therefore whether the system spirals, seeks a goal, or oscillates. The load-bearing work is the **loop closure plus R/B polarity assignment**: making the cycle explicit and signed, rather than narrating a one-directional chain. No shipped skill in this library performs loop closure or polarity signing; that is the gap this skill fills.

This is a structured *argument about structure*, not a prediction. A signed CLD says "if this loop dominates, expect a spiral" - it does not forecast a number or a date.

## 2. Lineage

- System dynamics: Jay Forrester (origin); John Sterman, *Business Dynamics* (2000), which formalizes CLD notation (R/B loops, link polarity); Donella Meadows, *Thinking in Systems* (2008), which frames reinforcing and balancing feedback in plain language.
- CLDs are a qualitative companion to stock-and-flow models (the quantitative side of the same discipline). This skill is the *loop* side; `think-stocks-and-flows-reasoning` is the *single-accumulation* side.

No trademark. Named descriptively (the field's own generic term).

## 3. What the evidence shows, and what it does NOT show

This skill banks two separate evidence pools. Keep them separate - the honesty of the grade depends on not merging them.

**Pool A - the failure (strong, S-tier, but it is the SAME base stocks-and-flows banks).** People systematically **misperceive feedback and accumulation**. Sterman (1989), "Misperceptions of Feedback in Dynamic Decision Making," *Management Science*, shows subjects manage a dynamic system (the Beer Distribution Game) far worse than the structure allows, because they ignore feedback and time delays. Sweeney & Sterman (2000), "Bathtub Dynamics," *System Dynamics Review*, shows even highly educated subjects (MIT graduate students) fail simple feedback/accumulation tasks. This pool is robust. **But it only establishes that the error is real.** It does NOT establish that drawing a CLD fixes it. Borrowing this S-tier strength for the CLD-effectiveness claim would be a laundered statistic; this dossier refuses that.

**Pool B - CLDs specifically (moderate and conditional).** A 2025 quasi-experimental study, "Influence of Causal Loop Diagrams on Systems Thinking" (ScienceDirect, article S2451958825000284), finds a **conditional** effect of CLDs on systems-thinking performance: a benefit under some conditions, not a clean uniform improvement. Treat this as moderate, conditional support for the externalization-and-signing move, not as proof that CLDs reliably improve reasoning for everyone.

**Counter-evidence (cited deliberately, against inflation).** Schaffernicht (2010), "Causal Loop Diagrams: An Analysis of the Reliability of an Inference Tool," *Systems Research and Behavioral Science*, critiques CLD **reliability**: different modelers draw different loops and polarities from the same situation (subjectivity), and CLDs are not reproducible. This is a real limit on the predictive use of CLDs, and a reason to scope the claim to *externalizing and signing structure* rather than to *predicting behavior*.

**Honest net framing.** The strongly evidenced fact is the failure (Pool A), which is shared with stocks-and-flows and does not by itself credit CLDs. The CLD-specific evidence (Pool B) is moderate and conditional, and there is named counter-evidence (Schaffernicht) on reliability. So the defensible claim is: *making feedback loops explicit and signing their polarity externalizes structure that humans (and narrating models) routinely miss; the resulting signed diagram is an inspectable argument about likely dynamics.* The claim is NOT that the diagram predicts what the system will do, nor that CLDs reliably improve systems thinking for all users.

## 4. Transferred-evidence flag

All cited evidence is **human-subject**. None of it validates causal-loop diagramming **for an AI agent**. A language model narrating a situation slips into the same trap the human studies document: it describes a one-directional chain ("more users, so more revenue") and silently drops the loop-back ("...which funds more acquisition, which brings more users"). Forcing explicit loop closure and R/B signing is a direct structural counter to that, and the signed CLD is inspectable. But the transferable claim is scoped: it covers **externalizing loop structure and signing polarity**, not predicting system behavior. The behavior read-out is a labeled hypothesis ("if R1 dominates, expect a spiral"), never a forecast.

## 5. When it works / when it fails

**Works best when:** the situation plausibly contains feedback - a variable that, through a cycle, affects itself (growth that funds more growth; a fix that quietly creates the problem it fixes; capacity that relieves then re-attracts demand). The question is *why does this keep accelerating / stalling / overshooting and undershooting*.

**Fails or misleads when (poor-fit / anti-patterns):**
- **The structure is genuinely open-loop / linear.** If the chain does not actually feed back, forcing a loop **manufactures false feedback**. An honest output here is "no closed loop found; this is a linear chain - use a different tool." Do not invent a loop to fill the diagram.
- **A single accumulation with no loop** - that is `think-stocks-and-flows-reasoning` (one stock, net flow, no cycle, no polarity sign).
- **You only need to name that feedback exists** as one structural layer - that is `think-iceberg-model`, which names feedback as a structure item but does not close, sign, or diagram loops.
- **Forward, one-directional consequences** (a consequence tree that fans out and does not loop back) - that is `think-futures-wheel`, which is acyclic by construction.
- **Teaching general systems thinking, finding leverage points, or wholesale systems mapping** - out of scope here; those are separate catalog rows. This skill does one move: close and sign loops, then read dominance.

## 6. Output artifact

A **signed causal loop diagram**: an inventory of the closed feedback loops in the situation, each labeled **reinforcing (R)** or **balancing (B)** with its **link polarities** shown, plus a **behavior read-out** stating which loop currently dominates and the resulting dynamic (spiral, goal-seeking, or oscillation). The read-out is framed as a **structured argument** ("if R1 dominates, expect a virtuous spiral"), explicitly **not a prediction**. The artifact also records, honestly, where no loop closed (the linear parts) rather than forcing loops onto them.

## 7. Sources

1. Sterman, J. (1989). "Misperceptions of Feedback in Dynamic Decision Making." *Management Science*. (Pool A - the failure.)
2. Sweeney, L. B., & Sterman, J. (2000). "Bathtub Dynamics: Initial Results of a Systems Thinking Inventory." *System Dynamics Review*. (Pool A - the failure, in educated subjects.)
3. "Influence of Causal Loop Diagrams on Systems Thinking" (2025). ScienceDirect, article S2451958825000284. (Pool B - CLD-specific, conditional effect.)
4. Schaffernicht, M. (2010). "Causal Loop Diagrams: An Analysis of the Reliability of an Inference Tool." *Systems Research and Behavioral Science*. (Counter-evidence - subjectivity and non-reproducibility; cited against inflation.)
5. Sterman, J. (2000). *Business Dynamics*; Meadows, D. (2008). *Thinking in Systems*. (Lineage and CLD notation.)

> **Verification status:** Pool A (Sterman 1989; Sweeney & Sterman 2000) is well-attested and is the same misperception base the stocks-and-flows dossier banks - it does NOT by itself prove CLDs work. The 2025 CLD study (S2451958825000284) reports a conditional effect; confirm the exact conditions and any effect size from the source before quoting a number - none is quoted here. Schaffernicht (2010) is cited deliberately as a reliability caution. No effect size is stated in this dossier because none has been verified against the source; do not add one without checking. The honest scope - "externalize and sign loop structure," not "predict behavior" - is the core caveat.
