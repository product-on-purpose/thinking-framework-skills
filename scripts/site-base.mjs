// site-base.mjs - the single source of truth for the published base path.
//
// The site is served at the root of the custom domain
// https://thinking-framework-skills.productonpurpose.com/, so it is a root deploy
// and the base path is empty. The family Astro site standard (clause 14.7) requires
// this base to be declared ONCE: a wrong base that disagrees between the build and a
// validator passes the check while the live site 404s.
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
export const BASE = '';
