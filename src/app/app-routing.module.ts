import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./main/main.module').then(mod => mod.MainModule)
  },
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
