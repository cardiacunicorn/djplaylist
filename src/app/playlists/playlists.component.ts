import { Component, OnInit } from '@angular/core';
import { Playlist } from '../model/playlist';
import { PlaylistService } from '../services/playlist.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  playlists: Playlist[];
  selectedPlaylist: Playlist;

  retrievedPlaylists = [];

  constructor(private playlistService: PlaylistService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getPlaylists();
  }

  getPlaylists(): void {
    this.playlistService.getPlaylists().subscribe(playlists => this.playlists = playlists);
    this.retrievedPlaylists = this.playlistService.getPlaylists().subscribe(playlists => this.retrievedPlaylists = playlists);
    console.log(this.retrievedPlaylists);
  }

  onSelect(playlist: Playlist): void {
    this.selectedPlaylist = playlist;
    this.messageService.add(`PlaylistsComponent: Playlist ${playlist.id} selected`)
  }

}
