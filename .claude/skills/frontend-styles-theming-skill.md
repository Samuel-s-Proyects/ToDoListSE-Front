# Frontend Styles and Theming Skill

## Purpose

Use this skill whenever you create or modify styles, themes, tokens, mixins, spacing rules, breakpoints, transitions, or global visual behavior.

The goal is to maintain a scalable, mobile-first, themeable SCSS system.

## Official styles structure

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

## Import discipline

Rules:

- use explicit `@use`
- never use `@use ... as *`
- do not create random import patterns
- global style primitives must remain the source of truth

## Variables and mixins rule

Use variables and mixins that actually exist.

If a needed variable or mixin does not exist yet:

- create it in the correct global styles file first
- then consume it from features/components

Do not invent ad hoc local tokens that should belong to the global design system.

## Mobile-first

All styles must be mobile-first.

## Breakpoints

Use only official breakpoint mixins.

Recommended official breakpoints:

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

Do not create arbitrary media queries inside features.

## Spacing

Use the official spacing scale.

Recommended scale:

- 4
- 8
- 12
- 16
- 24
- 32
- 40
- 48
- 64

Avoid arbitrary spacing unless clearly justified.

## Token strategy

Use two layers:

### Base layer

Raw foundational values such as:

- raw colors
- radii
- shadows
- durations
- z-indexes
- container widths

### Semantic layer

Meaning-based tokens such as:

- page background
- surface background
- primary text
- secondary text
- default border
- brand primary
- success/warning/error/info

Features and components should consume semantic tokens when possible.

## Themes

Support:

- light
- dark

Rules:

- light is default
- use `data-theme` on `html`
- use CSS custom properties for runtime theme switching
- persist the selected theme

## Motion

Centralize repeated motion patterns in SCSS mixins.

Use mixins for:

- standard transitions
- hover/focus transitions
- card elevation changes
- repeated opacity/transform patterns if needed

Do not scatter transition values across components.

Use Angular Material’s built-in motion where it already solves the problem.

## Global scrollbar

Scrollbar styling must be global.

Requirements:

- polished
- theme-aware
- not redefined per component

## Component styling rules

- modest nesting
- semantic wrapper names
- avoid deep selector abuse
- do not leak local feature tokens into the global system
- avoid inline styles unless truly necessary

## When to apply this skill

Use this skill whenever:

- adding new tokens or variables
- creating mixins
- styling components or layouts
- implementing dark mode
- reviewing responsiveness or design consistency