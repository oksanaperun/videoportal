import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course, CoursesData } from '../../entities';
import { CourseDto } from './dtos/course.dto';
import { CoursesDataDto } from './dtos/courses-data.dto';
import { GetCoursesActionModel } from './models/course-get-list-action.model';

@Injectable()
export class CourseService {
  constructor(
    private http: HttpClient,
  ) { }

  getCourses(model: GetCoursesActionModel): Observable<CoursesData> {
    const params = model.toParams();

    return this.http.get<CoursesDataDto>('courses', { params }).pipe(
      map(({ courses, totalCount }: CoursesDataDto) => ({
        courses: this.mapCourseDtos(courses),
        totalCount
      }))
    );
  }

  create(newCourse: Course): Observable<CourseDto> {
    const coursePayload = this.mapCourseToDto(newCourse);

    return this.http.post<CourseDto>('courses', coursePayload);
  }

  get(id: string): Observable<Course> {
    return this.http.get<CourseDto>(`courses/${id}`).pipe(
      map((response: CourseDto) => this.mapDtoToCourse(response))
    );
  }

  update(updatedCourse: Course): Observable<CourseDto> {
    const coursePayload = this.mapCourseToDto(updatedCourse);

    return this.http.patch<CourseDto>(`courses/${updatedCourse.id}`, coursePayload);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`courses/${id}`);
  }

  private mapCourseDtos(courseDtos: CourseDto[]): Course[] {
    return courseDtos.map((dto: CourseDto) => this.mapDtoToCourse(dto));
  }

  private mapDtoToCourse(dto: CourseDto): Course {
    return new Course(
      dto.id.toString(),
      dto.name,
      new Date(dto.date).getTime(),
      dto.length,
      dto.description,
      dto.authors,
      dto.isTopRated
    );
  }

  private mapCourseToDto(course: Course): CourseDto {
    return new CourseDto(
      Number(course.id) || Math.floor(Date.now() + Math.random()),
      course.title,
      new Date(course.creationDate).toISOString().substr(0, 19) + '+00:00',
      course.duration,
      course.description,
      course.authors,
      !!course.topRated
    );
  }
}
