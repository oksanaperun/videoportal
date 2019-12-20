import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { BreadcrumbRoute } from 'src/app/core/entities';
import { BreadcrumbsService } from 'src/app/core/services/breadcrumbs.service';
import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  let route1: BreadcrumbRoute;
  let route2: BreadcrumbRoute;
  let mockRouter;
  let mockBreadcrumbsService;

  beforeEach(() => {
    route1 = { path: ['path', '1'], title: 'title 1' };
    route2 = { path: ['path', '2'], title: 'title 2' };

    mockRouter = {
      navigate: jasmine.createSpy()
    };

    mockBreadcrumbsService = {
      getRoutes: () => of([route1, route2])
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbsComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: BreadcrumbsService, useValue: mockBreadcrumbsService },
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
