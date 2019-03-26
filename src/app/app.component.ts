import { Component } from '@angular/core';
import { UtilitiesService } from './services/utilities/utilities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Manabi Playlist';
  userUid = '';

  constructor(private utilities: UtilitiesService) {
    this.userUid = this.utilities.getUserGuid();
  }
}
