import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { of } from 'rxjs';

import { CoursesService } from 'src/app/core/api/courses/courses.service';
import { BreadcrumbsService } from 'src/app/core/breadcrumbs/breadcrumbs.service';
import { DeleteCourseModalComponent } from './delete-course-modal/delete-course-modal.component';

import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  let mockCoursesService;
  let mockBreadcrumbsService;
  let mockRouter;
  let mockMatDialog;
  let mockMatDialogRef;
  let mockMatDialogConfig;

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

  beforeEach(() => {
    mockMatDialogRef = {
      afterClosed: () => of(false)
    };

    mockMatDialog = {
      open: jasmine.createSpy().and.returnValue(mockMatDialogRef),
    };

    mockMatDialogConfig = {};

    mockCoursesService = {
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
      declarations: [CoursesComponent, MockCourseListComponent],
      providers: [
        { provide: CoursesService, useValue: mockCoursesService },
        { provide: BreadcrumbsService, useValue: mockBreadcrumbsService },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: MatDialogConfig, useValue: mockMatDialogConfig },
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

  it('should open modal on delete course event', () => {
    const courseListDebugEl = fixture.debugElement.query(By.directive(MockCourseListComponent));
    const courseListComponent = courseListDebugEl.componentInstance;
    const dialogConfig = {
      disableClose: true,
      width: '394px',
      data: { title: 'Title B' }
    };

    courseListComponent.deleteCourse.emit('b');

    expect(mockMatDialog.open)
      .toHaveBeenCalledWith(DeleteCourseModalComponent, jasmine.objectContaining(dialogConfig));
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

    expect(mockCoursesService.getList.calls.mostRecent().args)
      .toEqual([5, 5, undefined, 'date']);
  });
});
