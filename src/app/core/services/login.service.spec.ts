import { TestBed, getTestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let sut: LoginService;

  let injector: TestBed;
  let mockRouter;
  let mockAuthService;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy()
    };

    mockAuthService = {
      login: jasmine.createSpy().and.returnValue(of(null)),
      isAuthenticated: true
    };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
      ]
    });

    injector = getTestBed();
    sut = injector.get(LoginService);
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });
});
