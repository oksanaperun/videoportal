import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-course-modal',
  templateUrl: './delete-course-modal.component.html',
  styleUrls: ['./delete-course-modal.component.scss']
})
export class DeleteCourseModalComponent {
  courseTitle: string;

  constructor(
    private dialogRef: MatDialogRef<DeleteCourseModalComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.courseTitle = data.title;
  }

  save() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}
