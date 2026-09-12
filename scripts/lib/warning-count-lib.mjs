// =============================================================================
// warning-count-lib.mjs - keeping the gate's headline warning count honest, as a pure lib.
//
// what-it-is:   the parser for the toolkit evaluator's totals and per-requirement tally, plus the
//               list of every place the gate's numbers are published in prose.
// what-it-does: reads `N error(s), M warning(s).` and the `[warn] <REQ>:` lines out of an evaluator
//               run, derives the post-0.8 documentation subtotal, and names each present-tense
//               published claim as a {label, where, pattern} surface that check-counts.mjs can
//               assert with checkCountSurface.
// why:          this number has gone stale FOUR times - at v0.11.0 when the contested lenses
//               shipped, when docs/troubleshooting.md shipped without taxonomy frontmatter,
//               again when the skill-selection eval added four files with no header docblock
//               (129 -> 133, making the published figure wrong the moment it merged), and again
//               when the G9 docblock sweep took it 129 -> 90. A count copied onto N pages goes
//               stale on N-1 of them, and CI already runs the evaluator, so the figure can be
//               ASSERTED instead of re-typed.
//
//               The fourth time exposed a gap in the third fix: only the headline TOTAL was
//               asserted. The three figures quoted BESIDE it - the post-0.8 subtotal, the
//               per-requirement breakdown, and the Standard-0.13 counterfactual - were published
//               in six live places and asserted in none, so the sweep would have left six freshly
//               false sentences behind a green gate. They are asserted now too.
// used-by:      scripts/check-counts.mjs; scripts/check.mjs; tests/warning-count-lib.test.mjs
//
// Two canonical files, each with one job:
//   docs/internal/gate-warning-count.txt   the headline TOTAL, one integer. check.mjs proves a
//                                          live run still matches it.
//   docs/internal/gate-composition.json    the BREAKDOWN and the 0.13 counterfactual. check.mjs
//                                          proves the live per-requirement tally matches, and
//                                          that it sums to the total above.
// The subtotal is DERIVED from the breakdown rather than stored, so the two cannot disagree.
//
// A deliberate non-goal: the HISTORICAL provenance sentences in README.md and
// docs/conformance.md (how the count moved 0 -> 7 -> 128 -> 129 -> 90) are dated records. They
// must keep their original numbers, so every pattern below matches only the present-tense claim.
// The same applies to site/src/content/docs/changelog/full.md, a dated mirror, which is out of
// scope for every surface here.
// =============================================================================

export const COUNT_FILE = 'docs/internal/gate-warning-count.txt';
export const COMPOSITION_FILE = 'docs/internal/gate-composition.json';

// Requirement ids introduced at Standard 0.10 and later, held at `warn` by the declared-version
// ceiling. Everything else in the tally (today: U5, the caveat-first description scores) is NOT
// post-0.8 debt and must not be counted into that subtotal.
const POST_08_PREFIX = /^G\d+$/;

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
    label: 'README conformance summary row',
    where: 'README.md',
    pattern: /\*\*0 errors\*\*, (\d+) non-gating warnings/g,
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
  {
    label: 'release-process debt measurement',
    where: 'docs/internal/release-process.md',
    pattern: /returns advanced \/ 0 errors \/ (\d+) warnings/g,
  },
  {
    label: 'backlog Standard-pin measurement',
    where: 'docs/internal/backlog.md',
    pattern: /returns advanced with 0 errors and (\d+) warnings/g,
  },
];

// The post-0.8 documentation subtotal, published beside the total and previously asserted nowhere.
// Derived from the committed breakdown, never stored twice.
export const POST_08_SURFACES = [
  {
    label: 'README post-0.8 subtotal',
    where: 'README.md',
    pattern: /\*\*(\d+) are post-0\.8 documentation requirements\*\*/g,
  },
  {
    label: 'README conformance summary parenthetical',
    where: 'README.md',
    pattern: /\((\d+) post-0\.8 docs rules held at warn/g,
  },
  {
    label: 'conformance post-0.8 subtotal',
    where: 'docs/conformance.md',
    pattern: /\*\*(\d+) are post-0\.8 documentation requirements\*\*/g,
  },
];

// The Standard-0.13 counterfactual. It cannot be asserted against a normal run - producing it
// requires temporarily declaring 0.13, which CI must not do - so the canonical value is
// hand-measured at each cut and these surfaces are asserted against THAT. The gate therefore
// proves the prose agrees with the recorded measurement, not that the measurement is current;
// re-measuring is a release-process step, and gate-composition.json says so in those words.
export const ERRORS_AT_013_SURFACES = [
  {
    label: 'README 0.13 counterfactual',
    where: 'README.md',
    pattern: /declaring 0\.13 instead returns convergent with (\d+) errors/g,
  },
  {
    label: 'conformance 0.13 counterfactual',
    where: 'docs/conformance.md',
    pattern: /returns \*\*convergent, (\d+) errors, 7 warnings\*\*/g,
  },
  {
    label: 'release-process 0.13 counterfactual',
    where: 'docs/internal/release-process.md',
    pattern: /returns convergent \/ (\d+) errors/g,
  },
  {
    label: 'backlog 0.13 counterfactual',
    where: 'docs/internal/backlog.md',
    pattern: /returns convergent with (\d+) errors/g,
  },
];

/**
 * Tally an evaluator run's `[warn] <REQ>: ...` lines by requirement id.
 *
 * Returns {} for text with no warn lines, which the caller must treat as suspicious rather than
 * as "zero warnings": a parser that silently yields nothing would let the composition assertion
 * pass forever without checking anything, which is the failure mode parseEvaluatorTotals'
 * null-return already guards against on the totals line.
 */
export function parseEvaluatorComposition(text) {
  const out = {};
  for (const raw of String(text == null ? '' : text).split(/\r?\n/)) {
    const m = raw.match(/^\s*\[warn\]\s+([A-Z]+\d+):/);
    if (m) out[m[1]] = (out[m[1]] || 0) + 1;
  }
  return out;
}

/** The post-0.8 documentation subtotal: every G-prefixed requirement in the breakdown. */
export function postStandard08(byRequirement) {
  return Object.entries(byRequirement || {})
    .filter(([req]) => POST_08_PREFIX.test(req))
    .reduce((n, [, count]) => n + count, 0);
}

/**
 * Compare a live per-requirement tally against the committed breakdown, in BOTH directions.
 *
 * Both directions matter and only one is obvious. A new requirement family appearing in the run
 * is the obvious drift. The subtle one is a family DISAPPEARING - which is exactly what the G9
 * sweep did - because a one-way check would call that a pass while the published breakdown went
 * on naming 39 docblock warnings that no longer exist.
 */
export function diffComposition(live, committed) {
  const problems = [];
  const reqs = [...new Set([...Object.keys(live || {}), ...Object.keys(committed || {})])].sort();
  for (const req of reqs) {
    const l = (live || {})[req] || 0;
    const c = (committed || {})[req] || 0;
    if (l === c) continue;
    if (!c) problems.push(`${req}: the run reports ${l} warning(s) but ${COMPOSITION_FILE} does not list ${req} at all`);
    else if (!l) problems.push(`${req}: ${COMPOSITION_FILE} says ${c} but the run reports none - if the debt was paid off, remove ${req} from the breakdown and update the prose`);
    else problems.push(`${req}: the run reports ${l} warning(s) but ${COMPOSITION_FILE} says ${c}`);
  }
  return problems;
}
