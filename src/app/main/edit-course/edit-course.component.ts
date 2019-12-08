import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { CoursesService } from 'src/app/core/api/courses/courses.service';
import { Course } from 'src/app/core/entities';
import { BreadcrumbsService } from 'src/app/core/breadcrumbs/breadcrumbs.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  course$: Observable<Course>;

  constructor(
    private coursesService: CoursesService,
    private breadcrumbsService: BreadcrumbsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.course$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.coursesService.getItemById(params.get('id'))),
      tap((course: Course) => {
        if (course) {
          this.breadcrumbsService.setChildRoute({
            path: ['courses', course.id],
            title: course.title
          });
        } else {
          this.router.navigate(['404']);
        }
      })
    );
  }

  onSaveClick(course: Course) {
    this.coursesService
      .updateItem(course)
      .subscribe(() => {
        this.router.navigate(['courses']);
      });
  }

  onCancelClick() {
    this.router.navigate(['courses']);
  }
}
