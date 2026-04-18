# Workflow Status

## Purpose

This file is the current repo-level workflow snapshot.

Use it to see where the project is blocked today, not to redefine policy. Governance and authority rules live in `docs/governance/`, and stakeholder packet structure lives in `docs/readiness/`.

## Current Phase

The project already has substantial workflow artifacts, but it is not ready to enter implementation.

- `idea-refine/` is materially complete enough to define the product direction.
- `spec-driven-development/` contains a usable draft spec and implementation plan.
- `planning-and-task-breakdown/` contains a detailed task list.
- The workflow is currently blocked at the `prototype-and-eval` / discovery-gate stage.

## Current Artifact Map

- Ideation one-pager: `idea-refine/pet-grooming-booking-platform.md`
- Discovery loop: `idea-refine/prototype-and-eval.md`
- Pilot gate definition: `idea-refine/pilot-decision-gate.md`
- Pilot status: `idea-refine/pilot-synthesis-status.md`
- Governance spine: `docs/governance/README.md`
- Domain research: `docs/domain-research-bangkok-pet-grooming-platform.md`
- Spec: `spec-driven-development/spec.md`
- Requirements: `spec-driven-development/requirements.md`
- Plan: `spec-driven-development/plan.md`
- Stakeholder gate definition: `spec-driven-development/stakeholder-readiness.md`
- Stakeholder status: `spec-driven-development/stakeholder-readiness-status.md`
- Readiness packets: `docs/readiness/README.md`
- Task breakdown: `planning-and-task-breakdown/tasks.md`
- Landing page prototype brief: `docs/product/landing-page-prototype.md`
- Operations prototype brief: `docs/product/operations-control-plane-prototype.md`

## What Is Ready

- Problem framing is coherent and narrow enough for a launch slice.
- Product scope, booking model, payment posture, and major operational rules are mostly defined.
- A current-source domain research packet now exists for market, workflow, regulatory, and payments context.
- The implementation sequencing and task breakdown are detailed enough to guide delivery later.
- Draft artifacts now exist for:
  - concierge pilot planning
  - landing page prototype scope
  - customer prototype scope
  - merchant prototype scope
  - operations control-plane prototype scope
  - analytics and eval schema

## What Is Not Ready

- The launch policy is not locked by live evidence.
- The pilot-decision gate still has unresolved operational values.
- Completed cross-functional launch packets do not exist yet.
- Packet templates now exist, but no function group has populated them with owners or evidence yet.
- There is no implementation repo or scaffolded codebase yet.

## Current Blockers

- Exact instant-bookable service taxonomy is not locked.
- Exact request-confirm trigger matrix is not locked.
- Verification-hold expiry is not locked.
- Merchant response SLA is not locked.
- Minimum onboarding field set is not locked.
- Finance, Accounting, Ops, Support, Marketing, Legal, Risk, Tech, Data, Sales, and Vendor readiness packets are not filled with owners, dates, or evidence.

## Next Ordered Steps

1. Review and approve the new Phase 0 draft artifacts under `docs/product/`.
2. Execute the concierge pilot and prototype sessions against those drafts.
3. Complete `idea-refine/pilot-decision-gate.md` with evidence-backed decisions from the pilot.
4. Fill the packet templates under `docs/readiness/` using `docs/domain-research-bangkok-pet-grooming-platform.md`, the current spec, and prototype findings.
5. Turn `spec-driven-development/stakeholder-readiness-status.md` into an owned launch snapshot with named people, dates, and waivers.
6. Re-review `spec-driven-development/spec.md`, `spec-driven-development/plan.md`, and `planning-and-task-breakdown/tasks.md` for any policy changes caused by the pilot.
7. Only then start repo scaffolding and implementation.

## Exit Criteria For Implementation

- Pilot decision gate is complete and no longer based on hidden assumptions.
- Stakeholder readiness has named owners and active packets for every critical function.
- Launch slice versus deferred scope is explicitly locked.
- The first implementation slice can start without guessing about service taxonomy, routing rules, timeout policy, or support posture.
