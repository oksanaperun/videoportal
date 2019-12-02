import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Course } from 'src/app/core/entities';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListItemComponent {
  @Input() course: Course;

  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  onEditButtonClick() {
    this.editCourse.emit(this.course.id);
  }

  onDeleteButtonClick() {
    this.deleteCourse.emit(this.course.id);
  }
}
