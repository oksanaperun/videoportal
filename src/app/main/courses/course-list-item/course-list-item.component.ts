import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/core/store/models/app-state';
import { Course } from 'src/app/core/entities';
import { DialogService } from 'src/app/core/services/dialog.service';
import { DeleteCourseModalComponent } from '../delete-course-modal/delete-course-modal.component';
import { RemoveCourseAction } from 'src/app/core/store/courses-store';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListItemComponent {
  @Input() course: Course;

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private store: Store<AppState>,
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
      tap(() => { this.store.dispatch(new RemoveCourseAction(this.course.id)); }),
    ).subscribe();
  }
}
