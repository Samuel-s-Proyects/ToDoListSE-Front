import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionUser } from '../models/session-user.model';

const JWT_STORAGE_KEY = 'todolist_jwt';
const USER_STORAGE_KEY = 'todolist_user';

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getToken(): string | null {
    return sessionStorage.getItem(JWT_STORAGE_KEY);
  }

  getUser(): SessionUser | null {
    const raw = sessionStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  setSession(token: string, user: SessionUser): void {
    sessionStorage.setItem(JWT_STORAGE_KEY, token);
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    this.isAuthenticatedSubject.next(true);
  }

  setToken(token: string): void {
    sessionStorage.setItem(JWT_STORAGE_KEY, token);
    this.isAuthenticatedSubject.next(true);
  }

  clearToken(): void {
    sessionStorage.removeItem(JWT_STORAGE_KEY);
    sessionStorage.removeItem(USER_STORAGE_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  private hasToken(): boolean {
    return !!sessionStorage.getItem(JWT_STORAGE_KEY);
  }
}
