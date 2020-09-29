import { TestBed } from '@angular/core/testing';

import { HorecaSubscriptionDetailsService } from './horeca-subscription-details.service';

describe('HorecaSubscriptionDetailsService', () => {
  let service: HorecaSubscriptionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorecaSubscriptionDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
