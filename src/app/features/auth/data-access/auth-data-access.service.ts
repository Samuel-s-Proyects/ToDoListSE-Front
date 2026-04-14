import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginResponse, RegisterResponse } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthDataAccessService {
  private readonly baseUrl = `${environment.apiBaseUrl}/auth`;

  constructor(private readonly http: HttpClient) {}

  login(email: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { email });
  }

  register(email: string, name: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, { email, name });
  }
}
