import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { AuthoriseService } from '../services/authorise.service';
import { TrackService } from '../services/track.service';
import { RemoteconnectService } from '../services/remoteconnect.service';
import { SpotifyPlaylist, Owner } from '../model/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  public obsPlaylists: Observable<SpotifyPlaylist[]>;
  public playlists: SpotifyPlaylist[] = [];
  public selectedPlaylist: SpotifyPlaylist;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private authoriseService: AuthoriseService,
    private trackService: TrackService,
    private remoteconnect: RemoteconnectService
  ) { }

  // Creates a message attributed to the PlaylistService
  private log(message: string) {
    this.messageService.add(`PlaylistService: ${message}`);
  }

  getPlaylists(): Observable<SpotifyPlaylist[]> {
    let playlistsUrl: string = this.remoteconnect.server + '/api/getmyplaylists?access_token=' + this.authoriseService.access_token;
    this.obsPlaylists = this.http.get<SpotifyPlaylist[]>(playlistsUrl);
    this.log(`Fetching playlists`);
    this.obsPlaylists.subscribe(playlists => {
      // Once aync operation completes, make this.playlists an array
      this.playlists = playlists;
    });

    return this.obsPlaylists;
  }

  getPlaylist(id: string): Observable<SpotifyPlaylist> {
    // TODO: send the message _after_ fetching
    this.log(`fetched playlist id=${id}`);
    // At this point, this.playlists NEEDS to be an ARRAY
    return of(this.playlists.find(playlist => playlist.id === id));
  }

  // Definitely partly implemented...

  // /**
  //  * Handle Http operation that failed - let the app continue.
  //  * @param operation - name of the operation that failed
  //  * @param result - optional value to return as the observable result
  //  */
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
  //
  //     // TODO: better job of transforming error for user consumption
  //     this.log(`${operation} failed: ${error.message}`);
  //
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

}
