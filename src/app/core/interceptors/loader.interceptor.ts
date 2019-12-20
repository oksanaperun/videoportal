import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoaderStateService } from 'src/app/core/services/loader-state.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderStateService: LoaderStateService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderStateService.showLoader();

    return next.handle(request).pipe(
      finalize(() => this.loaderStateService.hideLoader())
    );
  }
}
