import { Component, OnInit } from '@angular/core';
import { Playlist } from '../playlist';
import { PLAYLISTS } from '../playlists';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  // playlist: Playlist = {
  //   id: 1,
  //   name: 'Test Playlist',
  //   owner: 'Playlist Owner',
  //   tracks: 'Track listing lorem ipsum'
  // };

  playlists = PLAYLISTS;
  selectedPlaylist: Playlist;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(playlist: Playlist): void {
    this.selectedPlaylist = playlist;
  }

}
