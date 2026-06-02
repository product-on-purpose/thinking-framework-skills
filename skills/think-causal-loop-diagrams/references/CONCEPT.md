<!-- thinking-framework-skills | concept diagram (rendered on the site, not agent-facing) -->
## Picture it

Every causal loop diagram is built from two kinds of closed loop. A reinforcing loop (R) feeds on itself and accelerates; a balancing loop (B) pushes back toward a goal or limit.

```mermaid
graph TD
  subgraph Rloop["Reinforcing (R): spirals up or down"]
    direction LR
    a1["Users"] --> a2["Word of mouth"]
    a2 --> a1
  end
  subgraph Bloop["Balancing (B): seeks a goal / hits a limit"]
    direction LR
    b1["Users"] --> b2["Server load"]
    b2 --> b3["Slower app"]
    b3 --> b1
  end
  Rloop ~~~ Bloop
  classDef r fill:#fde7e7,stroke:#dc2626,color:#7f1d1d
  classDef b fill:#e6f0fe,stroke:#1967d2,color:#10316b
  class a1,a2 r
  class b1,b2,b3 b
```

*Sign each link, close the loop, and label it R or B. Which loop dominates tells you whether the system spirals, settles toward a goal, or oscillates.*
