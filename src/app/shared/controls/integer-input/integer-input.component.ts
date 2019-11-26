import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-integer-input',
  templateUrl: './integer-input.component.html',
  styleUrls: ['./integer-input.component.scss']
})
export class IntegerInputComponent {
  @Input() placeholder?: string;
  @Input() value?: number;
  @Output() valueChange = new EventEmitter<string>();

  isInteger(event: KeyboardEvent) {
    const isValid = /\d/.test(event.key);

    if (!isValid) {
      event.preventDefault();
    }
  }

  onInput(event) {
    this.valueChange.emit(event.target.value);
  }
}
