import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';
import { UserLoginData } from 'src/app/core/entities/userLoginData';
import { LoaderStateService } from 'src/app/core/loader-state/loader-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loaderStateService: LoaderStateService,
  ) { }

  ngOnInit() {
    if (this.isUserAuthenticated) {
      this.router.navigate(['courses']);
    }
  }

  get isUserAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  onLogin(data: UserLoginData) {
    this.loaderStateService.showLoader();

    this.authService
      .login(data.userLogin, data.password)
      .subscribe(() => {
        this.loaderStateService.hideLoader();

        const redirectUrl = this.authService.redirectUrl;

        if (redirectUrl) {
          this.authService.redirectUrl = null;
          this.router.navigateByUrl(redirectUrl);
        } else {
          this.router.navigate(['courses']);
        }
      }, (error) => {
        this.errorMessage = 'User login or password is incorrect';
        this.loaderStateService.hideLoader();
      });
  }
}
