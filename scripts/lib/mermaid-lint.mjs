// scripts/lib/mermaid-lint.mjs
// Pure STRUCTURAL validator for mermaid code blocks (zero-dep). It catches the
// common breakage - an unclosed fence, an empty block, or an unrecognized
// diagram type - without a full semantic parse (semantic correctness of authored
// diagrams is verified at authoring time via the Mermaid MCP; this is the ongoing
// regression gate). Used by scripts/check-mermaid.mjs; tested in tests/.

const DIAGRAM_TYPES = new Set([
  'graph', 'flowchart', 'sequenceDiagram', 'stateDiagram-v2', 'stateDiagram',
  'classDiagram', 'erDiagram', 'journey', 'gantt', 'pie', 'timeline', 'mindmap',
  'quadrantChart', 'gitGraph', 'requirementDiagram', 'block-beta', 'sankey-beta',
  'xychart-beta', 'C4Context',
]);

export function lintMermaidBlocks(text) {
  const lines = text.split('\n');
  const findings = [];
  let i = 0;
  while (i < lines.length) {
    if (!/^\s*```+\s*mermaid\s*$/.test(lines[i])) { i++; continue; }
    const fenceLine = i + 1; // 1-based
    let j = i + 1;
    const body = [];
    let closed = false;
    while (j < lines.length) {
      if (/^\s*```+\s*$/.test(lines[j])) { closed = true; break; }
      body.push(lines[j]);
      j++;
    }
    if (!closed) {
      findings.push({ line: fenceLine, message: 'unclosed ```mermaid fence' });
      break;
    }
    // first content token = first non-blank line that is not a %% directive or %% comment
    const firstContent = body.find((l) => {
      const t = l.trim();
      return t !== '' && !t.startsWith('%%');
    });
    if (firstContent === undefined) {
      findings.push({ line: fenceLine, message: 'empty mermaid block (no diagram content)' });
    } else {
      const token = firstContent.trim().split(/[\s({:;]/)[0];
      if (!DIAGRAM_TYPES.has(token)) {
        findings.push({ line: fenceLine, message: `unrecognized mermaid diagram type "${token}"` });
      }
    }
    i = j + 1;
  }
  return findings;
}
