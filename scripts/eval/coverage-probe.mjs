#!/usr/bin/env node
// =============================================================================
// coverage-probe.mjs - what catalog text actually reached each agent, read from its transcript.
//
// what-it-is:   a maintainer tool for checking an eval run's instrument, not a gate layer. Decision 4
//               of docs/internal/experiments/2026-11-06-clean-router-run.md (decided 2026-11-11).
// what-it-does: reads Claude Code transcripts (.jsonl), one agent per file, and reports for each agent
//               how many catalog names, description openings and anti-trigger tails reached it through
//               tool results, which tools it used to read, and which model ran it. Given the blind
//               file, it also reports which of the agent's assigned prompts reached it. Exports the
//               pieces so tests can assert on them without a transcript on disk.
// why:          asking an agent to read a file is not the same as the file reaching it. The catalog is
//               larger than Read's default result, and on 2026-10-20 the median router saw 36% of the
//               anti-trigger lines the eval assumed it had read. Only the transcript shows that.
// used-by:      run manually per scripts/eval/README.md; tests/coverage-probe.test.mjs
// =============================================================================
//
// The method, from the "Method and limits" section of the 2026-11-06 record:
// - Text counts as seen when its own words reached the agent in a tool_result, in any format. Only
//   user and assistant records count, because api-request-blob records replay the same content.
//   Text the agent wrote itself, such as a Grep pattern, is not seen.
// - A description is probed by its first 40 characters, stopping early at a quote, backslash or
//   newline so that quoting cannot hide it. The raw and the JSON-escaped forms both match.
// - An anti-trigger line is probed by its parenthetical tail, never its opening. The opening is the
//   case's prompt, which is also in the blind file, so an opening probe credits an agent for lines it
//   never saw. That was the first-pass error on 2026-11-06.
// - A prompt counts only when its id and its opening both reached the agent. On 2026-11-06 a router
//   grepped prompts without their ids, so an id-only or prompt-only test misreports it.
//
// Limits: it shows what reached an agent, not what the agent weighed. It counts tool results only, so
// text that arrives another way, such as an installed plugin's skill list in the session context, is
// not counted (the 2026-11-09 D3 record found that channel names every skill). A probe can miss text a
// script reformatted. Run it against the catalog the run used: an older run's catalog may be gone.
//
// Usage:
//   node scripts/eval/coverage-probe.mjs [--catalog <recommendable.json>] [--blind <blind.json>]
//        [--json <out.json>] <transcript.jsonl | folder> [...]
// A folder contributes its agent-*.jsonl files, or every .jsonl file directly inside it when it has none.

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { resolve, join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const MIN_PROBE = 12;

/** The text of a tool_result's content, which is a string or a list of parts. */
export function textOf(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) return content.map((p) => (typeof p === 'string' ? p : p?.text ?? '')).join('\n');
  return '';
}

/** The opening of a string up to n characters, stopping at a quote, backslash or newline. Null when too short to be unique. */
export function opening(s, n) {
  const m = String(s ?? '').match(/^[^"\\\n]*/)[0].slice(0, n);
  return m.length >= MIN_PROBE ? m : null;
}

/** True when the needle reached the text raw or JSON-escaped. */
export function has(text, needle) {
  return text.includes(needle) || text.includes(JSON.stringify(needle).slice(1, -1));
}

/** The tail of an anti-trigger line: the text after the prompt's closing quote and opening parenthesis. */
export function antiTail(line) {
  const i = String(line).lastIndexOf('" (');
  return i < 0 ? null : opening(String(line).slice(i + 2), 30);
}

/** The probes for one catalog: entry names, description openings and anti-trigger tails. */
export function catalogProbes(catalog) {
  const list = !catalog ? [] : Array.isArray(catalog) ? catalog
    : catalog.skills || catalog.frameworks || Object.values(catalog).find(Array.isArray) || [];
  const names = list.map((e) => e.name).filter(Boolean);
  const desc = list.map((e) => ({ name: e.name, probe: opening(e.description, 40) }));
  const anti = list.flatMap((e) => (e.anti_triggers || []).map((line) => ({ name: e.name, probe: antiTail(line) })));
  return { entries: list.length, names, desc, anti };
}

/** How a tool call read, in the categories the records report. */
export function toolKey(use) {
  const input = use.input || {};
  if (use.name === 'Read') return input.allow_large ? 'Read(large)' : input.offset || input.limit ? 'Read(page)' : 'Read';
  return use.name;
}

/** One transcript's tool-result text, tool use, models and the text of its user messages. Ignores every record that is not user or assistant. */
export function readTranscript(raw) {
  let seen = '';
  let userText = '';
  let firstTimestamp = null;
  const tools = {};
  const models = new Set();
  for (const line of String(raw).split('\n')) {
    if (!line.trim()) continue;
    let rec;
    try { rec = JSON.parse(line); } catch { continue; }
    if (rec.type !== 'user' && rec.type !== 'assistant') continue;
    firstTimestamp ??= rec.timestamp ?? null;
    const m = rec.message;
    if (rec.type === 'assistant' && m?.model && !m.model.startsWith('<')) models.add(m.model);
    // A workflow can relay the user's request before the task, so the task is not always the first message.
    if (rec.type === 'user') {
      const t = typeof m?.content === 'string' ? m.content : Array.isArray(m?.content) ? m.content.filter((p) => p.type === 'text').map((p) => p.text).join('\n') : '';
      if (t) userText += `\n${t}`;
    }
    if (!Array.isArray(m?.content)) continue;
    for (const p of m.content) {
      if (p.type === 'tool_use' && p.name !== 'StructuredOutput') {
        const key = toolKey(p);
        tools[key] = (tools[key] || 0) + 1;
      }
      if (p.type === 'tool_result') seen += `\n${textOf(p.content)}`;
    }
  }
  return { seen, tools, models: [...models], userText, firstTimestamp };
}

/** The ids a router prompt assigns: "one of c1, c5, c9" or "c1 through c9". Null when the prompt names none. */
export function assignedIds(prompt) {
  const m = String(prompt ?? '').match(/Process ONLY the situations whose id is (?:one of ((?:c\d+(?:, )?)+)|c(\d+) through c(\d+))/);
  if (!m) return null;
  if (m[1]) return m[1].split(',').map((s) => s.trim()).filter(Boolean);
  const out = [];
  for (let i = Number(m[2]); i <= Number(m[3]); i++) out.push(`c${i}`);
  return out;
}

/** The ids whose id token and prompt opening did not both reach the agent. */
export function unseenPrompts(seen, ids, promptById) {
  return ids.filter((id) => {
    const hasId = new RegExp(`\\b${id}\\b`).test(seen);
    const open = opening(promptById.get(id) ?? '', 30);
    // A prompt too short for a unique opening is judged by its id alone.
    return !(hasId && (open ? has(seen, open) : true));
  });
}

/** Coverage of one agent's seen text against the catalog probes, plus prompts when ids and a blind file are given. */
export function coverage(seen, probes, { ids = null, promptById = null } = {}) {
  const count = (items) => {
    const usable = items.filter((x) => x.probe);
    const hit = usable.filter((x) => has(seen, x.probe));
    return { seen: hit.length, probed: usable.length, of: items.length, missing: usable.filter((x) => !hit.includes(x)).map((x) => x.name) };
  };
  const nameHits = probes.names.filter((n) => seen.includes(n));
  const out = {
    names: { seen: nameHits.length, probed: probes.names.length, of: probes.names.length },
    descriptions: count(probes.desc),
    antiTriggers: count(probes.anti),
    prompts: null,
  };
  if (ids && promptById) {
    const missing = unseenPrompts(seen, ids, promptById);
    out.prompts = { seen: ids.length - missing.length, of: ids.length, missing };
  }
  return out;
}

const share = (c) => (c && c.probed ? c.seen / c.probed : null);

/** Per-measure summary across agents: how many saw every probe, the lowest share and the median share. */
export function summarize(rows) {
  const out = {};
  for (const key of ['names', 'descriptions', 'antiTriggers', 'prompts']) {
    const shares = rows.map((r) => (key === 'prompts' ? (r.coverage.prompts ? r.coverage.prompts.seen / (r.coverage.prompts.of || 1) : null) : share(r.coverage[key]))).filter((x) => x !== null);
    if (!shares.length) continue;
    const sorted = [...shares].sort((a, b) => a - b);
    out[key] = { agents: shares.length, all: shares.filter((x) => x >= 0.999).length, min: sorted[0], median: sorted[Math.floor((sorted.length - 1) / 2)] };
  }
  return out;
}

function transcriptFiles(args) {
  const files = [];
  for (const a of args) {
    const p = resolve(a);
    if (statSync(p).isDirectory()) {
      // A workflow folder also holds journal.jsonl, which is not an agent, so agent files win when present.
      const all = readdirSync(p).sort().filter((f) => f.endsWith('.jsonl'));
      const agents = all.filter((f) => f.startsWith('agent-'));
      for (const f of agents.length ? agents : all) files.push(join(p, f));
    } else files.push(p);
  }
  return files;
}

const pct = (x) => (x === null || x === undefined ? '-' : `${Math.round(100 * x)}%`);

const samePath = (a, b) => (process.platform === 'win32' ? a.toLowerCase() === b.toLowerCase() : a === b);
if (process.argv[1] && samePath(resolve(process.argv[1]), fileURLToPath(import.meta.url))) {
  const argv = process.argv.slice(2);
  const opt = (flag) => { const i = argv.indexOf(flag); if (i < 0) return null; const v = argv[i + 1]; argv.splice(i, 2); return v; };
  const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
  const catalogPath = resolve(opt('--catalog') || join(repo, 'skills/think-framework-advisor/references/recommendable.json'));
  const blindPath = opt('--blind');
  const jsonOut = opt('--json');
  if (!argv.length) {
    console.error('Usage: node scripts/eval/coverage-probe.mjs [--catalog <recommendable.json>] [--blind <blind.json>] [--json <out.json>] <transcript.jsonl | folder> [...]');
    process.exit(2);
  }
  const probes = catalogProbes(JSON.parse(readFileSync(catalogPath, 'utf8')));
  const blindRows = blindPath ? JSON.parse(readFileSync(resolve(blindPath), 'utf8')) : null;
  const promptById = blindRows ? new Map((Array.isArray(blindRows) ? blindRows : blindRows.cases || []).map((r) => [r.id, r.prompt])) : null;
  // With a blind file, an agent whose messages assign no ids is not a router, so it is left out.
  const rows = [];
  const skipped = [];
  for (const file of transcriptFiles(argv)) {
    const t = readTranscript(readFileSync(file, 'utf8'));
    const ids = promptById ? assignedIds(t.userText) : null;
    if (promptById && !ids) { skipped.push(basename(file)); continue; }
    rows.push({ file: basename(file), date: t.firstTimestamp?.slice(0, 10) ?? null, models: t.models, tools: t.tools, coverage: coverage(t.seen, probes, { ids, promptById }) });
  }
  const s = summarize(rows);
  const usable = (k) => `${probes[k].filter((x) => x.probe).length}/${probes[k].length}`;
  console.log(`catalog: ${catalogPath}`);
  console.log(`  ${probes.entries} entries; usable probes: descriptions ${usable('desc')}, anti-trigger tails ${usable('anti')}`);
  console.log(`agents: ${rows.length}; models: ${[...new Set(rows.flatMap((r) => r.models))].join(', ') || 'none recorded'}`);
  const label = { names: 'names', descriptions: 'descriptions', antiTriggers: 'anti-trigger lines', prompts: 'assigned prompts' };
  for (const [k, v] of Object.entries(s)) console.log(`  ${label[k]}: ${v.all}/${v.agents} agents saw all; min ${pct(v.min)}, median ${pct(v.median)}`);
  const tools = {};
  for (const r of rows) for (const [k, n] of Object.entries(r.tools)) tools[k] = (tools[k] || 0) + n;
  console.log(`  tool calls: ${JSON.stringify(tools)}`);
  if (skipped.length) console.log(`  left out ${skipped.length} agent(s) whose messages assign no ids:${skipped.join(', ')}`);
  for (const r of rows.filter((x) => x.coverage.prompts?.missing.length)) console.log(`  ${r.file}: ${r.coverage.prompts.missing.length} assigned prompt(s) not seen with their ids: ${r.coverage.prompts.missing.join(', ')}`);
  if (jsonOut) writeFileSync(resolve(jsonOut), JSON.stringify({ catalog: catalogPath, summary: s, skipped, rows }, null, 1));
}
