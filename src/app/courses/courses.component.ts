import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  lat: number = 47.738082;
  lng: number = 7.347932;

  courses: Course[];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.getCourses();
  }
  
  getCourses(): void {
    this.courseService.getCourses().subscribe(courses => this.courses = courses);
  }

}
