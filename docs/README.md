# Documentation Map

This repository contains ideation, specification, planning, task breakdown, prototype prompting, and supporting product briefs for the Bangkok-first pet grooming booking platform.

Use this file as the repo spine. Its job is to make the artifact system explicit so contributors do not have to infer what is authoritative, what is exploratory, and what comes next.

## Document Lanes

Two lanes run through this repo:

1. Decision lane

`idea-refine/` -> `spec-driven-development/` -> `planning-and-task-breakdown/`

Use this lane to move from idea to formal scope, then to execution-ready work decomposition.

2. Discovery and demo lane

`docs/product/` -> `prototype-prompts/` -> review sessions -> `idea-refine/pilot-decision-gate.md`

Use this lane to generate prototypes, run stakeholder reviews, and feed evidence back into the decision lane before deep implementation lock.

## Document Maturity Model

Use the following shared vocabulary when describing document maturity:

- `draft` — working document; content is still being shaped
- `reviewed` — internally coherent and ready for downstream review
- `locked` — approved for downstream work unless an explicit decision reopens it
- `evidence-backed` — validated by external research, pilot evidence, user testing, or operational review
- `superseded` — kept for history, but no longer authoritative

Not every artifact should be `evidence-backed` before implementation. The point is to make maturity explicit rather than implied.

## Authority Rules

- [launch-canon.md](launch-canon.md) is the stable cross-folder summary of the current launch rules.
- [../spec-driven-development/spec.md](../spec-driven-development/spec.md) is the formal implementation contract when detailed product behavior matters.
- [../spec-driven-development/plan.md](../spec-driven-development/plan.md) owns implementation sequencing, risks, and checkpoints.
- [../planning-and-task-breakdown/tasks.md](../planning-and-task-breakdown/tasks.md) owns execution decomposition into verifiable tasks.
- [product/README.md](product/README.md) and [../prototype-prompts/README.md](../prototype-prompts/README.md) define the prototype and demo handoff, but they must stay inside the launch canon and formal spec.
- [../idea-refine/README.md](../idea-refine/README.md) is exploratory by design. Nothing in `idea-refine/` is implementation authority until it is promoted forward.

When a pilot or review session locks a policy decision, update the launch canon and every affected downstream artifact in the same change.

## Artifact Inventory

| Folder | Start Here | Maturity | Use It For | Do Not Use It For |
| --- | --- | --- | --- | --- |
| [`idea-refine/`](../idea-refine/README.md) | [`idea-refine/README.md`](../idea-refine/README.md) | `reviewed` | problem framing, hypothesis shaping, decision-gate prep | final implementation authority |
| [`docs/product/`](product/README.md) | [`docs/product/README.md`](product/README.md) | `reviewed` | prototype briefs, pilot plan, analytics/eval framing | expanding scope beyond the launch canon |
| [`spec-driven-development/`](../spec-driven-development/README.md) | [`spec-driven-development/README.md`](../spec-driven-development/README.md) | `reviewed` | formal spec, requirements, implementation plan, stakeholder readiness | exploratory ideation |
| [`planning-and-task-breakdown/`](../planning-and-task-breakdown/README.md) | [`planning-and-task-breakdown/README.md`](../planning-and-task-breakdown/README.md) | `reviewed` | execution-ready task decomposition | redefining product scope |
| [`prototype-prompts/`](../prototype-prompts/README.md) | [`prototype-prompts/README.md`](../prototype-prompts/README.md) | `reviewed` | Claude Design prompt execution and demo refinement | implementation truth or policy invention |

## Reading Paths

Use one of these paths depending on what you are trying to do:

- Orientation pass:
  [launch-canon.md](launch-canon.md) -> [../idea-refine/README.md](../idea-refine/README.md) -> [../spec-driven-development/README.md](../spec-driven-development/README.md)
- Prototype and stakeholder review pass:
  [product/README.md](product/README.md) -> [../prototype-prompts/README.md](../prototype-prompts/README.md) -> [../idea-refine/pilot-decision-gate.md](../idea-refine/pilot-decision-gate.md)
- Execution pass:
  [../spec-driven-development/spec.md](../spec-driven-development/spec.md) -> [../spec-driven-development/plan.md](../spec-driven-development/plan.md) -> [../planning-and-task-breakdown/tasks.md](../planning-and-task-breakdown/tasks.md)

## Product Brief To Prompt Crosswalk

The detailed product-brief to prompt mapping lives in:

- [product/README.md](product/README.md)
- [../prototype-prompts/README.md](../prototype-prompts/README.md)

Keep those two files aligned whenever a brief or prompt is added, renamed, or retired.
