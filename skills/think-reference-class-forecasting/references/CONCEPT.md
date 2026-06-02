<!-- thinking-framework-skills | concept diagram (rendered on the site, not agent-facing) -->
## Picture it

Every estimate can be made two ways. The inside view runs on your plan and your reasons, and tends to run late. The outside view asks how comparable past efforts actually went.

```mermaid
graph TD
  P["Estimate this project"] --> I["Inside view:<br/>our plan, our reasons<br/>-> optimistic number"]
  P --> O["Outside view:<br/>how did 20 similar<br/>past projects actually go?<br/>-> base-rate number"]
  I --> A["Anchor on the outside view,<br/>then adjust for what is<br/>genuinely different"]
  O --> A
  classDef inside fill:#fde7e7,stroke:#dc2626,color:#7f1d1d
  classDef outside fill:#e3f5e8,stroke:#16a34a,color:#14532d
  classDef ans fill:#e6e9ff,stroke:#6366f1,color:#1e1b4b,font-weight:bold
  class I inside
  class O outside
  class A ans
```

*The correction is to start from the track record of the reference class, not from the inside-view story, then adjust.*
