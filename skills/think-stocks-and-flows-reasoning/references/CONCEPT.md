<!-- thinking-framework-skills | concept diagram (rendered on the site, not agent-facing) -->
## Picture it

A stock is a level that accumulates (like water in a bathtub); flows are the rates that fill or drain it. The level changes only by the net of the flows, which is why people misjudge it.

```mermaid
graph LR
  IN["Inflow:<br/>new signups / month"] --> S["STOCK:<br/>active users<br/>(the level right now)"]
  S --> OUT["Outflow:<br/>churn / month"]
  classDef flow fill:#e6f0fe,stroke:#1967d2,color:#10316b
  classDef stock fill:#e3f5e8,stroke:#16a34a,color:#14532d,font-weight:bold
  class IN,OUT flow
  class S stock
```

*Cutting churn (the outflow) raises the level even with signups flat; a big inflow still shrinks the stock if the outflow is bigger. Reason about the level and the two rates separately.*
