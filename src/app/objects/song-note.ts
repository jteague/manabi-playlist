import { Gig } from './gig';
import { Song } from './song';

// maps a gig, a song, a user, and some notes together. This object will house user-entered data
// on what the band needs to work on.
export class SongNote {

	constructor(public id: number, public gig: Gig, public song: Song, public user: string,
		public notes: string, public badHorns: boolean, public badRhythm: boolean,
		public badStart: boolean, public badEnd: boolean, public badVocals: boolean) {

		}

}
