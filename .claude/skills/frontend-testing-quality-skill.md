# Frontend Testing and Quality Skill

## Purpose

Use this skill whenever you add functionality, refactor code, or review whether a frontend task is really finished.

The goal is to ensure each delivery is challenge-aligned, tested, and architecturally correct.

## Testing standard

Use the most standard Angular 17 testing stack available in the project setup.

Every meaningful frontend implementation must include unit testing.

## Testing priorities

Prioritize tests for:

- services
- forms
- guards/interceptors where relevant
- critical components
- important feature flows

Do not overinvest in trivial tests with little value.

## Architecture review checklist

Before considering a task done, verify:

- feature-first structure respected
- no feature logic in core
- no domain logic in shared
- layouts remain clean
- routing boundaries stay clear

## UI review checklist

Verify:

- shared UI reused where appropriate
- no duplicate button/input foundations inside features
- consistent loading/error/empty states
- FontAwesome SVG used for icons
- no Unicode icons

## Styling review checklist

Verify:

- official variables/tokens/mixins used
- no invented local styling system when global one exists
- mobile-first respected
- no arbitrary media queries
- transitions centralized properly

## i18n/accessibility review checklist

Verify:

- no visible hardcoded strings
- translation keys remain semantic
- keyboard navigation works
- focus states are visible
- dialogs/forms remain accessible

## HTTP/state review checklist

Verify:

- no direct HttpClient in components
- JWT/API key handled via interceptors/services
- errors normalized properly
- observables/services used cleanly
- `trackBy` used in repeated lists where appropriate

## Definition of Done

A task is done only if:

- it works
- it satisfies the challenge requirement or approved enhancement scope
- it respects architecture
- it respects shared UI rules
- it respects styling rules
- it respects i18n and accessibility rules
- it includes appropriate tests
- it does not add avoidable complexity

## Code conventions

- files in kebab-case
- classes/types in PascalCase
- variables/functions in camelCase
- templates remain readable
- avoid heavy business logic in templates
- avoid unnecessary comments

## When to apply this skill

Use this skill whenever:

- implementing a feature
- reviewing a PR/task outcome
- deciding test scope
- validating whether something is truly complete