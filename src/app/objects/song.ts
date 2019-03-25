export class Song {
	id: number;
	gig_id: number;
	user_id: string; // todo: figure out how to anonomously make a user
	name: string;
	notes: string;
	badHorns: boolean;
	badRhythm: boolean;
	badStart: boolean;
	badEnd: boolean;
}
