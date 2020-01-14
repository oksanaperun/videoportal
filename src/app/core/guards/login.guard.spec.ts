import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let mockRouter;
  let mockAuthService;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy()
    };

    mockAuthService = {
      getAuthToken: jasmine.createSpy().and.returnValue('some_token')
    };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginGuard,
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useFactory: () => mockAuthService },
      ]
    });
  });

  it('should activate route', inject([LoginGuard], (guard: LoginGuard) => {
    expect(guard.canActivate(null, null)).toBe(true);
  }));
});
