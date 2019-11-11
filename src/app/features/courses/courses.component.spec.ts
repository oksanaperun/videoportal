import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, Input, Output, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CoursesComponent } from './courses.component';
import * as FakeDataImport from 'src/app/fake-data';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  const courses = [{ a: 123 }];

  @Component({
    selector: 'app-course-list',
    template: ''
  })
  class MockCourseListComponent {
    @Input() courses: any[];
    @Output() deleteCourse = new EventEmitter<string>();
  }

  beforeEach(async(() => {
    spyOnProperty(FakeDataImport, 'courses')
      .and.returnValue(courses);

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CoursesComponent, MockCourseListComponent]
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

  it('should handle delete course event', () => {
    const courseListDebugEl = fixture.debugElement.query(By.directive(MockCourseListComponent));
    const courseListComponent = courseListDebugEl.componentInstance;
    const courseId = 'some_id';
    const consoleLogSpy = spyOn(console, 'log');

    courseListComponent.deleteCourse.emit(courseId);

    expect(consoleLogSpy).toHaveBeenCalledWith(`Course with id [${courseId}] should be deleted.`);
  });

  it('should set add button name', () => {
    const addButtonEl = fixture.debugElement.query(By.css('app-button')).nativeElement;

    expect(addButtonEl.name).toBe('Add course');
  });

  it('should set add button icon', () => {
    const addButtonEl = fixture.debugElement.query(By.css('app-button')).nativeElement;

    expect(addButtonEl.iconPath).toBe('assets/img/plus.png');
  });

  it('should handle load more click event', () => {
    const loadMoreEl = fixture.debugElement.query(By.css('.load-more')).nativeElement;
    const consoleLogSpy = spyOn(console, 'log');

    loadMoreEl.dispatchEvent(new Event('click'));

    expect(consoleLogSpy).toHaveBeenCalledWith('Load more is clicked.');
  });
});
