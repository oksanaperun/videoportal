import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { AppState } from 'src/app/core/store/models/app-state';
import { Course } from 'src/app/core/entities';
import {
  getCoursesState,
  ChangeSearchTextAction,
  IncrementCurrentPageAction
} from 'src/app/core/store/courses-store';
import { CoursesState } from 'src/app/core/store/models/courses-state';
import { SetMainRoute } from 'src/app/core/store/breadcrumbs-store';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements AfterViewInit {
  courses$: Observable<Course[]>;
  showLoadMore = true;
  noDataMessageKey: string;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private translateService: TranslateService,
  ) { }

  ngAfterViewInit() {
    this.setBreadcrumbs();
    this.setEmptySearchText();
    this.setCourses();
  }

  onAddButtonClick() {
    this.router.navigate(['courses', 'new']);
  }

  onLoadMoreClick() {
    this.store.dispatch(new IncrementCurrentPageAction());
  }

  onSearchTextChange(searchText: string) {
    this.store.dispatch(new ChangeSearchTextAction(searchText));
  }

  private setBreadcrumbs() {
    this.translateService.get('BREADCRUMBS.COURSES').subscribe(result => {
      this.store.dispatch(new SetMainRoute({
        path: ['courses'],
        title: result
      }));
    });
  }

  private setCourses() {
    this.courses$ = this.store.select(getCoursesState).pipe(
      delay(0),
      tap((state: CoursesState) => { this.setNoDataMessage(state.items, state.searchText); }),
      tap((state: CoursesState) => { this.handleLoadMoreDisplay(state); }),
      map((state: CoursesState) => state.items),
    );
  }

  private setEmptySearchText() {
    this.store.dispatch(new ChangeSearchTextAction(''));
  }

  private setNoDataMessage(courses: Course[], searchText: string) {
    this.noDataMessageKey = !courses.length
      ? (searchText ? 'COURSES.NO_DATA.SEARCH_RESULT' : 'COURSES.NO_DATA.NON_SEARCH_RESULT')
      : '';
  }

  private handleLoadMoreDisplay(state: CoursesState) {
    this.showLoadMore = state.items.length < state.totalCount;
  }
}
