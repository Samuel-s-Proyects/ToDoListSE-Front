# Architecture

## Vision

The frontend follows a **feature-first architecture** with NgModules. Each feature owns its pages, services, models, and dialogs. Shared concerns live in dedicated layers (`core`, `shared`, `layout`) with strict placement rules.

## Why NgModules

Angular 17 supports standalone components, but this project uses **NgModules as the default standard** because:

- NgModules provide explicit dependency boundaries per feature
- They enforce lazy-loading at the module level
- They align with the challenge's expectation of a well-organized Angular application
- Standalone is not wrong, but NgModules offer clearer structure for a project of this scope

## Why Not Standalone by Default

Standalone components work well for small apps or libraries. For a feature-rich challenge solution that must demonstrate architectural discipline, NgModules provide:

- Visible module boundaries (what each feature imports and exports)
- Natural lazy-loading units
- Clear imports for shared UI and third-party libraries
- Better alignment with traditional Angular patterns expected in technical reviews

## Layer Architecture

```
┌─────────────────────────────────────────┐
│                 AppModule               │
│         (bootstrap, root routing)       │
├─────────────────────────────────────────┤
│  CoreModule     LayoutModule            │
│  (singleton     (public/private         │
│   services,      shells, topbar,        │
│   guards,        sidebar, footer)       │
│   interceptors)                         │
├─────────────────────────────────────────┤
│              SharedModule               │
│  (atoms, molecules, organisms,          │
│   directives — reusable UI)             │
├─────────────────────────────────────────┤
│           Feature Modules               │
│  ┌──────┐ ┌──────┐ ┌────────┐ ┌──────┐ │
│  │ Auth │ │Tasks │ │Categor.│ │ Home │ │
│  │      │ │      │ │        │ │      │ │
│  └──────┘ └──────┘ └────────┘ └──────┘ │
│  (lazy-loaded, self-contained)          │
└─────────────────────────────────────────┘
```

## Layer Responsibilities

### `core/`

Singleton services and infrastructure that the entire app depends on. Imported once in `AppModule`.

Contains:
- **Guards**: `AuthGuard`, `PublicGuard`
- **Interceptors**: `ApiKeyInterceptor`, `JwtInterceptor`, `ErrorInterceptor`
- **Services**: `AuthSessionService`, `ThemeService`, `SeoService`
- **Models**: `NormalizedError`, `PaginatedResponse`, `SessionUser`, `ThemePreference`, `SeoData`
- **i18n**: Transloco loader and root module

Rules:
- No UI components
- No feature-specific logic
- Must be stateless where possible (services manage state via observables)

### `layout/`

Layout shells and navigation. Consumed by routing, not by features directly.

Contains:
- **PublicLayout**: topbar + footer + `<router-outlet>`
- **PrivateLayout**: topbar + sidebar + `<router-outlet>`
- Supporting: `PrivateTopbar`, `PrivateSidebar`, `PublicTopbar`, `PublicFooter`
- `ClickOutsideDirective` (used only in layout dropdowns)

Rules:
- Layouts decide what surrounds pages, not what pages contain
- No business logic
- No direct HTTP calls

### `shared/`

Reusable UI primitives and directives. Imported by feature modules that need them.

Contains:
- **Atoms**: `Button`, `Spinner`, `Icon`, `Input`
- **Molecules**: `EmptyState`, `LoadingState`, `ErrorState`
- **Organisms**: `FeedbackAlert`, `ConfirmDialog`
- **Directives**: `ClickOutsideDirective`

Rules:
- No feature logic
- No HTTP calls
- No routing
- Components must be generic and configurable via inputs

### `features/`

Self-contained feature modules. Each lazy-loaded with its own routing.

Contains per feature:
- `pages/`: Route-bound page components
- `data-access/`: HTTP service for the feature's API
- `dialogs/`: Feature-specific dialog components
- `models/`: TypeScript interfaces and types for the feature
- `*-routing.module.ts`: Feature route definitions
- `*.module.ts`: Feature module with declarations and imports

Rules:
- Features import `SharedModule`, never other features
- All HTTP lives in `data-access/`, never in components
- Pages orchestrate, dialogs collect input, data-access calls API
- Cross-feature data (like categories in tasks) is loaded separately, not imported as a module dependency

## Why Atomic Design Is Tactical

Atomic design is applied **only inside `shared/ui/`**, not globally. This means:

- Feature-specific components like `TaskFormDialog` or `LoginPage` do not follow atomic naming
- Only genuinely reusable, context-free UI primitives are organized as atoms → molecules → organisms
- Components are grouped by **family** (e.g., `atoms/buttons/`, `molecules/states/`), not as flat files

This avoids the common anti-pattern of forcing every component into atom/molecule/organism categories regardless of reuse potential.

## Public vs Private Layouts

| Layout | Routes | Shows |
|--------|--------|-------|
| PublicLayout | `/`, `/login` | Topbar (logo, language, theme, CTA) + Footer |
| PrivateLayout | `/tasks`, `/tasks/:id`, `/categories` | Topbar (logo, language, theme, user menu) + Sidebar (navigation) |

Guards enforce access:
- `PublicGuard` blocks authenticated users from public routes (redirects to `/tasks`)
- `AuthGuard` blocks unauthenticated users from private routes (redirects to `/login`)

## Data Flow

```
Component → DataAccessService → HttpClient → Interceptors → API
                                                ↓
                                    ApiKeyInterceptor (adds x-api-key)
                                    JwtInterceptor (adds Bearer token)
                                    ErrorInterceptor (normalizes errors)
```

Components never call `HttpClient` directly. The `data-access` service per feature is the single point of API communication.
