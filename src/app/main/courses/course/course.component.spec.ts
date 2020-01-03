import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform, Component, EventEmitter, Output } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { CourseService } from 'src/app/core/api/courses/course.service';
import { Author } from 'src/app/core/entities';
import { CourseComponent } from './course.component';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  let mockRouter;
  let mockRoute;
  let mockCourseService;
  let mockStore;

  const author1: Author = {
    id: 7458,
    name: 'Deana',
    lastName: 'Bruce'
  };

  const author2: Author = {
    id: 7000,
    name: 'Kelly',
    lastName: 'Ducan'
  };

  const course = {
    id: 'some_id',
    title: 'some title',
    creationDate: 1571050553514,
    duration: 123,
    description: 'some description',
    authors: [author1, author2],
  };

  @Pipe({ name: 'timeInMinutes' })
  class MockTimeInMinutesPipe implements PipeTransform {
    transform(value: number): string {
      return `${value} formatted`;
    }
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

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy()
    };

    mockRoute = {
      paramMap: of({ get: () => 'id' })
    };

    mockCourseService = {
      get: () => of(course),
      create: () => of(null),
      update: () => of(null),
    };

    mockStore = {
      dispatch: jasmine.createSpy(),
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        MockTimeInMinutesPipe,
        MockInputComponent,
        MockIntegerInputComponent,
        MockTextareaComponent,
        CourseComponent,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: CourseService, useValue: mockCourseService },
        { provide: Store, useValue: mockStore },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when course is defined', () => {
    it('should set title', () => {
      expect(component.title).toBe('some title');
    });

    it('should set description', () => {
      expect(component.description).toBe('some description');
    });

    it('should set duration', () => {
      expect(component.duration).toBe(123);
    });

    it('should set date', () => {
      expect(component.date).toBe(1571050553514);
    });

    it('should set authors', () => {
      expect(component.authors).toEqual([author1, author2]);
    });
  });

  it('should have updated title', () => {
    const titleEl = fixture.debugElement.query(By.css('.title-box app-input'));
    const titleInputComponent = titleEl.componentInstance;
    const newTitle = 'new_title';

    titleInputComponent.valueChange.emit(newTitle);

    expect(component.title).toBe(newTitle);
  });

  it('should have updated description', () => {
    const descriptionEl = fixture.debugElement.query(By.css('.description-box app-textarea'));
    const descriptionInputComponent = descriptionEl.componentInstance;
    const newDescription = 'new_description';

    descriptionInputComponent.valueChange.emit(newDescription);

    expect(component.description).toBe(newDescription);
  });

  it('should have updated duration', () => {
    const durationEl = fixture.debugElement.query(By.css('.duration-box app-integer-input'));
    const durationInputComponent = durationEl.componentInstance;
    const newDuration = 12;

    durationInputComponent.valueChange.emit(newDuration);

    expect(component.duration).toBe(newDuration);
  });

  it('should have updated date', () => {
    const dateEl = fixture.debugElement.query(By.css('.date-box app-input'));
    const dateInputComponent = dateEl.componentInstance;
    const newDate = 1571050553514;

    dateInputComponent.valueChange.emit(newDate);

    expect(component.date).toBe(newDate);
  });

  it('should have updated authors', () => {
    const authorsEl = fixture.debugElement.query(By.css('.authors-box app-input'));
    const authorsInputComponent = authorsEl.componentInstance;
    const newAuthors = 'new_author';

    authorsInputComponent.valueChange.emit(newAuthors);

    expect(component.authors).toEqual([author1]);
  });

  it('should navigate to courses on cancel click', () => {
    const buttonEl = fixture.debugElement.query(By.css('.cancel-button')).nativeElement;

    buttonEl.dispatchEvent(new Event('click'));

    expect(mockRouter.navigate).toHaveBeenCalledWith(['courses']);
  });
});
