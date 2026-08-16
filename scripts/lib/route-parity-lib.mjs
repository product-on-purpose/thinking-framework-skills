// =============================================================================
// route-parity-lib.mjs - the published-route parity rules, as a pure lib.
//
// what-it-is:   the comparison between a committed route baseline and a freshly built one.
// what-it-does: normalises dist-relative html paths into routes and reports what was removed
//               (a failure: an existing link or bookmark now 404s) and what was added (allowed).
// why:          the asymmetry is the whole design and it is easy to get backwards. REMOVED routes
//               fail; ADDED routes do not, because new pages are expected and forcing a baseline
//               update on every new page would train people to regenerate it reflexively, which
//               is exactly how a removal slips through. Extracting it means that asymmetry has a
//               test instead of living only in a script nobody runs against a dirty tree.
// used-by:      scripts/check-route-parity.mjs; tests/route-parity-lib.test.mjs
// =============================================================================

/**
 * Turn dist-relative file paths into route strings.
 *
 * Routes are dist-relative and do NOT carry the Pages base, which is what makes this guard
 * base-agnostic: only the committed manifest is per-repo. Windows separators are normalised so a
 * baseline generated on one OS compares equal to a build on another.
 */
export function toRoutes(relPaths) {
  return (relPaths || [])
    .filter((p) => String(p).endsWith('.html'))
    .map((p) => '/' + String(p).replace(/\\/g, '/').replace(/^\/+/, ''))
    .sort();
}

/** Parse a committed manifest file's contents into a route list. */
export function parseBaseline(text) {
  return String(text || '')
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Compare a baseline against a current build.
 *
 * @returns {{removed: string[], added: string[]}} removed is the failure set.
 */
export function compareRoutes(baseline, current) {
  const currentSet = new Set(current || []);
  const baselineSet = new Set(baseline || []);
  return {
    removed: (baseline || []).filter((r) => !currentSet.has(r)),
    added: (current || []).filter((r) => !baselineSet.has(r)),
  };
}

/**
 * A built site is never empty. An existing-but-empty dist means the build crashed and emptied
 * outDir, which would otherwise report every baseline route as removed and read as "you deleted
 * the entire site" rather than "the build broke". Distinguished so the message can say which.
 */
export function isEmptyBuild(current) {
  return (current || []).length === 0;
}
