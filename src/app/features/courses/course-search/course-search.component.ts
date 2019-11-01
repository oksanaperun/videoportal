import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseSearchComponent implements OnInit {
  private searchText = '';

  constructor() { }

  ngOnInit() {
  }

  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
  }

  onSearchButtonClick() {
    console.log(`Search should be done for the text [${this.searchText}]`);
  }
}
