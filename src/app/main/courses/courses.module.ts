import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';

import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';

import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { DeleteCourseModalComponent } from './delete-course-modal/delete-course-modal.component';

import { CourseService } from 'src/app/core/api/courses/course.service';
import { DialogService } from 'src/app/core/services/dialog.service';

@NgModule({
    declarations: [
        CoursesComponent,
        CourseComponent,
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
    providers: [
        CourseService,
        DialogService,
    ],
    entryComponents: [DeleteCourseModalComponent]
})
export class CoursesModule { }
