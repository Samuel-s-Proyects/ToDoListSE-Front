# Engineering Principles

## DRY — Don't Repeat Yourself

| Pattern | Implementation |
|---------|---------------|
| Shared UI | `shared/ui/` atoms/molecules/organisms reused across all features |
| Style tokens | CSS custom properties in `_tokens.scss` — one source for all theme colors |
| SCSS mixins | `_mixins.scss` — responsive breakpoints, transitions, focus, scrollbar defined once |
| Data access pattern | Consistent `*DataAccessService` per feature — same HTTP + Observable structure |
| Error normalization | Single `ErrorInterceptor` normalizes all HTTP errors into `NormalizedError` |
| Dialog result contracts | Consistent `{ confirmed: boolean, ...data }` pattern across all form dialogs |
| Translation pattern | All user-facing strings from `assets/i18n/*.json` — no hardcoded strings |

## KISS — Keep It Simple

| Decision | Simpler Alternative Chosen Over |
|----------|---------------------------------|
| Component-local state | NgRx/Akita global state management |
| `BehaviorSubject` services | Complex state machines |
| Functional guards | Class-based guards with injectable services |
| `sessionStorage` for JWT | HttpOnly cookies + CSRF tokens + refresh tokens |
| `set-env.ts` script | Complex multi-stage Docker builds or Webpack plugins |
| Same-origin API rewrite | Cross-origin setup with CORS configuration |

## YAGNI — You Aren't Gonna Need It

| Not Implemented | Why |
|-----------------|-----|
| Refresh tokens | Challenge scope doesn't require persistent sessions |
| NgRx store | App is small enough for service + component state |
| Offline support | Not in challenge requirements |
| WebSocket real-time | Polling/refresh on interaction is sufficient |
| Role-based access control | Single user role is sufficient |
| File upload | Not required |
| Task ordering/drag-drop | Not in requirements |

## SOLID (Applied Where Valuable)

### Single Responsibility

| Unit | One Responsibility |
|------|-------------------|
| `AuthSessionService` | Manages JWT + user session |
| `ThemeService` | Manages theme preference + DOM application |
| `SeoService` | Manages page title + meta tags |
| `ErrorInterceptor` | Normalizes HTTP errors only |
| `JwtInterceptor` | Adds auth header only |
| `ApiKeyInterceptor` | Adds API key header only |
| `*DataAccessService` | HTTP calls only (no business logic) |

### Open/Closed

- `ButtonComponent` supports new variants via `ButtonVariant` type union without modifying component code
- `FeedbackAlertComponent` supports new alert types via `AlertType` union
- Theme system extends via adding tokens to `_tokens.scss` without changing component SCSS

### Interface Segregation

- Dialog data interfaces (`TaskFormDialogData`, `CategoryFormDialogData`) are feature-specific — not bloated with unrelated fields
- `NormalizedError` has only the fields needed by the error contract

### Dependency Inversion

- Components depend on `*DataAccessService` abstractions, not `HttpClient` directly
- Interceptors injected via `HTTP_INTERCEPTORS` token — swappable
- `TranslocoLoader` interface implemented by `TranslocoHttpLoader` — replaceable

## Separation of Concerns

```
Presentation (Components)
    ↓ calls
Data Access (Services)
    ↓ HTTP
Backend API
    ↓
Business Logic (Use Cases)
    ↓
Persistence (Firestore)
```

Each layer has clear boundaries:
- **Components**: Template rendering, user interaction, view state
- **Data access services**: HTTP calls, request/response typing
- **Core services**: Cross-cutting concerns (auth, theme, SEO)
- **Interceptors**: Transport-level concerns (headers, error normalization)
- **Shared UI**: Reusable visual primitives (no business logic)

## Strong Typing

| Where | How |
|-------|-----|
| API payloads | `CreateTaskPayload`, `UpdateTaskPayload`, `ToggleTaskPayload` |
| API responses | `PaginatedResponse<Task>`, `LoginResponse`, `Category[]` |
| Dialog contracts | `TaskFormDialogData`/`Result`, `CategoryFormDialogData`/`Result` |
| Theme system | `ThemePreference`, `ResolvedTheme` (union types) |
| UI variants | `ButtonVariant`, `ButtonSize`, `AlertType` (union types) |
| Error contract | `NormalizedError` interface — code, message, details, traceId |

No `any` types in production code. All HTTP calls are generically typed.

## Consistency Over Cleverness

| Area | Consistent Pattern |
|------|-------------------|
| File naming | kebab-case everywhere |
| Feature structure | `data-access/`, `pages/`, `dialogs/`, `models/` in every feature |
| Module structure | `*Module` + `*RoutingModule` per feature |
| Dialog UX | Open → form → confirm/cancel → typed result → API call → feedback |
| Error handling | `NormalizedError.code` → translated error key → `FeedbackAlertComponent` |
| State loading | `loading = true` → API call → `loading = false` |

## Reuse Before Duplication

Before creating anything new, existing assets are checked:

- **UI primitive needed?** → Check `shared/ui/` atoms/molecules/organisms
- **Common module needed?** → `SharedModule` re-exports common modules
- **Style value needed?** → Check `_variables.scss` / `_tokens.scss`
- **Responsive behavior?** → Use `_mixins.scss` screen mixins
- **Translation?** → Add to `es.json`/`en.json` under appropriate namespace
