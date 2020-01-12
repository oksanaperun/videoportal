import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder?: string;
  @Input() iconPath?: string;
  @Input() inputHeight?: string;
  @Input() type?: string;
  @Input() invalid?: boolean;

  value: string;

  getInputStyles() {
    return {
      width: `calc(100% - ${this.iconPath ? '56' : '24'}px)`,
      padding: `6px 12px 6px ${this.iconPath ? '42' : '12'}px`,
      height: this.inputHeight || '22px',
    };
  }

  onInput(event) {
    this.propagateChange(event.target.value);
  }

  writeValue(value: string) {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  private propagateChange = (_: string) => { };
}
