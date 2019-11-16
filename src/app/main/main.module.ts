import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { MainComponent } from './main.component';

@NgModule({
    declarations: [
        BreadcrumbsComponent,
        MainComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        MainRoutingModule,
    ]
})
export class MainModule { }
