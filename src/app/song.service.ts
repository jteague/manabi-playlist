import { Injectable } from '@angular/core';
import { Song } from './song';
import { PLAYLIST } from './mock-playlist';

@Injectable({
  providedIn: 'root'
})

export class SongService {

  constructor() { 

  }

  getSongs(): Song[] {
  	return PLAYLIST;
  }

}
