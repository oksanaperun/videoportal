import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform, Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CourseListItemComponent } from './course-list-item.component';
import { Course } from 'src/app/core/entities';

describe('CourseListItemComponent', () => {
  let hostComponent: HostCourseListItemComponent;
  let hostFixture: ComponentFixture<HostCourseListItemComponent>;

  const id = 'some_id';
  const title = 'some_title';
  const description = 'some_description';
  const duration = 1;
  const creationDate = 1571050553514;

  @Pipe({ name: 'timeInMinutes' })
  class MockTimeInMinutesPipe implements PipeTransform {
    transform(value: number): string {
      return `${value} formatted`;
    }
  }

  @Component({
    template: `
      <app-course-list-item
        [course]="course"
        (deleteCourse)="onDelete($event)"
        (editCourse)="onEdit($event)"
      ></app-course-list-item>
    `
  })
  class HostCourseListItemComponent {
    course: Course;
    onDelete() { }
    onEdit() { }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        CourseListItemComponent,
        HostCourseListItemComponent,
        MockTimeInMinutesPipe,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(HostCourseListItemComponent);
    hostComponent = hostFixture.componentInstance;
    hostComponent.course = { id, title, description, duration, creationDate, authors: [] };
    hostFixture.detectChanges();
  });

  it('should render title', () => {
    const titleEl = hostFixture.debugElement.query(By.css('.title')).nativeElement;

    expect(titleEl.textContent.trim()).toBe(title.toUpperCase());
  });

  it('should render description', () => {
    const descriptionEl = hostFixture.debugElement.query(By.css('.description')).nativeElement;

    expect(descriptionEl.textContent).toBe(description);
  });

  describe('duration', () => {
    let durationEl;

    beforeEach(() => {
      durationEl = hostFixture.debugElement.query(By.css('app-button')).nativeElement;
    });

    it('should have a name', () => {
      expect(durationEl.name).toBe(`${duration} formatted`);
    });

    it('should have an icon', () => {
      expect(durationEl.iconPath).toBe('assets/img/clock.png');
    });

    it('should have a font size', () => {
      expect(durationEl.fontSize).toBe('12px');
    });

    it('should have a color', () => {
      expect(durationEl.textColor).toBe('#b9bdce');
    });
  });

  describe('creation date', () => {
    let creationDateEl;

    beforeEach(() => {
      creationDateEl = hostFixture.debugElement.queryAll(By.css('app-button'))[1].nativeElement;
    });

    it('should have a name', () => {
      expect(creationDateEl.name).toBe('14 Oct, 2019');
    });

    it('should have an icon', () => {
      expect(creationDateEl.iconPath).toBe('assets/img/calendar.png');
    });

    it('should have a font size', () => {
      expect(creationDateEl.fontSize).toBe('12px');
    });

    it('should have a color', () => {
      expect(creationDateEl.textColor).toBe('#b9bdce');
    });
  });

  describe('edit button', () => {
    let editButtonEl;

    beforeEach(() => {
      editButtonEl = hostFixture.debugElement.queryAll(By.css('app-button'))[2].nativeElement;
    });

    it('should have a name', () => {
      expect(editButtonEl.name).toBe('Edit');
    });

    it('should have an icon', () => {
      expect(editButtonEl.iconPath).toBe('assets/img/pencil.png');
    });

    it('should have a font size', () => {
      expect(editButtonEl.fontSize).toBe('12px');
    });

    it('should notify about click event', () => {
      const onEditSpy = spyOn(hostComponent, 'onEdit');

      editButtonEl.dispatchEvent(new Event('click'));

      expect(onEditSpy).toHaveBeenCalledWith(id);
    });
  });

  describe('delete button', () => {
    let deleteButtonEl;

    beforeEach(() => {
      deleteButtonEl = hostFixture.debugElement.queryAll(By.css('app-button'))[3].nativeElement;
    });

    it('should have a name', () => {
      expect(deleteButtonEl.name).toBe('Delete');
    });

    it('should have an icon', () => {
      expect(deleteButtonEl.iconPath).toBe('assets/img/trash.png');
    });

    it('should have a font size', () => {
      expect(deleteButtonEl.fontSize).toBe('12px');
    });

    it('should notify about click event', () => {
      const onDeleteSpy = spyOn(hostComponent, 'onDelete');

      deleteButtonEl.dispatchEvent(new Event('click'));

      expect(onDeleteSpy).toHaveBeenCalledWith(id);
    });
  });
});
