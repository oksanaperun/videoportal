import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, iif, of } from 'rxjs';
import { tap, map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/core/store/models/app-state';
import { CourseService } from 'src/app/core/api/courses/course.service';
import { BreadcrumbsService } from 'src/app/core/services/breadcrumbs.service';
import { Course, Author } from 'src/app/core/entities';
import { AddCourseAction, EditCourseAction } from 'src/app/core/store/actions/courses.actions';

// TODO Workaround until dropdown implementation
const TEST_AUTHOR = {
  id: 7458,
  name: 'Deana',
  lastName: 'Bruce'
};

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnChanges {
  formTitle: string;
  course: Course;

  title: string;
  descripiton: string;
  duration: number;
  date = Date.now();
  authors: Author[] = [];
  errorMessage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CourseService,
    private breadcrumbsService: BreadcrumbsService,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      mergeMap((id: string) => iif(() => id === 'new', this.handleNewCourse(), this.handleEditCourse(id))),
    ).subscribe((course?: Course) => {
      this.course = course;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const course = changes.course ? changes.course.currentValue : null;

    if (course) {
      this.setCourseData(course);
    }
  }

  // TODO Workaround until dropdown implementation
  getAuthorsString(): string {
    return this.authors.map(({ name, lastName }) => `${name} ${lastName}`).join(', ');
  }

  onTitleChange(value: string) {
    this.title = value;
  }

  onDescriptionChange(value: string) {
    this.descripiton = value;
  }

  onDurationChange(value: number) {
    this.duration = value;
  }

  onDateChange(value: number) {
    this.date = value;
  }

  onAuthorsChange(value: string) {
    this.authors = [TEST_AUTHOR];
  }

  onSaveButtonClick() {
    const newCourse = new Course(
      this.course ? this.course.id : null,
      this.title,
      this.date,
      this.duration,
      this.descripiton,
      this.authors.length ? this.authors : [TEST_AUTHOR],
      this.course ? this.course.topRated : undefined
    );

    this.course
      ? this.updateCourse(newCourse)
      : this.createCourse(newCourse);
  }

  onCancelButtonClick() {
    this.router.navigate(['courses']);
  }

  private handleNewCourse(): Observable<any> {
    return of(null).pipe(
      tap(() => {
        this.formTitle = 'New course';

        this.breadcrumbsService.setChildRoute({
          path: ['courses', 'new'],
          title: 'New course'
        });
      })
    );
  }

  private handleEditCourse(id: string): Observable<Course> {
    return this.coursesService.get(id).pipe(
      tap((course: Course) => {
        if (course) {
          this.formTitle = course.title;
          this.setCourseData(course);

          this.breadcrumbsService.setChildRoute({
            path: ['courses', course.id],
            title: course.title
          });
        } else {
          this.router.navigate(['404']);
        }
      })
    );
  }

  private setCourseData(course: Course) {
    this.title = course.title;
    this.descripiton = course.description;
    this.duration = course.duration;
    this.date = course.creationDate;
    this.authors = course.authors;
  }

  private createCourse(course: Course) {
    this.store.dispatch(new AddCourseAction(course));
  }

  private updateCourse(course: Course) {
    this.store.dispatch(new EditCourseAction(course));
  }
}
