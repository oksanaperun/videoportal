import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BreadcrumbRoute } from 'src/app/core/entities';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {
  private routes$ = new BehaviorSubject<BreadcrumbRoute[]>([]);

  getRoutes() {
    return this.routes$.asObservable();
  }

  setMainRoute(route: BreadcrumbRoute) {
    this.routes$.next([route]);
  }

  setChildRoute(route: BreadcrumbRoute) {
    const currentRoutes = this.routes$.getValue();

    this.routes$.next([...currentRoutes, route]);
  }
}
