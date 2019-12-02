import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';
import { UserLoginData } from 'src/app/core/entities/userLoginData';

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
    this.authService.login(data.userLogin);

    const redirectUrl = this.authService.redirectUrl;

    if (redirectUrl) {
      this.authService.redirectUrl = null;
      this.router.navigateByUrl(redirectUrl);
    } else {
      this.router.navigate(['courses']);
    }
  }
}
