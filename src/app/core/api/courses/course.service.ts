import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from '../../entities';
import { CourseDto } from './dtos/course.dto';
import { CourseGetListActionModel } from './models/course-get-list-action.model';

@Injectable()
export class CourseService {
  constructor(
    private http: HttpClient,
  ) { }

  getList(model: CourseGetListActionModel): Observable<Course[]> {
    const params = model.toParams();

    return this.http.get<CourseDto[]>('courses', { params }).pipe(
      map((courseDtos: CourseDto[]) => this.mapCourseDtos(courseDtos))
    );
  }

  create(newCourse: Course): Observable<CourseDto> {
    const coursePayload = this.mapCourseToDto(newCourse);

    return this.http.post<CourseDto>('courses', coursePayload);
  }

  get(id: string): Observable<Course> {
    return this.http.get<CourseDto>(`courses/${id}`).pipe(
      map((courseDto: CourseDto) => this.mapDtoToCourse(courseDto))
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
    return courseDtos.map((courseDto: CourseDto) => this.mapDtoToCourse(courseDto));
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
