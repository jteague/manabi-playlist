import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Song } from './song';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class SongService {

  private songsUrl : string = 'api/songs'; // URL to the web api

  constructor(
  	private http: HttpClient,
  	private messageService: MessageService) { }

  getSongs(): Observable<Song[]> {
  	// get songs from the server
  	return this.http.get<Song[]>(this.songsUrl)
      .pipe(
        tap(_ => this.log('fetched songs')),
        catchError(this.handleError<Song[]>('getSongs', [])));
  }

  /** GET song by id. Return `undefined` when id not found */
  getSongNo404<Data>(id: number): Observable<Song> {
    const url = `${this.songsUrl}/?id=${id}`;
    return this.http.get<Song[]>(url)
      .pipe(
        map(songs => songs[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} song id=${id}`);
        }),
        catchError(this.handleError<Song>(`getSong id=${id}`))
      );
  }

  getSong(id: number): Observable<Song> {
  	const url = `${this.songsUrl}/${id}`;
  	return this.http.get<Song>(url).pipe(
      tap(_ => this.log(`fetched song id=${id}`)),
      catchError(this.handleError<Song>(`getSong id=${id}`))
    )
  }

  updateSong (song: Song): Observable<any> {
    return this.http.put(this.songsUrl, song, httpOptions).pipe(
      tap(_ => this.log(`updated song id=${song.id}`)),
      catchError(this.handleError<any>('updateSong'))
    );
  }

  searchSongs(term: string) : Observable<Song[]> {
    if(!term.trim()) {
      return of([]);
    }

    return this.http.get<Song[]>(`${this.songsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found songs matching "${term}"`)),
      catchError(this.handleError<Song[]>('searchSongs', []))
    );
  }

  private log(message: string) : void {
    this.messageService.add(`SongService: ${message}`);
  }

  private handleError<T> (opertaion = 'operation', result? : T) {
    return (error: any): Observable<T> => {
      // todo: send the error to the remote logging infrastructure
      console.error(error); // log to local console

      // todo: better job of transforming error for the user
      this.log('${operation} failed: ${error.message}');

      // let the app keep running with 'bad' data
      return of(result as T);
    }
  }

}
