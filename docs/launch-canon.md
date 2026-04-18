# Launch Canon

This file is the stable cross-folder summary of the current launch rules for the Bangkok-first pet grooming booking platform.

Use it to keep `docs/`, `idea-refine/`, `spec-driven-development/`, `planning-and-task-breakdown/`, and `prototype-prompts/` aligned. For detailed implementation behavior, refer to [../spec-driven-development/spec.md](../spec-driven-development/spec.md).

## Purpose

The repo already contains the same core policy ideas in multiple artifacts. This file exists so contributors can reference one concise statement of the launch posture instead of paraphrasing it differently in every folder.

## Canonical Rules

### 1. Market and launch posture

- The launch is Bangkok-first.
- The initial wedge is premium-leaning independent grooming shops in dense central Bangkok neighborhoods.
- The product should ship a narrow launch slice before expanding into a broader marketplace roadmap.

### 2. Surface boundaries

- The customer surface is mobile-first.
- The merchant surface is desktop and tablet first.
- The website is a static landing page with direct app-download CTAs only.
- The landing page must not become a second booking, onboarding, or search surface.
- Internal operations require a separate control plane for exception handling, overrides, merchant recovery, and trust-event review.

### 3. Booking-unit boundary

- One booking equals one pet plus one primary service template.
- Only merchant-defined fixed add-ons may stay inside the same booking unit.
- Multi-pet and bundled multi-service flows are out of V1 unless explicitly re-approved later.

### 4. Booking routing and state model

- Truthful instant booking is only for a narrow routine-service set.
- High-variance cases route to `request-confirm`.
- `pending_verification` and `pending_merchant_confirmation` are distinct pre-confirmation states.
- `declined_by_merchant` is distinct from customer cancellation, merchant cancellation, and no-show.
- Merchant-cancelled confirmed bookings require explicit operational reasons.

### 5. Inventory and expiry behavior

- Only `pending_verification` and `pending_merchant_confirmation` may hold inventory provisionally.
- Provisional holds must auto-expire if the required action does not happen in time.
- When review, payment protection, and OTP can all apply, one explicit launch sequence must own the active expiry path at any given time.
- Late merchant decisions must not silently resurrect expired requests.

### 6. Payment trust model

- Routine bookings default to card holds.
- Higher-risk or higher-value cases may require deposits.
- Payment protection is part of the trust model, not hidden billing.
- Payment handling must be tokenized through a third-party payment provider.
- Offline-originated bookings can still trigger verification and payment-link follow-up.

### 7. Reminder, reconfirmation, and correction policy

- The default reminder cadence is `24 hours before + same-day`, with a compressed path for bookings created inside that window.
- Reconfirmation non-response must create a visible merchant or operations follow-up signal.
- Reconfirmation non-response must not silently release previously confirmed inventory in V1.
- The merchant correction window defaults to 24 hours after appointment time.
- If the correction window closes without a final outcome, the system should force an auditable follow-up path.

### 8. Explicit non-goals for V1

- home-service dispatch
- waitlist or offered-slot flows
- native reschedule
- broad citywide supply from day one
- feature creep that breaks truthful duration, inventory, or trust semantics

## Update Rule

When the pilot decision gate, stakeholder review, or formal spec changes one of these rules:

1. update this file
2. update the affected folder README files
3. update the detailed source artifact that owns the changed behavior

Do not leave the canon and downstream docs drifting apart.

## Source Artifacts

This canon is distilled from the currently aligned policy language in:

- [../idea-refine/pet-grooming-booking-platform.md](../idea-refine/pet-grooming-booking-platform.md)
- [../idea-refine/pilot-synthesis-status.md](../idea-refine/pilot-synthesis-status.md)
- [../spec-driven-development/spec.md](../spec-driven-development/spec.md)
- [../spec-driven-development/requirements.md](../spec-driven-development/requirements.md)
- [../spec-driven-development/plan.md](../spec-driven-development/plan.md)
- [../planning-and-task-breakdown/tasks.md](../planning-and-task-breakdown/tasks.md)
