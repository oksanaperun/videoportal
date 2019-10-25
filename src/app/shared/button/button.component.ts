import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
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
