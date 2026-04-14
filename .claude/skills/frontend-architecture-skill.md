# Frontend Architecture Skill

## Purpose

Use this skill whenever you create, refactor, or extend the frontend architecture of ToDoListSE.

The goal is to keep the Angular 17 frontend predictable, scalable, challenge-aligned, and easy to evolve.

## Primary architectural rule

Use **feature-first architecture** as the main organizational strategy.

Use **NgModules as the default standard**.

Use **atomic design tactically only inside `shared/ui`**.

Do not let atomic design take over the entire app structure.

## Official structure

```text
src/app/
  core/
  layout/
  shared/
  features/
```

## Core rules

### `core/`

Contains only cross-cutting app concerns.

Allowed:

- auth/session infrastructure
- interceptors
- guards
- app config
- global services
- global models
- theme support
- SEO support
- i18n bootstrapping

Forbidden:

- task-specific business logic
- category-specific orchestration
- page-specific logic
- reusable domain components that belong to features

### `layout/`

Contains layout shells only.

Official layouts:

- `public-layout`
- `private-layout`

Layouts may handle:

- app shell structure
- wrappers
- navigation composition
- containers

Layouts may not handle:

- business logic
- feature API logic
- feature state orchestration

### `shared/`

Contains reusable domain-agnostic assets.

Allowed:

- reusable UI
- directives
- pipes
- generic utils
- generic view helpers

Forbidden:

- feature business logic
- task orchestration
- category domain logic
- auth workflow orchestration

### `features/`

All business capabilities must live here.

Official features:

- `home`
- `auth`
- `tasks`
- `categories`

Each feature should follow a repeatable internal blueprint.

Suggested blueprint:

```text
feature-name/
  module/
  routing/
  pages/
  components/
  dialogs/
  data-access/
  models/
  i18n/
  seo/
```

## Feature design rules

- Pages orchestrate screen-level behavior
- Components support the feature UI
- Dialogs are local when feature-specific
- Data-access owns backend communication
- Models stay close to the feature
- i18n stays namespaced by feature

## Architectural decision mindset

Always prefer:

- clear boundaries
- low coupling
- local reasoning
- challenge alignment
- scalable repetition

Avoid:

- global dumping grounds
- architecture-by-folder-type across the whole app
- overengineering with patterns that add little value
- business logic leaking into layout or shared

## Routing boundaries

Use lazy loading at feature boundaries.

Expected route intent:

- `/` -> Home
- `/login`
- `/tasks`
- `/categories`

Use guards for private sections.

## When to apply this skill

Use this skill whenever:

- creating the initial app structure
- adding a new feature
- deciding whether logic belongs in core/shared/feature
- defining route boundaries
- reviewing architecture quality