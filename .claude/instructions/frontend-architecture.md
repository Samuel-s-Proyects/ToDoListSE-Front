# Frontend Architecture Instructions

## Objective

Build the ToDoListSE frontend with a predictable, scalable Angular 17 architecture that prioritizes maintainability, challenge alignment, and polished UX.

## Official folder structure

Use this structure as the default reference:

```text
src/app/
  core/
    guards/
    interceptors/
    services/
    tokens/
    config/
    models/
    i18n/
    theme/
    seo/

  layout/
    public-layout/
    private-layout/

  shared/
    ui/
      atoms/
        buttons/
        inputs/
        icons/
        badges/
        chips/
        spinners/
      molecules/
        states/
        search/
        selectors/
      organisms/
        feedback-alerts/
        dialogs/
        headers/
    directives/
    pipes/
    models/
    utils/

  features/
    home/
      module/
      routing/
      pages/
      components/
      data-access/
      models/
      i18n/
      seo/

    auth/
      module/
      routing/
      pages/
      components/
      dialogs/
      data-access/
      models/
      i18n/
      seo/

    tasks/
      module/
      routing/
      pages/
      components/
      dialogs/
      data-access/
      models/
      i18n/
      seo/

    categories/
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

## Architectural rules

### Core

`core` contains only cross-cutting application logic.

Allowed examples:

- auth/session infrastructure
- HTTP configuration
- interceptors
- guards
- app config
- global services
- global models
- theme support
- SEO support
- i18n bootstrapping

Forbidden:

- feature-specific business logic
- task-specific code
- category-specific code
- auth page presentation logic

### Layout

`layout` contains shell composition only.

Rules:

- no business logic
- no feature API calls
- no feature state orchestration
- only structure, wrappers, navigation, layout composition

### Shared

`shared` contains reusable domain-agnostic assets.

Allowed:

- reusable UI
- directives
- pipes
- generic utilities
- generic view models

Forbidden:

- task domain logic
- category business logic
- auth feature-specific orchestration

### Features

Every business capability must live in its own feature.

Each feature must remain as self-contained as possible.

## Feature-first is the main rule

Do not create global folders by type such as:

- `components/`
- `services/`
- `pages/`

across the whole application.

Those categories must live inside each feature boundary.

## NgModules

Use NgModules as the default standard.

Rules:

- feature modules should define their internal structure clearly
- routing modules should stay close to the feature
- lazy loading should occur at feature boundaries
- avoid unnecessary shared NgModules that become dumping grounds

## Public vs private application areas

Use two clear route shells:

- `public-layout`
- `private-layout`

Expected route intent:

- Home and Login under public layout
- Tasks and Categories under private layout

## Data access rule

Components must never call HTTP directly.

All backend communication must happen through feature `data-access` services.

Smart page components may coordinate view state and consume feature services, but should not manually compose low-level HTTP details.

## Facade usage

A lightweight facade is allowed where it improves readability or coordination, especially in task listing pages with filters, loading states, pagination, and dialogs.

Do not force facades everywhere.

## Routing discipline

Use RouterModule organization with:

- clear route modules per feature
- lazy loading
- guards for private sections
- simple and predictable route trees

## Change detection and templates

Keep templates readable.

Rules:

- use async pipe when possible
- avoid heavy logic in templates
- avoid complex chained expressions
- prefer component/view-model preparation over template gymnastics
- use `trackBy` consistently in repeated structures

## Allowed enhancements

Enhancements are welcome only if they do not weaken the challenge’s main scope.

Good enhancements:

- polished Home page
- improved dialogs
- better task filtering
- categories CRUD
- better empty/loading/error states
- dark mode
- i18n

Bad enhancements:

- unnecessary architectural complexity
- introducing state libraries without need
- changing the challenge’s main flow beyond recognition