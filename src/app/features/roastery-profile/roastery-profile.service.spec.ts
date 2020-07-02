import { TestBed } from '@angular/core/testing';

import { RoasteryProfileService } from './roastery-profile.service';

describe('RoasteryProfileService', () => {
  let service: RoasteryProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoasteryProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
