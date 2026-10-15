// =============================================================================
// manifest-roster-lib.mjs - the local, semantic half of the manifest.generated.json drift guard.
//
// what-it-is:   the rule that the committed manifest.generated.json still describes the tree:
//               library.json's name / version / tier / standard, and every on-disk skill and
//               command with its path, its description and (for a command) its maps-to.
// what-it-does: given the parsed manifest and the roster expected from disk, returns problem
//               strings that name the stale entry and the regenerate command.
// why:          manifest.generated.json was the one committed generated file with no guard
//               (roadmap C1-4, SPEC-06). The toolkit's U8 compares only the name and version of
//               the two NATIVE manifests. The skill-selection eval reads its roster from this
//               file, so a stale description would feed the eval a roster no user has.
// used-by:      scripts/check-registry.mjs (gate layer 3, section 11);
//               tests/manifest-roster-lib.test.mjs
//
// Two halves, by design. CI regenerates with the toolkit's own gen-manifest and diffs the bytes,
// which is authoritative. This half needs no toolkit, so `npm run check:registry` catches the
// common drift (an edited description, an added, renamed or removed skill or command) before a
// push. It compares fields, not bytes, and it only compares a description it can read with
// certainty: a plain one-line scalar, which is how every skill and command here authors one. A
// quoted, folded or multi-line value is skipped rather than guessed at, so this half can never
// red a file the real YAML parser accepts; CI's byte diff covers those. Do not "fix" the
// asymmetry by deleting either half.
// =============================================================================

export const REGENERATE = 'node .agent-skills-toolkit/scripts/generators/gen-manifest.mjs . --write --target=all';

/**
 * A top-level frontmatter value, but only when it is a plain one-line scalar. Returns undefined
 * (meaning "do not compare") for a quoted, block, multi-line or comment-bearing value, and null
 * when the key is absent, matching the generator's `?? null`.
 */
export function plainScalar(fm, key) {
  const lines = String(fm || '').split(/\r?\n/);
  const i = lines.findIndex((l) => l.startsWith(`${key}:`));
  if (i === -1) return null;
  const value = lines[i].slice(key.length + 1).trim();
  const continues = i + 1 < lines.length && /^\s+\S/.test(lines[i + 1]);
  if (!value || continues || /^['"|>]/.test(value) || value.includes(' #')) return undefined;
  return value;
}

/**
 * Compare a parsed manifest.generated.json against the expected roster.
 * expected = { spine: {name, version, tier, standard}, skills: [{name, ...fields}], commands: [...] }.
 * A field whose expected value is undefined is not compared (see plainScalar).
 */
export function checkManifestRoster(manifest, expected) {
  const problems = [];
  const stale = (what) => problems.push(`manifest: ${what} in manifest.generated.json. Regenerate: ${REGENERATE}`);
  for (const [k, want] of Object.entries(expected.spine)) {
    if ((manifest?.[k] ?? null) !== (want ?? null)) {
      stale(`"${k}" is ${JSON.stringify(manifest?.[k] ?? null)} but library.json says ${JSON.stringify(want ?? null)}`);
    }
  }
  for (const kind of ['skills', 'commands']) {
    const have = new Map((manifest?.[kind] ?? []).map((e) => [e?.name, e]));
    const want = new Map(expected[kind].map((e) => [e.name, e]));
    for (const [name, w] of want) {
      const h = have.get(name);
      if (!h) { stale(`${kind} entry "${name}" exists on disk but is not listed`); continue; }
      for (const [field, value] of Object.entries(w)) {
        if (value === undefined) continue;
        if ((h[field] ?? null) !== value) stale(`${kind} entry "${name}" has a stale ${field}`);
      }
    }
    for (const name of have.keys()) {
      if (!want.has(name)) stale(`${kind} entry "${name}" is listed but no longer exists on disk`);
    }
  }
  return problems;
}
