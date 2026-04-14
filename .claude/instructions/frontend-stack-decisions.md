# Frontend Stack Decisions

## Project name

Use the project name:

- `ToDoListSE`

Use naming consistently in documentation, environment examples, Firebase configuration references, and internal architecture notes.

## Confirmed frontend stack

- Angular 17
- NgModules by default
- Angular Material
- Bootstrap
- FontAwesome SVG
- SCSS
- Transloco
- Reactive Forms
- RxJS
- Firebase Hosting target

## Confirmed architectural decisions

- feature-first primary architecture
- tactical atomic design only in `shared/ui`
- public and private layouts
- Home page included
- no separate Register page in this version
- email-only visible login flow
- JWT stored in `sessionStorage`
- no refresh token
- API key injected by interceptor
- categories CRUD included
- task filters included
- cursor-based pagination included
- dark/light theme included
- SEO basic but clean
- accessibility required
- unit testing required
- CI/CD readiness required

## Recommended naming conventions

### Component prefix

Use a single official prefix such as:

- `app`

Examples:

- `app-button`
- `app-input`
- `app-empty-state`

### Theme names

Use:

- `light`
- `dark`

### Style naming

Use semantic style/token naming whenever possible.

Avoid component-coupled token names when the value is truly global.

### Header suggestion

Use a consistent API key header name such as:

- `x-api-key`

Only change this if backend constraints require another name.