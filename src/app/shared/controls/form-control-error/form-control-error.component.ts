import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  hasError(): boolean {
    const control = this.form.controls[this.controlName];

    return control.dirty && control.errors && control.errors[this.errorName];
  }

  getErrorMessage(): string {
    switch (this.errorName) {
      case 'required':
        return 'This field is required';
      case 'maxlength':
        return `Max allowed length of this field is ${this.errorCondition} symbols`;
      case 'min':
        return `This field value should be greater or equal to ${this.errorCondition}`;
    }
  }
}
