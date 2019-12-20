import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { ButtonComponent } from './controls/button/button.component';
import { InputComponent } from './controls/input/input.component';
import { IntegerInputComponent } from './controls/integer-input/integer-input.component';
import { LogoComponent } from './controls/logo/logo.component';
import { SearchComponent } from './controls/search/search.component';
import { TextareaComponent } from './controls/textarea/textarea.component';

import { CreationDateBorderDirective } from './directives/creation-date-border.directive';

import { FilterByTitlePipe } from './pipes/filter-by-title.pipe';
import { OrderByCreationDatePipe } from './pipes/order-by-creation-date.pipe';
import { TimeInMinutesPipe } from './pipes/time-in-minutes.pipe';

const items = [
    BreadcrumbsComponent,
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    PageNotFoundComponent,
    ButtonComponent,
    InputComponent,
    IntegerInputComponent,
    LogoComponent,
    SearchComponent,
    TextareaComponent,
    CreationDateBorderDirective,
    FilterByTitlePipe,
    OrderByCreationDatePipe,
    TimeInMinutesPipe,
];

@NgModule({
    declarations: [...items],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
    ],
    providers: [
        {
            provide: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,
            useValue: {
                _forceAnimations: true
            }
        }
    ],
    exports: [...items],
})
export class SharedModule { }
