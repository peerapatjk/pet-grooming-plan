# Terminology Canon

Use these terms consistently across the repo.

The goal is not literary variety. The goal is to keep product, planning, and prompt artifacts from drifting into slightly different systems.

## Core Product Terms

| Canonical term | Use it for | Avoid or clarify |
| --- | --- | --- |
| `customer` | the pet owner using the booking experience | `user` when the distinction between customer and internal operator matters |
| `merchant` | the business side of the platform, usually an independent grooming shop | `partner`, `salon`, or `vendor` unless the business/legal context truly requires it |
| `grooming shop` | the real-world merchant business or location | using `merchant` when you specifically mean the physical shop context |
| `groomer` | the individual service provider or staff member | using it as a synonym for the whole merchant business |
| `launch wedge` | the target market and operator segment chosen first | using it as a synonym for scope or feature set |
| `launch slice` | the feature and policy boundary for the first release | `MVP` when you specifically mean the narrower first-release subset |
| `full MVP roadmap` | the broader capability set after launch-slice validation | using `launch slice` for deferred work |
| `booking unit` | one pet plus one primary service template, plus any allowed fixed add-ons | `appointment` when the one-pet, one-service rule matters |
| `service template` | the merchant-defined service with duration and price logic | `package` unless bundled flows are explicitly in scope later |
| `fixed add-on` | a merchant-defined add-on allowed inside the same launch booking unit | freeform bundled services |
| `offline-originated booking` | a booking created from phone, LINE, walk-in, or similar off-app demand but recorded in-system | `manual booking` when the origin channel matters |
| `canonical schedule` | the single source of truth for capacity-consuming bookings | `calendar` or `board` when you mean the data model rather than the UI |

## Booking And State Terms

| Canonical term | Use it for | Avoid or clarify |
| --- | --- | --- |
| `instant booking` | a truthful booking path that can confirm without merchant review | `auto-confirm` unless you are discussing a system implementation detail |
| `request-confirm` | the booking mode that requires merchant review | `manual booking` or `request booking` unless the distinction is explicit |
| `pending_verification` | a pre-confirmation state waiting on OTP or payment-related verification | generic `pending` |
| `pending_merchant_confirmation` | a pre-confirmation state waiting on merchant action | generic `pending` |
| `declined_by_merchant` | a request-confirm booking rejected by the merchant | calling it `cancelled` |
| `merchant-cancelled confirmed booking` | a confirmed booking later cancelled by the merchant with an explicit reason | conflating it with a merchant decline of a request |
| `provisional hold` | temporary inventory commitment for a booking still waiting on required action | `reserved` unless the temporary nature is explicit |
| `correction window` | the post-appointment period during which merchants may correct final outcome status | `grace period` |
| `grace period` | the late-arrival tolerance before no-show handling changes | `correction window` |
| `late-success recovery` | the auditable handling path for OTP or payment success events that arrive after expiry | silently re-confirming the booking |

## Surface And Workflow Terms

| Canonical term | Use it for | Avoid or clarify |
| --- | --- | --- |
| `landing page` | the static acquisition site with app-download CTA only | `website booking flow` or any language that implies a second product surface |
| `customer surface` | the customer-facing product experience | `frontend` when you specifically mean the business surface |
| `merchant surface` | the merchant-facing booking and operations workspace | `admin` if the audience is actually merchants, not internal staff |
| `operations control plane` | the internal company surface for exception handling, overrides, recovery, and trust-event review | `merchant admin`, which blurs internal and merchant tools |
| `readiness packet` | the evidence package for a stakeholder function | `spec` or `status doc` |

## Lane Terms

| Canonical term | Use it for | Avoid or clarify |
| --- | --- | --- |
| `exploratory artifact` | a document in `idea-refine/` or other discovery-support work that frames and tests ideas | treating it as an implementation contract |
| `normative artifact` | a source-of-truth requirement or spec document | vague `main doc` language |
| `planning artifact` | a plan or task-decomposition document | using it as the authority for product policy |
| `prompt artifact` | a controlled downstream prompt in `prototype-prompts/` | treating prompts as source-of-truth product rules |
| `live status snapshot` | current owners, blockers, dates, and waivers | using it as the place to redefine policy |

## Update Rule

When a new concept becomes important enough to appear across multiple folders:

1. add it here
2. update the affected high-authority artifact
3. update downstream docs using the same canonical term in the same change
