import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByTitle'
})
export class FilterByTitlePipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    return searchText
      ? items.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()))
      : [...items];
  }

}
