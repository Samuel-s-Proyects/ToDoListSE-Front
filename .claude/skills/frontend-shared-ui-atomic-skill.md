# Frontend Shared UI and Atomic Design Skill

## Purpose

Use this skill whenever you create or modify reusable UI in ToDoListSE.

The goal is to keep shared UI reusable, accessible, polished, and disciplined without turning the project into an overengineered design system.

## Core rule

Use **atomic design tactically only inside `shared/ui`**.

Feature-first remains the main architectural rule.

## Shared UI structure

```text
shared/ui/
  atoms/
  molecules/
  organisms/
```

## Family-based organization rule

Do not create folders by tiny visual variants.

Bad:

- `primary-button/`
- `secondary-button/`
- `danger-button/`

Good:

- `atoms/buttons/`
- `atoms/inputs/`
- `molecules/states/`
- `organisms/feedback-alerts/`

Variants must be expressed through:

- component inputs
- enums
- style modifiers
- tokens
- configuration maps

## Shared UI boundaries

Shared UI must be:

- reusable
- domain-agnostic
- accessible
- style-system compliant

Shared UI must not know:

- task business rules
- auth flow orchestration
- categories business meaning

## Minimum reusable UI expectations

### Atoms

- buttons family
- inputs family
- icons family using FontAwesome SVG
- spinners
- badges/chips where useful

### Molecules

- empty state
- loading state
- error state
- search composition
- selector composition

### Organisms

- feedback alerts
- confirm dialog shell
- headers or reusable shells when appropriate

## Library discipline

Use Angular Material and Bootstrap with control.

### Angular Material

Use it as a practical implementation layer for:

- dialogs
- form controls
- tables
- interaction primitives

### Bootstrap

Use it for:

- grid
- layout support
- utility-level support where consistent

### Icons

All icons must use FontAwesome SVG.

Forbidden:

- Unicode icons
- random mixed icon libraries
- uncontrolled full-library icon loading

## Reuse rules

Before creating a reusable component, ask:

- is there already a shared component that solves this?
- can an existing shared component be extended safely?
- is this actually feature-specific instead of shared?

## Accessibility rules

Every shared primitive must be keyboard-friendly and accessible.

Required concerns:

- focus visibility
- semantic roles where needed
- accessible dialog behavior
- proper labels and feedback
- screen-reader-friendly states when relevant

## When to apply this skill

Use this skill whenever:

- creating shared buttons/inputs/dialogs/states
- deciding whether a component belongs to shared or a feature
- defining reusable UI patterns
- reviewing UI consistency and accessibility