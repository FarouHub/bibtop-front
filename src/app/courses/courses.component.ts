import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { Epreuve } from '../epreuve';
import { Search, DistanceFilter, TypeFilter } from '../search';
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
    input: '',
    types: {
      trail: false,
      cross: false,
      route: false,
      bikeandrun: false
    },
    start_date: null,
    end_date: null,
    start_price: null,
    end_price: null,
    distance: {
      min: 1,
      max: 50, 
      step: 1, 
      value: 50,
      start_distance: 0,
      end_distance: null
    },
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
      this.search.input = searchRequest;
      this.search.zoom = 10;
      this.getFindPosition();
    }
   
    this.getEpreuves();
  }

  /* Management of the google map API */

  /**
   * Update the search position
   * @param changedCenter Event fire by the AGM API: Contains New Latitude et Longitude position
   */
  updateSearch(changedCenter){
    this.search.lat = changedCenter.lat;
    this.search.long = changedCenter.lng;
  }

  /**
   * Update the search Zoom
   * @param changedZoom Event fire by the AGM API: Contains New zoom info
   */
  updateZoom(changedZoom){
    this.search.zoom = changedZoom;
  }

  /** 
   * Refresh the search when AGM fire idle event
  */
  mapDragEnd() {
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

  refrechSearch(): void{
    this.getEpreuves();
  }
  
  getFindPosition(): void {
    if(this.search.input == ''){
      this.search.lat = 48.866;
      this.search.long = 2.333;
      this.search.zoom = 6;
    }

    this.villeService.getVille(this.getFormatName(this.search.input)).subscribe( (ville) => {
      if(typeof ville[0] != 'undefined'){
        this.search.input = ville[0].FULL_NAME_RO;
        this.search.lat = ville[0].LAT;
        this.search.long = ville[0].LONG;
        this.search.zoom = 10;
        this.getEpreuves();
      }

    });
  }

  cleanDateFilter(): void {
    this.search.start_date = null;
    this.search.end_date = null;
    this.getEpreuves();
  }

  cleanDistanceFilter(): void {
    this.search.distance.value = this.search.distance.max;
    this.getEpreuves();
  }

  cleanTypeFilter(): void {
    this.search.types.trail = false;
    this.search.types.cross = false;
    this.search.types.bikeandrun = false;
    this.search.types.route = false;
    this.getEpreuves();
  }

  getFormatName(input): String {
    let result = input.normalize('NFD').replace(/[\u0300-\u036f]/gm, "");
    result = result.replace(/\W/gm, "");
    return result.toUpperCase();
  }
}
