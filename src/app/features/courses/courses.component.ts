import {
  Component, OnInit, OnChanges, DoCheck, AfterContentInit,
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy
} from '@angular/core';
import { ICourse } from 'src/app/core/course';
// TODO: For debug
import { courses } from 'src/app/fake-data';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements
  OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy {
  courses: ICourse[];

  constructor() { }

  ngOnInit() {
    console.log('[COURSES] OnInit');
    this.courses = courses;
  }

  ngOnChanges() {
    console.log('[COURSES] OnChanges');
  }

  ngDoCheck() {
    console.log('[COURSES] DoCheck');
  }

  ngAfterContentInit() {
    console.log('[COURSES] AfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('[COURSES] AfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('[COURSES] AfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('[COURSES] AfterViewChecked');
  }

  ngOnDestroy() {
    console.log('[COURSES] OnDestroy');
  }

  onLoadMoreClick() {
    console.log('Load more is clicked.');
  }

  onDeleteCourse(courseId: string) {
    console.log(`Course with id [${courseId}] should be deleted.`);
  }
}
