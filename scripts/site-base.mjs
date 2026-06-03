// site-base.mjs - the single source of truth for the published base path.
//
// The site is served at https://product-on-purpose.github.io/thinking-framework-skills,
// so the GitHub Pages project subpath is `/thinking-framework-skills`. The family
// Astro site standard (clause 14.7) requires this base to be declared ONCE: a wrong
// base that disagrees between the build and a validator passes the check while the
// live site 404s.
//
// This module is the one place the literal lives, and it is CONSUMED, not duplicated:
//   - site/astro.config.mjs        -> imports BASE for Starlight's `base`.
//   - scripts/check-rendered-links.mjs -> imports BASE to resolve base-absolute hrefs.
// (pm-skills, the donor of the link validators, keeps a second copy of the literal in
// its astro.config.mjs; importing it here in both places makes this the true single
// source instead - one definition, two consumers, zero drift surface.)
//
// Sanctioned exceptions where the literal legitimately reappears (clause 14.7): the
// test that value-pins the expected base, and public/robots.txt's sitemap URL (Astro
// copies public/ verbatim, so it cannot be templated under Pattern S yet).
//
// When the shared @product-on-purpose/astro-docs-preset lands (decision A-2), `base`
// moves into the preset call and this module is retired; until then it is authoritative.
export const BASE = '/thinking-framework-skills';
