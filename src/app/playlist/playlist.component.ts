import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SpotifyPlaylist, Owner } from '../model/playlist';
import { PlaylistService } from '../services/playlist.service';
import { TrackService } from '../services/track.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  @Input() playlist: SpotifyPlaylist;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private trackService: TrackService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPlaylist(); // Hero not always selected in the places this component is displayed
  }

  getPlaylist(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.playlistService.getPlaylist(id).subscribe(playlist => this.playlist = playlist);
  }

  // getPlaylist(): void {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   this.playlistService.getPlaylist(id).subscribe(playlist => {
  //     console.log(playlist);
  //     this.playlist = playlist;
  //   });
  // }

  goBack(): void {
    this.location.back();
  }

}
