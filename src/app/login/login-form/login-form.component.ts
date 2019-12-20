import { Component } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  errorMessage: string;

  private userLogin: string;
  private password: string;

  constructor(private loginService: LoginService) { }

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
      const userData = {
        userLogin: this.userLogin,
        password: this.password,
      };

      this.loginService.login(userData).subscribe(() => {
      }, () => {
        this.errorMessage = 'User login or password is incorrect';
      });
    }
  }
}
