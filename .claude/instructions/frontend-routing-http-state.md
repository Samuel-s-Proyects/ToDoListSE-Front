# Frontend Routing, HTTP, State, and Auth Instructions

## Routing

Use RouterModule with clear feature boundaries.

Expected route intent:

- `/` -> Home
- `/login`
- `/tasks`
- `/categories`

Use:

- lazy loading by feature
- auth guard for private routes
- public/private layout separation

## Auth flow

Follow the challenge’s main flow.

Visible authentication behavior:

- login asks only for email
- if the user exists, enter the app
- if the user does not exist or backend indicates invalid credentials according to the agreed flow, show a polished popup/dialog to confirm account creation and immediate access

Do not add a separate Register page in this version.

## JWT

JWT is required for security communication with the API.

Rules:

- store JWT in `sessionStorage`
- no refresh token in this version
- keep implementation simple and solid
- token management must be done through services/interceptors/guards
- never expose token handling through visible UI logic

## API key

Inject the API key globally through an interceptor.

Rules:

- read from environment configuration
- send through a request header
- never hardcode production secrets

## Interceptors

Interceptors should handle cross-cutting request concerns.

Recommended responsibilities:

- JWT header injection
- API key header injection
- timeout strategy
- error normalization
- optional loading orchestration if useful

## HTTP discipline

No component may use HttpClient directly.

All API communication must live in feature data-access services.

## Request cancellation

Implement cancellation/obsolescence handling where useful, especially for search/filter flows.

Examples:

- search changes
- component destroyed
- user navigates away
- newer request supersedes older request

## Observables and services

The challenge emphasizes observables and services, so use them intentionally.

Rules:

- expose reactive streams when appropriate
- use async pipe in templates when practical
- keep services focused
- avoid giant god services

## Binding discipline

Use:

- one-way binding by default
- two-way binding only where truly appropriate
- structural directives correctly
- custom directives only when there is real value
- `trackBy` for repeated items

## Error contract

Frontend should expect a normalized backend error shape such as:

```json
{
  "code": "ERROR_CODE",
  "message": "Readable fallback message",
  "details": [],
  "traceId": "optional-trace-id"
}
```

Frontend rules:

- use error `code` as the main behavioral driver when possible
- use `message` as a fallback
- localize visible feedback where appropriate
- do not let components depend on raw `HttpErrorResponse`

## Pagination

Use cursor-based pagination for tasks.

Do not implement offset-based pagination as the primary approach.

Frontend should treat the cursor as an opaque token returned by the backend.

The UI may still present page-like navigation behavior, but the actual backend contract must use cursor pagination.