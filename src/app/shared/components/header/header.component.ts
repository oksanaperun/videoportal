import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';
import { AppState } from 'src/app/core/store/models/app-state';
import { LogoutAction, GetUserAction } from 'src/app/core/store/actions/auth.actions';
import { getUser } from 'src/app/core/store/selectors/auth.selectors';
import { User } from 'src/app/core/entities';

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
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    //TODO Current approach can trigger getting user twice
    if (this.authService.getAuthToken()) {
      this.store.dispatch(new GetUserAction());
    }

    this.userName$ = this.store.select(getUser).pipe(
      map((user?: User) => user ? user.getUserName() : ''),
    );
  }

  onLogoClick() {
    this.router.navigate(['courses']);
  }

  onLogoutClick() {
    this.store.dispatch(new LogoutAction());
  }
}
