# Evidence Dossier: Complexity Domain Sort (contested lens)

> Single source of truth for the `complexity-domain-sort` skill. The SKILL.md, sidecar, and evals derive from this. The full catalog dossier (the Cynefin evidence record, the basis for shipping this caveat-first) lives at `frameworks/complexity-domain-sort/dossier.md`; this is the skill-facing grounding.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.complexity-domain-sort` (installable name `think-complexity-domain-sort`) |
| **Family** | decision-and-option-evaluation |
| **Evidence tier** | **C** (conceptual; widely taught, no controlled effectiveness evidence) |
| **Posture** | contested lens, run-caveat-first, explicit-request-only |
| **Confidence** | Low that classifying a problem this way improves decisions; the added discipline (response posture plus a concrete next action) is what carries value |

## 1. The mechanism (what actually does the work)

The Complexity Domain Sort triages a situation by how knowable its causal structure is, then matches an ordered-versus-emergent response to fit. Five domains: Clear (sense-categorize-respond), Complicated (sense-analyze-respond), Complex (probe-sense-respond), Chaotic (act-sense-respond), and a central Confusion (you do not yet know which, and the danger is defaulting to the domain you are most comfortable with). The bare label is a conversation prompt, not a decision. This skill runs it caveat-first and adds the thing the cargo-cult failure omits: a concrete next action tied to each domain's posture (the experiment to run, the expert to consult, the standard to apply, the stabilizing act to take), with the placement framed as a contested judgment rather than a found fact.

## 2. Lineage

- Originated by **Dave Snowden, 1999**, at IBM Global Services, to help manage intellectual capital and knowledge; developed further through the IBM Cynefin Centre for Organizational Complexity (2002). "Cynefin" is the Welsh word for habitat, "the place where we belong."
- First detailed publication: Cynthia F. Kurtz and David J. Snowden, "The new dynamics of strategy," *IBM Systems Journal* 42(3) (2003).
- Popularization: David J. Snowden and Mary E. Boone, "A Leader's Framework for Decision Making," *Harvard Business Review* 85(11) (2007), which won the Academy of Management's Outstanding Practitioner-Oriented Publication award (2008).
- **Trademark:** "Cynefin" and the associated framework and facilitation methods are held by **The Cynefin Co.** (formerly Cognitive Edge). The skill is named descriptively here as "Complexity Domain Sort"; "Cynefin" is cited only as an attributed alias, and no branded facilitation method is reproduced.

## 3. What the evidence shows, and what it does NOT show

**What the record supports.** This is a real, named, influential sense-making framework with a clear intellectual lineage, taught across knowledge management, agile practice, healthcare, and policy. Its standing as a recognized practitioner contribution is genuine (the 2007 HBR article won an Academy of Management award in 2008). That is the extent of the directly supported claim: an established, well-regarded heuristic.

**What the record does NOT support.** There is no controlled or comparative study showing that classifying a problem this way improves decision quality versus not classifying it. The applied literature is descriptive (people *using* the sort to frame clinical or research complexity), not trials measuring its effect. The PMC review applying it to diagnostic reasoning in internal medicine (2021) states it plainly: the framework "is now widely used for teaching and as a simple heuristic; however, scientific proof of its validity has yet to be provided." Critics go further, questioning its rigor and its reliance on ambiguous terms.

**No laundered statistics.** The method carries no traceable controlled effect size, so none is quoted; any "improves outcomes by N%" framing is unsourced and must never be reproduced.

## 4. Transferred-evidence flag

Evidence is from human managers, clinicians, and facilitators in organizational and field settings, not AI-augmented use. Transferred, not AI-validated. The honest AI value is narrow: forcing a placement-with-posture-and-next-action (not a confident bare label) turns a cargo-cult-prone ritual into a decision-useful artifact, with the conceptual-evidence deficiency and the trademark attribution stated up front.

## 5. When it works / when it fails

**Works best when:** the user asks for the sort (or Cynefin) by name and you add the discipline; or when a team is applying the wrong management style to the problem type (treating complex as complicated, or over-deliberating the routine) and naming that mismatch out loud helps.

**Fails or misleads when (poor-fit / anti-patterns):**
- The label becomes the deliverable ("this is complex") - the documented cargo-cult failure; the vocabulary gets performed without changing any decision.
- The sort is treated as an objective measurement rather than a contested judgment, manufacturing false confidence.
- A sharper tool already fits: enumerating the causes of one effect is cause decomposition (`think-issue-tree`); holding divergent external futures is scenario work (`think-scenario-planning`); choosing among options under stated criteria is an explicit option comparison (`think-decision-option-review`).

## 6. Output artifact

A **five-domain sense-making sort**: each part of the situation placed in Clear / Complicated / Complex / Chaotic / Confusion as a stated judgment, each placement carrying its response posture, the comfort-zone default named as the trap, and - the real payload - a concrete next action for every domain used, so the output is what to DO, not just the label.

## 7. Sources

1. Snowden, D.J. and Boone, M.E. (2007), "A Leader's Framework for Decision Making," *Harvard Business Review* 85(11): 68-76. (the popularizing article; award-winning practitioner publication, not an effectiveness study)
2. Kurtz, C.F. and Snowden, D.J. (2003), "The new dynamics of strategy: Sense-making in a complex and complicated world," *IBM Systems Journal* 42(3): 462-483. (the foundational framework paper)
3. "Diagnostic Reasoning in Internal Medicine: Cynefin Framework Makes Sense of Clinical Complexity," PMC8100038 (2021). (governing caveat: "scientific proof of its validity has yet to be provided")

> **Verification status:** The lineage and the 2021 PMC validity caveat are well-attested. Treat the method's decision-quality value as unproven (tier C); the skill exists to run an explicitly-requested, descriptively-named lens honestly, with its trademark attributed, not to endorse it.
