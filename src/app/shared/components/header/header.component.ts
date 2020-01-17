import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material';

import { AppState } from 'src/app/core/store/models/app-state';
import { LogoutAction, getUser } from 'src/app/core/store/auth-store';
import { User } from 'src/app/core/entities';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName$: Observable<string>;

  languages = [
    { id: 'en', name: 'ENG' },
    { id: 'uk', name: 'УКР' }
  ];

  selectedLanguage: string;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private languageService: LanguageService,
  ) { }

  ngOnInit() {
    this.userName$ = this.store.select(getUser).pipe(
      map((user?: User) => user ? user.getUserName() : ''),
    );

    this.setLanguage();
  }

  onLogoClick() {
    this.router.navigate(['courses']);
  }

  onLogoutClick() {
    this.store.dispatch(new LogoutAction());
  }

  onLanguageChange(event: MatSelectChange) {
    this.languageService.setLanguage(event.value);
    window.location.reload();
  }

  private setLanguage() {
    this.selectedLanguage = this.languageService.getLanguage();
  }
}
