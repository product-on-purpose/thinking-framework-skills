// =============================================================================
// tier-lib.mjs - the evidence tier a skill publishes must be the tier it actually holds.
//
// what-it-is:   the deterministic rules tying a skill's three tier surfaces together - the
//               `## Evidence` prose, the frontmatter `evidence-tier`, and `frameworks/registry.mjs`.
// what-it-does: parses the prose grade (headline, honest read, and whether a GOVERNING tier is
//               declared) and returns the disagreements between those three surfaces.
// why:          `think-red-team-light` published tier P in its user-facing prose while its
//                metadata said M, for three months, and nothing caught it - the evidence tier is
//                the single claim this library stakes its identity on, and it was the one number
//                with no assertion behind it. Every other published figure got asserted in
//                v0.15.0; this one did not, because the rule was not yet known well enough to
//                encode. It is now, and it was MEASURED across all 63 shipped skills before being
//                written down here rather than assumed.
// used-by:      scripts/check-registry.mjs (section 9, lifecycle + tier truth); tests/tier-lib.test.mjs
// =============================================================================
//
// THE CONVENTION, as measured across all 63 shipped skills (not as assumed):
//
//   frontmatter `evidence-tier`   the HONEST READ, compound when the read is split ("M/P", "C/P")
//   prose `Tier **X**`            the same honest read - UNLESS it declares a governing grade,
//                                 e.g. `Tier **C** (governing; honest read **C/P**, capped at C)`
//   registry `tier`               a SINGLE governing grade
//
// Three invariants hold across every shipped skill today. This lib encodes the TWO that nothing
// else already asserts:
//   1. frontmatter == the prose honest read           <- encoded here; the red-team-light defect
//   2. registry grade is a MEMBER of the honest read  <- NOT here: check-registry section 7 already
//                                                        asserts exactly this. Two gate rules for
//                                                        one defect means two failures and no
//                                                        authoritative source, so this one is left
//                                                        where it already lives.
//   3. a declared governing grade == the registry     <- encoded here
//
// A FOURTH invariant, added 2026-09-14 once it became true: for a SPLIT honest read, the
// registry's single grade must be the CONSERVATIVE half. That is the library's stated
// non-negotiable, in agents/think-research-framework.md:
//
//     "a method whose honest read is 'M/P, transferred' is tier P in the entry, never the
//      optimistic half"
//
// It was deliberately NOT asserted when this file was written, because five shipped skills
// violated it - causal-loop-diagrams, concept-mapping, fermi-estimation, premortem and
// problem-restatement all carried the optimistic half, and causal-loop-diagrams read
// "Tier **M/P**, transferred-evidence" verbatim, the rule's own worked example. Encoding an
// invariant the tree does not satisfy ships a guard red on the tree it exists to protect, which
// teaches people to ignore guards. So it was recorded as a claim-level question for a human
// instead, the five were re-graded on a maintainer's decision, and the rule is asserted now.
// The ORDER matters and is the reusable part: measure, report, decide, then encode.

// Strongest to weakest. Conservative = weaker = HIGHER index. Never infer this from position in
// a compound string: both "M/P" and "C/P" appear, and in "C/P" the conservative half is the FIRST.
export const TIER_RANK = ['S', 'M', 'P', 'V', 'A', 'C', 'X'];

export const tierRank = (t) => TIER_RANK.indexOf(t);

// The members of a (possibly compound) tier string, in authored order, unknown grades dropped.
export function tierParts(tier) {
  return String(tier || '').split('/').map((s) => s.trim()).filter((s) => tierRank(s) >= 0);
}

// The weakest member - the grade an honest split read is capped at. null when nothing parses.
export function conservativeTier(tier) {
  const p = tierParts(tier);
  if (!p.length) return null;
  return p.slice().sort((a, b) => tierRank(b) - tierRank(a))[0];
}

// Pull the three prose facts out of a SKILL.md's `## Evidence` section.
// Returns { headline, honest, governing } - headline is the bolded grade that leads the section,
// honest is the "honest read **X/Y**" when one is spelled out (else the headline), and governing
// says whether the section declares the headline as the governing grade.
export function parseEvidenceProse(skillMd) {
  const md = String(skillMd);
  const at = md.search(/^##\s+Evidence\s*$/m);
  if (at === -1) return { headline: null, honest: null, governing: false };
  const ev = md.slice(at);
  const headline = (ev.match(/\bTier\s+\*\*([A-Z](?:\s*\/\s*[A-Z])*)\*\*/) || [])[1] || null;
  const honest = (ev.match(/honest read\s+\*\*([A-Z](?:\s*\/\s*[A-Z])*)\*\*/i) || [])[1] || headline;
  // Scoped to the opening of the section: "governing" appearing deep in a citation is not a declaration.
  const governing = /governing/i.test(ev.slice(0, 400));
  return { headline, honest, governing };
}

// The frontmatter grade. Returns null when the key is absent (a separate, louder problem).
export function parseFrontmatterTier(skillMd) {
  const md = String(skillMd);
  const end = md.indexOf('\n---', 4);
  if (end === -1) return null;
  return (md.slice(0, end + 1).match(/^\s*evidence-tier:\s*"?([A-Z/]+)"?\s*$/m) || [])[1] || null;
}

// The three verified invariants, as a list of problem strings ([] = consistent).
// `registryTier` is the entry's single grade; pass null for a skill with no registry entry.
export function checkTierConsistency(slug, skillMd, registryTier) {
  const problems = [];
  const where = `skills/think-${slug}`;
  const { headline, honest, governing } = parseEvidenceProse(skillMd);
  const fmTier = parseFrontmatterTier(skillMd);

  if (!headline) {
    problems.push(`tier: ${where}/SKILL.md has no "Tier **X**" grade in its ## Evidence section.`);
    return problems;
  }
  if (!fmTier) {
    problems.push(`tier: ${where}/SKILL.md frontmatter has no evidence-tier.`);
    return problems;
  }

  // 1. The metadata must carry what the prose actually claims. This is the red-team-light defect:
  //    prose said P, metadata said M, and the user-facing page published the metadata.
  if (honest !== fmTier) {
    problems.push(
      `tier: ${where} publishes different grades - frontmatter evidence-tier "${fmTier}" but the ` +
      `## Evidence prose reads "${honest}". The evidence tier is the claim this library stakes its ` +
      `identity on; two surfaces must not disagree about it.`,
    );
  }

  if (registryTier == null) return problems;

  // 2. "registry grade is a member of the honest read" is deliberately NOT checked here -
  //    check-registry.mjs section 7 already asserts it. See the header.

  // 3. A declared governing grade is a promise about what the registry carries.
  if (governing && headline !== registryTier) {
    problems.push(
      `tier: ${where} declares "Tier **${headline}** (governing...)" but the registry carries ` +
      `"${registryTier}". A governing grade is exactly what the registry is supposed to hold.`,
    );
  }

  // 4. A split honest read is capped at its conservative half. The library's central honesty
  //    commitment, and the one an inflated grade would quietly break.
  const members = tierParts(fmTier);
  if (members.length > 1) {
    const cap = conservativeTier(fmTier);
    if (registryTier !== cap) {
      problems.push(
        `tier: ${where} publishes the OPTIMISTIC half of a split read - honest read "${fmTier}", ` +
        `registry "${registryTier}", but a split read is capped at its conservative half "${cap}". ` +
        `A method whose honest read is "${fmTier}" is tier ${cap} in the entry ` +
        `(agents/think-research-framework.md). Laundering the weaker half out of a split grade is ` +
        `the single failure this library exists to prevent.`,
      );
    }
  }

  return problems;
}
