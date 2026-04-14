# Forms & Validation

## Standard

All forms use **Angular Reactive Forms** (`FormControl`, `FormGroup`). No template-driven forms.

## Form Patterns

### Login Form

```typescript
emailControl = new FormControl('', [Validators.required, Validators.email]);
```

Single control, not wrapped in a `FormGroup`. Submitted via `onSubmit()`.

### Create Account Dialog

```typescript
nameControl = new FormControl('', [Validators.required, Validators.maxLength(100)]);
```

Single control for user's display name. Pre-filled email passed via dialog data.

### Task Form Dialog

```typescript
form = new FormGroup({
  title:       new FormControl('', [Validators.required, Validators.maxLength(200)]),
  description: new FormControl('', [Validators.maxLength(1000)]),
  categoryId:  new FormControl<string | null>(null),
  completed:   new FormControl<boolean>(false),
});
```

Populated via `patchValue()` when editing. `completed` field only visible in edit mode.

### Category Form Dialog

```typescript
form = new FormGroup({
  name:  new FormControl('', [Validators.required, Validators.maxLength(50)]),
  color: new FormControl('#0099ff', [Validators.required]),
});
```

Color defaults to accent blue. Populated via `patchValue()` when editing.

## Validation Strategy

### Client-Side

| Validator | Used In |
|-----------|---------|
| `Validators.required` | Email, task title, category name, category color |
| `Validators.email` | Email |
| `Validators.maxLength(n)` | Task title (200), description (1000), category name (50), account name (100) |

### Error Display

`app-input` component handles error display automatically:

1. Checks `control.errors` + `control.touched`
2. Gets first error key
3. Looks up translated message in `errorMessages` input

```html
<app-input
  [control]="emailControl"
  [label]="t('auth.emailLabel')"
  [errorMessages]="{ required: t('auth.emailRequired'), email: t('auth.emailInvalid') }">
</app-input>
```

All validation messages come from translation keys — never hardcoded.

### Server-Side Error Handling

After API calls fail, components check the `NormalizedError.code`:

| Error Code | Behavior |
|------------|----------|
| `USER_NOT_FOUND` | Opens create account dialog |
| `USER_ALREADY_EXISTS` | Shows `auth.userAlreadyExists` message |
| Other auth errors | Shows generic `auth.loginError` or `auth.registerError` |
| Other errors | Handled per-feature with translated messages |

## Dialog Form UX

### Opening

```typescript
const dialogRef = this.dialog.open(TaskFormDialogComponent, {
  data: { task: existingTask, categories, ...translationKeys },
  width: '480px',
  autoFocus: true,
});
```

### Closing Behavior

- ESC key and backdrop click close the dialog (not disabled)
- Cancel button: `dialogRef.close({ confirmed: false })`
- Confirm button: Validates form → `dialogRef.close({ confirmed: true, ...values })`

### Result Contract

All form dialogs return a typed result:

```typescript
interface TaskFormDialogResult {
  confirmed: boolean;
  title?: string;
  description?: string;
  categoryId?: string | null;
  completed?: boolean;
}

interface CategoryFormDialogResult {
  confirmed: boolean;
  name?: string;
  color?: string;
}

interface CreateAccountDialogResult {
  confirmed: boolean;
  name?: string;
}
```

### Loading/Submitting State

- Dialog forms don't manage their own loading state
- The parent component that opened the dialog handles the API call
- Parent sets `loading = true` before call, `loading = false` on complete/error
- Login page button shows spinner via `app-button` `loading` input

## Translation Keys in Dialog Data

Dialog data interfaces include translation key fields (e.g., `titleKey`, `nameLabelKey`). The dialog template uses these with the `transloco` pipe to render translated labels. This keeps dialogs reusable across languages without embedding any hardcoded strings.
