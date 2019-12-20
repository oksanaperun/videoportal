import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { LoaderStateService } from 'src/app/core/services/loader-state.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  showLoader$: Observable<boolean>;

  constructor(
    private loaderStateService: LoaderStateService,
  ) { }

  ngOnInit() {
    this.showLoader$ = this.loaderStateService.getLoaderState().pipe(delay(0));
  }
}
