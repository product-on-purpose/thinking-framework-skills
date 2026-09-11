// selection-lib.mjs - pure helpers for the SKILL-SELECTION eval, the sibling of the
// framework-routing TRIGGER eval.
//
// The two evals answer different questions and the difference is the whole point:
//
//   framework routing  - "which of the 63 shipped FRAMEWORKS fits this situation?"
//                        corpus: skills/think-framework-advisor/references/recommendable.json
//   skill selection    - "which of the INSTALLED skills/commands does an agent invoke?"
//                        corpus: manifest.generated.json (what an installer actually loads)
//
// The first cannot measure the four meta-skills: they are deliberately absent from the
// advisor's own corpus of things to recommend, so a router reading it can never return
// `framework-advisor` as a pick. That is not a bug in the corpus - it is the wrong
// instrument for the question. This lib builds the right one.
//
// Two invariants this file exists to hold:
//   1. A roster entry carries ONLY name + description (what an agent actually sees).
//      Leaking anti_triggers / not_use / overlaps would quietly turn this back into the
//      framework eval.
//   2. Commands are kind-qualified (`command:<slug>`) so a command pick is a distinct
//      string from a skill pick. That is what makes guardrail-6 interference measurable
//      without touching the scorer, which compares picks by strict equality.
//
// Sibling to cases-lib.mjs / score-lib.mjs: pure, no fs, no process exit. Callers own IO.

const COMMAND_PREFIX = 'command:';

const stripThink = (name) => String(name).replace(/^think-/, '');

// Build the roster an agent actually sees from the generated plugin manifest.
// Returns { entries, slugs, collisions, counts, problems }.
//   entry: { id, slug, kind: 'skill'|'command', name, description }
//   id: the bare slug for a skill, `command:<slug>` for a command.
export function buildRoster(manifest) {
  const problems = [];
  const entries = [];
  const skillSlugs = new Set();
  const commandSlugs = new Set();

  const take = (raw, kind) => {
    const list = Array.isArray(raw) ? raw : [];
    for (const item of list) {
      const name = item && item.name;
      if (!name) { problems.push(`${kind} entry has no name`); continue; }
      const slug = stripThink(name);
      const description = item.description;
      if (!description || !String(description).trim()) {
        problems.push(`${name}: no description - an agent would see a nameless tool`);
      }
      (kind === 'skill' ? skillSlugs : commandSlugs).add(slug);
      entries.push({
        id: kind === 'command' ? COMMAND_PREFIX + slug : slug,
        slug,
        kind,
        name,
        description: description ? String(description) : '',
      });
    }
  };
  take(manifest && manifest.skills, 'skill');
  take(manifest && manifest.commands, 'command');

  // A name that ships as BOTH a skill and a command is the same capability reached two
  // ways (the command is the runnable wrapper). Everything else in commands/ maps to a
  // recipe chain, which is genuinely a different surface from any single skill.
  const collisions = [...commandSlugs].filter((s) => skillSlugs.has(s)).sort();

  return {
    entries,
    slugs: new Set(entries.map((e) => e.id)),
    collisions,
    counts: { skills: skillSlugs.size, commands: commandSlugs.size, total: entries.length },
    problems,
  };
}

// Resolve the expected route for an anti-case that names an alternative tool in its prose.
//
// This is the parameterized form of the single line in extract-cases.mjs that made five
// meta-skill anti-cases unscoreable: the alternative was named plainly in the text but
// absent from the corpus being searched, so it silently degraded to 'none'. Same rule,
// different corpus.
export function resolveExpected(named, source, corpus) {
  if (!named) return 'none';
  if (named === source) return 'none';
  const has = corpus instanceof Set ? corpus.has(named) : Array.isArray(corpus) && corpus.includes(named);
  return has ? named : 'none';
}

// Collapse a routed pick onto the skill it is indistinguishable from.
// ONLY applies to a genuine skill/command name collision - normalizing every command
// would erase the exact signal guardrail 6 asks about.
export function normalizeRouted(routedId, collisionSet) {
  if (typeof routedId !== 'string' || !routedId.startsWith(COMMAND_PREFIX)) {
    return { id: routedId, normalized: false };
  }
  const slug = routedId.slice(COMMAND_PREFIX.length);
  const collides = collisionSet instanceof Set ? collisionSet.has(slug) : Array.isArray(collisionSet) && collisionSet.includes(slug);
  return collides ? { id: slug, normalized: true } : { id: routedId, normalized: false };
}

// The guardrail-6 number: how often an always-loaded COMMAND took the top pick on a case
// that a skill authored. Gate cases are excluded because they are excluded from scoring
// entirely - counting their picks would report a number over a denominator the scorecard
// never shows.
export function tallyCommandPicks(cases, routes, collisionSet) {
  const byId = new Map((routes || []).map((r) => [r.id, r]));
  const out = { onTrigger: 0, onAnti: 0, total: 0, normalized: 0, examples: [] };
  for (const c of cases || []) {
    if (c.type === 'gate') continue;
    const r = byId.get(c.id);
    if (!r) continue;
    const { id, normalized } = normalizeRouted(r.top1, collisionSet);
    if (normalized) out.normalized++;
    if (typeof id !== 'string' || !id.startsWith(COMMAND_PREFIX)) continue;
    if (c.type === 'trigger') out.onTrigger++; else out.onAnti++;
    out.total++;
    out.examples.push({ id: c.id, type: c.type, want: c.expected, got: id });
  }
  return out;
}

export { COMMAND_PREFIX };
