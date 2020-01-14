import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  loginForm = this.formBuilder.group({
    userLogin: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.errorMessage$ = this.store.select(getLoginError);
  }

  onSubmit() {
    const loginData = {
      login: this.loginForm.value.userLogin,
      password: this.loginForm.value.password,
    };

    this.store.dispatch(new LoginAction(loginData));
  }

  isControlValid(controlName: string): boolean {
    const control = this.loginForm.controls[controlName];

    return !control.dirty || control.valid;
  }
}
