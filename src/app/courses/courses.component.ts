import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../course';
import { Search } from '../search';
import { Ville } from '../ville';
import { CourseService } from '../course.service';
import { VilleService } from '../ville.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  
  //Coordonnees par defaut 
  search: Search = {
    ville: '',
	  lat: 47.738082,
	  long: 7.347932
  };
  
  ville: Ville = {
    LAT: 47.738082,
    LONG: 7.347932,
    FULL_NAME_RO: 'Mulhouse'
  };
 
  markers = [];

  courses: Course[];

  constructor(private courseService: CourseService, private villeService: VilleService) { }

  ngOnInit() {
    this.getCourses();
  }

  updateSearch(changedCenter){
    this.ville.LAT = changedCenter.lat;
    this.ville.LONG = changedCenter.lng;
  }

  mapDragEnd() {
    console.log('mapDragEnd');
    this.getCourses();
  }
  
  getCourses(): void {
    this.courseService.getCourses(this.ville).subscribe(courses => {
      this.markers = [];
      let i = 0;
      for(let tmpcourse of courses){
        this.markers[i] = {lat: tmpcourse.lat , lng: tmpcourse.long, title: tmpcourse.title};
        i++;
      }
      
      this.courses = courses
	  });
  }
  
  getVille(): void {
	  this.villeService.getVille(this.search.ville).subscribe(ville => {
      this.search.ville = ville[0].FULL_NAME_RO;
      this.search.lat = ville[0].LAT;
      this.search.long = ville[0].LONG;
      this.ville = ville[0];
      this.getCourses();
	  });
  }

}
