import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';

import { Course } from 'src/app/core/entities';
import { CoursesService } from 'src/app/core/api/courses/courses.service';
import { DeleteCourseModalComponent } from './delete-course-modal/delete-course-modal.component';
import { BreadcrumbsService } from 'src/app/core/breadcrumbs/breadcrumbs.service';

export const COURSES_PER_PAGE = 5;

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  searchText: string;
  showLoadMore = true;

  private currentPage = 1;

  constructor(
    private dialog: MatDialog,
    private coursesService: CoursesService,
    private router: Router,
    private breadcrumbsService: BreadcrumbsService,
  ) { }

  ngOnInit() {
    this.setBreadcrumbs();
    this.loadCourses();
  }

  get displayNoDataMessage(): boolean {
    return this.courses.length === 0;
  }

  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
    this.currentPage = 1;
    this.showLoadMore = true;
    this.loadCourses();
  }

  onAddButtonClick() {
    this.router.navigate(['courses', 'new']);
  }

  onLoadMoreClick() {
    this.currentPage++;
    this.loadCourses(true);
  }

  onEditCourse(courseId: string) {
    this.router.navigate(['courses', courseId]);
  }

  onDeleteCourse(courseId: string) {
    this.openDeleteCourseModal(courseId);
  }

  private setBreadcrumbs() {
    this.breadcrumbsService.setMainRoute({
      path: ['courses'],
      title: 'Courses'
    });
  }

  private loadCourses(isLoadMore?: boolean) {
    const startIndex = (this.currentPage - 1) * COURSES_PER_PAGE;

    this.coursesService
      .getList(startIndex, COURSES_PER_PAGE, this.searchText, 'date')
      .subscribe((courses: Course[]) => {
        this.courses = isLoadMore ? [...this.courses, ...courses] : courses;
        this.handleLoadMoreDisplay(courses);
      });
  }

  private openDeleteCourseModal(courseId: string) {
    const courseToDelete = this.getCourseById(courseId);
    const dialogConfig = this.getDeleteCourseModalConfig(courseToDelete);
    const dialogRef = this.dialog.open(DeleteCourseModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((shouldDelete: boolean) => {
      if (shouldDelete) {
        this.coursesService
          .removeItemById(courseId)
          .subscribe(() => {
            this.loadCourses();
          });
      }
    });
  }

  private getDeleteCourseModalConfig(courseToDelete: Course): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.width = '394px';
    dialogConfig.data = { title: courseToDelete.title };

    return dialogConfig;
  }

  private getCourseById(id: string): Course {
    return this.courses.find(course => course.id === id);
  }

  private handleLoadMoreDisplay(courses: Course[]) {
    if (courses.length < COURSES_PER_PAGE || !courses.length) {
      this.showLoadMore = false;
    }
  }
}
