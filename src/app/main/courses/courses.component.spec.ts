import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { CourseService } from 'src/app/core/api/courses/course.service';
import { BreadcrumbsService } from 'src/app/core/services/breadcrumbs.service';

import { CoursesComponent } from './courses.component';
import { SearchComponent } from 'src/app/shared/controls/search/search.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  let mockCourseService;
  let mockBreadcrumbsService;
  let mockRouter;

  const courses = [
    { id: 'a', title: 'Title A' },
    { id: 'b', title: 'Title B' },
    { id: 'c', title: 'Title C' },
    { id: 'd', title: 'Title D' },
    { id: 'e', title: 'Title E' }
  ];

  @Component({
    selector: 'app-course-list',
    template: ''
  })
  class MockCourseListComponent {
    @Input() courses: any[];
    @Output() deleteCourse = new EventEmitter<string>();
  }

  @Component({
    selector: 'app-search',
    template: '',
    providers: [{ provide: SearchComponent, useClass: MockSearchComponent }]
  })
  class MockSearchComponent {
    getSearchTextChange() {
      return of('');
    }
  }

  beforeEach(() => {
    mockCourseService = {
      getList: jasmine.createSpy().and.returnValue(of(courses)),
      removeItemById: jasmine.createSpy().and.returnValue(of(null))
    };

    mockBreadcrumbsService = {
      setMainRoute: jasmine.createSpy()
    };

    mockRouter = {
      navigate: jasmine.createSpy()
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        CoursesComponent,
        MockCourseListComponent,
        MockSearchComponent,
      ],
      providers: [
        { provide: CourseService, useValue: mockCourseService },
        { provide: BreadcrumbsService, useValue: mockBreadcrumbsService },
        { provide: Router, useValue: mockRouter },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set courses list', () => {
    const courseListDebugEl = fixture.debugElement.query(By.directive(MockCourseListComponent));
    const courseListComponent = courseListDebugEl.componentInstance;

    expect(courseListComponent.courses).toEqual(courses);
  });

  it('should set add button name', () => {
    const addButtonEl = fixture.debugElement.query(By.css('app-button')).nativeElement;

    expect(addButtonEl.name).toBe('Add course');
  });

  it('should set add button icon', () => {
    const addButtonEl = fixture.debugElement.query(By.css('app-button')).nativeElement;

    expect(addButtonEl.iconPath).toBe('assets/img/plus.png');
  });

  it('should navigate to new course after add button click', () => {
    const addButtonEl = fixture.debugElement.query(By.css('app-button')).nativeElement;

    addButtonEl.dispatchEvent(new Event('click'));

    expect(mockRouter.navigate).toHaveBeenCalledWith(['courses', 'new']);
  });

  it('should load courses on load more click event', () => {
    const loadMoreEl = fixture.debugElement.query(By.css('.load-more-box span')).nativeElement;

    loadMoreEl.dispatchEvent(new Event('click'));

    expect(mockCourseService.getList.calls.mostRecent().args)
      .toEqual([5, 5, undefined, 'date']);
  });
});
