import { TestBed, getTestBed } from '@angular/core/testing';

import { BreadcrumbsService } from './breadcrumbs.service';

describe('BreadcrumbsService', () => {
  let sut: BreadcrumbsService;

  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreadcrumbsService]
    });

    injector = getTestBed();
    sut = injector.get(BreadcrumbsService);
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });
});
