# Frontend Quality, Testing, and Definition of Done

## Testing strategy

Use the most standard Angular 17 testing stack available in the project setup.

All implemented frontend work must include meaningful unit testing.

Prioritize testing for:

- services
- forms
- guards/interceptors where important
- critical components
- feature flows with meaningful logic

Do not overinvest in trivial tests that add little value.

## Quality rules

Every implementation must be reviewed against these checkpoints:

### Architecture

- does it respect feature-first organization?
- does it avoid putting feature logic into core?
- does it avoid putting domain-specific logic into shared?
- does it keep layouts clean?

### UI reuse

- did it reuse shared UI where appropriate?
- did it avoid duplicating buttons/inputs/feedback patterns?
- did it keep atomic shared UI tactical and not excessive?

### Styling

- did it use official variables/tokens/mixins?
- did it avoid inventing local style systems?
- did it remain mobile-first?
- did it avoid arbitrary media queries?

### i18n

- are visible strings translatable?
- are there no accidental hardcoded UI strings?
- are translation keys semantic and maintainable?

### Accessibility

- keyboard navigation works
- focus states are clear
- forms are accessible
- dialogs are accessible
- tables and interactions remain usable by keyboard

### HTTP and state

- no direct HttpClient in components
- errors normalized correctly
- JWT/API key handled through interceptors/services
- observables/services used clearly

### Performance and UX

- loading, empty, and error states are handled
- `trackBy` is used in lists
- templates stay simple
- no unnecessary complexity has been introduced

### Testing

- are there meaningful tests for the new behavior?
- are critical flows covered?

## Definition of Done

A frontend task is done only if:

- it works
- it respects challenge requirements
- it respects architecture
- it respects shared UI rules
- it respects styling system rules
- it respects i18n rules
- it respects accessibility
- it includes appropriate tests
- it does not introduce avoidable complexity

## Code conventions

Rules:

- files in kebab-case
- types/classes in PascalCase
- variables/functions in camelCase
- keep templates readable
- avoid heavy business logic in templates
- avoid unnecessary comments
- never use Unicode icons

## Delivery discipline

Do not consider a task finished merely because the UI appears.

Each solution must be robust, challenge-aligned, typed, tested, and architecturally consistent.