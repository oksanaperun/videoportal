import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { UserService } from './api/user/user.service';

import { AuthHeaderInterceptor } from './interceptors/auth-header.interceptor';
import { ApiUrlInterceptor } from './interceptors/api-url.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

import { authReducers, AuthEffects } from './store/auth-store';
import { breadcrumbsReducers } from './store/breadcrumbs-store';
import { loaderReducers } from './store/loader-store';

import { environment } from 'src/environments/environment';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forRoot({
            auth: authReducers,
            breadcrumbs: breadcrumbsReducers,
            loading: loaderReducers,
        }),
        EffectsModule.forRoot([AuthEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
          }),
    ],
    providers: [
        AuthGuard,
        AuthService,
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
