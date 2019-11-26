import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CoursesService } from 'src/app/core/api/courses/courses.service';
import { Course } from 'src/app/core/entities';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss']
})
export class NewCourseComponent {

  constructor(
    private coursesService: CoursesService,
    private router: Router,
  ) { }

  onSaveClick(course: Course) {
    this.coursesService.createItem(course);
    this.router.navigate(['courses']);
  }

  onCancelClick() {
    this.router.navigate(['courses']);
  }
}
