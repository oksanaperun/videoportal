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
  courses: ICourse[];
  searchText: string;

  ngOnInit() {
    this.courses = courses;
  }

  get displayNoDataMessage(): boolean {
    return this.courses.length === 0;
  }

  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
  }

  onLoadMoreClick() {
    console.log('Load more is clicked.');
  }

  onDeleteCourse(courseId: string) {
    console.log(`Course with id [${courseId}] should be deleted.`);
  }
}
