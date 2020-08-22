import { TestBed } from '@angular/core/testing';

import { RemoteconnectService } from './remoteconnect.service';

describe('RemoteconnectService', () => {
  let service: RemoteconnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteconnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
