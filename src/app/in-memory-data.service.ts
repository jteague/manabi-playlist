import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Song } from './song';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {

	createDb() {
		const songs = [
			{ id: 0, name: "Sway", notes: "" },
			{ id: 1, name: "Como abeja al panal", notes: "" },
			{ id: 2, name: "Cali pachanguero", notes: "" },
			{ id: 3, name: "Lloraras", notes: "" },
			{ id: 4, name: "Rebelión", notes: "" },
			{ id: 5, name: "Las caleñas son como las flores", notes: "" },
			{ id: 6, name: "Si me dejas no vale", notes: "" },
			{ id: 7, name: "Lo que va a pasar", notes: "" },
			{ id: 8, name: "Hello", notes: "" },
			{ id: 9, name: "Cumbia sobre el mar ", notes: "" },
			{ id: 10, name: "La vida es un carnaval ", notes: "" },
			{ id: 11, name: "Casi un hechizo", notes: "" },
			{ id: 12, name: "Tu cariñito", notes: "" },
			{ id: 13, name: "El preso ", notes: "" },
			{ id: 14, name: "La agarro bajando ", notes: "" },
			{ id: 15, name: "Tu eres ajena ", notes: "" },
			{ id: 16, name: "Anacaona", notes: "" },
			{ id: 17, name: "Quimbara", notes: "" },
			{ id: 18, name: "Vivir mi vida", notes: "" },
		];

		return {songs};
	}

	genId(songs: Song[]) : number {
		return songs.length > 0 ? Math.max(...songs.map(song => song.id)) + 1 : 0;
	}
}
