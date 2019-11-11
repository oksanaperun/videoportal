import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appCreationDateBorder]'
})
export class CreationDateBorderDirective implements OnChanges {
  @Input('appCreationDateBorder') creationDate: number;

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    this.changeBorder(changes.creationDate.currentValue);
  }

  private changeBorder(creationDate: number) {
    const border = this.getBorder(creationDate);

    if (border) {
      this.el.nativeElement.style.border = border;
    }
  }

  private getBorder(creationDate: number): string {
    const currentDate = new Date().getTime() ;
    const diffInDays = Math.floor((currentDate - creationDate) / (24 * 60 * 60 * 1000));
    const border = '2px solid ';

    if (diffInDays < 0) {
      return `${border} #30b6dd`;
    } else if (diffInDays <= 14) {
      return `${border} #9bc837`;
    }
  }
}
