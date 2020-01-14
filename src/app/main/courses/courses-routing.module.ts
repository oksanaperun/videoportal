import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: CourseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
