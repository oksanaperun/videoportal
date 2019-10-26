import { Component, OnInit, Input } from '@angular/core';
import { ICourse } from 'src/app/core/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  @Input() courses: ICourse[];

  constructor() { }

  ngOnInit() {
  }

  trackCoursesById(index: number, course: ICourse): string {
    return course.id;
  }
}
