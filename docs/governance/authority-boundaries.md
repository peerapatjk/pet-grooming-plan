# Authority Boundaries

This file is the canonical source for which artifacts own which decisions in this repository.

Use it whenever two docs appear to overlap. If a local README summary conflicts with this file, the README summary is wrong and must be updated.

## Purpose

The repo already has strong content. The main quality risk is not missing prose. It is decision drift caused by multiple artifacts restating the same boundary in different words.

This file makes those boundaries explicit.

## Normative vs Supporting Artifacts

| Artifact | Owns | May Refine | Must Not Do Alone |
| --- | --- | --- | --- |
| [../launch-canon.md](../launch-canon.md) | concise cross-folder summary of the current launch slice and shared policy posture | README summaries and prototype briefs may restate it in shorter form | no other artifact may quietly override launch-slice policy without updating `launch-canon.md` in the same change |
| [../../idea-refine/](../../idea-refine/README.md) | opportunity framing, hypotheses, option exploration, and pre-lock recommendations | prototype scope and spec assumptions may inherit its direction | it does not create implementation authority on its own |
| [../../spec-driven-development/spec.md](../../spec-driven-development/spec.md) | detailed product behavior, state model, and implementation contract | plan, tasks, and prototype briefs may operationalize it | ideation notes, prompts, or task docs may not redefine detailed behavior alone |
| [../../spec-driven-development/requirements.md](../../spec-driven-development/requirements.md) | supporting requirements and cross-functional obligations | plan and readiness docs may translate it into work | it must not contradict the spec or become a second behavior contract |
| [../../spec-driven-development/plan.md](../../spec-driven-development/plan.md) | sequencing, risks, checkpoints, and implementation order | tasks may decompose it into smaller work | it must not redefine product scope or policy on its own |
| [../../planning-and-task-breakdown/tasks.md](../../planning-and-task-breakdown/tasks.md) | execution-ready decomposition, dependencies, and verification intent | tickets and workstreams may split tasks further | it must not introduce new scope, policy, or fake dependencies |
| [../product/](../product/README.md) | prototype briefs, pilot framing, and discovery-support assets | prompt packs and review sessions may translate them into demos | they must not expand launch-slice policy or implementation truth |
| [../../prototype-prompts/](../../prototype-prompts/README.md) | prompt wording and demo packaging inside approved scope | generated artifacts may vary presentation and visual style | prompts must not invent product rules, scope, or launch claims |
| [../../spec-driven-development/stakeholder-readiness.md](../../spec-driven-development/stakeholder-readiness.md) | stakeholder-readiness policy, rubric, and required packet types | readiness packet docs may operationalize it | status files must not redefine criteria |
| [../../spec-driven-development/stakeholder-readiness-status.md](../../spec-driven-development/stakeholder-readiness-status.md) | current readiness snapshot, blockers, owners, and waivers | packet docs may supply evidence and dates | it must not become a second policy doc |
| [../readiness/](../readiness/README.md) | concrete launch-packet templates and packet contents by function group | stakeholders may fill in owners, evidence, and dates | these docs must not redefine the stakeholder rubric without updating stakeholder-readiness.md |

## Decision Ownership Matrix

| Decision area | Primary authority | Supporting artifacts | Approval owner |
| --- | --- | --- | --- |
| Launch-slice scope, non-goals, and wedge | [../launch-canon.md](../launch-canon.md) plus [../../spec-driven-development/spec.md](../../spec-driven-development/spec.md) | `idea-refine/`, `docs/product/`, `prototype-prompts/`, `tasks.md` | Product / GM with cross-functional review |
| Detailed booking, payment, timeout, and status behavior | [../../spec-driven-development/spec.md](../../spec-driven-development/spec.md) | [../../spec-driven-development/requirements.md](../../spec-driven-development/requirements.md), [../../spec-driven-development/plan.md](../../spec-driven-development/plan.md), [../../planning-and-task-breakdown/tasks.md](../../planning-and-task-breakdown/tasks.md) | Product + Engineering |
| Prototype and pilot framing | [../product/README.md](../product/README.md) and its companion briefs | [../../prototype-prompts/README.md](../../prototype-prompts/README.md), [../../idea-refine/pilot-decision-gate.md](../../idea-refine/pilot-decision-gate.md) | Product + Design |
| Task sequencing and delivery checkpoints | [../../spec-driven-development/plan.md](../../spec-driven-development/plan.md) and [../../planning-and-task-breakdown/tasks.md](../../planning-and-task-breakdown/tasks.md) | workflow status, readiness packets, future tickets | Product + Engineering |
| Stakeholder signoff rules and launch packets | [../../spec-driven-development/stakeholder-readiness.md](../../spec-driven-development/stakeholder-readiness.md) plus [../readiness/README.md](../readiness/README.md) | [../../spec-driven-development/stakeholder-readiness-status.md](../../spec-driven-development/stakeholder-readiness-status.md) | Product / GM plus function owners |
| Repo process, promotion criteria, and traceability | this folder | all lane READMEs | Repo maintainers |

## Conflict Rule

When two artifacts seem to disagree:

1. Start with the highest-authority artifact in the tables above.
2. Update the lower-authority artifact to match.
3. If the higher-authority artifact is wrong, update it first, then update every downstream artifact named in [change-control-checklist.md](change-control-checklist.md).

Do not leave “temporary” divergence in place.

## Summary Rule

Folder READMEs should summarize authority in one or two lines and link back here.

They should not create alternate versions of the boundary rules in custom prose.
