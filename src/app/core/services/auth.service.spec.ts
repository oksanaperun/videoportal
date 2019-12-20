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

  it('should return true when user is defined', () => {
    spyOn(localStorage, 'getItem')
      .and.returnValue('some_user');

    expect(sut.isAuthenticated).toBe(true);
  });

  it('should return false when user is NOT defined', () => {
    spyOn(localStorage, 'getItem')
      .and.returnValue('');

    expect(sut.isAuthenticated).toBe(false);
  });

  it('should return auth token', () => {
    const token = 'some_token';

    spyOn(localStorage, 'getItem')
      .and.returnValue(token);

    expect(sut.getAuthToken()).toBe(token);
  });

  it('should store auth token on login', () => {
    const token = 'some_token';
    const setItemSpy = spyOn(localStorage, 'setItem');

    sut.login('user', 'password').subscribe(() => {
      expect(setItemSpy).toHaveBeenCalledWith('authToken', token);
    });

    const req = mockHttp.expectOne('auth/login');
    expect(req.request.method).toBe('POST');
    req.flush({ token });
  });

  it('should clear user info on logout', () => {
    const removeItemSpy = spyOn(localStorage, 'removeItem');

    sut.logout();

    expect(removeItemSpy).toHaveBeenCalledWith('authToken');
  });
});
