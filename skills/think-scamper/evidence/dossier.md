# Evidence Dossier: SCAMPER

> Single source of truth for the `scamper` skill. The SKILL.md, sidecar, and evals derive from this. If a claim is not here, it does not belong in the skill.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.scamper` (installable name `think-scamper`) |
| **Family** | divergent-ideation |
| **Evidence tier** | **P** (practitioner ideation heuristic) |
| **Confidence** | Moderate that structured prompts break fixedness; low that SCAMPER specifically outperforms other generators |
| **Status** | draft (authored 2026-05-31 from the discovery corpus) |

## 1. The mechanism (what actually does the work)

People and models fixate on the first few obvious variations of an idea (functional fixedness). SCAMPER counters this by running an existing idea, product, or process through seven transformation prompts, each forcing a different kind of change:

- **S**ubstitute - swap a component, material, rule, or person.
- **C**ombine - merge with another idea, feature, or step.
- **A**dapt - borrow a solution from a different domain.
- **M**odify - magnify, minify, or change an attribute.
- **P**ut to other use - apply it to a different user, job, or context.
- **E**liminate - remove a part, step, or assumption.
- **R**everse - invert order, roles, or direction.

The work is done by *systematically* forcing variation along axes a free-association brainstorm would skip, then *selecting* the promising few. It is a later-stage method: it transforms a seed that already exists; it is not a blank-page generator.

## 2. Lineage

- Alex Osborn's "idea-spurring questions" checklists (mid-20th-century creativity work) were arranged into the SCAMPER mnemonic by **Bob Eberle** (1971, *SCAMPER: Games for Imagination Development*). Design and innovation guides (Delft design method guide; IMD) document it as a standard later-stage ideation method.

No trademark on the technique; "SCAMPER" is a widely used generic mnemonic. Named descriptively as the skill; lineage cited.

## 3. What the evidence shows, and what it does NOT show

**Supported (modestly):** structured ideation prompts can help break functional fixedness and broaden an option set relative to unaided free association. This is consistent with the broader creativity-technique literature.

**NOT shown:** there is no strong controlled evidence that SCAMPER specifically produces better or more original ideas than other structured generators, or that idea *quantity* (which it reliably increases) translates to idea *quality*. Methods with stronger evidence for generation exist (Brainwriting 6-3-5 / Nominal Group Technique reliably beat verbal group brainstorming - those are separate skills, graded S). SCAMPER's honest grade is practitioner.

## 4. Transferred-evidence flag

Evidence is from human ideation contexts, not AI-augmented use. Transferred, not AI-validated. The AI value is specific: a model generates fluent but narrow variations by default; the seven prompts force breadth along defined axes, and the expansion sheet is a structured artifact that ends in a selected shortlist rather than a wall of ideas.

## 5. When it works / when it fails

**Works best when:** a seed idea, product, feature, or process already exists and needs to be pushed past the obvious; late-stage ideation; loosening a stuck or incremental option set.

**Fails or misleads when (poor-fit / anti-patterns):**
- **Blank page** - with no seed to transform, SCAMPER has nothing to operate on (reframe first, or use a different generator).
- The problem actually needs **reframing**, not more options (use problem restatement).
- **Volume without selection** - generating dozens of variants and stopping is the central failure mode; the skill must shortlist.
- **Mechanical seven-lens application** when only two or three lenses are relevant, padding the output.
- When you need to **converge and decide** (use a decision skill); SCAMPER diverges.

## 6. Output artifact

A **SCAMPER expansion sheet**: for each of the seven lenses, the prompt and one to three concrete variations it produced (skip lenses that genuinely do not apply, and say so), followed by a shortlist of the three to five most promising variations to carry forward.

## 7. Sources

1. Eberle, B. (1971). *SCAMPER: Games for Imagination Development* - the mnemonic, built on Osborn's idea-spurring checklists.
2. Delft design guide; IMD innovation guide - SCAMPER as a standard later-stage ideation method.
3. (Contrast) Diehl & Stroebe and the brainwriting/NGT literature - the methods with stronger generation evidence, noted here so SCAMPER's tier is not overstated.

> **Verification status:** the Eberle/Osborn lineage is well-attested. The "structured prompts help break fixedness" claim is directional from the creativity literature; do not attach a quantified effect to SCAMPER specifically in any public-facing text.
