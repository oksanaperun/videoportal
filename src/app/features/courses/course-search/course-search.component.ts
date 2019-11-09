import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseSearchComponent {
  @Output() searchTextChange = new EventEmitter<string>();

  private searchText = '';

  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
  }

  onSearchButtonClick() {
    console.log(`Search should be done for the text [${this.searchText}]`);
    this.searchTextChange.emit(this.searchText);
  }
}
