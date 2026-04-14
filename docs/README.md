# ToDoListSE Frontend — Documentation Index

## Overview

This is the documentation for the frontend of **ToDoListSE**, a full-stack task management application built as a technical challenge solution.

The frontend is an Angular 17 application using NgModules, feature-first architecture, Angular Material, Bootstrap grid, SCSS design tokens, Transloco i18n, and FontAwesome SVG icons. It consumes a REST API secured with JWT and API key, deployed on Firebase Hosting.

## Documentation Map

| Document | Description |
|----------|-------------|
| [architecture.md](architecture.md) | Frontend architecture, feature-first design, NgModules, layer relationships |
| [folder-structure.md](folder-structure.md) | Directory tree, naming conventions, placement rules |
| [ui-system.md](ui-system.md) | Shared UI components, atomic design, Angular Material, FontAwesome |
| [styles-theming.md](styles-theming.md) | SCSS system, tokens, themes, breakpoints, dark/light mode |
| [routing-state-http.md](routing-state-http.md) | Routing, guards, interceptors, data-access, JWT, observables |
| [forms-validation.md](forms-validation.md) | Reactive Forms, validation, error handling, dialog UX |
| [i18n-seo-accessibility.md](i18n-seo-accessibility.md) | Transloco, SEO, accessibility, keyboard navigation |
| [features.md](features.md) | Home, Auth, Tasks, Categories — per-feature documentation |
| [testing.md](testing.md) | Testing strategy, tools, coverage, Definition of Done |
| [deploy.md](deploy.md) | Firebase Hosting, environments, build, CI/CD |
| [decisions.md](decisions.md) | Technical decision log (ADR-style) |
| [challenge-compliance.md](challenge-compliance.md) | Challenge requirements mapped to implementation |
| [engineering-principles.md](engineering-principles.md) | Applied principles with code references |

## Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Create .env from template
cp .env.example .env

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Lint
npm run lint
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Angular 17 (NgModules) |
| UI Library | Angular Material 17 |
| Grid | Bootstrap 5 (grid only) |
| Icons | FontAwesome 7 (SVG) |
| i18n | Transloco 8 |
| Styling | SCSS + CSS custom properties |
| State | RxJS + Services |
| Auth | JWT (sessionStorage) + API key (interceptor) |
| Testing | Karma + Jasmine |
| Deploy | Firebase Hosting |
