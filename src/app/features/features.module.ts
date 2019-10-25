import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CoursesModule } from './courses/courses.module';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NewCourseComponent } from './new-course/new-course.component';

const components = [
    BreadcrumbsComponent,
    FooterComponent,
    HeaderComponent,
    NewCourseComponent,
];

@NgModule({
    declarations: [...components],
    imports: [
        CommonModule,
        SharedModule,
        CoursesModule, 
    ],
    exports: [...components],
})
export class FeaturesModule { }
