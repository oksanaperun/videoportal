import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ICourse } from 'src/app/core/course';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListItemComponent {
  @Input() course: ICourse;

  @Output() deleteCourse = new EventEmitter<string>();

  onEditButtonClick() {
    console.log('Edit button is clicked.');
  }

  onDeleteButtonClick() {
    this.deleteCourse.emit(this.course.id);
  }
}
