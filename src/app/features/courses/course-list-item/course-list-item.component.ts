import { Component, OnInit, Input } from '@angular/core';
import { ICourse } from 'src/app/core/course';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.scss']
})
export class CourseListItemComponent implements OnInit {
  @Input() course: ICourse;

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
}
