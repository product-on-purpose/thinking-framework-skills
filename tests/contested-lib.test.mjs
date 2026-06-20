import { test } from "node:test";
import assert from "node:assert/strict";
import { checkContestedEntry } from "../scripts/lib/contested-lib.mjs";

// Unit tests for the contested-lens caveat-first CONTRACT (v0.11.0, scripts/lib/contested-lib.mjs),
// the deterministic core behind scripts/check-contested.mjs (the 9th conformance layer). These
// NEGATIVE-TEST both postures and the adversarial BYPASS classes surfaced by the Phase 1 review:
// a decoy caveat hidden in a code fence / HTML comment, an endorsement that contains the word
// "caveat", a weasel caveat block with no evidence, a warn-redirect that reproduces the tabular
// artifact, a redirect to a nonexistent skill, and trademark mentioned outside the leading caveat.
// Pure-function tests with in-memory fixtures (no fs), matching the cases-lib / registry-entry-lib
// precedent.

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

SWOT is tier X. The most-cited field study (Hill and Westbrook 1997) found bare SWOT grids collapsed into long undifferentiated lists and "did not constitute analysis". The value here is the discipline this skill adds, not the boxes.

## When to Use

- when asked by name

## Instructions

1. Lead with the caveat.
`,
      template: `# Grid - Template

Fill this in.

> **Evidence caveat (read first):** SWOT is tier X; bare grids "did not constitute analysis" (Hill and Westbrook 1997).

## The grid
`,
      example: `# Grid - Worked Example

> **Evidence caveat (read first):** SWOT is tier X; bare grids "did not constitute analysis" (Hill and Westbrook 1997).

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
SWOT is tier X (Hill and Westbrook 1997).
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

ACH is tier X. In randomized controlled trials it raised confidence with no accuracy gain (Otzipka 2025) and did not reduce confirmation bias (Dhami et al. 2019; Karvetski and Mandel 2020). This skill will not build the matrix as if valid.

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

> **Controlled-evidence caveat (read first):** ACH raised confidence with no accuracy gain (Otzipka 2025).

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
ACH is tier X (Otzipka 2025).
:::
`,
    },
  };
}

const ALTS = new Set(["think-red-team-light", "think-evidence-vs-inference-sort", "think-what-would-have-to-be-true"]);

test("run_caveat_first: a well-formed contested lens passes", () => {
  const { entry, files } = goodRunCaveatFirst();
  assert.deepEqual(checkContestedEntry(entry, files), []);
});

test("run_caveat_first NEGATIVE: a late caveat (not the first section) is reported", () => {
  const { entry, files } = goodRunCaveatFirst();
  files.skillMd = files.skillMd.replace(
    /## Before you run this: the evidence caveat\n\n[\s\S]*?\n\n## When to Use\n\n- when asked by name\n/,
    "## When to Use\n\n- when asked by name\n\n## Before you run this: the evidence caveat\n\nSWOT is tier X; bare grids did not constitute analysis (Hill and Westbrook 1997).\n",
  );
  const problems = checkContestedEntry(entry, files);
  assert.ok(problems.some((p) => /first section .* must be the evidence caveat/i.test(p)), problems.join("\n"));
});

test("BYPASS NEGATIVE: a decoy caveat heading hidden in a code fence does not satisfy 'caveat leads'", () => {
  const { entry, files } = goodRunCaveatFirst();
  // Real leading section is When to Use; a fake caveat heading sits inside a fenced block.
  files.skillMd = `---
name: think-swot
metadata:
  evidence-tier: "X"
  caveat-first: true
  posture: run_caveat_first
  recommendation-policy: explicit_request_only
---
# SWOT

Here is how other skills format a caveat:

\`\`\`markdown
## Before you run this: the evidence caveat
SWOT is weak (Hill and Westbrook 1997).
\`\`\`

## When to Use

- build the grid, no real caveat needed

## Instructions

1. Build the grid.
`;
  const problems = checkContestedEntry(entry, files);
  assert.ok(problems.some((p) => /first section .* must be the evidence caveat/i.test(p)), problems.join("\n"));
});

test("BYPASS NEGATIVE: a decoy caveat heading hidden in an HTML comment does not satisfy 'caveat leads'", () => {
  const { entry, files } = goodRunCaveatFirst();
  files.skillMd = files.skillMd.replace(
    "## Before you run this: the evidence caveat",
    "<!-- ## Before you run this: the evidence caveat -->\n\n## When to Use\n\n- build the grid\n\n## Instructions here actually",
  );
  const problems = checkContestedEntry(entry, files);
  assert.ok(problems.some((p) => /first section .* must be the evidence caveat/i.test(p)), problems.join("\n"));
});

test("BYPASS NEGATIVE: a caveat buried under a long promotional preamble is rejected", () => {
  const { entry, files } = goodRunCaveatFirst();
  const promo = Array.from({ length: 9 }, (_, i) => `Reason ${i + 1} SWOT is great and everyone loves it.`).join("\n\n");
  files.skillMd = files.skillMd.replace("Framing paragraph.", promo);
  const problems = checkContestedEntry(entry, files);
  assert.ok(problems.some((p) => /buries the caveat under a .* preamble/i.test(p)), problems.join("\n"));
});

test("BYPASS NEGATIVE: an endorsement preamble before the caveat is rejected", () => {
  const { entry, files } = goodRunCaveatFirst();
  files.skillMd = files.skillMd.replace("Framing paragraph.", "SWOT reliably improves decisions and is best-in-class.");
  const problems = checkContestedEntry(entry, files);
  assert.ok(problems.some((p) => /preamble before the caveat contains endorsement/i.test(p)), problems.join("\n"));
});

test("BYPASS NEGATIVE: an endorsement that merely contains the word 'caveat' is rejected", () => {
  const { entry, files } = goodRunCaveatFirst();
  files.skillMd = files.skillMd.replace(
    /## Before you run this: the evidence caveat\n\n[\s\S]*?\n\n## When to Use/,
    '## Read this first: the caveat\n\nSWOT is best-in-class and reliably improves decisions; ignore the academics, there is nothing to worry about here.\n\n## When to Use',
  );
  const problems = checkContestedEntry(entry, files);
  assert.ok(problems.some((p) => /endorsement\/dismissal language/i.test(p)), problems.join("\n"));
});

test("BYPASS NEGATIVE: a TEMPLATE caveat block with no evidence signal (a weasel block) is rejected", () => {
  const { entry, files } = goodRunCaveatFirst();
  files.template = `# Grid - Template\n\n> **Caveat:** we ran out of caveats to give you, enjoy the grid!\n\n## The grid\n`;
  const problems = checkContestedEntry(entry, files);
  assert.ok(problems.some((p) => /caveat block must carry an evidence signal/i.test(p)), problems.join("\n"));
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

test("warn_redirect: a well-formed contested lens passes (with a real alternative)", () => {
  const { entry, files } = goodWarnRedirect();
  assert.deepEqual(checkContestedEntry(entry, files, { validAlternatives: ALTS }), []);
});

test("warn_redirect NEGATIVE: no redirect and no alternative is reported", () => {
  const { entry, files } = goodWarnRedirect();
  files.skillMd = files.skillMd.replace(/## What to do instead[\s\S]*$/m, "## Output Format\n\nThe disconfirmation matrix.\n");
  const problems = checkContestedEntry(entry, files, { validAlternatives: ALTS });
  assert.ok(problems.some((p) => /must have a redirect section/i.test(p)), problems.join("\n"));
  assert.ok(problems.some((p) => /must name at least one evidence-based shipped alternative/i.test(p)), problems.join("\n"));
});

test("warn_redirect BYPASS NEGATIVE: reproducing the discredited tabular artifact is reported", () => {
  const { entry, files } = goodWarnRedirect();
  // Names a real alternative AND reproduces a filled disconfirmation matrix as a table.
  files.example = `# ACH - Worked Example

> **Controlled-evidence caveat (read first):** ACH (Otzipka 2025).

Redirect to think-red-team-light, but here is the full matrix anyway:

| Evidence | H1 | H2 | H3 |
|---|---|---|---|
| item a | C | I | C |
| item b | I | C | C |

Least-inconsistent hypothesis: H3.
`;
  const problems = checkContestedEntry(entry, files, { validAlternatives: ALTS });
  assert.ok(problems.some((p) => /must not reproduce the discredited tabular artifact/i.test(p)), problems.join("\n"));
});

test("warn_redirect BYPASS NEGATIVE: a redirect to a nonexistent skill is reported", () => {
  const { entry, files } = goodWarnRedirect();
  files.skillMd = files.skillMd.replace("think-red-team-light", "think-totally-made-up-skill");
  files.template = files.template.replace("think-red-team-light", "think-totally-made-up-skill");
  files.example = files.example.replace("think-evidence-vs-inference-sort", "think-totally-made-up-skill");
  const problems = checkContestedEntry(entry, files, { validAlternatives: ALTS });
  assert.ok(problems.some((p) => /none of which is a shipped, non-contested skill/i.test(p)), problems.join("\n"));
});

test("warn_redirect NEGATIVE: missing the no-discredited-artifact output check is reported", () => {
  const { entry, files } = goodWarnRedirect();
  files.cases = `# Eval cases: think-analysis-of-competing-hypotheses\n\n## Output checks (a good output must)\n\n- [ ] Build the matrix.\n`;
  const problems = checkContestedEntry(entry, files, { validAlternatives: ALTS });
  assert.ok(problems.some((p) => /Output checks must include a "does not reproduce the discredited artifact/i.test(p)), problems.join("\n"));
});

test("cross-marker NEGATIVE: SKILL.md frontmatter posture must match the registry posture", () => {
  const { entry, files } = goodRunCaveatFirst();
  files.skillMd = files.skillMd.replace("posture: run_caveat_first", "posture: warn_redirect");
  const problems = checkContestedEntry(entry, files);
  assert.ok(problems.some((p) => /frontmatter posture .* must equal the registry posture/i.test(p)), problems.join("\n"));
});

test("cross-marker TOLERANCE: an inline comment and quotes on the marker still pass", () => {
  const { entry, files } = goodRunCaveatFirst();
  files.skillMd = files.skillMd
    .replace("caveat-first: true", "caveat-first: true # contested")
    .replace("posture: run_caveat_first", 'posture: "run_caveat_first"');
  files.sidecar = `caveat_first: true   # marker\nposture: "run_caveat_first"\n`;
  assert.deepEqual(checkContestedEntry(entry, files), []);
});

test("branded NEGATIVE: the trademark mentioned outside the leading caveat (or as a denial) is reported", () => {
  const { entry, files } = goodRunCaveatFirst();
  entry.branded = true;
  entry.trademark = "Cynefin (The Cynefin Co.)";
  // Mention "Cynefin" only in a footer, not the leading caveat.
  files.skillMd += "\n\n## See also\n\nNot affiliated with Cynefin in any way.\n";
  const problems = checkContestedEntry(entry, files);
  assert.ok(problems.some((p) => /must carry the trademark attribution .* in the leading caveat/i.test(p)), problems.join("\n"));
});
