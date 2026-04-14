# Frontend Routing, Auth, and HTTP Skill

## Purpose

Use this skill whenever you work on routing, guards, interceptors, authentication flow, request behavior, or backend communication.

## Routing rules

Use RouterModule with:

- clear feature route boundaries
- lazy loading
- public/private layout separation
- route guards for private sections

Expected route intent:

- `/` -> home
- `/login`
- `/tasks`
- `/categories`

## Auth flow

Follow the challenge’s visible behavior first.

Visible login flow:

- request only email
- if the user exists, enter the application
- if the backend indicates the user does not exist or an invalid flow case, show a polished dialog asking whether the user wants to create the account and enter directly

Do not create a separate Register page in this version.

## JWT rules

JWT is required for secure communication with the backend.

Rules:

- store JWT in `sessionStorage`
- no refresh token in this version
- keep token handling simple and robust
- manage tokens through services/interceptors/guards only
- never expose token handling as UI logic

## API key rules

Inject the API key globally through an interceptor.

Rules:

- read from environment configuration
- send through a request header
- recommended header: `x-api-key`
- never hardcode real secrets

## HTTP discipline

Components must never call `HttpClient` directly.

All backend communication must happen inside feature `data-access` services.

## Interceptor responsibilities

Interceptors may handle:

- JWT injection
- API key injection
- timeout policy
- error normalization
- request metadata if needed
- optional loading coordination

## Error normalization

Frontend should work with normalized error objects, not raw transport errors.

Suggested normalized shape:

```json
{
  "code": "ERROR_CODE",
  "message": "Readable fallback message",
  "details": [],
  "traceId": "optional-trace-id"
}
```

Prefer using backend error codes as the main behavioral driver.

## Request cancellation

Use cancellation/obsolescence handling where useful, especially for search and filters.

Examples:

- search term changes
- component destroyed
- route changes
- newer request supersedes older one

## Observables

The challenge emphasizes observables and services.

Use them intentionally.

Rules:

- keep services focused
- expose reactive streams where helpful
- use async pipe when appropriate
- avoid giant god services

## Pagination

Tasks must use cursor-based pagination.

Treat the backend cursor as an opaque token.

Do not implement offset-based pagination as the primary approach.

## When to apply this skill

Use this skill whenever:

- implementing routes
- building guards/interceptors
- integrating auth
- creating data-access services
- handling filters/search/pagination