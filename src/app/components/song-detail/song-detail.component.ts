import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UtilitiesService } from '../../services/utilities/utilities.service';
import { SongNotesService } from '../../services/song-notes/song-notes.service';
import { Song } from '../../objects/song';
import { Gig } from '../../objects/gig'
import { SongNote } from '../../objects/song-note';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})

export class SongDetailComponent implements OnInit {

  @Input() songNote: SongNote;
  userGuid: string;

  constructor(
  	private route: ActivatedRoute,
  	private songNotesService: SongNotesService,
  	private location: Location,
    private utilities: UtilitiesService
  	) { }

  ngOnInit() {
    this.userGuid = this.utilities.getUserGuid();
  	this.getSong();
  }

  getSong(): void {
  	const songNoteId = +this.route.snapshot.paramMap.get('id');
  	this.songNotesService.getSongNote(songNoteId, this.userGuid).subscribe(sn => this.songNote = sn);
  }

  goBack(): void {
  	this.location.back();
  }

  save() : void {
    this.songNotesService.updateSong(this.songNote, this.userGuid).subscribe(() => this.goBack());
  }
}
