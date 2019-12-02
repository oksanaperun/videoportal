import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';

import { PageNotFoundComponent } from './page-not-found.component';


@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [
        CommonModule,
        SharedModule,
        PageNotFoundRoutingModule,
    ]
})
export class PageNotFoundModule { }
