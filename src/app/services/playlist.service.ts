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

  private playlistsUrl: string = 'http://localhost:8888/api/playlists';  // URL to web api, not currently used

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { this.http.get(this.playlistsUrl).subscribe(val => this.getMyString(val)); }

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

  getMyString(val): void {
    this.log(val.playlist);
    return;
  }

}
