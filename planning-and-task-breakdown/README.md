# Planning and Task Breakdown

This folder decomposes the formal spec and implementation plan into small, verifiable work items with explicit dependencies and acceptance criteria.

## Purpose

Use `planning-and-task-breakdown/` when the product contract is stable enough to be turned into execution-ready tasks.

## Stage

- Stage: `TASK BREAKDOWN`
- Primary audience: engineering, product, and delivery planning
- Authority boundary: this folder owns execution decomposition. It should not introduce product scope outside [../docs/launch-canon.md](../docs/launch-canon.md) or redefine policy already owned by [../spec-driven-development/README.md](../spec-driven-development/README.md)

## Inputs

- [../spec-driven-development/spec.md](../spec-driven-development/spec.md)
- [../spec-driven-development/requirements.md](../spec-driven-development/requirements.md)
- [../spec-driven-development/plan.md](../spec-driven-development/plan.md)
- [../spec-driven-development/stakeholder-readiness.md](../spec-driven-development/stakeholder-readiness.md)

## Outputs

- phased task list
- acceptance criteria and verification notes
- dependency ordering
- risk and open-question tracking for execution

## Status

- Maturity: `reviewed`
- Current state: structurally ready for execution planning
- Lock status: do not treat as implementation-ready until [../idea-refine/pilot-decision-gate.md](../idea-refine/pilot-decision-gate.md) closes the remaining launch-policy decisions
- Numbering note: task numbers preserve the broader workback lineage, so deferred post-launch work may carry an earlier task number than some launch-slice work

## Where To Start

1. [tasks.md](tasks.md)

## Files

- [tasks.md](tasks.md) — Phase 3 task breakdown with launch-slice work separated from post-launch expansion and verification checkpoints

## Upstream Inputs

- [../spec-driven-development/README.md](../spec-driven-development/README.md)
- [../idea-refine/pilot-decision-gate.md](../idea-refine/pilot-decision-gate.md)

## Downstream Consumers

- implementation tickets and workstreams
- test planning and delivery review

## Shared Launch Canon

- [../docs/launch-canon.md](../docs/launch-canon.md)
