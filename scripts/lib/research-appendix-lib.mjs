// =============================================================================
// research-appendix-lib.mjs - render the dedup appendix for an external research wave.
//
// what-it-is:   the pure renderer behind scripts/research-appendix.mjs.
// what-it-does: renderAppendix lists every registry method, grouped by catalog family and
//               sorted by name, with its aliases and its disposition in plain words. A fold
//               names the method it folded into. It returns the markdown and the number of
//               methods listed, so the caller can refuse a list that does not cover the
//               registry.
// why:          the external deep-research tools cannot see the registry. In wave 3 they
//               proposed methods the library already held under another name, because the
//               list they were given had no aliases. The public evaluated.json has dispositions
//               but no aliases either, so this appendix is the copy a wave brief must carry.
// used-by:      scripts/research-appendix.mjs; tests/research-appendix-lib.test.mjs
// =============================================================================

export const DISPOSITION = {
  shipped: "shipped",
  fold: "folded into another method",
  excl: "excluded",
  flag: "documented with caveats, not shipped",
  recipe: "a chain of existing skills",
  pm: "out of scope (product-management domain)",
  cand: "candidate",
  next: "candidate",
};

/** The methods whose family is not in the registry's family list. */
export function orphans(registry) {
  const slugs = new Set(registry.families.map((f) => f.slug));
  return registry.frameworks.filter((f) => !slugs.has(f.family));
}

/**
 * Render the appendix. `registry` is the default export of frameworks/registry.mjs; `date` is
 * the YYYY-MM-DD stamp to print. Returns { markdown, listed }.
 */
export function renderAppendix(registry, date) {
  const all = registry.frameworks;
  const bySlug = new Map(all.map((f) => [f.slug, f]));
  const counts = {};
  for (const f of all) counts[f.status] = (counts[f.status] || 0) + 1;

  const out = [];
  out.push("# Appendix: every method the library has already evaluated");
  out.push("");
  out.push(`Generated ${date} from the library's registry: ${all.length} methods in ${registry.families.length} families.`);
  out.push(`Dispositions: ${Object.entries(counts).map(([s, n]) => `${n} ${DISPOSITION[s] ?? s}`).join(", ")}.`);
  out.push("");
  out.push("Do not propose any method below as new, and do not propose one of its aliases under a new name. Every one has already been researched and given a disposition. If you have new evidence that a disposition is wrong, put it in the output section for re-arguing a disposition, never in the candidate list.");
  out.push("");

  let listed = 0;
  for (const fam of registry.families) {
    const members = all.filter((f) => f.family === fam.slug).sort((a, b) => a.name.localeCompare(b.name));
    if (!members.length) continue;
    out.push(`## ${fam.name} (${members.length})`);
    out.push("");
    for (const f of members) {
      const aliases = (f.aliases || []).filter((a) => a && a.toLowerCase() !== f.name.toLowerCase());
      const aka = aliases.length ? ` (also: ${aliases.join("; ")})` : "";
      const target = f.status === "fold" && f.foldInto ? bySlug.get(f.foldInto) : null;
      const label = target ? `folded into ${target.name}` : (DISPOSITION[f.status] ?? f.status);
      out.push(`- ${f.name}${aka} [${label}]`);
      listed++;
    }
    out.push("");
  }
  return { markdown: out.join("\n"), listed };
}
