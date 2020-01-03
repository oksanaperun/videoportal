import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let mockRouter;
  let mockAuthService;
  let routerState;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy()
    };

    mockAuthService = {
      redirectUrl: ''
    };

    routerState = {
      url: 'some_url'
    };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useFactory: () => mockAuthService },
      ]
    });
  });

  describe('when user is authenticated', () => {
    beforeEach(() => {
      mockAuthService.getAuthToken = () => 'some_token';
    });

    it('should activate route', inject([AuthGuard], (guard: AuthGuard) => {
      guard.canActivate(null, routerState)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toBe(true);
        });
    }));

    it('should NOT store original url', inject([AuthGuard], (guard: AuthGuard) => {
      guard.canActivate(null, routerState)
        .pipe(take(1))
        .subscribe(() => {
          expect(mockAuthService.redirectUrl).toBe('');
        });
    }));
  });

  describe('when user is NOT authenticated', () => {
    beforeEach(() => {
      mockAuthService.getAuthToken = () => '';
    });

    it('should NOT activate route', inject([AuthGuard], (guard: AuthGuard) => {
      guard.canActivate(null, routerState)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toBe(false);
        });
    }));

    it('should redirect user to login page', inject([AuthGuard], (guard: AuthGuard) => {
      guard.canActivate(null, routerState)
        .pipe(take(1))
        .subscribe(() => {
          expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
        });
    }));

    it('should store original url', inject([AuthGuard], (guard: AuthGuard) => {
      guard.canActivate(null, routerState)
        .pipe(take(1))
        .subscribe(() => {
          expect(mockAuthService.redirectUrl).toBe('some_url');
        });
    }));
  });
});
