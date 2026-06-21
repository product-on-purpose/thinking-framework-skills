#!/usr/bin/env node
// check-canonical-links.mjs - fail any committed hand-authored site page whose internal
// link targets a redirect SOURCE (a redirect-hop). Internal links should point at the
// canonical destination, not lean on a compat redirect meant for external bookmarks.
// Reads the single-source redirect map (scripts/site-redirects.mjs). check.mjs layer.
// Zero-dependency, UTF-8.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { REDIRECTS } from './site-redirects.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = resolve(ROOT, 'site', 'src', 'content', 'docs');

// Starlight slug rules: index files map to their dir; a leaf maps to /dir/leaf/;
// frontmatter `slug:` overrides. BASE is '' (root deploy), so paths are root-absolute.
export function servedPath(relFromDocs, frontmatterSlug) {
  if (frontmatterSlug != null) return '/' + frontmatterSlug.replace(/^\/+|\/+$/g, '') + '/';
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

function collect(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) collect(full, acc);
    else if (e.isFile() && ['.md', '.mdx'].includes(extname(e.name))) acc.push(full);
  }
  return acc;
}

// Only run the main scan when invoked directly, not when imported for tests.
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (isMain) {
  // Only scan committed (hand-authored) pages: generated dirs are gitignored and may be absent.
  const GENERATED = new Set(['frameworks', 'families', 'recipes', 'evidence', 'library', 'tools', 'changelog']);
  const findings = [];
  let scanned = 0;
  for (const file of (statSync(DOCS, { throwIfNoEntry: false }) ? collect(DOCS) : [])) {
    const rel = relative(DOCS, file).replace(/\\/g, '/');
    if (GENERATED.has(rel.split('/')[0]) && rel.split('/')[0] !== 'explore') continue; // skip generated trees
    scanned++;
    const text = readFileSync(file, 'utf8');
    for (const hop of findRedirectHopLinks(rel, slugOf(text), text, REDIRECTS)) {
      findings.push({ file, ...hop, canonical: REDIRECTS[hop.redirectSource] });
    }
  }
  if (findings.length) {
    for (const f of findings) console.error(`${f.file}: link "${f.href}" hits redirect source ${f.redirectSource} - point it at the canonical ${f.canonical}`);
    console.error(`\ncheck-canonical-links: ${findings.length} redirect-hop link(s).`);
    process.exit(1);
  }
  console.log(`check-canonical-links: OK (${scanned} hand-authored page(s); no internal link leans on a compat redirect).`);
}
