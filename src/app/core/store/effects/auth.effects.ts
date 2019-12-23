import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, tap, map, catchError } from 'rxjs/operators';

import * as authActions from '../actions/auth.actions';
import { LoginResponse, User } from '../../entities';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../api/user/user.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  @Effect()
  login$ = this.actions.pipe(
    ofType(authActions.LOGIN),
    switchMap((action: authActions.LoginAction) =>
      this.authService.login(action.payload.login, action.payload.password).pipe(
        map((response: LoginResponse) => new authActions.LoginSuccessAction(response)),
        catchError(() => of(new authActions.LoginFailAction())),
      )
    ),
  );

  @Effect()
  loginSuccess$ = this.actions.pipe(
    ofType(authActions.LOGIN_SUCCESS),
    tap((action: authActions.LoginSuccessAction) => { this.storeAuthToken(action.payload.token); }),
    switchMap(() => this.userService.getUser()),
    map((user: User) => new authActions.SetUserAction(user)),
    tap(() => { this.redirectOnLoginSuccess(); }),
  );

  @Effect({ dispatch: false })
  loginFailure$ = this.actions.pipe(
    ofType(authActions.LOGIN_FAIL),
    tap(() => { this.clearAuthToken(); }),
  );

  @Effect()
  logout$ = this.actions.pipe(
    ofType(authActions.LOGOUT),
    tap(() => { this.clearAuthToken(); }),
    map(() => new authActions.SetUserAction(null)),
    tap(() => { this.router.navigate(['login']); }),
  );

  @Effect()
  getUser$ = this.actions.pipe(
    ofType(authActions.GET_USER),
    switchMap(() => this.userService.getUser()),
    map((user: User) => new authActions.SetUserAction(user)),
  );

  private storeAuthToken(token: string) {
    sessionStorage.setItem('authToken', token);
  }

  private clearAuthToken() {
    sessionStorage.removeItem('authToken');
  }

  private redirectOnLoginSuccess() {
    const redirectUrl = this.authService.redirectUrl;

    if (redirectUrl) {
      this.authService.redirectUrl = null;
      this.router.navigateByUrl(redirectUrl);
    } else {
      this.router.navigate(['courses']);
    }
  }
}
