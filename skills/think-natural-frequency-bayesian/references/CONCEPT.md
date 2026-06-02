<!-- thinking-framework-skills | concept diagram (rendered on the site, not agent-facing) -->
## Picture it

A conditional probability that feels impossible as a percentage becomes obvious once you count people. Imagine 1,000 people, a condition that affects 1%, and a test that is roughly 90% accurate:

```mermaid
graph TD
  A["1,000 people"] --> B["10 have it<br/>(1% base rate)"]
  A --> C["990 do not"]
  B --> D["9 test positive<br/>true positives"]
  C --> F["about 89 test positive<br/>false positives"]
  D --> H["About 98 positive tests,<br/>only 9 are real:<br/>roughly 9% truly have it"]
  F --> H
  classDef has fill:#fde7e7,stroke:#dc2626,color:#7f1d1d
  classDef hasnt fill:#e3f5e8,stroke:#16a34a,color:#14532d
  classDef ans fill:#e6e9ff,stroke:#6366f1,color:#1e1b4b,font-weight:bold
  class B,D has
  class C,F hasnt
  class H ans
```

*Illustrative numbers. The point is the move: stated as natural frequencies (9 of 98), the base-rate trap that "a positive test means I probably have it" is visibly wrong.*
