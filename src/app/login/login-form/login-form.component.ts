import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  loginForm = new FormGroup({
    userLogin: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.errorMessage$ = this.store.select(getLoginError);
  }

  getLoginButtonColor(): string {
    return this.loginForm.valid ? '#ffffff' : '#a8a9b4';
  }

  onSubmit() {
    const loginData = {
      login: this.loginForm.value.userLogin,
      password: this.loginForm.value.password,
    };

    this.store.dispatch(new LoginAction(loginData));
  }
}
