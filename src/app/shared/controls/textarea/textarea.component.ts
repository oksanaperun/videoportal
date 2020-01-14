import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {
  @Input() placeholder?: string;
  @Input() value?: string;
  @Output() valueChange = new EventEmitter<string>();

  onInput(event) {
    this.valueChange.emit(event.target.value);
  }
}
