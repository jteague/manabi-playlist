import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Gig } from '../../objects/gig'
import { Song } from '../../objects/song';
import { GigSong } from '../../objects/gig-song';
import { SongService } from '../../services/song/song.service';

@Component({
  selector: 'app-gig-create',
  templateUrl: './gig-create.component.html',
  styleUrls: ['./gig-create.component.css']
})
export class GigCreateComponent implements OnInit {

  @Input() gig: Gig;
  gigSongs : GigSong[];

  constructor(private songService: SongService) {
    this.gig = new Gig(-1, '', '');
    this.gigSongs = [];
  }

  ngOnInit() {

  }

  removeGigSong() : void {

  }

  saveGig() : void {

  }

}
