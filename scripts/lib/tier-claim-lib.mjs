// =============================================================================
// tier-claim-lib.mjs - keeping the published conformance tier and declared Standard honest.
//
// what-it-is:   the list of every place the conformance tier name, its medal and the declared
//               Standard version are published in prose, plus the matcher that checks them.
// what-it-does: checks each published {tier, medal, standard} claim against library.json's
//               `tier` and `standard`.
// why:          the README's conformance claim is hand-maintained, and it went stale for three
//               minor versions (v0.11.0 to the 2026-08-15 correction) because nothing compared it
//               with a real run. warning-count-lib.mjs closed the NUMBERS half of that claim (the
//               warning total, its breakdown, the post-0.8 subtotal, the 0.13 counterfactual).
//               This lib closes the WORDS half: every sentence that names the tier, its medal or
//               the Standard version must agree with library.json. A tier or Standard change then
//               reds the gate at every stale sentence instead of leaving them behind a green run.
// used-by:      scripts/check-counts.mjs; tests/tier-claim-lib.test.mjs
//
// Why library.json, and not the evaluator's `Tier:` line, is the canonical side: the evaluator
// does not compute a tier. It grades the repo AT the tier library.json declares and prints that
// tier back (measured 2026-10-20 at toolkit 93da438: declaring "convergent" or "universal"
// printed `Tier: convergent` / `Tier: universal`, with the only new error being INDEX.md drift).
// So the gate's 0-error exit is what certifies the declared tier, and comparing the `Tier:` line
// with library.json would assert a tautology. The claim that needs a guard is the prose.
//
// Scope note: like warning-count-lib.mjs, every pattern matches only a PRESENT-TENSE claim.
// Dated records (CHANGELOG entries, the site changelog mirror, release notes) keep their
// original wording and are out of scope.
// =============================================================================

// The toolkit's three tiers and the medal each one is published with (README, "Conformance").
export const TIER_MEDAL = { universal: 'Bronze', convergent: 'Silver', advanced: 'Gold' };

// Every place the CURRENT tier, its medal or the declared Standard is stated. `fields` maps each
// claim kind to its capture group. Patterns are /g so a second stale copy cannot hide behind a
// correct first one.
export const CLAIM_SURFACES = [
  {
    label: 'README tier badge',
    where: 'README.md',
    pattern: /badge\/tier-([a-z]+)%20\(([A-Za-z]+)\)/g,
    fields: { tier: 1, medal: 2 },
  },
  {
    label: 'README conformance anchor',
    where: 'README.md',
    pattern: /#-conformance-what-([a-z]+)-([a-z]+)-tier-means/g,
    fields: { tier: 1, medal: 2 },
  },
  {
    label: 'README conformance heading',
    where: 'README.md',
    pattern: /Conformance: what ([a-z]+) \(([A-Za-z]+)\) tier means/g,
    fields: { tier: 1, medal: 2 },
  },
  {
    label: 'README conformance claim',
    where: 'README.md',
    pattern: /validates at \*\*([a-z]+) \(([A-Za-z]+)\) with 0 errors against Standard ([0-9]+\.[0-9]+)\*\*/g,
    fields: { tier: 1, medal: 2, standard: 3 },
  },
  {
    label: 'README declared-Standard aside',
    where: 'README.md',
    pattern: /`library\.json` sets `"standard": "([0-9]+\.[0-9]+)"`/g,
    fields: { standard: 1 },
  },
  {
    label: 'README project-status conformance row',
    where: 'README.md',
    pattern: /\| \*\*Conformance\*\* \| \[([a-z]+) \(([A-Za-z]+)\)\]\([^)]*\) at Standard ([0-9]+\.[0-9]+)/g,
    fields: { tier: 1, medal: 2, standard: 3 },
  },
  {
    label: 'conformance page title',
    where: 'docs/conformance.md',
    pattern: /^# Conformance: how this plugin reaches ([a-z]+) \(([A-Za-z]+)\) tier/gm,
    fields: { tier: 1, medal: 2 },
  },
  {
    label: 'conformance one-line claim',
    where: 'docs/conformance.md',
    pattern: /\*validates at ([a-z]+) \(([A-Za-z]+)\), 0 errors, against Standard ([0-9]+\.[0-9]+)\.\*/g,
    fields: { tier: 1, medal: 2, standard: 3 },
  },
  {
    label: 'conformance declared-Standard row',
    where: 'docs/conformance.md',
    pattern: /\| \*\*Declared Standard\*\* \|.*Currently `([0-9]+\.[0-9]+)` \|/g,
    fields: { standard: 1 },
  },
  {
    label: 'conformance reproduce block',
    where: 'docs/conformance.md',
    pattern: /Expected: `Tier: ([a-z]+)` with `0 error\(s\)/g,
    fields: { tier: 1 },
  },
  {
    label: 'architecture workflows-mirror note',
    where: 'docs/architecture.md',
    pattern: /and this repo pins ([0-9]+\.[0-9]+), so/g,
    fields: { standard: 1 },
  },
];

/**
 * Check every occurrence of a claim pattern against library.json's tier and Standard.
 * A zero-match is a problem: a reworded surface must not silently leave the gate's coverage.
 *
 * @param {object} args
 * @param {string} args.text      the document
 * @param {object} args.surface   one CLAIM_SURFACES entry
 * @param {{tier: string, standard: string}} args.declared  library.json's values
 * @returns {string[]} problems
 */
export function checkClaimSurface({ text, surface, declared }) {
  const { label, where, pattern, fields } = surface;
  const matches = [...String(text || '').matchAll(pattern)];
  if (!matches.length) {
    return [
      `${label}: expected a match for ${pattern} in ${where}, found none ` +
      '(if you reworded the claim, keep it gate-visible or the check silently stops covering it)',
    ];
  }
  const want = {
    tier: String(declared.tier).toLowerCase(),
    medal: String(TIER_MEDAL[declared.tier] ?? '?').toLowerCase(),
    standard: String(declared.standard),
  };
  const problems = [];
  for (const m of matches) {
    for (const [kind, group] of Object.entries(fields)) {
      const got = kind === 'standard' ? m[group] : String(m[group]).toLowerCase();
      if (got !== want[kind]) {
        const excerpt = String(m[0]).slice(0, 70).replace(/\n/g, ' ');
        const canon = kind === 'medal'
          ? `library.json's tier "${declared.tier}" is medal "${TIER_MEDAL[declared.tier] ?? '?'}"`
          : `library.json declares ${kind} "${declared[kind]}"`;
        problems.push(`${label}: ${where} names ${kind} "${m[group]}", but ${canon} (at "${excerpt}")`);
      }
    }
  }
  return problems;
}
