import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';

import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { DeleteCourseModalComponent } from './delete-course-modal/delete-course-modal.component';

import { CourseService } from 'src/app/core/api/courses/course.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AuthorService } from 'src/app/core/api/author/author.service';

import { coursesReducers, CoursesEffects } from 'src/app/core/store/courses-store';

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
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        SharedModule,
        CoursesRoutingModule,
        StoreModule.forFeature('courses', coursesReducers),
        EffectsModule.forFeature([CoursesEffects]),
    ],
    providers: [
        CourseService,
        DialogService,
        AuthorService,
    ],
    entryComponents: [DeleteCourseModalComponent]
})
export class CoursesModule { }
