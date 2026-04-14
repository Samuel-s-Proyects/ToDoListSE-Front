# Frontend Firebase Deploy Skill

## Purpose

Use this skill whenever you prepare the Angular frontend for deployment, hosting, environments, or CI/CD.

The goal is to keep the frontend ready for Firebase Hosting with practical and clean deployment discipline.

## Hosting target

Deploy the frontend to Firebase Hosting.

## Deployment readiness requirements

The frontend should be prepared for:

- production build
- environment-based configuration
- Firebase Hosting routing support
- clean public asset handling
- stable deploy process

## CI/CD expectations

At minimum, prepare a path for:

- install
- lint
- test
- build
- Firebase deploy

Keep the pipeline practical and aligned with the challenge.

## Environment discipline

Rules:

- do not hardcode secrets
- keep API base URL configurable
- keep API key configuration environment-based
- keep production/staging values separated if applicable

## Routing/deploy concerns

Ensure the app is compatible with SPA hosting behavior on Firebase Hosting.

## Quality concerns before deploy

Before a deploy-ready implementation is considered complete, verify:

- build passes
- routes behave correctly
- guards/interceptors do not break runtime
- i18n still works
- theme switching still works
- no missing assets

## When to apply this skill

Use this skill whenever:

- setting environments
- preparing firebase.json-related behavior
- creating CI/CD workflows
- validating deployment readiness