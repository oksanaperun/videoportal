import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { BreadcrumbsService } from './services/breadcrumbs.service';
import { LoaderStateService } from './services/loader-state.service';
import { UserService } from './api/user/user.service';

import { AuthHeaderInterceptor } from './interceptors/auth-header.interceptor';
import { ApiUrlInterceptor } from './interceptors/api-url.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    providers: [
        AuthGuard,
        AuthService,
        BreadcrumbsService,
        LoaderStateService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHeaderInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiUrlInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true
        }
    ],
    exports: []
})
export class CoreModule { }
