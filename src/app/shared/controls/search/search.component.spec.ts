import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, Input, Output, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let hostComponent: HostSearchComponent;
  let hostFixture: ComponentFixture<HostSearchComponent>;

  @Component({
    template: `
      <app-search
        (searchTextChange)="onSearchTextChange($event)"
      ></app-search>
    `
  })
  class HostSearchComponent {
    onSearchTextChange() {}
  }

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
      declarations: [
        SearchComponent,
        HostSearchComponent,
        MockInputComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(HostSearchComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should set input placeholder', () => {
    const inputDebugEl = hostFixture.debugElement.query(By.directive(MockInputComponent));
    const inputComponent = inputDebugEl.componentInstance;

    expect(inputComponent.placeholder).toBe('Text to search');
  });

  it('should set input icon', () => {
    const inputDebugEl = hostFixture.debugElement.query(By.directive(MockInputComponent));
    const inputComponent = inputDebugEl.componentInstance;

    expect(inputComponent.iconPath).toBe('assets/img/search.png');
  });

  it('should emit search text change', fakeAsync(() => {
    const inputDebugEl = hostFixture.debugElement.query(By.directive(MockInputComponent));
    const inputComponent = inputDebugEl.componentInstance;
    const searchText = 'some_text';
    const searchTextChangeSpy = spyOn(hostComponent, 'onSearchTextChange');

    inputComponent.valueChange.emit(searchText);

    tick(500);

    expect(searchTextChangeSpy).toHaveBeenCalledWith(searchText);
  }));
});
