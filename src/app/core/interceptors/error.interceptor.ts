import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NormalizedError } from '../models/normalized-error.model';
import { AuthSessionService } from '../services/auth-session.service';

const FALLBACK_ERROR: NormalizedError = {
  code: 'UNKNOWN_ERROR',
  message: 'An unexpected error occurred',
  details: [],
};

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly authSession: AuthSessionService,
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authSession.clearToken();
          this.router.navigate(['/login']);
        }

        const normalized = this.normalizeError(error);
        return throwError(() => normalized);
      }),
    );
  }

  private normalizeError(error: HttpErrorResponse): NormalizedError {
    if (error.error && typeof error.error === 'object' && 'code' in error.error) {
      return {
        code: error.error.code,
        message: error.error.message || FALLBACK_ERROR.message,
        details: error.error.details || [],
        traceId: error.error.traceId,
      };
    }

    if (error.status === 0) {
      return {
        code: 'NETWORK_ERROR',
        message: 'Unable to connect to the server',
        details: [],
      };
    }

    return { ...FALLBACK_ERROR };
  }
}
