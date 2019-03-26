import { Injectable } from '@angular/core';
import { WindowRef } from '../windowref/window-ref.service';

@Injectable({
  providedIn: 'root'
})

export class UtilitiesService {

  constructor(private winRef: WindowRef) { }

  getUserGuid() : string {
    var nav = this.winRef.nativeWindow.navigator;
    var screen = this.winRef.nativeWindow.screen;

    var guid = "";
    guid += nav.mimeTypes.length;
    guid += nav.userAgent.replace(/\D+/g, '');
    guid += nav.plugins.length;
    guid += screen.height || '';
    guid += screen.width || '';
    guid += screen.pixelDepth || '';

    return guid;
  }
}
