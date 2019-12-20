import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, Input, Output, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CourseListComponent } from './course-list.component';

describe('CourseListComponent', () => {
  let hostComponent: HostCourseListComponent;
  let hostFixture: ComponentFixture<HostCourseListComponent>;

  const course1 = { a: 123 };
  const course2 = { a: 456 };

  @Component({
    template: '<app-course-list [courses]="courses" (doRefresh)="onDoRefresh($event)"></app-course-list>'
  })
  class HostCourseListComponent {
    courses: any[];
    onDoRefresh() { }
  }

  @Component({
    selector: 'app-course-list-item',
    template: '',
  })
  class MockCourseListItemComponent {
    @Input() course: any;
    @Output() doRefresh = new EventEmitter<null>();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        CourseListComponent,
        HostCourseListComponent,
        MockCourseListItemComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(HostCourseListComponent);
    hostComponent = hostFixture.componentInstance;
    hostComponent.courses = [course1, course2];
    hostFixture.detectChanges();
  });

  it('should render course component for each course', () => {
    const courseEls = hostFixture.debugElement.queryAll(By.directive(MockCourseListItemComponent));

    expect(courseEls.length).toBe(2);
  });

  it('should set course data', () => {
    const courseDebugEl = hostFixture.debugElement.query(By.directive(MockCourseListItemComponent));
    const courseComponent = courseDebugEl.componentInstance;

    expect(courseComponent.course).toEqual(course1);
  });

  it('should handle do refresh event', () => {
    const courseDebugEl = hostFixture.debugElement.query(By.directive(MockCourseListItemComponent));
    const courseComponent = courseDebugEl.componentInstance;
    const onDoRefreshSpy = spyOn(hostComponent, 'onDoRefresh');

    courseComponent.doRefresh.emit();

    expect(onDoRefreshSpy).toHaveBeenCalledWith(undefined);
  });
});
