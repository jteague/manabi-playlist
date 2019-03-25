import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SongService } from '../../services/songservice/song.service';
import { GigService } from '../../services/gigservice/gig.service';
import { Song } from '../../objects/song';
import { Gig } from '../../objects/gig';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})

export class PlaylistComponent implements OnInit {

  @Input() gig: Gig;
  songs: Song[];

  constructor(
  	private route: ActivatedRoute,
  	private songService: SongService,
    private gigService: GigService,
  	private location: Location
  	) { }

  ngOnInit() {
	 this.getSongs();
  }

  getSongs() : void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.gigService.getGig(id).subscribe(g => this.gig = g);
  	this.songService.getSongs(id).subscribe(s => this.songs = s);
  }

}
