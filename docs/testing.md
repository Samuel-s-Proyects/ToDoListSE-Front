# Testing

## Framework

| Tool | Purpose |
|------|---------|
| Karma | Test runner |
| Jasmine | Test framework (describe/it/expect) |
| Angular TestBed | Module/component/service test harness |
| HttpClientTestingModule | HTTP call mocking |

## Philosophy

Testing targets meaningful behavior, not maximum count. Priority is given to:

1. Data access services (HTTP contracts)
2. Feature pages (user interaction flows)
3. Critical components (login, task list, categories)
4. Root component (bootstrap sanity)

## Test Inventory

| File | Type | Tests |
|------|------|-------|
| `app.component.spec.ts` | Component | App bootstrap, router outlet |
| `auth-data-access.service.spec.ts` | Service | Login HTTP call, register HTTP call |
| `login-page.component.spec.ts` | Component | Form validation, login flow, error handling, create account flow |
| `tasks-data-access.service.spec.ts` | Service | List, get, create, update, toggle, delete HTTP calls |
| `tasks-page.component.spec.ts` | Component | Load tasks, filters, search, CRUD, pagination, toggle, delete |
| `categories-data-access.service.spec.ts` | Service | List, create, update, delete HTTP calls |
| `categories-page.component.spec.ts` | Component | Load categories, create, edit, delete flows |
| `home-page.component.spec.ts` | Component | SEO setup, render sections |

**Total**: 8 spec files, 42 tests passing.

## Test Patterns

### Service Tests

```typescript
beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  });
  service = TestBed.inject(TasksDataAccessService);
  httpMock = TestBed.inject(HttpTestingController);
});

it('should list tasks', () => {
  service.list({ limit: 10 }).subscribe(result => {
    expect(result.items.length).toBe(1);
  });
  const req = httpMock.expectOne(r => r.url.includes('/tasks'));
  req.flush({ items: [mockTask], pageInfo: { hasNextPage: false, nextCursor: null } });
});
```

### Component Tests

```typescript
beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [TasksPageComponent],
    imports: [SharedModule, TranslocoTestingModule, ...],
    providers: [
      { provide: TasksDataAccessService, useValue: jasmine.createSpyObj('TasksDataAccessService', ['list', 'create', ...]) },
    ],
  }).compileComponents();
});
```

## What Is Tested

### Data Access Services

- Correct HTTP method used (GET, POST, PUT, PATCH, DELETE)
- Correct URL endpoint called
- Query params properly serialized (pagination, filters)
- Request payload correctly sent
- Response properly typed

### Feature Pages

- Initial data loading on `ngOnInit`
- User interactions (click, submit, filter change)
- Dialog opening with correct data
- API call after dialog confirmation
- Success/error message display
- Loading states
- Pagination (load more)

### Not Tested (by design)

- Pure template rendering (covered by component tests implicitly)
- Third-party library internals (Angular Material, Transloco)
- Style/SCSS output
- Guards and interceptors (simple enough to trust)

## Running Tests

```bash
npm test              # Single run with Chrome Headless
npm run test:watch    # Watch mode for development
```

## Definition of Done (Testing)

A feature is test-complete when:

- [ ] Data access service has tests for all HTTP methods
- [ ] Page component has tests for main user flows
- [ ] Tests pass in CI (`npm test` in headless mode)
- [ ] No test depends on external services or network
