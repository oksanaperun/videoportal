import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() placeholder?: string;
  @Input() iconPath?: string;
  @Input() inputHeight?: string;
  @Input() value?: string;
  @Input() type?: string;
  @Output() valueChange = new EventEmitter<string>();

  getInputStyles() {
    return {
      width: `calc(100% - ${this.iconPath ? '56' : '24'}px)`,
      padding: `6px 12px 6px ${this.iconPath ? '42' : '12'}px`,
      height: this.inputHeight || '22px',
    };
  }

  onInput(event) {
    this.valueChange.emit(event.target.value);
  }
}
