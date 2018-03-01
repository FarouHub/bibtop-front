import { Component, OnInit } from '@angular/core';
import { Epreuve } from '../epreuve';
import { Search } from '../search';
import { EpreuveService } from '../epreuve.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
	
  epreuve: Epreuve;
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

  constructor(
    private epreuveService: EpreuveService, 
	  private route: ActivatedRoute,
	  private location: Location) { }

  ngOnInit() {
    let searchRequest = this.route.snapshot.paramMap.get('search');
    if(searchRequest){
      this.search.input = searchRequest;
    }
	  this.getEpreuve();
  }

  getEpreuve(): void {
    const id = this.route.snapshot.paramMap.get('id');
	//console.log('id:' + id);
    this.epreuveService.getEpreuve(id).subscribe(epreuve => this.epreuve = epreuve);
  }
}
