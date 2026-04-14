import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { of, throwError } from 'rxjs';

import { LoginPageComponent } from './login-page.component';
import { AuthDataAccessService } from '../../data-access/auth-data-access.service';
import { AuthSessionService } from '../../../../core/services/auth-session.service';
import { NormalizedError } from '../../../../core/models/normalized-error.model';

const es = {
  auth: {
    loginTitle: 'Iniciar sesión',
    loginSubtitle: 'Ingresa tu correo',
    emailLabel: 'Correo',
    emailPlaceholder: 'tu@correo.com',
    emailRequired: 'Requerido',
    emailInvalid: 'Inválido',
    loginButton: 'Ingresar',
    loginError: 'Error de login',
    registerError: 'Error de registro',
    userAlreadyExists: 'Ya existe',
    createAccountTitle: 'Crear cuenta',
    createAccountMessage: 'No existe.',
    createAccountNameLabel: 'Nombre',
    createAccountNamePlaceholder: 'Tu nombre',
    createAccountNameRequired: 'Requerido',
    createAccountConfirm: 'Crear',
    createAccountCancel: 'Cancelar',
  },
};

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let authDataAccess: jasmine.SpyObj<AuthDataAccessService>;
  let authSession: jasmine.SpyObj<AuthSessionService>;
  let router: jasmine.SpyObj<Router>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    authDataAccess = jasmine.createSpyObj('AuthDataAccessService', ['login', 'register']);
    authSession = jasmine.createSpyObj('AuthSessionService', ['setSession', 'setToken']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [
        ReactiveFormsModule,
        TranslocoTestingModule.forRoot({
          langs: { es },
          translocoConfig: { availableLangs: ['es'], defaultLang: 'es' },
        }),
      ],
      providers: [
        { provide: AuthDataAccessService, useValue: authDataAccess },
        { provide: AuthSessionService, useValue: authSession },
        { provide: Router, useValue: router },
        { provide: MatDialog, useValue: dialog },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    const fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if email is empty', () => {
    component.onSubmit();
    expect(authDataAccess.login).not.toHaveBeenCalled();
  });

  it('should not submit if email is invalid', () => {
    component.emailControl.setValue('bad-email');
    component.onSubmit();
    expect(authDataAccess.login).not.toHaveBeenCalled();
  });

  it('should call login and navigate on success', fakeAsync(() => {
    const response = {
      token: 'jwt-123',
      user: { id: '1', email: 'test@test.com', name: 'Test' },
    };
    authDataAccess.login.and.returnValue(of(response));

    component.emailControl.setValue('test@test.com');
    component.onSubmit();
    tick();

    expect(authDataAccess.login).toHaveBeenCalledWith('test@test.com');
    expect(authSession.setSession).toHaveBeenCalledWith('jwt-123', response.user);
    expect(router.navigate).toHaveBeenCalledWith(['/tasks']);
    expect(component.loading).toBeFalse();
  }));

  it('should open dialog on USER_NOT_FOUND', fakeAsync(() => {
    const error: NormalizedError = {
      code: 'USER_NOT_FOUND',
      message: 'User not found',
      details: [],
    };
    authDataAccess.login.and.returnValue(throwError(() => error));

    const dialogRef = jasmine.createSpyObj<MatDialogRef<unknown>>('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of({ confirmed: false }));
    dialog.open.and.returnValue(dialogRef);

    component.emailControl.setValue('new@test.com');
    component.onSubmit();
    tick();

    expect(dialog.open).toHaveBeenCalled();
    expect(component.loading).toBeFalse();
  }));

  it('should register user and navigate after dialog confirm', fakeAsync(() => {
    const loginError: NormalizedError = {
      code: 'USER_NOT_FOUND',
      message: 'User not found',
      details: [],
    };
    authDataAccess.login.and.returnValue(throwError(() => loginError));

    const registerResponse = {
      token: 'jwt-456',
      user: { id: '2', email: 'new@test.com', name: 'New' },
    };
    authDataAccess.register.and.returnValue(of(registerResponse));

    const dialogRef = jasmine.createSpyObj<MatDialogRef<unknown>>('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of({ confirmed: true, name: 'New' }));
    dialog.open.and.returnValue(dialogRef);

    component.emailControl.setValue('new@test.com');
    component.onSubmit();
    tick();

    expect(authDataAccess.register).toHaveBeenCalledWith('new@test.com', 'New');
    expect(authSession.setSession).toHaveBeenCalledWith('jwt-456', registerResponse.user);
    expect(router.navigate).toHaveBeenCalledWith(['/tasks']);
  }));

  it('should show login error on unexpected failure', fakeAsync(() => {
    const error: NormalizedError = {
      code: 'INTERNAL_ERROR',
      message: 'Server error',
      details: [],
    };
    authDataAccess.login.and.returnValue(throwError(() => error));

    component.emailControl.setValue('test@test.com');
    component.onSubmit();
    tick();

    expect(component.errorMessageKey).toBe('auth.loginError');
    expect(component.loading).toBeFalse();
  }));
});
