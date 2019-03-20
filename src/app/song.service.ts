import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Song } from './song';
import { PLAYLIST } from './mock-playlist';

@Injectable({
  providedIn: 'root'
})

export class SongService {

  constructor(private messageService: MessageService) { 

  }

  getSongs(): Observable<Song[]> {
  	// TODO: send the message _after_ fetching the songs
  	this.messageService.add('SongService: fetched songs')
  	return of(PLAYLIST);
  }

}
