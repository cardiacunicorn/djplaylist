import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthoriseService {

  public access_token: string;
  public refresh_token: string;

  constructor() {
    
  }


}
