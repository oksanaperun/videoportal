import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openModal(component: any, dialogData?: object): Observable<any> {
    const dialogConfig = this.createConfig(dialogData);
    const dialogRef = this.dialog.open(component, dialogConfig);

    return dialogRef.afterClosed();
  }

  private createConfig(data?: object): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.width = '394px';
    dialogConfig.data = data;

    return dialogConfig;
  }
}
