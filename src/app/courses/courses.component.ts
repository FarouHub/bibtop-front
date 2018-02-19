import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Epreuve } from '../epreuve';
import { Search } from '../search';
import { Ville } from '../ville';
import { EpreuveService } from '../epreuve.service';
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
	  lat: 48.866,
    long: 2.333,
    zoom: 6
  };

  markers = [];

  epreuves: Epreuve[];

  constructor(
    private epreuveService: EpreuveService, 
    private villeService: VilleService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let searchRequest = this.route.snapshot.paramMap.get('search');
    if(searchRequest){
      this.search.ville = searchRequest;
      this.search.zoom = 10;
      this.getFindPosition();
    }
   
    this.getEpreuves();
  }

  updateSearch(changedCenter){
    this.search.lat = changedCenter.lat;
    this.search.long = changedCenter.lng;
  }

  updateZoom(changedZoom){
    this.search.zoom = changedZoom;
  }

  mapDragEnd() {
    //console.log('mapDragEnd');
    this.getEpreuves();
  }
  
  getEpreuves(): void {
    this.epreuveService.getEpreuves(this.search).subscribe(epreuves => {
      this.markers = [];
      let i = 0;
      for(let tmpEpreuve of epreuves){
        this.markers[i] = {lat: tmpEpreuve.lat , lng: tmpEpreuve.long, title: tmpEpreuve.title};
        i++;
      }
      
      this.epreuves = epreuves;
	  });
  }
  
  getFindPosition(): void {
	  this.villeService.getVille(this.search.ville).subscribe(ville => {
      this.search.ville = ville[0].FULL_NAME_RO;
      this.search.lat = ville[0].LAT;
      this.search.long = ville[0].LONG;
      this.search.zoom = 10;
      this.getEpreuves();
	  });
  }

}
