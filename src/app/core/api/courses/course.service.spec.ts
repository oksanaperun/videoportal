import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CourseDto } from './dtos/course.dto';
import { Course, Author } from '../../entities';
import { GetCoursesActionModel } from './models/course-get-list-action.model';
import { CourseService } from './course.service';

describe('CourseService', () => {
  let sut: CourseService;

  let injector: TestBed;
  let mockHttp: HttpTestingController;
  let author1: Author;
  let author2: Author;
  let courseDto1: CourseDto;
  let courseDto2: CourseDto;

  beforeEach(() => {
    author1 = {
      id: 7458,
      name: 'Deana',
      lastName: 'Bruce'
    };

    author2 = {
      id: 7000,
      name: 'Kelly',
      lastName: 'Ducan'
    };

    courseDto1 = {
      id: 123,
      name: 'Title 1',
      date: '2017-09-28T04:39:24+00:00',
      length: 15,
      description: 'Description 1',
      authors: [author1, author2],
      isTopRated: true,
    };
    courseDto2 = {
      id: 145,
      name: 'Title 2',
      date: '2018-05-31T02:02:36+00:00',
      length: 123,
      description: 'Description 2',
      authors: [author2],
      isTopRated: false,
    };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });

    injector = getTestBed();
    sut = injector.get(CourseService);
    mockHttp = injector.get(HttpTestingController);
  });

  afterEach(() => {
    mockHttp.verify();
  });

  it('should return list of courses', () => {
    const course1 = new Course(
      '123',
      'Title 1',
      1506573564000,
      15,
      'Description 1',
      [author1, author2],
      true,
    );
    const course2 = new Course(
      '145',
      'Title 2',
      1527732156000,
      123,
      'Description 2',
      [author2],
      false,
    );

    sut.getCourses(new GetCoursesActionModel()).subscribe((response) => {
      expect(response).toEqual([course1, course2]);
    });

    const req = mockHttp.expectOne('courses?start=0');
    expect(req.request.method).toBe('GET');
    req.flush([courseDto1, courseDto2]);
  });

  it('should create course', () => {
    const newCourse = new Course(
      'id3',
      'Title 3',
      1631050553514,
      123,
      'Description 3',
      [author2, author1],
    );
    const courseDto = { id: 167 } as CourseDto;

    sut.create(newCourse).subscribe((response) => {
      expect(response).toEqual(courseDto);
    });

    const req = mockHttp.expectOne('courses');
    expect(req.request.method).toBe('POST');
    req.flush(courseDto);
  });

  it('should update course', () => {
    const updatedCourse = new Course(
      'id2',
      'Title 2 Upd',
      1631050553514,
      120,
      'Description 2 Upd',
      [author2],
      true
    );
    const courseDto = { id: 167 } as CourseDto;

    sut.update(updatedCourse).subscribe((response) => {
      expect(response).toEqual(courseDto);
    });

    const req = mockHttp.expectOne('courses/id2');
    expect(req.request.method).toBe('PATCH');
    req.flush(courseDto);
  });

  it('should delete course', () => {
    sut.remove('id1').subscribe();

    const req = mockHttp.expectOne('courses/id1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
