import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let sut: AuthService;
  let injector: TestBed;
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    injector = getTestBed();
    sut = injector.get(AuthService);
    mockHttp = injector.get(HttpTestingController);
  });

  it('should return auth token', () => {
    const token = 'some_token';

    spyOn(sessionStorage, 'getItem')
      .and.returnValue(token);

    expect(sut.getAuthToken()).toBe(token);
  });

  it('should call login endpoint on login', () => {
    sut.login('user', 'pass').subscribe();

    const req = mockHttp.expectOne('auth/login');
    expect(req.request.method).toBe('POST');
  });
});
