import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { BreadcrumbRoute } from 'src/app/core/entities';
import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  let route1: BreadcrumbRoute;
  let route2: BreadcrumbRoute;
  let mockRouter;
  let mockStore;

  beforeEach(() => {
    route1 = { path: ['path', '1'], title: 'title 1' };
    route2 = { path: ['path', '2'], title: 'title 2' };

    mockRouter = {
      navigate: jasmine.createSpy()
    };

    mockStore = {
      select: () => of([route1, route2])
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbsComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: Store, useValue: mockStore },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render routes', () => {
    const routeEls = fixture.debugElement.queryAll(By.css('span.item'));

    expect(routeEls.length).toBe(2);
  });

  it('should render route title', () => {
    const routeEl = fixture.debugElement.query(By.css('span.item')).nativeElement;

    expect(routeEl.textContent.trim()).toBe('title 1 /');
  });
});
