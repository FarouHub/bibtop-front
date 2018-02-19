import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { AppRoutingModule } from './/app-routing.module';

import { CourseService } from './course.service';
import { VilleService } from './ville.service';
import { EpreuveService } from './epreuve.service';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseDetailComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
	HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA6REJYcsSxFC67wsYjO_1aKbfxDGcKKCk'
    })
  ],
  providers: [CourseService, VilleService, EpreuveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
