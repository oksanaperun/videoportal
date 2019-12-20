import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';
import { UserLoginData, LoginResponse } from 'src/app/core/entities';

@Injectable()
export class LoginService {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  login(data: UserLoginData): Observable<LoginResponse> {
    return this.authService.login(data.userLogin, data.password).pipe(
      tap(() => {
        const redirectUrl = this.authService.redirectUrl;

        if (redirectUrl) {
          this.authService.redirectUrl = null;
          this.router.navigateByUrl(redirectUrl);
        } else {
          this.router.navigate(['courses']);
        }
      })
    );
  }
}
