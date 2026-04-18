# Stakeholder One-Pager Prompt

## When To Use

Paste this into Claude Design to create a **single-page strategy artifact** you can circulate after meetings or use before a broader stakeholder review.

## Prompt Contract

- Purpose: compress the launch slice into a sharp, circulate-after-review artifact that stays honest about scope, risks, and next decisions.
- Intended audience: cross-functional stakeholders who need a three-minute strategic summary.
- Source documents: [../docs/launch-canon.md](../docs/launch-canon.md), [../docs/product/analytics-and-evals.md](../docs/product/analytics-and-evals.md), [../spec-driven-development/spec.md](../spec-driven-development/spec.md), [../idea-refine/pilot-decision-gate.md](../idea-refine/pilot-decision-gate.md).
- Requirement families expressed: `REQ-LANDING`, `REQ-BOOK`, `REQ-MERCHANT`, `REQ-ANALYTICS`, `REQ-READINESS`.
- Must not imply: broader launch geography, hidden web booking capability, or evidence certainty that does not exist yet.
- Review checklist: the launch wedge is clear, the validation gate is explicit, and the artifact can be circulated without requiring a presenter to explain hidden assumptions.

## Prompt

```text
Create a polished one-pager for stakeholders about a Bangkok-first pet grooming booking platform launch slice.

The artifact should be executive-readable in under 3 minutes.

Audience:
- Product / GM
- CEO
- Operations
- Finance / Accounting
- Marketing / Sales / BD
- Support / Merchant Success
- Tech leadership

Objective:
Summarize the product in a way that is strategically clear, operationally honest, and easy to circulate after a review session.

Core product thesis:
This is a repeat-first, trust-first grooming booking product for Bangkok.
It wins by making routine bookings fast, making high-variance cases explicit, reducing no-shows through payment protection, and giving merchants a canonical schedule they trust.

I want the one-pager to include these sections:

1. Headline
- one strong sentence

2. Why this matters
- customer pain
- merchant pain

3. Launch wedge
- market
- merchant segment
- customer segment

4. What ships in the launch slice
- static landing page with app-download CTA only
- customer onboarding, search, booking, repeat booking
- merchant booking board and offline booking capture
- internal operations control plane for disputes, overrides, merchant recovery, and trust-event review
- hybrid instant / request-confirm model
- payment protection
- reminders and reconfirmation

5. What does not ship yet
- multi-pet
- bundled multi-service flows
- waitlist / offered-slot
- native reschedule
- broad citywide coverage

6. Product logic that matters
- one booking unit
- truthful instant booking only for narrow routine services
- explicit pending states
- provisional-hold expiry
- merchant-cancel confirmed booking with explicit reason

7. Why this can win
- faster than chat-based coordination
- stronger repeat loop
- stronger merchant trust
- stronger internal operational control
- clearer payment and booking semantics

8. What must be validated before implementation-heavy work
- landing-page messaging and download intent clarity
- launch service taxonomy
- request-confirm triggers
- merchant SLA
- verification-hold expiry
- onboarding minimum fields
- payment-protection tolerance

9. Next step
- concierge pilot
- clickable landing-page prototype
- clickable prototypes
- evidence-backed decision gate

Visual direction:
- premium
- crisp
- boardroom-ready
- strong information hierarchy
- a mix of concise copy, product visuals, and visual frameworks

Avoid:
- generic startup gradients
- hype language
- clutter
- long paragraphs

Please produce:
- one polished one-pager
- one alternate version that is more operator-focused
- one alternate version that is more CEO-focused
```

## Good Follow-Ups

- "Make the operator-focused version denser and more explicit about booking states."
- "Make the CEO-focused version sharper and more strategic."
- "Turn the validation section into a cleaner decision-gate block."
