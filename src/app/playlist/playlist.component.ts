import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../song.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})

export class PlaylistComponent implements OnInit {

  songs: Song[];

  constructor(private songService: SongService) { }

  ngOnInit() {
	 this.getSongs();
  }

  getSongs() : void {
    this.songService.getSongs().subscribe(songs => this.songs = songs);
  }

}
