import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

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
  base: '/thinking-framework-skills',
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
        baseUrl:
          'https://github.com/product-on-purpose/thinking-framework-skills/edit/main/',
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
