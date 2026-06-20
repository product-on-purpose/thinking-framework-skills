#!/usr/bin/env node
// check-mermaid.mjs - validate every ```mermaid block in the given files/dirs.
// Usage: node scripts/check-mermaid.mjs <path> [<path>...]   (dirs walked for .md/.mdx)
// Exit 0 = all valid; 1 = one or more issues. Zero-dependency, UTF-8.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, resolve } from 'node:path';
import { lintMermaidBlocks } from './lib/mermaid-lint.mjs';

function collect(paths, acc = []) {
  for (const p of paths) {
    let st; try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) {
      for (const e of readdirSync(p, { withFileTypes: true })) {
        if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
        const full = join(p, e.name);
        if (e.isDirectory()) collect([full], acc);
        else if (e.isFile() && ['.md', '.mdx'].includes(extname(e.name))) acc.push(full);
      }
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
