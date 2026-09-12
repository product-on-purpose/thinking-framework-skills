// =============================================================================
// walk.mjs - shared recursive directory walker (zero-dep).
//
// what-it-is:   the one recursive directory walker shared by every file-scanning check in this
//               repo.
// what-it-does: returns absolute file paths under `dir` whose extension is in `exts` (or all
//               files when `exts` is omitted), skipping node_modules, dotfile entries, and any
//               name listed in `skipNames`.
// why:          keeps node_modules/dotfile skipping and extension filtering identical across
//               every check that walks the tree, instead of each one reimplementing its own
//               recursion with its own edge cases.
// used-by:      scripts/check-canonical-links.mjs; scripts/check-mermaid.mjs; scripts/check-repo-links.mjs;
//               tests/walk.test.mjs
// =============================================================================
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
