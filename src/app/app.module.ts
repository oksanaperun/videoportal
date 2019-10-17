import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import {
  CoursesComponent,
  CourseListComponent,
  CourseListItemComponent,
  CourseSearchComponent
} from './courses';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { ButtonComponent } from './controls/button/button.component';
import { LogoComponent } from './logo/logo.component';
import { InputComponent } from './controls/input/input.component';
import { TimePipe } from './time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbsComponent,
    CoursesComponent,
    CourseListComponent,
    CourseListItemComponent,
    CourseSearchComponent,
    FooterComponent,
    HeaderComponent,
    NewCourseComponent,
    ButtonComponent,
    LogoComponent,
    InputComponent,
    TimePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
