import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AppState } from '../store/models/app-state';
import { SetLoadingAction } from '../store/loader-store';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.store.dispatch(new SetLoadingAction(true));

    return next.handle(request).pipe(
      finalize(() => this.store.dispatch(new SetLoadingAction(false)))
    );
  }
}
