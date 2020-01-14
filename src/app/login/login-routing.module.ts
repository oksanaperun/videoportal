import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from '../core/guards/login.guard';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
