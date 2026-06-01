# Evidence Dossier: Argument Mapping

> Single source of truth for the `argument-mapping` skill. The SKILL.md, sidecar, and evals derive from this. One of the library's strong-evidence anchors.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.argument-mapping` (installable name `think-argument-mapping`) |
| **Family** | reasoning-clarity |
| **Evidence tier** | **S** (strong, with a scope caveat) |
| **Confidence** | High that explicit structure improves reasoning quality; the measured effect is for sustained practice |
| **Status** | draft (authored 2026-05-31 from the discovery corpus) |

## 1. The mechanism (what actually does the work)

In prose, an argument's structure is hidden: the main claim, the reasons for it, the unstated co-premises each reason needs, and the objections against it are all blended into fluent text, where a broken inference reads as smoothly as a sound one. Argument mapping makes the structure explicit: the **contention** at the top, the **reasons** (premises) that support it, the **co-premises** each reason silently depends on, and the **objections and rebuttals** against it, laid out as a tree so every inferential link is visible. The work is done by exposing the load-bearing-but-unstated premises and the links where support is weakest, which prose hides.

Boundary: a tidy map shows the argument's *structure*, not the *truth* of its premises. Structure being valid does not make the premises true.

## 2. Lineage

- Informal logic and critical-thinking tradition; the Toulmin model is an ancestor. Tim van Gelder's work (Reason!/Rationale) operationalized computer-supported argument mapping and produced the strongest effect estimates.

No trademark. Named descriptively.

## 3. What the evidence shows, and what it does NOT show

**Strongly supported (the S):** argument-mapping-based instruction produces among the largest measured gains in critical-thinking skill in the field - van Gelder and colleagues report effect sizes around 0.7 to 0.85.

**The honest scope caveat:** those effect sizes are for **sustained practice** (typically a semester-length course building the skill), not for a single one-shot map magically improving one decision. So the strong evidence is that *learning to map arguments improves reasoning*; the claim that *producing one map fixes one argument* is weaker and practitioner-level. Grade S for the method, but do not imply a single use carries the course-length effect.

## 4. Transferred-evidence flag

The evidence is from human learners and analysts, not AI-augmented use. Transferred, not AI-validated. The AI value: a model produces fluent prose arguments where bad inferences hide; forcing it to externalize the contention, co-premises, and objections as a structure is a direct counter, and the map is inspectable.

## 5. When it works / when it fails

**Works best when:** an argument or recommendation must be evaluated for soundness; a fluent case may be hiding a broken inference or an unstated assumption; a debate needs its logical structure made explicit.

**Fails or misleads when (poor-fit / anti-patterns):**
- Simple claims with no real argumentative structure to map.
- Mapping rhetoric or persuasion as if it were logic (it analyzes logical structure, not how convincing something is).
- Treating a tidy map as a sound argument (valid structure does not make premises true) - the central failure mode.
- Generating ideas or options (wrong tool).
- Claiming a single map carries the course-length learning effect.

## 6. Output artifact

An **argument map**: the contention; each supporting reason with its co-premises made explicit; the objections and rebuttals; and a flag on the weakest links and the unsupported or load-bearing-but-unstated premises that most need support.

## 7. Sources

1. van Gelder, T. (2015) and the Reason!/Rationale argument-mapping studies - effect sizes ~0.7-0.85 for critical-thinking gains.
2. Toulmin, S. (1958) - the model of argument structure (claim, grounds, warrant, rebuttal) that underpins mapping.

> **Verification status:** the van Gelder effect-size range is well-attested for course-length instruction; keep the "single map != course effect" caveat visible in any public claim. Do not attach the 0.7-0.85 figure to a one-shot use.
