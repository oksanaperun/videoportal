import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-control-error',
  templateUrl: './form-control-error.component.html',
  styleUrls: ['./form-control-error.component.scss']
})
export class FormControlErrorComponent {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() errorName: string;
  @Input() errorCondition?: any;

  constructor(
    private translateService: TranslateService,
  ) {}

  hasError(): boolean {
    const control = this.form.controls[this.controlName];

    return control.dirty && control.errors && control.errors[this.errorName];
  }

  getErrorMessage$(): Observable<string> {
    switch (this.errorName) {
      case 'required':
        return this.translateService.get('ERRORS.REQUIRED');
      case 'maxlength':
        return this.translateService.get('ERRORS.MAX_LENGTH', { numberOfSymbols: this.errorCondition });
      case 'min':
        return this.translateService.get('ERRORS.MIN', { numberOfSymbols: this.errorCondition });
    }
  }
}
