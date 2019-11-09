import { Pipe, PipeTransform } from '@angular/core';
import { SortDirection } from '../enumsAndTypes';

@Pipe({
  name: 'orderByCreationDate'
})
export class OrderByCreationDatePipe implements PipeTransform {

  transform(items: any[], direction: SortDirection): any[] {
    return [...items].sort(this.compareCourses(direction));
  }

  private compareCourses(direction: SortDirection) {
    return (item1: any, item2: any): number => {
      const diff = item2.creationDate - item1.creationDate;

      if (diff > 0) { return direction === 'ASC' ? -1 : 1; }
      if (diff < 0) { return direction === 'ASC' ? 1 : -1; }
      return 0;
    };
  }
}
