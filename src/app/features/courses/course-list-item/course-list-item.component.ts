import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ICourse } from 'src/app/core/course';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListItemComponent implements OnInit {
  @Input() course: ICourse;
  @Output() deleteCourse = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  get title(): string {
    return this.course.title;
  }

  get description(): string {
    return this.course.description;
  }

  get duration(): number {
    return this.course.duration;
  }

  get creationDate(): number {
    return this.course.creationDate;
  }

  onEditButtonClick() {
    console.log('Edit button is clicked.');
  }

  onDeleteButtonClick() {
    console.log('Delete button is clicked.');
    this.deleteCourse.emit(this.course.id);
  }
}
