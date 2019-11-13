import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: 'courses',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./courses/courses.module').then(mod => mod.CoursesModule)
      },
      {
        path: 'new',
        loadChildren: () => import('./new-course/new-course.module').then(mod => mod.NewCourseModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
