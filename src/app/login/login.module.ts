import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './login.component';
import { LoginFormComponent } from './login-form/login-form.component';

import { LoginGuard } from '../core/guards/login.guard';
import { LoginService } from '../core/services/login.service';

@NgModule({
    declarations: [
        LoginComponent,
        LoginFormComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        LoginRoutingModule,
    ],
    providers: [
        LoginGuard,
        LoginService,
    ]
})
export class LoginModule { }
