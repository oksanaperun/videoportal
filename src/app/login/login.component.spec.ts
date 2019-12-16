import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from 'src/app/core/auth/auth.service';
import { LoaderStateService } from 'src/app/core/loader-state/loader-state.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let mockRouter;
  let mockAuthService;
  let mockLoaderStateService;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy()
    };

    mockAuthService = {
      login: jasmine.createSpy().and.returnValue(of(null)),
      isAuthenticated: true
    };

    mockLoaderStateService = {
      showLoader: jasmine.createSpy(),
      hideLoader: jasmine.createSpy(),
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
        { provide: LoaderStateService, useValue: mockLoaderStateService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
