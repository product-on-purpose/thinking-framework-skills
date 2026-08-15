import { test } from "node:test";
import assert from "node:assert/strict";
import { checkContestedEntry } from "../scripts/lib/contested-lib.mjs";

// Red-team negative tests for the contested-lens caveat-first guard (2026-07-11).
// RED TODAY (each bypass currently passes), GREEN after the SPEC-05 / BL-13 hardening.
// Do NOT merge into tests/contested-lib.test.mjs until the guard fix lands, or CI reds on main.
//
// ADOPTION: this file is written to live at tests/contested-lib.redteam.test.mjs, where the
// import above ("../scripts/lib/contested-lib.mjs") is correct. It is stored in the audit's
// plan/security/ folder as a design artifact; to run it from there instead, the import needs
// five "../" to reach the repo root. The proven reproduction is bypass-hunt.mjs (absolute
// import, runs anywhere); this file encodes the FIX as TDD.
//
// Fixtures mirror tests/contested-lib.test.mjs so the baseline is known-good.

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

function goodWarnRedirect() {
  const ALTS = new Set(["think-red-team-light", "think-evidence-vs-inference-sort"]);
  return {
    ALTS,
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

ACH is tier X. In randomized controlled trials it raised confidence with no accuracy gain (Otzipka 2025). This skill will not build the matrix as if valid.

## When to Use

- when asked by name

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

// RT-1: in-caveat rehabilitation. After the denylist is widened with the soft-endorsement register,
// the caveat that pivots to selling the method must be flagged.
test("RT-1 (red until SPEC-05): in-caveat rehabilitation is flagged as endorsement", () => {
  const { entry, files } = goodRunCaveatFirst();
  files.skillMd = files.skillMd.replace(
    /## Before you run this: the evidence caveat\n\n[\s\S]*?\n\n## When to Use/,
    `## Before you run this: the evidence caveat\n\nYes, SWOT is nominally tier X in the 1997 academic literature - but that critique only targeted lazy usage. Run with discipline and SWOT becomes one of the most powerful and widely trusted strategic tools available, a genuine classic relied on for decades.\n\n## When to Use`,
  );
  const problems = checkContestedEntry(entry, files);
  assert.ok(problems.some((p) => /endorsement\/dismissal language/i.test(p)), "RT-1 not yet blocked: " + problems.join("\n"));
});

// RT-2: a bare popularity year must not satisfy the evidence-signal requirement.
test("RT-2 (red until SPEC-05): a bare popularity year is not an evidence signal", () => {
  const { entry, files } = goodRunCaveatFirst();
  files.skillMd = files.skillMd.replace(
    /## Before you run this: the evidence caveat\n\n[\s\S]*?\n\n## When to Use/,
    `## Before you run this: the evidence caveat\n\nSWOT has been a boardroom staple since 1965 and remains hugely popular across industries to this day. Some academics quibble with it, but it has served countless teams for many years.\n\n## When to Use`,
  );
  const problems = checkContestedEntry(entry, files);
  assert.ok(problems.some((p) => /evidence signal/i.test(p)), "RT-2 not yet blocked: " + problems.join("\n"));
});

// RT-3: an HTML table reproducing the discredited matrix must be caught like a pipe table.
test("RT-3 (red until SPEC-05): HTML-table artifact reproduction is flagged", () => {
  const { ALTS, entry, files } = goodWarnRedirect();
  files.example = `# ACH - Worked Example

> **Controlled-evidence caveat (read first):** ACH raised confidence with no accuracy gain (Otzipka 2025).

Redirect to think-evidence-vs-inference-sort. But here is the full matrix:

<table>
<tr><th>Evidence</th><th>H1</th><th>H2</th></tr>
<tr><td>item a</td><td>C</td><td>I</td></tr>
</table>

Least-inconsistent: H1.
`;
  const problems = checkContestedEntry(entry, files, { validAlternatives: ALTS });
  assert.ok(problems.some((p) => /must not reproduce the discredited tabular artifact/i.test(p)), "RT-3 not yet blocked: " + problems.join("\n"));
});

// RT-3b: documented residual - a whitespace-aligned pseudo-matrix is structurally indistinguishable
// from formatted prose. Marked todo: not expected to pass via structure; it is a human-review catch.
test("RT-3b (residual, structural detection not expected)", { todo: true }, () => {
  const { ALTS, entry, files } = goodWarnRedirect();
  files.example = `# ACH - Worked Example

> **Controlled-evidence caveat (read first):** ACH (Otzipka 2025).

Redirect to think-red-team-light. Matrix for reference:

Evidence    H1   H2
item a       C    I
`;
  const problems = checkContestedEntry(entry, files, { validAlternatives: ALTS });
  assert.ok(problems.some((p) => /tabular artifact/i.test(p)), problems.join("\n"));
});

// RT-4 (= audit C-05): a 6-line soft-endorsement preamble must be rejected once the limit tightens.
test("RT-4 (red until BL-13): a soft-endorsement preamble under the old 6-line limit is rejected", () => {
  const { entry, files } = goodRunCaveatFirst();
  const promo = [
    "SWOT is the single most popular strategic framework in the world.",
    "It is taught in every MBA program and trusted by Fortune 500 teams.",
    "It has been the industry standard for over fifty years.",
    "Leading consultancies reach for it first on every engagement.",
    "Practitioners everywhere consider it an indispensable classic.",
    "Few tools are as beloved or as widely adopted across sectors.",
  ].join("\n");
  files.skillMd = files.skillMd.replace("Framing paragraph.", promo);
  const problems = checkContestedEntry(entry, files);
  assert.ok(
    problems.some((p) => /buries the caveat under a .* preamble/i.test(p) || /endorsement\/dismissal language/i.test(p)),
    "RT-4 not yet blocked: " + problems.join("\n"),
  );
});

// --- The advisory channel (added with the RT-1 heuristic) -------------------------------------
// The warning path is opt-in and must never change gate outcomes. Both halves matter: it has to
// fire on the shape it was built for, and it has to stay silent on the honest fixture, because a
// noisy advisory is one that gets ignored.

test("advisory: the RT-1 contrastive shape produces a warning", () => {
  const { entry, files } = goodRunCaveatFirst();
  files.skillMd = files.skillMd.replace(
    /## Before you run this: the evidence caveat\n\n[\s\S]*?\n\n## When to Use/,
    `## Before you run this: the evidence caveat\n\nSWOT is nominally tier X per the field study (Hill and Westbrook 1997). Used with care it becomes a trusted staple for many teams.\n\n## When to Use`,
  );
  const warnings = [];
  checkContestedEntry(entry, files, { warnings });
  assert.ok(warnings.some((w) => /rehabilitates the method/i.test(w)), "expected an advisory: " + warnings.join("\n"));
});

test("advisory: the honest fixture produces NO warning (a noisy advisory is an ignored one)", () => {
  const { entry, files } = goodRunCaveatFirst();
  const warnings = [];
  const problems = checkContestedEntry(entry, files, { warnings });
  assert.deepEqual(problems, []);
  assert.deepEqual(warnings, [], "the honest caveat must not trip the heuristic");
});

test("advisory: warnings never change the gate outcome, and are opt-in", () => {
  const { entry, files } = goodRunCaveatFirst();
  files.skillMd = files.skillMd.replace(
    /## Before you run this: the evidence caveat\n\n[\s\S]*?\n\n## When to Use/,
    `## Before you run this: the evidence caveat\n\nSWOT is nominally tier X per the field study (Hill and Westbrook 1997). Used with care it becomes a trusted staple for many teams.\n\n## When to Use`,
  );
  const warnings = [];
  const withChannel = checkContestedEntry(entry, files, { warnings });
  const withoutChannel = checkContestedEntry(entry, files);
  assert.ok(warnings.length > 0, "the channel should have collected something");
  assert.deepEqual(withChannel, withoutChannel, "problems must be identical with and without the channel");
  assert.deepEqual(withChannel, [], "an advisory-only finding must not fail the gate");
});

test("a CITED year still satisfies the evidence signal (the tightening must not break real caveats)", () => {
  const { entry, files } = goodRunCaveatFirst();
  files.skillMd = files.skillMd.replace(
    /## Before you run this: the evidence caveat\n\n[\s\S]*?\n\n## When to Use/,
    `## Before you run this: the evidence caveat\n\nBare grids collapsed into undifferentiated lists and did not constitute analysis (Hill and Westbrook 1997), which is why this skill forces prioritisation.\n\n## When to Use`,
  );
  const problems = checkContestedEntry(entry, files);
  assert.ok(!problems.some((p) => /evidence signal/i.test(p)), "a parenthetical citation must count: " + problems.join("\n"));
});
