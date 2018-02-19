import { Component, OnInit } from '@angular/core';
import { Epreuve } from '../epreuve';
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

  constructor(
    private epreuveService: EpreuveService, 
	  private route: ActivatedRoute,
	  private location: Location) { }

  ngOnInit() {
	  this.getEpreuve();
  }

  getEpreuve(): void {
    const id = this.route.snapshot.paramMap.get('id');
	//console.log('id:' + id);
    this.epreuveService.getEpreuve(id).subscribe(epreuve => this.epreuve = epreuve);
  }

}
