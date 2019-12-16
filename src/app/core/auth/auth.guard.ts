import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.checkLogin(state.url);
  }

  private checkLogin(url: string): Observable<boolean> {
    if (this.authService.isAuthenticated) {
      return of(true);
    }

    this.authService.redirectUrl = url;
    this.router.navigate(['login']);

    return of(false);
  }
}
