import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Playlist } from '../model/playlist';
import { PLAYLISTS } from '../model/playlists';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private messageService: MessageService) { }

  getPlaylists(): Observable<Playlist[]> {
    this.messageService.add('PlaylistService: fetched playlists');
    return of(PLAYLISTS);
  }

}
