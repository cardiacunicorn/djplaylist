import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistsComponent } from './playlists/playlists.component';
import { TracksComponent } from './tracks/tracks.component';

const routes: Routes = [
  { path: 'playlists', component: PlaylistsComponent },
  { path: 'tracks', component: TracksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
