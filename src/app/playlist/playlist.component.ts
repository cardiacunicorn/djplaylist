import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Playlist } from '../model/playlist';
import { PlaylistService } from '../services/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  @Input() playlist: Playlist;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPlaylist(); // Hero not always selected in the places this component is displayed
  }

  getPlaylist(): void {
    const id = +this.route.snapshot.paramMap.get('id'); // + converts to number from string
    this.playlistService.getPlaylist(id).subscribe(playlist => this.playlist = playlist);
  }

  goBack(): void {
    this.location.back();
  }

}
