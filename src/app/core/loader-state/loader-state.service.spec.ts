import { TestBed } from '@angular/core/testing';

import { LoaderStateService } from './loader-state.service';

describe('LoaderStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoaderStateService = TestBed.get(LoaderStateService);
    expect(service).toBeTruthy();
  });
});
