<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Shared applicator engine

This is the shared engine behind `think-top3` and `think-random-frameworks`. Both skills SELECT three frameworks from the library, then APPLY each one to the user's topic. Applying means actually running the framework and emitting its real artifact (a risk register, an option matrix, a restated problem), not naming or recommending it. Recommending without running is the advisor's job; this engine does the opposite.

The two skills differ ONLY in the selection step. Each skill's SKILL.md names its mode (RANK or RANDOM); follow the matching "Selection mode" section below, then run the shared Apply and Output steps for all three.

## Step 0 - Read the inputs

1. Take the user's topic: the situation, decision, problem, or stuck point in their words. If it is under about 15 words or carries no concrete signal, ask ONE clarifying question, then proceed.
2. Load the corpus: the generated recommendable feed at `skills/think-framework-advisor/references/recommendable.json` (the same feed the advisor reads). It lists the 34 framework skills and deliberately excludes the meta-skills, so this skill cannot select itself. Each `skills[]` entry carries: `name` (the only string you may name; drop the `think-` prefix to get the slug), `family`, `tier`, `description` (sentence 1 names the artifact it emits; the "Use when ..." clause gives positive triggers), `anti_triggers` (near-miss utterances to penalize), `not_use` (when-NOT guardrails), and `overlaps` (sibling frameworks to disambiguate against). Use ONLY the entries in `skills[]`. Never name or apply a framework whose exact `name` is not in this file. Recipes (`recipes[]`) are out of scope for both skills.

## Selection mode: RANK (used by think-top3)

Score every `skills[]` entry for relevance to the topic, then take the top 3.

- POSITIVE signal: the topic matches the "Use when ..." triggers and the emitted artifact in `description`; the dominant cognitive job the topic needs matches the entry's `family`. Weight by `tier` as a tie-breaker only (prefer S over P when fit is equal); never let tier override a clearly better fit.
- NEGATIVE signal: if the topic matches an `anti_triggers` near-miss or a `not_use` bullet for an entry, push it DOWN (that entry is a known wrong fit for this kind of input).
- DEDUPE BY JOB: if two of your top 3 do the same cognitive job (two ideation methods, or an entry and a sibling listed in its `overlaps`), keep the better-fitting one and promote the next distinct framework. Three lenses on three different jobs beats three near-duplicates.
- DETERMINISM: ranking is a function of the topic. The same topic yields the same 3 (stable ordering; break exact ties by `tier` using the total order S, then S/M, then M/P, then P, and then alphabetical `name`).
- DEFER TO RECIPES: if the topic squarely matches a named recipe's job (reframe-problem, expand-options, stress-test-decision, audit-reasoning), say so in one line and point the user to that recipe (it is curated and sequence-checked); then proceed with the three best-fitting INDIVIDUAL frameworks for the part the recipe does not cover. This skill makes no claim of a validated sequence; a recipe does.

Record, for each of the 3: its `name`, why it ranked (the trigger or artifact it matched), and its `tier`.

## Selection mode: RANDOM (used by think-random-frameworks)

Draw 3 frameworks at random from `skills[]`, deliberately ignoring relevance. The point is to break fixation by applying lenses the situation would not naturally summon.

- Use a MECHANICAL, relevance-blind draw so the selection cannot be quietly fitted to the topic. Sort `skills[]` alphabetically by `name` and number them 0 to N-1.
- Compute a base index b from a content-independent number: if the user gave a seed, b = the sum of the seed's character codes; otherwise b = the number of characters in the user's topic text. Take the three entries at indices b mod N, (b + 11) mod N, and (b + 23) mod N (if two collide, step the later index forward until all three are distinct). This spreads the draw across the list and decouples it from your judgement of relevance.
- This is a relevance-blind draw, not a cryptographic random number generator: anti-fit is the point, not statistical randomness. Resist any pull to substitute "sensible" frameworks; if a drawn framework feels off-topic, that is the method working.
- A seed makes the draw reproducible (state the seed in the output); unseeded, state "unseeded (fresh draw)" and note it varies with the topic. Exclude nothing on relevance grounds; the only non-draws are recipes (not in `skills[]`) and the applicator skills (already absent from this corpus).

Record, for each of the 3: its `name`, the (fresh or seeded) draw, and its `tier`.

## Step A - Apply each selected framework

For EACH of the 3 selected frameworks, in turn:

1. Open the framework by slug: read `skills/think-<slug>/SKILL.md` (slug = `name` minus `think-`). The corpus has no procedure; the SKILL.md is where the method lives.
2. Read its `skills/think-<slug>/references/TEMPLATE.md` (the fill-in scaffold) and, if useful, `references/EXAMPLE.md` (a worked run).
3. HONOR WHEN-NOT FIRST. Read that framework's "When NOT to Use" (and the entry's `not_use`). If the topic falls in its no-fit zone:
   - In RANK mode, this should be rare (you ranked for fit); if it happens, swap in the next-ranked framework and note the swap.
   - In RANDOM mode, do NOT swap (anti-fit is the point), but state plainly that this framework is a poor structural fit and apply it anyway as a fixation-breaker, flagging that its artifact is exploratory, not a recommendation to act on.
4. Run the framework's own Instructions against the topic and emit its REAL artifact in its own output format (the filled TEMPLATE, not a summary of what it would produce). This emitted artifact is the whole point and the wall against the advisor, which only hands off a prompt.

## Step B - Synthesize across the three

After all three artifacts:

- (RANK / think-top3) Reconcile: where do the three converge, where do they conflict, and what is the single most load-bearing thing they jointly say about the topic? End with one short integrated read. This cross-synthesis is what makes top3 more than "advisor plus auto-run".
- (RANDOM / think-random-frameworks) Harvest the surprises: which random lens surfaced an angle the obvious analysis would have missed? Name 1 to 3 non-obvious prompts the draw exposed. Do NOT pretend the random set is a fitted analysis; its value is dislodging a frozen framing, not deciding the matter.

## Step C - Output format

Use this skill's `references/TEMPLATE.md`. The deliverable is: the 3 named frameworks (with why-selected), the 3 filled artifacts, and the synthesis or harvest. Not prose, not a list of recommendations.

## Guardrails (both skills)

- Name only frameworks whose exact `name` is in the recommendable corpus.
- APPLY, never merely recommend. If you stop at "you could run X", you have failed.
- Exactly 3. Not 2, not 5. The fixed N is part of each skill's contract.
- Carry each framework's `tier` honestly; never inflate. Three applied frameworks do not multiply confidence; over-fit and over-claim are the failure modes to avoid.
