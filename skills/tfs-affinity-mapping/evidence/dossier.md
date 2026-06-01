# Evidence Dossier: Affinity Mapping

> The single source of truth for the `affinity-mapping` skill. The `SKILL.md`, the sidecar
> (`skill.meta.yml`), and the eval cases all derive from this file. If a claim is not
> here, it does not belong in the skill.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.affinity-mapping` (installable name `tfs-affinity-mapping`) |
| **Family** | synthesis |
| **Evidence tier** | **P** (practitioner; limited controlled evidence) |
| **Confidence** | Moderate that the mechanism organizes a scattered pile usefully; low that any specific quality or speed gain is established by controlled study |
| **Status** | draft (first authored 2026-05-31, against discovery corpus) |

---

## 1. The mechanism (what actually does the work)

Affinity mapping takes a pile of many individual items - raw notes, observations, quotes, data points, sticky-note ideas - and groups them **bottom-up by felt similarity** until a small set of emergent themes appears. Each theme is then named, and the names become the structure.

The load-bearing move is **deferred, bottom-up categorization**. You do not start from predefined buckets and sort items into them. You start from the items, place ones that "feel related" together, and let the categories surface from the data. Three things follow:

1. **It externalizes and parallelizes comparison.** A scattered list is hard to hold in mind; laying every item out as a peer and grouping by proximity turns an O(n) memory problem into a spatial one, so patterns that were invisible in a linear list become visible.
2. **It resists premature structure.** Because the categories are discovered rather than imposed, the grouping is less likely to just confirm the frame you walked in with. The themes are answerable to the items.
3. **It compresses without discarding.** Many items collapse into a few named themes, but every item stays attached to its theme, so the synthesis is traceable back to its evidence rather than replacing it.

The mechanism is what we implement. The branded "KJ method" / "affinity diagram" ritual (sticky notes, silent sorting, dot voting) is the packaging; the durable move is bottom-up clustering of existing items into named, traceable themes.

## 2. Lineage

- **The KJ method**, the original formulation, named for its creator: Kawakita, Jiro (1967). *Hassoso* (Abduction / The Idea-Generation Method). Tokyo: Chuokoron-sha. Developed for synthesizing field-research data in cultural anthropology.
- **Affinity diagram** as one of the "Seven Management and Planning Tools" in Japanese quality management, from which it entered Western quality and design practice (Mizuno, Shigeru, ed., *Management for Quality Improvement: The Seven New QC Tools*, 1988).
- **Adoption in UX / design / product practice** as the standard way to synthesize user-research notes and workshop output into themes (widely documented by IDEO, the Nielsen Norman Group, and the design-sprint literature).

"KJ Method" is associated with Jiro Kawakita and is sometimes treated as a registered designation in Japan. We name the skill descriptively (`affinity-mapping`) after the durable mechanism rather than the named method, cite the lineage here, and require no attribution.

## 3. What the evidence shows, and what it does NOT show

This is the honest core of the dossier. The skill must not overclaim.

**What is reasonably supported (the practitioner basis):**
- Affinity mapping is a **long-standing, widely-taught practitioner standard** for synthesizing large qualitative piles in anthropology, quality management, UX research, and facilitation. Its longevity and breadth of adoption are real and are the main evidence for it.
- The underlying cognitive idea - that **externalizing items and grouping by similarity makes patterns easier to see than a linear list** - is consistent with well-established findings on external representation and chunking in cognition. That is supporting, not direct, evidence.

**What is NOT shown (the caveat that keeps the skill honest):**
- There is **no strong body of controlled evidence** that affinity mapping produces *better* themes, *more accurate* synthesis, or *better downstream decisions* than another synthesis method or than an expert reading the items closely. The claim for it is practitioner consensus and plausibility, not measured outcome.
- The method is **sensitive to the grouper's bias.** "Group by similarity" is a subjective judgment; two people (or two runs) can produce different theme sets from the same items. Bottom-up framing reduces, but does not remove, the risk of the grouping merely re-encoding the analyst's prior frame.
- **Theme names can launder weak groupings.** A confident label on a thin or incoherent cluster makes it look like a finding. The presence of named themes is not evidence that the themes are real.
- It does **not** generate the items. Affinity mapping only organizes what is already in the pile; if the inputs are sparse, skewed, or low-quality, the themes inherit those defects.

**Net grade: P.** Useful, durable, widely-practiced synthesis method with a plausible cognitive basis, but limited controlled evidence for any specific quality or speed gain. The skill should claim "organizes a scattered pile into a small set of named, traceable themes" and explicitly disclaim "produces objectively better or bias-free themes."

## 4. Transferred-evidence flag (required honesty for this library)

All of the basis above comes from **human practice and human-subject cognition research** in research-synthesis, quality, and design settings. There is **no direct study** of affinity mapping run by, or with, an AI agent, and none of whether an AGENT-produced affinity map improves a human's synthesis or decision. The evidence supporting this skill is therefore **transferred from human practice, not validated for AI-augmented use.** This skill must say so. Treat the AI value as: the agent makes the clustering cheap to run at scale, enforces the bottom-up discipline (cluster before naming), keeps every item traceable to its theme, and produces a durable, reusable artifact - benefits that do not depend on any contested quality claim.

## 5. When it works / when it fails (drives the eval negative cases and "When NOT to Use")

**Works best when:**
- There are **many items** (roughly dozens to hundreds) - research notes, support tickets, survey free-text, retro stickies, interview quotes - that need to become a few themes.
- The right structure is **not known in advance** and should emerge from the data rather than being imposed.
- The items already exist; the job is synthesis, not generation.
- Traceability matters: you want each theme to point back to the specific items that support it.

**Fails or misleads when (poor-fit / anti-patterns):**
- **Only a handful of items.** With a dozen or fewer items you can reason about them directly; the clustering ceremony adds overhead without insight. (Anti-trigger.)
- **You need a top-down logical structure** - a question decomposed into MECE sub-questions or a hypothesis tree. That is **issue-tree** decomposition (top-down, from a question), not affinity mapping (bottom-up, from items). (Near-miss anti-trigger.)
- **You need to generate ideas or options.** Affinity mapping organizes items that already exist; it produces no new ideas. Use an ideation method (for example brainwriting) to create the items first, then affinity-map them. (Near-miss anti-trigger.)
- **The categories are already fixed and authoritative** (a required taxonomy, a compliance schema). Then you are coding/sorting into known buckets, not discovering emergent themes.
- **Run as ritual** - grouping into a few buckets and slapping confident names on them with no traceability and no discipline against the analyst's prior frame produces cargo-cult themes. The skill must keep items attached to themes and force naming to come *after* grouping.

## 6. Output artifact

The skill must emit a **clustered theme map**, not prose: a small set of named themes, each with a one-line description of what unifies it, the list (or count plus representative examples) of source items it contains, and its relative size/weight, preceded by a short "themes and what they tell us" summary. Items that did not cluster ("outliers / parking lot") are kept visible, not silently dropped. The artifact is the deliverable; the conversation is not.

## 7. Sources

1. Kawakita, Jiro (1967). *Hassoso* - the original KJ method for synthesizing field data bottom-up.
2. Mizuno, Shigeru, ed. (1988). *Management for Quality Improvement: The Seven New QC Tools* - affinity diagram in quality management.
3. Nielsen Norman Group, "Affinity Diagramming: Collaboratively Sort UX Findings & Design Ideas" - the standard UX-practice description of the technique.
4. Scupin, R. (1997). "The KJ Method: A Technique for Analyzing Data Derived from Japanese Ethnology." *Human Organization* 56(2):233-237 - documents the method's anthropological origin and use.

> **Verification status:** citations 1-2 are the standard historical attributions and well-attested in the discovery corpus; the exact NN/g phrasing (citation 3) and the Scupin page reference (citation 4) were drawn from a secondary research synthesis and should be confirmed against the primary sources before they appear in any public-facing README. They are safe to use *inside this dossier* because the dossier's job is to be honest about exactly this uncertainty. The "limited controlled evidence" claim in section 3 is a deliberate statement of absence: it should stay phrased as "no strong controlled evidence found," not as a positive finding.
