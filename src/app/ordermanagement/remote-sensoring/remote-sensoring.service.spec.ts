import { TestBed } from '@angular/core/testing';

import { RemoteSensoringService } from './remote-sensoring.service';

describe('RemoteSensoringService', () => {
  let service: RemoteSensoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteSensoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
