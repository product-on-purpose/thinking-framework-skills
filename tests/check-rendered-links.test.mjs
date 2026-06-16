import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";

// Proves the clause 14.11(a) rendered-link guard (scripts/check-rendered-links.mjs) is robust: it
// passes a clean built dist, fails a dist with a browser-broken internal link, hard-fails an
// empty-but-existing dist (never a silent green next to a red build), enforces #anchors only under
// STRICT_ANCHORS=1, and carries the hardened askit fixes - bare-relative resolution (F2), both
// quote styles (F3), and defensive percent-decode (F4). "Guard robustness is itself normative"
// (SITE-STANDARD 14.11), so the guard is itself tested. The guard is spawned as a subprocess, so it
// resolves its real BASE from scripts/site-base.mjs. This is a repo-local test, not a registered
// gate check, mirroring the agent-skills-toolkit donor test.
//
// BASE is value-pinned here to the configured base, which is the empty string for the
// root-served custom domain. This is a sanctioned clause 14.7 exception (a test that pins the
// expected base), alongside the public/robots.txt sitemap URL - it must equal what
// scripts/site-base.mjs exports, or the fixtures will not line up with the guard's resolver.

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GUARD = path.join(REPO_ROOT, "scripts/check-rendered-links.mjs");
const BASE = "";

// Build a throwaway dist tree from a { relPath: htmlString } map and return its root.
function makeDist(files) {
  const dir = mkdtempSync(path.join(os.tmpdir(), "tfs-rlinks-"));
  for (const [rel, html] of Object.entries(files)) {
    const full = path.join(dir, rel);
    mkdirSync(path.dirname(full), { recursive: true });
    writeFileSync(full, html, "utf8");
  }
  return dir;
}

function runGuard(distDir, env = {}) {
  return spawnSync(process.execPath, [GUARD, distDir], {
    encoding: "utf8",
    env: { ...process.env, ...env },
  });
}

test("PASS on a clean dist (all internal links and a self anchor resolve)", () => {
  const dist = makeDist({
    "index.html": `<h2 id="intro">Intro</h2><a href="${BASE}/overview/">Overview</a> <a href="#intro">jump</a>`,
    "overview/index.html": `<h1 id="overview">Overview</h1>`,
  });
  try {
    const r = runGuard(dist, { STRICT_ANCHORS: "1" });
    assert.equal(r.status, 0, `expected exit 0, got ${r.status}\n${r.stdout}\n${r.stderr}`);
  } finally {
    rmSync(dist, { recursive: true, force: true });
  }
});

test("FAIL on a browser-broken internal link (target route does not exist in dist)", () => {
  const dist = makeDist({
    "index.html": `<a href="${BASE}/missing/">dead</a>`,
  });
  try {
    const r = runGuard(dist);
    assert.equal(r.status, 1, `expected exit 1, got ${r.status}\n${r.stdout}`);
    assert.match(r.stdout, /Browser-broken internal links: 1/);
  } finally {
    rmSync(dist, { recursive: true, force: true });
  }
});

test("FAIL on a link to the old /thinking-framework-skills subpath (stale-base class)", () => {
  // At a root deploy the page lives at /overview/, not /thinking-framework-skills/overview/. A
  // stale link carrying the retired project subpath 404s at the root domain (GitHub redirects the
  // old github.io path at the host, not inside dist), so the guard must flag it. This replaces the
  // old "missing base" case, which no longer exists once the base is empty (root).
  const dist = makeDist({
    "index.html": `<a href="/thinking-framework-skills/overview/">stale base</a>`,
    "overview/index.html": `<h1>Overview</h1>`,
  });
  try {
    const r = runGuard(dist);
    assert.equal(r.status, 1, `expected exit 1, got ${r.status}\n${r.stdout}`);
    assert.match(r.stdout, /Browser-broken internal links: 1/);
  } finally {
    rmSync(dist, { recursive: true, force: true });
  }
});

test("hard-FAIL on an empty-but-existing dist (a crashed build must not pass silently)", () => {
  const dist = mkdtempSync(path.join(os.tmpdir(), "tfs-rlinks-empty-"));
  try {
    const r = runGuard(dist);
    assert.equal(r.status, 1, `expected exit 1 on empty dist, got ${r.status}`);
    assert.match(r.stderr, /no \.html pages/);
  } finally {
    rmSync(dist, { recursive: true, force: true });
  }
});

test("FAIL on a missing dist directory (build-first guard)", () => {
  const r = runGuard(path.join(os.tmpdir(), "tfs-rlinks-does-not-exist-xyz"));
  assert.equal(r.status, 1, `expected exit 1 on missing dist, got ${r.status}`);
});

test("anchors are advisory by default but enforced under STRICT_ANCHORS=1", () => {
  const dist = makeDist({
    "index.html": `<a href="#nope">broken anchor</a>`,
  });
  try {
    const advisory = runGuard(dist);
    assert.equal(advisory.status, 0, `advisory anchor should pass, got ${advisory.status}\n${advisory.stdout}`);
    const strict = runGuard(dist, { STRICT_ANCHORS: "1" });
    assert.equal(strict.status, 1, `strict anchor should fail, got ${strict.status}\n${strict.stdout}`);
  } finally {
    rmSync(dist, { recursive: true, force: true });
  }
});

test("a malformed percent-escape in an anchor does not crash the guard (defensive decode, F4)", () => {
  const dist = makeDist({
    // '#50%-off' is not a valid percent-escape; decodeURIComponent would throw without the guard's
    // try/catch. The link target page exists, so the run must complete (here: advisory anchor).
    "index.html": `<h1 id="x">x</h1><a href="${BASE}/deals/#50%-off">deal</a>`,
    "deals/index.html": `<h1 id="deals">Deals</h1>`,
  });
  try {
    const r = runGuard(dist);
    assert.equal(r.status, 0, `guard must not crash on a bad percent-escape, got ${r.status}\n${r.stderr}`);
  } finally {
    rmSync(dist, { recursive: true, force: true });
  }
});

test("FAIL on a broken bare-relative link on a deep page (no leading ./ or /, F2)", () => {
  // A bare-relative href on /overview/ resolves one URL level deeper, so a link to a sibling that
  // exists at the site root still 404s from a sub-page. This is the class the guard must catch;
  // regression test for the classification gap the askit fix closed.
  const dist = makeDist({
    "index.html": `<a href="${BASE}/overview/">ok</a>`,
    "overview/index.html": `<a href="getting-started/">broken from here</a>`,
    "getting-started/index.html": `<h1>Getting started</h1>`,
  });
  try {
    const r = runGuard(dist);
    assert.equal(r.status, 1, `expected exit 1, got ${r.status}\n${r.stdout}`);
    assert.match(r.stdout, /Browser-broken internal links: 1/);
  } finally {
    rmSync(dist, { recursive: true, force: true });
  }
});

test("PASS on a bare-relative link that resolves from its own page", () => {
  const dist = makeDist({
    "index.html": `<a href="overview/">overview</a>`,
    "overview/index.html": `<h1>Overview</h1>`,
  });
  try {
    const r = runGuard(dist);
    assert.equal(r.status, 0, `expected exit 0, got ${r.status}\n${r.stdout}`);
  } finally {
    rmSync(dist, { recursive: true, force: true });
  }
});

test("FAIL on a broken single-quoted href (href matching is quote-symmetric with id matching, F3)", () => {
  const dist = makeDist({
    "index.html": `<a href='${BASE}/missing/'>dead</a>`,
  });
  try {
    const r = runGuard(dist);
    assert.equal(r.status, 1, `expected exit 1, got ${r.status}\n${r.stdout}`);
  } finally {
    rmSync(dist, { recursive: true, force: true });
  }
});
