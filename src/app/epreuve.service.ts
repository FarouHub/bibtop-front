import { Injectable } from '@angular/core';
import { Epreuve } from './epreuve';
import { Search } from './search';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { DatePipe } from '@angular/common';

@Injectable()
export class EpreuveService {
	
  private epreuvesUrl = environment.api_url + 'epreuves';  // URL to web api
  
  getEpreuves(search: Search): Observable<Epreuve[]>{

    let params = "/search";

    if( typeof search != undefined && search != null){
      params += '?lat=' + search.lat + '&long=' + search.long + '&zoom=' + search.zoom;

      if(search.start_date != null){
        params += '&start_date=' + new DatePipe('en').transform(search.start_date, "y-MM-dd");
      }
      if(search.end_date != null){
        params += '&end_date=' + new DatePipe('en').transform(search.end_date, "y-MM-dd");
      }
      if(search.distance.value != search.distance.max){
        params += '&distance=' + search.distance.value;
      }
      if(search.types.bikeandrun){
        params += '&bikeandrun=BikeAndRun';
      }
      if(search.types.cross){
        params += '&cross=Cross';
      }
      if(search.types.route){
        params += '&route=Route';
      }
      if(search.types.trail){
        params += '&trail=Trail';
      }
    }

    return this.http.get<Epreuve[]>(this.epreuvesUrl + params )
  }
  
  getEpreuve(id): Observable<Epreuve>{
    return this.http.get<Epreuve>(this.epreuvesUrl + '/' + id)
  }

  constructor( private http: HttpClient ) { }

}
