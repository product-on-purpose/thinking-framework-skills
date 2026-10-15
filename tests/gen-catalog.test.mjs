import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import registry from "../frameworks/registry.mjs";
import { catalog, evaluated, llmsTxt } from "../scripts/gen-catalog.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const lib = JSON.parse(readFileSync(path.join(ROOT, "library.json"), "utf8"));
const SITE = JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf8")).homepage.replace(/\/$/, "");

const shippedCount = registry.frameworks.filter((f) => f.status === "shipped").length;
const recipeCount = readdirSync(path.join(ROOT, "_workflows")).filter((f) => f.endsWith(".md")).length;
const allSkillNames = new Set(lib.components.skills.map((c) => c.name));

test("catalog counts are internally consistent and derived from the sources", () => {
  assert.equal(catalog.counts.skills, shippedCount, "skills == shipped registry frameworks");
  assert.equal(catalog.counts.recipes, recipeCount, "recipes == _workflows files");
  assert.equal(catalog.counts.tools, lib.components.skills.length - shippedCount, "tools == library skills minus shipped");
  assert.equal(catalog.counts.total, catalog.entries.length);
  assert.equal(catalog.counts.total, catalog.counts.skills + catalog.counts.tools + catalog.counts.recipes);
});

test("every catalog entry has a live, absolute url and a known type", () => {
  for (const e of catalog.entries) {
    assert.ok(["skill", "tool", "recipe"].includes(e.type), `${e.slug}: type`);
    assert.ok(typeof e.url === "string" && e.url.startsWith(SITE), `${e.slug}: url ${e.url}`);
  }
});

test("a known skill (premortem) carries the routing fields", () => {
  const p = catalog.entries.find((e) => e.invocation === "think-premortem");
  assert.ok(p, "think-premortem present");
  assert.equal(p.type, "skill");
  assert.equal(p.artifact, "risk-register");
  assert.equal(p.evidence_tier, "S/M");
  assert.ok(p.url.endsWith("/frameworks/think-premortem/"), p.url);
  assert.ok(p.in_recipes.includes("stress-test-decision"), "in_recipes");
  assert.ok(Array.isArray(p.likely_companions));
});

test("a tool entry (think-top3) carries its inline-array companions", () => {
  const t = catalog.entries.find((e) => e.invocation === "think-top3");
  assert.ok(t, "think-top3 present");
  assert.equal(t.type, "tool");
  assert.ok(t.url.endsWith("/tools/think-top3/"), t.url);
  assert.ok(t.likely_companions.includes("think-framework-advisor"), "inline companions parsed");
});

test("a recipe entry (stress-test-decision) carries ordered steps", () => {
  const r = catalog.entries.find((e) => e.invocation === "think-stress-test-decision");
  assert.ok(r, "recipe present");
  assert.equal(r.type, "recipe");
  assert.ok(Array.isArray(r.steps) && r.steps.length >= 2, "has steps");
  assert.ok(r.steps.includes("think-premortem"), "steps name real skills");
  assert.ok(r.url.endsWith("/recipes/stress-test-decision/"), r.url);
});

test("each registered subagent annotates its same-named entry and adds none", () => {
  const registered = lib.components.subagents.map((c) => c.name).sort();
  const annotated = catalog.entries.filter((e) => e.subagent).map((e) => e.invocation).sort();
  assert.deepEqual(annotated, registered, "one annotated entry per registered subagent");
  for (const e of catalog.entries) assert.ok("subagent" in e, `${e.slug}: every entry carries the field`);
  assert.equal(catalog.counts.total, catalog.counts.skills + catalog.counts.tools + catalog.counts.recipes, "subagents are not an entry type");
  for (const name of registered) {
    assert.ok(llmsTxt.includes(`[${lib.name}:${name}](`), `llms.txt lists ${name} under Subagents`);
  }
});

test("a subagent annotation is read off its agent file, and a recipe one preloads exactly its steps", () => {
  const r = catalog.entries.find((e) => e.invocation === "think-stress-test-decision" && e.type === "recipe");
  assert.equal(r.subagent.subagent_type, "thinking-framework-skills:think-stress-test-decision");
  assert.deepEqual(r.subagent.tools, ["Read", "Glob", "Grep"], "tool grant parsed from frontmatter");
  for (const e of catalog.entries.filter((x) => x.subagent)) {
    for (const p of e.subagent.preloads) assert.ok(allSkillNames.has(p), `${e.invocation}: preload ${p} is not a real skill`);
    if (e.type === "recipe") assert.deepEqual(e.subagent.preloads, e.steps, `${e.invocation}: preloads drifted from the recipe's steps`);
  }
});

test("likely_companions only ever names real shipped skills", () => {
  for (const e of catalog.entries) {
    for (const c of e.likely_companions || []) {
      assert.ok(allSkillNames.has(c), `${e.slug}: companion ${c} is not a real skill`);
    }
  }
});

test("evaluated.json projects the whole registry with shipped/not-shipped split", () => {
  assert.equal(evaluated.counts.total, registry.frameworks.length);
  assert.equal(evaluated.counts.shipped, shippedCount);
  assert.equal(evaluated.counts.not_shipped, registry.frameworks.length - shippedCount);
  const steel = evaluated.methods.find((m) => m.slug === "steelmanning");
  assert.ok(steel, "steelmanning present");
  assert.equal(steel.fold_into, "red-team-light", "fold_into surfaces where it ships");
});

test("evaluated.json shipped methods link to their live skill page (no null urls)", () => {
  const p = evaluated.methods.find((m) => m.slug === "premortem");
  assert.ok(p && p.status === "shipped", "premortem is a shipped method");
  assert.ok(p.url && p.url.endsWith("/frameworks/think-premortem/"), `premortem url: ${p.url}`);
  const nullShipped = evaluated.methods.filter((m) => m.status === "shipped" && !m.url);
  assert.equal(nullShipped.length, 0, `every shipped method must have a live url; null: ${nullShipped.map((m) => m.slug).join(", ")}`);
});

test("llms.txt has the convention shape and links the data files", () => {
  assert.ok(llmsTxt.startsWith("# Thinking Framework Skills"), "H1 title");
  assert.match(llmsTxt, /^> /m, "blockquote summary");
  assert.ok(llmsTxt.includes(`${SITE}/catalog.json`), "links catalog.json");
  assert.ok(llmsTxt.includes(`${SITE}/evaluated.json`), "links evaluated.json");
  assert.ok(llmsTxt.includes("## Skills"), "Skills section");
  assert.ok(llmsTxt.includes("## Recipes"), "Recipes section");
  assert.ok(llmsTxt.includes("think-premortem"), "lists a known skill");
});
