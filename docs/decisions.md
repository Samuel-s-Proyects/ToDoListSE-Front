# Technical Decisions

## ADR-001: Angular 17 with NgModules

**Context**: Angular 17 offers standalone components as the default recommendation.

**Decision**: Use NgModules as the module system.

**Rationale**:
- NgModules provide explicit module boundaries and lazy-loading units
- Feature-first architecture maps naturally to NgModules (one module per feature)
- Established pattern well-tested in larger Angular codebases
- `CoreModule` singleton guard pattern prevents duplicate provider registration
- `SharedModule` provides clear export surface for reusable UI

**Trade-off**: Slightly more boilerplate than standalone, but stronger organizational guarantees.

---

## ADR-002: Feature-First Architecture

**Context**: Angular projects can be organized by technical layer (components/, services/, models/) or by feature domain.

**Decision**: Feature-first organization under `features/`.

**Rationale**:
- Each feature (`auth`, `tasks`, `categories`, `home`) is a self-contained unit
- Internal structure (`data-access/`, `pages/`, `dialogs/`, `models/`) is consistent per feature
- Adding a new feature doesn't touch existing feature code
- Lazy loading maps 1:1 to feature modules

---

## ADR-003: Angular Material + Bootstrap Grid

**Context**: Need a UI component library and layout system.

**Decision**: Angular Material for components, Bootstrap 5 for grid only.

**Rationale**:
- Angular Material provides accessible, themed components (dialogs, form fields, selects, toggles)
- Bootstrap provides a proven responsive grid system (`container`, `row`, `col-*`)
- No Bootstrap JS or Bootstrap components used — only CSS grid utilities
- Avoids style conflicts by using Material for interactive elements and Bootstrap for layout

---

## ADR-004: Atomic Design — Tactical Only in Shared

**Context**: Atomic design (atoms/molecules/organisms) can organize UI, but full-project application creates excessive nesting.

**Decision**: Apply atomic design only inside `shared/ui/`.

**Rationale**:
- Shared UI primitives benefit from atomic classification (clear complexity levels)
- Feature-specific components live in their feature modules, not in atoms/molecules
- Prevents over-abstraction while maintaining reusable building blocks

---

## ADR-005: CSS Custom Properties for Theming

**Context**: Need theme switching (light/dark/system).

**Decision**: SCSS variables for foundational values, CSS custom properties for theme-aware tokens.

**Rationale**:
- SCSS variables (`_variables.scss`) define the raw color/spacing/shadow palette
- CSS custom properties (`_tokens.scss`) expose theme-aware values
- `data-theme` attribute on `<html>` toggles themes without JavaScript recalculation
- Angular Material themes also switch via the same `data-theme` attribute
- Components reference `var(--color-*)` tokens — theme-agnostic by default

---

## ADR-006: Cursor-Based Pagination

**Context**: Tasks list needs pagination.

**Decision**: Cursor-based pagination instead of offset-based.

**Rationale**:
- Firestore natively supports cursor-based pagination (`startAfter`)
- Avoids offset pagination issues (shifted results when items are added/deleted)
- Frontend accumulates pages (`Load More` pattern) for better UX than numbered pages
- Backend returns `{ items, pageInfo: { hasNextPage, nextCursor } }`

---

## ADR-007: sessionStorage for JWT

**Context**: JWT needs client-side storage.

**Decision**: `sessionStorage` instead of `localStorage` or cookies.

**Rationale**:
- `sessionStorage` clears when the tab closes — reduces token exposure window
- Simpler than HttpOnly cookies (no CSRF token needed)
- Good enough for a technical challenge; no refresh token complexity
- This version does not require persistent sessions across tabs

**Trade-off**: User must re-login when opening a new tab. Acceptable for this scope.

---

## ADR-008: Build-Time Environment Injection

**Context**: Need to keep API keys out of source code.

**Decision**: `set-env.ts` script reads `.env` files and generates `environment.ts` at build time.

**Rationale**:
- No secrets committed to git (`.env` is gitignored, `.env.example` documents shape)
- CI/CD reads secrets from GitHub Actions secrets
- Single mechanism for dev and prod environment generation
- Angular's `fileReplacements` still works for prod build targeting

---

## ADR-009: Transloco for i18n

**Context**: Need internationalization with Spanish and English.

**Decision**: `@jsverse/transloco` over Angular's built-in `@angular/localize`.

**Rationale**:
- Runtime language switching without full rebuild
- `reRenderOnLangChange: true` for seamless switching
- JSON-based translation files (easy to edit/extend)
- Async translation loading via HTTP (lazy per language)
- Pipe and structural directive support in templates

---

## ADR-010: No External State Management

**Context**: Could use NgRx, Akita, or similar for global state.

**Decision**: Component-local state + singleton services with `BehaviorSubject`.

**Rationale**:
- App scope is small enough that global state adds complexity without proportional benefit
- `AuthSessionService` and `ThemeService` handle the only truly global state (session, theme)
- Feature data (tasks, categories) is loaded fresh on navigation — no stale cache concerns
- Avoids NgRx boilerplate (actions, reducers, effects, selectors) for a challenge-scoped app

---

## ADR-011: FontAwesome SVG Icons

**Context**: Need an icon system.

**Decision**: FontAwesome 7 with SVG rendering, no Unicode icons.

**Rationale**:
- Tree-shakeable (only imported icons are bundled)
- SVG rendering is consistent across browsers
- `app-icon` atom wraps `fa-icon` for consistent sizing
- No icon fonts to load (reduces FOUT)

---

## ADR-012: Same-Origin API via Firebase Hosting Rewrite

**Context**: Frontend and backend are deployed separately but need to communicate.

**Decision**: Firebase Hosting rewrites `/api/**` to the Cloud Function.

**Rationale**:
- Frontend uses `/api` as base URL in production — same origin, no CORS
- Simplifies security (no cross-origin headers needed)
- Single domain for the entire application
- Dev environment uses full backend URL directly
