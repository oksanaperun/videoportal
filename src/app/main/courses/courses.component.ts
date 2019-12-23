import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/core/store/models/app-state';
import { Course } from 'src/app/core/entities';
import { BreadcrumbsService } from 'src/app/core/services/breadcrumbs.service';
import { getCoursesState } from 'src/app/core/store/selectors/courses.selectors';
import { CoursesState } from 'src/app/core/store/models/courses-state';
import {
  ChangeSearchTextAction,
  IncrementCurrentPageAction
} from 'src/app/core/store/actions/courses.actions';
import { COURSES_PER_PAGE } from 'src/app/core/store/effects/courses.effects';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements AfterViewInit {
  courses$: Observable<Course[]>;
  showLoadMore = true;
  noDataMessage: string;

  private previousCoursesCount: number;

  constructor(
    private router: Router,
    private breadcrumbsService: BreadcrumbsService,
    private store: Store<AppState>,
  ) { }

  ngAfterViewInit() {
    this.setBreadcrumbs();
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
    this.breadcrumbsService.setMainRoute({
      path: ['courses'],
      title: 'Courses'
    });
  }

  private setCourses() {
    this.courses$ = this.store.select(getCoursesState).pipe(
      delay(0),
      tap((state: CoursesState) => { this.setNoDataMessage(state.items, state.searchText); }),
      map((state: CoursesState) => state.items),
      tap((courses: Course[]) => { this.handleLoadMoreDisplay(courses); }),
    );
  }

  private setNoDataMessage(courses: Course[], searchText: string) {
    this.noDataMessage = !courses.length
      ? (searchText ? 'no courses found' : 'no data. feel free to add new course')
      : '';
  }

  private handleLoadMoreDisplay(courses: Course[]) {
    this.showLoadMore = courses.length % COURSES_PER_PAGE === 0 &&
      this.previousCoursesCount !== courses.length;
    this.previousCoursesCount = courses.length;
  }
}
