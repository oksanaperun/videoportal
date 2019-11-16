import { Injectable } from '@angular/core';
import { Course } from '../../entities';
import { CourseDto } from './course-dto';

import { courses as testCourses } from 'src/app/fake-data';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private itemDtos = testCourses;

  getList(): Course[] {
    return this.itemDtos.map(this.mapDtoToCourse);
  }

  createItem(newCourse: Course) {
    const newItemDto = this.mapCourseToDto(newCourse);

    this.itemDtos.push(newItemDto);
  }

  getItemById(id: string): Course {
    const foundItem = this.itemDtos.find((item: CourseDto) => item.id === id);

    return foundItem ? this.mapDtoToCourse(foundItem) : undefined;
  }

  updateItem(updatedCourse: Course) {
    const foundItemIndex = this.itemDtos.findIndex((item: CourseDto) => item.id === updatedCourse.id);

    if (foundItemIndex > - 1) {
      this.itemDtos[foundItemIndex] = this.mapCourseToDto(updatedCourse);
    }
  }

  removeItemById(id: string) {
    this.itemDtos = this.itemDtos.filter((item: CourseDto) => item.id !== id);
  }

  private mapDtoToCourse(courseDto: CourseDto): Course {
    return new Course(
      courseDto.id,
      courseDto.title,
      courseDto.creationDate,
      courseDto.duration,
      courseDto.description,
      courseDto.authors.split(','),
      typeof courseDto.topRated === 'string' ? courseDto.topRated === 'YES' : undefined
    );
  }

  private mapCourseToDto(course: Course): CourseDto {
    return new CourseDto(
      course.id || `_${Math.random().toString(36).substr(2, 5)}`,
      course.title,
      course.creationDate,
      course.duration,
      course.description,
      course.authors.join(','),
      typeof course.topRated === 'boolean' ? this.mapTopRated(course.topRated) : undefined
    );
  }

  private mapTopRated(topRated: boolean): string {
    return topRated ? 'YES' : 'NO';
  }
}
