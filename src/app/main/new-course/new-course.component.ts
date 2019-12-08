import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoursesService } from 'src/app/core/api/courses/courses.service';
import { BreadcrumbsService } from 'src/app/core/breadcrumbs/breadcrumbs.service';
import { Course } from 'src/app/core/entities';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss']
})
export class NewCourseComponent implements OnInit {

  constructor(
    private coursesService: CoursesService,
    private breadcrumbsService: BreadcrumbsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.breadcrumbsService.setChildRoute({
      path: ['courses', 'new'],
      title: 'New course'
    });
  }

  onSaveClick(course: Course) {
    this.coursesService
      .createItem(course)
      .subscribe(() => {
        this.router.navigate(['courses']);
      });
  }

  onCancelClick() {
    this.router.navigate(['courses']);
  }
}
