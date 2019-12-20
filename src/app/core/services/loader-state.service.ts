import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoaderStateService {
  showSubject = new BehaviorSubject(false);

  getLoaderState(): Observable<boolean> {
    return this.showSubject.asObservable();
  }

  showLoader() {
    this.showSubject.next(true);
  }

  hideLoader() {
    this.showSubject.next(false);
  }
}
