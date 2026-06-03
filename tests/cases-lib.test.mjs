import { test } from "node:test";
import assert from "node:assert/strict";
import {
  extractSectionBody,
  parseBullets,
  deriveAntiTriggers,
  deriveNotUse,
  deriveOverlaps,
  validateCasesDoc,
  findUnknownThinkNames,
} from "../scripts/lib/cases-lib.mjs";

// Pure-function unit tests for the eval-cases + corpus-enrichment library (SP1).
// These functions are the deterministic core shared by scripts/eval-cases.mjs (the static
// validator wired into the conformance gate) and scripts/gen-recommendable.mjs (the corpus
// enrichment that adds anti_triggers / not_use / overlaps). Parsing is markdown-section based,
// matching the authored shape of skills/*/eval/cases.md and skills/*/SKILL.md.

const CASES = `# Eval cases: think-foo

## Should trigger

- "Prompt one about foo."
- "Prompt two about foo."
- "Prompt three about foo."

## Should NOT trigger (wrong tool / near-miss)

- "A near miss." (route to think-bar instead)
- "Another near miss." (trivial / reversible)
- "Third near miss." (unrelated)

## Output checks (a good output must)

- [ ] Do the foo thing.
- [ ] Emit the artifact.

## Value vs unaided baseline

Some prose about the baseline.
`;

const SKILL = `---
name: think-foo
---
# Foo

## When to Use

- when foo is needed

## When NOT to Use

- **After the outcome is known.** Use think-bar instead.
- **For trivial cases.** Skip the ceremony.

## Instructions

1. do the thing
`;

test("extractSectionBody returns the body under a heading and stops at the next h2", () => {
  const body = extractSectionBody(CASES, "Should NOT trigger");
  assert.match(body, /A near miss/);
  assert.match(body, /Third near miss/);
  assert.doesNotMatch(body, /Output checks/);
  assert.doesNotMatch(body, /Prompt one/);
});

test("extractSectionBody returns empty string for a missing section", () => {
  assert.equal(extractSectionBody(CASES, "Nonexistent Section"), "");
});

test("extractSectionBody does not confuse 'Should trigger' with 'Should NOT trigger'", () => {
  const body = extractSectionBody(CASES, "Should trigger");
  assert.match(body, /Prompt one/);
  assert.doesNotMatch(body, /near miss/);
});

test("parseBullets returns top-level bullets, stripped of marker and bold", () => {
  const bullets = parseBullets("- **Lead.** explanation\n- second\nnot a bullet\n");
  assert.deepEqual(bullets, ["Lead. explanation", "second"]);
});

test("deriveAntiTriggers pulls the Should-NOT-trigger bullets", () => {
  const at = deriveAntiTriggers(CASES);
  assert.equal(at.length, 3);
  assert.match(at[0], /near miss/);
});

test("deriveNotUse pulls the When-NOT-to-Use bullets", () => {
  const nu = deriveNotUse(SKILL);
  assert.equal(nu.length, 2);
  assert.match(nu[0], /After the outcome is known/);
});

test("deriveOverlaps finds known skill names named in the When-NOT-to-Use section", () => {
  const ov = deriveOverlaps(SKILL, new Set(["think-bar", "think-baz"]));
  assert.deepEqual(ov, ["think-bar"]);
});

test("validateCasesDoc returns no problems for a well-formed doc", () => {
  assert.deepEqual(validateCasesDoc(CASES), []);
});

test("validateCasesDoc flags a missing section", () => {
  const bad = CASES.replace("## Should NOT trigger (wrong tool / near-miss)", "## Irrelevant");
  const problems = validateCasesDoc(bad);
  assert.ok(problems.some((p) => /should not trigger/i.test(p)), problems.join("; "));
});

test("validateCasesDoc flags too few Should-trigger bullets", () => {
  const bad = CASES.replace('- "Prompt two about foo."\n- "Prompt three about foo."\n', "");
  const problems = validateCasesDoc(bad);
  assert.ok(problems.some((p) => /should trigger/i.test(p) && /\b3\b/.test(p)), problems.join("; "));
});

test("validateCasesDoc flags placeholder text", () => {
  const bad = CASES.replace('- "Third near miss." (unrelated)', "- TODO add a third");
  const problems = validateCasesDoc(bad);
  assert.ok(problems.some((p) => /placeholder|TODO/i.test(p)), problems.join("; "));
});

test("findUnknownThinkNames returns think-* tokens not in the known set", () => {
  const unknown = findUnknownThinkNames(
    "route directly to think-bar, not think-nonexistent",
    new Set(["think-bar", "think-foo"]),
  );
  assert.deepEqual(unknown, ["think-nonexistent"]);
});
