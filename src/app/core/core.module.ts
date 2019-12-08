import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthHeaderInterceptor } from './api/interceptors/auth-header.interceptor';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHeaderInterceptor,
            multi: true
        }
    ],
    exports: []
})
export class CoreModule { }
