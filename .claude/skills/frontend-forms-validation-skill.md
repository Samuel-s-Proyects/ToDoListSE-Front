# Frontend Forms and Validation Skill

## Purpose

Use this skill whenever you build or modify a form in ToDoListSE.

The goal is to keep all forms reactive, consistent, accessible, localized, and resilient.

## Official standard

All forms must use **Reactive Forms**.

Do not use template-driven forms for core feature forms.

## Required form behavior

Every form should support when relevant:

- labels
- placeholders
- hints
- validation
- translated error messages
- disabled state
- submit loading state
- backend error handling
- submit blocking to prevent double click
- success feedback when relevant

## Error visibility rules

Input-level errors should appear consistently, typically after:

- touched
- dirty
- submit attempt

Keep the UX consistent across features.

## Translation discipline

All visible form text must be translatable.

Examples:

- labels
- placeholders
- hints
- validation messages
- submit button text
- backend error messages where localized by the frontend

## Shared UI rule

Do not redesign inputs/buttons inside features.

Use official shared input/button families.

## Accessibility rules

Forms must be accessible.

Required concerns:

- keyboard navigation
- label/input association
- clear error text
- focus management
- accessible dialogs containing forms

## Suggested form scenarios

### Login form

- email only
- clean validation
- backend feedback mapped clearly
- polished dialog flow if user must confirm account creation

### Task form

- title
- description
- category
- completed state if relevant to edit flow
- proper validation and UX

### Category form

- category fields with consistent validation

## Backend error integration

Frontend forms should never depend on raw transport errors.

Normalize backend responses before the form layer consumes them.

## When to apply this skill

Use this skill whenever:

- creating forms
- updating validations
- integrating backend errors into forms
- reviewing form UX and accessibility