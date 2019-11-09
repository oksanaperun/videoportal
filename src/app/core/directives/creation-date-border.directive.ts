import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appCreationDateBorder]'
})
export class CreationDateBorderDirective {
  @Input('appCreationDateBorder') set creationDate(creationDate: number) {
    this.changeBorder(creationDate);
  }

  constructor(private el: ElementRef) { }

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
