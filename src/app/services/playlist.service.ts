import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { AuthoriseService } from '../services/authorise.service';
import { RemoteconnectService } from '../services/remoteconnect.service';
import { SpotifyPlaylist, Owner } from '../model/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  // Does the service need to store the playlists?
  playlists: SpotifyPlaylist[] = [];

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private authoriseService: AuthoriseService,
    private remoteconnect: RemoteconnectService
  ) { }

  // Creates a message attributed to the PlaylistService
  private log(message: string) {
    this.messageService.add(`PlaylistService: ${message}`);
  }

  getPlaylists(): Observable<SpotifyPlaylist[]> {
    let playlistsUrl: string = this.remoteconnect.server + '/api/getmyplaylists?access_token=' + this.authoriseService.access_token;

    // Is this necessary?
    // clear playlists from memory
    this.playlists = [];
    var result;
    this.http.get(playlistsUrl).subscribe(result => {
      console.log(result);
    });

    return this.http.get<SpotifyPlaylist[]>(playlistsUrl);
  }

  getPlaylist(id: number): Observable<SpotifyPlaylist> {
    this.log(`fetching playlist #${id}`);
    // Currently simulating an async observable playlist
    // return of(PLAYLISTS.find(playlist => playlist.id === id));
    return of();
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
