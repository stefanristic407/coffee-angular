import { TestBed } from '@angular/core/testing';

import { HorecaPreviousSubscriptionService } from './horeca-previous-subscription.service';

describe('HorecaPreviousSubscriptionService', () => {
  let service: HorecaPreviousSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorecaPreviousSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
