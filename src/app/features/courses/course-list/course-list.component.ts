import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ICourse } from 'src/app/core/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent {
  @Input() courses: ICourse[];
  @Input() searchText: string;

  @Output() deleteCourse = new EventEmitter<string>();

  trackCoursesById(index: number, course: ICourse): string {
    return course.id;
  }
}
