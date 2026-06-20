// scripts/site-redirects.mjs - single source for the site's redirect map (clause 14.7,
// mirroring scripts/site-base.mjs). site/astro.config.mjs and scripts/check-canonical-links.mjs
// both import this, so the compat redirects and the no-redirect-hop guard can never disagree.
// Keys are redirect SOURCE paths (root-absolute, trailing slash); values are destinations.
import { BASE } from './site-base.mjs';

export const REDIRECTS = {
  // The Framework Advisor moved from /frameworks/ to /tools/ (decision A: meta-skills are tools,
  // not graded frameworks). This redirect keeps the old published URL alive so external links and
  // bookmarks survive, and the route-parity guard sees the emitted redirect page as the route
  // staying present. Astro applies `base` to the redirect SOURCE (the emitted page's path) but
  // emits the DESTINATION verbatim. With BASE empty (root), `${BASE}/tools/...` is already the
  // correct root-absolute destination. BASE is the single source (scripts/site-base.mjs), so the
  // redirect cannot drift from the real base.
  '/frameworks/think-framework-advisor/': `${BASE}/tools/think-framework-advisor/`,
  // Cynefin ships as a contested lens under its descriptive name (think-complexity-domain-sort,
  // keeping the trademark out of the invocation per IP-01). Its Framework Library dossier moved
  // from /library/cynefin/ to /library/complexity-domain-sort/; this keeps the old URL alive.
  '/library/cynefin/': `${BASE}/library/complexity-domain-sort/`,
};
