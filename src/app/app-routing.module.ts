import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'courses/search/:search', component: CoursesComponent },
  { path: 'courses', component: CoursesComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
