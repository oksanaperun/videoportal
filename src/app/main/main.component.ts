import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/core/store/models/app-state';
import { GetUserAction } from '../core/store/auth-store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetUserAction());
  }
}
