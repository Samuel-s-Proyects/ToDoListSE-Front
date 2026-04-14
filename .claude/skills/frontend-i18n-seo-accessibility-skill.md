# Frontend i18n, SEO, and Accessibility Skill

## Purpose

Use this skill whenever you work on visible text, localization, metadata, accessibility, or keyboard interactions.

The goal is to keep the app usable, polished, and challenge-aligned without unnecessary complexity.

## i18n standard

Use Transloco.

Requirements:

- Spanish default
- English secondary language
- all visible UI strings translatable
- feature namespaces
- semantic translation keys
- avoid unnecessary translation complexity

Suggested namespaces:

- common
- layout
- home
- auth
- tasks
- categories

## Hardcoded text rule

Do not leave visible strings hardcoded in templates or user-facing UI flows.

## SEO scope

Apply SEO proportionally and correctly.

Priority targets:

- Home
- Login/public pages where useful

Minimum metadata when relevant:

- title
- description
- canonical when it makes sense

Metadata should be compatible with localization.

JSON-LD is allowed when it is clean and useful, especially for Home.

## Accessibility

Accessibility is mandatory.

Required concerns:

- keyboard navigation
- semantic structure
- proper labels
- focus visibility
- accessible dialogs
- accessible form feedback
- accessible loading/error/empty states
- appropriate alt text when applicable
- keyboard-usable tables and controls

## Dialog accessibility

Dialogs must support:

- keyboard navigation
- focus trapping or equivalent accessible behavior
- clear primary/secondary actions
- readable titles and messages

## Tables and lists

Tables and repeated structures must remain keyboard-usable and efficient.

Use:

- semantic structure where possible
- `trackBy`
- clear focusable actions

## When to apply this skill

Use this skill whenever:

- creating visible text
- adding metadata
- building dialogs
- reviewing keyboard navigation
- auditing accessible forms and lists