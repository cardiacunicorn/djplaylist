import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Playlist } from '../model/playlist';
import { PLAYLISTS } from '../model/playlists';

// import { SpotifyWebApi } from 'spotify-web-api-node';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  // spotifyApi = new SpotifyWebApi({
  //   clientId: 'cdb9be7d05ec4befac817dc97af74ad3',
  //   clientSecret: 'c0f34e7a420c4a5993fdef0f1b62506b',
  //   redirectUri: 'http://localhost:4200/playlists'
  // });

  // spotifyApi: SpotifyWebApi;
  //
  // initiate(): void {
  //   this.spotifyApi = new SpotifyWebApi({
  //     clientId: 'cdb9be7d05ec4befac817dc97af74ad3',
  //     clientSecret: 'c0f34e7a420c4a5993fdef0f1b62506b',
  //     redirectUri: 'http://localhost:4200/playlists'
  //   });
  //   this.log(`API initiated`)
  // }

  // var SpotifyWebApi = require('spotify-web-api-node');
  //
  // // credentials are optional
  // var spotifyApi = new SpotifyWebApi({
  //   clientId: 'fcecfc72172e4cd267473117a17cbd4d',
  //   clientSecret: 'a6338157c9bb5ac9c71924cb2940e1a7',
  //   redirectUri: 'http://www.example.com/callback'
  // });

  private playlistsUrl: string = 'http://localhost:8888/api/playlists';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.getPlaylistsFromServer();
  }

  // Creates a message attributed to the PlaylistService
  private log(message: string) {
    this.messageService.add(`PlaylistService: ${message}`);
  }

  getPlaylists(): Observable<Playlist[]> {
    this.log(`fetched playlists`);
    // Currently simulating an async observable array of playlists
    return of(PLAYLISTS);
  }

  getPlaylist(id: number): Observable<Playlist> {
    this.log(`fetching playlist #${id}`);
    // Currently simulating an async observable playlist
    return of(PLAYLISTS.find(playlist => playlist.id === id));
  }

  getPlaylistsFromServer() {
    this.http.get(this.playlistsUrl)
      .pipe(catchError(this.handleError('getPlaylists', [])))
      .subscribe(val => this.getMyString(val));
  }

  getMyString(val): void {
    this.log(val.playlist);
    return;
  }

  // Definitely partly implemented...

  /**
   * Handle Http operation that failed - let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
