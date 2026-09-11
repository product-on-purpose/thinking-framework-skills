// =============================================================================
// warning-count-lib.mjs - keeping the gate's headline warning count honest, as a pure lib.
//
// what-it-is:   the parser for the toolkit evaluator's totals line, plus the list of places
//               the warning count is published in prose.
// what-it-does: reads `N error(s), M warning(s).` out of an evaluator run, and names each
//               present-tense published claim as a {label, where, pattern} surface that
//               check-counts.mjs can assert with checkCountSurface.
// why:          this number has gone stale three times - at v0.11.0 when the contested lenses
//               shipped, when docs/troubleshooting.md shipped without taxonomy frontmatter,
//               and again when the skill-selection eval added four files with no header
//               docblock (129 -> 133, making the published figure wrong the moment it merged).
//               A count copied onto N pages goes stale on N-1 of them, and CI already runs
//               the evaluator, so the figure can be ASSERTED instead of re-typed. Two
//               comparisons do it: the live run against the committed count, and every
//               published surface against that same committed count.
// used-by:      scripts/check-counts.mjs; scripts/check.mjs; tests/warning-count-lib.test.mjs
//
// The committed count lives in docs/internal/gate-warning-count.txt - one machine-readable
// number, so a human edits exactly one place and the gate proves the prose followed.
//
// A deliberate non-goal: the HISTORICAL provenance sentences in README.md and
// docs/conformance.md (how the count moved 0 -> 7 -> 128 -> 129) are dated records. They must
// keep their original numbers, so every pattern below matches only the present-tense claim.
// =============================================================================

export const COUNT_FILE = 'docs/internal/gate-warning-count.txt';

// The evaluator ends with a line of exactly `N error(s), M warning(s).`. Anchored to a whole
// line so an individual `[warn]` message that happens to say "warning(s)" cannot match.
export function parseEvaluatorTotals(text) {
  for (const raw of String(text == null ? '' : text).split(/\r?\n/)) {
    const m = raw.trim().match(/^(\d+) error\(s\), (\d+) warning\(s\)\.$/);
    if (m) return { errors: Number(m[1]), warnings: Number(m[2]) };
  }
  return null;
}

// Every place the CURRENT warning count is stated in prose. Each pattern captures the number
// in group 1 and is written tightly enough to miss the historical provenance sentences that
// sit a few lines away in the same files. Patterns are /g because checkCountSurface uses
// matchAll: every occurrence is checked, so a second stale copy cannot hide behind a
// correct first one.
export const WARNING_SURFACES = [
  {
    label: 'README two-dials paragraph',
    where: 'README.md',
    pattern: /the run reports \*\*0 errors and (\d+) warnings\*\*/g,
  },
  {
    label: 'conformance current-run claim',
    where: 'docs/conformance.md',
    pattern: /\*\*The current run: 0 errors, (\d+) warnings\.\*\*/g,
  },
  {
    label: 'conformance reproduce block',
    where: 'docs/conformance.md',
    pattern: /`Tier: advanced` with `0 error\(s\), (\d+) warning\(s\)`/g,
  },
];
