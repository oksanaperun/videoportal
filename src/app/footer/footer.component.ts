import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  copyrightText = 'Copyright © Videocourses. All rights reserved';

  constructor() { }

  ngOnInit() {
  }

}
