import { Action } from '@ngrx/store';

import { Course } from 'src/app/core/entities';

export const LOAD_COURSES = '[Courses] Load';
export const LOAD_COURSES_SUCCESS = '[Courses] Loaded courses successfully';
export const CHANGE_SEARCH_TEXT = '[Courses] Change search text';
export const INCREMENT_CURRENT_PAGE = '[Courses] Increment current page';
export const CHANGE_CURRENT_PAGE = '[Courses] Change current page';
export const ADD_COURSE = '[Courses] Add';
export const EDIT_COURSE = '[Courses] Edit';
export const REMOVE_COURSE = '[Courses] Remove';

export class LoadCoursesAction implements Action {
  readonly type = LOAD_COURSES;
  constructor() { }
}

export class LoadCoursesSuccessAction implements Action {
  readonly type = LOAD_COURSES_SUCCESS;
  constructor(public payload: Course[]) { }
}

export class ChangeSearchTextAction implements Action {
  readonly type = CHANGE_SEARCH_TEXT;
  constructor(public payload: string) { }
}

export class IncrementCurrentPageAction implements Action {
  readonly type = INCREMENT_CURRENT_PAGE;
  constructor() { }
}

export class ChangeCurrentPageAction implements Action {
  readonly type = CHANGE_CURRENT_PAGE;
  constructor(public payload: number) { }
}

export class AddCourseAction implements Action {
  readonly type = ADD_COURSE;
  constructor(public payload: Course) { }
}

export class EditCourseAction implements Action {
  readonly type = EDIT_COURSE;
  constructor(public payload: Course) { }
}

export class RemoveCourseAction implements Action {
  readonly type = REMOVE_COURSE;
  constructor(public payload: string) { }
}

export type CoursesActionTypes =
  LoadCoursesAction |
  LoadCoursesSuccessAction |
  ChangeSearchTextAction |
  IncrementCurrentPageAction |
  ChangeCurrentPageAction |
  AddCourseAction |
  EditCourseAction |
  RemoveCourseAction;
