import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
	
  course: Course;

  constructor(
    private courseService: CourseService, 
	private route: ActivatedRoute,
	private location: Location) { }

  ngOnInit() {
	  this.getCourse();
  }
  
  getCourse(): void {
    const id = this.route.snapshot.paramMap.get('id');
	console.log('id:' + id);
    this.courseService.getCourse(id).subscribe(course => this.course = course);
  }

}
