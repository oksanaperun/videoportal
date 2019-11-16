import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() placeholder?: string;
  @Input() iconPath?: string;
  @Output() valueChange = new EventEmitter<string>();

  get inputStyles() {
    return {
      width: `calc(100% - ${this.iconPath ? '56' : '24'}px)`,
      padding: `12px 12px 12px ${this.iconPath ? '42' : '12'}px`,
    };
  }

  onInput(event) {
    this.valueChange.emit(event.target.value);
  }
}
