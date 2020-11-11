import { TestBed } from '@angular/core/testing';

import { SustainabilityService } from './sustainability.service';

describe('SustainabilityService', () => {
  let service: SustainabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SustainabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
