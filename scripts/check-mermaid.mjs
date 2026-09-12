#!/usr/bin/env node
// =============================================================================
// check-mermaid.mjs - validate every ```mermaid block in the given files/dirs.
//
// what-it-is:   the CLI for the mermaid structural-validity gate (scripts/check.mjs layer 11).
// what-it-does: walks the given file/dir arguments (dirs recurse for .md/.mdx) and structurally
//               lints every fenced ```mermaid block via scripts/lib/mermaid-lint.mjs, printing
//               file:line diagnostics and exiting 1 on any issue.
// why:          an invalid mermaid block (bad diagram type, unbalanced syntax) can break
//               rendering - GitHub-native or astro-mermaid - invisibly until someone views the
//               page; this gate catches it in CI so a broken diagram cannot silently ship.
// used-by:      scripts/check.mjs (gate layer 11, via `npm run check`); .github/workflows/ci.yml
//               and deploy-pages.yml (direct check of generated site content, run from site/)
//
// Usage: node scripts/check-mermaid.mjs <path> [<path>...]   (dirs walked for .md/.mdx)
// Exit 0 = all valid; 1 = one or more issues. Zero-dependency, UTF-8.
// =============================================================================
import { readFileSync, statSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { lintMermaidBlocks } from './lib/mermaid-lint.mjs';
import { walk } from './lib/walk.mjs';

function collect(paths, acc = []) {
  for (const p of paths) {
    let st; try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) {
      acc.push(...walk(p, { exts: ['.md', '.mdx'] }));
    } else if (st.isFile() && ['.md', '.mdx'].includes(extname(p))) {
      acc.push(p);
    }
  }
  return acc;
}
const args = process.argv.slice(2);
if (!args.length) { console.error('check-mermaid: no paths given'); process.exit(2); }
const files = collect(args.map((a) => resolve(a)));
let total = 0;
for (const f of files) {
  for (const x of lintMermaidBlocks(readFileSync(f, 'utf8'))) {
    console.error(`${f}:${x.line}: ${x.message}`);
    total++;
  }
}
if (total) { console.error(`\ncheck-mermaid: ${total} mermaid issue(s).`); process.exit(1); }
console.log(`check-mermaid: OK (${files.length} file(s) scanned, all mermaid blocks valid).`);
