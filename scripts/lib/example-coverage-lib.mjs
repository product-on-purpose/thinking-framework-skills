// =============================================================================
// example-coverage-lib.mjs - the example-coverage ratchet rules, as a pure lib.
//
// what-it-is:   the set arithmetic behind "every NEW shipped skill ships a worked example".
// what-it-does: given shipped slugs, the slugs referenced across the example corpus, and the
//               grandfathered baseline, returns what is uncovered, what FAILS, and what the
//               baseline could shed.
// why:          this is a ratchet, and a ratchet that silently stops ratcheting is worse than
//               no ratchet: it reports OK while the thing it guards rots. Extracting the
//               arithmetic means the failure and advisory paths can be tested directly instead
//               of only ever being exercised by a real tree that happens to be clean.
// used-by:      scripts/check-example-coverage.mjs; tests/example-coverage-lib.test.mjs
// =============================================================================

/**
 * Every `think-<slug>` token referenced in a chunk of example prose.
 *
 * Deliberately loose: a framework link (`frameworks/think-premortem/`) and a prompt invocation
 * (`/think-premortem "..."`) both count, because both are evidence a reader can see the skill
 * worked. Tightening this to link-shapes only would fail the samples corpus, which uses prompts.
 */
export function extractReferencedSlugs(text) {
  const out = new Set();
  for (const m of String(text || '').matchAll(/think-([a-z0-9-]+)/g)) out.add(m[1]);
  return out;
}

/**
 * The ratchet.
 *
 * @param {object} args
 * @param {string[]} args.shipped     registry slugs with status shipped (unprefixed)
 * @param {Set<string>|string[]} args.referenced  slugs seen in the example corpus
 * @param {Set<string>|string[]} args.baseline    grandfathered uncovered slugs
 * @returns {{uncovered: string[], missing: string[], nowCovered: string[], stale: string[]}}
 *   uncovered  - shipped with no example (may be legitimately grandfathered)
 *   missing    - THE FAILURE SET: uncovered and NOT grandfathered, i.e. a new skill with no example
 *   nowCovered - grandfathered but now has an example; the baseline can shrink (advisory)
 *   stale      - in the baseline but no longer shipped; the baseline can shed it (advisory)
 */
export function computeCoverage({ shipped = [], referenced = [], baseline = [] } = {}) {
  const referencedSet = referenced instanceof Set ? referenced : new Set(referenced);
  const baselineSet = baseline instanceof Set ? baseline : new Set(baseline);
  const shippedSet = new Set(shipped);

  const uncovered = shipped.filter((s) => !referencedSet.has(s));
  const missing = uncovered.filter((s) => !baselineSet.has(s));
  const nowCovered = [...baselineSet].filter((s) => shippedSet.has(s) && referencedSet.has(s));
  const stale = [...baselineSet].filter((s) => !shippedSet.has(s));

  return { uncovered, missing, nowCovered, stale };
}
