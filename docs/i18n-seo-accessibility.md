# i18n, SEO & Accessibility

## i18n — Transloco

### Configuration

| Setting | Value |
|---------|-------|
| Library | `@jsverse/transloco` v8 |
| Available languages | `es`, `en` |
| Default language | `es` |
| Re-render on lang change | `true` |
| Loader | `TranslocoHttpLoader` — fetches `/assets/i18n/{lang}.json` |

Configured in `TranslocoRootModule` (imported in `AppModule`).

### Translation Files

```
src/assets/i18n/
├── es.json    # Spanish (default)
└── en.json    # English
```

### Namespace Structure

Translation keys follow dot-separated namespaces:

| Namespace | Example Keys |
|-----------|-------------|
| `home.*` | `home.heroTitle`, `home.heroCta` |
| `auth.*` | `auth.emailLabel`, `auth.loginButton`, `auth.createAccountTitle` |
| `tasks.*` | `tasks.pageTitle`, `tasks.createTask`, `tasks.filterAll` |
| `categories.*` | `categories.pageTitle`, `categories.createCategory` |
| `common.*` | `common.confirm`, `common.cancel`, `common.loading` |
| `topbar.*` | `topbar.tasks`, `topbar.categories`, `topbar.logout` |
| `footer.*` | `footer.rights` |
| `sidebar.*` | `sidebar.tasks`, `sidebar.categories` |

### Usage in Templates

```html
<ng-container *transloco="let t">
  <h1>{{ t('tasks.pageTitle') }}</h1>
</ng-container>
```

### Usage in Components

```typescript
constructor(private readonly transloco: TranslocoService) {}

// Async (preferred for SEO)
this.transloco.selectTranslate('home.heroTitle')
  .pipe(take(1))
  .subscribe(title => this.seoService.update({ title }));
```

### Dialog Translation Pattern

Dialog data includes translation key fields. The dialog template resolves them:

```typescript
// Parent passes keys
const data: TaskFormDialogData = {
  titleKey: 'tasks.createTask',
  confirmKey: 'common.confirm',
  cancelKey: 'common.cancel',
  // ...
};
```

```html
<!-- Dialog template resolves -->
<h2>{{ t(data.titleKey) }}</h2>
```

## SEO

### SeoService

Singleton in `core/services/seo.service.ts`:

```typescript
interface SeoData {
  title: string;
  description?: string;
  canonical?: string;
}
```

- Sets page title: `{title} | Atom Chat`
- Updates meta description tag
- Sets/creates canonical `<link>` tag

### SEO Integration

Each feature page calls `SeoService.update()` during initialization with translated values:

```typescript
this.transloco.selectTranslate('tasks.pageTitle')
  .pipe(take(1))
  .subscribe(title => {
    this.seoService.update({ title, description: '...' });
  });
```

Uses `selectTranslate` (async) instead of `translate` (sync) to ensure translations are loaded before setting metadata.

### Base HTML Metadata

```html
<html lang="es">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="...">
```

## Accessibility

### Focus Management

- `:focus:not(:focus-visible)` removes outline for mouse clicks
- `:focus-visible` applies accent-colored focus ring (`focus-ring` mixin)
- Focus ring: `outline: 2px solid var(--color-accent-500); outline-offset: 2px`
- Dialog `autoFocus: true` focuses first focusable element on open

### Keyboard Navigation

- Dialogs closable via ESC key
- Form submission via Enter key
- Tab navigation through all interactive elements
- Sidebar collapsible, keyboard-accessible

### Screen Reader Support

- `visually-hidden` mixin available for SR-only text
- Semantic HTML used (`<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`)
- Alt text on images
- ARIA attributes on interactive elements where needed

### Color Contrast

- Light theme: dark text on light surfaces (gray-900 on gray-100/white)
- Dark theme: light text on dark surfaces (gray-50 on gray-800/900)
- Brand orange/blue chosen for sufficient contrast ratios

### Responsive Design

- Mobile-first approach via responsive mixins
- Breakpoints: 640 / 768 / 1024 / 1280 / 1536px
- Touch targets sized appropriately for mobile
- Sidebar collapses to hamburger on smaller screens
