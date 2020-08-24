import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SpotifyPlaylist, Owner, Track } from '../model/playlist';
import { PlaylistService } from '../services/playlist.service';
import { TrackService } from '../services/track.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  // Input means that this component can receive a playlist parameter
  @Input() playlist: SpotifyPlaylist;
  public tracks: Track[];

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private trackService: TrackService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPlaylist();
  }

  createPlaylist(name: string, is_public: boolean, tracks: Track[]): void {
    // var checkbox: HTMLInputElement = document.getElementById("is-public");

    this.playlistService.createPlaylist(name, "Created in DJ Playlist app", is_public, tracks);
  }

  getPlaylist(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.playlistService.getPlaylist(id).subscribe(playlist => this.playlist = playlist);
    // Then get the tracks
    this.trackService.getTracks(id).subscribe(tracks => this.tracks = tracks);
  }

  goBack(): void {
    this.location.back();
  }

}
