# Design spec: serve the docs site from the custom domain `thinking-framework-skills.productonpurpose.com`

- Date: 2026-06-16
- Status: approved (scoped collaboratively), pending implementation plan
- Branch: `chore/custom-domain`
- Author: maintainer + Claude (opus 4.8)

## 1. Context and motivation

The docs site is published by GitHub Pages as a project site at
`https://product-on-purpose.github.io/thinking-framework-skills/`, so it runs
under the project subpath `/thinking-framework-skills`. The maintainer wants it
served from a custom subdomain, `https://thinking-framework-skills.productonpurpose.com/`,
which is root-served (no path segment).

This is a host + base change. A project subpath becomes a root deploy, so three
declared "origin/base" literals move and the generated discovery artifacts
(`catalog.json`, `evaluated.json`, `llms.txt`) must be regenerated because they
bake the absolute origin. The change is mechanical but spans the build config,
the link guard's single source of base, the catalog generator's origin source,
the passthrough `robots.txt`, and a value-pinned test.

## 2. Goals and non-goals

### Goals

- The built site is correct when served at the root of
  `thinking-framework-skills.productonpurpose.com` (all internal links resolve at
  root, not under `/thinking-framework-skills`).
- GitHub Pages serves the custom domain on every deploy without manual
  re-entry, via a committed `site/public/CNAME` that passes through to `dist/`.
- The machine-readable discovery artifacts emit the new absolute origin and pass
  the drift gate (`check.mjs` layer 8).
- All conformance gates stay green: 8-layer `check.mjs`, `npm test` (with the
  base-pinned guard test updated), the rendered-link and route-parity guards on
  the built `dist`, and `recommendable-drift`.
- The base path stays single-sourced (clause 14.7): the literal moves in exactly
  one place (`scripts/site-base.mjs`) plus its sanctioned exceptions (the pinned
  test, `robots.txt`, and the 404 hero links - see decision 7).

### Non-goals (out of scope)

- DNS configuration and the GitHub repo Pages/HTTPS settings. These are external,
  one-time, maintainer-only actions documented in section 6, not repo changes.
- A version bump, tag, GitHub release, or marketplace re-pin. The plugin (the
  `skills/`) is unchanged; `catalog.json` is a site artifact, not part of the
  plugin distribution, so consumers are unaffected. This is a site-config PR.
- Rewriting historical records (`CHANGELOG.md`, `RELEASE-NOTES.md`, prior
  internal specs/plans). Old `github.io` URLs in those auto-redirect to the
  custom domain once it is live; rewriting point-in-time records is noise.
- `llms-full.txt`, analytics, or linking `llms.txt` from `<head>` (separate
  backlog items).

## 3. Design decisions

1. **`BASE = ''` (empty), not `'/'`.** The codebase concatenates `BASE` as a
   string prefix in two places: the advisor redirect destination
   (`${BASE}/tools/think-framework-advisor/`) and the link guard
   (`BASE + '/'`, `urlPath.startsWith(BASE + '/')`). With `BASE = ''` these
   produce correct root paths (`/tools/...`, `/`). With `BASE = '/'` they would
   produce `//tools/...` and `//`. So the single-source literal becomes the empty
   string.
2. **`base: BASE || '/'` in `astro.config.mjs`.** Astro wants `/` for a root
   deploy. The `|| '/'` coerces the empty single-source value to what Astro
   expects, while the raw empty `BASE` keeps the string concatenations correct.
3. **`site/public/CNAME` committed.** Astro copies `public/` verbatim to `dist/`,
   so `dist/CNAME` re-asserts the custom domain on every Actions deploy. This is
   the Astro-documented approach and is what auto-configures GitHub Pages on
   deploy, so the domain cannot silently drop. (Belt-and-suspenders with the
   Settings value.)
4. **`package.json` `homepage` is the origin source of truth.** `gen-catalog.mjs`
   reads `pkg.homepage` (line 98) to stamp absolute catalog URLs; the route paths
   it validates are base-less (`/frameworks/...`). So changing `homepage` to the
   new root origin and regenerating yields correct absolute URLs with no base
   segment. The route-manifest is base-less and does not change.
5. **Prose sweep is a targeted substring replace.** Replace
   `product-on-purpose.github.io/thinking-framework-skills` with
   `thinking-framework-skills.productonpurpose.com` in the public-facing docs
   (`README.md`, `docs/getting-started.md`, `docs/README.md`,
   `docs/architecture.md`, `docs/concepts.md`). The `/frameworks/...` tail is
   identical across the two, so the replacement is correct. The repo edit link
   uses `github.com/product-on-purpose/thinking-framework-skills` (a different
   host) and is intentionally not matched by this substring.
6. **Do NOT touch `editLink.baseUrl`.** It is the GitHub repo edit URL
   (`github.com/.../edit/main/site/`), not the published site domain.
7. **`site/src/content/docs/404.md` is a third base-literal exception** (found by
   the rendered-link guard, not anticipated in the first scope). A 404 is served
   from any path, so its hero action links are hardcoded base-absolute and YAML
   frontmatter cannot read `import.meta.env.BASE_URL`. With the base now empty,
   they become plain root-absolute paths (`/start/getting-started/`, `/frameworks/`,
   `/explore/chooser/`). The guard catches any stale subpath link, which is exactly
   how this surfaced.

## 4. Files changed

| File | Change |
|---|---|
| `site/public/CNAME` (new) | Single line: `thinking-framework-skills.productonpurpose.com` |
| `scripts/site-base.mjs` | `BASE = '/thinking-framework-skills'` -> `BASE = ''`; update the doc comment to describe the root deploy |
| `site/astro.config.mjs` | `site:` -> new domain; `base: BASE` -> `base: BASE || '/'`; update the base/redirect comments |
| `package.json` | `homepage` -> `https://thinking-framework-skills.productonpurpose.com` |
| `site/public/robots.txt` | Sitemap URL -> new domain root |
| `tests/check-rendered-links.test.mjs` | Pinned `BASE = "/thinking-framework-skills"` -> `""`; update the comment that says the value pins the configured base; replace the now-obsolete "missing base" case with a "stale-subpath" case |
| `site/src/content/docs/404.md` | Drop the `/thinking-framework-skills` prefix from the three hero action links (decision 7) |
| `site/public/{catalog.json,evaluated.json,llms.txt}` | Regenerated (origin follows `homepage`) |
| `README.md`, `docs/{getting-started,README,architecture,concepts}.md` | Targeted origin substring replace (decision 5) |

## 5. Verification

- `node scripts/gen-catalog.mjs --check` clean after regen (gate layer 8).
- `npm run build` green (gen-site + astro build), 207 pages.
- `node scripts/check-rendered-links.mjs dist` with `STRICT_ANCHORS=1`: 0 broken.
  This is the load-bearing check for the empty base (it changes the guard's
  internal-vs-external split), so a green run is the proof, not an assumption.
- `node scripts/check-route-parity.mjs dist`: unchanged (route-manifest is
  base-less).
- `node scripts/check.mjs` (8 layers) rc=0; `npm test` green (updated pinned test).
- `node scripts/gen-recommendable.mjs --check` clean (separate CI job).
- Spot-check `site/public/catalog.json`: `site` field and every `url` use the new
  domain with no `/thinking-framework-skills` segment.

## 6. Rollout (external, maintainer-only - the merge is gated on these)

There is no merge ordering that keeps the old `github.io/thinking-framework-skills/`
path working: this build is root-based and only resolves at the new root domain.
The clean cutover:

1. **DNS first.** At the productonpurpose.com DNS provider, add a `CNAME` record:
   host `thinking-framework-skills`, value `product-on-purpose.github.io`. Let it
   propagate. (This alone changes nothing live; GitHub still serves the github.io
   URL until the custom domain is configured.)
2. **Merge this PR.** The deploy publishes `dist/CNAME`, which auto-configures the
   GitHub Pages custom domain. The site goes live at the new root domain; the old
   `github.io` project path auto-redirects to it.
3. **Enforce HTTPS** in repo Settings -> Pages, after the certificate provisions
   (minutes to ~24h). Do not enable it before the cert issues.

Until step 1 is done, do not merge: a root-based build deployed to the github.io
project URL serves under `/thinking-framework-skills/` and every root-absolute
link 404s.
