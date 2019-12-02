import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoursesService } from 'src/app/core/api/courses/courses.service';
import { BreadcrumbsService } from 'src/app/core/breadcrumbs/breadcrumbs.service';
import { EditCourseComponent } from './edit-course.component';

describe('EditCourseComponent', () => {
  let component: EditCourseComponent;
  let fixture: ComponentFixture<EditCourseComponent>;

  let mockCoursesService;
  let mockBreadcrumbsService;
  let mockRouter;
  let mockRoute;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy()
    };

    mockRoute = {
      paramMap: of({ get: () => '' })
    };

    mockCoursesService = {
      getItemById: jasmine.createSpy(),
      updateItem: jasmine.createSpy(),
    };

    mockBreadcrumbsService = {
      setChildRoute: jasmine.createSpy()
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EditCourseComponent],
      providers: [
        { provide: CoursesService, useValue: mockCoursesService },
        { provide: BreadcrumbsService, useValue: mockBreadcrumbsService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
