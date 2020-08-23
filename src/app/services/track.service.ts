import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { AuthoriseService } from '../services/authorise.service';
import { RemoteconnectService } from '../services/remoteconnect.service';
import { SpotifyPlaylist, Owner, Track } from '../model/playlist';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private authoriseService: AuthoriseService,
    private remoteconnect: RemoteconnectService
  ) { }

  // Creates a message attributed to the TrackService
  private log(message: string) {
    this.messageService.add(`TrackService: ${message}`);
  }

  getTracks(playlistID: string): Observable<Track[]> {
    console.log("Access Token: "+(this.authoriseService.access_token || "None found"));
    if (this.authoriseService.access_token) {
      let tracklistsUrl: string = this.remoteconnect.server + '/api/gettracks?access_token=' + this.authoriseService.access_token + '&playlistID=' + playlistID;
      return this.http.get<Track[]>(tracklistsUrl);
    } else { return of() }
  }

}
