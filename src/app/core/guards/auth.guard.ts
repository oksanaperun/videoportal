import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkLogin(state.url);
  }

  private checkLogin(url: string): Observable<boolean> {
    if (this.authService.getAuthToken()) {
      return of(true);
    }

    this.authService.redirectUrl = url;
    this.router.navigate(['login']);

    return of(false);
  }
}
