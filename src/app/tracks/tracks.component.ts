import { Component, OnInit, Input } from '@angular/core';
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

  @Input() tracks: Track[];

  constructor(private trackService: TrackService, private messageService: MessageService, private authoriseService: AuthoriseService) { }

  ngOnInit(): void {
    // Because the track component is being fed an input of Tracks, I shouldn't need to getTracks here.
    // this.getTracks();
  }

  shuffleArtists(): void {
    for (var i = 1; i < this.tracks.length; i++) {
      if (this.tracks[i].basic.artists[0].id == this.tracks[i-1].basic.artists[0].id) {
        // The main artist is the same for this track as the track before it
        this.moveDown(this.tracks[i]);
      }
    }
  }

  sortBy(sortArgument): void {
    console.log(sortArgument);
    switch (sortArgument) {
      case "popasc":
      {
        this.byPopularity();
        break;
      }
      case "popdesc":
      {
        this.byPopularity();
        this.tracks.reverse();
        break;
      }
      case "danceasc":
      {
        this.byDanceability();
        break;
      }
      case "dancedesc":
      {
        this.byDanceability();
        this.tracks.reverse();
        break;
      }
      case "tempoasc":
      {
        this.byTempo();
        break;
      }
      case "tempodesc":
      {
        this.byTempo();
        this.tracks.reverse();
        break;
      }
      default:
        break;
    }
  }

  byPopularity(): void {
    this.tracks.sort(function(a, b){return a.basic.popularity - b.basic.popularity});
  }

  byTempo(): void {
    this.tracks.sort(function(a, b){return a.advanced.tempo - b.advanced.tempo});
  }

  byDanceability(): void {
    this.tracks.sort(function(a, b){return a.advanced.danceability - b.advanced.danceability});
  }

  playSample(trackid: string): void {
    var audio = <HTMLAudioElement>document.getElementById(trackid);
    if(audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  moveUp(track: Track): void {
    console.log("Moving "+track.basic.name+" up");
    // Starting at index 1, because you can't move the top track up
    for (var i = 1; i < this.tracks.length; i++) {
      if (this.tracks[i].id == track.id) {
        // Because we have this track stored locally, we move the secondary track first
        this.tracks.splice(i,1,this.tracks[i-1]);
        this.tracks.splice(i-1,1,track);
      }
    }
  }

  moveDown(track: Track): void {
    console.log("Moving "+track.basic.name+" down");
    // Ending at length - 1, because you can't move the bottom track down
    for (var i = 0; i < this.tracks.length - 1; i++) {
      if (this.tracks[i].id == track.id) {
        this.tracks.splice(i,1,this.tracks[i+1]);
        this.tracks.splice(i+1,1,track);
        // Return to avoid it meeting criteria on next loop and being forced down to bottom
        return;
      }
    }
  }

}
