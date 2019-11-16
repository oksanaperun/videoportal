import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get isAuthenticated(): boolean {
    return !!this.getUserInfo();
  }

  getUserInfo(): string {
    return localStorage.getItem('user');
  }

  login(userLogin: string) {
    localStorage.setItem('user', userLogin);
  }

  logout() {
    localStorage.removeItem('user');
  }
}
