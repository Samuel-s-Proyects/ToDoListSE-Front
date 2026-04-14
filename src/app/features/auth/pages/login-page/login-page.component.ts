import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@jsverse/transloco';
import { AuthDataAccessService } from '../../data-access/auth-data-access.service';
import { AuthSessionService } from '../../../../core/services/auth-session.service';
import { NormalizedError } from '../../../../core/models/normalized-error.model';
import {
  CreateAccountDialogComponent,
} from '../../dialogs/create-account-dialog/create-account-dialog.component';
import {
  CreateAccountDialogData,
  CreateAccountDialogResult,
} from '../../dialogs/create-account-dialog/create-account-dialog.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  loading = false;
  errorMessageKey: string | null = null;

  constructor(
    private readonly authDataAccess: AuthDataAccessService,
    private readonly authSession: AuthSessionService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly transloco: TranslocoService,
  ) {}

  onSubmit(): void {
    this.emailControl.markAsTouched();

    if (this.emailControl.invalid || this.loading) return;

    this.loading = true;
    this.errorMessageKey = null;

    const email = this.emailControl.value!.trim().toLowerCase();

    this.authDataAccess.login(email).subscribe({
      next: (response) => {
        this.authSession.setSession(response.token, response.user);
        this.loading = false;
        this.router.navigate(['/tasks']);
      },
      error: (err: NormalizedError) => {
        this.loading = false;

        if (err.code === 'USER_NOT_FOUND') {
          this.openCreateAccountDialog(email);
          return;
        }

        this.errorMessageKey = 'auth.loginError';
      },
    });
  }

  private openCreateAccountDialog(email: string): void {
    const dialogData: CreateAccountDialogData = {
      email,
      titleKey: 'auth.createAccountTitle',
      messageKey: 'auth.createAccountMessage',
      nameLabelKey: 'auth.createAccountNameLabel',
      namePlaceholderKey: 'auth.createAccountNamePlaceholder',
      nameRequiredKey: 'auth.createAccountNameRequired',
      confirmKey: 'auth.createAccountConfirm',
      cancelKey: 'auth.createAccountCancel',
    };

    const dialogRef = this.dialog.open(CreateAccountDialogComponent, {
      data: dialogData,
      width: '400px',
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result: CreateAccountDialogResult | undefined) => {
      if (!result?.confirmed || !result.name) return;

      this.loading = true;
      this.errorMessageKey = null;

      this.authDataAccess.register(email, result.name).subscribe({
        next: (response) => {
          this.authSession.setSession(response.token, response.user);
          this.loading = false;
          this.router.navigate(['/tasks']);
        },
        error: (err: NormalizedError) => {
          this.loading = false;

          if (err.code === 'USER_ALREADY_EXISTS') {
            this.errorMessageKey = 'auth.userAlreadyExists';
            return;
          }

          this.errorMessageKey = 'auth.registerError';
        },
      });
    });
  }
}

