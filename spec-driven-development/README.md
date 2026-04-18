# Spec-Driven Development

This folder is for the formal PRD and gated spec workflow before any code is written.

Use this folder when starting a new project, feature, or significant change.

## Files

- `spec.md` — Phase 1 specification and current source of truth for the MVP definition.
- `requirements.md` — supporting product requirements, especially around booking integrity, no-shows, and merchant operations.
- `plan.md` — Phase 2 implementation plan covering sequencing, risks, dependencies, and verification checkpoints.
- `stakeholder-readiness.md` — cross-functional launch requirements for Product/GM, CEO, Finance, Accounting, Operations, Customer Support / Merchant Success, Marketing, Legal, Risk, Tech, Data, Sales/BD, and external vendors.

## Relationship To `idea-refine/`

Use `idea-refine/` for ideation artifacts:

- raw concept notes
- divergent directions
- convergence notes
- supporting product-thinking references

Use `spec-driven-development/` for gated delivery artifacts:

- specification
- implementation plan

Phase 3 task breakdown now lives under:

- [planning-and-task-breakdown/tasks.md](/Users/peerapatjk/Projects/Pet-Grooming/Plan/planning-and-task-breakdown/tasks.md)

At the moment, Phase 1 (`SPECIFY`) and Phase 2 (`PLAN`) are drafted in this folder, but they should not be treated as fully locked until the discovery package completes:

- [idea-refine/pilot-decision-gate.md](/Users/peerapatjk/Projects/Pet-Grooming/Plan/idea-refine/pilot-decision-gate.md)

The main remaining lock points are:

- exact instant-bookable service list
- request-confirm triggers
- provisional-hold expiry behavior
- merchant response SLA
- launch slice versus post-launch scope
