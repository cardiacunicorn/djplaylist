import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { AuthoriseService } from '../services/authorise.service';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public access_token: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private authoriseService: AuthoriseService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    if (!this.authoriseService.access_token) {
      this.authoriseService.spotifyID = this.route.snapshot.queryParamMap.get("spotifyID");
      this.authoriseService.access_token = this.route.snapshot.queryParamMap.get("access_token");
      this.authoriseService.refresh_token = this.route.snapshot.queryParamMap.get("refresh_token");
      this.messageService.add('SpotifyID: '+(this.authoriseService.spotifyID || "None found"));
      this.messageService.add('Access: '+(this.authoriseService.access_token ? "Granted" : "Denied"));
      console.log("Access token: "+(this.authoriseService.access_token || "None found"));
      console.log("Refresh token: "+(this.authoriseService.refresh_token || "None found"));
      this.access_token = this.authoriseService.access_token;
    }
  }

}
