import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HeaderComponent]
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

  it('should handle logout button click event', () => {
    const logoutEl = fixture.debugElement.queryAll(By.css('app-button'))[1].nativeElement;
    const consoleLogSpy = spyOn(console, 'log');

    logoutEl.dispatchEvent(new Event('click'));

    expect(consoleLogSpy).toHaveBeenCalledWith('Logout is clicked.');
  });
});
