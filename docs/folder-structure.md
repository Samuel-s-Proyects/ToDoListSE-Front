# Folder Structure

## Full Tree

```
src/
├── main.ts                          # Bootstrap entry
├── index.html                       # SPA shell
├── styles.scss                      # Global SCSS entry (imports globals)
├── set-env.ts                       # Build-time env injection script
├── environments/
│   ├── environment.ts               # Dev config (generated from .env)
│   └── environment.prod.ts          # Prod config (generated from .env.production)
├── assets/
│   ├── i18n/
│   │   ├── es.json                  # Spanish translations
│   │   └── en.json                  # English translations
│   ├── images/                      # Static images
│   ├── videos/
│   │   └── LoginVideo.mp4           # Login page background video
│   └── styles/
│       ├── globals.scss             # Global base styles + Material theme
│       ├── _variables.scss          # Raw SCSS values (colors, spacing, fonts)
│       ├── _tokens.scss             # CSS custom properties per theme
│       ├── _themes.scss             # Angular Material palette definitions
│       ├── _mixins.scss             # Reusable SCSS patterns
│       ├── _functions.scss          # SCSS utility functions
│       ├── _breakpoints.scss        # Responsive breakpoint values
│       └── theme.scss               # Re-export (consumed by angular.json)
└── app/
    ├── app.module.ts                # Root module
    ├── app.component.ts             # Root component (<router-outlet>)
    ├── app.component.html
    ├── app.component.scss
    ├── app.component.spec.ts
    ├── app.config.ts                # App config (unused, NgModule-based)
    ├── app.routes.ts                # Top-level route definitions
    ├── core/
    │   ├── core.module.ts           # Singleton providers + interceptors
    │   ├── guards/
    │   │   ├── auth.guard.ts        # Protects private routes
    │   │   └── public.guard.ts      # Blocks authenticated from public
    │   ├── interceptors/
    │   │   ├── api-key.interceptor.ts   # Adds x-api-key header
    │   │   ├── jwt.interceptor.ts       # Adds Authorization header
    │   │   └── error.interceptor.ts     # Normalizes HTTP errors
    │   ├── services/
    │   │   ├── auth-session.service.ts  # JWT + user session management
    │   │   ├── theme.service.ts         # Light/dark/system theme
    │   │   └── seo.service.ts           # Page title + meta tags
    │   ├── models/
    │   │   ├── normalized-error.model.ts
    │   │   ├── paginated-response.model.ts
    │   │   ├── session-user.model.ts
    │   │   ├── theme.model.ts
    │   │   └── seo-data.model.ts
    │   └── i18n/
    │       ├── transloco-root.module.ts # Transloco config
    │       └── transloco-loader.ts      # HTTP translation loader
    ├── layout/
    │   ├── layout.module.ts
    │   ├── public-layout/
    │   │   ├── public-layout.component.ts/html/scss
    │   │   ├── public-topbar/
    │   │   │   └── public-topbar.component.ts/html/scss
    │   │   └── public-footer/
    │   │       └── public-footer.component.ts/html/scss
    │   └── private-layout/
    │       ├── private-layout.component.ts/html/scss
    │       ├── private-topbar/
    │       │   └── private-topbar.component.ts/html/scss
    │       └── private-sidebar/
    │           └── private-sidebar.component.ts/html/scss
    ├── shared/
    │   ├── shared.module.ts
    │   ├── ui/
    │   │   ├── atoms/
    │   │   │   ├── buttons/
    │   │   │   │   └── button/          # Variant + size system
    │   │   │   ├── spinners/
    │   │   │   │   └── spinner/         # Configurable size
    │   │   │   ├── icons/
    │   │   │   │   └── icon/            # FontAwesome wrapper
    │   │   │   └── inputs/
    │   │   │       └── input/           # Material form field + validation
    │   │   ├── molecules/
    │   │   │   └── states/
    │   │   │       ├── loading-state/   # Spinner + message
    │   │   │       ├── empty-state/     # Icon + message
    │   │   │       └── error-state/     # Message + retry button
    │   │   └── organisms/
    │   │       ├── feedback-alerts/
    │   │       │   └── feedback-alert/  # Success/error/warning/info
    │   │       └── dialogs/
    │   │           └── confirm-dialog/  # Generic confirmation
    │   └── directives/
    │       └── click-outside.directive.ts
    └── features/
        ├── auth/
        │   ├── auth.module.ts
        │   ├── auth-routing.module.ts
        │   ├── data-access/
        │   │   ├── auth-data-access.service.ts
        │   │   └── auth-data-access.service.spec.ts
        │   ├── pages/
        │   │   └── login-page/
        │   ├── dialogs/
        │   │   └── create-account-dialog/
        │   └── models/
        │       └── auth.model.ts
        ├── tasks/
        │   ├── tasks.module.ts
        │   ├── tasks-routing.module.ts
        │   ├── data-access/
        │   │   ├── tasks-data-access.service.ts
        │   │   └── tasks-data-access.service.spec.ts
        │   ├── pages/
        │   │   ├── tasks-page/
        │   │   └── task-detail-page/
        │   ├── dialogs/
        │   │   └── task-form-dialog/
        │   └── models/
        │       └── task.model.ts
        ├── categories/
        │   ├── categories.module.ts
        │   ├── categories-routing.module.ts
        │   ├── data-access/
        │   │   ├── categories-data-access.service.ts
        │   │   └── categories-data-access.service.spec.ts
        │   ├── pages/
        │   │   └── categories-page/
        │   ├── dialogs/
        │   │   └── category-form-dialog/
        │   └── models/
        │       └── category.model.ts
        └── home/
            ├── home.module.ts
            ├── home-routing.module.ts
            └── pages/
                └── home-page/
```

## Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| Files | kebab-case | `auth-session.service.ts` |
| Components | PascalCase class, kebab-case selector | `LoginPageComponent` / `app-login-page` |
| Services | PascalCase + `Service` | `TasksDataAccessService` |
| Guards | camelCase function | `authGuard` |
| Interfaces | PascalCase | `NormalizedError`, `Task` |
| Types | PascalCase | `ThemePreference`, `TaskFilter` |
| SCSS files | `_kebab-case.scss` (partials) | `_variables.scss` |
| i18n keys | dot-separated namespace | `tasks.createTask` |

## Placement Rules

| What | Where | Not Where |
|------|-------|-----------|
| HTTP calls | `features/*/data-access/` | Components, services |
| Feature models | `features/*/models/` | Shared, core |
| Reusable UI | `shared/ui/` | Features, layout |
| Guards | `core/guards/` | Features |
| Interceptors | `core/interceptors/` | Features |
| Singleton services | `core/services/` | Features, shared |
| SCSS tokens | `assets/styles/` | Component files |
| Translations | `assets/i18n/` | TypeScript code |
| Feature dialogs | `features/*/dialogs/` | Shared (unless generic) |
