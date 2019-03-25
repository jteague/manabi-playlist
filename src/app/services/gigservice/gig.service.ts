import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../message/message.service';
import { Gig } from '../../objects/gig';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class GigService {

  private gigsUrl : string = 'api/gigs'; // URL to the web api

  constructor(
  	private http: HttpClient,
  	private messageService: MessageService) { }

  getGigs(): Observable<Gig[]> {
  	// get gigs from the server
  	return this.http.get<Gig[]>(this.gigsUrl)
      .pipe(
        tap(_ => this.log('fetched gigs')),
        catchError(this.handleError<Gig[]>('getGigs', [])));
  }

  /** GET gig by id. Return `undefined` when id not found */
  getGigNo404<Data>(id: number): Observable<Gig> {
    const url = `${this.gigsUrl}/?id=${id}`;
    return this.http.get<Gig[]>(url)
      .pipe(
        map(gigs => gigs[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} gig id=${id}`);
        }),
        catchError(this.handleError<Gig>(`getGig id=${id}`))
      );
  }

  getGig(id: number): Observable<Gig> {
  	const url = `${this.gigsUrl}/${id}`;
  	return this.http.get<Gig>(url).pipe(
      tap(_ => this.log(`fetched gig id=${id}`)),
      catchError(this.handleError<Gig>(`getGig id=${id}`))
    )
  }

  updateGig (gig: Gig): Observable<any> {
    return this.http.put(this.gigsUrl, gig, httpOptions).pipe(
      tap(_ => this.log(`updated gig id=${gig.id}`)),
      catchError(this.handleError<any>('updateGig'))
    );
  }

  searchGigs(term: string) : Observable<Gig[]> {
    if(!term.trim()) {
      return of([]);
    }

    return this.http.get<Gig[]>(`${this.gigsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found gigs matching "${term}"`)),
      catchError(this.handleError<Gig[]>('searchGigs', []))
    );
  }

  private log(message: string) : void {
    this.messageService.add(`GigService: ${message}`);
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
