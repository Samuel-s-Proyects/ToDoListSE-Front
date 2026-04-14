# Deploy

## Architecture

```
┌─────────────────────────────┐
│     Firebase Hosting        │
│  todolistsamuelescobar.web.app │
│ ┌────────────────────┐      │
│ │  Angular SPA       │      │
│ │  (static files)    │      │
│ └────────────────────┘      │
│           │ /api/**          │
│           ▼ (rewrite)        │
│ ┌────────────────────┐      │
│ │  Cloud Functions v2│      │
│ │  Express API       │      │
│ │  (us-central1)     │      │
│ └────────────────────┘      │
│           │                  │
│           ▼                  │
│ ┌────────────────────┐      │
│ │    Firestore       │      │
│ └────────────────────┘      │
└─────────────────────────────┘
```

## Firebase Hosting Configuration

- **Public directory**: `public/`
- **SPA rewrite**: All routes → `index.html` (Angular routing)
- **API rewrite**: `/api/**` → Cloud Function `api`

## Environment Variables

### Build-Time Injection

Environment files are **generated** at build time, not committed:

```
.env               → environment.ts (dev)
.env.production    → environment.prod.ts (prod)
```

Script: `src/set-env.ts`

| Variable | Dev | Prod |
|----------|-----|------|
| `API_BASE_URL` | `http://localhost:5001/.../api` | `/api` |
| `API_KEY` | Local key | Production key |
| `production` | `false` | `true` |

### Template

`.env.example` (committed):

```
API_KEY=
API_BASE_URL=
```

Actual `.env` and `.env.production` are **gitignored**.

## Build Process

```bash
# Dev
npm start                    # Runs set-env.ts then ng serve

# Production build
npm run build                # Runs set-env.ts --production then ng build
```

The `set-env.ts` script:
1. Reads `.env` or `.env.production` (via `dotenv`)
2. Generates `environment.ts` or `environment.prod.ts`
3. Angular build uses the generated file

## Deploy Steps

### Frontend (Firebase Hosting)

```bash
cd ToDoListSEFront
npm run build                          # Generates dist/
cp -r dist/to-do-list-sefront/* ../ToDoListSEBack/public/
cd ../ToDoListSEBack
firebase deploy --only hosting
```

### Backend (Cloud Functions)

```bash
cd ToDoListSEBack/functions
npm run build
cd ..
firebase deploy --only functions
```

### Full Deploy

```bash
firebase deploy                        # hosting + functions + firestore rules/indexes
```

## CI/CD

GitHub Actions workflow at `.github/workflows/ci.yml`:

```yaml
# Triggers on push/PR to main
# Steps:
# 1. Checkout
# 2. Setup Node 20
# 3. Install dependencies
# 4. Generate environment files (using GitHub Secrets)
# 5. Run linter
# 6. Run tests (headless Chrome)
# 7. Build production
```

### GitHub Secrets Required

| Secret | Purpose |
|--------|---------|
| `API_KEY` | API key for env generation |
| `API_BASE_URL` | API URL for env generation |

## Production URL

- **Frontend**: https://todolistsamuelescobar.web.app
- **API**: https://todolistsamuelescobar.web.app/api

## Backend Integration Points

### API Rewrite

Firebase Hosting rewrites `/api/**` to the Cloud Function named `api`. The frontend uses `/api` as `apiBaseUrl` in production, making it same-origin (no CORS issues).

### Security

| Layer | Mechanism |
|-------|-----------|
| API Key | `x-api-key` header on all requests |
| JWT | `Authorization: Bearer` on authenticated requests |
| CORS | Same-origin in production (Hosting rewrite) |
| Cloud Run | Public invoker (declared in function config) |
