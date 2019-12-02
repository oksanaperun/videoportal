import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./courses/courses.module').then(mod => mod.CoursesModule)
      },
      {
        path: 'new',
        loadChildren: () => import('./new-course/new-course.module').then(mod => mod.NewCourseModule)
      },
      {
        path: ':id',
        component: EditCourseComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
