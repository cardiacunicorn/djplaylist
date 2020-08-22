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

  private access_token: string = 'BQBrbLkCMeKG2iErjKsj7enb39r3e7MakP_GYA0v7FswC2YZZef7Wl8OmeQKkij96d5g-hRyPERFbhKplN68LCAttQ1R8RXu1d1ydYKUc9pJx2aLzY_E1-tvqrjK1XsZ1cSMHL3q8YzBcTMSakd_QWEh2dsp7QbavaRu1a1Cw8NdYfP9wqUGzGyXeSHvJfmpcSqs5cZkl21uqYcs296f_dSXvdQ7xLdhQkT6X_XAPg';
  private playlistsUrl: string = 'http://localhost:8888/api/getmyplaylists?access_token=' + this.access_token;
  private playlists = [];

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
    // this.http.get(this.playlistsUrl)
    //   .pipe(catchError(this.handleError('getPlaylists', [])))
    //   .subscribe(playlists => this.getMyString(playlists));

    // I need to implement as the above, because the component is Observing

    this.http.get(this.playlistsUrl).toPromise().then(data => {

      for (let key in data.playlists) {
        this.playlists.push(data.playlists[key]);
      }
      console.log(this.playlists[0]);
      this.log(this.playlists[0].name);
      this.playlists.forEach(element => {
        this.log("Loaded your \'" + element.name + "\' playlist");
      });
    });

    return this.playlists;

  }

  // getMyString(playlists): void {
  //   console.log(playlists.json);
  //   this.log(playlists);
  //   return;
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
