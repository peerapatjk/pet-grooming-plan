# Planning and Task Breakdown

This folder decomposes the formal spec and implementation plan into small, verifiable work items with explicit dependencies and acceptance criteria.

## Purpose

Use `planning-and-task-breakdown/` when the product contract is stable enough to be turned into execution-ready tasks.

## Stage

- Stage: `TASK BREAKDOWN`
- Primary audience: engineering, product, and delivery planning
- Authority boundary: this folder owns execution decomposition. It should not introduce product scope outside [../docs/launch-canon.md](../docs/launch-canon.md) or redefine policy already owned by [../spec-driven-development/README.md](../spec-driven-development/README.md). For the full repo rule set, see [../docs/governance/authority-boundaries.md](../docs/governance/authority-boundaries.md).

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

- [tasks.md](tasks.md) — full task breakdown with launch-slice work separated from post-launch expansion and verification checkpoints

## Upstream Inputs

- [../spec-driven-development/README.md](../spec-driven-development/README.md)
- [../idea-refine/pilot-decision-gate.md](../idea-refine/pilot-decision-gate.md)

## Downstream Consumers

- implementation tickets and workstreams
- test planning and delivery review

## Promotion Criteria

This folder is ready to hand work into implementation when:

- every task traces to approved upstream artifacts
- checkpoints are explicit and reviewable
- no fake dependencies or missing referenced docs remain
- verification notes are concrete enough to support human review

## Next Stop

- implementation tickets and workstreams
- [../docs/readiness/README.md](../docs/readiness/README.md) when launch packets need supporting execution detail

## Shared Launch Canon

- [../docs/launch-canon.md](../docs/launch-canon.md)
