import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';

import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { LanguageService } from './services/language.service';
import { UserService } from './api/user/user.service';

import { AuthHeaderInterceptor } from './interceptors/auth-header.interceptor';
import { ApiUrlInterceptor } from './interceptors/api-url.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

import { authReducers, AuthEffects } from './store/auth-store';
import { breadcrumbsReducers } from './store/breadcrumbs-store';
import { loaderReducers } from './store/loader-store';

import { environment } from 'src/environments/environment';

import { TranslationLoader } from './translation/translation-loader';

export function TranslationLoaderFactory(http: HttpClient) {
    return new TranslationLoader(http);
}

registerLocaleData(localeUk, 'uk');

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
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: TranslationLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    providers: [
        AuthGuard,
        AuthService,
        LanguageService,
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
        },
        {
            provide: LOCALE_ID,
            deps: [LanguageService],
            useFactory: (languageService) => languageService.getLanguage()
          }
    ],
    exports: []
})
export class CoreModule { }
