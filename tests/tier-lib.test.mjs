import { test } from "node:test";
import assert from "node:assert/strict";
import {
  TIER_RANK,
  tierParts,
  conservativeTier,
  parseEvidenceProse,
  parseFrontmatterTier,
  checkTierConsistency,
} from "../scripts/lib/tier-lib.mjs";

// The evidence tier is the single claim this library stakes its identity on, and it was the last
// published figure with no assertion behind it. `think-red-team-light` shipped tier P in its
// user-facing prose while its metadata said M, for three months, and the site rendered the
// metadata. Negative-first: the defect that actually shipped comes first.

const skill = ({ fm, prose }) => `---
name: think-example
metadata:
  evidence-tier: "${fm}"
---
# Example

## Evidence

${prose} Full grading: \`evidence/dossier.md\`.
`;

test("checkTierConsistency: the red-team-light defect - prose and metadata publishing different grades", () => {
  // The exact shape that shipped. Note the registry AGREES with the frontmatter, so the existing
  // registry-vs-frontmatter check (check-registry section 7) passes and sees nothing. Only reading
  // the prose catches it, which is the whole reason this rule exists.
  const problems = checkTierConsistency(
    "red-team-light",
    skill({ fm: "M", prose: "Tier **P** (transferred, flagged)." }),
    "M",
  );
  assert.equal(problems.length, 1);
  assert.match(problems[0], /publishes different grades/);
  assert.match(problems[0], /"M"/);
  assert.match(problems[0], /"P"/);
});

test("checkTierConsistency: agreement is silent", () => {
  assert.deepEqual(
    checkTierConsistency("example", skill({ fm: "M", prose: "Tier **M** (transferred, flagged)." }), "M"),
    [],
  );
});

test("checkTierConsistency: a compound honest read with the conservative grade governing", () => {
  // Frontmatter carries the honest split read; the registry carries the half that governs.
  // This test asserted `"M"` here until 2026-09-14, which is what the tree actually did and
  // what the conservative cap (below) now refuses.
  assert.deepEqual(
    checkTierConsistency(
      "causal-loop-diagrams",
      skill({ fm: "M/P", prose: "Tier **P** (governing; honest read **M/P**, transferred-evidence, capped at P)." }),
      "P",
    ),
    [],
  );
});

test("checkTierConsistency: a declared governing grade must be what the registry carries", () => {
  // think-boundary-critique's real shape: headline is the single governing grade, the honest read
  // is the compound behind it, and the registry must hold the governing one.
  const md = skill({ fm: "C/P", prose: "Tier **C** (governing; honest read **C/P**, capped at C)." });
  assert.deepEqual(checkTierConsistency("boundary-critique", md, "C"), []);

  // Carrying "P" here breaks TWO rules at once, and both should be reported rather than the
  // first one masking the second: the governing declaration says C, and P is also the optimistic
  // half of C/P (C is the weaker grade, and it is written FIRST - the ordering trap).
  const wrong = checkTierConsistency("boundary-critique", md, "P");
  assert.equal(wrong.length, 2);
  assert.ok(wrong.some((p) => /governing/.test(p)), wrong.join(' | '));
  assert.ok(wrong.some((p) => /OPTIMISTIC half/.test(p)), wrong.join(' | '));
});

// --- the conservative cap ---------------------------------------------------------------
// Added once it became true. Five shipped skills published the OPTIMISTIC half of a split read
// until 2026-09-14 - causal-loop-diagrams read "Tier **M/P**, transferred-evidence", which is
// verbatim the worked example in the rule saying such a method is tier P. The rule was
// deliberately left unasserted while that was the case, because a guard that reds its own tree
// teaches people to ignore guards. Measure, report, decide, then encode - in that order.

test("checkTierConsistency: the optimistic half of a split read is refused", () => {
  // The exact shape that shipped for months.
  const problems = checkTierConsistency(
    "causal-loop-diagrams",
    skill({ fm: "M/P", prose: "Tier **M/P**, transferred-evidence." }),
    "M",
  );
  assert.equal(problems.length, 1);
  assert.match(problems[0], /OPTIMISTIC half/);
  assert.match(problems[0], /capped at its conservative half "P"/);
});

test("checkTierConsistency: S/M is capped at M, not left at S", () => {
  // think-premortem's real shape before the re-grade.
  const problems = checkTierConsistency("premortem", skill({ fm: "S/M", prose: "Tier **S/M** (contested)." }), "S");
  assert.equal(problems.length, 1);
  assert.match(problems[0], /capped at its conservative half "M"/);
});

test("checkTierConsistency: a single unsplit grade is not subject to the cap", () => {
  assert.deepEqual(checkTierConsistency("swot", skill({ fm: "P", prose: "Tier **P**." }), "P"), []);
});

test("checkTierConsistency: a missing grade is reported, not silently skipped", () => {
  const noProse = checkTierConsistency("example", `---\nmetadata:\n  evidence-tier: "M"\n---\n## Evidence\n\nNo grade here.\n`, "M");
  assert.equal(noProse.length, 1);
  assert.match(noProse[0], /no "Tier \*\*X\*\*" grade/);

  const noFm = checkTierConsistency("example", `---\nname: x\n---\n## Evidence\n\nTier **M** (fine).\n`, "M");
  assert.equal(noFm.length, 1);
  assert.match(noFm[0], /no evidence-tier/);
});

// --- the ordering primitives ---------------------------------------------------------
// Conservative = weaker evidence. This must NEVER be inferred from position in the compound
// string: both "M/P" and "C/P" ship, and in "C/P" the conservative half is the FIRST token.

test("conservativeTier: takes the weaker grade regardless of which side it is written on", () => {
  assert.equal(conservativeTier("M/P"), "P"); // weaker half is second
  assert.equal(conservativeTier("C/P"), "C"); // weaker half is FIRST - the trap
  assert.equal(conservativeTier("P/C"), "C"); // and order must not matter
  assert.equal(conservativeTier("S/M"), "M");
  assert.equal(conservativeTier("P"), "P");
});

test("conservativeTier: unknown grades are dropped, not ranked", () => {
  assert.equal(conservativeTier("M/Z"), "M");
  assert.equal(conservativeTier("Z"), null);
  assert.equal(conservativeTier(""), null);
});

test("tierParts preserves authored order and drops unknowns", () => {
  assert.deepEqual(tierParts("C/P"), ["C", "P"]);
  assert.deepEqual(tierParts(" M / P "), ["M", "P"]);
  assert.deepEqual(tierParts("M/Q"), ["M"]);
});

test("TIER_RANK runs strongest to weakest", () => {
  assert.deepEqual(TIER_RANK, ["S", "M", "P", "V", "A", "C", "X"]);
});

test("parseEvidenceProse: distinguishes headline, honest read and a governing declaration", () => {
  const gov = parseEvidenceProse("## Evidence\n\nTier **C** (governing; honest read **C/P**, capped at C).");
  assert.deepEqual(gov, { headline: "C", honest: "C/P", governing: true });

  const plain = parseEvidenceProse("## Evidence\n\nTier **M/P**, transferred-evidence.");
  assert.deepEqual(plain, { headline: "M/P", honest: "M/P", governing: false });

  assert.deepEqual(parseEvidenceProse("# No evidence section"), { headline: null, honest: null, governing: false });
});

test("parseFrontmatterTier reads only the frontmatter block", () => {
  assert.equal(parseFrontmatterTier(skill({ fm: "M/P", prose: "Tier **M/P**." })), "M/P");
  assert.equal(parseFrontmatterTier("# no frontmatter\n\nevidence-tier: M\n"), null);
});
