import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  clientid: string = 'cdb9be7d05ec4befac817dc97af74ad3';
  redirect_uri: string = 'http://localhost:4200/playlists';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  // generateRequest(): void {
  //   this.http.get('/login', function(req, res) {
  //   var scopes = 'user-read-private user-read-email';
  //   res.redirect('https://accounts.spotify.com/authorize' +
  //     '?response_type=code' +
  //     '&client_id=' + this.clientid +
  //     (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  //     '&redirect_uri=' + encodeURIComponent(this.redirect_uri));
  //   });
  // }

}
