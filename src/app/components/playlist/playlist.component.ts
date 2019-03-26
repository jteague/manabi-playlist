import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SongNotesService } from '../../services/song-notes/song-notes.service';
import { SongNote } from '../../objects/song-note';
import { Song } from '../../objects/song';
import { Gig } from '../../objects/gig';
import { UtilitiesService } from '../../services/utilities/utilities.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})

export class PlaylistComponent implements OnInit {

  @Input() gig: Gig;
  songNotes: SongNote[];
  userGuid: string;
  gigDb: Gig;

  constructor(
  	private route: ActivatedRoute,
  	private songNotesService: SongNotesService,
  	private location: Location,
    private utilities: UtilitiesService
  	) { }

  ngOnInit() {
    this.userGuid = this.utilities.getUserGuid();
    this.getSongs();
  }

  getSongs() : void {
    const gigid = +this.route.snapshot.paramMap.get('id');
    this.songNotesService.getSongNotes(gigid, this.userGuid).subscribe(sn => {
      this.songNotes = sn;
      this.gig = sn[0].gig;
    });
  }

}
