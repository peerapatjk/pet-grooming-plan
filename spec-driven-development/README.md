# Spec-Driven Development

This folder contains the formal product contract and gated implementation-planning artifacts that sit between ideation and execution.

## Purpose

Use `spec-driven-development/` when discovery has converged enough to define product behavior, implementation sequencing, and launch-readiness requirements with explicit rules instead of implied assumptions.

## Stage

- Stage: `SPECIFY` and `PLAN`
- Primary audience: product, engineering, design, operations, and leadership
- Authority boundary: this folder defines the formal product contract and implementation approach. When details conflict with exploratory notes or prompt packs, this folder wins unless an explicit later decision supersedes it

## Inputs

- [../idea-refine/README.md](../idea-refine/README.md)
- [../docs/launch-canon.md](../docs/launch-canon.md)
- [../docs/product/README.md](../docs/product/README.md)
- [../docs/domain-research-bangkok-pet-grooming-platform.md](../docs/domain-research-bangkok-pet-grooming-platform.md)

## Outputs

- formal MVP spec
- supporting product requirements
- implementation plan with sequencing, risks, and checkpoints
- stakeholder-readiness requirements and current status view

## Status

- Maturity: `reviewed`
- Current state: internally consistent, but not evidence-backed
- Lock status: do not treat as fully locked until [../idea-refine/pilot-decision-gate.md](../idea-refine/pilot-decision-gate.md) closes the remaining policy questions
- Current unresolved areas: instant-bookable service taxonomy, request-confirm triggers, provisional-hold expiry behavior, merchant response SLA, and launch-slice boundary decisions

## Where To Start

1. [spec.md](spec.md)
2. [requirements.md](requirements.md)
3. [plan.md](plan.md)
4. [stakeholder-readiness.md](stakeholder-readiness.md)
5. [stakeholder-readiness-status.md](stakeholder-readiness-status.md)

## Files

- [spec.md](spec.md) — formal MVP specification and detailed behavior contract
- [requirements.md](requirements.md) — supporting product requirements focused on booking integrity, launch constraints, and cross-functional obligations
- [plan.md](plan.md) — implementation plan covering sequencing, dependencies, risks, and verification checkpoints
- [stakeholder-readiness.md](stakeholder-readiness.md) — launch-readiness requirements across product, business, operational, legal, technical, and vendor stakeholders
- [stakeholder-readiness-status.md](stakeholder-readiness-status.md) — current readiness snapshot and blocker inventory by stakeholder group

## Upstream Inputs

- [../idea-refine/pilot-decision-gate.md](../idea-refine/pilot-decision-gate.md)
- [../idea-refine/pilot-synthesis-status.md](../idea-refine/pilot-synthesis-status.md)
- [../docs/domain-research-bangkok-pet-grooming-platform.md](../docs/domain-research-bangkok-pet-grooming-platform.md)

## Downstream Consumers

- [../planning-and-task-breakdown/README.md](../planning-and-task-breakdown/README.md)
- [../prototype-prompts/README.md](../prototype-prompts/README.md)
- future implementation workstreams

## Shared Launch Canon

- [../docs/launch-canon.md](../docs/launch-canon.md)
