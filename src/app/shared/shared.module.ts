import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { ButtonComponent } from './controls/button/button.component';
import { DatepickerComponent } from './controls/datepicker/datepicker.component';
import { FormControlErrorComponent } from './controls/form-control-error/form-control-error.component';
import { InputComponent } from './controls/input/input.component';
import { IntegerInputComponent } from './controls/integer-input/integer-input.component';
import { LogoComponent } from './controls/logo/logo.component';
import { MultiSelectDropdownComponent } from './controls/multi-select-dropdown/multi-select-dropdown.component';
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
    DatepickerComponent,
    FormControlErrorComponent,
    InputComponent,
    IntegerInputComponent,
    LogoComponent,
    MultiSelectDropdownComponent,
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
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        MatSelectModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,
            useValue: {
                _forceAnimations: true
            }
        }
    ],
    exports: [
        ...items,
        TranslateModule,
    ],
})
export class SharedModule { }
