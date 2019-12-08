import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { CoursesService } from 'src/app/core/api/courses/courses.service';
import { BreadcrumbsService } from 'src/app/core/breadcrumbs/breadcrumbs.service';
import { NewCourseComponent } from './new-course.component';

describe('NewCourseComponent', () => {
  let component: NewCourseComponent;
  let fixture: ComponentFixture<NewCourseComponent>;

  let mockRouter;
  let mockCoursesService;
  let mockBreadcrumbsService;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy()
    };

    mockCoursesService = {
      createItem: () => of(null)
    };

    mockBreadcrumbsService = {
      setChildRoute: jasmine.createSpy()
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NewCourseComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: CoursesService, useValue: mockCoursesService },
        { provide: BreadcrumbsService, useValue: mockBreadcrumbsService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
