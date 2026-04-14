# Styles & Theming

## SCSS Architecture

```
src/assets/styles/
├── globals.scss        # Global resets, Material theme application, base styles
├── _variables.scss     # Raw foundational values (colors, spacing, typography, shadows)
├── _tokens.scss        # CSS custom properties per theme (light/dark)
├── _themes.scss        # Angular Material palette + theme definitions
├── _mixins.scss        # Reusable SCSS patterns (responsive, transitions, scrollbar, etc.)
├── _functions.scss     # Utility functions (spacing(), rem())
├── _breakpoints.scss   # Responsive breakpoint values
└── theme.scss          # Re-export consumed by angular.json
```

## Style Loading Order

1. `styles.scss` (entry) → imports `globals.scss`
2. `globals.scss` → `@use`s variables, mixins, tokens, themes
3. Material core + light theme applied globally
4. Dark theme applied via `[data-theme="dark"]` selector
5. Base resets, typography, scrollbar, focus states

## Variables (`_variables.scss`)

### Color Palette

| Token | Range | Purpose |
|-------|-------|---------|
| `$color-gray-*` | 50–900 | Neutral scale |
| `$color-brand-*` | 50–900 | Brand orange (#ff6600 at 900) |
| `$color-accent-*` | 50–900 | Accent blue (#0099ff at 500) |
| `$color-success` | — | #4caf50 |
| `$color-warning` | — | #ff9800 |
| `$color-error` | — | #f44336 |
| `$color-info` | — | #2196f3 |

### Typography

| Variable | Value |
|----------|-------|
| `$font-family-primary` | `"Inter", "Helvetica Neue", sans-serif` |
| `$font-family-mono` | `"Fira Code", "Consolas", monospace` |
| `$font-size-xs` to `$font-size-3xl` | 0.75rem → 2.5rem |
| `$font-weight-light` to `$font-weight-bold` | 300 → 700 |
| `$line-height-tight/base/relaxed` | 1.25 / 1.5 / 1.75 |

### Spacing

4px base unit system:

| Variable | Value |
|----------|-------|
| `$spacing-1` | 4px |
| `$spacing-2` | 8px |
| `$spacing-3` | 12px |
| `$spacing-4` | 16px |
| `$spacing-6` | 24px |
| `$spacing-8` | 32px |
| `$spacing-10` | 40px |
| `$spacing-12` | 48px |
| `$spacing-16` | 64px |

### Borders

| Variable | Value |
|----------|-------|
| `$border-radius-sm` | 4px |
| `$border-radius-base` | 8px |
| `$border-radius-md` | 12px |
| `$border-radius-lg` | 16px |
| `$border-radius-full` | 9999px |

### Shadows

| Level | Description |
|-------|-------------|
| `$shadow-sm` | Subtle lift |
| `$shadow-base` | Default card |
| `$shadow-md` | Elevated card |
| `$shadow-lg` | Prominent elevation |
| `$shadow-xl` | Maximum elevation |

### Z-Index Scale

| Variable | Value | Purpose |
|----------|-------|---------|
| `$z-dropdown` | 100 | Dropdowns |
| `$z-sticky` | 200 | Sticky headers |
| `$z-overlay` | 300 | Overlays |
| `$z-modal` | 400 | Modals/dialogs |
| `$z-toast` | 500 | Toasts/alerts |

### Transitions

| Variable | Value |
|----------|-------|
| `$duration-fast` | 150ms |
| `$duration-base` | 250ms |
| `$duration-slow` | 400ms |
| `$ease-default` | cubic-bezier(0.4, 0, 0.2, 1) |

## Tokens (`_tokens.scss`)

CSS custom properties scoped per theme via `data-theme` attribute.

### Light Theme (`:root` / `[data-theme="light"]`)

| Token | Resolves To |
|-------|-------------|
| `--color-page-bg` | gray-100 |
| `--color-surface` | white |
| `--color-text-primary` | gray-900 |
| `--color-text-secondary` | gray-600 |
| `--color-brand-primary` | brand-900 (#ff6600) |
| `--color-accent-500` | accent-500 (#0099ff) |
| `--color-border` | gray-300 |
| `--shadow-*` | Light shadow values |

### Dark Theme (`[data-theme="dark"]`)

| Token | Resolves To |
|-------|-------------|
| `--color-page-bg` | gray-900 |
| `--color-surface` | gray-800 |
| `--color-text-primary` | gray-50 |
| `--color-text-secondary` | gray-400 |
| `--color-brand-primary` | brand-500 (#ffba00) |
| `--color-accent-500` | accent-400 (#38a8ff) |
| `--color-border` | gray-600 |
| `--shadow-*` | Deeper shadow values |

## Theme Switching

`ThemeService` manages light/dark/system modes:

1. Reads preference from `localStorage` (`todolist_theme`)
2. Defaults to `'system'`
3. Resolves system preference via `matchMedia('(prefers-color-scheme: dark)')`
4. Sets `data-theme` attribute on `document.documentElement`
5. Listens to system changes when preference is `'system'`

```
ThemePreference = 'light' | 'dark' | 'system'
ResolvedTheme = 'light' | 'dark'
```

The `data-theme` attribute drives both CSS custom property switching and Angular Material theme application.

## Mixins (`_mixins.scss`)

### Responsive (Mobile-First)

| Mixin | Min-Width |
|-------|-----------|
| `screen-sm` | 640px |
| `screen-md` | 768px |
| `screen-lg` | 1024px |
| `screen-xl` | 1280px |
| `screen-2xl` | 1536px |

### Transitions

| Mixin | Target |
|-------|--------|
| `transition-base` | All properties |
| `transition-fast` | All (fast) |
| `transition-slow` | All (slow) |
| `transition-colors` | color, bg, border |
| `transition-transform` | transform |
| `transition-opacity` | opacity |
| `transition-shadow` | box-shadow |

### Utilities

| Mixin | Purpose |
|-------|---------|
| `focus-ring` | Accent outline + offset |
| `focus-visible-ring` | `:focus-visible` wrapper |
| `card-hover-elevation` | Shadow on hover |
| `text-truncate` | Overflow ellipsis |
| `custom-scrollbar` | Theme-aware scrollbar |
| `visually-hidden` | Screen-reader-only |

## Functions (`_functions.scss`)

| Function | Purpose | Example |
|----------|---------|---------|
| `spacing($n)` | `$n * 4px` | `spacing(4)` → 16px |
| `rem($px)` | px to rem | `rem(24)` → 1.5rem |

## Breakpoints (`_breakpoints.scss`)

| Name | Value | Usage |
|------|-------|-------|
| `$breakpoint-sm` | 640px | Small devices |
| `$breakpoint-md` | 768px | Tablets |
| `$breakpoint-lg` | 1024px | Laptops |
| `$breakpoint-xl` | 1280px | Desktops |
| `$breakpoint-2xl` | 1536px | Large screens |

## Angular Material Theming (`_themes.scss`)

Custom palettes registered:

- **Brand palette**: Orange scale (#fff7e0 → #ff6600) with contrast values
- **Accent palette**: Blue scale (#e3f3fe → #0248ac) with contrast values
- **Warn palette**: Material red (default)

Typography config uses `"Inter"` font family.

Two themes defined:
- `$app-light-theme` via `mat.define-light-theme()`
- `$app-dark-theme` via `mat.define-dark-theme()`

## Component SCSS Conventions

- Each component has its own `.scss` file
- Components use CSS custom properties (`var(--color-*)`) for theme awareness
- SCSS variables imported with `@use "src/assets/styles/variables" as vars`
- Mixins imported with `@use "src/assets/styles/mixins" as mix`
- No hardcoded colors — always reference tokens or variables
