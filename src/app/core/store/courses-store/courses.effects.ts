import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators';

import * as coursesActions from './courses.actions';
import { CourseService } from '../../api/courses/course.service';
import { Course } from '../../entities';
import { AppState } from '../models/app-state';
import { CourseGetListActionModel } from '../../api/courses/models/course-get-list-action.model';

export const COURSES_PER_PAGE = 5;

@Injectable()
export class CoursesEffects {
  constructor(
    private actions: Actions,
    private store: Store<AppState>,
    private router: Router,
    private courseService: CourseService,
  ) { }

  @Effect()
  loadCourses$ = this.actions.pipe(
    ofType(coursesActions.LOAD_COURSES),
    withLatestFrom(this.store),
    map(([action, store]) => {
      const { searchText, currentPage } = store.courses;
      const startIndex = (currentPage - 1) * COURSES_PER_PAGE;

      return new CourseGetListActionModel(startIndex, COURSES_PER_PAGE, searchText, 'date');
    }),
    switchMap((model: CourseGetListActionModel) => this.courseService.getList(model)),
    map((courses: Course[]) => new coursesActions.LoadCoursesSuccessAction(courses)),
  );

  @Effect()
  changeSearchText$ = this.actions.pipe(
    ofType(coursesActions.CHANGE_SEARCH_TEXT),
    map(() => new coursesActions.LoadCoursesAction()),
  );

  @Effect()
  incrementCurrentPage$ = this.actions.pipe(
    ofType(coursesActions.INCREMENT_CURRENT_PAGE),
    withLatestFrom(this.store),
    map(([action, store]) => new coursesActions.ChangeCurrentPageAction(store.courses.currentPage + 1)),
  );

  @Effect()
  changeCurrentPage$ = this.actions.pipe(
    ofType(coursesActions.CHANGE_CURRENT_PAGE),
    map(() => new coursesActions.LoadCoursesAction()),
  );

  @Effect()
  addCourse$ = this.actions.pipe(
    ofType(coursesActions.ADD_COURSE),
    switchMap((action: coursesActions.AddCourseAction) => this.courseService.create(action.payload)),
    map(() => new coursesActions.LoadCoursesAction()),
    tap(() => { this.router.navigate(['courses']); }),
  );

  @Effect()
  editCourse$ = this.actions.pipe(
    ofType(coursesActions.EDIT_COURSE),
    switchMap((action: coursesActions.EditCourseAction) => this.courseService.update(action.payload)),
    map(() => new coursesActions.LoadCoursesAction()),
    tap(() => { this.router.navigate(['courses']); }),
  );

  @Effect()
  removeCourse$ = this.actions.pipe(
    ofType(coursesActions.REMOVE_COURSE),
    switchMap((action: coursesActions.RemoveCourseAction) => this.courseService.remove(action.payload)),
    map(() => new coursesActions.LoadCoursesAction()),
  );
}
