import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.scss']
})
export class CourseListItemComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() duration: number;
  @Input() creationDate: number;

  constructor() { }

  ngOnInit() {
  }

}
