import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement} from '@angular/core';
import { By } from '@angular/platform-browser';

import { CreationDateBorderDirective } from './creation-date-border.directive';

describe('CreationDateBorderDirective', () => {
  let testComponent: TestCreadtionDateBorderComponent;
  let testFixture: ComponentFixture<TestCreadtionDateBorderComponent>;
  let testDebugEl: DebugElement;

  let currentDate: Date;

  @Component({
    template: '<div [appCreationDateBorder]="creationDate"></div>'
  })
  class TestCreadtionDateBorderComponent {
    creationDate: number;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestCreadtionDateBorderComponent,
        CreationDateBorderDirective,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testFixture = TestBed.createComponent(TestCreadtionDateBorderComponent);
    testComponent = testFixture.componentInstance;
    testDebugEl = testFixture.debugElement.query(By.css('div'));

    currentDate = new Date();
  });

  it('should set border when creation date is tomorrow', () => {
    testComponent.creationDate = currentDate.setDate(currentDate.getDate() + 1);
    testFixture.detectChanges();

    expect(testDebugEl.nativeElement.style.border).toBe('2px solid rgb(48, 182, 221)');
  });

  it('should set border when creation date is today', () => {
    testComponent.creationDate = currentDate.getTime();
    testFixture.detectChanges();

    expect(testDebugEl.nativeElement.style.border).toBe('2px solid rgb(155, 200, 55)');
  });

  it('should set border when creation date is 14 days ago', () => {
    testComponent.creationDate = currentDate.setDate(currentDate.getDate() - 14);
    testFixture.detectChanges();

    expect(testDebugEl.nativeElement.style.border).toBe('2px solid rgb(155, 200, 55)');
  });

  it('should NOT set border when creation date is 15 days ago', () => {
    testComponent.creationDate = currentDate.setDate(currentDate.getDate() - 15);
    testFixture.detectChanges();

    expect(testDebugEl.nativeElement.style.border).toBe('');
  });
});
