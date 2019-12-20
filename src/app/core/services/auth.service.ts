import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoginResponse } from '../entities/loginResponse';

@Injectable()
export class AuthService {
  redirectUrl: string;

  constructor(
    private http: HttpClient,
  ) { }

  get isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  login(userLogin: string, password: string): Observable<LoginResponse> {
    const loginPayload = {
      login: userLogin,
      password
    };

    return this.http.post<LoginResponse>('auth/login', loginPayload).pipe(
      tap(({ token }: LoginResponse) => this.storeAuthToken(token))
    );
  }

  logout() {
    this.clearAuthToken();
  }

  private storeAuthToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  private clearAuthToken() {
    localStorage.removeItem('authToken');
  }
}
