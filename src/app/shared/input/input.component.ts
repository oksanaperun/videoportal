import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() placeholder?: string;
  @Input() iconPath?: string;

  @Output() valueChange = new EventEmitter<string>();

  onInput(event) {
    this.valueChange.emit(event.target.value);
  }
}
