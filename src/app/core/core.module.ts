import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreationDateBorderDirective } from './directives/creation-date-border.directive';
import { FilterByTitlePipe } from './pipes/filter-by-title.pipe';
import { OrderByCreationDatePipe } from './pipes/order-by-creation-date.pipe';
import { TimePipe } from './pipes/time.pipe';

const items = [
    CreationDateBorderDirective,
    FilterByTitlePipe,
    OrderByCreationDatePipe,
    TimePipe,
];

@NgModule({
    declarations: [...items],
    imports: [CommonModule],
    exports: [...items]
})
export class CoreModule { }
