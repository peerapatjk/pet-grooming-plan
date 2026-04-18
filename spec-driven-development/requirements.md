# Product Requirements Draft

## Goal

Define the initial product requirements for a Bangkok-first pet grooming booking app focused on reliable scheduling, reduced no-shows, and repeat booking.

## Product Goal

Enable busy urban pet owners to book grooming in under 60 seconds for routine cases, while giving independent groomers enough operational control to trust the schedule.

## Primary Users

- Busy urban pet owners in Bangkok
- Independent groomers and small grooming shops

## Core Jobs To Be Done

### Customer job

- Find a suitable shop
- Choose a service and time
- Complete the booking with minimal friction
- Rebook quickly for the same pet in the future

### Groomer job

- Publish truthful availability
- Review pet context before accepting risky cases
- Reduce no-shows and fake bookings
- Track booking status and daily revenue

## Core Functional Requirements

### Booking

- Customers must be able to search shops by location and service.
- Customers must be able to create and reuse pet profiles.
- Customers must be able to book routine services instantly where merchant rules allow.
- The system must support request-and-confirm booking for non-standard cases.
- The system must show a clear booking state to both customer and merchant.

### Pet profile

- The system must store breed, size, coat type, temperament, allergies, and special notes.
- The system should store past bookings and previous groomer notes for repeat booking.

### Merchant operations

- Groomers must be able to define service templates, durations, and pricing logic.
- Groomers must be able to open, close, and edit availability.
- Groomers must be able to manage booking states such as confirmed, arrived, in service, done, cancelled, and no-show.
- Groomers must be able to see a summary dashboard for bookings and revenue.
- Groomers must be able to update booking outcomes quickly on desktop, tablet, and mobile.
- Groomers should be able to perform bulk status updates where operationally useful.

## Localization Requirements

- The system must support both Thai and English for system-managed UI on customer and merchant surfaces.
- The system must support both Thai and English for transactional notifications and booking-state copy.
- The system should persist a user language preference or honor device language where appropriate.
- The product should avoid hardcoded single-language UI strings.
- Whether merchant-generated content must be bilingual in V1 remains an explicit product decision.

## No-Show and Booking Integrity Requirements

These are directly inspired by Chope's anti-no-show workflow for restaurants and should be treated as product requirements, not optional extras.

Source:

- [Chope: Reducing No Show](https://restaurants.chope.co/singapore/restaurant-no-show/)

### Verification and confirmation

- The system must support automated reminder messages before the appointment.
- The system must support reconfirmation prompts before the appointment.
- The system must support OTP or equivalent phone verification for bookings where authenticity risk is high.

### Payments protection

- The system must support deposits and/or card holds.
- The system must support these protections for both online bookings and merchant-entered offline bookings.
- The system must support sending a secure payment link when the merchant captures a booking from phone, LINE, Instagram, Facebook, or walk-in channels.
- The system must use tokenized payment handling so merchants do not access raw card details.

### Arrival and no-show handling

- The system must support a merchant-configurable grace period for late arrival.
- The system must let merchants mark a customer as arrived, late, cancelled, or no-show.
- The system must define how payment protection changes for each outcome:
  - confirmed and arrived
  - cancelled in time
  - late cancellation
  - late arrival
  - no-show
- The system should define a post-appointment editing window during which merchants can correct booking outcomes.

### Schedule integrity

- Offline bookings must be entered into the same canonical schedule as online bookings.
- A slot cannot be considered truly blocked unless required verification and payment conditions are met.
- Merchants must be able to create an offline booking inside the system and immediately trigger follow-up verification and payment steps.

## Reference Requirements From Grab Help

Source:

- [Grab Help Centre: How to manage Chope bookings](https://help.grab.com/merchant/en-th/40001016)

Requirements derived from that article:

- The product should support a formal operational window after appointment time for correcting booking status.
- The product should support both single-booking and bulk status edits.
- The product should support fast status changes from multiple merchant surfaces, not only from a desktop admin panel.
- The product should treat no-show handling and booking edits as normal day-to-day operations, not as exception-only support tasks.

## Non-Goals for V1

- Home-service dispatch logistics
- Loyalty points and coupon ecosystem
- Content-heavy discovery and editorial features
- Broad citywide rollout before supply density is proven
- Deep public review moderation systems

## Open Product Decisions

- Which services are always instant-bookable?
- What exact rules trigger request-and-confirm mode?
- Which payment protection model should be default in Thailand: deposit, hold, or service-type-based rules?
- What is the best reminder schedule: 24 hours, same day, or both?
- How much merchant setup is acceptable before the product feels heavier than LINE?
- What should the merchant status-correction window be after an appointment has passed?
