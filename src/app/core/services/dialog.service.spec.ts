import { TestBed, getTestBed } from '@angular/core/testing';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { of } from 'rxjs';

import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let sut: DialogService;

  let injector: TestBed;
  let mockMatDialog;
  let mockMatDialogRef;
  let mockMatDialogConfig;

  beforeEach(() => {
    mockMatDialogRef = {
      afterClosed: () => of(false)
    };

    mockMatDialog = {
      open: jasmine.createSpy().and.returnValue(mockMatDialogRef),
    };

    mockMatDialogConfig = {};
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DialogService,
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: MatDialogConfig, useValue: mockMatDialogConfig },
      ]
    });

    injector = getTestBed();
    sut = injector.get(DialogService);
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });
});
