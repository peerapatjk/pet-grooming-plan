# Bangkok Pet Grooming Domain Research Summary

## Purpose

This tracked summary captures the highest-signal findings from the generated domain research artifact at:

- `_bmad-output/planning-artifacts/research/domain-bangkok-pet-grooming-booking-platform-research-2026-04-18.md`

Use this file when the planning docs need a durable, version-controlled reference for market, workflow, payments, and regulatory context.

## What Was Missing

The repo already had coherent ideation, spec, task, and prototype artifacts. The main missing piece was a current, source-cited domain layer to support:

- whether the Bangkok-first wedge is commercially plausible
- whether `instant` versus `request-confirm` matches local workflow reality
- whether payment protection is compatible with Thai payment behavior
- which legal and operational surfaces must be treated as launch work, not later cleanup

## Key Findings

### 1. The market is real, but the service layer is still fragmented

Thailand's Department of Business Development reports **THB 258,702.91 million** in 2023 pet-business revenue, with **THB 23,562.07 million** in `service and care`, plus **191** new `service and care` registrations in 2024.

Implication:

- there is enough economic substance for a focused grooming-services wedge
- the service segment is still much smaller than pet retail, which supports a narrow merchant wedge rather than a broad marketplace launch

Source:

- https://www.dbd.go.th/data-storage/attachment/48c38ffbeba4cc13e1e19fa10.pdf

### 2. Thailand is digitally ready for mobile booking, but LINE-shaped behavior still matters

DataReportal's 2025 Thailand report shows **91.2%** internet penetration and **56.0 million** LINE users. ETDA's `Thailand Internet User Behavior 2022` report shows sellers still rely heavily on conversational and social channels, with **Facebook 66.76%**, **e-marketplace 55.18%**, **LINE 32.05%**, and websites only **26.67%**.

Implication:

- a mobile-first product is viable
- the product still has to beat LINE/manual coordination, not just abstract booking friction

Sources:

- https://datareportal.com/reports/digital-2025-thailand
- https://www.etda.or.th/getattachment/78750426-4a58-4c36-85d3-d1c11c3db1f3/IUB-65-Final.pdf.aspx

### 3. Public merchant behavior supports the hybrid booking model

Local merchant sites reviewed in this pass still show fragmented booking behavior:

- Tonson Grooming uses a separate booking tool
- Paw House keeps LINE contact prominent
- SaiJai Pet Salon routes booking communication through LINE and states staff will confirm within 24 hours

Implication:

- the repo's `instant` plus `request-confirm` model is more honest than pretending the category already behaves like restaurant inventory
- merchant and internal ops surfaces are core product work, not secondary polish

Sources:

- https://www.tonsongrooming.com/
- https://pawhouse.pet/
- https://saijaipetsalon.com/booking/

### 4. Thai payment rails are ready for payment protection

The Bank of Thailand's January 2026 payment indicators show:

- **92.2 million** PromptPay registrations
- **79.9 million** PromptPay transactions per day
- **3,544 million** monthly internet and mobile banking transactions

Implication:

- the market is ready for digital payment-linked trust mechanics
- the real product problem is clarity and fairness around holds, deposits, refunds, forfeitures, and no-shows

Sources:

- https://www.bot.or.th/en/research-and-publications/reports/payment-data-indicators.html
- https://www.bot.or.th/content/dam/bot/documents/en/research-and-publications/reports/payment-report/payment-data-indicators/2026/202601_payment_indicator.pdf

### 5. The safest V1 payments posture is PSP-first, not wallet-first

BOT materials make clear that payment-system and payment-service operations sit inside a regulated oversight perimeter.

Implication:

- V1 should use licensed PSPs for holds, deposits, and refunds
- V1 should avoid looking like stored value, escrow, or a self-operated payment service

Source:

- https://www.bot.or.th/en/our-roles/payment-systems.html

### 6. Privacy, electronic records, and fair consumer communication are launch-slice requirements

Official DGA PDPA materials and ETDA's e-contract guidance mean this product must treat privacy notices, consent, recordkeeping, and auditability as part of the product definition. OCPB consumer-rights materials reinforce the need for clear pricing, cancellation, and refund language.

Implication:

- privacy and retention policy cannot be deferred
- customer-facing trust copy is part of compliance posture
- merchant actions that affect bookings must be explicitly recorded and reviewable

Sources:

- https://www.dga.or.th/document-sharing/pdpa/
- https://www.dga.or.th/wp-content/uploads/2024/04/25650622_%E0%B8%84%E0%B8%B9%E0%B9%88%E0%B8%A1%E0%B8%B7%E0%B8%AD-PDPA-%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%AD%E0%B8%9A%E0%B8%81%E0%B8%B2%E0%B8%A3-SMEs.pdf
- https://www.etda.or.th/th/Useful-Resource/Law_e-Contract.aspx
- https://www.ocpb.go.th/faqs.php

## Planning Implications

- `idea-refine/`: thesis is still directionally correct; the missing piece was external evidence, not ideation structure
- `docs/product/`: customer, merchant, and operations prototypes are aligned with local workflow reality
- `spec-driven-development/`: keep the explicit pending states, timeout rules, and payment-protection semantics
- `planning-and-task-breakdown/`: no major new task branch is required; existing lifecycle, ops, analytics, and payments work remains the right shape
- `prototype-prompts/`: future design prompts should treat LINE/manual coordination as the true incumbent behavior

## Still Unresolved

- no public Bangkok-specific market-share view for grooming booking software was found
- no Thailand grooming no-show benchmark was found in this pass
- specific PSP capabilities still need vendor validation
- merchant willingness to switch off LINE/manual workflows still needs direct pilot evidence

## Recommended Next Use

Use this summary plus the full generated research artifact to draft:

- Finance packet
- Legal / Risk / Privacy packet
- Marketing / Sales / BD packet
- External vendor validation packet
