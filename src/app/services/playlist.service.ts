import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { AuthoriseService } from '../services/authorise.service';
import { TrackService } from '../services/track.service';
import { RemoteconnectService } from '../services/remoteconnect.service';
import { SpotifyPlaylist, Owner, Track } from '../model/playlist';

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
    this.log("Access Token: "+(this.authoriseService.access_token ? "Attached" : "None found"));
    if (this.authoriseService.access_token) {
      let playlistsUrl: string = this.remoteconnect.server + '/api/getmyplaylists?access_token=' + this.authoriseService.access_token;
      this.obsPlaylists = this.http.get<SpotifyPlaylist[]>(playlistsUrl);
      this.log(`Fetching playlists`);
      this.obsPlaylists.subscribe(playlists => {
        // Once aync operation completes, make this.playlists an array
        this.playlists = playlists;
      });
      return this.obsPlaylists;
    } else { return of() }
  }

  getPlaylist(id: string): Observable<SpotifyPlaylist> {
    // TODO: send the message _after_ fetching
    this.log(`Fetched playlist id=${id}`);
    // At this point, this.playlists NEEDS to be an ARRAY
    return of(this.playlists.find(playlist => playlist.id === id));
  }

  createPlaylist(name: string, description: string, is_public: boolean, tracks: Track[]): void {
    this.log("Creating your "+name+" playlist");
    var uris: string[] = [];
    var tracknames: string[] = [];
    for (var i = 0; i < tracks.length; i++) {
      uris.push(tracks[i].basic.uri);
      tracknames.push(tracks[i].basic.name);
    }
    if (this.authoriseService.access_token) {
      var createPlaylistUrl: string = this.remoteconnect.server + '/api/createplaylist?';
      var body = {
        "access_token":this.authoriseService.access_token,
        "userID":this.authoriseService.spotifyID,
        "name":name,
        "description":description,
        "public": is_public,
        "uris":uris,
        "tracknames":tracknames,
        "tracks":tracks
      };
      this.http.post(createPlaylistUrl, body).subscribe(response => {
        if (response) {
          this.log("Created new "+(is_public ? "public" : "private")+" playlist, called "+name);
        } else {
          this.log("Error. Playlist creation failed.");
        }
      });
    }
  }
}
