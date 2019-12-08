import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from '../../entities';
import { CourseDto } from './course-dto';
import { BASE_ENDPOINT } from '../base-endpoint';

export const COURSES_ENDPOINT = `${BASE_ENDPOINT}/courses`;

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(
    private http: HttpClient,
  ) { }

  getList(startIndex?: number, count?: number, searchText?: string, sortKey?: string): Observable<Course[]> {
    const queryParams = `?start=${startIndex || 0}` +
      (count ? `&count=${count}` : '') +
      (searchText ? `&textFragment=${searchText}` : '') +
      (sortKey ? `&sort=${sortKey}` : '');

    return this.http
      .get(`${COURSES_ENDPOINT}${queryParams}`)
      .pipe(map(this.mapCourseDtos.bind(this)));
  }

  createItem(newCourse: Course): Observable<CourseDto> {
    const coursePayload = this.mapCourseToDto(newCourse);

    return this.http.post<CourseDto>(COURSES_ENDPOINT, coursePayload);
  }

  getItemById(id: string): Observable<Course> {
    return this.http
      .get(`${COURSES_ENDPOINT}/${id}`)
      .pipe(map(this.mapDtoToCourse.bind(this)));
  }

  updateItem(updatedCourse: Course): Observable<CourseDto> {
    const coursePayload = this.mapCourseToDto(updatedCourse);

    return this.http.patch<CourseDto>(`${COURSES_ENDPOINT}/${updatedCourse.id}`, coursePayload);
  }

  removeItemById(id: string): Observable<any> {
    return this.http.delete(`${COURSES_ENDPOINT}/${id}`);
  }

  private mapCourseDtos(courseDtos: CourseDto[]) {
    return courseDtos.map(this.mapDtoToCourse.bind(this));
  }

  private mapDtoToCourse(courseDto: CourseDto): Course {
    return new Course(
      courseDto.id.toString(),
      courseDto.name,
      new Date(courseDto.date).getTime(),
      courseDto.length,
      courseDto.description,
      courseDto.authors,
      courseDto.isTopRated
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
