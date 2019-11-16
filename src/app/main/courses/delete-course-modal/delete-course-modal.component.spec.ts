import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { DeleteCourseModalComponent } from './delete-course-modal.component';

describe('DeleteCourseModalComponent', () => {
  let component: DeleteCourseModalComponent;
  let fixture: ComponentFixture<DeleteCourseModalComponent>;

  let title;
  let mockMatDialogRef;
  let mockMatDialogData;

  beforeEach(() => {
    title = 'Test title';

    mockMatDialogRef = {
      close: jasmine.createSpy()
    };

    mockMatDialogData = { title };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DeleteCourseModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockMatDialogData }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have course title', () => {
    expect(component.courseTitle).toBe(title);
  });

  it('should close dialog with truthy value on confirm button click', () => {
    const confirmButton = fixture.debugElement.query(By.css('.confirm-button'));

    confirmButton.nativeElement.dispatchEvent(new Event('click'));

    expect(mockMatDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should close dialog with falsy value on cancel button click', () => {
    const confirmButton = fixture.debugElement.query(By.css('.cancel-button'));

    confirmButton.nativeElement.dispatchEvent(new Event('click'));

    expect(mockMatDialogRef.close).toHaveBeenCalledWith(false);
  });
});
