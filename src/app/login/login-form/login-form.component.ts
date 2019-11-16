import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserLoginData } from 'src/app/core/entities/userLoginData';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Input() errorMessage: string;

  @Output() login = new EventEmitter<UserLoginData>();

  private userLogin: string;
  private password: string;

  get isLoginEnabled(): boolean {
    return !!this.userLogin && !!this.password;
  }

  get loginButtonColor(): string {
    return this.isLoginEnabled ? '#ffffff' : '#a8a9b4';
  }

  onUserLoginChange(userLogin: string) {
    this.userLogin = userLogin;
  }

  onPasswordChange(password: string) {
    this.password = password;
  }

  onLoginButtonClick() {
    if (this.isLoginEnabled) {
      this.login.emit({
        userLogin: this.userLogin,
        password: this.password,
      });
    }
  }
}
