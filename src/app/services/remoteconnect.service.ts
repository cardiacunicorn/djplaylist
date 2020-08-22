import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RemoteconnectService {

  public server: string;

  constructor() {
    this.server = "http://localhost:8888";
  }
}
