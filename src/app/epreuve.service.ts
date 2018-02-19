import { Injectable } from '@angular/core';
import { Epreuve } from './epreuve';
import { Search } from './search';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class EpreuveService {
	
  private epreuvesUrl = environment.api_url + 'epreuves';  // URL to web api
  
  getEpreuves(search: Search): Observable<Epreuve[]>{

    let params = "/search";

    if( typeof search != undefined && search != null){
      params += '?lat=' + search.lat + '&long=' + search.long + '&zoom=' + search.zoom;
    }

    return this.http.get<Epreuve[]>(this.epreuvesUrl + params )
  }
  
  getEpreuve(id): Observable<Epreuve>{
    return this.http.get<Epreuve>(this.epreuvesUrl + '/' + id)
  }

  constructor( private http: HttpClient ) { }

}
