# Frontend UI System Instructions

## Objective

Create a reusable, polished UI system that supports the application without turning into an overengineered design framework.

## Shared UI strategy

Use tactical atomic design only inside `shared/ui`.

Atomic design is a support system, not the main architectural strategy.

Feature-first remains the dominant rule.

## Atomic organization rule

Do not create a separate folder for every small visual variant.

Bad example:

- `primary-button/`
- `secondary-button/`
- `danger-button/`

Correct approach:

- `atoms/buttons/`
- `atoms/inputs/`
- `molecules/states/`
- `organisms/feedback-alerts/`

Variants must be expressed through:

- inputs
- enums
- style modifiers
- tokens
- config maps

## Minimum shared UI base

The system must provide a solid shared base for common experiences.

Recommended minimum:

### Atoms

- button base family
- icon button
- input base family
- textarea/select where relevant
- icon wrappers using FontAwesome SVG
- badge/chip helpers
- spinner

### Molecules

- empty state
- loading state
- error state
- search field composition
- category selector composition
- filter summary chips if relevant

### Organisms

- feedback alert family
- confirmation dialog shell
- app header pieces
- reusable form/dialog wrappers where helpful

## Library usage rules

### Angular Material

Allowed as implementation support for:

- dialogs
- form field primitives
- inputs/selects
- table primitives
- paginator-like UI patterns if useful
- menu/snackbar-like utilities if needed

### Bootstrap

Allowed for:

- grid
- layout helpers
- utility support where consistent with the system

### FontAwesome SVG

All icons must use FontAwesome SVG.

Forbidden:

- Unicode icons
- mixing random icon libraries
- using full icon library loading when SVG imports can be controlled

## Buttons and inputs

Buttons and inputs are part of the official shared UI system.

Rules:

- features must use shared buttons and shared inputs
- do not redesign button/input foundations inside features
- width behavior should usually come from wrappers, not from rewriting the base component
- states must be standardized

Inputs must support when relevant:

- label
- hint
- error state
- disabled state
- translated feedback

## Visual states

The UI system must clearly distinguish:

- skeleton-like structural loading if used
- spinner/request loading
- empty state
- error state
- success/warning/info/error feedback

Use consistent patterns across the application.

## Motion rules

The application should feel animated and polished, but motion must stay disciplined.

Rules:

- centralize transition behavior in SCSS mixins
- avoid hardcoded transition values spread across components
- rely on Angular Material motion where already provided
- prefer tasteful transitions over excessive animation

## Global scrollbar styling

Scrollbar styling must be global.

Requirements:

- polished appearance
- theme-aware
- no per-component scrollbar hacks unless absolutely necessary

## Accessibility

Every shared UI primitive must be built with accessibility in mind.

Rules:

- keyboard accessibility
- focus visibility
- semantic roles where necessary
- screen-reader-friendly feedback where appropriate
- accessible dialogs and controls

## Reuse policy

Before creating a new reusable UI component, check whether:

- an existing shared component already solves it
- a shared component can be extended safely
- the new UI belongs to a feature instead of shared

Do not push domain-specific components into shared just because they look reusable.