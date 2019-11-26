import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform, Component, DebugElement, EventEmitter, Output } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CourseFormComponent } from './course-form.component';
import { Course } from 'src/app/core/entities';

describe('CourseFormComponent', () => {
  let component: CourseFormComponent;
  let componentDebugEl: DebugElement;
  let hostComponent: HostCourseFormComponent;
  let hostFixture: ComponentFixture<HostCourseFormComponent>;

  const course = {
    id: 'some_id',
    title: 'some title',
    creationDate: 1571050553514,
    duration: 123,
    description: 'some description',
    authors: ['John', 'Kelly'],
  };

  @Pipe({ name: 'timeInMinutes' })
  class MockTimeInMinutesPipe implements PipeTransform {
    transform(value: number): string {
      return `${value} formatted`;
    }
  }

  @Component({
    template:
      `<app-course-form
        [course]="course"
        (saveClick)="onSave($event)"
        (cancelClick)="onCancel($event)"
      ></app-course-form>`
  })
  class HostCourseFormComponent {
    course: Course;
    onSave() { }
    onCancel() { }
  }

  @Component({
    selector: 'app-input',
    template: '',
  })
  class MockInputComponent {
    @Output() valueChange = new EventEmitter<string>();

    placeholder: string;
    value: string;
  }

  @Component({
    selector: 'app-integer-input',
    template: '',
  })
  class MockIntegerInputComponent {
    @Output() valueChange = new EventEmitter<string>();

    placeholder: string;
    value: string;
  }

  @Component({
    selector: 'app-textarea',
    template: '',
  })
  class MockTextareaComponent {
    @Output() valueChange = new EventEmitter<string>();

    placeholder: string;
    value: string;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        HostCourseFormComponent,
        MockTimeInMinutesPipe,
        MockInputComponent,
        MockIntegerInputComponent,
        MockTextareaComponent,
        CourseFormComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(HostCourseFormComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    componentDebugEl = hostFixture.debugElement.query(By.directive(CourseFormComponent));
    component = componentDebugEl.componentInstance;
  });

  describe('when course is defined', () => {
    beforeEach(() => {
      hostComponent.course = course;
      hostFixture.detectChanges();
    });

    it('should set title', () => {
      expect(component.title).toBe('some title');
    });

    it('should set description', () => {
      expect(component.descripiton).toBe('some description');
    });

    it('should set duration', () => {
      expect(component.duration).toBe(123);
    });

    it('should set date', () => {
      expect(component.date).toBe(1571050553514);
    });

    it('should set authors', () => {
      expect(component.authors).toBe('John, Kelly');
    });
  });

  it('should have updated title', () => {
    const titleEl = hostFixture.debugElement.query(By.css('.title-box app-input'));
    const titleInputComponent = titleEl.componentInstance;
    const newTitle = 'new_title';

    titleInputComponent.valueChange.emit(newTitle);

    expect(component.title).toBe(newTitle);
  });

  it('should have updated description', () => {
    const descriptionEl = hostFixture.debugElement.query(By.css('.description-box app-textarea'));
    const descriptionInputComponent = descriptionEl.componentInstance;
    const newDescription = 'new_description';

    descriptionInputComponent.valueChange.emit(newDescription);

    expect(component.descripiton).toBe(newDescription);
  });

  it('should have updated duration', () => {
    const durationEl = hostFixture.debugElement.query(By.css('.duration-box app-integer-input'));
    const durationInputComponent = durationEl.componentInstance;
    const newDuration = 12;

    durationInputComponent.valueChange.emit(newDuration);

    expect(component.duration).toBe(newDuration);
  });

  it('should have updated date', () => {
    const dateEl = hostFixture.debugElement.query(By.css('.date-box app-input'));
    const dateInputComponent = dateEl.componentInstance;
    const newDate = 1571050553514;

    dateInputComponent.valueChange.emit(newDate);

    expect(component.date).toBe(newDate);
  });

  it('should have updated authors', () => {
    const authorsEl = hostFixture.debugElement.query(By.css('.authors-box app-input'));
    const authorsInputComponent = authorsEl.componentInstance;
    const newAuthors = 'new_author';

    authorsInputComponent.valueChange.emit(newAuthors);

    expect(component.authors).toBe(newAuthors);
  });

  it('should notify about save click with new course data', () => {
    const buttonEl = hostFixture.debugElement.query(By.css('.save-button')).nativeElement;
    const saveSpy = spyOn(hostComponent, 'onSave');

    spyOn(Math, 'random').and.returnValue(0.7838644330822031);

    component.title = 'new title';
    component.descripiton = 'new description';
    component.duration = 56;
    component.date = 1571050553514;

    buttonEl.dispatchEvent(new Event('click'));

    expect((saveSpy.calls.mostRecent().args as any)[0])
      .toEqual(new Course(
        's7vz8rr2l',
        'new title',
        1571050553514,
        56,
        'new description',
        [],
      ));
  });

  it('should notify about save click with updated course data', () => {
    const buttonEl = hostFixture.debugElement.query(By.css('.save-button')).nativeElement;
    const saveSpy = spyOn(hostComponent, 'onSave');

    hostComponent.course = course;
    hostFixture.detectChanges();

    component.title = 'different title';
    component.duration = 56;

    buttonEl.dispatchEvent(new Event('click'));

    expect((saveSpy.calls.mostRecent().args as any)[0])
      .toEqual(new Course(
        'some_id',
        'different title',
        1571050553514,
        56,
        'some description',
        ['John', 'Kelly'],
      ));
  });

  it('should notify about cancel click', () => {
    const buttonEl = hostFixture.debugElement.query(By.css('.cancel-button')).nativeElement;
    const cancelSpy = spyOn(hostComponent, 'onCancel');

    buttonEl.dispatchEvent(new Event('click'));

    expect(cancelSpy).toHaveBeenCalled();
  });
});
