import { Injectable } from '@angular/core';
import { Course } from './course';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CourseService {
  
  getCourses(): Observable<Course[]>{
    
    return of([
      {
        id: 1,
        name: 'Trail de sancy',
        date: '25/01/2018',
        type: 'Trail',
        distance: '33km',
        description: 'A partir de 30€ jusqu\'au 31/12/2017',
        img: 'running1.jpg'
      },
      {
        id: 2,
        name: 'Course de Noël',
        date: '25/01/2018',
        type: 'Course',
        distance: '10km',
        description: 'A partir de 10€ jusqu\'au 31/12/2017',
        img: 'running2.jpg'
      },
      {
        id: 3,
        name: 'Course de Noël',
        date: '25/01/2018',
        type: 'Course',
        distance: '10km',
        description: 'A partir de 10€ jusqu\'au 31/12/2017',
        img: 'running1.jpg'
      },
      {
        id: 4,
        name: 'Course de Noël',
        date: '25/01/2018',
        type: 'Course',
        distance: '10km',
        description: 'A partir de 10€ jusqu\'au 31/12/2017',
        img: 'running2.jpg'
      },
      {
        id: 5,
        name: 'Course de Noël',
        date: '25/01/2018',
        type: 'Course',
        distance: '10km',
        description: 'A partir de 10€ jusqu\'au 31/12/2017',
        img: 'running1.jpg'
      },
      {
        id: 6,
        name: 'Course de Noël',
        date: '25/01/2018',
        type: 'Course',
        distance: '10km',
        description: 'A partir de 10€ jusqu\'au 31/12/2017',
        img: 'running2.jpg'
      }
    ]);
  }

  constructor() { }

}
