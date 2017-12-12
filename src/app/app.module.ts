import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { AppRoutingModule } from './/app-routing.module';

import { CourseService } from './course.service';


@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA6REJYcsSxFC67wsYjO_1aKbfxDGcKKCk'
    })
  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
