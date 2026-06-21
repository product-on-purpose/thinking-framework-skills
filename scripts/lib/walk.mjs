// scripts/lib/walk.mjs - shared recursive directory walker (zero-dep). Returns absolute
// file paths under `dir` whose extension is in `exts` (or all files if `exts` omitted),
// skipping node_modules, dotfile entries, and any name in `skipNames`.
import { readdirSync } from 'node:fs';
import { join, extname } from 'node:path';
export function walk(dir, { exts, skipNames = [] } = {}) {
  const out = [];
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name.startsWith('.') || skipNames.includes(e.name)) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full, { exts, skipNames }));
    else if (e.isFile() && (!exts || exts.includes(extname(e.name)))) out.push(full);
  }
  return out;
}
