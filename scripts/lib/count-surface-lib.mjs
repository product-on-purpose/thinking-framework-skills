// =============================================================================
// count-surface-lib.mjs - checking a hand-authored count against a canonical one, as a pure lib.
//
// what-it-is:   the matcher behind check-counts.mjs.
// what-it-does: given a document, a pattern and the canonical number, returns the mismatches.
// why:          two failure modes matter here and only one is obvious. The obvious one is a WRONG
//               number. The subtle one is a MISSING match: if someone rewords "All 63 frameworks,
//               by family" into prose the pattern no longer finds, a naive matcher reports nothing
//               and the surface silently leaves the gate's coverage. That is how docs/README and
//               getting-started drifted to stale counts in the first place. So a zero-match is a
//               problem by default, and opting out has to be explicit.
// used-by:      scripts/check-counts.mjs; tests/count-surface-lib.test.mjs
// =============================================================================

/**
 * Check every occurrence of a count pattern in a document against the canonical value.
 *
 * @param {object} args
 * @param {string} args.text     the document
 * @param {string} args.label    what to call this surface in a message
 * @param {RegExp} args.pattern  must be /g and capture the number
 * @param {number} args.want     the canonical value
 * @param {string} [args.where]  file name, for the message
 * @param {number} [args.group]  capture group holding the number (default 1)
 * @param {boolean} [args.optional]  if true, zero matches is acceptable
 * @returns {string[]} problems
 */
export function checkCountSurface({ text, label, pattern, want, where = 'README.md', group = 1, optional = false }) {
  const problems = [];
  const matches = [...String(text || '').matchAll(pattern)];

  if (!matches.length) {
    if (!optional) {
      problems.push(
        `${label}: expected a match for ${pattern} in ${where}, found none ` +
        '(if you reworded the surface, keep the count phrase gate-visible or the check silently stops covering it)',
      );
    }
    return problems;
  }

  for (const m of matches) {
    const got = Number(m[group]);
    if (got !== want) {
      const excerpt = String(m[0]).slice(0, 60).replace(/\n/g, ' ');
      problems.push(`${label}: ${where} shows ${got}, canonical is ${want} (at "${excerpt}")`);
    }
  }
  return problems;
}
