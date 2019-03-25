import { Component, OnInit } from '@angular/core';
import { Gig } from '../../objects/gig';
import { GigService } from '../../services/gigservice/gig.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  gigs: Gig[] = [];

  constructor(private gigService: GigService) { }

  ngOnInit() {
	 this.getGigs();
  }

  getGigs() : void {
  	this.gigService.getGigs().subscribe(gigs => this.gigs = gigs.slice(0, 3));
  }

}
