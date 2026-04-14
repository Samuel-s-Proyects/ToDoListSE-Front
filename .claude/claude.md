# Claude Project Instructions

You are building the **frontend** for the project **ToDoListSE**.

Your job is not only to make the application work, but to make it feel deliberate, scalable, polished, maintainable, and aligned with the technical challenge requirements.

At every step, prioritize:

- correctness
- architecture consistency
- maintainability
- UX polish
- accessibility
- strong typing
- testability
- clean reusable UI
- alignment with the challenge requirements

The frontend must always satisfy the challenge first, then add improvements only when they do not weaken the core requirements.

## Core product scope

The challenge requires:

- a login flow
- a main tasks page
- CRUD for tasks
- mark task as completed/pending
- responsive design
- strong frontend architecture
- unit testing
- proper use of observables, services, routing, guards, binding, directives, trackBy, TypeScript, and styling consistency

This frontend will also include the following controlled enhancements:

- a public Home page with strong UX/UI
- a categories CRUD
- task filters
- cursor-based pagination for tasks
- dark/light mode
- i18n with Spanish and English
- polished dialogs and feedback states
- JWT handling in frontend
- API key injection through interceptors
- Firebase Hosting readiness
- CI/CD readiness

## Non-negotiable development principles

Always follow these principles:

- DRY
- KISS
- YAGNI
- strong typing
- separation of responsibilities
- feature-first organization
- shared UI reuse before creating new components
- no hardcoded visible strings
- no direct HttpClient usage from components
- no business logic in layouts
- no feature-specific logic inside core
- no inline styles unless truly necessary
- no Unicode icons
- no unnecessary comments in code
- no invented mixins or variables if the design system already provides one

Only use comments in code when they are truly necessary to explain a non-obvious decision.

## High-level architecture

Use Angular 17 with **NgModules as the default architectural standard**.

Do not use standalone components by default. Only use standalone if there is a strong technical reason and it clearly improves the implementation.

The frontend architecture must be:

- `core`
- `layout`
- `shared`
- `features`
- `styles`

Use **feature-first architecture** as the primary organization rule.

Use **atomic design tactically** only inside `shared/ui`.

Atomic design must not dominate the project structure. Feature-first is the main strategy.

## Layout strategy

Use two official shared layouts:

- `public-layout`
- `private-layout`

Rules:

- all public routes must live under `public-layout`
- all authenticated/private routes must live under `private-layout`
- layouts handle structure, wrappers, navigation, composition, and shell behavior
- layouts must not contain business logic

## Features to implement

The frontend must include these features:

- `home`
- `auth`
- `tasks`
- `categories`

### Home

This is an extra page and must feel polished.

Requirements:

- strong UX/UI
- responsive
- keyboard accessible
- animated through centralized transition mixins only
- basic SEO metadata
- excellent loading/empty/error discipline where applicable

### Auth

Follow the challenge first.

Primary visible flow:

- email-only login
- if the user exists, enter the app
- if the user does not exist or credentials are invalid according to backend flow, show a highly polished popup/dialog asking whether the user wants to create an account and enter directly

Important:

- do not introduce a separate Register page in this version
- the dialog flow must still satisfy the challenge requirement
- authentication tokens must never be visible to the user
- JWT must be handled through services/interceptors/guards only

### Tasks

Implement full CRUD.

Requirements:

- list tasks
- create task
- edit task
- delete task
- mark completed/pending
- task filters
- search
- cursor-based pagination
- categories integration
- loading/error/empty states
- proper `trackBy`
- optimized binding

### Categories

Implement full CRUD for categories.

Use categories in task forms and filters.

## Routing

Use RouterModule organization carefully.

Required route intent:

- `/` -> home
- `/login`
- `/tasks`
- `/categories`

Apply:

- route guards
- lazy loading by feature
- clear routing module boundaries

## State and data flow

Do not introduce NgRx by default.

Use:

- services
- observables
- RxJS
- feature data-access services

You may use a lightweight facade pattern where it improves clarity, but do not overengineer.

Use async pipe wherever appropriate.

Prefer one-way data flow by default. Only use two-way binding when it is truly the correct tool.

## HTTP rules

No component may call `HttpClient` directly.

All HTTP communication must live in:

- feature `data-access`
- approved shared abstractions in `core/http` if needed

Use interceptors for:

- JWT injection
- API key injection
- request metadata if needed
- timeout handling
- error normalization
- optional global loading coordination

JWT requirements:

- store in `sessionStorage`
- no refresh token in this version
- keep the solution simple and well done

API key requirements:

- inject through an interceptor
- read from environment configuration
- never expose as visible UI logic

Use secure handling of secrets and tokens. Never hardcode real secrets.

## Error handling

Frontend and backend must communicate errors clearly.

Standard frontend expectations:

- normalized error shape
- localized user-facing messages
- reliable fallback behavior
- no raw transport errors leaking into components

Components should work with predictable error objects, not raw HTTP errors.

When possible, use backend error codes as the driver of UI behavior.

## Forms

Use Reactive Forms everywhere.

Every form must support:

- validation
- translated error messages
- translated labels/placeholders/hints
- disabled state
- loading state while submitting
- submit blocking to avoid double click
- backend error handling
- success feedback when relevant

## UI system

Use Angular Material and Bootstrap together with discipline.

Rules:

- Angular Material may be used for practical building blocks such as dialogs, tables, form controls, and interaction primitives
- Bootstrap may be used for layout/grid/utilities where appropriate
- shared UI abstractions must dominate over raw library usage
- do not redesign base buttons and inputs inside features
- all icons must use FontAwesome SVG
- never use Unicode icons

## Shared UI architecture

Organize reusable UI inside `shared/ui` using tactical atomic design.

Do not organize atomic UI by isolated visual variants like `primary-button` and `secondary-button` folders.

Organize by component families instead.

Examples:

- `shared/ui/atoms/buttons/`
- `shared/ui/atoms/inputs/`
- `shared/ui/molecules/states/`
- `shared/ui/organisms/feedback-alerts/`

Variants must be handled by inputs, config, styling, and tokens, not by exploding folders into tiny variant-specific components.

## Styling system

The project must use SCSS with a disciplined design system.

Rules:

- mobile-first
- explicit `@use`
- never use `@use ... as *`
- no arbitrary media queries outside the official mixin system
- no arbitrary spacing outside the official spacing scale unless justified
- colors and theme values must come from the official variables/tokens system
- do not invent variables or mixins if the system already provides one

The styles layer must include, at minimum:

- `_variables.scss`
- `_mixins.scss`
- `_functions.scss`
- `_breakpoints.scss`
- `_tokens.scss`
- `_themes.scss`
- `globals.scss`

Use centralized variables and mixins that actually exist.

If a variable or mixin does not exist yet, create it in the correct global styles layer before using it.

Never fake a design token locally inside a feature if it belongs to the system.

## Themes

Implement light and dark mode support from the beginning.

Rules:

- light mode is default
- persist preference
- apply theme using `data-theme` on `html`
- use CSS custom properties for runtime theming
- SCSS should organize structure and tokens

## Motion and transitions

All transitions and repeated motion patterns must be centralized.

Use SCSS mixins for transition patterns.

Do not scatter animation/transition values across components.

Do not implement a complex Angular animations strategy unless absolutely needed.

Rely on:

- centralized SCSS transition mixins
- built-in Angular Material motion where already provided

## Scrollbar

Scrollbar styling must be handled globally, not per component.

It should look polished and consistent with the theme.

## i18n

Implement a lightweight but correct i18n system.

Use Transloco.

Requirements:

- Spanish default
- English secondary language
- visible strings must be translatable
- feature namespaces
- no hardcoded UI strings
- keep translation keys semantic and maintainable
- avoid unnecessary translation complexity

## SEO and accessibility

Implement these proportionally and correctly.

SEO requirements:

- basic metadata where relevant
- title
- meta description
- canonical when it makes sense
- translated metadata where applicable
- JSON-LD only where it is clean and useful, especially Home

Accessibility requirements:

- keyboard navigation
- semantic structure
- proper labels
- focus states
- accessible feedback states
- accessible dialogs
- alt text when applicable
- usable forms and tables by keyboard

## Testing

All implemented frontend work must include unit testing.

Use the most standard Angular 17 testing stack available in the project setup.

Minimum testing expectations:

- services
- critical components
- forms
- guards/interceptors where relevant
- core flows

Do not waste time testing trivial visual wrappers if they add little value.

Test meaningful behavior.

## Deployment and CI/CD

Prepare the frontend for Firebase Hosting.

Also prepare a practical CI/CD path with good practices.

At minimum, the pipeline should be designed to support:

- install
- lint
- test
- build
- Firebase deploy

## Delivery mindset

A task is not complete just because the screen renders.

A task is only complete when:

- it satisfies the challenge requirements
- it respects architecture
- it uses shared UI correctly
- it does not bypass styles/tokens/mixins rules
- it respects i18n rules
- it respects accessibility
- it includes appropriate tests
- it does not introduce unnecessary complexity

Always prefer a solution that is:

- clean
- elegant
- consistent
- typed
- testable
- scalable
- challenge-aligned