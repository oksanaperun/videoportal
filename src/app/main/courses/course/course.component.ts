import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of, combineLatest } from 'rxjs';
import { tap, map, catchError, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

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

  courseForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    duration: [null, [Validators.required, Validators.min(1)]],
    date: [null, Validators.required],
    authors: [[], Validators.required],
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
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.setCourse();
    this.getAuthors();
  }

  onSubmit() {
    this.courseId
      ? this.updateCourse()
      : this.createCourse();
  }

  onCancelButtonClick() {
    this.router.navigate(['courses']);
  }

  isControlValid(controlName: string): boolean {
    const control = this.courseForm.controls[controlName];

    return !control.dirty || control.valid;
  }

  private setCourse() {
    const routeId = this.route.snapshot.params.id;

    routeId === 'new'
      ? this.setDataOnNewCourse()
      : this.getCourseData(routeId);
  }

  private getAuthors() {
    this.authorOptions$ = this.authorService.get().pipe(
      switchMap((authors: AuthorDto[]) => this.getTranslatedAuthors$(authors)),
      tap((authors: AuthorDto[]) => { this.authorsSourceData = authors; }),
      map((authors: AuthorDto[]) => this.mapAuthorsToSelectOptions(authors)),
      map((options: SelectOption[]) => options.sort(sortAuthorOptions)),
    );
  }

  private getTranslatedAuthors$(authors: AuthorDto[]): Observable<AuthorDto[]> {
    return combineLatest(
      authors.map(author =>
        this.translateService.get(`AUTHORS.${author.id}`).pipe(
          map(res => ({
            id: author.id,
            ...res
          })))
      )
    );
  }

  private setDataOnNewCourse() {
    this.translateService.get('COURSES.COURSE_FORM.NEW_COURSE_TITLE').subscribe(result => {
      this.formTitle = result;
    });

    this.translateService.get('BREADCRUMBS.NEW_COURSE').subscribe(result => {
      this.store.dispatch(new SetChildRoute({
        path: ['courses', 'new'],
        title: result
      }));
    });
  }

  private setDataOnExistingCourse(course: Course) {
    this.formTitle = course.title;
    this.setCourseData(course);

    this.store.dispatch(new SetChildRoute({
      path: ['courses', course.id],
      title: course.title
    }));
  }

  private getCourseData(id: string) {
    this.coursesService.get(id).pipe(
      tap((course: Course) => { this.setDataOnExistingCourse(course); }),
      switchMap((course: Course) => this.getTranslatedAuthors$(course.authors)),
      tap((authors: Author[]) => { this.setTranslatedAuthors(authors); }),
      catchError((e) => {
        this.router.navigate(['404']);
        return of();
      }),
    ).subscribe();
  }

  private setCourseData(course: Course) {
    this.courseId = course.id;
    this.isCourseTopRated = course.topRated;

    this.courseForm.setValue({
      title: course.title,
      description: course.description,
      duration: course.duration,
      date: course.creationDate,
      authors: [],
    });
  }

  private setTranslatedAuthors(authors: Author[]) {
    this.courseForm.controls.authors.setValue(this.mapAuthorsToSelectOptions(authors));
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

  private createCourse() {
    const course = this.getCourse();

    this.store.dispatch(new AddCourseAction(course));
  }

  private updateCourse() {
    const course = this.getCourse();

    this.store.dispatch(new EditCourseAction(course));
  }

  private getCourse(): Course {
    const { title, description, duration, date, authors } = this.courseForm.value;

    return new Course(
      this.courseId || null,
      title,
      date,
      duration,
      description,
      this.mapSelectOptionsToAuthors(authors),
      this.isCourseTopRated,
    );
  }
}

function sortAuthorOptions(option1: SelectOption, option2: SelectOption): number {
  return option1.label < option2.label ? -1 : (option1.label > option2.label ? 1 : 0);
}
