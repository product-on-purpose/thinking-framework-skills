---
title: "Explanation"
description: "The understanding-oriented quadrant of the repo docs, currently the detailed architecture companion page"
audience: engineer
level: advanced
---

# docs/explanation/

This folder holds the explanation quadrant of the Diataxis split used under [`../README.md`](../README.md): pages that build understanding of why the system is shaped the way it is. It is distinct from a lookup page (`docs/reference/`), a goal-oriented recipe (`docs/how-to/`), and a hands-on walkthrough (`docs/tutorials/`), its three sibling quadrants.

## Inventory

- [`architecture-internals.md`](./architecture-internals.md) - goes one level deeper than [`../architecture.md`](../architecture.md) into the per-skill sidecar schema, the recipe-to-command pipeline, and the eval harness, for a contributor changing one of those layers. Its frontmatter `doc-role: architecture-detailed` is what `../architecture.md` links to as its detailed companion (G10).
