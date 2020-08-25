import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { TracksComponent } from './tracks/tracks.component';
import { DocumentationComponent } from './documentation/documentation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', redirectTo: '', pathMatch: 'full' }, // route not used, overriden in Navbar
  { path: 'playlists', component: PlaylistsComponent },
  { path: 'playlist/:id', component: PlaylistComponent },
  { path: 'tracks', component: TracksComponent },
  { path: 'docs', component: DocumentationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
