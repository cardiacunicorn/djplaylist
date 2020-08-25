import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RemoteconnectService {

  public server: string;

  constructor() {
    this.server = "http://djbeanstalknodeenv.eba-azezgsp8.ap-southeast-2.elasticbeanstalk.com";
  }
}
