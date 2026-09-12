// =============================================================================
// toolkit-pin-lib.mjs - reading the pinned validator ref out of CI, as a pure lib.
//
// what-it-is:   the parser that recovers which agent-skills-toolkit commit this repo grades
//               against, from the one file that actually decides it.
// what-it-does: scans .github/workflows/ci.yml for the checkout step naming the toolkit
//               repository and returns its 40-hex `ref`, refusing ambiguity rather than
//               guessing: no match, a short ref, or two different refs each throw.
// why:          the gate is only meaningful at the pinned ref - a newer toolkit reports whole
//               check families the pinned run does not, so grading against a stray sibling
//               checkout produces a scary number that has nothing to do with CI. A setup script
//               that hard-coded the SHA would become a second source of truth and drift from CI
//               the first time the pin moved. Parsing ci.yml means the pin CANNOT drift: there
//               is one place to change it, and everything else reads that place.
// used-by:      scripts/setup-toolkit.mjs; tests/toolkit-pin-lib.test.mjs
//
// Deliberately a text scan rather than a YAML parse: this repo keeps its scripts
// zero-dependency, and the shape being matched is a two-line `repository:` / `ref:` pair
// inside a `uses: actions/checkout` step. A real YAML dependency would buy nothing here and
// would cost the property that every script in scripts/ runs on a bare Node install.
// =============================================================================

export const CI_FILE = '.github/workflows/ci.yml';
export const TOOLKIT_REPO = 'product-on-purpose/agent-skills-toolkit';

// A pinned ref is a full 40-character commit SHA. Branch names and short SHAs are rejected on
// purpose: `ref: main` is not reproducible, and a short SHA cannot be verified byte-for-byte
// against what CI checked out.
const FULL_SHA = /^[0-9a-f]{40}$/;

/**
 * Recover { repository, ref } from a ci.yml's text.
 *
 * Throws rather than returning a default. A setup script that silently fell back to `main`
 * would install a toolkit CI never used, and the resulting local grade would disagree with CI
 * for reasons the contributor could not see - which is the exact confusion this whole pin
 * exists to prevent.
 */
export function parsePinnedRef(yamlText, { repository = TOOLKIT_REPO } = {}) {
  const text = String(yamlText == null ? '' : yamlText);
  const lines = text.split(/\r?\n/);

  const found = [];
  for (let i = 0; i < lines.length; i++) {
    const repoMatch = lines[i].match(/^\s*repository:\s*(\S+)\s*$/);
    if (!repoMatch || repoMatch[1] !== repository) continue;

    // The `ref:` belongs to the same `with:` block, so it sits within the next few lines at the
    // same or deeper indentation. Bounded lookahead keeps an unrelated later `ref:` from being
    // claimed by this repository.
    let ref = null;
    for (let j = i + 1; j < Math.min(i + 6, lines.length); j++) {
      if (/^\s*-\s/.test(lines[j])) break; // a new list item: we have left this step
      const refMatch = lines[j].match(/^\s*ref:\s*(\S+)\s*$/);
      if (refMatch) { ref = refMatch[1]; break; }
    }
    if (ref) found.push({ line: i + 1, ref });
  }

  if (!found.length) {
    throw new Error(
      `${CI_FILE}: found no checkout step pinning ${repository} to a ref. ` +
      'The pin is the single source of truth for which validators run; it cannot be inferred.',
    );
  }

  const distinct = [...new Set(found.map((f) => f.ref))];
  if (distinct.length > 1) {
    throw new Error(
      `${CI_FILE}: ${repository} is pinned to ${distinct.length} different refs ` +
      `(${distinct.join(', ')}). Two pins mean two different gates; fix ci.yml first.`,
    );
  }

  const ref = distinct[0];
  if (!FULL_SHA.test(ref)) {
    throw new Error(
      `${CI_FILE}: ${repository} is pinned to "${ref}", which is not a full 40-character ` +
      'commit SHA. A branch name or short SHA is not reproducible, so a local checkout could ' +
      'not be verified against what CI graded.',
    );
  }

  return { repository, ref };
}
