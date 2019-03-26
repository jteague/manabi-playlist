import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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

  // http://jeremiahteague.com/manabiplaylistserver
  private songNotesUrl : string = 'api/songNotes'; // URL to the web api

  constructor(
  	private http: HttpClient,
  	private messageService: MessageService) { }

    getSongNotes(gigId: number, user: string): Observable<SongNote[]> {
      console.log(`we're in SongNotesService.getSongNotes(gigId: ${gigId}, user: ${user})`);
      const url = `${this.songNotesUrl}/?id=${gigId}`; // TODO: add the user guid string to the search
      return this.http.get<SongNote[]>(url).pipe(
          tap(_ => this.log(`fetched songNotes count: ${[].length}`)),
          catchError(this.handleError<SongNote[]>('getSongNotes', [])));
    }

    getSongNote(id: number): Observable<SongNote> {
      const url = `${this.songNotesUrl}/?id=${id}`;
    	return this.http.get<SongNote>(url).pipe(
        tap(_ => this.log(`fetched songNote id=${id}`)),
        catchError(this.handleError<SongNote>(`getSongNote id=${id}`))
      )
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
