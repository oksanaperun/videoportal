import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, Input, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SortDirection } from 'src/app/core/entities';
import { CourseListComponent } from './course-list.component';

describe('CourseListComponent', () => {
  let hostComponent: HostCourseListComponent;
  let hostFixture: ComponentFixture<HostCourseListComponent>;

  const course1 = { a: 123 };
  const course2 = { a: 456 };

  @Component({
    template: '<app-course-list [courses]="courses" (deleteCourse)="onDelete($event)"></app-course-list>'
  })
  class HostCourseListComponent {
    courses: any[];
    onDelete() { }
  }

  @Component({
    selector: 'app-course-list-item',
    template: '',
  })
  class MockCourseListItemComponent {
    @Input() course: any;
    @Output() deleteCourse = new EventEmitter<string>();
  }

  @Pipe({ name: 'orderByCreationDate' })
  class MockOrderByCreationDatePipe implements PipeTransform {
    transform(items: any[], direction: SortDirection): any[] {
      return direction === 'DESC' ? items : [];
    }
  }

  @Pipe({ name: 'filterByTitle' })
  class MockFilterByTitlePipe implements PipeTransform {
    transform(items: any[]): any[] {
      return items;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        CourseListComponent,
        HostCourseListComponent,
        MockCourseListItemComponent,
        MockOrderByCreationDatePipe,
        MockFilterByTitlePipe,
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

  it('should handle delete course event', () => {
    const courseDebugEl = hostFixture.debugElement.query(By.directive(MockCourseListItemComponent));
    const courseComponent = courseDebugEl.componentInstance;
    const courseId = 'some_id';
    const onDeleteSpy = spyOn(hostComponent, 'onDelete');

    courseComponent.deleteCourse.emit(courseId);

    expect(onDeleteSpy).toHaveBeenCalledWith(courseId);
  });
});
