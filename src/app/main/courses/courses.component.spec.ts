import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { INCREMENT_CURRENT_PAGE } from 'src/app/core/store/courses-store';
import { CoursesComponent } from './courses.component';
import { SearchComponent } from 'src/app/shared/controls/search/search.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  let mockRouter;
  let mockStore;

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
    mockRouter = {
      navigate: jasmine.createSpy()
    };

    mockStore = {
      dispatch: jasmine.createSpy(),
      select: jasmine.createSpy().and.returnValue(of({
        items: courses,
        searchText: '',
      })),
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
        { provide: Router, useValue: mockRouter },
        { provide: Store, useValue: mockStore },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set courses list', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const courseListDebugEl = fixture.debugElement.query(By.directive(MockCourseListComponent));
      const courseListComponent = courseListDebugEl.componentInstance;

      expect(courseListComponent.courses).toEqual(courses);
    });
  }));

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

  it('should increment current page number on load more click event', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const loadMoreEl = fixture.debugElement.query(By.css('.load-more-box span')).nativeElement;

      loadMoreEl.dispatchEvent(new Event('click'));

      const storeAction = mockStore.dispatch.calls.mostRecent().args[0];

      expect(storeAction.type).toBe(INCREMENT_CURRENT_PAGE);
    });
  }));
});
