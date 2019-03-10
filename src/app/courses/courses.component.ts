import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Epreuve } from '../epreuve';
import { Search, DistanceFilter, TypeFilter } from '../search';
import { Ville } from '../ville';
import { EpreuveService } from '../epreuve.service';
import { VilleService } from '../ville.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
  
  // Coordonnees par defaut 
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
      min: 0,
      max: 200, 
      step: 1, 
      valueMin: 0,
      valueMax: 200,
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
    private route: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit() {
    let searchRequest = this.route.snapshot.paramMap.get('search');
    if(searchRequest){
      this.search.input = searchRequest;
      this.search.zoom = 10;
      this.getFindPosition();
    }
   
    this.getEpreuves();
  }

  /**
   * 
   * @param content Manage the modal
   */
  open(content) {
    this.modalService.open(content);
  }


  /* Management of the google map API */

  /**
   * Update the search position
   * @param changedCenter Event fire by the AGM API: Contains New Latitude et Longitude position
   */
  updateSearch(changedCenter){
    this.search.lat = changedCenter.lat;
    this.search.long = changedCenter.lng;
    console.log('updateSearch');
  }

  /**
   * Update the search Zoom
   * @param changedZoom Event fire by the AGM API: Contains New zoom info
   */
  updateZoom(changedZoom){
    this.search.zoom = changedZoom;
    console.log('updateZoom');
  }

  /** 
   * Refresh the search when AGM fire idle event
  */
  mapDragEnd() {
    this.getEpreuves();
    console.log('mapDragEnd');
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
    
    console.log('getEpreuves');
  }

  refrechSearch(): void{
    this.getEpreuves();
    console.log('refrechSearch');
  }
  
  getFindPosition(): void {
    console.log('getFindPosition');

    // position par defaut paris
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
      } else {
        console.log('Ville introuvable');
      }
    });
  }

  cleanDateFilter(): void {
    this.search.start_date = null;
    this.search.end_date = null;
    this.getEpreuves();
    console.log('cleanDateFilter');
  }

  cleanDistanceFilter(): void {
    this.search.distance.valueMax = this.search.distance.max;
    this.getEpreuves();
    console.log('cleanDistanceFilter');
  }

  cleanTypeFilter(): void {
    this.search.types.trail = false;
    this.search.types.cross = false;
    this.search.types.bikeandrun = false;
    this.search.types.route = false;
    this.getEpreuves();
    console.log('cleanTypeFilter');
  }

  getFormatName(input): String {
    console.log('getFormatName');
    let result = input.normalize('NFD').replace(/[\u0300-\u036f]/gm, "");
    result = result.replace(/\W/gm, "");
    return result.toUpperCase();
  }

  printDebug(): void {
    console.log(this.epreuves);
  }
}
