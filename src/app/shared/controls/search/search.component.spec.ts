import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, Input, Output, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  @Component({
    selector: 'app-input',
    template: '',
  })
  class MockInputComponent {
    @Input() placeholder: string;
    @Input() iconPath: string;
    @Output() valueChange = new EventEmitter<string>();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SearchComponent, MockInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set input placeholder', () => {
    const inputDebugEl = fixture.debugElement.query(By.directive(MockInputComponent));
    const inputComponent = inputDebugEl.componentInstance;

    expect(inputComponent.placeholder).toBe('Text to search');
  });

  it('should set input icon', () => {
    const inputDebugEl = fixture.debugElement.query(By.directive(MockInputComponent));
    const inputComponent = inputDebugEl.componentInstance;

    expect(inputComponent.iconPath).toBe('assets/img/search.png');
  });

  it('should set search button name', () => {
    const buttonEl = fixture.debugElement.query(By.css('app-button')).nativeElement;

    expect(buttonEl.name).toBe('Search');
  });

  it('should set search button font size', () => {
    const buttonEl = fixture.debugElement.query(By.css('app-button')).nativeElement;

    expect(buttonEl.fontSize).toBe('18px');
  });

  it('should log search text on search button click', () => {
    const inputDebugEl = fixture.debugElement.query(By.directive(MockInputComponent));
    const inputComponent = inputDebugEl.componentInstance;
    const buttonEl = fixture.debugElement.query(By.css('app-button')).nativeElement;
    const searchText = 'some_text';
    const consoleLogSpy = spyOn(console, 'log');

    inputComponent.valueChange.emit(searchText);
    buttonEl.dispatchEvent(new Event('click'));

    expect(consoleLogSpy).toHaveBeenCalledWith(`Search should be done for the text [${searchText}]`);
  });
});
