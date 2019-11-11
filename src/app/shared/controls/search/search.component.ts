import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
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
