import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Song } from '../../objects/song';
import { Gig } from '../../objects/gig';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {

	createDb() {
		const songs = [
			{ id: 0, gig_id: 0, name: "Sway", notes: "" },
			{ id: 1, gig_id: 0, name: "Como abeja al panal", notes: "" },
			{ id: 2, gig_id: 0, name: "Cali pachanguero", notes: "" },
			{ id: 3, gig_id: 0, name: "Lloraras", notes: "" },
			{ id: 4, gig_id: 0, name: "Rebelión", notes: "" },
			{ id: 5, gig_id: 1, name: "Las caleñas son como las flores", notes: "" },
			{ id: 6, gig_id: 1, name: "Si me dejas no vale", notes: "" },
			{ id: 7, gig_id: 1, name: "Lo que va a pasar", notes: "" },
			{ id: 8, gig_id: 1, name: "Hello", notes: "" },
			{ id: 9, gig_id: 1, name: "Cumbia sobre el mar ", notes: "" },
			{ id: 10, gig_id: 1, name: "La vida es un carnaval ", notes: "" },
			{ id: 11, gig_id: 1, name: "Casi un hechizo", notes: "" },
			{ id: 12, gig_id: 2, name: "Tu cariñito", notes: "" },
			{ id: 13, gig_id: 2, name: "El preso ", notes: "" },
			{ id: 14, gig_id: 2, name: "La agarro bajando ", notes: "" },
			{ id: 15, gig_id: 2, name: "Tu eres ajena ", notes: "" },
			{ id: 16, gig_id: 2, name: "Anacaona", notes: "" },
			{ id: 17, gig_id: 2, name: "Quimbara", notes: "" },
			{ id: 18, gig_id: 2, name: "Vivir mi vida", notes: "" },
		];

    const gigs = [
      {id: 0, date: "2019-3-25", venue: "Avo's"},
      {id: 1, date: "2019-4-15", venue: "Rio Grande"},
      {id: 2, date: "2019-5-05", venue: "Washington's"},
    ];

		return {songs, gigs};
	}

	genId(songs: Song[]) : number {
		return songs.length > 0 ? Math.max(...songs.map(song => song.id)) + 1 : 0;
	}

  // genId(gigs: Gig[]) : number {
	// 	return gigs.length > 0 ? Math.max(...gigs.map(gig  => gig.id)) + 1 : 0;
	// }
}
