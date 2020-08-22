import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { AuthoriseService } from '../services/authorise.service';
import { Playlist, SpotifyPlaylist } from '../model/playlist';
import { Owner } from '../model/owner';
import { PLAYLISTS } from '../model/playlists';

// import { SpotifyWebApi } from 'spotify-web-api-node';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  playlists: SpotifyPlaylist[] = [];

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private authoriseService: AuthoriseService
  ) {

    // Component requests this on their init, not here
    // this.getPlaylistsFromServer();

  }

  // Creates a message attributed to the PlaylistService
  private log(message: string) {
    this.messageService.add(`PlaylistService: ${message}`);
  }

  getPlaylists(): SpotifyPlaylist[] {
    let playlistsUrl: string = 'http://localhost:8888/api/getmyplaylists?access_token=' + this.authoriseService.access_token;

    this.http.get(playlistsUrl).toPromise().then(data => {
      for (let key in data.playlists) {
        this.playlists.push(data.playlists[key]);
        // this.log("Loaded your \'" + data.playlists[name]+ "\' playlist");
      }
      this.playlists.forEach(element => {
        this.log("Loaded your \'" + element.name + "\' playlist");
      });
    });
    this.log(`Fetched Playlists`);
    return this.playlists;
  }

  // getPlaylists(): Observable<Playlist[]> {
  //   this.log(`fetched playlists`);
  //   // Currently simulating an async observable array of playlists
  //   return of(PLAYLISTS);
  // }

  getPlaylist(id: number): Observable<Playlist> {
    this.log(`fetching playlist #${id}`);
    // Currently simulating an async observable playlist
    return of(PLAYLISTS.find(playlist => playlist.id === id));
  }

  // getPlaylistsFromServer(): SpotifyPlaylist[] {
  //   // this.http.get(this.playlistsUrl)
  //   //   .pipe(catchError(this.handleError('getPlaylists', [])))
  //   //   .subscribe(playlists => this.getMyString(playlists));
  //
  //   // I need to implement as the above, because the component is Observing
  //
  //   let playlistsUrl: string = 'http://localhost:8888/api/getmyplaylists?access_token=' + this.authoriseService.access_token;
  //
  //   this.http.get(playlistsUrl).toPromise().then(data => {
  //
  //     for (let key in data.playlists) {
  //       this.playlists.push(data.playlists[key]);
  //       // this.log("Loaded your \'" + data.playlists[name]+ "\' playlist");
  //     }
  //     this.playlists.forEach(element => {
  //       this.log("Loaded your \'" + element.name + "\' playlist");
  //     });
  //   });
  //
  //   return this.playlists;
  //
  // }

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
