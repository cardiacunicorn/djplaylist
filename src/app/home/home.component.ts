import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { AuthoriseService } from '../services/authorise.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private authoriseService: AuthoriseService
  ) { }

  ngOnInit(): void {
    if (this.authoriseService.access_token == "No token") {
      this.authoriseService.access_token = this.route.snapshot.queryParamMap.get("access_token");
      this.authoriseService.refresh_token = this.route.snapshot.queryParamMap.get("refresh_token");
      console.log("Access token: "+(this.authoriseService.access_token || "None found"));
      console.log("Refresh token: "+(this.authoriseService.refresh_token || "None found"));
    }
  }

}
