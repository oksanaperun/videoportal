import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, iif, of } from 'rxjs';
import { tap, map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/core/store/models/app-state';
import { CourseService } from 'src/app/core/api/courses/course.service';
import { Course, Author, SelectOption } from 'src/app/core/entities';
import { AddCourseAction, EditCourseAction } from 'src/app/core/store/courses-store';
import { SetChildRoute } from 'src/app/core/store/breadcrumbs-store';
import { AuthorService } from 'src/app/core/api/author/author.service';
import { AuthorDto } from 'src/app/core/api/author/dtos/author.dto';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  formTitle: string;

  authorOptions$: Observable<SelectOption[]>;

  courseForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    duration: new FormControl(0, [Validators.required, Validators.min(1)]),
    date: new FormControl(null, Validators.required),
    authors: new FormControl([], Validators.required),
  });

  private courseId: string;
  private isCourseTopRated = false;
  private authorsSourceData: AuthorDto[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CourseService,
    private store: Store<AppState>,
    private authorService: AuthorService,
  ) { }

  ngOnInit() {
    this.getCourse();
    this.getAuthors();
  }

  onSubmit() {
    const { title, description, duration, date, authors } = this.courseForm.value;
    const newCourse = new Course(
      this.courseId || null,
      title,
      date,
      duration,
      description,
      this.mapSelectOptionsToAuthors(authors),
      this.isCourseTopRated,
    );

    this.courseId
      ? this.updateCourse(newCourse)
      : this.createCourse(newCourse);
  }

  onCancelButtonClick() {
    this.router.navigate(['courses']);
  }

  getSubmitButtonColor(): string {
    return this.courseForm.valid ? '#ffffff' : '#a8a9b4';
  }

  isControlValid(controlName: string): boolean {
    const control = this.courseForm.controls[controlName];

    return !control.dirty || control.valid;
  }

  isControlRequiredError(controlName: string): boolean {
    const control = this.courseForm.controls[controlName];

    return control.dirty && control.errors && control.errors.required;
  }

  isControlMaxLengthError(controlName: string): boolean {
    const control = this.courseForm.controls[controlName];

    return control.dirty && control.errors && control.errors.maxlength;
  }

  isControlMinError(controlName: string): boolean {
    const control = this.courseForm.controls[controlName];

    return control.dirty && control.errors && control.errors.min;
  }

  private getCourse() {
    this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      mergeMap((id: string) => iif(() => id === 'new', this.handleNewCourse(), this.handleEditCourse(id))),
    ).subscribe((course?: Course) => {
      if (course) {
        this.setCourseData(course);
      }
    });
  }

  private getAuthors() {
    this.authorOptions$ = this.authorService.get().pipe(
      tap((authors: AuthorDto[]) => { this.authorsSourceData = authors; }),
      map((authors: AuthorDto[]) => this.mapAuthorsToSelectOptions(authors)),
      map((options: SelectOption[]) => options.sort(this.sortAuthorOptions)),
    );
  }

  private handleNewCourse(): Observable<any> {
    return of(null).pipe(
      tap(() => {
        this.formTitle = 'New course';

        this.store.dispatch(new SetChildRoute({
          path: ['courses', 'new'],
          title: 'New course'
        }));
      })
    );
  }

  private handleEditCourse(id: string): Observable<Course> {
    return this.coursesService.get(id).pipe(
      tap((course: Course) => {
        if (course) {
          this.formTitle = course.title;
          this.setCourseData(course);

          this.store.dispatch(new SetChildRoute({
            path: ['courses', course.id],
            title: course.title
          }));
        } else {
          this.router.navigate(['404']);
        }
      })
    );
  }

  private setCourseData(course: Course) {
    this.courseId = course.id;
    this.isCourseTopRated = course.topRated;

    this.courseForm.setValue({
      title: course.title,
      description: course.description,
      duration: course.duration,
      date: course.creationDate,
      authors: this.mapAuthorsToSelectOptions(course.authors)
    });
  }

  private mapAuthorsToSelectOptions(authors: Author[]): SelectOption[] {
    return authors.map(author => ({
      id: author.id,
      label: `${author.name} ${author.lastName}`,
    }));
  }

  private mapSelectOptionsToAuthors(options: SelectOption[]): Author[] {
    return options.map((option: SelectOption) => {
      const { id, name, lastName } = this.authorsSourceData.find(author => author.id === option.id);

      return new Author(id, name, lastName);
    });
  }

  private sortAuthorOptions(option1: SelectOption, option2: SelectOption): number {
    return option1.label < option2.label ? -1 : (option1.label > option2.label ? 1 : 0);
  }

  private createCourse(course: Course) {
    this.store.dispatch(new AddCourseAction(course));
  }

  private updateCourse(course: Course) {
    this.store.dispatch(new EditCourseAction(course));
  }
}
