import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SpotifyPlaylist, Track } from '../model/playlist';
import { TrackService } from '../services/track.service';
import { MessageService } from '../services/message.service';
import { AuthoriseService } from '../services/authorise.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {

  selectedTrack: Track;
  tracks: Track[];

  constructor(private trackService: TrackService, private messageService: MessageService, private authoriseService: AuthoriseService) { }

  ngOnInit(): void {
    this.getTracks();
  }

  getTracks() {
    console.log("Access Token: "+this.authoriseService.access_token);
    if (this.authoriseService.access_token != "No token") {
      this.trackService.getTracks("1qdcXSvXuSAjt4GQjir7iZ").subscribe(tracks => {
        // Once aync operation completes...
        this.tracks = tracks;
        console.log(this.tracks);
        console.log(this.tracks[0]);
      });
    }
  }

  moveUp(track: Track): void {
    console.log("Move "+track.name+" up");
  }

  moveDown(track: Track): void {
    console.log("Move "+track.name+" down");
  }

}
