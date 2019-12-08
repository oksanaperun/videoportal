import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BASE_ENDPOINT } from '../api/base-endpoint';
import { LoginResponse } from './loginResponse';

export const LOGIN_ENDPOINT = `${BASE_ENDPOINT}/auth/login`;
export const USER_ENDPOINT = `${BASE_ENDPOINT}/auth/userinfo`;

@Injectable({
  providedIn: 'root'
})
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

    return this.http
      .post(LOGIN_ENDPOINT, loginPayload)
      .pipe(tap(({ token }: LoginResponse) => this.storeAuthToken(token)));
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
