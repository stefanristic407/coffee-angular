import { TestBed } from '@angular/core/testing';

import { MicroOrderBookedService } from './micro-order-booked.service';

describe('MicroOrderBookedService', () => {
  let service: MicroOrderBookedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicroOrderBookedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
