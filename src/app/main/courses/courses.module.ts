import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';

import { CoursesComponent } from './courses.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';


@NgModule({
    declarations: [
        CoursesComponent,
        CourseListComponent,
        CourseListItemComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        CoursesRoutingModule,
    ]
})
export class CoursesModule { }
