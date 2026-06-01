# Evidence Dossier: One-Way vs Two-Way Door

> The single source of truth for the `one-way-vs-two-way-door` skill. The `SKILL.md`,
> the sidecar (`skill.meta.yml`), and the eval cases all derive from this file. If a
> claim is not here, it does not belong in the skill. Author this FIRST.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.one-way-vs-two-way-door` (installable name `think-one-way-vs-two-way-door`) |
| **Family** | decision-and-option-evaluation |
| **Evidence tier** | **P** (practitioner; limited controlled evidence - see "What the evidence shows" below) |
| **Confidence** | Moderate that the triage move prevents real waste; low that the specific two-bucket framing is the optimal taxonomy or that it improves outcomes in controlled study |
| **Status** | draft (first authored 2026-05-31, against discovery corpus) |

---

## 1. The mechanism (what actually does the work)

This is a **meta-decision** tool: a triage that runs *before* any option comparison and asks one question - how reversible is this decision? - then matches the amount of deliberation and the level of sign-off to the answer.

- A **two-way door** is reversible: if the choice turns out wrong, you walk back through with little cost. Such decisions should be made fast, by the people closest to them, with light deliberation. Slowing them down is the real cost.
- A **one-way door** is hard or expensive to reverse: walking back is costly, slow, or impossible. Such decisions warrant real rigor and senior sign-off before committing.

The load-bearing move is **separating the reversibility judgment from the decision itself**. Most decision processes apply one uniform level of care to everything, which over-deliberates the reversible many and under-deliberates the irreversible few. By forcing an explicit reversibility classification first, the method routes effort where it pays off and licenses speed where it does not. The output is a **classification plus a matched deliberation level**, not a recommendation about the decision's content - this skill never says which option to pick; it says how much machinery the choice deserves.

The classification is deliberately coarse (two buckets, with a "lean" verdict for borderline cases) because its job is routing, not analysis. The moment you are doing the analysis, you are past this tool's job.

## 2. Lineage

- **Bezos shareholder letters.** The "Type 1 / Type 2 decision" and "one-way door / two-way door" framing was popularized by Jeff Bezos in Amazon's 1997 and especially the 2015 and 2016 Amazon shareholder letters, arguing that as organizations grow they tend to apply heavyweight Type 1 (irreversible) process to Type 2 (reversible) decisions, producing slowness and risk-aversion.
- **Related decision-theory roots.** The value of preserving reversibility connects to the economics of irreversibility and option value (the cost of foreclosing future choices), but Bezos's framing is a practitioner heuristic, not a formalization of that literature.

No trademark. "One-way door / two-way door" and "Type 1 / Type 2 decision" are descriptive phrases in common business use; no attribution is required and none is claimed. We name the skill descriptively by its mechanism (reversibility-based triage) and cite the lineage here rather than branding it.

## 3. What the evidence shows, and what it does NOT show

This is the honest core of the dossier. The skill must not overclaim.

**What is reasonably supported (the practitioner basis):**
- The framing is widely adopted in practice and is internally coherent: matching process weight to reversibility is a sensible allocation of scarce deliberation, and the failure it targets (uniform heavyweight process applied to reversible decisions) is a real and commonly observed organizational pathology.
- As a forcing function, an explicit reversibility check reliably *changes behavior*: it gives teams permission to decide reversible things fast, and a defensible reason to slow down on irreversible ones. That behavioral effect does not depend on any outcome study.

**What is NOT shown (the caveats that keep the skill honest):**
- There is **no controlled evidence** that this two-bucket classification improves decision outcomes, speed, or quality versus any other triage rule (or versus no triage). The support is practitioner testimony and a single influential source (Bezos), not experiment.
- **Reversibility is often misjudged.** Decisions framed as two-way doors can carry one-way consequences (reputational, trust, legal, path-dependence, sunk learning) that the speedy bucket hides. The binary tempts people to under-classify genuinely irreversible calls as reversible because reversible is the convenient answer.
- It is a **triage, not an analysis.** It says how much rigor a decision deserves; it does not perform the rigor, surface risks, or compare options. Treating the classification as if it resolved the decision is a category error.
- The "fast = good" reading is a misuse. The method's value is *calibration*, not speed for its own sake; speeding up a misclassified one-way door is exactly the harm it is meant to prevent.

**Net grade: P.** Useful practitioner method with a clear mechanism and a real failure mode it addresses; thin controlled evidence. The skill should claim the calibration/forcing-function value and explicitly disclaim any outcome-quality guarantee.

## 4. Transferred-evidence flag (required honesty for this library)

The basis for this skill is **human organizational practice** (Bezos / Amazon and broad management adoption), not controlled studies, and certainly **not any study of AI-augmented use**. There is no evidence on whether an AI agent classifies reversibility well, or whether an agent-produced classification improves a human's decision routing. The evidence is therefore **transferred from human practice, not AI-validated.** This skill must say so. Treat the AI value as: the agent makes the triage cheap and habitual, forces the reversibility question to be answered explicitly before effort is spent, names the dimensions that make something hard to reverse (so reversibility is judged, not assumed), and produces a durable, inspectable classification artifact. None of that depends on the unproven outcome claim.

## 5. When it works / when it fails (drives the eval negative cases and "When NOT to Use")

**Works best when:**
- A decision is on the table and it is unclear how much process it deserves - someone is about to either rubber-stamp something irreversible or convene a committee over something trivially reversible.
- A team or org is chronically slow, applying the same heavyweight approval to everything regardless of stakes.
- You want an explicit, defensible reason to either move fast or slow down, decided before the deliberation starts.

**Fails or misleads when (poor-fit / anti-patterns):**
- **The decision is already known to be high-stakes and is being analyzed.** Triage has already happened; you are past this tool. Use a risk tool (premortem) or an option comparison, not a classifier that will just tell you what you already know. (Anti-trigger.)
- **You need to actually compare options against criteria.** That is `think-decision-option-review` (a criteria-weighted option matrix). This skill triages *before* any comparison how much analysis the decision even warrants; it never scores or recommends an option. (Near-miss anti-trigger against the overlapping neighbor.)
- **Reversibility is treated as a license for speed alone**, with the irreversible-but-inconvenient consequences waved away. The method must test reversibility against multiple dimensions (cost, time, trust, legal, path-dependence), not accept the convenient label.
- **Used as theater** to bless a decision someone already wants to make fast, by labeling a one-way door a two-way door. The classification has to be defensible, not motivated.
- **For a decision with no meaningful reversibility difference** (a routine, repeated, obviously-reversible operational call) - just decide; classifying it is its own small over-process.

## 6. Output artifact

The skill must emit a **reversibility classification plus a matched deliberation level**, not prose and not a recommendation about the decision's content. Concretely: the decision stated in one line; a verdict (one-way door / two-way door, or "leans" with the reason for borderline cases); the reversibility tested against named dimensions (what it would cost in money, time, trust/reputation, legal, and foreclosed future options to walk it back); the matched deliberation level (who decides, how much analysis, what sign-off); and, for one-way doors, a pointer to the heavier tool the decision should now go to (option comparison, premortem). The artifact is the deliverable; it routes the decision, it does not make it.

## 7. Sources

1. Bezos, J. - Amazon.com 1997 Letter to Shareholders (the original "Type 1 / Type 2" framing of decision reversibility).
2. Bezos, J. - Amazon.com 2015 and 2016 Letters to Shareholders ("one-way door / two-way door"; the argument that growing orgs over-apply Type 1 process to Type 2 decisions).

> **Verification status:** the Bezos shareholder-letter attribution (citations 1-2) is well-attested and the framing is widely reproduced, but the exact letter-by-letter wording was drawn from secondary synthesis in the discovery corpus and should be confirmed against the primary letters before any public-facing claim quotes them directly. There is, by design, no outcome-effectiveness citation: section 3 states plainly that none exists, which is the honest position for a P-tier practitioner method.
