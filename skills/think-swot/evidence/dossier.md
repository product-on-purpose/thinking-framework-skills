# Evidence Dossier: SWOT (contested lens)

> Single source of truth for the `swot` skill. The SKILL.md, sidecar, and evals derive from this. The full catalog dossier (why SWOT is not a core skill) lives at `frameworks/swot/dossier.md`; this is the skill-facing grounding.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.swot` (installable name `think-swot`) |
| **Family** | strategy-and-opportunity |
| **Evidence tier** | **X** (weak or contradictory evidence) |
| **Posture** | contested lens, run-caveat-first, explicit-request-only |
| **Confidence** | Low that the four-box grid improves decisions; the added discipline (prune, tag, match) is what carries value |

## 1. The mechanism (what actually does the work)

SWOT sorts a situation into Strengths and Weaknesses (internal) and Opportunities and Threats (external). The bare grid is a sorting prompt, not analysis. This skill runs it caveat-first and adds the three things the field study found missing: prioritization (cut each box to a few load-bearing items), verification (tag each factor evidence or assumption), and matching (the TOWS step that crosses the lists into named strategic options). The output is a disciplined SWOT plus a TOWS option set.

## 2. Lineage

- Originated as SOFT (Satisfactory / Opportunities / Faults / Threats) by Robert Franklin Stewart at SRI's TAPP group; relabeled SWOT, popularly credited to Albert Humphrey (the Stanford/Harvard-conference diffusion story is unsubstantiated; see Puyt, Lie and Wilderom 2023).
- The repair that concedes the bare grid is incomplete is Heinz Weihrich's TOWS Matrix (1982), which bolts a matching step (S-O, S-T, W-O, W-T) onto the four boxes.
- "SWOT" / "SWOT analysis" are generic descriptive terms; no trademark, no owner.

## 3. What the evidence shows, and what it does NOT show

**The governing finding (contradictory evidence):** Terry Hill and Roy Westbrook, "SWOT Analysis: It's Time for a Product Recall," *Long Range Planning* 30(1) (1997): 46-52, reviewed SWOT use by consultants across more than 20 of 50 companies (14 consulting firms) in the UK DTI scheme. The grids collapsed into long, undifferentiated lists, averaging over 40 general factors, with no prioritization, no verification, and no connection to the rest of the strategy work. Conclusion: the activity and its outputs "did not constitute analysis."

**NOT shown:** there is no controlled evidence that the SWOT box structure improves decision quality. Any "SWOT improves outcomes by N%" claim is unsupported and must never be reproduced.

## 4. Transferred-evidence flag

Evidence is from human strategy practice, not AI-augmented use. Transferred, not AI-validated. The honest AI value is narrow: forcing a pruned, tagged, matched output (not a 20-item dump) turns a discredited default into a decision-useful artifact, with the deficiency stated up front.

## 5. When it works / when it fails

**Works best when:** the user asks for SWOT by name and you add the discipline; or as a front end to option generation where TOWS is the real payload.

**Fails or misleads when (poor-fit / anti-patterns):**
- Used to produce a long unprioritized factor dump (the documented failure mode).
- Treated as a substitute for rigorous decomposition (use `think-issue-tree`) or divergent external futures (use `think-scenario-planning`).
- Product strategy specifically (the pm-skills opportunity-solution tree fits better).

## 6. Output artifact

A **disciplined SWOT plus TOWS option set**: a pruned, evidence-tagged 2x2 grid with priorities marked, and a TOWS matching table that converts the four lists into named strategic options, with the load-bearing assumptions flagged for verification.

## 7. Sources

1. Hill, T. and Westbrook, R. (1997), "SWOT Analysis: It's Time for a Product Recall," *Long Range Planning* 30(1): 46-52. (governing finding: bare SWOT "did not constitute analysis")
2. Weihrich, H. (1982), "The TOWS Matrix: A Tool for Situational Analysis," *Long Range Planning* 15(2): 54-66. (the matching step this skill requires)
3. Puyt, R., Lie, F.B. and Wilderom, C. (2023), on the contested origin of SWOT/SOFT.

> **Verification status:** Hill and Westbrook 1997 is the well-attested anchor. Treat SWOT's value as unproven; the skill exists to run an explicitly-requested lens honestly, not to endorse it.
