import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './containers/footer/footer.component';
import { HeaderComponent } from './containers/header/header.component';

import { ButtonComponent } from './controls/button/button.component';
import { InputComponent } from './controls/input/input.component';
import { LogoComponent } from './controls/logo/logo.component';
import { SearchComponent } from './controls/search/search.component';

import { CreationDateBorderDirective } from './directives/creation-date-border.directive';

import { FilterByTitlePipe } from './pipes/filter-by-title.pipe';
import { OrderByCreationDatePipe } from './pipes/order-by-creation-date.pipe';
import { TimeInMinutesPipe } from './pipes/time-in-minutes.pipe';

const items = [
    FooterComponent,
    HeaderComponent,
    ButtonComponent,
    InputComponent,
    LogoComponent,
    SearchComponent,
    CreationDateBorderDirective,
    FilterByTitlePipe,
    OrderByCreationDatePipe,
    TimeInMinutesPipe,
];

@NgModule({
    declarations: [...items],
    imports: [CommonModule],
    exports: [...items],
})
export class SharedModule { }
