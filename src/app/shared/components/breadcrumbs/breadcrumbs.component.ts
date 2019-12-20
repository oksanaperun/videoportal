import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { BreadcrumbsService } from 'src/app/core/services/breadcrumbs.service';
import { BreadcrumbRoute } from 'src/app/core/entities';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  routes$: Observable<BreadcrumbRoute[]>;

  constructor(
    private router: Router,
    private breadcrumbsService: BreadcrumbsService,
  ) { }

  ngOnInit() {
    this.routes$ = this.breadcrumbsService.getRoutes();
  }

  onRouteClick(path: string[]) {
    this.router.navigate(path);
  }
}
