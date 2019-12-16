import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnDestroy {
  private searchTextSubject = new BehaviorSubject('');

  ngOnDestroy() {
    this.searchTextSubject.complete();
  }

  getSearchTextChange(): Observable<string> {
    return this.searchTextSubject.asObservable();
  }

  onSearchTextChange(searchText: string) {
    this.searchTextSubject.next(searchText);
  }
}
