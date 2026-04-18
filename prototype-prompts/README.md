# Prototype Prompts

This folder contains paste-ready prompts for Claude Design based on the current launch canon and product-brief set for the Bangkok-first pet grooming booking platform.

## Purpose

Use these prompts to generate polished prototypes, decks, and one-pagers for stakeholder review without inventing new product scope.

## Stage

- Stage: `PROTOTYPE / DEMO`
- Primary audience: product, design, founders, and leadership reviewers
- Authority boundary: these prompts are for exploration and communication. They must stay inside [../docs/launch-canon.md](../docs/launch-canon.md), the supporting briefs in [../docs/product/README.md](../docs/product/README.md), and the repo-wide authority rules in [../docs/governance/authority-boundaries.md](../docs/governance/authority-boundaries.md)

## Inputs

- [../docs/launch-canon.md](../docs/launch-canon.md)
- [../docs/product/README.md](../docs/product/README.md)
- [../spec-driven-development/spec.md](../spec-driven-development/spec.md)
- [../docs/product/analytics-and-evals.md](../docs/product/analytics-and-evals.md)

## Outputs

- design-system seed
- landing-page, customer, merchant, and internal operations prototypes
- CEO deck
- stakeholder one-pager
- refined demo and handoff package

## Status

- Maturity: `reviewed`
- Current state: ready for design exploration and stakeholder demos
- Evidence status: not evidence-backed until the generated artifacts are reviewed with real users or stakeholders
- Next step: run the prompts, capture findings, and feed decisions back into [../idea-refine/pilot-decision-gate.md](../idea-refine/pilot-decision-gate.md)

## Where To Start

1. [01-brand-and-design-system-seed.md](01-brand-and-design-system-seed.md)
2. [02a-landing-page-static-site.md](02a-landing-page-static-site.md)
3. [02-customer-mobile-prototype.md](02-customer-mobile-prototype.md)
4. [03-merchant-ops-prototype.md](03-merchant-ops-prototype.md)
5. [03b-operations-control-plane-prototype.md](03b-operations-control-plane-prototype.md)
6. [04-ceo-demo-deck.md](04-ceo-demo-deck.md)
7. [05-stakeholder-one-pager.md](05-stakeholder-one-pager.md)
8. [06-demo-refinement-and-handoff.md](06-demo-refinement-and-handoff.md)

## Prompt Pack

- [01-brand-and-design-system-seed.md](01-brand-and-design-system-seed.md) — shared visual system and semantic-state seed
- [02a-landing-page-static-site.md](02a-landing-page-static-site.md) — static marketing site prompt with app-download CTA constraints
- [02-customer-mobile-prototype.md](02-customer-mobile-prototype.md) — customer mobile journey prompt
- [03-merchant-ops-prototype.md](03-merchant-ops-prototype.md) — merchant schedule and booking-board prompt
- [03b-operations-control-plane-prototype.md](03b-operations-control-plane-prototype.md) — internal operations, support, and finance-control-plane prompt
- [04-ceo-demo-deck.md](04-ceo-demo-deck.md) — leadership narrative deck prompt
- [05-stakeholder-one-pager.md](05-stakeholder-one-pager.md) — circulate-after-review summary prompt
- [06-demo-refinement-and-handoff.md](06-demo-refinement-and-handoff.md) — package-wide refinement and handoff prompt

## Brief-To-Prompt Crosswalk

| Supporting brief | Prompt | Notes |
| --- | --- | --- |
| [../docs/product/landing-page-prototype.md](../docs/product/landing-page-prototype.md) | [02a-landing-page-static-site.md](02a-landing-page-static-site.md) | acquisition-only website, not a web booking surface |
| [../docs/product/customer-prototype.md](../docs/product/customer-prototype.md) | [02-customer-mobile-prototype.md](02-customer-mobile-prototype.md) | customer onboarding, booking, trust, and repeat-booking flow |
| [../docs/product/merchant-prototype.md](../docs/product/merchant-prototype.md) | [03-merchant-ops-prototype.md](03-merchant-ops-prototype.md) | merchant schedule truth, request-confirm, and offline booking capture |
| [../docs/product/operations-control-plane-prototype.md](../docs/product/operations-control-plane-prototype.md) | [03b-operations-control-plane-prototype.md](03b-operations-control-plane-prototype.md) | internal triage, override safety, merchant recovery, and reconciliation visibility |
| [../docs/product/analytics-and-evals.md](../docs/product/analytics-and-evals.md) | [04-ceo-demo-deck.md](04-ceo-demo-deck.md), [05-stakeholder-one-pager.md](05-stakeholder-one-pager.md), [06-demo-refinement-and-handoff.md](06-demo-refinement-and-handoff.md) | stakeholder framing and success criteria support |

## How To Use In Claude Design

1. Open `claude.ai/design`.
2. Upload logos, fonts, brand colors, screenshots, or reference materials if you have them.
3. Paste one prompt at a time.
4. Generate a first version, then refine with focused follow-ups.
5. Save resulting outputs and route the findings back into the pilot decision gate instead of letting prototypes drift into undocumented decisions.

## Demo Strategy

For leadership demos, the strongest sequence is:

1. show the customer routine-booking flow
2. show the static landing page that frames the launch honestly and drives app downloads
3. show the customer request-confirm flow
4. show the merchant booking board and offline booking capture
5. show the internal operations control plane
6. show the deck that explains why the launch slice is intentionally narrow

## Guardrails

These prompts intentionally enforce the current product boundaries:

- Bangkok-first launch slice
- static landing page with direct-to-download CTAs only
- in-shop grooming only
- one pet plus one primary service template
- routine services can be instant-booked
- high-variance services route to request-confirm
- card hold for routine bookings and deposit for higher-risk cases
- Thai and English for system-managed UI
- no waitlist, offered-slot flow, or native reschedule in V1
- explicit merchant-cancel reasons for confirmed bookings
- reconfirmation non-response creates follow-up visibility rather than silent inventory release
- internal operations keep incident handling and overrides auditable

## Promotion Criteria

This folder is ready for live use when:

- the prompt pack matches the current launch canon and product briefs
- no prompt expands scope or invents policy
- the crosswalk to source briefs is current
- demo outputs are expected to feed findings back into [../idea-refine/pilot-decision-gate.md](../idea-refine/pilot-decision-gate.md)

## Next Stop

- review sessions and clickable prototype generation
- [../idea-refine/pilot-decision-gate.md](../idea-refine/pilot-decision-gate.md) for evidence-backed policy lock

## Shared Launch Canon

- [../docs/launch-canon.md](../docs/launch-canon.md)
