import { Component, OnInit } from '@angular/core';
import { Gig } from '../../objects/gig';
import { GigService } from '../../services/gig/gig.service';
import { UtilitiesService } from '../../services/utilities/utilities.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  gigs: Gig[] = [];
  userGuid: string;

  constructor(private gigService: GigService, private utilities: UtilitiesService) { }

  ngOnInit() {
	 this.getGigs();
   this.userGuid = this.utilities.getUserGuid();
  }

  getGigs() : void {
  	this.gigService.getGigs().subscribe(gigs => this.gigs = gigs);
  }

}
