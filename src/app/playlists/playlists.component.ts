import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SpotifyPlaylist, Owner } from '../model/playlist';
import { PlaylistService } from '../services/playlist.service';
import { MessageService } from '../services/message.service';
import { AuthoriseService } from '../services/authorise.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  selectedPlaylist: SpotifyPlaylist;
  playlists: SpotifyPlaylist[];

  constructor(private playlistService: PlaylistService, private messageService: MessageService, private authoriseService: AuthoriseService) { }

  ngOnInit(): void {
    this.getPlaylists();
  }

  getPlaylists(): void {
    console.log("Access Token: "+this.authoriseService.access_token);
    if (this.authoriseService.access_token != "No token") {
      this.playlistService.getPlaylists().subscribe(playlists => {
        // Once aync operation completes...
        this.playlists = playlists;
        console.log(this.playlists[0].owner.display_name);
      });
    }
  }

  onSelect(playlist: SpotifyPlaylist): void {
    this.selectedPlaylist = playlist;
    this.messageService.add(`PlaylistsComponent: Playlist ${playlist.id} selected`)
  }

}
