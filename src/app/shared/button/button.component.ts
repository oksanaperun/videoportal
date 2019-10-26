import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  @Input() name: string;
  @Input() iconPath?: string;
  @Input() fontSize?: string;
  @Input() textColor?: string;

  constructor() { }

  ngOnInit() {
  }

  get styles() {
    return {
      ...(this.fontSize && { fontSize: this.fontSize }),
      ...(this.textColor && { color: this.textColor }),
    };
  }
}
