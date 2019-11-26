import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Course } from 'src/app/core/entities';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnChanges {
  @Input() formTitle: string;
  @Input() course: Course;

  @Output() saveClick = new EventEmitter<Course>();
  @Output() cancelClick = new EventEmitter();

  title: string;
  descripiton: string;
  duration: number;
  date = Date.now();
  authors: string;
  errorMessage: string;

  ngOnChanges(changes: SimpleChanges) {
    const course = changes.course ? changes.course.currentValue : null;

    if (course) {
      this.setCourseValues(course);
    }
  }

  onTitleChange(value: string) {
    this.title = value;
  }

  onDescriptionChange(value: string) {
    this.descripiton = value;
  }

  onDurationChange(value: number) {
    this.duration = value;
  }

  onDateChange(value: number) {
    this.date = value;
  }

  onAuthorsChange(value: string) {
    this.authors = value;
  }

  onSaveButtonClick() {
    this.saveClick.emit(new Course(
      this.course ? this.course.id : Math.random().toString(36).substr(2, 9),
      this.title,
      this.date,
      this.duration,
      this.descripiton,
      this.authors ? this.authors.split(', ') : [],
      this.course ? this.course.topRated : undefined
    ));
  }

  onCancelButtonClick() {
    this.cancelClick.emit();
  }

  private setCourseValues(course: Course) {
    this.title = course.title;
    this.descripiton = course.description;
    this.duration = course.duration;
    this.date = course.creationDate;
    this.authors = course.authors.join(', ');
  }
}
