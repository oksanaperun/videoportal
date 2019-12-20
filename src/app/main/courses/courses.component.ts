import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, tap, throttleTime } from 'rxjs/operators';

import { Course } from 'src/app/core/entities';
import { CourseService } from 'src/app/core/api/courses/course.service';
import { BreadcrumbsService } from 'src/app/core/services/breadcrumbs.service';
import { SearchComponent } from 'src/app/shared/controls/search/search.component';
import { CourseGetListActionModel } from 'src/app/core/api/courses/models/course-get-list-action.model';

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
    private router: Router,
    private coursesService: CourseService,
    private breadcrumbsService: BreadcrumbsService,
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

  onDoRefresh() {
    this.currentPageSubject.next(1);
  }

  private setBreadcrumbs() {
    this.breadcrumbsService.setMainRoute({
      path: ['courses'],
      title: 'Courses'
    });
  }

  private setSearchText() {
    this.searchText$ = this.searchComponent.getSearchTextChange().pipe(
      filter((text: string) => !text || text.length > 2),
      map((text: string) => text.trim()),
      distinctUntilChanged(),
      throttleTime(200),
    );
  }

  private setCourses() {
    this.courses$ = combineLatest(
      this.currentPage$,
      this.searchText$,
    ).pipe(
      switchMap(([currentPage, searchText]) => this.getCourses(currentPage, searchText)),
      map(() => this.cache),
    );
  }

  private getCourses(currentPage: number, searchText: string): Observable<Course[]> {
    const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
    const getListModel = new CourseGetListActionModel(startIndex, COURSES_PER_PAGE, searchText, 'date');

    return this.coursesService.getList(getListModel).pipe(
      tap((courses) => {
        currentPage > 1
          ? this.cache = [...this.cache, ...courses]
          : this.cache = courses;

        this.setNoDataMessage(searchText);
        this.handleLoadMoreDisplay(courses);
      }),
    );
  }

  private setNoDataMessage(searchText: string) {
    this.noDataMessage = !this.cache.length
      ? (searchText ? 'no courses found' : 'no data. feel free to add new course')
      : '';
  }

  private handleLoadMoreDisplay(courses: Course[]) {
    this.showLoadMore = courses.length >= COURSES_PER_PAGE;
  }
}
