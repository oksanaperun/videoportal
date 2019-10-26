import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/core/course';
// TODO: For debug
import { courses } from 'src/app/fake-data';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: ICourse[] = courses;

  constructor() { }

  ngOnInit() {
  }

}
