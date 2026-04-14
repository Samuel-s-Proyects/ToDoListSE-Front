# UI System

## Atomic Design — Tactical Application

Atomic design is used **only in `shared/ui/`** to organize reusable visual primitives. It is not applied project-wide.

```
shared/ui/
├── atoms/          # Indivisible inputs to the UI
│   ├── buttons/    # button (variant + size)
│   ├── spinners/   # spinner (configurable size)
│   ├── icons/      # icon (FontAwesome wrapper)
│   └── inputs/     # input (Material form field)
├── molecules/      # Combinations of atoms with a single purpose
│   └── states/     # loading-state, empty-state, error-state
└── organisms/      # Complex, self-contained UI blocks
    ├── feedback-alerts/   # feedback-alert (success/error/warning/info)
    └── dialogs/           # confirm-dialog (generic confirmation)
```

## Atom Catalog

### `app-button`

| Input | Type | Default | Purpose |
|-------|------|---------|---------|
| `variant` | `'primary' \| 'secondary' \| 'accent' \| 'warn' \| 'text'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Sizing |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Shows spinner, blocks clicks |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `fullWidth` | `boolean` | `false` | 100% width |

| Output | Emits | Purpose |
|--------|-------|---------|
| `clicked` | `void` | Safe click (blocked when disabled/loading) |

### `app-icon`

| Input | Type | Default | Purpose |
|-------|------|---------|---------|
| `icon` | `IconDefinition` (required) | — | FontAwesome icon reference |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Icon size |

### `app-spinner`

| Input | Type | Default | Purpose |
|-------|------|---------|---------|
| `size` | `number` | `24` | Diameter in pixels |

### `app-input`

| Input | Type | Default | Purpose |
|-------|------|---------|---------|
| `control` | `FormControl` (required) | — | Reactive form control |
| `label` | `string` | `''` | Field label |
| `placeholder` | `string` | `''` | Placeholder text |
| `hint` | `string` | `''` | Helper text below field |
| `type` | `'text' \| 'email' \| 'password' \| 'number'` | `'text'` | Input type |
| `errorMessages` | `Record<string, string>` | `{}` | Validation key → translated message |

## Molecule Catalog

### `app-loading-state`

| Input | Type | Default | Purpose |
|-------|------|---------|---------|
| `message` | `string` | `''` | Loading message (translatable) |

### `app-empty-state`

| Input | Type | Default | Purpose |
|-------|------|---------|---------|
| `message` | `string` | `''` | Empty message (translatable) |
| `icon` | `IconDefinition?` | — | Optional icon |

### `app-error-state`

| Input | Type | Default | Purpose |
|-------|------|---------|---------|
| `message` | `string` | `''` | Error message |
| `retryLabel` | `string` | `''` | Retry button label |

| Output | Emits | Purpose |
|--------|-------|---------|
| `retry` | `void` | User requested retry |

## Organism Catalog

### `app-feedback-alert`

| Input | Type | Default | Purpose |
|-------|------|---------|---------|
| `type` | `'success' \| 'warning' \| 'error' \| 'info'` | `'info'` | Alert variant |
| `message` | `string` | `''` | Alert body |
| `dismissible` | `boolean` | `false` | Allow dismiss |

| Output | Emits | Purpose |
|--------|-------|---------|
| `dismissed` | `void` | User dismissed alert |

### `app-confirm-dialog`

Opened via `MatDialog.open(ConfirmDialogComponent, { data })`.

```typescript
interface ConfirmDialogData {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  confirmVariant?: 'primary' | 'warn' | 'accent';
}
```

Returns `boolean` — `true` on confirm, `false` on cancel. Closable via ESC key or backdrop click.

## Directives

### `appClickOutside`

| Output | Emits | Purpose |
|--------|-------|---------|
| `appClickOutside` | `void` | Click detected outside host element |

Usage: `<div (appClickOutside)="closeSidebar()">`.

## Icon Strategy

FontAwesome 7 SVG icons are used exclusively. No Unicode icons.

- Icons are imported individually from `@fortawesome/free-solid-svg-icons`
- Rendered via `<fa-icon>` through `FontAwesomeModule`
- Wrapped in `app-icon` atom for consistent sizing

## Angular Material Integration

Angular Material 17 is used for:

| Component | Used For |
|-----------|----------|
| `MatFormField` | Form field wrapper (input atom) |
| `MatInput` | Native input binding |
| `MatDialog` | Confirm dialogs, form dialogs |
| `MatSelect` | Category select in task forms |
| `MatSlideToggle` | Theme toggle |
| `MatProgressSpinner` | Spinner atom |
| `MatTooltip` | Tooltips on icon buttons |

Material theme is defined in `_themes.scss` with custom brand and accent palettes. Light/dark themes are switched via `data-theme` attribute on `<html>`.

## Bootstrap Integration

Bootstrap 5 is used **only for its grid system** (`container`, `row`, `col-*`). No Bootstrap components or JavaScript are used.

## SharedModule Exports

`SharedModule` declares all shared UI components and re-exports common modules:

**Components**: `ButtonComponent`, `SpinnerComponent`, `IconComponent`, `InputComponent`, `EmptyStateComponent`, `LoadingStateComponent`, `ErrorStateComponent`, `FeedbackAlertComponent`, `ConfirmDialogComponent`

**Modules**: `CommonModule`, `ReactiveFormsModule`, `FontAwesomeModule`, `TranslocoModule`, `MatFormFieldModule`, `MatInputModule`, `MatDialogModule`, `MatSelectModule`
