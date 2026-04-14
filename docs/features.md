# Features

## Home

**Route**: `/`  
**Layout**: PublicLayout  
**Module**: `HomeModule` (lazy loaded)

### Purpose

Marketing/landing page that presents the app to visitors. Acts as the entry point for unauthenticated users.

### Components

| Component | Responsibility |
|-----------|---------------|
| `HomePageComponent` | Renders hero section, features grid, steps section, CTA |

### Sections

- **Hero**: Headline, subtitle, CTA button linking to `/login`
- **Features**: Grid of 3 feature cards (tasks, categories, filters) with FontAwesome icons
- **Steps**: Numbered process (sign up → create → organize → track)
- **CTA**: Final call-to-action block

### SEO

Sets page title and description via `SeoService` using translated keys (`home.seoTitle`, `home.seoDescription`).

---

## Auth

**Routes**: `/login`  
**Layout**: PublicLayout  
**Guard**: `publicGuard` (redirects to `/tasks` if already authenticated)  
**Module**: `AuthModule` (lazy loaded)

### Purpose

Handles user authentication and account creation.

### Components

| Component | Responsibility |
|-----------|---------------|
| `LoginPageComponent` | Email input + login form, triggers account creation flow |
| `CreateAccountDialogComponent` | Dialog for new user registration (name field) |

### Flow

1. User enters email → `POST /auth/login`
2. If user exists → receives JWT + user data → `setSession()` → redirect to `/tasks`
3. If `USER_NOT_FOUND` → opens CreateAccountDialog
4. User enters name → `POST /auth/register` → receives JWT + user data → redirect to `/tasks`
5. If `USER_ALREADY_EXISTS` → shows error message

### Models

```typescript
interface AuthUser { id: string; email: string; name: string; }
interface LoginResponse { token: string; user: AuthUser; }
interface RegisterResponse { token: string; user: AuthUser; }
```

### Session

JWT stored in `sessionStorage` via `AuthSessionService`. Token cleared on logout or 401 response.

---

## Tasks

**Routes**: `/tasks`, `/tasks/:id`  
**Layout**: PrivateLayout  
**Guard**: `authGuard`  
**Module**: `TasksModule` (lazy loaded)

### Purpose

Core CRUD feature for task management with filtering, search, pagination, and status toggling.

### Components

| Component | Responsibility |
|-----------|---------------|
| `TasksPageComponent` | Task list, filters, search, pagination, CRUD orchestration |
| `TaskDetailPageComponent` | Single task view with full details |
| `TaskFormDialogComponent` | Create/edit task dialog with form |

### Capabilities

- **List tasks** with cursor-based pagination (20 per page)
- **Create task** via dialog (title, description, category)
- **Edit task** via dialog (title, description, category, status)
- **Toggle status** (completed/pending) inline
- **Delete task** with confirmation dialog
- **Filter by status**: all / completed / pending
- **Filter by category**: dropdown
- **Search**: debounced text search (400ms)
- **Load more**: appends next page to existing list
- **View detail**: navigates to `/tasks/:id`

### Models

```typescript
interface Task {
  id: string; title: string; description: string;
  completed: boolean; categoryId: string | null;
  userId: string; version: number;
  createdAt: string; updatedAt: string; updatedBy: string;
}

type TaskFilter = 'all' | 'completed' | 'pending';

interface ListTasksParams {
  limit?: number; cursor?: string;
  categoryId?: string; completed?: boolean; search?: string;
}
```

### Concurrency Control

Tasks include a `version` field. Update and toggle operations send the current version. Backend rejects with `CONFLICT` if the version has changed, and the frontend displays `tasks.conflictError`.

### Backend Relationship

| Operation | Endpoint | Method |
|-----------|----------|--------|
| List | `/tasks?limit&cursor&categoryId&completed&search` | GET |
| Get by ID | `/tasks/:id` | GET |
| Create | `/tasks` | POST |
| Update | `/tasks/:id` | PUT |
| Toggle | `/tasks/:id/toggle` | PATCH |
| Delete | `/tasks/:id` | DELETE |

---

## Categories

**Route**: `/categories`  
**Layout**: PrivateLayout  
**Guard**: `authGuard`  
**Module**: `CategoriesModule` (lazy loaded)

### Purpose

CRUD management for task categories. Approved enhancement beyond core challenge.

### Components

| Component | Responsibility |
|-----------|---------------|
| `CategoriesPageComponent` | Category list, CRUD orchestration |
| `CategoryFormDialogComponent` | Create/edit category dialog (name + color) |

### Capabilities

- **List categories** (all at once, no pagination)
- **Create category** via dialog (name, color picker)
- **Edit category** via dialog
- **Delete category** with confirmation dialog

### Models

```typescript
interface Category {
  id: string; name: string; color: string;
  userId: string; createdAt: string; updatedAt: string;
}
```

### Backend Relationship

| Operation | Endpoint | Method |
|-----------|----------|--------|
| List | `/categories` | GET |
| Create | `/categories` | POST |
| Update | `/categories/:id` | PUT |
| Delete | `/categories/:id` | DELETE |

Categories are cached in Redis on the backend for faster reads.
