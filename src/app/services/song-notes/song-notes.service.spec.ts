import { TestBed } from '@angular/core/testing';

import { SongNotesService } from './song-notes.service';

describe('SongNotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongNotesService = TestBed.get(SongNotesService);
    expect(service).toBeTruthy();
  });
});
