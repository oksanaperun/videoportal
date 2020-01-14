import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { IntegerInputComponent } from './integer-input.component';

describe('IntegerInputComponent', () => {
  let componentDebugEl: DebugElement;
  let componentNativeEl: HTMLElement;
  let hostComponent: HostIntegerInputComponent;
  let hostFixture: ComponentFixture<HostIntegerInputComponent>;

  @Component({
    template: `
      <app-integer-input
        [placeholder]="placeholder"
        [value]="value"
        (valueChange)="onChange($event)"
      ></app-integer-input>
    `
  })
  class HostIntegerInputComponent {
    placeholder: string;
    value: string;
    onChange() { }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HostIntegerInputComponent,
        IntegerInputComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(HostIntegerInputComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    componentDebugEl = hostFixture.debugElement.query(By.directive(IntegerInputComponent));
    componentNativeEl = componentDebugEl.nativeElement;
  });

  it('should set input placeholder', () => {
    const placeholder = 'some_placeholder';

    hostComponent.placeholder = placeholder;
    hostFixture.detectChanges();

    const inputEl = componentNativeEl.querySelector('input');

    expect(inputEl.placeholder).toBe(placeholder);
  });

  it('should set input value', () => {
    const value = 'some_value';

    hostComponent.value = value;
    hostFixture.detectChanges();

    const inputEl = componentNativeEl.querySelector('input');

    expect(inputEl.value).toBe(value);
  });

  it('should notify about input change', () => {
    const inputEl = componentNativeEl.querySelector('input');
    const inputValue = 'some_value';
    const onChangeSpy = spyOn(hostComponent, 'onChange');

    inputEl.value = inputValue;
    inputEl.dispatchEvent(new Event('input'));

    expect(onChangeSpy).toHaveBeenCalledWith(inputValue);
  });

  it('should NOT prevent integer keyboard key press', () => {
    const inputEl = componentNativeEl.querySelector('input');
    const keyboardEvent = new KeyboardEvent('keypress', { key: '2' });
    const preventDefaultSpy = spyOn(keyboardEvent, 'preventDefault');

    inputEl.dispatchEvent(keyboardEvent);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should prevent non-integer keyboard key press', () => {
    const inputEl = componentNativeEl.querySelector('input');
    const keyboardEvent = new KeyboardEvent('keypress', { key: 'w' });
    const preventDefaultSpy = spyOn(keyboardEvent, 'preventDefault');
    const onChangeSpy = spyOn(hostComponent, 'onChange');

    inputEl.dispatchEvent(keyboardEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
