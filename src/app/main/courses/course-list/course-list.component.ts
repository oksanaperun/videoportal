import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/core/entities';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  @Input() courses: Course[];
  @Input() searchText: string;

  @Output() doRefresh = new EventEmitter<null>();

  trackCoursesById(index: number, course: Course): string {
    return course.id;
  }
}
