import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilitiesService {

  constructor() { }

  getUserGuid() : string {
    
    if(!localStorage.getItem('user_uid')) {
      console.log("No user guid. Generating one...");
      var guid = this.getGuid();
      localStorage.setItem('user_uid', guid);
    }

    return localStorage.getItem('user_uid');
  }

  getGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
