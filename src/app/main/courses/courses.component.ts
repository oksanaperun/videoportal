import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';

import { Course } from 'src/app/core/entities';
import { CoursesService } from 'src/app/core/api/courses/courses.service';
import { DeleteCourseModalComponent } from './delete-course-modal/delete-course-modal.component';
import { BreadcrumbsService } from 'src/app/core/breadcrumbs/breadcrumbs.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[];
  searchText: string;

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
  }

  onAddButtonClick() {
    this.router.navigate(['courses', 'new']);
  }

  onLoadMoreClick() {
    console.log('Load more is clicked.');
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

  private loadCourses() {
    this.courses = this.coursesService.getList();
  }

  private openDeleteCourseModal(courseId: string) {
    const courseToDelete = this.getCourseById(courseId);
    const dialogConfig = this.getDeleteCourseModalConfig(courseToDelete);
    const dialogRef = this.dialog.open(DeleteCourseModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((shouldDelete: boolean) => {
      if (shouldDelete) {
        this.coursesService.removeItemById(courseId);
        this.loadCourses();
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
}
