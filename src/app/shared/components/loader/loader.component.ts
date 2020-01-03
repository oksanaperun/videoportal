import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/core/store/models/app-state';
import { getLoaderState } from 'src/app/core/store/loader-store';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  showLoader$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.showLoader$ = this.store.select(getLoaderState) as Observable<boolean>;
  }
}
