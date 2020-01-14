import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BreadcrumbRoute } from 'src/app/core/entities';
import { AppState } from 'src/app/core/store/models/app-state';
import { getBreadcrumbsState } from 'src/app/core/store/breadcrumbs-store';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  routes$: Observable<BreadcrumbRoute[]>;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.routes$ = this.store.select(getBreadcrumbsState) as Observable<BreadcrumbRoute[]>;
  }

  onRouteClick(path: string[]) {
    this.router.navigate(path);
  }
}
