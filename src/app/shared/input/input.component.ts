import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
  @Input() placeholder?: string;
  @Input() iconPath?: string;
  @Output() valueChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onInput(event) {
    this.valueChange.emit(event.target.value);
  }
}
