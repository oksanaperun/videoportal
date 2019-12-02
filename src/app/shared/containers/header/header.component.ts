import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  get hasUserBox(): boolean {
    return this.authService.isAuthenticated;
  }

  onLogoClick() {
    this.router.navigate(['courses']);
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
