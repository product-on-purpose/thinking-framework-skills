---
description: Research a thinking framework and produce its evidence-graded dossier plus a schema-valid proposed registry entry, or discover candidate methods in a family. Use to vet a method before building it into a skill, reproduce the evidence-and-overlap vetting, or shortlist new candidates.
argument-hint: "[framework-name | discover N in family <family>]"
maps-to: think-research-framework
---

Invoke the think-research-framework skill to research and grade the request.

Input ($ARGUMENTS) is one of:

- A framework name, optionally with a one-line gloss. Run NAME mode: research the method, grade its evidence on the seven-tier model, assess overlap against the shipped catalog, write frameworks/<slug>/dossier.md, and print a schema-valid PROPOSED registry entry plus a one-screen verdict. Never auto-write the registry.
- A brief of the form "discover N in family <family>". Run DISCOVERY mode: return a ranked shortlist of candidate methods, each with a one-line mechanism and a distinctness hypothesis. No dossiers, no registry entries.

$ARGUMENTS
