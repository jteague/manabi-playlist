import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Song } from '../song';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.css']
})

export class SongSearchComponent implements OnInit {

  songs$: Observable<Song[]>;
  private searchTerms = new Subject<string>();

  constructor(private songService: SongService) { }

  ngOnInit() {
    this.songs$ = this.searchTerms.pipe(
      debounceTime(300), // wait 300ms before considering the search term
      distinctUntilChanged(), // ignore if same as the old search searchTerms
      switchMap((term: string) => this.songService.searchSongs(term)), // switch to the new search term's observables
    );
  }

  search(term: string) : void {
    this.searchTerms.next(term);
  }

}
