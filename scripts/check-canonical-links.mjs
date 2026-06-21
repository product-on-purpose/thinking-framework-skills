#!/usr/bin/env node
// check-canonical-links.mjs - fail any committed hand-authored site page whose internal
// link targets a redirect SOURCE (a redirect-hop). Internal links should point at the
// canonical destination, not lean on a compat redirect meant for external bookmarks.
// Reads the single-source redirect map (scripts/site-redirects.mjs). check.mjs layer.
// Also checks absolute links in .astro components and site/intros/ .md files.
// Zero-dependency, UTF-8.
import { readFileSync, statSync } from 'node:fs';
import { extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { REDIRECTS } from './site-redirects.mjs';
import { walk } from './lib/walk.mjs';
import { BASE } from './site-base.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = resolve(ROOT, 'site', 'src', 'content', 'docs');

// Starlight slug rules: index files map to their dir; a leaf maps to /dir/leaf/;
// frontmatter `slug:` overrides. BASE is '' (root deploy), so paths are root-absolute.
export function servedPath(relFromDocs, frontmatterSlug) {
  if (frontmatterSlug != null && frontmatterSlug.trim() !== '') return '/' + frontmatterSlug.replace(/^\/+|\/+$/g, '') + '/';
  let p = relFromDocs.replace(/\\/g, '/').replace(/\.(md|mdx)$/i, '');
  p = p.replace(/(^|\/)index$/, '$1').replace(/\/+$/, '');
  return p === '' ? '/' : '/' + p + '/';
}

const EXTERNAL = /^(https?:|mailto:|tel:|ftp:|\/\/|#)/i;
const slugOf = (text) => { const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/); if (!m) return null; const s = m[1].match(/^slug:\s*(.+)$/m); return s ? s[1].trim().replace(/^["']|["']$/g, '') : null; };

// Return [{ href, resolved, redirectSource }] for links that resolve to a redirect source.
export function findRedirectHopLinks(relFromDocs, frontmatterSlug, body, redirects) {
  const pageUrl = servedPath(relFromDocs, frontmatterSlug);
  const sources = new Set(Object.keys(redirects));
  const hops = [];

  // Shared resolution helper: checks one raw link target and pushes to hops if it hits a source.
  function check(raw) {
    if (EXTERNAL.test(raw)) return;
    let resolved;
    try { resolved = new URL(raw.split('#')[0].split('?')[0], 'https://x' + pageUrl).pathname; } catch { return; }
    if (!resolved.endsWith('/')) resolved += '/';
    if (sources.has(resolved)) hops.push({ href: raw, resolved, redirectSource: resolved });
  }

  // Markdown links: [text](target) - skip images where group 1 is '!'
  for (const m of body.matchAll(/(!?)\[[^\]]*\]\(([^)\s]+)\)/g)) {
    if (m[1] === '!') continue;
    check(m[2]);
  }

  // JSX/HTML href attributes: href="..." or href='...'
  for (const m of body.matchAll(/\bhref=["']([^"']+)["']/g)) {
    check(m[1]);
  }

  return hops;
}

// For non-page files (components, gen-site intro sources): no served URL, so only absolute
// links are checkable. Strip a leading base-var expression and the BASE prefix; if the result
// is a root-absolute path matching a redirect SOURCE, it is a hop. Relative links here are
// page-depth-ambiguous and intentionally out of scope (documented).
export function findAbsoluteRedirectHops(body, redirects) {
  const sources = new Set(Object.keys(redirects));
  const hops = [];
  const check = (raw) => {
    let t = raw.trim()
      .replace(/^\$\{\s*base\s*\}/i, '')
      .replace(/^\$\{\s*import\.meta\.env\.BASE_URL\s*\}/i, '')
      .replace(/^\{\s*import\.meta\.env\.BASE_URL\s*\}/i, '');
    if (BASE && t.startsWith(BASE)) t = t.slice(BASE.length);
    if (!t.startsWith('/')) return;
    const p = (t.split('#')[0].split('?')[0]);
    const norm = p.endsWith('/') ? p : p + '/';
    if (sources.has(norm)) hops.push({ href: raw, resolved: norm, redirectSource: norm });
  };
  for (const m of body.matchAll(/(!?)\[[^\]]*\]\(([^)\s]+)\)/g)) if (m[1] !== '!') check(m[2]);
  for (const m of body.matchAll(/\bhref=["']([^"']+)["']/g)) check(m[1]);
  for (const m of body.matchAll(/\bhref=\{`([^`]+)`\}/g)) check(m[1]); // JSX href={`${base}/...`}
  return hops;
}

// Only run the main scan when invoked directly, not when imported for tests.
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (isMain) {
  // Only scan committed (hand-authored) pages: generated dirs are gitignored and may be absent.
  const GENERATED = new Set(['frameworks', 'families', 'recipes', 'evidence', 'library', 'tools', 'changelog']);
  const findings = [];
  let scanned = 0;
  const docsFiles = statSync(DOCS, { throwIfNoEntry: false }) ? walk(DOCS, { exts: ['.md', '.mdx'] }) : [];
  for (const file of docsFiles) {
    const rel = relative(DOCS, file).replace(/\\/g, '/');
    if (GENERATED.has(rel.split('/')[0]) && rel.split('/')[0] !== 'explore') continue; // skip generated trees
    scanned++;
    const text = readFileSync(file, 'utf8');
    for (const hop of findRedirectHopLinks(rel, slugOf(text), text, REDIRECTS)) {
      findings.push({ file, ...hop, canonical: REDIRECTS[hop.redirectSource] });
    }
  }

  // Also check absolute links in .astro components and site/intros/ .md files.
  const COMPONENTS = resolve(ROOT, 'site', 'src', 'components');
  const INTROS = resolve(ROOT, 'site', 'intros');
  const astroFiles = statSync(COMPONENTS, { throwIfNoEntry: false }) ? walk(COMPONENTS, { exts: ['.astro'] }) : [];
  const introFiles = statSync(INTROS, { throwIfNoEntry: false }) ? walk(INTROS, { exts: ['.md'] }) : [];
  const nonPageFiles = [...astroFiles, ...introFiles];
  for (const file of nonPageFiles) {
    const text = readFileSync(file, 'utf8');
    for (const hop of findAbsoluteRedirectHops(text, REDIRECTS)) {
      findings.push({ file, ...hop, canonical: REDIRECTS[hop.redirectSource] });
    }
  }

  if (findings.length) {
    for (const f of findings) console.error(`${f.file}: link "${f.href}" hits redirect source ${f.redirectSource} - point it at the canonical ${f.canonical}`);
    console.error(`\ncheck-canonical-links: ${findings.length} redirect-hop link(s).`);
    process.exit(1);
  }
  console.log(`check-canonical-links: OK (${scanned} hand-authored page(s) + ${astroFiles.length} .astro + ${introFiles.length} intros; no internal link leans on a compat redirect).`);
}
