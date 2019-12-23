import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginResponse } from '../entities/loginResponse';

@Injectable()
export class AuthService {
  redirectUrl: string;

  constructor(
    private http: HttpClient,
  ) { }

  getAuthToken() {
    return sessionStorage.getItem('authToken');
  }

  login(userLogin: string, password: string): Observable<LoginResponse> {
    const loginPayload = {
      login: userLogin,
      password
    };

    return this.http.post<LoginResponse>('auth/login', loginPayload);
  }
}
