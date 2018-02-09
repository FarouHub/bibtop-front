import { Injectable } from '@angular/core';
import { Ville } from './ville';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class VilleService {

  private villesUrl = 'http://localhost:3000/villes';  // URL to web api
  
  getVille(name): Observable<Ville>{
    return this.http.get<Ville>(this.villesUrl + '/' + name)
  }

  constructor( private http: HttpClient ) { }

}
