import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let componentDebugEl: DebugElement;
  let componentNativeEl: HTMLElement;
  let hostComponent: HostInputComponent;
  let hostFixture: ComponentFixture<HostInputComponent>;

  @Component({
    template: '<app-input [placeholder]="placeholder" [iconPath]="icon" (valueChange)="onChange($event)"></app-input>'
  })
  class HostInputComponent {
    placeholder: string;
    icon: string;
    onChange() {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputComponent, HostInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(HostInputComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    componentDebugEl = hostFixture.debugElement.query(By.directive(InputComponent));
    componentNativeEl = componentDebugEl.nativeElement;
  });

  it('should set input placeholder', () => {
    const placeholder = 'some_placeholder';

    hostComponent.placeholder = placeholder;
    hostFixture.detectChanges();

    const inputEl = componentNativeEl.querySelector('input');

    expect(inputEl.placeholder).toBe(placeholder);
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

  it('should notify about input change', () => {
    const inputEl = componentNativeEl.querySelector('input');
    const inputValue = 'some_value';
    const onChangeSpy = spyOn(hostComponent, 'onChange');

    inputEl.value = inputValue;
    inputEl.dispatchEvent(new Event('input'));

    expect(onChangeSpy).toHaveBeenCalledWith(inputValue);
  });
});
