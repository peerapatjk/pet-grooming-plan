# Pawpoint Content Canon

This file is the source of truth for copy, narrative claims, and prototype-state language in the `pet-grooming` handoff bundle.

## Product State

- Describe the package as a `prototype bundle`, `static prototype`, `concept package`, or `interactive narrative`.
- Do not describe the shipped HTML pages as a live production product.
- Customer, merchant, and ops pages are walkthrough surfaces. They show intended behavior, but interaction wiring is intentionally incomplete in this bundle.

## CTA Rules

- Prototype pages should link to real artifacts in `project/`, not fake app-store, legal, or signup destinations.
- When a real destination does not exist, say so directly in copy instead of using `#` links.
- Prototype marketing pages should point users to:
  - `Customer App.html`
  - `Merchant App.html`
  - `Ops Console.html`
  - `Index.html`
  - `Stakeholder One Pager.html`
  - `CEO Demo Deck.html`

## Language Support

- Primary launch languages in this package: Thai and English.
- Chinese appears only as a selected beta/future-facing capability in the customer prototype.
- Do not market the full package as fully localized in Chinese.
- Safe phrasing:
  - `Thai and English today`
  - `Selected Chinese beta`
  - `TH / EN primary · ZH beta on selected surfaces`

## Evidence Taxonomy

Use one of these labels whenever numbers or market claims appear in narrative artifacts:

- `Internal snapshot`
  - For network size, merchant count, onboarded pet parents, ops metrics, and other package-era operating numbers.
- `Modeled launch case`
  - For unit economics, contribution math, roadmap targets, and scenario planning.
- `Directional market estimate`
  - For TAM-style claims, market size, penetration, and adjacent-category estimates.
- `Composite interview line`
  - For stylized customer, merchant, or staff quotes that are representative but not verbatim transcripts.

## Canonical Prototype Snapshot

These values can be reused, but must stay labeled as internal or modeled where appropriate:

- Internal snapshot:
  - `41 live shops`
  - `180+ groomers`
  - `1,842 pet parents onboarded`
- Modeled launch case:
  - `~2.41M THB monthly GMV`
  - `+22 pt Saturday 14-day rebook retention`
  - `2.8% no-show rate vs ~19% discovery baseline`
  - `60 shops` as full-city density target
- Directional market estimate:
  - `2.5M urban pet households`
  - `4-5% annual pet ownership growth`
  - `veterinary wedge ~4x grooming`

If a claim cannot be labeled cleanly, remove it or rewrite it.

## Story Calendar

The UI surfaces use a single prototype story week:

- Current day: `Tue 14 Apr 2026`
- Current time: `13:52 ICT`
- Pending-request scenario: `Tue 14 Apr 2026 · 14:30`
- Confirmed booking scenario: `Wed 15 Apr 2026 · 10:30`
- Free-cancel cutoff for confirmed scenario: `Tue 14 Apr 2026 · 10:30`
- Rebook example: `Thu 14 May 2026 · 10:30`

When editing customer, merchant, ops, or design-system examples, keep dates aligned to this scenario unless a page explicitly uses a different documented story.

## Writing Standards

- Prefer `prototype`, `modeled`, `internal`, `directional`, `target`, or `composite` over implied certainty.
- Keep Shield copy precise:
  - `hold`, `authorisation`, and `capture` are not interchangeable.
  - Use `card hold, not a surprise charge` when explaining trust behavior.
- Avoid implying completed legal/compliance work unless that artifact exists.
- Avoid implying a public app-store launch unless the page is clearly a marketing prototype.
