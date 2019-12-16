import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, tap, throttleTime } from 'rxjs/operators';

import { Course } from 'src/app/core/entities';
import { CoursesService } from 'src/app/core/api/courses/courses.service';
import { DeleteCourseModalComponent } from './delete-course-modal/delete-course-modal.component';
import { BreadcrumbsService } from 'src/app/core/breadcrumbs/breadcrumbs.service';
import { SearchComponent } from 'src/app/shared/controls/search/search.component';
import { LoaderStateService } from 'src/app/core/loader-state/loader-state.service';

export const COURSES_PER_PAGE = 5;

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements AfterViewInit, OnDestroy {
  @ViewChild(SearchComponent, { static: false }) searchComponent: SearchComponent;

  courses$: Observable<Course[]>;
  showLoadMore = true;
  noDataMessage: string;

  private searchText$: Observable<string>;
  private currentPageSubject = new BehaviorSubject(1);
  private currentPage$ = this.currentPageSubject.asObservable();
  private cache: Course[];

  constructor(
    private dialog: MatDialog,
    private coursesService: CoursesService,
    private router: Router,
    private breadcrumbsService: BreadcrumbsService,
    private loaderStateService: LoaderStateService,
  ) { }

  ngAfterViewInit() {
    this.setBreadcrumbs();
    this.setSearchText();
    this.setCourses();
  }

  ngOnDestroy() {
    this.currentPageSubject.complete();
  }

  onAddButtonClick() {
    this.router.navigate(['courses', 'new']);
  }

  onLoadMoreClick() {
    this.currentPageSubject.next(this.currentPageSubject.getValue() + 1);
  }

  onEditCourse(courseId: string) {
    this.router.navigate(['courses', courseId]);
  }

  onDeleteCourse(courseId: string) {
    this.openDeleteCourseModal(courseId);
  }

  private setBreadcrumbs() {
    this.breadcrumbsService.setMainRoute({
      path: ['courses'],
      title: 'Courses'
    });
  }

  private setSearchText() {
    this.searchText$ = this.searchComponent.getSearchTextChange()
      .pipe(
        filter((text: string) => !text || text.length > 2),
        distinctUntilChanged(),
        throttleTime(200),
      );
  }

  private setCourses() {
    this.courses$ = combineLatest(
      this.currentPage$,
      this.searchText$,
    ).pipe(
      tap(() => { this.loaderStateService.showLoader(); }),
      switchMap(([currentPage, searchText]) => this.getCourses(currentPage, searchText)),
      map(() => this.cache),
      tap(() => { this.loaderStateService.hideLoader(); })
    );
  }

  private getCourses(currentPage: number, searchText: string): Observable<Course[]> {
    const startIndex = (currentPage - 1) * COURSES_PER_PAGE;

    return this.coursesService.getList(startIndex, COURSES_PER_PAGE, searchText, 'date')
      .pipe(
        tap((courses) => {
          currentPage > 1
            ? this.cache = [...this.cache, ...courses]
            : this.cache = courses;

          this.setNoDataMessage(searchText);
          this.handleLoadMoreDisplay(courses);
        }),
      );
  }

  private openDeleteCourseModal(courseId: string) {
    const courseToDelete = this.getCourseById(courseId);
    const dialogConfig = this.getDeleteCourseModalConfig(courseToDelete);
    const dialogRef = this.dialog.open(DeleteCourseModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((shouldDelete: boolean) => {
      if (shouldDelete) {
        this.coursesService
          .removeItemById(courseId)
          .subscribe(() => {
            this.currentPageSubject.next(1);
          });
      }
    });
  }

  private getDeleteCourseModalConfig(courseToDelete: Course): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.width = '394px';
    dialogConfig.data = { title: courseToDelete.title };

    return dialogConfig;
  }

  private getCourseById(id: string): Course {
    return this.cache.find(course => course.id === id);
  }

  private setNoDataMessage(searchText: string) {
    this.noDataMessage = !this.cache.length
      ? (searchText ? 'no courses found' : 'no data. feel free to add new course')
      : '';
  }

  private handleLoadMoreDisplay(courses: Course[]) {
    if (courses.length < COURSES_PER_PAGE || !courses.length) {
      this.showLoadMore = false;
    }
  }
}
