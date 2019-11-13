import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { NewCourseRoutingModule } from './new-course-routing.module';

import { NewCourseComponent } from './new-course.component';


@NgModule({
    declarations: [NewCourseComponent],
    imports: [
        CommonModule,
        SharedModule,
        NewCourseRoutingModule,
    ]
})
export class NewCourseModule { }
