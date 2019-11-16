import { CoursesService } from './courses.service';
import { CourseDto } from './course-dto';
import * as FakeDataImport from 'src/app/fake-data';
import { Course } from '../../entities';

describe('CoursesService', () => {
  let sut: CoursesService;

  let courseDto1: CourseDto;
  let courseDto2: CourseDto;

  beforeEach(() => {
    courseDto1 = {
      id: 'id1',
      title: 'Title 1',
      creationDate: 1571050553514,
      duration: 15,
      description: 'Description 1',
      authors: 'author 1,author2',
      topRated: 'YES',
    };
    courseDto2 = {
      id: 'id2',
      title: 'Title 2',
      creationDate: 1571050553514,
      duration: 123,
      description: 'Description 2',
      authors: 'author 3',
    };

    spyOnProperty(FakeDataImport, 'courses')
      .and.returnValue([courseDto1, courseDto2]);

    sut = new CoursesService();
  });

  it('should return list of courses', () => {
    const course1 = new Course(
      'id1',
      'Title 1',
      1571050553514,
      15,
      'Description 1',
      ['author 1', 'author2'],
      true,
    );
    const course2 = new Course(
      'id2',
      'Title 2',
      1571050553514,
      123,
      'Description 2',
      ['author 3'],
    );

    expect(sut.getList()).toEqual([course1, course2]);
  });

  it('should create course', () => {
    const newCourse = new Course(
      'id3',
      'Title 3',
      1631050553514,
      123,
      'Description 3',
      ['author 3', 'author2'],
    );

    sut.createItem(newCourse);

    expect(sut.getItemById('id3')).toEqual(newCourse);
  });

  it('should update course', () => {
    const updatedCourse = new Course(
      'id2',
      'Title 2 Upd',
      1631050553514,
      120,
      'Description 2 Upd',
      ['author2'],
      true
    );

    sut.updateItem(updatedCourse);

    expect(sut.getItemById('id2')).toEqual(updatedCourse);
  });

  it('should delete course', () => {
    sut.removeItemById('id1');

    expect(sut.getItemById('id1')).toBe(undefined);
  });
});
