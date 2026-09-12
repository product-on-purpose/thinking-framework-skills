// =============================================================================
// site-base.mjs - the single source of truth for the published base path.
//
// what-it-is:   the one exported constant (BASE) that names the site's deploy base path.
// what-it-does: exports BASE as the empty string, since the site is a root deploy; astro.config
//               and the link guards import it rather than each redeclaring the literal.
// why:          the family Astro site standard (clause 14.7) requires this base be declared
//               ONCE - a base that disagrees between the build and a validator would pass the
//               check while the live site still 404s.
// used-by:      site/astro.config.mjs; scripts/check-canonical-links.mjs;
//               scripts/check-rendered-links.mjs; scripts/gen-site.mjs; scripts/site-redirects.mjs
//
// The site is served at the root of the custom domain
// https://thinking-framework-skills.productonpurpose.com/, so it is a root deploy
// and the base path is empty.
//
// This module is the one place the literal lives, and it is CONSUMED, not duplicated:
//   - site/astro.config.mjs        -> imports BASE for Starlight's `base` (as `BASE || '/'`,
//                                     since Astro expects '/' for a root deploy).
//   - scripts/check-rendered-links.mjs -> imports BASE to resolve base-absolute hrefs.
//
// BASE is concatenated as a STRING PREFIX in its consumers (`${BASE}/path` in the
// astro.config redirect, `BASE + '/'` in the link guard), so the root value is the
// EMPTY STRING, not '/': an empty prefix yields `/path`, whereas '/' would yield `//path`.
//
// Sanctioned exceptions where the literal legitimately reappears (clause 14.7): the
// test that value-pins the expected base, and public/robots.txt's sitemap URL (Astro
// copies public/ verbatim, so it cannot be templated under Pattern S yet).
//
// When the shared @product-on-purpose/astro-docs-preset lands (decision A-2), `base`
// moves into the preset call and this module is retired; until then it is authoritative.
// =============================================================================
export const BASE = '';
