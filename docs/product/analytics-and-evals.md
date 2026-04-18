# Analytics And Eval Schema

## Purpose

Define the minimum event and review system required to learn from the concierge pilot and the MVP launch slice.

This schema exists to answer whether the product is improving booking speed, schedule trust, payment trust, and repeat behavior.

## North-Star Outcome

- 30% repeat booking rate at 6 months

## Launch Leading Indicators

- landing-page view-to-download click-through rate
- onboarding completion rate
- time to first search
- time to first booking
- search-to-book conversion
- percentage of bookings that are truthfully instant-confirmed
- verification completion rate
- hold or deposit completion rate
- merchant response time for request-confirm bookings
- reconfirmation non-response follow-up rate
- stale-availability failure rate
- no-show rate
- merchant schedule-trust score
- 30-day repeat booking rate

## Event Principles

- Events must reflect the canonical booking lifecycle, not UI-only guesses
- Customer and merchant actors must be distinguishable
- Cancellation actor and reason must be preserved
- Late or duplicate provider callbacks must be visible in analytics, not silently suppressed
- Events must be defined once and reused across pilot, prototype reviews, and implementation

## Core Event Table

| Event | Actor | When it fires | Key properties |
|---|---|---|---|
| `landing_page_viewed` | visitor | marketing landing page is viewed | acquisition_source, locale, device_type |
| `app_download_cta_clicked` | visitor | App Store / Play Store CTA is clicked | acquisition_source, locale, platform_target |
| `onboarding_started` | customer | customer begins onboarding | language, acquisition_source |
| `onboarding_completed` | customer | minimum booking-ready onboarding completes | language, steps_completed, deferred_fields |
| `first_search_performed` | customer | first meaningful search occurs | area, service_type, pet_known |
| `booking_flow_started` | customer | booking composition begins | service_type, pet_profile_state, booking_path_candidate |
| `booking_routed` | system | routing decision is made | instant_or_request, trigger_reason, service_type, pet_risk_flags |
| `payment_protection_viewed` | customer | hold or deposit explanation is shown | policy_type, service_type, booking_path |
| `payment_protection_completed` | customer | hold or deposit step succeeds | policy_type, provider, booking_origin |
| `payment_protection_failed` | system | hold or deposit step fails | policy_type, failure_reason, recoverable |
| `booking_created` | system | booking record is created | booking_status, origin, service_type, merchant_id |
| `booking_confirmed` | system | booking becomes confirmed | booking_path, time_to_confirm, merchant_id |
| `booking_declined_by_merchant` | merchant | merchant declines request-confirm booking | decline_reason, service_type |
| `booking_cancelled` | customer_or_merchant_or_system | booking is cancelled | actor, reason, previous_status |
| `booking_timeout_expired` | system | provisional hold expires | timeout_type, previous_status, expiry_minutes |
| `merchant_response_recorded` | merchant | merchant acts on a pending booking | action, response_minutes, service_type |
| `offline_booking_created` | merchant | merchant enters non-app-originated booking | source_channel, payment_followup_needed |
| `booking_status_corrected` | merchant | merchant edits outcome during correction window | previous_status, new_status, correction_age_hours |
| `reminder_sent` | system | reminder notification is sent | lead_time_bucket, locale |
| `reconfirmation_sent` | system | reconfirmation prompt is sent | lead_time_bucket, locale |
| `reconfirmation_completed` | customer | customer responds to reconfirmation | response_type, time_to_response |
| `reconfirmation_missed` | system | reconfirmation window closes without customer response | lead_time_bucket, followup_required |
| `booking_outcome_review_required` | system | correction window closes without final outcome | previous_status, correction_window_hours, payout_hold_applied |
| `repeat_booking_started` | customer | repeat path begins from history or saved pet | prior_booking_id, merchant_id |
| `repeat_booking_completed` | customer | repeat booking succeeds | prior_booking_id, time_to_complete |
| `provider_callback_ignored` | system | stale or duplicate provider event is safely ignored | provider, callback_type, ignore_reason |
| `merchant_schedule_trust_scored` | merchant | merchant trust signal is captured in review | trust_score, review_source |

## Review Questions By Metric

### Speed

- Does the landing page explain the product quickly enough to drive download intent?
- How long does it take to reach first search?
- How long does it take to complete a routine booking?
- Is repeat booking materially faster than first-time booking?

### Schedule Truth

- What percentage of customer-visible slots fail because availability was stale?
- How often do merchants correct booking outcomes after the fact?
- Are offline bookings flowing into the same canonical schedule?

### Payment Trust

- What percentage of users drop when they see payment protection?
- Which policy types create the most friction?
- Are support complaints driven by unclear release conditions or by policy choice itself?

### Merchant Trust

- Do merchants keep the booking board current?
- Do they still maintain shadow scheduling outside the system?
- Which workflows cause them to fall back to chat coordination?
- How often does reconfirmation create manual follow-up work for merchants or ops?

## Prototype And Pilot Review Cadence

- Daily during the concierge pilot:
  - review every booking trace
  - review stale-slot failures
  - review payment-protection friction
- Weekly during prototype testing:
  - review user confusion on booking states
  - review merchant workflow objections
  - update routing or trust-copy hypotheses
- Biweekly strategy review:
  - decide whether to narrow or expand launch slice assumptions

## Exit Criteria For Discovery

The pilot and prototype loop is complete only when:

- launch service taxonomy is locked
- request-confirm triggers are locked
- provisional-hold expiry and merchant response SLA are locked
- payment-protection defaults are evidence-backed
- the static landing page clearly drives app downloads without creating a false expectation of web booking
- onboarding field set is minimized based on observed friction
- the team can explain how the launch slice will be measured after release
