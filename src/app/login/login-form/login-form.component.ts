import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/core/store/models/app-state';
import { LoginAction, getLoginError } from 'src/app/core/store/auth-store';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  errorMessage$: Observable<string>;

  private userLogin: string;
  private password: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.errorMessage$ = this.store.select(getLoginError);
  }

  isLoginEnabled(): boolean {
    return !!this.userLogin && !!this.password;
  }

  getLoginButtonColor(): string {
    return this.isLoginEnabled() ? '#ffffff' : '#a8a9b4';
  }

  onUserLoginChange(userLogin: string) {
    this.userLogin = userLogin;
  }

  onPasswordChange(password: string) {
    this.password = password;
  }

  onLoginButtonClick() {
    if (this.isLoginEnabled()) {
      const loginData = {
        login: this.userLogin,
        password: this.password,
      };

      this.store.dispatch(new LoginAction(loginData));
    }
  }
}
