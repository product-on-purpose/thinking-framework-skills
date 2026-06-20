// changelog-lib.mjs - Pure transforms for the generated site changelog pages (Workstream A).
// Zero-dependency, UTF-8, LF. Consumed by scripts/gen-site.mjs; tested in
// tests/changelog-lib.test.mjs. The repo-root CHANGELOG.md / RELEASE-NOTES.md
// are the source of truth; these helpers only re-point their links for the site.

const EXTERNAL = /^(https?:|mailto:|tel:|ftp:|\/\/|#)/i;

// Decide a target's replacement, or null to leave it unchanged.
function classifyTarget(rawTarget, { selfLinks, repoBlobBase }) {
  if (EXTERNAL.test(rawTarget)) return null;        // external or pure #anchor
  const hashIdx = rawTarget.indexOf('#');
  const path = hashIdx === -1 ? rawTarget : rawTarget.slice(0, hashIdx);
  const frag = hashIdx === -1 ? '' : rawTarget.slice(hashIdx); // keeps leading '#'
  if (path === '') return null;                     // bare fragment
  const norm = path.replace(/^\.\//, '');           // drop a leading ./
  if (norm === 'RELEASE-NOTES.md') return selfLinks.whatsNew + frag;
  if (norm === 'CHANGELOG.md') return selfLinks.full + frag;
  return repoBlobBase + norm + frag;
}

export function rewriteLinks(md, opts) {
  let inFence = false;
  let fenceChar = '';
  return md.split('\n').map((line) => {
    const fence = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      const ch = fence[1][0];
      if (!inFence) { inFence = true; fenceChar = ch; }
      else if (ch === fenceChar) { inFence = false; fenceChar = ''; }
      return line;                                   // never touch the fence line
    }
    if (inFence) return line;                         // inside code: untouched

    const refDef = line.match(/^(\s*\[[^\]]+\]:\s*)(\S+)(.*)$/);
    if (refDef) {
      const repl = classifyTarget(refDef[2], opts);
      return repl == null ? line : refDef[1] + repl + refDef[3];
    }

    return line.replace(/(!?)\[([^\]]*)\]\(([^)\s]+)\)/g, (m, bang, text, target) => {
      if (bang === '!') return m;                     // image: leave
      const repl = classifyTarget(target, opts);
      return repl == null ? m : `[${text}](${repl})`;
    });
  }).join('\n');
}

// Build a mermaid timeline from "## vX.Y.Z" headings + the first following bold
// theme line. Colons are the timeline separator, so they are replaced in labels.
export function extractReleaseTimeline(releaseNotesMd) {
  const lines = releaseNotesMd.split('\n');
  const entries = [];
  for (let i = 0; i < lines.length; i++) {
    const h = lines[i].match(/^##\s+\[?v?(\d+\.\d+\.\d+)\]?\s*$/);
    if (!h) continue;
    let theme = '';
    // Scan at most ~8 lines forward for the bold theme line of this version.
    for (let j = i + 1; j < lines.length && j < i + 8; j++) {
      if (/^##\s/.test(lines[j])) break;
      const t = lines[j].match(/^\*\*(.+?)\*\*/);
      if (t) { theme = t[1]; break; }
    }
    entries.push({ version: h[1], theme });
  }
  if (!entries.length) return '';
  const sanitize = (s) => s.replace(/[`*_]/g, '').replace(/:/g, ' -').replace(/\s+/g, ' ').trim().slice(0, 60);
  const rows = entries.map((e) => `    v${e.version} : ${sanitize(e.theme) || 'Release'}`);
  return ['```mermaid', 'timeline', '    title Release history', ...rows, '```'].join('\n');
}

// Strip the leading H1 (Starlight renders the frontmatter title), then rewrite links.
export function transformChangelog(md, opts) {
  return rewriteLinks(md.replace(/^#\s+.*\r?\n+/, ''), opts);
}
