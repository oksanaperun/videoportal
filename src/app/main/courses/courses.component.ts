import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Course } from 'src/app/core/entities';
import { CoursesService } from 'src/app/core/api/courses/courses.service';
import { DeleteCourseModalComponent } from './delete-course-modal/delete-course-modal.component';

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
  ) { }

  ngOnInit() {
    this.loadCourses();
  }

  get displayNoDataMessage(): boolean {
    return this.courses.length === 0;
  }

  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
  }

  onLoadMoreClick() {
    console.log('Load more is clicked.');
  }

  onDeleteCourse(courseId: string) {
    this.openDeleteCourseModal(courseId);
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
