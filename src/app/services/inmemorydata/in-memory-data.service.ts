import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Song } from '../../objects/song';
import { Gig } from '../../objects/gig';
import { SongNote } from '../../objects/song-note';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {

	createDb() {
		const songs = [
      { id: 0, name: "Sway", artist: "" },
			{ id: 1, name: "Como abeja al panal", artist: "" },
			{ id: 2, name: "Cali pachanguero", artist: "" },
			{ id: 3, name: "Lloraras", artist: "" },
			{ id: 4, name: "Rebelión", artist: "" },
			{ id: 5, name: "Las caleñas son como las flores", artist: "" },
			{ id: 6, name: "Si me dejas no vale", artist: "" },
			{ id: 7, name: "Lo que va a pasar", artist: "" },
			{ id: 8, name: "Hello", artist: "" },
			{ id: 9, name: "Cumbia sobre el mar ", artist: "" },
			{ id: 10, name: "La vida es un carnaval ", artist: "" },
			{ id: 11, name: "Casi un hechizo", artist: "" },
			{ id: 12, name: "Tu cariñito", artist: "" },
			{ id: 13, name: "El preso ", artist: "" },
			{ id: 14, name: "La agarro bajando ", artist: "" },
			{ id: 15, name: "Tu eres ajena ", artist: "" },
			{ id: 16, name: "Anacaona", artist: "" },
			{ id: 17, name: "Quimbara", artist: "" },
			{ id: 18, name: "Vivir mi vida", artist: "" },
		];

    const gigs = [
      {id: 0, date: "2019-3-25", venue: "Avo's"},
      {id: 1, date: "2019-4-15", venue: "Rio Grande"},
      {id: 2, date: "2019-5-05", venue: "Washington's"},
    ];

    const myUser = "05010064646602010010166001440256024"; // temp for now
    const songNotes = [
      {id: 0, user: myUser, gig: { id: 0, date: "2019-3-25", venue: "Avo's"}, song: { id: 0, name: "Sway", artist: "" }},
      {id: 1, user: myUser, gig: { id: 0, date: "2019-3-25", venue: "Avo's"}, song: { id: 1, name: "Como abeja al panal", artist: "" }},
      {id: 2, user: myUser, gig: { id: 0, date: "2019-3-25", venue: "Avo's"}, song: { id: 2, name: "Cali pachanguero", artist: "" }},
      {id: 3, user: myUser, gig: { id: 0, date: "2019-3-25", venue: "Avo's"}, song: { id: 3, name: "Lloraras", artist: "" }},
      {id: 4, user: myUser, gig: { id: 0, date: "2019-3-25", venue: "Avo's"}, song: { id: 4, name: "Rebelión", artist: "" }},
      {id: 5, user: myUser, gig: { id: 0, date: "2019-3-25", venue: "Avo's"}, song: { id: 5, name: "Las caleñas son como las flores", artist: "" }},
      {id: 6, user: myUser, gig: { id: 0, date: "2019-3-25", venue: "Avo's"}, song: { id: 6, name: "Si me dejas no vale", artist: "" }},
      {id: 7, user: myUser, gig: { id: 0, date: "2019-3-25", venue: "Avo's"}, song: { id: 7, name: "Lo que va a pasar", artist: "" }},
      {id: 8, user: myUser, gig: { id: 0, date: "2019-3-25", venue: "Avo's"}, song: { id: 8, name: "Hello", artist: "" }},
      {id: 9, user: myUser, gig: { id: 0, date: "2019-3-25", venue: "Avo's"}, song: { id: 9, name: "Cumbia sobre el mar ", artist: "" }},

      {id: 10, user: myUser, gig: { id: 1, date: "2019-4-15", venue: "Rio Grande"}, song: { id: 10, name: "La vida es un carnaval ", artist: "" }},
      {id: 11, user: myUser, gig: { id: 1, date: "2019-4-15", venue: "Rio Grande"}, song: { id: 11, name: "Casi un hechizo", artist: "" }},
      {id: 12, user: myUser, gig: { id: 1, date: "2019-4-15", venue: "Rio Grande"}, song: { id: 12, name: "Tu cariñito", artist: "" }},
      {id: 13, user: myUser, gig: { id: 1, date: "2019-4-15", venue: "Rio Grande"}, song: { id: 13, name: "El preso ", artist: "" }},
      {id: 14, user: myUser, gig: { id: 1, date: "2019-4-15", venue: "Rio Grande"}, song: { id: 14, name: "La agarro bajando ", artist: "" }},
      {id: 15, user: myUser, gig: { id: 1, date: "2019-4-15", venue: "Rio Grande"}, song: { id: 15, name: "Tu eres ajena ", artist: "" }},
      {id: 16, user: myUser, gig: { id: 1, date: "2019-4-15", venue: "Rio Grande"}, song: { id: 16, name: "Anacaona", artist: "" }},
      {id: 17, user: myUser, gig: { id: 1, date: "2019-4-15", venue: "Rio Grande"}, song: { id: 17, name: "Quimbara", artist: "" }},
      {id: 18, user: myUser, gig: { id: 1, date: "2019-4-15", venue: "Rio Grande"}, song: { id: 0, name: "Sway", artist: "" }},
      {id: 19, user: myUser, gig: { id: 1, date: "2019-4-15", venue: "Rio Grande"}, song: { id: 1, name: "Como abeja al panal", artist: "" }},

      {id: 20, user: myUser, gig: { id: 2, date: "2019-5-05", venue: "Washington's"}, song: { id: 2, name: "Cali pachanguero", artist: "" }},
      {id: 21, user: myUser, gig: { id: 2, date: "2019-5-05", venue: "Washington's"}, song: { id: 3, name: "Lloraras", artist: "" }},
      {id: 22, user: myUser, gig: { id: 2, date: "2019-5-05", venue: "Washington's"}, song: { id: 4, name: "Rebelión", artist: "" }},
      {id: 23, user: myUser, gig: { id: 2, date: "2019-5-05", venue: "Washington's"}, song: { id: 5, name: "Las caleñas son como las flores", artist: "" }},
      {id: 24, user: myUser, gig: { id: 2, date: "2019-5-05", venue: "Washington's"}, song: { id: 6, name: "Si me dejas no vale", artist: "" }},
      {id: 25, user: myUser, gig: { id: 2, date: "2019-5-05", venue: "Washington's"}, song: { id: 7, name: "Lo que va a pasar", artist: "" }},
      {id: 26, user: myUser, gig: { id: 2, date: "2019-5-05", venue: "Washington's"}, song: { id: 8, name: "Hello", artist: "" }},
      {id: 27, user: myUser, gig: { id: 2, date: "2019-5-05", venue: "Washington's"}, song: { id: 9, name: "Cumbia sobre el mar ", artist: "" }},
      {id: 28, user: myUser, gig: { id: 2, date: "2019-5-05", venue: "Washington's"}, song: { id: 10, name: "La vida es un carnaval ", artist: "" }},
      {id: 29, user: myUser, gig: { id: 2, date: "2019-5-05", venue: "Washington's"}, song: { id: 11, name: "Casi un hechizo", artist: "" }},

    ];

		return {songs, gigs, songNotes};
	}

	genId(songs: Song[]) : number {
		return songs.length > 0 ? Math.max(...songs.map(song => song.id)) + 1 : 0;
	}

}
