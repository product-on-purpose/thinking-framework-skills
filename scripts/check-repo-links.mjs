#!/usr/bin/env node
// check-repo-links.mjs - assert every RELATIVE markdown link in the repo-browser docs
// resolves to a real file. The site has its own rendered-link guard; this is its repo-side
// analog (README, AGENTS, INDEX, CHANGELOG, RELEASE-NOTES, docs/**). #anchors are advisory.
// Zero-dependency, UTF-8. check.mjs layer.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, extname, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const EXTERNAL = /^(https?:|mailto:|tel:|ftp:|\/\/|#)/i;

export function findBrokenRepoLinks(fromFileAbs, body, repoRoot) {
  const out = [];
  let inFence = false, fenceChar = '';
  for (const line of body.split('\n')) {
    const f = line.match(/^\s*(```+|~~~+)/);
    if (f) { const c = f[1][0]; if (!inFence) { inFence = true; fenceChar = c; } else if (c === fenceChar) { inFence = false; } continue; }
    if (inFence) continue;
    // Blank out inline code spans so links inside backticks are not scanned.
    // Strip longest balanced backtick runs first, then single-backtick spans.
    // If the result still has unmatched backticks (prose describing fence syntax, etc.)
    // skip the line - these are documentation examples, not real links.
    let stripped = line
      .replace(/```[^`\n]*```/g, (s) => ' '.repeat(s.length))
      .replace(/``[^`\n]*``/g, (s) => ' '.repeat(s.length))
      .replace(/`[^`\n]*`/g, (s) => ' '.repeat(s.length));
    if (stripped.includes('`')) continue; // unmatched backtick: skip this line
    for (const m of stripped.matchAll(/(!?)\[[^\]]*\]\(([^)\s]+)\)/g)) {
      if (m[1] === '!') continue; // skip images
      const raw = m[2];
      if (EXTERNAL.test(raw)) continue;
      const rel = raw.split('#')[0].split('?')[0];
      if (!rel) continue; // pure anchor
      const target = resolve(dirname(fromFileAbs), rel);
      // a link may point at a dir or a file; accept either existing
      const ok = existsSync(target) || existsSync(target + '.md');
      if (!ok) out.push({ href: raw, resolved: relative(repoRoot, target) });
    }
  }
  return out;
}

const TARGETS = ['README.md', 'AGENTS.md', 'INDEX.md', 'CHANGELOG.md', 'RELEASE-NOTES.md'];
function walkDocs(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) walkDocs(full, acc);
    else if (e.isFile() && extname(e.name) === '.md') acc.push(full);
  }
  return acc;
}
// Only run when executed directly (not when imported by tests).
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (isMain) {
  // Only this repo's authored docs: skip generated eval JSON (not .md) and node_modules implicitly.
  const files = [...TARGETS.map((t) => resolve(ROOT, t)).filter((p) => existsSync(p)), ...walkDocs(resolve(ROOT, 'docs'))];
  const findings = [];
  for (const file of files) for (const b of findBrokenRepoLinks(file, readFileSync(file, 'utf8'), ROOT)) findings.push({ file, ...b });
  if (findings.length) {
    for (const f of findings) console.error(`${relative(ROOT, f.file)}: broken relative link "${f.href}" -> ${f.resolved}`);
    console.error(`\ncheck-repo-links: ${findings.length} broken relative link(s).`);
    process.exit(1);
  }
  console.log(`check-repo-links: OK (${files.length} doc(s); all relative links resolve).`);
}
