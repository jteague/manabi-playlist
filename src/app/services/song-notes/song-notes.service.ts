import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { MessageService } from '../message/message.service';
import { Gig } from '../../objects/gig';
import { Song } from '../../objects/song';
import { SongNote } from '../../objects/song-note';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class SongNotesService {

  private songNotesUrl : string = `${environment.apiUrl}songNotes.php`; // URL to the web api

  constructor(
  	private http: HttpClient,
  	private messageService: MessageService) { }

    getSongNotes(gigId: number, user: string): Observable<SongNote[]> {
      console.log(`we're in SongNotesService.getSongNotes(gigId: ${gigId}, user: ${user})`);
      const url = `${this.songNotesUrl}?operation=get&gig_id=${gigId}&user_uid=${user}`;
      return this.http.get<SongNote[]>(url).pipe(
          tap(_ => this.log(`fetched songNotes count: ${[].length}`)),
          catchError(this.handleError<SongNote[]>('getSongNotes', [])));
    }

    getSongNote(id: number, user: string): Observable<SongNote> {
      const url = `${this.songNotesUrl}?operation=get&id=${id}&user_uid=${user}`;
    	return this.http.get<SongNote>(url).pipe(
        tap(_ => this.log(`fetched songNote id=${id}`)),
        catchError(this.handleError<SongNote>(`getSongNote id=${id}`))
      )
    }

    updateSong(songNote: SongNote, user: string) {
      if(songNote.user != user) {
        console.log('Your user id does not match this song_note\'s user id');
      }

      //console.log(`Updating song_note with id = ${songNote.id}::${JSON.stringify(songNote)}`);

      const url = `${this.songNotesUrl}`;
      return this.http.post(url, JSON.stringify(songNote), httpOptions).pipe(
        tap(_ => this.log(`updated songNote id=${songNote.id}`)),
        catchError(this.handleError<any>('updateSongNote'))
      );
    }

    private log(message: string) : void {
      console.log(`SongNoteService: ${message}`);
    }

    private handleError<T> (opertaion = 'operation', result? : T) {
      return (error: any): Observable<T> => {
        // todo: send the error to the remote logging infrastructure
        console.error(error); // log to local console

        // todo: better job of transforming error for the user
        //this.log('${operation} failed: ${error.message}');

        // let the app keep running with 'bad' data
        return of(result as T);
      }
    }
}
