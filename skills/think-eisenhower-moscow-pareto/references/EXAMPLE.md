# Prioritization preset (MoSCoW) - Worked Example

A completed run of `think-eisenhower-moscow-pareto` on a MoSCoW request, on the shared Northwind scenario. This is the quality bar an honest run should meet: the caveat leads, exactly one preset is produced, category inflation is guarded, the Must bucket is ranked, and the limit is named.

> Northwind is a B2B SaaS with a fixed six-week release window and a stakeholder backlog where every requester swears their item is essential.

> **Evidence caveat (read first):** MoSCoW is a tier P practitioner preset, one of three weakly-evidenced prioritization schemes stapled by the word "prioritization". Its best-documented failure is category inflation: because anything not a "Must" rarely gets built, users mark almost everything "Must". There is no controlled study showing MoSCoW improves decisions. What follows is worth reading only because the Must bucket is justified against the timebox and ranked within itself; the four bare buckets alone would not be. To compare on criteria that actually matter, `think-decision-option-review` is the stronger move.

---

## What this prioritization is about

- Cutting the next-release scope for Northwind's six-week window. The user asked for a MoSCoW, so that is the one preset run here.

## MoSCoW (against a timebox)

- **Timebox:** the next six-week release. Everything below is cut against "ships in six weeks", not "matters eventually".

| Bucket | Items | Justification (Must items: why, against the timebox) |
|---|---|---|
| **Must have** | 1. SSO for the enterprise pilot account<br>2. Audit log export | 1. The signed pilot contract names SSO as a go-live gate; without it the release does not unblock revenue.<br>2. Same contract requires exportable audit logs for the customer's compliance review before go-live. |
| **Should have** | Bulk user import; in-app role editor | High value, but the pilot can onboard via support-assisted import for one release; not a go-live gate. |
| **Could have** | Dark mode; CSV column reordering | Nice, cheap if there is slack, droppable without harm. |
| **Won't have (this time)** | SCIM provisioning; usage dashboards | Real and wanted, explicitly deferred to the following release so they do not silently creep into scope. |

- **Category inflation guard:** the raw backlog had nine items marked "Must" by their requesters. Forced against the six-week timebox and the actual go-live gate (the signed pilot contract), only two survive as true Musts. The Must bucket is ranked 1 then 2 so that if the window tightens, SSO ships before audit export, rather than both stalling as undifferentiated "essentials".
- **Limit named:** MoSCoW gives no objective criterion beyond "priority" and no intra-bucket ranking of its own - the ranking above is hand-imposed against one explicit gate (the contract). If the real question were how these items trade off on value, effort, and risk together, `think-decision-option-review` would name those criteria honestly instead of collapsing them into one canned "priority" axis.

## What to do next

- The two Musts are the release. Verify the one assumption the whole cut rests on: confirm with the pilot customer that SSO and audit export are the only contractual go-live gates. If a third gate surfaces, the timebox, not the bucket labels, is what has to give - re-cut the Should bucket, do not inflate the Must bucket.

---

*Note: the bare four buckets would have shipped nine "Musts" and stopped there. The work was forcing each Must against the actual timebox gate, ranking inside the Must bucket, and naming where MoSCoW stops doing work, then handing the load-bearing assumption (which gates are contractual) back for verification before the scope is locked.*
