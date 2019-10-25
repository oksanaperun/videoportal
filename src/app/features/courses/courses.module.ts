import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { CoursesComponent } from './courses.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { CourseSearchComponent } from './course-search/course-search.component';

@NgModule({
    declarations: [
        CoursesComponent,
        CourseListComponent,
        CourseListItemComponent,
        CourseSearchComponent,
    ],
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
    ],
    exports: [
        CoursesComponent,
    ]
})
export class CoursesModule { }
