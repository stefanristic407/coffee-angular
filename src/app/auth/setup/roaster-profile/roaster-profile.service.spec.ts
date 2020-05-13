import { TestBed } from '@angular/core/testing';

import { RoasterProfileService } from './roaster-profile.service';

describe('RoasterProfileService', () => {
  let service: RoasterProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoasterProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
