import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './login.component';
import { LoginFormComponent } from './login-form/login-form.component';

import { LoginGuard } from '../core/guards/login.guard';

@NgModule({
    declarations: [
        LoginComponent,
        LoginFormComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        LoginRoutingModule,
    ],
    providers: [
        LoginGuard,
    ]
})
export class LoginModule { }
