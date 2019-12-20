import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs/operators';

import { Course } from 'src/app/core/entities';
import { CourseService } from 'src/app/core/api/courses/course.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { DeleteCourseModalComponent } from '../delete-course-modal/delete-course-modal.component';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListItemComponent {
  @Input() course: Course;
  @Output() doRefresh = new EventEmitter<null>();

  constructor(
    private router: Router,
    private coursesService: CourseService,
    private dialogService: DialogService,
  ) { }

  onEditButtonClick() {
    this.router.navigate(['courses', this.course.id]);
  }

  onDeleteButtonClick() {
    this.openDeleteCourseModal();
  }

  private openDeleteCourseModal() {
    const dialogData = { title: this.course.title };
    const dialog$ = this.dialogService.openModal(DeleteCourseModalComponent, dialogData);

    dialog$.pipe(
      filter((shouldDelete: boolean) => shouldDelete),
      switchMap(() => this.coursesService.remove(this.course.id)),
      tap(() => { this.doRefresh.emit(); }),
    ).subscribe();
  }
}
