#!/usr/bin/env node
// =============================================================================
// research-appendix.mjs - write the dedup appendix for an external research wave.
//
// what-it-is:   a maintainer tool, not a gate layer. Its output is a working file under the
//               gitignored _local/, regenerated for each wave rather than committed.
// what-it-does: imports frameworks/registry.mjs and writes every evaluated method, grouped by
//               family, with its aliases and its disposition (rules in
//               scripts/lib/research-appendix-lib.mjs). A wave brief is pasted into each deep-
//               research tool with this appendix directly after it. Exits 1 if any method has
//               no family, or if the list does not cover the whole registry.
// why:          see the lib header. The wave-4 brief is
//               docs/internal/research/2026-10-17-wave4-research-brief.md.
// used-by:      npm run research:appendix
//
// Usage: node scripts/research-appendix.mjs [--out <file>]
//        (default out: _local/ingest/<YYYY-MM-DD>_dedup-appendix.md)
// =============================================================================

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { renderAppendix, orphans } from "./lib/research-appendix-lib.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const i = args.indexOf("--out");
const today = new Date().toLocaleDateString("en-CA"); // local YYYY-MM-DD
const outFile = resolve(i >= 0 ? args[i + 1] : join(ROOT, "_local", "ingest", `${today}_dedup-appendix.md`));

const registry = (await import(pathToFileURL(join(ROOT, "frameworks", "registry.mjs")).href)).default;

const lost = orphans(registry);
if (lost.length) {
  console.error(`research-appendix: ${lost.length} methods have no listed family: ${lost.map((f) => f.slug).join(", ")}`);
  process.exit(1);
}

const { markdown, listed } = renderAppendix(registry, today);
if (listed !== registry.frameworks.length) {
  console.error(`research-appendix: listed ${listed} methods, but the registry holds ${registry.frameworks.length}`);
  process.exit(1);
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, markdown);
console.log(`wrote ${outFile}: ${listed} methods listed (registry holds ${registry.frameworks.length})`);
