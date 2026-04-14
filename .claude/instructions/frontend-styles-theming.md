# Frontend Styles and Theming Instructions

## Objective

Build a disciplined SCSS system that is scalable, themeable, mobile-first, and consistent.

## Official styles structure

Use a styles layer like this:

```text
src/styles/
  _variables.scss
  _mixins.scss
  _functions.scss
  _breakpoints.scss
  _tokens.scss
  _themes.scss
  globals.scss
```

## Import rules

Rules:

- use explicit `@use`
- never use `@use ... as *`
- do not import styles arbitrarily from random places
- shared system files must act as the single source of styling truth

## Variables and mixins

Important rule:

Use variables and mixins that actually exist.

If a needed variable or mixin does not exist, create it in the correct global styles layer first.

Do not invent ad hoc values inside features when they belong to the design system.

## Mobile-first

All styling must be mobile-first.

Use a centralized responsive system with official breakpoints only.

Recommended official breakpoints:

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

All media queries must go through official mixins.

Do not create random breakpoints inside features.

## Spacing scale

Use a controlled spacing system.

Recommended official scale:

- 4
- 8
- 12
- 16
- 24
- 32
- 40
- 48
- 64

Do not use arbitrary spacing values unless justified.

## Token strategy

Use a two-layer styling strategy.

### Base variables

Base values such as raw colors, spacing, shadows, radii, z-indexes, and dimensions may exist as foundational variables.

### Semantic tokens

Use semantic tokens for actual UI meaning.

Examples:

- page background
- surface background
- primary text
- secondary text
- border default
- brand primary
- success/warning/error/info

Features and components should rely on semantic tokens wherever possible.

## Themes

Support both light and dark mode from the beginning.

Rules:

- light is default
- theme is applied on `html` using `data-theme`
- runtime theme switching should rely on CSS custom properties
- SCSS should organize token definition and structure
- theme preference should persist

## Motion mixins

Transitions must be centralized.

Create mixins for repeated motion patterns such as:

- standard hover transition
- focus transition
- card elevation transition
- opacity/transform entrance patterns if needed

Do not hardcode transition durations/easing repeatedly across components.

## Global styles

`globals.scss` should define:

- reset/base rules if needed
- body/html/app shell rules
- typography foundations
- theme application hooks
- global scrollbar styling
- global focus behavior

## Component styling discipline

Rules:

- keep component SCSS clear and modestly nested
- prefer semantic wrappers
- avoid deep selector abuse
- avoid leaking feature-specific design tokens into shared
- do not inline theme logic inside many components if the global theme system can solve it