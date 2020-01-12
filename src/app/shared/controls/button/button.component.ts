import { Component, Input } from '@angular/core';

export interface ButtonStyles {
  fontSize?: string;
  color?: string;
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() name: string;
  @Input() iconPath?: string;
  @Input() fontSize?: string;
  @Input() textColor?: string;
  @Input() disabled?: boolean;

  getStyles(): ButtonStyles {
    return {
      ...(this.fontSize && { fontSize: this.fontSize }),
      ...(this.textColor && { color: this.textColor }),
    };
  }
}
