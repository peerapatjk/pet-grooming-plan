# Product Discovery Assets

This folder holds the supporting briefs and reference docs used to prototype, test, and communicate the launch slice before deep implementation.

## Purpose

Use these artifacts to define what the prototypes, pilot, stakeholder reviews, and analytics discussions must cover.

## Stage

- Stage: `DISCOVERY SUPPORT`
- Primary audience: product, design, research, operations, and leadership
- Authority boundary: these docs define what to prototype and measure, but they must stay inside [../launch-canon.md](../launch-canon.md) and the formal product contract in [../../spec-driven-development/spec.md](../../spec-driven-development/spec.md)

## Inputs

- [../launch-canon.md](../launch-canon.md)
- [../../idea-refine/prototype-and-eval.md](../../idea-refine/prototype-and-eval.md)
- [../../spec-driven-development/spec.md](../../spec-driven-development/spec.md)
- [../domain-research-bangkok-pet-grooming-platform.md](../domain-research-bangkok-pet-grooming-platform.md)

## Outputs

- concierge pilot brief
- prototype briefs for landing page, customer, merchant, and internal operations surfaces
- analytics and evaluation schema
- source material for the CEO deck, stakeholder one-pager, and demo-refinement pass

## Status

- Maturity: `reviewed`
- Current state: structurally ready for prototype generation and stakeholder walkthroughs
- Evidence status: not evidence-backed until live pilot and prototype sessions are completed
- Next step: use the companion prompts in [../../prototype-prompts/README.md](../../prototype-prompts/README.md), then feed results into [../../idea-refine/pilot-decision-gate.md](../../idea-refine/pilot-decision-gate.md)

## Where To Start

- Start with [concierge-pilot.md](concierge-pilot.md) if the goal is workflow validation.
- Start with [analytics-and-evals.md](analytics-and-evals.md) if the goal is measurement and review design.
- Start with the relevant product brief below if the goal is prototype generation.

## Files

- [concierge-pilot.md](concierge-pilot.md) — concierge-pilot plan for validating workflow fit, no-show controls, and merchant trust before deep implementation
- [customer-prototype.md](customer-prototype.md) — customer-flow brief covering onboarding, booking, trust, and repeat booking
- [merchant-prototype.md](merchant-prototype.md) — merchant scheduling and booking-board brief focused on truthful availability and operational trust
- [operations-control-plane-prototype.md](operations-control-plane-prototype.md) — internal control-plane brief for incident triage, overrides, merchant recovery, and trust-event review
- [landing-page-prototype.md](landing-page-prototype.md) — static landing-page brief for positioning and app-download conversion
- [analytics-and-evals.md](analytics-and-evals.md) — event schema and discovery review cadence for pilot and launch-slice learning

## Brief-To-Prompt Crosswalk

| Source brief | Companion prompt | Primary output |
| --- | --- | --- |
| [landing-page-prototype.md](landing-page-prototype.md) | [../../prototype-prompts/02a-landing-page-static-site.md](../../prototype-prompts/02a-landing-page-static-site.md) | static marketing site |
| [customer-prototype.md](customer-prototype.md) | [../../prototype-prompts/02-customer-mobile-prototype.md](../../prototype-prompts/02-customer-mobile-prototype.md) | customer mobile prototype |
| [merchant-prototype.md](merchant-prototype.md) | [../../prototype-prompts/03-merchant-ops-prototype.md](../../prototype-prompts/03-merchant-ops-prototype.md) | merchant operations prototype |
| [operations-control-plane-prototype.md](operations-control-plane-prototype.md) | [../../prototype-prompts/03b-operations-control-plane-prototype.md](../../prototype-prompts/03b-operations-control-plane-prototype.md) | internal operations control plane |
| [analytics-and-evals.md](analytics-and-evals.md) | [../../prototype-prompts/04-ceo-demo-deck.md](../../prototype-prompts/04-ceo-demo-deck.md), [../../prototype-prompts/05-stakeholder-one-pager.md](../../prototype-prompts/05-stakeholder-one-pager.md), [../../prototype-prompts/06-demo-refinement-and-handoff.md](../../prototype-prompts/06-demo-refinement-and-handoff.md) | metrics framing and stakeholder proof points |
| [concierge-pilot.md](concierge-pilot.md) | no direct prompt | live pilot design and decision-gate input |

## Downstream Consumers

- [../../prototype-prompts/README.md](../../prototype-prompts/README.md)
- [../../idea-refine/pilot-decision-gate.md](../../idea-refine/pilot-decision-gate.md)
- [../../spec-driven-development/stakeholder-readiness.md](../../spec-driven-development/stakeholder-readiness.md)

## Shared Launch Canon

- [../launch-canon.md](../launch-canon.md)
