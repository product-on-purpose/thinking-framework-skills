# Build spec + implementation plan: think-expected-value-decision-tree

> **STATUS: SPEC (build pending).** Research verdict: **BUILD at governing tier P** (a deliberate
> downgrade from the catalog's M prior). Source of truth for the research is
> [`skills/think-expected-value-decision-tree/SKILL.md`](../../../../skills/think-expected-value-decision-tree/SKILL.md) (skill shipped; the proposed dossier was merged into the skill).
> File shapes mirror the shipped nearest-neighbor skill `skills/think-decision-option-review/` (same
> family, same author template). This document has two parts: **Part A - Spec** (the contract: the move,
> the artifact, the rubric-compliant description, the procedure, the when-NOT walls, the distinctness
> statement, the evidence grade, and acceptance criteria) and **Part B - Implementation plan** (the
> six-file anatomy, the registry + manifest edits, the regen + verify steps, and the gotchas).

---

# PART A - SPEC

## The durable cognitive move

Choose among actions by **pricing uncertain outcomes**: place explicit probabilities on events the
decider does not control, fold them into **chance nodes**, and **roll the tree back** (right to left) so
each chance node collapses to its expected value (EV = sum of probability x value) and each choice node
keeps its best-EV branch. What survives the rollback is the option with the highest expected value and
the path that produces it. The load-bearing ingredient, the thing no shipped skill has, is the **chance
node**: an explicit, probability-weighted representation of outcomes outside the decider's control,
folded back into a single number a choice can be made on. A second, optional layer is **expected
utility** (bending the value scale to capture risk attitude); EV maximization is its risk-neutral
special case, and the variance / risk-of-ruin dimension is what the when-NOT walls below protect.

## The named artifact

A **decision tree with rolled-back expected values, the chosen branch, and a what-flips-it (sensitivity)
note** that names the single probability or value which, if it moved past a stated threshold, would
reverse the decision. The deliverable is the tree plus the rollback plus the sensitivity note, never a
bare EV number presented as the answer. Soft or sourced-by-guess inputs are flagged at the node where
they enter, not laundered into the arithmetic.

## SKILL.md description (draft, rubric-compliant)

> Drafted to pass the U5/U3 gate in the toolkit's `scripts/checks/description-score.mjs` (resolved at
> `.agent-skills-toolkit/scripts/checks/description-score.mjs`; threshold 0.70). It starts
> with an allowed action verb (`Evaluates`), contains "Use when", has no first-person, contains no
> colon-space (": "), stays well under 1024 chars, and avoids `< >` and 4+ all-caps runs. Verify with the
> score check before merge (see Part B gotchas).

```
Evaluates competing actions under uncertainty by building a decision tree of choice and chance nodes, placing explicit probabilities on outcomes the decider does not control, rolling the tree back to an expected value per option, recommending the best-EV branch, and adding a what-flips-it note naming the probability or value that would reverse the choice. Use when a decision turns on uncertain outcomes you can put rough probabilities on, when the structure is sequential (a choice opens chance events that open later choices), and when the stakes justify making the probability assumptions explicit and inspectable instead of buried in a gut feel.
```

Notes on the draft: it names both node kinds (the distinct mechanism), states the artifact (rolled-back
EV tree + what-flips-it note), and the "Use when" clause encodes the three native-fit conditions
(uncertain priceable outcomes, sequential structure, stakes that justify explicitness). It does NOT use
"x" for the EV multiply (avoids a stray symbol); the multiply is described in words. Keep the value on a
single physical line in the frontmatter.

## Procedure outline (the numbered steps SKILL.md implements)

1. **Frame the decision and the options.** State the one-line choice and list the real, distinct actions
   under consideration. If the call is reversible and low-stakes, stop and triage with
   one-way-vs-two-way-door instead of building a tree.
2. **Lay out the tree.** For each option, draw the sequence of **choice nodes** (branches the decider
   controls) and **chance nodes** (branches nature controls). Put the outcomes at the leaves.
3. **Source the probabilities, do not invent them.** For every chance-node fan, assign probabilities
   that sum to 1, and **name where each number came from** (a base rate via reference-class-forecasting,
   a measured rate, a stated assumption). Flag any probability that is a guess at the node it enters.
4. **Price the outcomes.** Put a value on each leaf in a common unit. Note any outcome whose value
   resists a common scale (an incommensurable cost), rather than forcing a fake number.
5. **Roll the tree back (fold back), right to left.** At each chance node, replace the fan with its
   expected value (sum of probability x value). At each choice node, keep the best-EV branch and prune
   the rest. Carry the arithmetic explicitly so it can be checked.
6. **Run the what-flips-it (sensitivity) step.** Identify the single probability or value the
   recommendation is most fragile to, and state the threshold at which it would flip the chosen branch.
   This is the deliverable's spine, not an optional extra.
7. **Check for ruin and risk attitude before recommending.** If any branch carries a small probability
   of an intolerable, non-recoverable loss on a one-shot decision, say so and flag that raw EV is the
   wrong criterion here (risk of ruin or a risk-averse utility governs). If the decider's risk aversion
   is a real preference, surface it rather than overriding it with the risk-neutral EV.
8. **Recommend and emit the artifact.** State the chosen option, its EV, the path that produces it, the
   what-flips-it note, and any ruin / incommensurability flags, per `references/TEMPLATE.md`.

## When-NOT-to-use wall

Do NOT use when:

1. **The probabilities and values are guessed and then trusted.** A tree renders fabricated inputs in
   the authoritative grammar of arithmetic, manufacturing **false precision** - the central failure mode.
   A number with no defensible source does not become trustworthy by being multiplied. Where the
   probability is the hard part, source a base rate via reference-class-forecasting instead of inventing
   one inside the tree.
2. **The decision is a one-shot with intolerable downside.** EV is an average over many independent
   repetitions; the law of large numbers guarantees convergence across many bets, not on the single bet
   in front of you. A positive-EV gamble that includes a small probability of ruin is the wrong call for
   a one-time, non-repeated decision. The criterion there is risk of ruin or a risk-averse utility, not
   raw EV; treating the average as the answer is a category error.
3. **It is mistaken for descriptive truth.** EV is **normative** (what a coherent decider should do given
   those numbers), not a description of good judgment. People predictably violate it (Allais 1953;
   prospect theory, Kahneman and Tversky 1979) via the certainty effect and nonlinear probability
   weighting, and some of those deviations are real risk preferences the tree must **surface, not
   override**. The tool's job is to make the tradeoff explicit, not to declare the risk-neutral answer
   "correct" and the decider's risk aversion a bias.
4. **The outcome space cannot be enumerated or priced.** Deep uncertainty (you cannot list the outcomes,
   let alone probability them) and incommensurable values that resist a common scale both break the
   rollback. Forcing them into a tree produces tidy-but-fictional EVs.
5. **The call is reversible and low-stakes.** A two-way door does not need a tree; building one is its
   own small over-process. Triage with one-way-vs-two-way-door first, before reaching for quantitative
   machinery.

## Distinctness statement (vs the neighbors)

**The distinct move is the CHANCE NODE** - probability-weighted outcomes the decider does not control,
rolled back to an EV. No shipped skill represents a probabilistic outcome or a rollback. That is roughly
four-fifths of the mechanism and it is genuinely additive.

- **vs `decision-option-review` (the closest, the real test).** decision-option-review is *deterministic
  multi-attribute scoring*: list options, weight criteria, score each, recommend. It has **no
  probabilities, no chance nodes, no rollback**, and it cannot represent "30% chance of X worth a, 70%
  chance of Y worth b" or fold it back. It answers "which option scores best on my criteria"; EV answers
  "which is best once I price uncertain outcomes I do not control and how likely they are." The honest
  shared part is **only the outer shell** (compare options, recommend one, flag false precision), well
  under the ~20% working-mechanism ceiling. Clean wall, statable in each skill's when-NOT: use the matrix
  when the differentiator is *which attributes matter*; use the tree when the differentiator is
  *uncertain outcomes and their probabilities*.
- **vs `reference-class-forecasting`.** RCF *produces* a probability (the outside view, upstream); EV
  *consumes* one (downstream). They are complements, not duplicates - the natural pairing (RCF to source
  a chance-node probability, then EV to choose) is a reason both exist, not a reason to fold either.
- **vs `one-way-vs-two-way-door`.** Triages *how much process* a decision deserves by reversibility and
  never scores or picks an option. Orthogonal; it runs *before* a tree is even warranted.
- **vs `linear-model-aggregation`.** Combines cues with a fixed formula to reach a *prediction or
  judgment* (no chance nodes, no rollback); EV chooses among *actions* under probabilistic outcomes.
  Different problem, different machinery. Distinct.
- **vs `fermi-estimation`.** Decomposes to *estimate a quantity* order-of-magnitude; it does not choose
  among actions or weight outcomes by probability. Distinct.

**Why not a recipe.** No existing chain yields the move: decision-option-review supplies no probabilistic
rollback, and reference-class-forecasting supplies a number but not the chance-node tree or the fold-back
that turns numbers into a choice. The EV rollback is a **separable standalone mechanism**, so this is a
skill, not a chain.

## Evidence grade (honest)

**Governing tier: P (practitioner), capped from an S/P split.** The honest read is split and must not be
laundered upward:

- *EV / expected-utility maximization is the normatively correct rule given coherent probabilities and
  utilities* rests on von Neumann and Morgenstern (1944) and Savage (1954) - an S-tier **mathematical**
  result, but it measures the wrong thing for a skill.
- *Building a tree and computing EV makes a real decider's decisions better than the cheaper rule they
  would otherwise use* is the claim a **skill** actually makes, and its support is **practitioner-level
  and transferred** (clinical decision analysis: Raiffa 1968; Pauker and Kassirer 1980; Bae 2014), not
  controlled evidence that *using the tool* beats *not using it*.

The one nameable comparative finding is mixed and indirect (Mhaskar et al. 2014: decision-analysis
results concorded with matching RCT systematic reviews in 73% of cases, 27/37, and with single RCTs in
only 50%) - it bounds reliability, it does not lift the grade. **Transferred-evidence is true**: every
effectiveness datum is from human deciders, none from an AI-produced EV tree; for an agent the realistic
value is mechanical (force the probabilities to be named, compute the rollback without arithmetic slips,
run sensitivity), and even that is unproven. Per this library's rule, when the strong evidence is for a
sibling claim (the normative axioms) rather than for this move improving an agent's decisions, the tier
emitted is the conservative one: **P**. The SKILL.md frontmatter `evidence-tier` is therefore `"P"`, and
the SKILL.md Evidence section states the split, the transfer caveat, and the excluded number plainly (no
"decision-tree analysis improves decisions by N%" figure traces to a primary source; none is asserted).

No trademark; "decision tree", "expected value", and "decision analysis" are generic descriptive terms.
The registry entry is therefore **not** `branded` and needs no `attribution` / `trademark`.

## Acceptance criteria

- **AC1 - conformance gate green.** `node scripts/check.mjs` passes at the **advanced** tier with **0
  errors / 0 warnings** against the pinned toolkit ref (the three-layer required `check`: toolkit
  conformance + registry checks + the local guards).
- **AC2 - description score.** The SKILL.md description scores **>= 0.70** in the toolkit's
  `scripts/checks/description-score.mjs` (action verb, "Use when", no first-person, no colon-space, under
  1024 chars). The Part A draft scores **0.90** at 651 chars (verified).
- **AC3 - eval cases well-formed and name-safe.** `eval/cases.md` passes `validateCasesDoc` (sections
  "Should trigger" >= 3, "Should NOT trigger" >= 3, "Output checks" >= 1; no TODO/TBD/FIXME) and every
  `think-<slug>` token it names resolves to a **shipped** skill (the `findUnknownThinkNames` gate in
  `check-registry.mjs`).
- **AC4 - registry tier-consistency.** The registry's governing `tier` for `expected-value-decision-tree`
  (**P**) is a token of the SKILL.md `evidence-tier` (`"P"`), so the catalog grade cannot diverge from
  the skill's published grade (the SP3 tier-consistency check).
- **AC5 - referential + completeness.** `status: shipped` <-> `skills/think-expected-value-decision-tree/`
  exists (both directions); `evalCases` matches the canonical path; no orphan dossier; the shipped
  registry slug set matches the advisor's recommendable feed.
- **AC6 - build clean end to end.** `npm test`, the Astro site build, and the rendered-link + route-parity
  guards all pass after the regen pipeline (Part B) is run and the generated views byte-match.

---

# PART B - IMPLEMENTATION PLAN

## 1. The six-file anatomy to author

Author `skills/think-expected-value-decision-tree/`, mirroring `skills/think-decision-option-review/`
file shapes exactly:

1. **`SKILL.md`** - frontmatter (`name: think-expected-value-decision-tree`, the Part A description on a
   single line, `license: Apache-2.0`, `metadata` block with `id:
   thinking-framework-skills.expected-value-decision-tree`, `family: decision-and-option-evaluation`,
   `evidence-tier: "P"`, `version: 0.1.0`, `standard: "0.8"`), then the provenance HTML comment, then the
   body: intro paragraph naming the chance node and the artifact; **When to Use**; **When NOT to Use**
   (the five-point wall from Part A, condensed to bullets); **Instructions** (the 8 numbered steps);
   **Output Format** (points at `references/TEMPLATE.md`); **Quality Checklist**; **Evidence** (the P
   split + transfer caveat + excluded number, pointing at `evidence/dossier.md`); **Examples** (points at
   `references/EXAMPLE.md`).
2. **`evidence/dossier.md`** - the `_proposed` research promoted into the **shipped** dossier format
   (the same shape as `skills/think-decision-option-review/evidence/dossier.md`): the identity table
   (Skill / Family / Evidence tier **P** with the false-precision + single-shot-ruin flags / Confidence /
   Status), then numbered sections (1 The mechanism, 2 Lineage, 3 What the evidence shows and does NOT
   show, 4 Transferred-evidence flag, 5 When it works / when it fails, 6 Output artifact) and a final
   **`## Sources`** section listing the named sources from the `_proposed` dossier (von Neumann and
   Morgenstern 1944; Savage 1954; Raiffa 1968; Bae 2014 with URL; Mhaskar et al. 2014 with URL; Allais
   1953; Kahneman and Tversky 1979; Pauker and Kassirer 1980) plus the verification-status note and the
   excluded-number line. Carry over the S/P split reasoning verbatim in substance (it is the load-bearing
   honesty of this entry).
3. **`references/TEMPLATE.md`** - the fill-in skeleton for the artifact: **Decision** (one line),
   **Options**, the **Tree** (choice nodes square, chance nodes circle, each chance fan's probabilities
   summing to 1 with a source per probability), **Outcome values** (common unit; note incommensurables),
   the **Rollback** (chance node -> EV; choice node -> best branch, arithmetic shown), the
   **Recommendation** (chosen option + EV + path), the **What-flips-it** note (the probability or value +
   its flip threshold), and a **Ruin / risk** flag line. Mirror the terse, bracketed-placeholder style of
   `think-decision-option-review/references/TEMPLATE.md`.
4. **`references/EXAMPLE.md`** - a completed run on the **shared Northwind scenario** (the same B2B SaaS
   used in `think-decision-option-review/references/EXAMPLE.md`), so the two neighbors are legible
   side by side. Frame a decision that genuinely hinges on an uncertain outcome (for example a go / test-
   first / no-go on a growth bet where a pilot's conversion rate is the chance node), draw the tree, fold
   it back with explicit arithmetic, give the recommendation + path, and end with a what-flips-it note
   naming the one probability that would reverse the call and a ruin check. Close with a one-line "the
   value is..." note in the template's voice, and point onward to complementary skills using **only
   shipped names** (reference-class-forecasting to source the chance-node probability;
   one-way-vs-two-way-door to triage first).
5. **`eval/cases.md`** - name-safe trigger/output eval, mirroring
   `think-decision-option-review/eval/cases.md`: **Should trigger** (>= 3 bullets - decisions hinging on
   priceable uncertain outcomes, sequential test-first-or-commit choices, go/no-go with a real failure
   probability), **Should NOT trigger** (>= 3 bullets - deterministic criteria comparison routes to
   decision-option-review; reversible low-stakes routes to one-way-vs-two-way-door; "where does the
   probability come from" routes to reference-class-forecasting; guessed-inputs / one-shot-ruin near-
   misses), **Output checks** (the artifact must be a rolled-back tree with chance nodes, sourced
   probabilities, a what-flips-it note, and a ruin flag, not a bare EV), and a **Value vs unaided
   baseline** note. **Every `think-<slug>` mentioned must be a shipped skill** (decision-option-review,
   reference-class-forecasting, one-way-vs-two-way-door all qualify). No TODO/TBD/FIXME.
6. **`skill.meta.yml`** - the rich sidecar, mirroring
   `think-decision-option-review/skill.meta.yml`: `identity` (id / slug `expected-value-decision-tree` /
   name / display_name "Expected Value Decision Tree" / version 0.1.0 / status draft / maturity alpha),
   `classification` (primary_family decision-and-option-evaluation; thinking_modes convergent / critical /
   analytical / quantitative; problem_contexts high-stakes, high-uncertainty; use_cases + poor_fit_cases
   from the walls), `interface` (required_inputs: options + the uncertain outcomes that distinguish them;
   primary_artifact_type decision-tree-ev; output_formats markdown), `execution` (mode inline;
   likely_companions reference-class-forecasting, premortem), `relationships` (often_follows
   reference-class-forecasting, one-way-vs-two-way-door; complements decision-option-review),
   `quality` (known_failure_modes: false precision, single-shot ruin, normative-mistaken-for-descriptive),
   `evidence` (evidence_tier "P"; transferred_evidence true; risk_flags false-precision, ruin;
   attribution_required false; trademark none; source_dossier evidence/dossier.md), `implementation`
   (the four paths).

## 2. Registry shipped-entry fields and the library.json component

> **Do NOT edit `frameworks/registry.mjs` or `library.json` as part of writing this spec.** This section
> documents the exact target edits for the build step that follows.

**Registry entry (`frameworks/registry.mjs`, the `expected-value-decision-tree` object).** An entry
already exists as a candidate (`tier: 'M', status: 'cand', verdict: 'build'`). The build **edits it in
place** to the shipped shape (it does not add a second entry). Target fields:

- `slug: 'expected-value-decision-tree'` (unchanged).
- `name: 'Expected-value / decision-tree'` (unchanged).
- `family: 'decision-and-option-evaluation'` (unchanged).
- `tier: 'P'` - **changed from `'M'`** (the governing grade, the conservative half of the S/P split; must
  be a token of the SKILL.md `evidence-tier "P"`).
- `status: 'shipped'` - **changed from `'cand'`**.
- `verdict: 'shipped'` - **changed from `'build'`**.
- `oneLine` - tighten to the move, for example `'price uncertain outcomes via chance nodes, roll back to
  EV'` (it currently reads `'weigh outcomes by probability x magnitude'`; keep it short, no colon-space).
- `reasoning` - replace the candidate note with the shipped rationale, for example `'Built and validated.
  The distinct move is the chance node (probability-weighted rollback) that decision-option-review lacks;
  governing tier capped to P from an S/P split.'`
- `evalCases: 'skills/think-expected-value-decision-tree/eval/cases.md'` - **added** (required for
  shipped; must match the canonical path exactly).
- `aliases: ['Expected value', 'Decision tree', 'EV']` (unchanged).
- `sources` (optional but recommended for a P entry with a real literature) - an array of `{ title, url,
  kind }` objects for the web-resolvable sources (Bae 2014 and Mhaskar et al. 2014 both have PMC URLs;
  `kind` such as `'teaching-article'` / `'systematic-review'`). Keep titles free of colon-space if
  authored in YAML elsewhere; in the `.mjs` registry they are JS string literals so a colon is fine
  inside quotes, but match the existing entry style (see the fishbone `sources` block at registry.mjs
  ~line 739 for the shape).
- **`attribution` / `trademark` / `branded`** - **omit** (generic descriptive terms, not branded).
- `dossierPath` - **optional**; the shipped dossier lives at `skills/think-expected-value-decision-tree/
  evidence/dossier.md`. `dossierPath` (used by 4 entries) points at a *published* `frameworks/<slug>/
  dossier.md`. If a published long-form page is wanted, also keep
  `frameworks/_proposed/expected-value-decision-tree/dossier.md` (or promote it to
  `frameworks/expected-value-decision-tree/dossier.md` and set `dossierPath` to it); otherwise leave
  `dossierPath` unset. Promoting the `_proposed` dossier out of `_proposed/` removes its completeness-
  check exemption, so only do that once the shipped entry exists.

**library.json component (repo-root plugin manifest).** Add one entry to `components.skills`, matching the
existing rows:

```json
{ "name": "think-expected-value-decision-tree", "path": "skills/think-expected-value-decision-tree/SKILL.md", "version": "0.1.0", "tier": "universal", "status": "active" }
```

(`gen-manifest` / the toolkit may rewrite or verify this; author it to match so the manifest check stays
0/0. Do not touch the `subagents` / `commands` arrays - this skill ships no command or subagent.)

## 3. Regen + verify steps

Run from the repo root, in order (the generated views must byte-match what is committed - the drift
guard):

1. **`node scripts/gen-registry.mjs`** - regenerates `framework-catalog.md` (the master table now shows
   `expected-value-decision-tree` as shipped at tier P) and the site `why-not.md` index.
2. **`node scripts/gen-recommendable.mjs`** - regenerates `recommendable.json` + `.md` (the advisor /
   top3 / random feed now includes the new shipped skill; its compound grade and family come from the
   SKILL.md).
3. **`node scripts/gen-site.mjs`** - regenerates the Astro Framework Library pages, the tool page, the
   family page, and the explore indexes from `library.json` + the skill files. (This is `npm run gen`.)
4. **`gen-manifest` + `gen-index`** - the toolkit's manifest + INDEX regeneration. These run as part of
   the toolkit pipeline that `scripts/check.mjs` invokes / verifies; regenerate the per-target manifests
   (claude + codex) and `INDEX.md` so the new skill is listed and the manifest presence checks stay 0/0.
5. **`node scripts/check.mjs`** - the three-layer required gate (toolkit conformance at advanced +
   `check-registry.mjs` + the local guards). Must be **0 errors / 0 warnings**.
6. **`npm test`** - `node --test tests/**/*.test.mjs`.
7. **Site build + guards** - the Astro production build, then `node scripts/check-rendered-links.mjs` and
   `node scripts/check-route-parity.mjs` (the rendered-link + route-parity guards) so the new framework /
   tool pages resolve and the route manifest stays in parity.

A convenient single pass: regen (1-4) -> `npm run check` + `npm test` -> site build + link/route guards,
then `git status` to confirm only the intended files changed and no generated view is dirty.

## 4. Gotchas

- **The U5 description rubric.** The description MUST start with an allowed action verb (use
  `Evaluates`), contain "Use when", carry no first-person ("I" / "you" / "we" / "you should" / "you
  can"), contain **no colon-space (": ")** anywhere in the value, stay under 1024 chars, and avoid `< >`
  and 4+ all-caps runs (so spell out "EV" as "expected value" on first use in the description, or keep
  "EV" only inside a longer word boundary - the all-caps penalty fires on `\b[A-Z]{4,}\b`, and "EV" is 2
  chars so it is safe, but avoid "EU" or "MCDA"-style 4+ caps). Verify with `node -e` against
  `scoreDescription` from `.agent-skills-toolkit/scripts/checks/description-score.mjs` before merge;
  target >= 0.70 (the Part A draft scores 0.90).
- **No colon-space in YAML.** In the SKILL.md frontmatter description and anywhere a value could be parsed
  as YAML, avoid ": " - it both trips the rubric and can be mis-parsed. Restructure with a comma or a
  sentence break (per the writing rule). Quote the `evidence-tier: "P"` value.
- **Eval-case name-safety.** `eval/cases.md` and `references/EXAMPLE.md` may name **only shipped** skills
  via their `think-<slug>` tokens. decision-option-review, reference-class-forecasting, and
  one-way-vs-two-way-door are all shipped and safe. Do **not** reference a not-yet-shipped or candidate
  slug (it would fail `findUnknownThinkNames`). Also keep the three required sections and bullet minimums,
  and no TODO/TBD/FIXME placeholders.
- **Tier token rule.** Keep the registry `tier` (`P`) a literal token of the SKILL.md `evidence-tier`
  string. If the SKILL.md ever uses a compound grade, `P` must appear as one of the `/`-split tokens, or
  the tier-consistency check fails.
- **No em-dashes or en-dashes.** None in any authored file (SKILL.md, dossier, template, example, eval,
  sidecar, registry edit, library.json, this spec). Use " - " (space hyphen space) or restructure;
  numeric ranges use plain hyphens. A PreToolUse hook also denies U+2014 / U+2013 in Edit/Write, so a slip
  is blocked at write time - author clean to avoid the bounce.
- **Do not hand-edit generated views.** `framework-catalog.md`, `recommendable.{json,md}`, the Astro
  pages, the per-target manifests, and `INDEX.md` are generated. Edit the sources (registry.mjs,
  library.json, the skill files) and regenerate; never patch a generated file directly or the drift guard
  fails.
