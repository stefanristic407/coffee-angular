import { TestBed } from '@angular/core/testing';

import { RoasterserviceService } from './roasterservice.service';

describe('RoasterserviceService', () => {
  let service: RoasterserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoasterserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
