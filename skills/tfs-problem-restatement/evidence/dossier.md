# Evidence Dossier: Problem Restatement

> The single source of truth for the `problem-restatement` skill. The `SKILL.md`, the
> sidecar, and the eval cases all derive from this file. If a claim is not here, it does
> not belong in the skill.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.problem-restatement` (installable name `tfs-problem-restatement`) |
| **Family** | problem-framing |
| **Evidence tier** | **M/P** (moderate for the general principle; practitioner for the specific technique) |
| **Confidence** | High that framing affects outcomes; moderate that "restate it N ways" is the best operationalization |
| **Status** | draft (authored 2026-05-31 from the discovery corpus) |

---

## 1. The mechanism (what actually does the work)

The default failure is to solve the problem as first stated. The first statement is usually the user's (or the model's) initial framing, which often encodes a symptom, a presupposed solution, or one stakeholder's view. Problem restatement is a deliberate **cognitive interrupt before solving**: generate several genuinely different formulations of the problem, then choose the most useful one to work on.

The restatements are not rewordings. Each is produced by a distinct move:
- **Change altitude** (abstraction laddering): go up ("what is this in service of?") and down ("what concretely is failing?").
- **Separate goal from implementation:** distinguish the outcome the user actually wants from the solution they proposed.
- **Shift stakeholder:** state the problem as each affected party would.
- **Invert / negate:** state the opposite, or "how would we cause this on purpose?", to expose hidden assumptions.
- **Bound it (is / is not):** sharpen scope by stating what the problem explicitly is and is not.

The work is done by *escaping the initial frame before committing*, and by *selecting* a working frame rather than drifting. The output is a chosen, better-justified problem to solve, not a longer list.

## 2. Lineage

- **Design thinking / define mode:** Stanford d.school design-thinking guidance treats "define" as producing the point of view that sets the right challenge, and notes a tightly framed problem statement yields more and better ideas downstream. (Practitioner; design-research lineage.)
- **Reframing in practice:** Thomas Wedell-Wedellsborg, "Are You Solving the Right Problem?" (Harvard Business Review, 2017) - reframing as a repeatable executive practice; reports that most organizations routinely work on mis-stated problems.
- **Problem finding / problem construction:** Getzels & Csikszentmihalyi (1976) and the problem-finding research that followed (Runco; Mumford et al.) link how a problem is constructed to the originality and quality of what is produced. (This is the moderate-evidence anchor.)
- **Decision failure from poor definition:** Paul Nutt's research on decision-making ("Why Decisions Fail", 2002) attributes a large share of failures to premature, narrow problem definition and limited search.

No trademark. "Problem restatement" is a generic descriptive term; named descriptively here, lineage cited.

## 3. What the evidence shows, and what it does NOT show

**Reasonably supported (the M part):**
- *How a problem is framed/constructed measurably affects the quality and originality of solutions.* This is supported by problem-finding research (Getzels & Csikszentmihalyi and successors) and is consistent with design-research observations that tighter, well-chosen problem statements improve ideation output.
- *Poor or premature problem definition is a common, costly failure mode* in real decisions (Nutt).

**NOT shown (the honesty):**
- There is **no strong, controlled evidence** that the specific ritual of "restate the problem N ways" outperforms other framing aids, or that it improves final decision quality by a measured amount. The technique is practitioner-grade (d.school, Wedell-Wedellsborg); its *mechanism* (framing matters) has better support than its *packaging*.
- The popular Einstein quote ("if I had an hour to solve a problem I'd spend 55 minutes on the problem") is **apocryphal** and is not evidence. It is motivational folklore; do not cite it as support.
- Effect sizes are not well established; treat claims as directional, not quantified.

**Net grade: M/P.** Frame-quality-affects-outcomes is moderate; the restatement technique itself is practitioner. The skill should claim the former and present the technique as a disciplined way to act on it, not as a proven intervention.

## 4. Transferred-evidence flag (required honesty)

All evidence is from human design, creativity, and decision contexts. There is **no direct study** of an AI agent running problem restatement, or of whether an agent-produced reframe improves a human's outcome. Evidence is **transferred from human studies, not AI-validated.** The AI value is concrete and does not depend on the contested claims: a model defaults hard to solving the first framing (it is obligingly literal), so an explicit restatement step is a high-leverage counter to that specific failure, and it produces a durable, inspectable artifact.

## 5. When it works / when it fails (drives "When NOT to Use" and eval anti-cases)

**Works best when:**
- The problem is ambiguous, ill-defined, or arrived as a symptom or a pre-baked solution.
- The stakes of solving the wrong problem are real (it is upstream of significant work).
- The user supplied an implementation ("build X") but the underlying goal is unstated.

**Fails or misleads when (poor-fit / anti-patterns):**
- **The problem is already well-defined and validated** - reframing a correct, clear problem wastes effort and can manufacture doubt.
- **Reframing becomes procrastination** - endless restatement with no selection of a working frame is the central failure mode; the skill MUST converge on one chosen frame.
- **Cosmetic restatements** - reworded variants that do not actually shift altitude, stakeholder, or goal-vs-implementation are noise.
- **Trivial or fully reversible tasks** where the cost of a wrong frame is negligible.
- It is a framing tool, not an ideation tool (use SCAMPER / Question Burst to generate solutions) and not a decision tool (use Decision Option Review to choose among solutions).

## 6. Output artifact

A **problem frame set**: the original statement; a table of restatements, each tagged with the move used (altitude up/down, goal-vs-implementation, stakeholder, inversion, is/is-not) and a one-line "why this might be the real problem"; 3 to 5 "How Might We" angles drawn from the most promising restatements; and a single **chosen working frame** with a short rationale. The deliverable is the chosen frame plus the set behind it, not prose.

## 7. Sources

1. Stanford d.school, design-thinking process guide (define mode; framing improves ideation quantity and quality). Practitioner/design-research.
2. Wedell-Wedellsborg, T. (2017). "Are You Solving the Right Problem?" *Harvard Business Review*.
3. Getzels, J. W., & Csikszentmihalyi, M. (1976). *The Creative Vision* - problem finding and creative performance. Plus later problem-construction work (Runco; Mumford et al.).
4. Nutt, P. C. (2002). *Why Decisions Fail* - premature/narrow problem definition as a failure driver.

> **Verification status:** citations 1-2 are well-attested and safe to cite. Citations 3-4 are correctly attributed in substance (problem-finding research; Nutt's decision-failure work) but the exact page-level claims should be confirmed against the primary sources before any public-facing quantified claim. The Einstein quote is explicitly excluded as apocryphal.
