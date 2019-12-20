import { TestBed, getTestBed } from '@angular/core/testing';

import { LoaderStateService } from './loader-state.service';

describe('LoaderStateService', () => {
  let sut: LoaderStateService;

  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderStateService]
    });

    injector = getTestBed();
    sut = injector.get(LoaderStateService);
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });
});
