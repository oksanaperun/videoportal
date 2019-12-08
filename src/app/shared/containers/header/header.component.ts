import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/core/api/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName$: Observable<string>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userName$ = this.userService.getUserName();
  }

  onLogoClick() {
    this.router.navigate(['courses']);
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
