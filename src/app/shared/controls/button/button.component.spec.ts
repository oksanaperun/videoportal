import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let componentDebugEl: DebugElement;
  let componentNativeEl: HTMLElement;
  let hostComponent: HostButtonComponent;
  let hostFixture: ComponentFixture<HostButtonComponent>;

  @Component({
    template: '<app-button [name]="name" [iconPath]="icon" [fontSize]="size" [textColor]="color"></app-button>'
  })
  class HostButtonComponent {
    name: string;
    icon: string;
    size: string;
    color: string;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent, HostButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(HostButtonComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    componentDebugEl = hostFixture.debugElement.query(By.directive(ButtonComponent));
    componentNativeEl = componentDebugEl.nativeElement;
    component = componentDebugEl.componentInstance;
  });

  it('should render button name', () => {
    const buttonName = 'some_button_name';

    hostComponent.name = buttonName;
    hostFixture.detectChanges();

    const buttonEl = componentNativeEl.querySelector('button');

    expect(buttonEl.textContent.trim()).toBe(buttonName);
  });

  it('should render icon when its path is defined', () => {
    const image = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

    hostComponent.icon = image;
    hostFixture.detectChanges();

    const iconEl = componentNativeEl.querySelector('img');

    expect(iconEl.getAttribute('src')).toBe(image);
  });

  it('should NOT render icon when its path is NOT defined', () => {
    const iconEl = componentNativeEl.querySelector('img');

    expect(iconEl).toBeFalsy();
  });

  it('should set button font size in styles', () => {
    const fontSize = 'some_size';

    hostComponent.size = fontSize;
    hostFixture.detectChanges();

    expect(component.getStyles()).toEqual({ fontSize });
  });

  it('should set button color in styles', () => {
    const color = 'some_color';

    hostComponent.color = color;
    hostFixture.detectChanges();

    expect(component.getStyles()).toEqual({ color });
  });
});
