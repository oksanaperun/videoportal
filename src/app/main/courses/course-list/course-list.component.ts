import { Component, Input } from '@angular/core';
import { Course } from 'src/app/core/entities';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  @Input() courses: Course[];
  @Input() searchText: string;

  trackCoursesById(index: number, course: Course): string {
    return course.id;
  }
}
