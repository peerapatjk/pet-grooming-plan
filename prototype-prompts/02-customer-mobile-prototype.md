# Customer Mobile Prototype Prompt

## When To Use

Paste this into Claude Design after the design-system seed if you want a polished **customer-facing mobile prototype** for CEO and stakeholder demos.

## Prompt Contract

- Purpose: express the first-booking and repeat-booking customer journey without inventing product scope or hiding trust-sensitive states.
- Intended user and workflow: busy Bangkok pet owner moving from first-use onboarding to routine booking, request-confirm handling, and repeat booking.
- Source documents: [../docs/product/customer-prototype.md](../docs/product/customer-prototype.md), [../docs/launch-canon.md](../docs/launch-canon.md), [../spec-driven-development/requirements.md](../spec-driven-development/requirements.md), [../spec-driven-development/spec.md](../spec-driven-development/spec.md).
- Requirement families expressed: `REQ-ONBOARD`, `REQ-BOOK`, `REQ-PET`, `REQ-I18N`, `REQ-LIFECYCLE`.
- Must not imply: web booking, multi-pet or bundled booking flows, native reschedule, waitlist, or hidden payment-protection rules.
- Review checklist: users can explain instant vs pending states, trust copy is transparent and calm, and repeat booking feels materially faster than first-time booking.

## Prompt

```text
Create a realistic, interactive mobile product prototype for the customer-facing side of a Bangkok-first pet grooming booking platform.

This prototype is for a CEO and stakeholder demo. It should feel believable, premium, operationally grounded, and launch-slice disciplined.

Product context:
- We help busy Bangkok pet owners book reliable grooming and bathing appointments in under 60 seconds for routine cases.
- We help independent grooming shops reduce no-shows and stop relying on fragmented chat-based scheduling through LINE, Instagram, Facebook, and phone calls.
- The product is repeat-first, trust-first, and schedule-truth-first.

Important product boundaries:
- in-shop grooming only
- Bangkok-first launch
- one booking = one pet + one primary service template + optional fixed add-ons
- routine services can be instantly bookable
- high-variance cases must become request-confirm bookings
- routine bookings default to card holds
- higher-risk or higher-value cases can require deposits
- system-managed UI must support Thai and English
- no waitlist, no offered-slot flow, no multi-pet bookings, no bundled multi-service flow, no native reschedule in V1

Primary customer:
- busy urban pet owner in Bangkok
- books from mobile
- wants reliability, speed, clear pricing, and less coordination friction

Core objective for this prototype:
Show a customer journey that feels materially faster and clearer than messaging a grooming shop manually.

I want this prototype to cover 4 flows:

FLOW 1: Lightweight onboarding to first search
- language selection: Thai / English
- phone-first or account-first verification start
- minimum booking-critical setup only
- no heavy profile forms up front
- make it feel fast, calm, and premium

FLOW 2: Routine service instant-book flow
- search shops by area, service, and near-term availability
- shop results should feel curated but not marketplace-busy
- shop detail should show trust signals, service templates, indicative pricing, next available slots, and whether service is instant-bookable
- pet selection or quick pet-profile creation
- service selection
- slot selection
- payment protection explanation before commitment
- booking confirmation state

FLOW 3: Exception case request-confirm flow
- trigger this when a pet/service combination is too variable for truthful instant booking
- explain why the booking is pending in a human, trust-preserving way
- show `pending_verification` and `pending_merchant_confirmation` as different states if useful
- make the next step obvious
- show expected response timing and what happens if no action is completed in time
- show what happens if the merchant declines or the request expires
- make any slot-release or payment-protection aftermath explicit and calm

FLOW 4: Repeat booking flow
- customer can rebook the same pet and service from history or saved context
- this should visibly feel much faster than the first-time booking flow
- make repeat booking one of the emotional payoff moments of the product

Must-show product semantics:
- instant booking
- pending verification
- pending merchant confirmation
- declined by merchant
- request expired / timed out
- confirmed
- payment hold
- deposit required
- payment issue fallback
- reminder / reconfirmation context

Critical UX goals:
- customers must immediately understand why some bookings are instant and some are pending
- customers must understand that payment protection exists to reduce fake bookings and no-shows, not to trick them
- customers must always know what happens next
- trust copy must feel transparent, calm, and non-punitive
- the product should feel premium and operationally mature

Visual direction:
- mobile-first
- elegant but not cold
- polished enough for an executive demo
- no childish pet illustrations
- use pets sparingly and tastefully
- emphasize clarity, speed, and trust
- avoid generic AI-generated UI patterns

I want these screens at minimum:

1. Language and welcome screen
2. Phone verification start
3. Minimal onboarding or "add later" progressive setup
4. Search / discovery home
5. Shop results list
6. Shop detail page
7. Pet profile creation or pet selector
8. Routine service booking flow
9. Payment hold explanation screen
10. Instant booking confirmed screen
11. Exception booking request-confirm screen
12. Pending state detail view
13. Declined-by-merchant or request-expired outcome screen
14. Booking history screen
15. Repeat booking shortcut flow

For the actual demo content, use sample realistic Bangkok-flavored but polished data:
- neighborhood references that feel plausible
- service names that feel premium but credible
- pet profile data that affects booking logic

Design and copy notes:
- show Thai and English support in a few key places, but keep the main demo in English for CEO readability unless bilingual contrast helps
- write sharp, product-grade microcopy
- make the trust messaging excellent
- make the payment explanation strong enough that stakeholders can discuss policy directly from the screens

Also include:
- one polished hero screen that can be used in a presentation
- one end-to-end prototype path I can click through live
- one screen that clearly demonstrates the repeat-booking advantage

At the end, give me:
- the prototype screens
- one clickable routine-booking path
- one clickable request-confirm path
- one clickable decline-or-timeout recovery path
- one short annotation layer that points out the most important product decisions for stakeholders
```

## Good Follow-Ups

- "Make the trust-copy sharper and more premium."
- "Reduce visual clutter in search and make next-available times easier to scan."
- "Show a stronger contrast between instant booking and request-confirm."
- "Make the repeat-booking flow feel almost one-tap."
