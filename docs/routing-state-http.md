# Routing, State & HTTP

## Route Architecture

```
/                   → PublicLayout
├── /               → HomeModule (lazy)
├── /login          → AuthModule (lazy) [publicGuard]
/                   → PrivateLayout [authGuard]
├── /tasks          → TasksModule (lazy)
│   └── /tasks/:id  → TaskDetailPageComponent
├── /categories     → CategoriesModule (lazy)
/**                 → redirect to /
```

All feature modules are lazy-loaded via `loadChildren`.

## Layouts

| Layout | Guard | Children | Components |
|--------|-------|----------|------------|
| `PublicLayout` | None (home) / `publicGuard` (login) | Home, Auth | Topbar, Footer |
| `PrivateLayout` | `authGuard` | Tasks, Categories | Topbar, Sidebar |

## Guards

### `authGuard` (CanActivate)

```typescript
// Checks AuthSessionService.isAuthenticated
// ✓ → allows navigation
// ✗ → redirects to /login
```

### `publicGuard` (CanActivate)

```typescript
// Checks AuthSessionService.isAuthenticated
// ✗ → allows navigation (user is not logged in)
// ✓ → redirects to /tasks (prevent accessing login when authenticated)
```

Both are functional guards (Angular 14+ style), not class-based.

## Interceptors

Registered in `CoreModule` in execution order:

### 1. `ApiKeyInterceptor`

Adds `x-api-key` header to every request. Value read from `environment.apiKey`.

### 2. `JwtInterceptor`

Adds `Authorization: Bearer <token>` header when a JWT exists in `AuthSessionService`.

### 3. `ErrorInterceptor`

Normalizes HTTP errors into `NormalizedError`:

```typescript
interface NormalizedError {
  code: string;
  message: string;
  details: unknown[];
  traceId?: string;
}
```

Behavior:
- **401**: Clears session, redirects to `/login`
- **Backend error with `code` field**: Extracts into `NormalizedError`
- **Network error (status 0)**: Returns `NETWORK_ERROR`
- **Other**: Returns `UNKNOWN_ERROR`

Components never see raw `HttpErrorResponse` — only `NormalizedError`.

## State Management

No external state management library (NgRx, Akita, etc.). State lives in:

| Scope | Where | Pattern |
|-------|-------|---------|
| Auth session | `AuthSessionService` | `BehaviorSubject<boolean>` + sessionStorage |
| Theme | `ThemeService` | `BehaviorSubject<ThemePreference>` + localStorage |
| Feature data | Component-level | Local variables refreshed via service calls |
| Pagination cursor | `TasksPageComponent` | Local `nextCursor` / `hasNextPage` state |

### Session State

`AuthSessionService` stores JWT and user in `sessionStorage`:

| Key | Value |
|-----|-------|
| `todolist_jwt` | JWT token string |
| `todolist_user` | JSON-serialized `SessionUser` |

Exposes:
- `isAuthenticated$: Observable<boolean>` (reactive)
- `isAuthenticated: boolean` (synchronous)
- `getToken(): string | null`
- `getUser(): SessionUser | null`
- `setSession(token, user)` / `clearToken()`

## Data Access Pattern

Each feature has a `data-access/` service that encapsulates HTTP calls:

```
features/
├── auth/data-access/
│   └── AuthDataAccessService      → POST /auth/login, POST /auth/register
├── tasks/data-access/
│   └── TasksDataAccessService     → GET/POST/PUT/PATCH/DELETE /tasks
└── categories/data-access/
    └── CategoriesDataAccessService → GET/POST/PUT/DELETE /categories
```

### TasksDataAccessService

| Method | HTTP | Endpoint | Payload/Params |
|--------|------|----------|----------------|
| `list(params)` | GET | `/tasks` | `ListTasksParams` (limit, cursor, categoryId, completed, search) |
| `getById(id)` | GET | `/tasks/:id` | — |
| `create(payload)` | POST | `/tasks` | `CreateTaskPayload` |
| `update(id, payload)` | PUT | `/tasks/:id` | `UpdateTaskPayload` (includes version) |
| `toggle(id, payload)` | PATCH | `/tasks/:id/toggle` | `ToggleTaskPayload` (version) |
| `delete(id)` | DELETE | `/tasks/:id` | — |

### CategoriesDataAccessService

| Method | HTTP | Endpoint | Payload |
|--------|------|----------|---------|
| `list()` | GET | `/categories` | — |
| `create(payload)` | POST | `/categories` | `CreateCategoryPayload` |
| `update(id, payload)` | PUT | `/categories/:id` | `UpdateCategoryPayload` |
| `delete(id)` | DELETE | `/categories/:id` | — |

### AuthDataAccessService

| Method | HTTP | Endpoint | Payload |
|--------|------|----------|---------|
| `login(email)` | POST | `/auth/login` | `{ email }` |
| `register(email, name)` | POST | `/auth/register` | `{ email, name }` |

## Cursor-Based Pagination

Tasks use cursor-based pagination instead of offset pagination:

```typescript
interface PaginatedResponse<T> {
  items: T[];
  pageInfo: {
    hasNextPage: boolean;
    nextCursor: string | null;
  };
}
```

Flow:
1. Initial load: `list({ limit: 10 })`
2. Append next page: `list({ limit: 10, cursor: nextCursor })`
3. Items are accumulated in the component
4. "Load more" button visible when `hasNextPage === true`
5. Scroll area has `max-height` for overflow handling

## API Base URL

Configured per environment via `set-env.ts`:

- **Dev**: `http://localhost:5001/todolistsamuelescobar/us-central1/api/api`
- **Prod**: `/api` (relative — Firebase Hosting rewrites to Cloud Function)

## Security Headers Flow

```
Request → ApiKeyInterceptor (adds x-api-key)
        → JwtInterceptor (adds Authorization)
        → Server
        ← ErrorInterceptor (normalizes errors / handles 401)
```
