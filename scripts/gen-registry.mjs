#!/usr/bin/env node
// =============================================================================
// gen-registry.mjs - generate the drift-checked views of frameworks/registry.mjs.
//
// One source (frameworks/registry.mjs), two generated views:
//   1. docs/internal/research/framework-catalog.md  - the 11 family tables, spliced
//      between BEGIN/END markers (the hand-authored preamble + postamble are kept).
//   2. site/src/content/docs/about/why-not.md        - the public "what we leave out"
//      index, spliced below a marker (SP9). Only the deliberately-not-shipped set
//      (fold / flag / excl / pm); candidates are "not yet", recipes ship.
//
// Run `node scripts/gen-registry.mjs` to write; `--check` regenerates in memory and
// byte-compares (exit 1 on drift). Zero-dependency, explicit UTF-8, LF newlines - the
// gen-recommendable.mjs convention (Windows cp1252 + autocrlf would otherwise corrupt
// output; .gitattributes pins LF so the byte compare is identical on every platform).
// =============================================================================

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import registry from '../frameworks/registry.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const CHECK = process.argv.includes('--check');

const CATALOG = resolve(ROOT, 'docs', 'internal', 'research', 'framework-catalog.md');
const WHYNOT = resolve(ROOT, 'site', 'src', 'content', 'docs', 'about', 'why-not.md');

const CAT_BEGIN = '<!-- BEGIN GENERATED FRAMEWORK TABLES (scripts/gen-registry.mjs) - do not hand-edit below this line -->';
const CAT_END = '<!-- END GENERATED FRAMEWORK TABLES -->';
const WHYNOT_BEGIN = '<!-- BEGIN GENERATED (scripts/gen-registry.mjs from frameworks/registry.mjs) - do not hand-edit below this line -->';
const WHYNOT_END = '<!-- END GENERATED (scripts/gen-registry.mjs) -->';

const read = (p) => readFileSync(p, 'utf8');

// --- shared lookups ---------------------------------------------------------
const bySlug = new Map(registry.frameworks.map((e) => [e.slug, e]));
const displayName = (slug) => bySlug.get(slug)?.name ?? slug;
const escapePipes = (s) => String(s).replace(/\|/g, '\\|');

// --- view 1: framework-catalog.md family tables -----------------------------
function statusCell(e) {
  const tag = `\`[${e.status}]\``;
  if (e.status === 'fold' && e.foldInto) return `${tag} -> ${escapePipes(displayName(e.foldInto))}`;
  if (e.status === 'recipe') return `${tag} (ships as a workflow)`;
  if (e.branded) return `${tag} (branded)`;
  return tag;
}

function renderCatalogRegion() {
  const L = [];
  registry.families.forEach((fam, i) => {
    const rows = registry.frameworks.filter((e) => e.family === fam.slug);
    L.push(`## ${i + 1}. ${fam.name}`);
    L.push('');
    L.push('| Framework | Mechanism | Tier | Status |');
    L.push('|---|---|---|---|');
    for (const e of rows) {
      L.push(`| ${escapePipes(e.name)} | ${escapePipes(e.oneLine)} | ${e.tier} | ${statusCell(e)} |`);
    }
    L.push('');
  });
  // drop the trailing blank so the splice controls surrounding whitespace
  if (L[L.length - 1] === '') L.pop();
  return L.join('\n');
}

// --- view 2: site/about/why-not.md ------------------------------------------
const WHYNOT_GROUPS = [
  {
    status: 'fold',
    heading: 'Folded into a shipped skill',
    desc: 'The durable cognitive move already ships inside another skill, named descriptively. A second card would add a name, not a capability, so we ship the move and fold the ritual in.',
  },
  {
    status: 'flag',
    heading: 'Documented, not shipped',
    desc: 'Included only with explicit caveats - a trademark, a narrow valid range, or a false-precision warning. The IP gate is open (branded methods are documented with attribution); the evidence and distinctness gates are not, so these stay out of the shippable set.',
  },
  {
    status: 'excl',
    heading: 'Excluded on the merits',
    desc: 'Weak or contradictory evidence, or redundant with a shipped skill. Excluded after honest grading, not for being unfashionable - and we say why.',
  },
  {
    status: 'pm',
    heading: 'Out of scope (a sibling library)',
    desc: 'Sound PM and business-domain methods whose home is pm-skills, not a cross-domain cognitive library.',
  },
];

function whyNotEntryLine(e) {
  let line = `- **${e.name}** - ${e.oneLine}.`;
  // The fold link is valid only because foldInto resolves to a shipped skill (a real
  // think-<slug>/ site route). That invariant is enforced by scripts/check-registry.mjs
  // (foldInto -> shipped) in the required gate, not here.
  if (e.status === 'fold' && e.foldInto) {
    line += ` Folds into [${displayName(e.foldInto)}](../../frameworks/think-${e.foldInto}/).`;
  }
  if (e.branded && e.trademark) {
    line += ` (Branded: ${e.trademark}.)`;
  }
  return line;
}

function renderWhyNotRegion() {
  const L = [];
  // Count shipped contested lenses (status shipped + caveatFirst) so readers understand
  // why some famous methods (SWOT, Five Whys, ...) are absent from the lists below.
  const contestedCount = registry.frameworks.filter((e) => e.status === 'shipped' && e.caveatFirst).length;
  if (contestedCount > 0) {
    L.push(`> **Note:** ${contestedCount} famous-but-weak methods (including SWOT and Five Whys) now ship as contested lenses - caveat-first, explicit-request-only skills. They are not in the lists below; see the [frameworks catalog](../../frameworks/) for their pages.`);
    L.push('');
  }
  for (const g of WHYNOT_GROUPS) {
    const rows = registry.frameworks.filter((e) => e.status === g.status);
    if (!rows.length) continue;
    L.push(`## ${g.heading}`);
    L.push('');
    L.push(g.desc);
    L.push('');
    for (const e of rows) L.push(whyNotEntryLine(e));
    L.push('');
  }
  L.push('Candidates that clear the bar but are not yet built, and methods that ship as a recipe rather than a standalone skill, are catalogued in the Framework Library. The full selection bar, and how to propose a method that clears it, lives in [contributing](../contributing/).');
  return L.join('\n');
}

// --- splice helper ----------------------------------------------------------
// Replace the region between a unique BEGIN/END marker pair. Both views use this
// (symmetric), so hand-authored content above BEGIN and below END is always preserved.
function spliceBetween(text, begin, end, region, file) {
  const i = text.indexOf(begin);
  const j = text.indexOf(end);
  if (i < 0 || j < 0 || j < i) {
    throw new Error(`gen-registry: BEGIN/END markers not found (or out of order) in ${file}.`);
  }
  if (text.indexOf(begin) !== text.lastIndexOf(begin) || text.indexOf(end) !== text.lastIndexOf(end)) {
    throw new Error(`gen-registry: a generation marker appears more than once in ${file}; refusing to splice (would corrupt the file).`);
  }
  return text.slice(0, i + begin.length) + '\n\n' + region + '\n\n' + text.slice(j);
}

// --- run --------------------------------------------------------------------
const catalogOut = spliceBetween(read(CATALOG), CAT_BEGIN, CAT_END, renderCatalogRegion(), 'framework-catalog.md');
const whyNotOut = spliceBetween(read(WHYNOT), WHYNOT_BEGIN, WHYNOT_END, renderWhyNotRegion(), 'why-not.md');

const targets = [
  { path: CATALOG, label: 'docs/internal/research/framework-catalog.md', out: catalogOut },
  { path: WHYNOT, label: 'site/src/content/docs/about/why-not.md', out: whyNotOut },
];

if (CHECK) {
  const stale = targets.filter((t) => read(t.path) !== t.out).map((t) => t.label);
  if (stale.length) {
    console.error(`stale (run: node scripts/gen-registry.mjs):\n  ${stale.join('\n  ')}`);
    process.exit(1);
  }
  console.log('generated registry views are up to date.');
} else {
  for (const t of targets) writeFileSync(t.path, t.out, 'utf8');
  console.log(`wrote:\n  ${targets.map((t) => t.label).join('\n  ')}`);
}
