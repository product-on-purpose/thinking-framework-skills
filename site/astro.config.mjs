import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
// Base path single source (clause 14.7): the literal lives only in scripts/site-base.mjs,
// consumed here and by scripts/check-rendered-links.mjs so the build and the link guard
// can never disagree (a wrong base passes the check while the live site 404s).
import { BASE } from '../scripts/site-base.mjs';

// Stack mirrors the proven pm-skills site (Astro + Starlight + astro-mermaid,
// deployed to GitHub Pages). The site is a GENERATED VIEW of the skills library:
// scripts/gen-site.mjs reads library.json + each skill's files and emits the
// content under src/content/docs/{frameworks,families,recipes,evidence}. Do not
// hand-edit generated pages; edit the skill and regenerate (npm run gen).

// Google Analytics (GA4) is injected only when PUBLIC_GA_ID is set (at go-public),
// so local and CI builds emit no tracking. Set it in the deploy environment, e.g.
// PUBLIC_GA_ID=G-XXXXXXXXXX. A consent banner is a follow-up if the audience needs it.
const GA_ID = process.env.PUBLIC_GA_ID;
const gaHead = GA_ID
  ? [
      { tag: 'script', attrs: { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}` } },
      {
        tag: 'script',
        content: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
      },
    ]
  : [];

export default defineConfig({
  site: 'https://product-on-purpose.github.io',
  base: BASE,
  // The Framework Advisor moved from /frameworks/ to /tools/ (decision A: meta-skills are tools,
  // not graded frameworks). This redirect keeps the old published URL alive so external links and
  // bookmarks survive, and the route-parity guard sees the emitted redirect page as the route
  // staying present. Astro applies `base` to the redirect SOURCE (the emitted page's path) but
  // emits the DESTINATION verbatim, so the destination must carry BASE explicitly - verified
  // against the built dist, where a base-less destination resolved outside the Pages subpath. BASE
  // is the single source (scripts/site-base.mjs), so the redirect cannot drift from the real base.
  redirects: {
    '/frameworks/think-framework-advisor/': `${BASE}/tools/think-framework-advisor/`,
  },
  integrations: [
    // astro-mermaid MUST come before starlight (integration-order rule).
    // Client-side render; only loads the mermaid bundle on pages with diagrams.
    mermaid({
      theme: 'default',
      autoTheme: true,
      mermaidConfig: {
        themeVariables: {
          lineColor: '#5C7CFA',
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
          fontSize: '14px',
        },
      },
    }),
    starlight({
      title: 'Thinking Framework Skills',
      description:
        'An evidence-graded library of agent-executable thinking-method skills. Each skill is reduced to its working mechanism, graded honestly on how strong its evidence is, and produces a concrete artifact.',
      editLink: {
        // Content lives at site/src/content/docs/. Starlight builds the edit URL as
        // baseUrl + the file path relative to the Astro project root (site/), so the
        // baseUrl carries the /site/ segment to reach the real repo path. Hand-authored
        // pages resolve to a real source file; generated pages (gitignored, rebuilt)
        // point at their on-disk path - edit the skill/recipe/intro and regenerate.
        baseUrl:
          'https://github.com/product-on-purpose/thinking-framework-skills/edit/main/site/',
      },
      customCss: ['./src/styles/custom.css'],
      head: gaHead,
      // Footer override adds the library version label. (starlight-versions, the
      // full multi-version archive plugin, is deferred: it requires at least one
      // archived snapshot, which would freeze the generated docs into a committed
      // second store. Adopt it at v0.2 when there is a real prior version.)
      components: { Footer: './src/components/SiteFooter.astro' },
      sidebar: [
        {
          label: 'Start here',
          items: [
            'start/getting-started',
            'start/evidence-model',
            'start/how-to-read-a-page',
          ],
        },
        {
          label: 'Learn',
          items: [{ autogenerate: { directory: 'learn' } }],
        },
        {
          label: 'Explore',
          items: [{ autogenerate: { directory: 'explore' } }],
        },
        {
          label: 'Frameworks (by name)',
          items: [{ autogenerate: { directory: 'frameworks' } }],
        },
        {
          label: 'Framework Library',
          items: [{ autogenerate: { directory: 'library' } }],
        },
        {
          // Meta-skills (routers/applicators), kept distinct from the graded frameworks (decision A).
          label: 'Tools',
          items: [{ autogenerate: { directory: 'tools' } }],
        },
        {
          label: 'Domains',
          items: [{ autogenerate: { directory: 'families' } }],
        },
        {
          label: 'Recipes',
          items: [{ autogenerate: { directory: 'recipes' } }],
        },
        {
          label: 'Evidence',
          items: [{ autogenerate: { directory: 'evidence' } }],
        },
        {
          label: 'About',
          items: [{ autogenerate: { directory: 'about' } }],
        },
      ],

    }),
  ],
});
