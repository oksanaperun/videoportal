import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-integer-input',
  templateUrl: './integer-input.component.html',
  styleUrls: ['./integer-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => IntegerInputComponent),
    multi: true
  }]
})
export class IntegerInputComponent implements ControlValueAccessor {
  @Input() placeholder?: string;
  @Input() invalid?: boolean;

  value: number;

  isInteger(event: KeyboardEvent) {
    const isValid = /\d/.test(event.key);

    if (!isValid) {
      event.preventDefault();
    }
  }

  onInput(event) {
    this.propagateChange(event.target.value);
  }

  writeValue(value: number) {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  private propagateChange = (_: number) => { };
}
