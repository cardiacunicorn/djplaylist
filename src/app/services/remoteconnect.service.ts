import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RemoteconnectService {

  public server: string;

  constructor() {
    this.server = "https://dj-playlist-api.ts.r.appspot.com";
  }
}
