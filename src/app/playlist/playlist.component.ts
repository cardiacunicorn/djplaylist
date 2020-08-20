import { Component, OnInit, Input } from '@angular/core';
import { Playlist } from '../model/playlist';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  @Input() playlist: Playlist;

  constructor() { }

  ngOnInit(): void {
  }

}
