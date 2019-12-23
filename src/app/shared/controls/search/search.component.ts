import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() searchTextChange = new EventEmitter<string>();

  private searchTextSubject = new BehaviorSubject('');

  ngOnInit() {
    this.trackSearchTextChange();
  }

  ngOnDestroy() {
    this.searchTextSubject.complete();
  }

  trackSearchTextChange() {
    this.searchTextSubject.asObservable().pipe(
      filter((text: string) => !text || text.length > 2),
      map((text: string) => text.trim()),
      distinctUntilChanged(),
      debounceTime(500),
      tap((text: string) => { this.searchTextChange.emit(text); }),
    ).subscribe();
  }

  onSearchTextChange(searchText: string) {
    this.searchTextSubject.next(searchText);
  }
}
