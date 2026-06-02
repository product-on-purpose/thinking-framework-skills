<!-- thinking-framework-skills | concept diagram (rendered on the site, not agent-facing) -->
## Picture it

Put the change in the center, then radiate outward: direct first-order effects, then the effects of those effects, and so on. The surprises usually live in the second and third ring.

```mermaid
graph LR
  C["CHANGE:<br/>launch a free tier"] --> A1["1st: signups jump"]
  C --> A2["1st: support load rises"]
  A1 --> B1["2nd: free users rarely convert"]
  A1 --> B2["2nd: brand reaches new segment"]
  A2 --> B3["2nd: paid users wait longer"]
  B3 --> D1["3rd: paid churn rises"]
  classDef c fill:#e6e9ff,stroke:#6366f1,color:#1e1b4b,font-weight:bold
  classDef o1 fill:#e3f5e8,stroke:#16a34a,color:#14532d
  classDef o2 fill:#fff4d6,stroke:#b06000,color:#5c3a00
  class C c
  class A1,A2 o1
  class B1,B2,B3,D1 o2
```

*The first ring is obvious; the value is following the chain to the non-obvious second- and third-order consequences.*
