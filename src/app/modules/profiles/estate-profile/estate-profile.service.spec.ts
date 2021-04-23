import { TestBed } from '@angular/core/testing';

import { EstateProfileService } from './estate-profile.service';

describe('EstateProfileService', () => {
  let service: EstateProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstateProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
