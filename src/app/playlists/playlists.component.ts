import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Playlist, SpotifyPlaylist } from '../model/playlist';
import { Owner } from '../model/owner';
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
    // this.playlistService.getPlaylists().subscribe(playlists => this.playlists = playlists);
    console.log(this.authoriseService.access_token);
    // this.playlists = this.playlistService.getPlaylists();
    this.playlistService.getObservablePlaylists().subscribe(playlists => {
      // Once aync operation completes...
      this.playlists = playlists;
      console.log(this.playlists[0].owner.display_name);
    });
  }

  onSelect(playlist: SpotifyPlaylist): void {
    this.selectedPlaylist = playlist;
    this.messageService.add(`PlaylistsComponent: Playlist ${playlist.id} selected`)
  }

}
