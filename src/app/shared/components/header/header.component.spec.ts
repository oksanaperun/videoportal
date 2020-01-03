import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { LOGOUT } from 'src/app/core/store/auth-store';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let mockRouter;
  let mockStore;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy()
    };

    mockStore = {
      dispatch: jasmine.createSpy(),
      select: jasmine.createSpy().and.returnValue(of({
        getUserName: () => 'User login'
      })),
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HeaderComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: Store, useValue: mockStore },
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

  it('should logout user on logout button click', () => {
    const logoutEl = fixture.debugElement.queryAll(By.css('app-button'))[1].nativeElement;

    logoutEl.dispatchEvent(new Event('click'));

    const storeAction = mockStore.dispatch.calls.mostRecent().args[0];

    expect(storeAction.type).toBe(LOGOUT);
  });
});
