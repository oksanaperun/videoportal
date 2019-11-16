import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let mockRouter;
  let mockAuthService;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy()
    };

    mockAuthService = {
      logout: jasmine.createSpy(),
      isAuthenticated: true
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HeaderComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set user button name', () => {
    const userEl = fixture.debugElement.query(By.css('app-button')).nativeElement;

    expect(userEl.name).toBe('User login');
  });

  it('should set user button icon', () => {
    const userEl = fixture.debugElement.query(By.css('app-button')).nativeElement;

    expect(userEl.iconPath).toBe('assets/img/user.png');
  });

  it('should set logout button name', () => {
    const logoutEl = fixture.debugElement.queryAll(By.css('app-button'))[1].nativeElement;

    expect(logoutEl.name).toBe('Logout');
  });

  it('should set logout button icon', () => {
    const logoutEl = fixture.debugElement.queryAll(By.css('app-button'))[1].nativeElement;

    expect(logoutEl.iconPath).toBe('assets/img/exit.png');
  });

  describe('on logout button click', () => {
    beforeEach(() => {
      const logoutEl = fixture.debugElement.queryAll(By.css('app-button'))[1].nativeElement;

      logoutEl.dispatchEvent(new Event('click'));
    });

    it('should logout user', () => {
      expect(mockAuthService.logout).toHaveBeenCalledWith();
    });

    it('should navigate user to login', () => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
    });
  });
});
