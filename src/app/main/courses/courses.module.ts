import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';

import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';

import { CoursesComponent } from './courses.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { DeleteCourseModalComponent } from './delete-course-modal/delete-course-modal.component';


@NgModule({
    declarations: [
        CoursesComponent,
        CourseListComponent,
        CourseListItemComponent,
        DeleteCourseModalComponent,
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        SharedModule,
        CoursesRoutingModule,
    ],
    entryComponents: [DeleteCourseModalComponent]
})
export class CoursesModule { }
