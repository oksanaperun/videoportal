import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, Input, Output, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';
import { skip, take } from 'rxjs/operators';

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

  it('should emit search text change', () => {
    const inputDebugEl = fixture.debugElement.query(By.directive(MockInputComponent));
    const inputComponent = inputDebugEl.componentInstance;
    const searchText = 'some_text';

    component.getSearchTextChange()
      .pipe(skip(1), take(1))
      .subscribe((result) => {
        expect(result).toBe(searchText);
      });

    inputComponent.valueChange.emit(searchText);
  });
});
