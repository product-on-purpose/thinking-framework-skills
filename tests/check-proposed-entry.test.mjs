import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { validateEntry } from "../scripts/lib/registry-entry-lib.mjs";

// Unit tests for the SP5 C3 single-entry validator (scripts/lib/registry-entry-lib.mjs), the
// shared logic behind scripts/check-proposed-entry.mjs and the full registry CI pass. The schema
// is the single source of truth, so these load the real frameworks/registry.schema.json and
// exercise the conditionals the research engine's acceptance criteria (AC2/AC3/AC4) ride on.

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const schema = JSON.parse(readFileSync(resolve(ROOT, "frameworks", "registry.schema.json"), "utf8"));

// A well-formed Build candidate (the AC1 happy path: schema-valid entry with named sources).
const OK = {
  slug: "test-method",
  name: "Test Method",
  family: "problem-framing-and-reframing",
  tier: "P",
  status: "cand",
  verdict: "build",
  oneLine: "a one-line mechanism",
  reasoning: "the decisive rationale",
  sources: [{ title: "Author 2020, what was measured", url: "https://example.com/paper" }],
};

test("AC1: a well-formed Build entry is schema-valid", () => {
  assert.deepEqual(validateEntry(OK, schema), []);
});

test("missing a required field is rejected", () => {
  const e = { ...OK };
  delete e.reasoning;
  const problems = validateEntry(e, schema);
  assert.ok(problems.some((p) => /missing required field "reasoning"/.test(p)), problems.join("; "));
});

test("an unknown field is rejected (additionalProperties: false)", () => {
  const problems = validateEntry({ ...OK, bogus: 1 }, schema);
  assert.ok(problems.some((p) => /unknown field "bogus"/.test(p)), problems.join("; "));
});

test("a bad enum value is rejected", () => {
  const problems = validateEntry({ ...OK, tier: "Z" }, schema);
  assert.ok(problems.some((p) => /field "tier"/.test(p)), problems.join("; "));
});

test("AC2: a fold without foldInto fails the fold conditional", () => {
  const fold = { ...OK, slug: "steelmanning", name: "Steelmanning", family: "perspective-shifting-and-multi-lens", status: "fold", verdict: "fold" };
  const problems = validateEntry(fold, schema);
  assert.ok(problems.some((p) => /is a fold but has no foldInto/.test(p)), problems.join("; "));
});

test("AC2: a fold WITH foldInto passes (the steelmanning -> red-team-light verdict)", () => {
  const fold = { ...OK, slug: "steelmanning", name: "Steelmanning", family: "perspective-shifting-and-multi-lens", status: "fold", verdict: "fold", foldInto: "red-team-light" };
  assert.deepEqual(validateEntry(fold, schema), []);
});

test("AC3: a branded entry without trademark fails the branded conditional", () => {
  const branded = { ...OK, slug: "six-thinking-hats", name: "Six Thinking Hats", family: "perspective-shifting-and-multi-lens", tier: "X", status: "flag", verdict: "reject", branded: true, attribution: "Edward de Bono, 1985" };
  const problems = validateEntry(branded, schema);
  assert.ok(problems.some((p) => /is branded but has no trademark/.test(p)), problems.join("; "));
});

test("AC3: a branded entry with attribution + trademark passes", () => {
  const branded = { ...OK, slug: "six-thinking-hats", name: "Six Thinking Hats", family: "perspective-shifting-and-multi-lens", tier: "X", status: "flag", verdict: "reject", branded: true, attribution: "Edward de Bono, 1985", trademark: "Six Thinking Hats is a trademark of the de Bono IP holders" };
  assert.deepEqual(validateEntry(branded, schema), []);
});

test("a shipped entry without evalCases fails the shipped conditional", () => {
  const shipped = { ...OK, status: "shipped", verdict: "shipped" };
  const problems = validateEntry(shipped, schema);
  assert.ok(problems.some((p) => /is shipped but has no evalCases/.test(p)), problems.join("; "));
});

test("a non-object input is rejected rather than throwing", () => {
  assert.ok(validateEntry(null, schema).length > 0);
  assert.ok(validateEntry([1, 2], schema).length > 0);
});
