import {
  Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy,
  OnChanges, DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy
} from '@angular/core';
import { ICourse } from 'src/app/core/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent implements
  OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() courses: ICourse[];
  @Output() deleteCourse = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    console.log('[COURSE LIST] OnInit');
  }

  ngOnChanges() {
    console.log('[COURSE LIST] OnChanges');
  }

  ngDoCheck() {
    console.log('[COURSE LIST] DoCheck');
  }

  ngAfterContentInit() {
    console.log('[COURSE LIST] AfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('[COURSE LIST] AfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('[COURSE LIST] AfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('[COURSE LIST] AfterViewChecked');
  }

  ngOnDestroy() {
    console.log('[COURSE LIST] OnDestroy');
  }

  trackCoursesById(index: number, course: ICourse): string {
    return course.id;
  }
}
