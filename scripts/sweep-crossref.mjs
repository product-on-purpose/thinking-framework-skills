#!/usr/bin/env node
// =============================================================================
// sweep-crossref.mjs - ask CrossRef about every DOI the library cites.
//
// what-it-is:   a maintainer tool, not a gate layer. It needs the network, so CI never runs it.
//               Run it before a research wave admits new sources, and before a release that
//               leans on evidence claims.
// what-it-does: reads every skills/*/evidence/dossier.md, every frameworks/*/dossier.md and
//               frameworks/registry.mjs; extracts each DOI-shaped string; asks the CrossRef
//               works API about each distinct DOI, one request at a time; and writes a JSON
//               record and a markdown report. The report lists retractions and expressions of
//               concern, corrections, cited DOIs that are themselves notices, broken DOI
//               references, publisher page keys, and two wrong-DOI prompts (title words and
//               year). It changes no repo file. Each finding becomes a dated decision item in
//               docs/internal/backlog.md for the maintainer; nothing edits a dossier from it.
// why:          a cited paper was retracted on 2026-09-02 and nothing noticed until a manual
//               audit. The first sweep, on 2026-10-17, is recorded in docs/internal/backlog.md
//               ("From the CrossRef retraction sweep").
// used-by:      npm run research:doi-sweep; rules in scripts/lib/doi-sweep-lib.mjs
//
// Usage:
//   node scripts/sweep-crossref.mjs [--out <dir>]   sweep the library (default out:
//                                                   _local/doi-sweep/<YYYY-MM-DD>/, gitignored)
//   node scripts/sweep-crossref.mjs --doi <doi>     look up one DOI and print what CrossRef has
//
// Etiquette: a generic User-Agent and no contact address in any header, URL or payload; one
// request at a time with a pause between, and a retry with backoff on 429 and 5xx.
//
// Limits: it sees only sources cited with a DOI, and only what CrossRef records (publisher
// notices and Retraction Watch records). It does not open links, so a correct DOI whose
// registered landing page is dead, and a publisher page key that no longer resolves, both
// pass unnoticed.
// =============================================================================

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  cleanDoi, extractMentions, crossrefWorkUrl, classifyUpdates, classifyMissing, titleOverlap, yearMismatch,
} from "./lib/doi-sweep-lib.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const UA = "doi-update-sweep/1.0";
const GAP_MS = 300;
const LOW_OVERLAP = 0.34;

const args = process.argv.slice(2);
const flag = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const today = new Date().toLocaleDateString("en-CA"); // local YYYY-MM-DD

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWork(doi) {
  const url = crossrefWorkUrl(doi);
  for (let attempt = 0; attempt < 4; attempt++) {
    let res;
    try {
      res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" }, signal: AbortSignal.timeout(30000) });
    } catch (e) {
      if (attempt === 3) return { status: "error", error: String(e) };
      await sleep(2000 * (attempt + 1));
      continue;
    }
    if (res.status === 404) return { status: "not-found" };
    if (res.status === 429 || res.status >= 500) {
      await sleep(Number(res.headers.get("retry-after")) * 1000 || 3000 * (attempt + 1));
      continue;
    }
    if (!res.ok) return { status: "error", error: `HTTP ${res.status}` };
    const body = await res.text();
    if (!body.trim()) { await sleep(2000 * (attempt + 1)); continue; } // the pool sometimes sends an empty 200
    return { status: "ok", message: JSON.parse(body).message };
  }
  return { status: "error", error: "retries exhausted" };
}

const updates = (list) => (list || []).map((u) => ({
  type: u.type, doi: u.DOI, source: u.source, date: u.updated?.["date-parts"]?.[0]?.join("-") ?? null,
}));

// --- one DOI ------------------------------------------------------------------
// Accept a DOI as written in a URL too (10.1207/...%264_2, or with a doi.org prefix).
const one = flag("--doi") && cleanDoi(flag("--doi").replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, "").replace(/^doi:\s*/i, ""));
if (one) {
  const r = await fetchWork(one);
  if (r.status !== "ok") { console.log(`${one}: ${r.status}${r.error ? ` (${r.error})` : ""}`); process.exit(1); }
  const m = r.message;
  console.log(JSON.stringify({
    doi: m.DOI, title: (m.title || [])[0], year: m.issued?.["date-parts"]?.[0]?.[0] ?? null,
    container: (m["container-title"] || [])[0], volume: m.volume, page: m.page,
    severity: classifyUpdates(m["updated-by"]), updatedBy: updates(m["updated-by"]), updateTo: updates(m["update-to"]),
  }, null, 2));
  process.exit(0);
}

// --- the library sweep ----------------------------------------------------------
const outDir = resolve(flag("--out") ?? join(ROOT, "_local", "doi-sweep", today));
mkdirSync(outDir, { recursive: true });

const files = [];
for (const d of readdirSync(join(ROOT, "skills"))) {
  if (existsSync(join(ROOT, "skills", d, "evidence", "dossier.md"))) files.push(`skills/${d}/evidence/dossier.md`);
}
for (const d of readdirSync(join(ROOT, "frameworks"))) {
  if (existsSync(join(ROOT, "frameworks", d, "dossier.md"))) files.push(`frameworks/${d}/dossier.md`);
}
files.push("frameworks/registry.mjs");

const byDoi = new Map(); // lowercased DOI -> { doi, mentions: [{ file, line, kind, host, text }] }
let mentionCount = 0;
for (const f of files) {
  for (const m of extractMentions(readFileSync(join(ROOT, f), "utf8"))) {
    mentionCount++;
    const key = m.doi.toLowerCase();
    if (!byDoi.has(key)) byDoi.set(key, { doi: m.doi, mentions: [] });
    byDoi.get(key).mentions.push({ file: f, line: m.line, kind: m.kind, host: m.host, text: m.text });
  }
}

const entries = [...byDoi.values()];
console.error(`files: ${files.length}, DOI mentions: ${mentionCount}, distinct DOIs: ${entries.length}`);

const results = [];
for (const [n, e] of entries.entries()) {
  const r = await fetchWork(e.doi);
  const rec = { doi: e.doi, mentions: e.mentions, status: r.status, error: r.error };
  const lines = e.mentions.map((s) => s.text);
  if (r.status === "ok") {
    const m = r.message;
    rec.title = (m.title || [])[0] || "";
    rec.year = m.issued?.["date-parts"]?.[0]?.[0] ?? null;
    rec.container = (m["container-title"] || [])[0] || "";
    rec.updatedBy = updates(m["updated-by"]);
    rec.updateTo = updates(m["update-to"]);
    rec.severity = classifyUpdates(m["updated-by"]);
    rec.titleOverlap = titleOverlap(rec.title, lines);
    rec.yearMismatch = yearMismatch(rec.year, lines);
  } else if (r.status === "not-found") {
    rec.missing = classifyMissing(e.mentions);
  }
  results.push(rec);
  if ((n + 1) % 25 === 0) console.error(`  ${n + 1}/${entries.length}`);
  await sleep(GAP_MS);
}

writeFileSync(join(outDir, "crossref-sweep.json"),
  JSON.stringify({ ranAt: new Date().toISOString(), files: files.length, mentions: mentionCount, results }, null, 2) + "\n");

// --- report -----------------------------------------------------------------------
const at = (s) => `${s.file}:${s.line}`;
const count = (pred) => results.filter(pred).length;
const out = [];
const section = (heading, hits, render, note) => {
  out.push(`## ${heading}: ${hits.length}`, "");
  if (note && hits.length) out.push(note, "");
  for (const r of hits) render(r);
  out.push("");
};

out.push("# CrossRef sweep", "");
out.push(`Ran ${today}. Files read: ${files.length}. DOI mentions: ${mentionCount}. Distinct DOIs: ${results.length}.`);
out.push(`CrossRef has a record for ${count((r) => r.status === "ok")}. Not in CrossRef: ${count((r) => r.status === "not-found")}. Errors: ${count((r) => r.status === "error")}.`);
out.push("");
out.push("Each finding below is a prompt for a dated decision item in docs/internal/backlog.md. Check every one first-hand before proposing a change.", "");

const cited = (r) => { for (const s of r.mentions) out.push(`  - cited at ${at(s)}`); };
for (const [heading, sev] of [
  ["Retractions, withdrawals, removals and expressions of concern", "severe"],
  ["Corrections and errata", "review"],
  ["Other update records", "info"],
]) {
  section(heading, results.filter((r) => r.severity === sev), (r) => {
    out.push(`- ${r.doi}: "${r.title}" (${r.year}, ${r.container})`);
    for (const u of r.updatedBy) out.push(`  - updated by ${u.type} ${u.doi} on ${u.date ?? "an unknown date"} (source: ${u.source})`);
    cited(r);
  });
}
section("Cited DOIs that are themselves notices", results.filter((r) => r.status === "ok" && r.updateTo.length), (r) => {
  out.push(`- ${r.doi}: "${r.title}", a ${r.updateTo.map((u) => `${u.type} of ${u.doi}`).join(", ")}`);
  cited(r);
});
section("Broken DOI references (cited as a DOI, and CrossRef has no record)", results.filter((r) => r.missing === "broken"), (r) => {
  out.push(`- ${r.doi}`);
  cited(r);
});
section("Publisher page keys (a DOI-shaped string inside a publisher URL, not a registered DOI; the link was not opened)", results.filter((r) => r.missing === "page-key"), (r) => {
  out.push(`- ${r.doi} (${[...new Set(r.mentions.map((s) => s.host))].join(", ")})`);
  cited(r);
});
section("Lookup errors (not checked)", results.filter((r) => r.status === "error"), (r) => {
  out.push(`- ${r.doi}: ${r.error}`);
  cited(r);
});
const low = results.filter((r) => r.status === "ok" && r.titleOverlap !== null && r.titleOverlap < LOW_OVERLAP).sort((a, b) => a.titleOverlap - b.titleOverlap);
section(`Possible wrong DOI: few of the CrossRef title's words are on the citing line (overlap under ${LOW_OVERLAP})`, low, (r) => {
  out.push(`- ${r.doi} (overlap ${r.titleOverlap.toFixed(2)}): CrossRef has "${r.title}" (${r.year})`);
  for (const s of r.mentions) out.push(`  - cited at ${at(s)}: ${s.text.slice(0, 160)}`);
}, "A low overlap often means only that the line cites the paper by author and year. Open the record before calling it wrong.");
section("Possible wrong DOI: no year on the citing line is within one year of CrossRef's", results.filter((r) => r.yearMismatch === true), (r) => {
  out.push(`- ${r.doi}: CrossRef gives ${r.year} for "${r.title}"`);
  cited(r);
}, "An online-first date often explains a gap like this.");

writeFileSync(join(outDir, "crossref-sweep.md"), out.join("\n"));
console.log(out.join("\n"));
console.error(`wrote ${join(outDir, "crossref-sweep.md")} and crossref-sweep.json`);
