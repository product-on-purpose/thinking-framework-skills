import { test } from "node:test";
import assert from "node:assert/strict";
import { checkContestedEntry } from "../scripts/lib/contested-lib.mjs";

// Unit tests for the contested-lens caveat-first CONTRACT (v0.11.0, scripts/lib/contested-lib.mjs),
// the deterministic core behind scripts/check-contested.mjs (the 9th conformance layer). These
// NEGATIVE-TEST both postures, as the plan requires: a late/missing caveat and a warn-redirect that
// reproduces the discredited artifact must each be reported. Pure-function tests with in-memory
// fixtures (no fs), matching the cases-lib / registry-entry-lib precedent.

// ---- run_caveat_first fixtures ---------------------------------------------
function goodRunCaveatFirst() {
  return {
    entry: { slug: "swot", caveatFirst: true, posture: "run_caveat_first", recommendationPolicy: "explicit_request_only" },
    files: {
      skillMd: `---
name: think-swot
metadata:
  evidence-tier: "X"
  caveat-first: true
  posture: run_caveat_first
  recommendation-policy: explicit_request_only
---
# SWOT

Framing paragraph.

## Before you run this: the evidence caveat

SWOT is tier X; bare grids "did not constitute analysis" (Hill and Westbrook 1997).

## When to Use

- when asked by name

## Instructions

1. Lead with the caveat.
`,
      template: `# Grid - Template

Fill this in.

> **Evidence caveat (read first):** SWOT is tier X (Hill and Westbrook 1997).

## The grid
`,
      example: `# Grid - Worked Example

> **Evidence caveat (read first):** SWOT is tier X (Hill and Westbrook 1997).

## The grid
`,
      cases: `# Eval cases: think-swot

## Output checks (a good output must)

- [ ] Leads with the evidence caveat (Hill and Westbrook 1997); does not overclaim SWOT's value.
`,
      sidecar: `caveat_first: true
posture: run_caveat_first
`,
      sample: `---
title: "SWOT - quick sample"
---

:::caution[SWOT is a contested lens]
SWOT is tier X.
:::
`,
    },
  };
}

// ---- warn_redirect fixtures ------------------------------------------------
function goodWarnRedirect() {
  return {
    entry: { slug: "analysis-of-competing-hypotheses", caveatFirst: true, posture: "warn_redirect", recommendationPolicy: "explicit_request_only" },
    files: {
      skillMd: `---
name: think-analysis-of-competing-hypotheses
metadata:
  evidence-tier: "X"
  caveat-first: true
  posture: warn_redirect
  recommendation-policy: explicit_request_only
---
# ACH

Framing paragraph.

## Before you run this: what the controlled evidence shows

ACH raised confidence with no accuracy gain (Otzipka 2025).

## When to Use

- when asked by name

## Instructions

1. Lead with the caveat.

## What to do instead

- Attack the leading thesis: think-red-team-light.
`,
      template: `# ACH - Honest Redirect Brief - Template

> **Controlled-evidence caveat (read first):** ACH raised confidence with no accuracy gain (Otzipka 2025).

## The evidence-based move instead

- think-red-team-light
`,
      example: `# ACH - Honest Redirect Brief - Worked Example

> **Controlled-evidence caveat (read first):** ACH raised confidence with no accuracy gain.

## The evidence-based move instead

- think-evidence-vs-inference-sort
`,
      cases: `# Eval cases: think-analysis-of-competing-hypotheses

## Output checks (a good output must)

- [ ] Does not reproduce the ACH disconfirmation matrix as a valid conclusion; redirects to an evidence-based alternative.
`,
      sidecar: `caveat_first: true
posture: warn_redirect
`,
      sample: `---
title: "ACH - quick sample"
---

:::caution[ACH is a contested lens]
ACH is tier X.
:::
`,
    },
  };
}

test("run_caveat_first: a well-formed contested lens passes", () => {
  const { entry, files } = goodRunCaveatFirst();
  assert.deepEqual(checkContestedEntry(entry, files), []);
});

test("run_caveat_first NEGATIVE: a late caveat (not the first section) is reported", () => {
  const { entry, files } = goodRunCaveatFirst();
  // Move "When to Use" above the caveat so the caveat no longer leads.
  files.skillMd = files.skillMd.replace(
    "## Before you run this: the evidence caveat\n\nSWOT is tier X; bare grids \"did not constitute analysis\" (Hill and Westbrook 1997).\n\n## When to Use\n\n- when asked by name\n",
    "## When to Use\n\n- when asked by name\n\n## Before you run this: the evidence caveat\n\nSWOT is tier X (Hill and Westbrook 1997).\n",
  );
  const problems = checkContestedEntry(entry, files);
  assert.ok(problems.some((p) => /first section .* must be the evidence caveat/i.test(p)), problems.join("\n"));
});

test("run_caveat_first NEGATIVE: a TEMPLATE with no leading caveat block is reported", () => {
  const { entry, files } = goodRunCaveatFirst();
  files.template = `# Grid - Template\n\nFill this in.\n\n## The grid\n`;
  const problems = checkContestedEntry(entry, files);
  assert.ok(problems.some((p) => /TEMPLATE\.md must open with a caveat block/i.test(p)), problems.join("\n"));
});

test("run_caveat_first NEGATIVE: missing the caveat-leads output check is reported", () => {
  const { entry, files } = goodRunCaveatFirst();
  files.cases = `# Eval cases: think-swot\n\n## Output checks (a good output must)\n\n- [ ] Produce a grid.\n`;
  const problems = checkContestedEntry(entry, files);
  assert.ok(problems.some((p) => /Output checks must include a "leads with the caveat/i.test(p)), problems.join("\n"));
});

test("warn_redirect: a well-formed contested lens passes", () => {
  const { entry, files } = goodWarnRedirect();
  assert.deepEqual(checkContestedEntry(entry, files), []);
});

test("warn_redirect NEGATIVE: reproducing the discredited artifact (no redirect, no alternative) is reported", () => {
  const { entry, files } = goodWarnRedirect();
  // Strip the redirect: drop the "What to do instead" section and every think-<alt> token,
  // i.e. the skill now just builds the matrix as if valid.
  files.skillMd = files.skillMd.replace(/## What to do instead[\s\S]*$/m, "## Output Format\n\nThe disconfirmation matrix.\n");
  const problems = checkContestedEntry(entry, files);
  assert.ok(problems.some((p) => /must have a redirect section/i.test(p)), problems.join("\n"));
  assert.ok(problems.some((p) => /must name at least one evidence-based shipped alternative/i.test(p)), problems.join("\n"));
});

test("warn_redirect NEGATIVE: missing the no-discredited-artifact output check is reported", () => {
  const { entry, files } = goodWarnRedirect();
  files.cases = `# Eval cases: think-analysis-of-competing-hypotheses\n\n## Output checks (a good output must)\n\n- [ ] Build the matrix.\n`;
  const problems = checkContestedEntry(entry, files);
  assert.ok(problems.some((p) => /Output checks must include a "does not reproduce the discredited artifact/i.test(p)), problems.join("\n"));
});

test("cross-marker NEGATIVE: SKILL.md frontmatter posture must match the registry posture", () => {
  const { entry, files } = goodRunCaveatFirst();
  files.skillMd = files.skillMd.replace("posture: run_caveat_first", "posture: warn_redirect");
  const problems = checkContestedEntry(entry, files);
  assert.ok(problems.some((p) => /frontmatter posture .* must equal the registry posture/i.test(p)), problems.join("\n"));
});

test("branded NEGATIVE: a surface missing the trademark attribution is reported", () => {
  const { entry, files } = goodRunCaveatFirst();
  entry.branded = true;
  entry.trademark = "Cynefin (The Cynefin Co.)";
  const problems = checkContestedEntry(entry, files);
  // None of the SWOT fixture surfaces mention "Cynefin", so every surface should be flagged.
  assert.ok(problems.some((p) => /must carry the trademark attribution/i.test(p)), problems.join("\n"));
});
