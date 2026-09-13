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
  findProseNamedRedirects,
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

// --- findProseNamedRedirects: the answer key must not silently lose a redirect --------------
// Negative-first. This defect SHIPPED, in sixteen anti-cases across thirteen skills, and it was
// invisible because it degrades quietly: extract-cases.mjs matches only `think-<slug>`, so a
// redirect written in prose resolves to `expected: 'none'` and the key then asserts that no tool
// is right about a situation a shipped skill handles. Re-scoring the stored 2026-09-10 routes
// against a corrected key showed the router had already answered 16 of 16 correctly - the key was
// destroying credit, not measuring a miss.

const KNOWN = new Set(["think-premortem", "think-process-tracing", "think-issue-tree", "think-red-team-light"]);
const casesDoc = (antiBullets) => `# Eval cases: SKILL

## Should trigger

- "One."

## Should NOT trigger (wrong tool / near-miss)

${antiBullets.join("\n")}

## Output checks (a good output must)

- [ ] Emit the artifact.

## Value vs unaided baseline

Prose.
`;

test("findProseNamedRedirects: a redirect named only in prose is caught", () => {
  // The exact shape that shipped: "(premortem)" with no slug.
  const hits = findProseNamedRedirects(
    casesDoc(['- "Imagine this launch already failed - list what caused it." (premortem)']),
    "think-reference-class-forecasting",
    KNOWN,
  );
  assert.equal(hits.length, 1);
  assert.equal(hits[0].named, "think-premortem");
  assert.equal(hits[0].prose, "premortem");
});

test("findProseNamedRedirects: a multi-word method name in prose is caught too", () => {
  // c572, the case that started this: "within-case process tracing in prose".
  const hits = findProseNamedRedirects(
    casesDoc(['- "Why did this one launch fail?" (single-case causal account; that is within-case process tracing in prose, not cross-case minimization)']),
    "think-qualitative-comparative-analysis",
    KNOWN,
  );
  assert.deepEqual(hits.map((h) => h.named), ["think-process-tracing"]);
});

test("findProseNamedRedirects: writing the slug clears it - that is the fix", () => {
  assert.deepEqual(
    findProseNamedRedirects(
      casesDoc(['- "Why did this one launch fail?" (single-case causal account; that is within-case think-process-tracing, not cross-case minimization)']),
      "think-qualitative-comparative-analysis",
      KNOWN,
    ),
    [],
  );
});

test("findProseNamedRedirects: a bullet naming its OWN skill is never flagged", () => {
  // resolveExpected returns 'none' for `named === source` by design, so prose cannot mislead the
  // key here. Flagging it would force authors to slug a name that changes nothing - and several
  // real anti-cases exist only to explain why the AUTHORING skill is the wrong fit.
  assert.deepEqual(
    findProseNamedRedirects(
      casesDoc(['- "Pick the best-case option." (that is maximax, not premortem as this skill does it)']),
      "think-premortem",
      KNOWN,
    ),
    [],
  );
});

test('findProseNamedRedirects: "declined" marks a method named in order to REFUSE it', () => {
  // The real case (think-process-tracing's ACH bullet): a contested lens under
  // explicit_request_only must NOT fire on a prompt that merely describes it, so `none` is the
  // correct key and must stay correct. Slugging it would make the key demand the opposite.
  assert.deepEqual(
    findProseNamedRedirects(
      casesDoc(['- "Score every hypothesis against every piece of evidence and pick the least-inconsistent." (that is red team light, whose record is null-to-negative and which is declined in this library)']),
      "think-process-tracing",
      KNOWN,
    ),
    [],
  );
});

test("findProseNamedRedirects: only the Should-NOT-trigger section is examined", () => {
  // A trigger-case prompt may legitimately contain a method name in prose; it is a user
  // utterance, not an answer key, and rewriting it would corrupt the corpus.
  const md = `# Eval cases: SKILL

## Should trigger

- "Run a premortem on this."

## Should NOT trigger (wrong tool / near-miss)

- "Something else." (unrelated)

## Output checks (a good output must)

- [ ] Emit the artifact.

## Value vs unaided baseline

Prose.
`;
  assert.deepEqual(findProseNamedRedirects(md, "think-issue-tree", KNOWN), []);
});
