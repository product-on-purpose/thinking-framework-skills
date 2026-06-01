# Evidence Dossier: Decision Option Review

> Single source of truth for the `decision-option-review` skill. The SKILL.md, sidecar, and evals derive from this.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.decision-option-review` (installable name `tfs-decision-option-review`) |
| **Family** | decision-and-option-evaluation |
| **Evidence tier** | **P** (flag: false-precision risk) |
| **Confidence** | High that explicit criteria beat gut comparison; the numbers can mislead if over-trusted |
| **Status** | draft (authored 2026-05-31 from the discovery corpus) |

## 1. The mechanism (what actually does the work)

When several real options compete, intuition compares them on shifting, unstated criteria and the comparison cannot be inspected. This skill makes it explicit: list the options, define the criteria that actually matter and weight them, score each option against each criterion, and surface the tradeoffs, then recommend. The work is done by forcing the criteria and weights into the open (where they can be argued) and by making the tradeoffs visible rather than buried in a hunch. It is a lightweight multi-criteria review, not academic MCDA.

The honest caveat is built into the mechanism: numeric scores can manufacture **false precision**. The skill must show the tradeoffs and flag where a score is soft, not present a single total as if it settled the matter.

## 2. Lineage

- Multi-criteria decision analysis (MCDA). The UK Government's MCDA guidance frames it as a way to choose rationally among options when objectives conflict, and stresses that it should **support** decision makers, not replace judgment.

No trademark. Named descriptively.

## 3. What the evidence shows, and what it does NOT show

**Supported:** structured multi-criteria comparison is a long-standing, government-endorsed decision aid; making criteria and weights explicit improves the defensibility and transparency of a choice.

**NOT shown:** there is no evidence that a weighted score produces a *correct* decision, and over-trusting the arithmetic is a known failure (false precision; criteria and weights chosen to justify a favorite). Grade P with a flag; the value is the explicit tradeoffs, not the total.

## 4. Transferred-evidence flag

Evidence is from human decision practice, not AI-augmented use. Transferred, not AI-validated. The AI value: a model can be asked to lay out criteria, weights, and tradeoffs explicitly and consistently, producing an inspectable matrix a human can challenge - far better than a hidden "I recommend X."

## 5. When it works / when it fails

**Works best when:** several real, distinct options compete; objectives conflict; the decision needs to be explained or defended; the tradeoffs are currently implicit.

**Fails or misleads when (poor-fit / anti-patterns):**
- **False precision** - presenting a single weighted total as if it settled a close call (the central failure mode).
- Criteria or weights chosen to justify an option already picked.
- Ignoring factors that resist quantification (treating "unscoreable" as "unimportant").
- Trivial or obvious choices; or one-way doors that need deeper analysis than a matrix.
- Generating options (use an ideation skill) - this compares options that already exist.

## 6. Output artifact

A **criteria-weighted option matrix**: options as columns (or rows), weighted criteria, a score per cell, the explicit tradeoffs each leading option makes, and a recommendation with a confidence note and the conditions under which it would flip. Soft scores are flagged.

## 7. Sources

1. UK Government, MCDA guidance (multi-criteria decision analysis as a support for, not a replacement of, judgment).

> **Verification status:** the UK MCDA guidance and the "support not replace judgment" framing are well-attested. Do not present weighted totals as proof of the right choice.
