# Brand And Design System Seed Prompt

## When To Use

Paste this into Claude Design **before** you make the customer, merchant, or internal operations prototypes if you want a coherent visual system and a shared demo language across all artifacts.

## Prompt

```text
Create a complete starter design system for a Bangkok-first pet grooming booking platform.

The product is not a playful generic pet marketplace. It is a premium, trust-first booking system that helps busy Bangkok pet owners book reliable in-shop grooming appointments in under 60 seconds while giving independent grooming shops a truthful schedule, fewer no-shows, and less back-and-forth over LINE, Instagram, Facebook, and phone calls.

I want a design system that feels:
- premium but not luxury-brand precious
- warm and human, but operationally serious
- modern and polished, but not generic SaaS purple
- suitable for a CEO demo, boardroom review, and future product direction discussion

Use these product truths as the foundation:
- launch market is Bangkok
- customer app is mobile-first
- merchant surface is desktop/tablet-first
- in-shop grooming and bathing only
- one booking = one pet + one primary service template + optional fixed add-ons
- routine services may be instantly bookable
- higher-variance cases must route to request-confirm
- payment protection is part of trust, not a hidden billing trick
- system-managed UI must support Thai and English

Build the design system with:

1. Brand direction
- primary brand personality adjectives
- secondary supporting adjectives
- visual metaphor direction
- what this brand is NOT

2. Color system
- define a full color palette with named roles, not random swatches
- include primary, secondary, accent, success, warning, danger, neutral, surface, border, and interactive states
- favor calm premium tones that can work for trust-sensitive payments and scheduling
- avoid childish pet-app cliches
- avoid default AI purple

3. Typography system
- choose a headline style, body style, label style, numeric/data style, and deck/presentation style
- the typography should feel strong enough for executive presentations and soft enough for consumer flows
- define hierarchy for display, h1, h2, h3, body, caption, microcopy, and table values

4. Component language
- buttons
- segmented controls
- chips / tags
- cards
- search bars
- scheduling cells
- timeline/status chips
- alert banners
- bottom sheets
- desktop side panels
- deck title slides
- one-pager summary blocks

5. Product-specific semantic tokens
Define visual semantics for:
- instant booking
- pending verification
- pending merchant confirmation
- confirmed
- arrived
- in service
- completed
- cancelled by customer
- cancelled by merchant
- no-show
- payment hold
- deposit required
- payment issue

6. Layout system
- mobile spacing rhythm
- desktop/tablet spacing rhythm
- card density for customer-facing screens
- board density for merchant operations
- guidance for deck slides vs. app UI

7. Iconography and illustration direction
- icon style
- when to use photography, illustration, or product UI only
- what hero imagery should feel like
- how to represent pets without turning the product into a cartoon

8. Motion direction
- light, premium, restrained
- state transitions should communicate trust and clarity
- avoid playful bouncing or gimmicky animation

9. Deliverables
Please generate:
- a design principles page
- a color and typography page
- a core components page
- a booking-state semantics page
- a sample customer mobile screen
- a sample merchant desktop screen
- a sample CEO deck title slide

10. Output quality bar
- everything should feel like one company
- nothing should look like generic AI boilerplate
- the system should be polished enough that later screens generated from it feel consistent and executive-ready

Do not make this feel like:
- a dog-walking app
- a playful social pet community
- a coupon-heavy marketplace
- a Figma community template

Do make it feel like:
- a modern product company with high trust standards
- a launch slice that could realistically be pitched to investors, operators, and enterprise-minded merchants

After generating the design system, show me:
- the brand principles
- the system pages
- 2 alternate visual directions

One alternate should lean more premium-editorial.
The other should lean more operational-product.

Label clearly which direction you recommend for a CEO and stakeholder demo, and why.
```

## Good Follow-Ups

- "Merge the premium-editorial and operational-product directions into one stronger system."
- "Make the merchant UI slightly more data-dense without losing polish."
- "Make the customer mobile UI feel more Bangkok-urban and less global-generic."
