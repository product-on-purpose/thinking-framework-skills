// registry-entry-lib.mjs - pure, zero-dependency single-entry validation of a framework
// registry entry against frameworks/registry.schema.json.
//
// Extracted from scripts/check-registry.mjs (the per-entry schema loop) so the SAME rules are
// reused by (a) the full-registry CI pass and (b) scripts/check-proposed-entry.mjs, the SP5 C3
// gate that validates a freshly-drafted entry BEFORE it is shown to a human. Sibling to
// cases-lib.mjs, the established shared-validator precedent. The JSON Schema stays the single
// source of truth: enums, required, types, and minLength are read from it, never re-declared.
//
// SCOPE: single-object schema conformance only - required fields, no unknown keys, enums, types
// plus non-empty minLength strings, slug kebab shape, evalDate ISO, the nested shape of sources[]
// and aliases[] items, and the schema conditionals (status/verdict fold -> foldInto, shipped ->
// evalCases, branded -> attribution + trademark). It deliberately omits the stricter source-url
// http shape and all cross-entry / filesystem invariants (slug uniqueness, foldInto resolves to a
// shipped slug, family in the list, dossier/skill existence) - those need the full registry and run
// only in scripts/check-registry.mjs.

// Validate ONE entry object against the registry schema. Returns string[] of problems
// ([] = valid). Pure: no module state, no fs, no process side effects. `schema` is the parsed
// frameworks/registry.schema.json (the caller loads it once and passes it in).
export function validateEntry(e, schema) {
  const problems = [];
  const fail = (m) => problems.push(m);

  const entrySchema = schema.definitions.entry;
  const entryProps = entrySchema.properties;
  const allowedKeys = new Set(Object.keys(entryProps));
  const enumOf = (k) => entryProps[k]?.enum ?? null;

  if (typeof e !== 'object' || e === null || Array.isArray(e)) {
    return [`schema: entry ${JSON.stringify(e)} is not a JSON object.`];
  }

  const at = e.slug ? `entry "${e.slug}"` : `entry ${JSON.stringify(e.name ?? e)}`;
  // required
  for (const req of entrySchema.required) {
    if (e[req] === undefined || e[req] === null || e[req] === '') fail(`schema: ${at} missing required field "${req}".`);
  }
  // unknown keys (additionalProperties: false)
  for (const k of Object.keys(e)) {
    if (!allowedKeys.has(k)) fail(`schema: ${at} has unknown field "${k}".`);
  }
  // enums
  for (const k of ['family', 'tier', 'status', 'verdict', 'posture', 'recommendationPolicy']) {
    const allowed = enumOf(k);
    if (allowed && e[k] !== undefined && !allowed.includes(e[k])) {
      fail(`schema: ${at} field "${k}" = ${JSON.stringify(e[k])} is not one of ${allowed.join('/')}.`);
    }
  }
  // types (schema-driven: string / boolean / array) + non-empty for minLength strings
  for (const k of Object.keys(e)) {
    const t = entryProps[k]?.type;
    if (!t) continue; // unknown key already flagged above
    if (t === 'string' && typeof e[k] !== 'string') fail(`schema: ${at} field "${k}" must be a string.`);
    else if (t === 'boolean' && typeof e[k] !== 'boolean') fail(`schema: ${at} field "${k}" must be a boolean.`);
    else if (t === 'array' && !Array.isArray(e[k])) fail(`schema: ${at} field "${k}" must be an array.`);
    if (t === 'string' && typeof e[k] === 'string' && entryProps[k].minLength && e[k].length < entryProps[k].minLength) {
      fail(`schema: ${at} field "${k}" must be non-empty.`);
    }
  }
  // slug shape (uniqueness is cross-entry; omitted here)
  if (e.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.slug)) fail(`schema: ${at} slug is not kebab-case.`);
  if (e.evalDate !== undefined && !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(e.evalDate)) {
    fail(`schema: ${at} evalDate must be an ISO date (got ${JSON.stringify(e.evalDate)}).`);
  }
  // nested array items (schema-faithful: sources items are objects {title, url, kind?} with a
  // non-empty title + url and no unknown keys; aliases items are non-empty strings). The stricter
  // source-url http shape stays in check-registry.mjs.
  if (Array.isArray(e.sources)) {
    for (const s of e.sources) {
      if (typeof s !== 'object' || s === null || Array.isArray(s)) { fail(`schema: ${at} has a non-object source.`); continue; }
      for (const k of Object.keys(s)) if (!['title', 'url', 'kind'].includes(k)) fail(`schema: ${at} source has unknown field "${k}".`);
      if (typeof s.title !== 'string' || !s.title) fail(`schema: ${at} source is missing a non-empty title.`);
      if (typeof s.url !== 'string' || !s.url) fail(`schema: ${at} source is missing a non-empty url.`);
    }
  }
  if (Array.isArray(e.aliases)) {
    for (const a of e.aliases) {
      if (typeof a !== 'string' || !a) fail(`schema: ${at} has an empty or non-string alias.`);
    }
  }
  // conditionals (mirror registry.schema.json allOf)
  if ((e.status === 'fold' || e.verdict === 'fold') && !e.foldInto) fail(`schema: ${at} is a fold but has no foldInto.`);
  if (e.status === 'shipped' && !e.evalCases) fail(`schema: ${at} is shipped but has no evalCases.`);
  if (e.branded === true) {
    if (!e.attribution) fail(`schema/IP: ${at} is branded but has no attribution.`);
    if (!e.trademark) fail(`schema/IP: ${at} is branded but has no trademark.`);
  }
  if (e.caveatFirst === true) {
    if (!e.posture) fail(`schema: ${at} is caveatFirst but has no posture.`);
    if (!e.recommendationPolicy) fail(`schema: ${at} is caveatFirst but has no recommendationPolicy.`);
    if (!e.evalCases) fail(`schema: ${at} is caveatFirst but has no evalCases.`);
  }
  return problems;
}
