import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() searchTextChange = new EventEmitter<string>();

  searchText = new FormControl('');

  private searchTextSubscription: Subscription;

  ngOnInit() {
    this.onSearchTextChange();
  }

  ngOnDestroy() {
    if (this.searchTextSubscription) {
      this.searchTextSubscription.unsubscribe();
    }
  }

  private onSearchTextChange(): void {
    this.searchTextSubscription = this.searchText.valueChanges.pipe(
      filter((text: string) => !text || text.length > 2),
      map((text: string) => text.trim()),
      distinctUntilChanged(),
      debounceTime(500),
      tap((text: string) => { this.searchTextChange.emit(text); }),
    ).subscribe();
  }
}
