import { Injectable } from '@angular/core';
import { Course } from './course';
import { Ville } from './ville';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class CourseService {
	
  private coursesUrl = environment.api_url + 'courses';  // URL to web api
  
  getCourses(ville: Ville): Observable<Course[]>{

    let params = "/search";

    if(ville){
      params += '?lat=' + ville.LAT + '&long=' + ville.LONG;
    }

    return this.http.get<Course[]>(this.coursesUrl + params )
  }
  
  getCourse(id): Observable<Course>{
    return this.http.get<Course>(this.coursesUrl + '/' + id)
  }

  constructor( private http: HttpClient ) { }

}
