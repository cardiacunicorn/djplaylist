import { Component, OnInit } from '@angular/core';
import { Playlist } from '../model/playlist';
import { PLAYLISTS } from '../model/playlists';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  playlists = PLAYLISTS;
  selectedPlaylist: Playlist;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(playlist: Playlist): void {
    this.selectedPlaylist = playlist;
  }

}
